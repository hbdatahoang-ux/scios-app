"use client";
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id).distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", mode === "REVEAL" ? "#22d3ee" : "#334155")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", mode === "REVEAL" ? "6 6" : "0");

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");

    node
      .append("circle")
      .attr("r", 26)
      .attr("fill", (d: any) => {
        if (mode === "FAULT" && d.id === "INV") return "#ef4444";
        if (mode === "REVEAL" && d.id === "INV") return "#06b6d4";
        return "#0f172a";
      })
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 2);

    node
      .append("text")
      .text((d: any) => d.label)
      .attr("dy", 50)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .style("font-size", "12px")
      .style("font-family", "monospace");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
  }, [mode]);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
      <h2 className="text-cyan-400 text-xs mb-4 tracking-widest uppercase">
        Causal Graph Engine
      </h2>

      <svg ref={svgRef} width="700" height="400" />
    </div>
  );
}