"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Activity, AlertTriangle, Cpu } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho Node và Link
interface CausalNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: "sensor" | "process" | "output";
  status: "normal" | "warning" | "error";
  value: number;
}

interface CausalLink extends d3.SimulationLinkDatum<CausalNode> {
  strength: number;
}

export default function CausalGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Dữ liệu mẫu cho biểu đồ nhân quả SciOS
  const nodes: CausalNode[] = [
    { id: "s1", label: "Nhiệt độ", type: "sensor", status: "normal", value: 85 },
    { id: "s2", label: "Áp suất", type: "sensor", status: "error", value: 120 },
    { id: "p1", label: "Phản ứng Hạt", type: "process", status: "warning", value: 45 },
    { id: "p2", label: "Tốc độ Luồng", type: "process", status: "normal", value: 92 },
    { id: "o1", label: "Độ tinh khiết", type: "output", status: "normal", value: 99.8 },
  ];

  const links: CausalLink[] = [
    { source: "s1", target: "p1", strength: 0.8 },
    { source: "s2", target: "p1", strength: 0.9 },
    { source: "p1", target: "o1", strength: 0.95 },
    { source: "p2", target: "o1", strength: 0.7 },
  ];

  // 1. Sửa lỗi Hydration: Đảm bảo chỉ render sau khi đã mount trên client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 400;

    svg.selectAll("*").remove();

    // Khởi tạo mô phỏng lực (Force Simulation)
    const simulation = d3.forceSimulation<CausalNode>(nodes)
      .force("link", d3.forceLink<CausalNode, CausalLink>(links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Vẽ các đường nối (Links) với hiệu ứng dòng chảy
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "flowing-line") // Class CSS tạo hiệu ứng dash-array animation
      .attr("stroke-width", 2)
      .attr("opacity", 0.6);

    // Vẽ các nhóm Node
    const node = svg.append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", d => `node ${d.status === 'error' ? 'root-cause-pulse' : ''}`)
      .call(d3.drag<SVGGElement, CausalNode>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Hiệu ứng vòng tròn tỏa lan cho Node lỗi
    node.filter(d => d.status === 'error')
      .append("circle")
      .attr("r", 20)
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .append("animate")
        .attr("attributeName", "r")
        .attr("values", "15;30;15")
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");

    // Hình dạng chính của Node
    node.append("rect")
      .attr("width", 120)
      .attr("height", 40)
      .attr("x", -60)
      .attr("y", -20)
      .attr("rx", 8)
      .attr("fill", d => d.status === 'error' ? "#7f1d1d" : "#0f172a")
      .attr("stroke", d => d.status === 'error' ? "#ef4444" : "#22d3ee")
      .attr("stroke-width", 2);

    // Nhãn của Node
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "#e2e8f0")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .text(d => d.label);

    // Cập nhật vị trí theo từng tick của simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

  }, [mounted]);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-slate-900/50 animate-pulse rounded-xl flex items-center justify-center text-slate-500">Đang khởi tạo hệ thống SciOS...</div>;
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 overflow-hidden">
      <style jsx global>{`
        @keyframes flow {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        .flowing-line {
          stroke: #22d3ee;
          stroke-dasharray: 5, 3;
          animation: flow 1s linear infinite;
        }
        .root-cause-pulse {
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.5));
        }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Bản đồ Nhân quả (Real-time)</h3>
            <p className="text-xs text-slate-400">Phân tích dòng chảy dữ liệu hạt nano</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-3 h-3" /> AI Active
          </span>
          <span className="flex items-center gap-1 text-[10px] bg-red-500/10 px-2 py-1 rounded text-red-400 border border-red-500/30">
            <AlertTriangle className="w-3 h-3" /> Root Cause Detected
          </span>
        </div>
      </div>

      <div className="relative h-[400px] w-full cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-full" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Confidence</p>
          <p className="text-cyan-400 font-bold text-lg">98.2%</p>
        </div>
        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Analysis Speed</p>
          <p className="text-white font-bold text-lg">12ms</p>
        </div>
        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Data Points</p>
          <p className="text-white font-bold text-lg">1.2k/s</p>
        </div>
      </div>
    </div>
  );
}