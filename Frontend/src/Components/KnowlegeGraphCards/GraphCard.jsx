import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import useGraph from "../../Hooks/useGraph"


const GraphCard = () => {
    const svgRef = useRef()
    const zoomRef = useRef()   // stores the d3.zoom() instance
    const svgSelRef = useRef()   // stores the d3 svg selection
    const [zoomLevel, setZoomLevel] = useState(100)

    const { context_graph, getGraphHandler } = useGraph();
    const { Graph } = context_graph;


    useEffect(() => {
        getGraphHandler();
    }, [])

    useEffect(() => {
        if (Graph.length === 0) return;

        if (Graph.nodes.length === 0) return <h1>No Items to show yet!</h1>

        drawGraph(Graph)
    }, [Graph])



    // ── Zoom control helpers (called by buttons) ─────────────
    const handleZoomIn = () => {
        if (!svgSelRef.current || !zoomRef.current) return
        svgSelRef.current.transition().duration(300)
            .call(zoomRef.current.scaleBy, 1.4)
    }
    const handleZoomOut = () => {
        if (!svgSelRef.current || !zoomRef.current) return
        svgSelRef.current.transition().duration(300)
            .call(zoomRef.current.scaleBy, 1 / 1.4)
    }
    const handleZoomReset = () => {
        if (!svgSelRef.current || !zoomRef.current) return
        svgSelRef.current.transition().duration(400)
            .call(zoomRef.current.transform, d3.zoomIdentity)
    }

    const drawGraph = (data) => {

        // existing semantic edges
        const semanticEdges = data.edges || []

        // create collection edges
        const collectionEdges = []

        const collectionGroups = {}

        data.nodes.forEach(node => {

            if (!node.collectionId) return

            if (!collectionGroups[node.collectionId]) {

                collectionGroups[node.collectionId] = []

            }

            collectionGroups[node.collectionId].push(node)

        })


        Object.values(collectionGroups).forEach(group => {

            for (let i = 0; i < group.length; i++) {

                for (let j = i + 1; j < group.length; j++) {

                    collectionEdges.push({

                        source: group[i].id,
                        target: group[j].id,
                        weight: 0.95,
                        type: "collection"

                    })

                }

            }

        })


        // merge both edge types
        data.edges = [

            ...semanticEdges,
            ...collectionEdges

        ]

        const width = svgRef.current?.clientWidth || 900
        const height = 560

        const svg = d3.select(svgRef.current)
        svgSelRef.current = svg          // save for button handlers
        svg.selectAll("*").remove()

        // ── Prevent the page from scrolling while inside the graph ──
        svgRef.current.addEventListener("wheel", (e) => e.preventDefault(), { passive: false })

        // ── Defs: gradient + glow filter ──────────────────────
        const defs = svg.append("defs")

        // Radial gradient for nodes
        const grad = defs.append("radialGradient")
            .attr("id", "nodeGrad")
            .attr("cx", "35%").attr("cy", "35%")
        grad.append("stop").attr("offset", "0%").attr("stop-color", "#a78bfa")
        grad.append("stop").attr("offset", "100%").attr("stop-color", "#6366f1")

        // Glow filter
        const filter = defs.append("filter").attr("id", "glow")
        filter.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "blur")
        const merge = filter.append("feMerge")
        merge.append("feMergeNode").attr("in", "blur")
        merge.append("feMergeNode").attr("in", "SourceGraphic")

        // Edge glow filter (subtler)
        const edgeFilter = defs.append("filter").attr("id", "edgeGlow")
        edgeFilter.append("feGaussianBlur").attr("stdDeviation", "1.5").attr("result", "blur")
        const edgeMerge = edgeFilter.append("feMerge")
        edgeMerge.append("feMergeNode").attr("in", "blur")
        edgeMerge.append("feMergeNode").attr("in", "SourceGraphic")

        // ── Force simulation ───────────────────────────────────
        const simulation = d3.forceSimulation(data.nodes)
            .force("link",
                d3.forceLink(data.edges)
                    .id(d => d.id)
                    .distance(90)
                    .strength(0.8)
            )
            .force("charge",
                d3.forceManyBody().strength(-90)
            )
            .force("collision",
                d3.forceCollide(12)
            )
            .force("center",
                d3.forceCenter(width / 2, height / 2)
            )
            .force("radial",
                d3.forceRadial(180, width / 2, height / 2).strength(0.03)
            )

        // ── Zoomable container group ───────────────────────────
        const container = svg.append("g").attr("class", "kg-zoom-container")

        // ── Links ──────────────────────────────────────────────
        const link = container.append("g")
            .selectAll("line")
            .data(data.edges)
            .enter()
            .append("line")
            .attr("stroke", d =>
                d.type === "collection"
                    ? "#22c55e"
                    : "#94a3b8"
            )
            .attr("stroke-width", d =>
                d.type === "collection"
                    ? 2.2
                    : 1.2
            )

        // ── Nodes ──────────────────────────────────────────────
        const node = container.append("g")
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("class", "kg-node")
            .attr("r", d => (d.weight ? 10 + d.weight * 3 : 12))
            .attr("fill", "url(#nodeGrad)")
            .attr("filter", "url(#glow)")
            .call(
                d3.drag()
                    // filter: don't start drag when ctrl/meta is held (those are pan gestures)
                    .filter(event => !event.ctrlKey && !event.metaKey && event.button === 0)
                    .on("start", dragStart)
                    .on("drag", dragging)
                    .on("end", dragEnd)
            )
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .transition().duration(200)
                    .attr("r", (d.weight ? 6 + d.weight * 2 : 8) + 5)
                link.transition().duration(200).attr("opacity", l =>
                    l.source.id === d.id || l.target.id === d.id ? 1 : 0.15
                )
            })
            .on("mouseout", function (event, d) {
                d3.select(this)
                    .transition().duration(200)
                    .attr("r", d => (d.weight ? 10 + d.weight * 3 : 12))
                link.transition().duration(200).attr("opacity", 0.55)
            })

        // ── Labels ─────────────────────────────────────────────
        const label = container.append("g")
            .selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
            .attr("class", "kg-label")
            .text(d => d.label)
            .attr("dx", 14)
            .attr("dy", 4)

        // ── Tick ───────────────────────────────────────────────
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

            label
                .attr("x", d => d.x)
                .attr("y", d => d.y)
        })

        // ── Zoom behaviour ─────────────────────────────────────
        const zoom = d3.zoom()
            .scaleExtent([0.1, 8])          // min 10% → max 800%
            .on("zoom", (event) => {
                container.attr("transform", event.transform)
                // update zoom level badge (rounded to nearest 10)
                const pct = Math.round(event.transform.k * 100)
                setZoomLevel(pct)
            })

        svg.call(zoom)
        zoomRef.current = zoom            // save for button handlers

        // ── Drag handlers ──────────────────────────────────────
        function dragStart(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x; d.fy = d.y
        }
        function dragging(event, d) {
            d.fx = event.x; d.fy = event.y
        }
        function dragEnd(event, d) {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null; d.fy = null
        }
    }


    return (
        <div className="kg-graph-wrap">
            <div className="kg-graph-wrap__toolbar">

                <div className="kg-graph-wrap__toolbar-label">Live graph · {Graph?.nodes?.length || 0} nodes</div>
                <div className="kg-graph-wrap__toolbar-controls">
                    <button className="kg-zoom-btn" onClick={handleZoomOut} title="Zoom out">−</button>
                    <span className="kg-zoom-level">{zoomLevel}%</span>
                    <button className="kg-zoom-btn" onClick={handleZoomIn} title="Zoom in">+</button>
                    <button className="kg-zoom-btn kg-zoom-btn--reset" onClick={handleZoomReset} title="Reset view">⊙</button>
                </div>
            </div>
            <svg ref={svgRef} height="560" />

        </div>
    )
}


export default GraphCard
