"use client";

import { useSciOSStore } from "@/store/sciosStore";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Play,
  RefreshCcw,
  Search,
} from "lucide-react";

import CausalGraph from "@/components/CausalGraph";
import RealtimeStream from "@/components/RealtimeStream";

export default function Page() {
  const { mode, loss, running, autoplay, reset } = useSciOSStore();

  return (
    <main
      className={`min-h-screen p-8 font-mono transition-all duration-500 ${
        mode === "FAULT"
          ? "bg-red-950 text-red-100"
          : "bg-slate-950 text-slate-100"
      }`}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-cyan-400 flex items-center gap-2">
            <Cpu className="w-8 h-8" />
            SCIOS ENTERPRISE
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Causal Intelligence Overlay
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={autoplay}
            disabled={running}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
              running
                ? "bg-slate-800 text-slate-500"
                : "bg-cyan-600 hover:bg-cyan-500 text-white"
            }`}
          >
            <Play className="w-4 h-4" />
            {running ? "SIMULATING..." : "▶ PLAY SCENARIO"}
          </button>

          <button
            onClick={reset}
            className="p-2 text-slate-400 hover:text-white"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <div className="mb-10">
        <h2 className="text-5xl font-black tracking-tight leading-tight">
          From Alarm Chaos
          <br />
          to Causal Truth
        </h2>

        <p className="text-slate-500 mt-4 max-w-2xl">
          SciOS isolates root-cause anomalies before operational collapse occurs.
        </p>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* SENSOR */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl">
          <h2 className="text-slate-400 text-xs mb-4 flex items-center gap-2 italic">
            <Activity className="w-4 h-4" />
            SENSOR STREAM
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500 text-xs">FLOW RATE</span>

              <span
                className={
                  mode === "NORMAL"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {mode === "NORMAL" ? "2.5 μL/min" : "0.12 μL/min"}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500 text-xs">PRESSURE</span>

              <span
                className={
                  mode === "NORMAL"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {mode === "NORMAL" ? "14.2 PSI" : "28.5 PSI"}
              </span>
            </div>
          </div>

          {mode === "FAULT" && (
            <div className="mt-6 border border-red-500 bg-red-950/40 p-4 rounded-xl animate-pulse">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-5 h-5" />
                CLOGGING DETECTED
              </div>
            </div>
          )}
        </div>

        {/* REVEAL */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl">
          <h2 className="text-cyan-400 text-xs mb-4 flex items-center gap-2 italic">
            <Search className="w-4 h-4" />
            CAUSAL REVEAL
          </h2>

          {mode === "REVEAL" ? (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-950/30 border border-cyan-800 rounded-xl">
                <p className="text-cyan-300 font-bold text-sm">
                  ROOT CAUSE ISOLATED
                </p>

                <p className="text-white mt-2">
                  Inverter instability triggered transformer cascade anomaly.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-600 text-sm">
              Awaiting anomaly...
            </div>
          )}
        </div>

        {/* LOSS */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl">
          <h2 className="text-slate-400 text-xs mb-4">
            OPERATIONAL LOSS COUNTER
          </h2>

          <div className="flex flex-col items-center justify-center py-6">
            <span
              className={`text-5xl font-black ${
                loss > 0
                  ? "text-red-500 animate-pulse"
                  : "text-slate-700"
              }`}
            >
              ${loss.toLocaleString()}
            </span>

            <span className="text-slate-500 text-xs mt-3">
              Estimated Downtime Cost
            </span>
          </div>
        </div>
      </div>

      {/* ENTERPRISE MODULES */}
      <div className="grid grid-cols-1 gap-8 mt-10">
        <CausalGraph />
        <RealtimeStream />
      </div>

      {/* FOOTER */}
      <footer className="mt-12 text-xs text-slate-700 border-t border-slate-800 pt-4 flex justify-between">
        <span>SCIOS ENGINE V1.0</span>
        <span>SHADOW MODE ACTIVE</span>
      </footer>
    </main>
  );
}