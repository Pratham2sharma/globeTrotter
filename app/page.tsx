export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to GlobeTrotter</h1>
        <p className="text-lg text-gray-600 mb-8">Your premium travel planning companion</p>
        <div className="space-x-4">
          <a 
            href="/userprofile" 
            className="px-6 py-3 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
          >
            Go to Dashboard
          </a>
          <a 
            href="/plan-trip" 
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors inline-block"
          >
            Plan New Trip
          </a>
        </div>
      </div>
    </div>
  );
}