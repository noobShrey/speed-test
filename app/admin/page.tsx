export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100">
        
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Open World</h1>
          <h2 className="text-lg font-medium text-slate-500 mt-2">Speed Test Assessment</h2>
        </div>
        
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          Please enter your full name to begin the 100-question assessment.
        </p>

        <form action="/test" className="space-y-4 pt-2">
          <input 
            type="text" 
            name="name"
            placeholder="e.g., John Doe" 
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Start Test
          </button>
        </form>

      </div>
    </main>
  );
}