
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HERO */}

      <section className="px-10 py-32 max-w-7xl mx-auto">

        <div className="text-cyan-400 tracking-[0.4em] uppercase text-xs mb-6">
          SCIOS ENTERPRISE AI
        </div>

        <h1 className="text-7xl font-black leading-tight max-w-5xl">
          Industrial Causal Intelligence Platform
        </h1>

        <p className="text-slate-400 text-xl mt-8 max-w-2xl leading-relaxed">
          Real-time anomaly reconstruction and operational risk intelligence
          for industrial infrastructure.
        </p>

        {/* CTA */}

        <div className="flex gap-6 mt-12">

          <Link
            href="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition-all"
          >
            Open Live Dashboard
          </Link>

          <button className="border border-slate-700 hover:border-cyan-400 px-8 py-4 rounded-2xl transition-all">
            Download Executive Brief
          </button>

        </div>

      </section>

      {/* FEATURE GRID */}

      <section className="px-10 pb-32 max-w-7xl mx-auto">

        <div className="grid grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm mb-4">
              ROOT CAUSE ANALYSIS
            </div>

            <div className="text-3xl font-black">
              96.2%
            </div>

            <p className="text-slate-400 mt-4">
              AI confidence for causal isolation and anomaly propagation mapping.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm mb-4">
              FINANCIAL IMPACT
            </div>

            <div className="text-3xl font-black text-red-500">
              $2.45M
            </div>

            <p className="text-slate-400 mt-4">
              Estimated downtime and operational loss prevention.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm mb-4">
              DEPLOYMENT MODE
            </div>

            <div className="text-3xl font-black text-green-400">
              SHADOW
            </div>

            <p className="text-slate-400 mt-4">
              Read-only deployment architecture with zero operational disruption.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}