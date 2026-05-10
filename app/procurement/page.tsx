export default function procurementpage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      
      <div className="max-w-5xl mx-auto">

        <div className="text-cyan-400 uppercase tracking-[0.3em] text-xs mb-6">
          SCIOS PROCUREMENT PACK
        </div>

        <h1 className="text-6xl font-black mb-10">
          Executive Deployment Package
        </h1>

        <div className="grid grid-cols-2 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              Executive Summary
            </h2>

            <p className="text-slate-400 mt-4">
              Industrial causal intelligence platform for operational risk reconstruction.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              ROI Model
            </h2>

            <p className="text-slate-400 mt-4">
              Estimated downtime reduction and financial loss prevention analysis.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              Security Assurance
            </h2>

            <p className="text-slate-400 mt-4">
              Read-only shadow deployment architecture with zero operational disruption.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              Pilot Contract
            </h2>

            <p className="text-slate-400 mt-4">
              30-day pilot deployment proposal for enterprise infrastructure environments.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}