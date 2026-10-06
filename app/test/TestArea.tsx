// File: app/test/TestArea.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// We need text to compare against to calculate actual accuracy
const REFERENCE_TEXT = "The quick brown fox jumps over the lazy dog. Programming is the art of algorithm design and the craft of debugging errant code.";

export function TestArea({ name }: { name: string }) {
  const TEST_DURATION = 60; // 60 seconds
  
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isSaved, setIsSaved] = useState(false);
  const [dbError, setDbError] = useState("");

  // ------------------------------------------
  // TIMER LOGIC
  // ------------------------------------------
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Start ticking down only if started and time remains
    if (hasStarted && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } 
    // Stop the test precisely when time hits 0
    else if (timeLeft === 0 && hasStarted && !isFinished) {
      setIsFinished(true);
      calculateScores();
    }

    return () => clearInterval(timerId);
  }, [hasStarted, timeLeft, isFinished]);

  // ------------------------------------------
  // TYPING HANDLER
  // ------------------------------------------
  function handleTyping(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (isFinished) return; // Prevent typing after time is up
    
    const inputValue = e.target.value;
    setText(inputValue);

    if (!hasStarted && inputValue.length > 0) {
      setHasStarted(true);
    }
  }

  // ------------------------------------------
  // MATH CALCULATION LOGIC
  // ------------------------------------------
  function calculateScores() {
    // 1. WPM Math: (Total characters / 5) / Time in minutes
    const timeInMinutes = TEST_DURATION / 60;
    const typedChars = text.length;
    const finalWpm = Math.round((typedChars / 5) / timeInMinutes);

    // 2. Accuracy Math: Correct Characters / Total Characters * 100
    let correctChars = 0;
    for (let i = 0; i < typedChars; i++) {
      if (text[i] === REFERENCE_TEXT[i]) {
        correctChars++;
      }
    }
    const finalAccuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

    setWpm(finalWpm);
    setAccuracy(finalAccuracy);

    // Call the database block below
    saveTestResults(finalWpm, finalAccuracy);
  }

  // ==========================================
  // 🔴 HIGHLIGHT: STORING THE RESULT IN DB
  // ==========================================
  async function saveTestResults(finalWpm: number, finalAccuracy: number) {
    try {
      // Sends the POST request to your Supabase table
      const { error } = await supabase
        .from('speed_tests')
        .insert([
          { 
            student_name: name, 
            wpm: finalWpm, 
            accuracy: finalAccuracy 
          }
        ]);

      if (!error) {
        setIsSaved(true);
      } else {
        console.error('Supabase insert error details:', error);
        setDbError(error.message);
      }
    } catch (err: any) {
      console.error('Network baseline transmission failure:', err);
      setDbError(err.message || "Failed to reach database");
    }
  }
  // ==========================================

  // ------------------------------------------
  // USER INTERFACE (HTML)
  // ------------------------------------------
  return (
    <div className="flex flex-col gap-4 max-w-2xl w-full p-6">
      <h1 className="text-2xl font-bold">Welcome, {name}</h1>
      
      {!isFinished ? (
        <>
          <p className="text-lg font-semibold text-red-600">Time: {timeLeft}s</p>
          <div className="p-4 bg-gray-100 rounded text-gray-700 select-none mb-4">
            {REFERENCE_TEXT}
          </div>
          <textarea 
            className="border-2 border-gray-400 p-4 w-full h-40 text-lg font-mono focus:border-blue-500 outline-none"
            value={text}
            onChange={handleTyping}
            disabled={isFinished}
            placeholder="Start typing the text above to begin the countdown..."
          />
        </>
      ) : (
        <div className="bg-gray-100 p-6 rounded shadow-md mt-4">
          <h2 className="text-xl font-bold mb-4">Test Complete!</h2>
          <p className="text-lg mb-2"><strong>WPM:</strong> {wpm}</p>
          <p className="text-lg mb-4"><strong>Accuracy:</strong> {accuracy}%</p>
          
          {isSaved ? (
            <p className="text-green-600 font-bold">✅ Results successfully saved to database!</p>
          ) : (
            <p className="text-red-600 font-bold">❌ Failed to save results. {dbError}</p>
          )}
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Take Test Again
          </button>
        </div>
      )}
    </div>
  );
}