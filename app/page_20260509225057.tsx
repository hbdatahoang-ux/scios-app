
"use client";

import CausalGraph from "@/components/CausalGraph";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      {/* HEADER */}

      <div className="mb-10">
        <div className="text-cyan-400 text-xs tracking-[0.3em] uppercase">
          SCIOS ENTERPRISE PLATFORM
        </div>

        <h1 className="text-5xl font-black mt-4">
          LIVE CAUSAL ANALYSIS
        </h1>

        <p className="text-slate-400 mt-4 max-w-2xl">
          Real-time causal reconstruction engine for industrial infrastructure.
        </p>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-400 text-sm">Anomaly Score</div>
          <div className="text-4xl font-black text-red-500 mt-2">
            98.3%
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-400 text-sm">Affected Systems</div>
          <div className="text-4xl font-black text-cyan-400 mt-2">
            12
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-400 text-sm">Loss Estimate</div>
          <div className="text-4xl font-black text-red-500 mt-2">
            $245K
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-400 text-sm">Root Cause Confidence</div>
          <div className="text-4xl font-black text-green-400 mt-2">
            96%
          </div>
        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-12 gap-8">

        {/* REALTIME STREAM */}

        <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[700px] overflow-hidden">

          <div className="text-cyan-400 mb-6">
            REALTIME STREAM
          </div>

          <div className="space-y-4 text-sm font-mono">

            <div className="text-red-400">
              [ALERT] Bearing vibration spike
            </div>

            <div className="text-cyan-300">
              Sensor A-203 fluctuation
            </div>

            <div className="text-yellow-400">
              Thermal drift detected
            </div>

            <div className="text-slate-400">
              Maintenance log synced
            </div>

            <div className="text-red-500">
              Pressure anomaly detected
            </div>

          </div>

        </div>

        {/* CENTRAL ENGINE */}

        <div className="col-span-6">
          <CausalGraph />
        </div>

        {/* FINANCIAL IMPACT */}

        <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[700px]">

          <div className="text-cyan-400 mb-6">
            FINANCIAL IMPACT
          </div>

          <div className="text-6xl font-black text-red-500">
            $2.45M
          </div>

          <div className="text-slate-500 mt-4">
            Estimated production loss propagation
          </div>

          <div className="mt-10 space-y-6">

            <div>
              <div className="text-sm text-slate-400">
                Downtime Risk
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="bg-red-500 h-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-400">
                Cascade Probability
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full w-[70%]" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* EVENT TIMELINE */}

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <div className="text-cyan-400 mb-6">
          EVENT TIMELINE
        </div>

        <div className="space-y-4 text-sm">

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>16:03:22 — Vibration spike detected</span>
            <span className="text-red-400">CRITICAL</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>16:03:28 — Pressure instability propagated</span>
            <span className="text-yellow-400">WARNING</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>16:03:35 — Root cause isolated</span>
            <span className="text-green-400">RESOLVED</span>
          </div>

        </div>

      </div>

    </main>
  );
}
```
