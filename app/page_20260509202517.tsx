"use client";

import { useSciOSStore } from "@/store/sciosStore";
import { Activity, AlertTriangle, Cpu, Play, RefreshCcw, Search } from "lucide-react";

export default function SciOSDashboard() {
  const { mode, loss, running, autoplay, reset } = useSciOSStore();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0f172a,#020617)] text-slate-100 p-8 font-mono">
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] flex items-center gap-2">
            <Cpu className="w-8 h-8" /> SCIOS LAB-ON-CHIP
          </h1>
          <p className="text-slate-500 text-sm mt-1">Causal Intelligence Overlay for Microfluidics</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={autoplay} 
            disabled={running}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
              running ? "bg-slate-800 text-slate-500" : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
            }`}
          >
            <Play className="w-4 h-4" /> {running ? "SIMULATING..." : "▶ PLAY SCENARIO"}
          </button>
          <button onClick={reset} className="p-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>
      </header>
      <div className="mb-10">
  <h2 className="text-5xl font-black tracking-tight text-white leading-tight">
    From Alarm Chaos
    <br />
    to Causal Truth
  </h2>

  <p className="text-slate-500 mt-4 max-w-2xl">
    SciOS isolates root-cause anomalies in industrial systems before operational collapse occurs.
  </p>
</div>
{/* STATUS STRIP */}
<div className="grid grid-cols-3 gap-4 mb-8">

  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
    <p className="text-slate-500 text-[10px] uppercase">System Status</p>
    <h3 className="text-green-400 text-xl font-bold mt-2">
      {mode === "NORMAL" ? "STABLE" : mode}
    </h3>
  </div>

  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
    <p className="text-slate-500 text-[10px] uppercase">Causal Confidence</p>
    <h3 className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] text-xl font-bold mt-2">
      {mode === "REVEAL" ? "97.2%" : "--"}
    </h3>
  </div>

  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
    <p className="text-slate-500 text-[10px] uppercase">Facility</p>
    <h3 className="text-white text-xl font-bold mt-2">
      VSIP GRID-07
    </h3>
  </div>

</div>
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PANEL 1: SENSOR STREAM (MÔ PHỎNG DỮ LIỆU) */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-900/40 shadow-2xl shadow-cyan-950/20 p-6 rounded-2xl relative overflow-hidden">
          <h2 className="text-slate-400 text-xs mb-4 flex items-center gap-2 italic">
            <Activity className="w-4 h-4" /> REAL-TIME SENSOR STREAM
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500 uppercase text-[10px]">Flow Rate</span>
              <span className={mode === "NORMAL" ? "text-green-400" : "text-red-400"}>
                {mode === "NORMAL" ? "2.5 μL/min" : "0.12 μL/min"}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500 uppercase text-[10px]">Pressure</span>
              <span className={mode === "NORMAL" ? "text-green-400" : "text-red-400"}>
                {mode === "NORMAL" ? "14.2 PSI" : "28.5 PSI"}
              </span>
            </div>
          </div>
          {mode === "FAULT" && (
            <div className="absolute inset-0 bg-red-950/20 flex flex-col items-center justify-center animate-ping border border-red-500/50 rounded-2xl">
              <AlertTriangle className="text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.7)] w-12 h-12 mb-2" />
              <span className="text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.7)] font-bold text-xs">CLOGGING DETECTED</span>
            </div>
          )}
        </div>

        {/* PANEL 2: CAUSAL REVEAL (NHÂN QUẢ) */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-900/40 shadow-2xl shadow-cyan-950/20 p-6 rounded-2xl">
          <h2 className="text-slate-400 text-xs mb-4 flex items-center gap-2 italic text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
            <Search className="w-4 h-4" /> SCIOS CAUSAL REVEAL
          </h2>
          {mode === "REVEAL" ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="p-3 bg-cyan-950/30 border border-cyan-800 rounded-lg">
                <p className="text-cyan-300 text-xs leading-relaxed font-bold">
                  ROOT CAUSE ISOLATED:
                </p>
                <p className="text-white text-sm">Viscosity shift due to Ambient Temp (+4°C)</p>
              </div>
              <div className="text-[10px] text-slate-500 space-y-1">
                <p>→ Decreased flow velocity at junction</p>
                <p>→ Particle accumulation detected</p>
                <p>→ Pressure feedback spike triggered</p>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-slate-700 text-xs text-center border-2 border-dashed border-slate-800 rounded-lg italic">
              Awaiting system anomaly...
            </div>
          )}
        </div>

        {/* PANEL 3: FINANCIAL IMPACT (THIỆT HẠI) */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-900/40 shadow-2xl shadow-cyan-950/20 p-6 rounded-2xl">
          <h2 className="text-slate-400 text-xs mb-4 flex items-center gap-2 italic">
            $ REAGENT LOSS COUNTER
          </h2>
          <div className="flex flex-col items-center justify-center py-4">
            <span className={`text-6xl tracking-tighter font-black ${loss > 0 ? "text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.7)] animate-ping" : "text-slate-800"}`}>
              ${loss.toLocaleString()}
            </span>
            <span className="text-slate-600 text-[10px] mt-2 uppercase tracking-widest">
              Estimated Waste Value
            </span>
          </div>
        </div>

      </div>

      {/* FOOTER: SYSTEM LOG */}
      <footer className="mt-12 text-[10px] text-slate-700 flex justify-between border-t border-slate-800 pt-4">
        <span>SCIOS ENGINE V1.0.4 - SHADOW MODE ACTIVE</span>
        <span>LOCATION: LAB-ON-CHIP UNIT 07</span>
      </footer>
    </main>
  );
}