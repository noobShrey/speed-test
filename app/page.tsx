'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Send the student to the test page with their name attached
      router.push(`/test?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 font-sans p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-3 text-blue-600">Open World</h1>
        <h2 className="text-xl font-bold mb-3">Speed Test Assessment</h2>
        <p className="text-gray-500 mb-8">Please enter your full name to begin the timer.</p>

        <form onSubmit={handleStart} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold p-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Start Test
          </button>
        </form>
      </div>
    </main>
  );
}