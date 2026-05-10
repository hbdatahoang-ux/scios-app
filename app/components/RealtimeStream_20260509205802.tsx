"use client";

import { useEffect, useState } from "react";

const messages = [
  "Grid frequency stable",
  "Voltage variance detected",
  "Harmonic spike detected",
  "Transformer load increasing",
  "Thermal instability warning",
  "Feeder oscillation detected",
  "Root-cause isolation pending",
];

export default function RealtimeStream() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = messages[Math.floor(Math.random() * messages.length)];

      setLogs((prev) => [
        `${new Date().toLocaleTimeString()} — ${random}`,
        ...prev,
      ].slice(0, 8));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-6 h-full">
      <h2 className="text-cyan-400 text-xs uppercase tracking-widest mb-4">
        Live Operational Stream
      </h2>

      <div className="space-y-2 text-xs font-mono text-slate-400">
        {logs.map((log, index) => (
          <div
            key={index}
            className="border-b border-slate-800 pb-2 animate-pulse"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}