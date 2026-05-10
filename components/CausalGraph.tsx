
"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function CausalGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);

    svg.selectAll("*").remove();

    const nodes = [
      { id: "Sensor" },
      { id: "Anomaly" },
      { id: "Causal Engine" },
      { id: "Production Loss" },
      { id: "Alarm" },
    ];

    const links = [
      { source: "Sensor", target: "Anomaly" },
      { source: "Anomaly", target: "Causal Engine" },
      { source: "Causal Engine", target: "Production Loss" },
      { source: "Causal Engine", target: "Alarm" },
    ];

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id).distance(140)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(500, 300));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 3)
      .attr("opacity", 0.7);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 30)
      .attr("fill", "#0f172a")
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 3);

    const labels = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => d.id)
      .attr("fill", "#cbd5e1")
      .attr("font-size", 12)
      .attr("text-anchor", "middle");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y + 50);
    });
  }, []);

  return (
    <div className="bg-slate-950 border border-cyan-900 rounded-2xl p-6">
      <div className="text-cyan-400 text-sm mb-4">
        LIVE CAUSAL ANALYSIS
      </div>

      <svg
        ref={ref}
        width="100%"
        height="600"
        viewBox="0 0 1000 600"
      />
    </div>
  );
}
