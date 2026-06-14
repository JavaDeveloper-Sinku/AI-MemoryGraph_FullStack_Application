"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { 
  Cpu, 
  RefreshCw, 
  Search, 
  Plus, 
  Trash2, 
  Link2, 
  Shuffle, 
  RotateCcw, 
  Info, 
  Sparkles,
  SearchX,
  PlusCircle
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { useWorkspace } from "@/hooks/useWorkspace"

interface GraphNode {
  id: string
  label: string
  description: string
  x: number
  y: number
  size: number
  color: string
  connections: number
}

interface GraphEdge {
  id: string
  source: string
  target: string
}

const DEFAULT_NODES: GraphNode[] = [
  { id: "1", label: "JWT Auth Security", x: 150, y: 120, size: 28, color: "#3b82f6", description: "Security filter chain and token issuing pipeline.", connections: 3 },
  { id: "2", label: "SQLite Local Writer", x: 320, y: 80, size: 24, color: "#10b981", description: "Local caching, journal writing, and fallback sync.", connections: 2 },
  { id: "3", label: "LLM Fine-tuning Config", x: 480, y: 150, size: 32, color: "#8b5cf6", description: "Quantized parameters and hyperparameter weights.", connections: 4 },
  { id: "4", label: "Redis Con Proxy", x: 180, y: 260, size: 26, color: "#f59e0b", description: "Connection pool management for active sockets.", connections: 2 },
  { id: "5", label: "Spatial Hash Index", x: 380, y: 300, size: 30, color: "#ec4899", description: "O(N log N) indexing for high-density vectors.", connections: 3 },
  { id: "6", label: "Entity BFS Traversal", x: 580, y: 260, size: 24, color: "#06b6d4", description: "Recursive BFS entity link discovery.", connections: 2 },
]

const DEFAULT_EDGES: GraphEdge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e1-3", source: "1", target: "3" },
]

export default function MemoryPage() {
  const { activities } = useWorkspace()
  const svgRef = React.useRef<SVGSVGElement>(null)

  // Graph State
  const [nodes, setNodes] = React.useState<GraphNode[]>(DEFAULT_NODES)
  const [edges, setEdges] = React.useState<GraphEdge[]>(DEFAULT_EDGES)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>("3") // Default select LLM node
  const [draggedNodeId, setDraggedNodeId] = React.useState<string | null>(null)
  
  // Creation States
  const [isAddingNode, setIsAddingNode] = React.useState(false)
  const [newNodeName, setNewNodeName] = React.useState("")
  const [newNodeDesc, setNewNodeDesc] = React.useState("")
  const [newNodeColor, setNewNodeColor] = React.useState("#3b82f6")
  
  const [targetConnectionId, setTargetConnectionId] = React.useState("")

  // Set page title
  React.useEffect(() => {
    document.title = "Memory Center | AI Memory Graph"
  }, [])

  // Dragging event handlers
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    setDraggedNodeId(nodeId)
    setSelectedNodeId(nodeId)
    setIsAddingNode(false)
  }

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedNodeId || !svgRef.current) return
    
    // Calculate SVG coordinate positions relative to viewport bounding rect
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Clamp inside boundaries (e.g. 40px padding)
    const clampedX = Math.max(40, Math.min(x, rect.width - 40))
    const clampedY = Math.max(40, Math.min(y, rect.height - 40))
    
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === draggedNodeId ? { ...node, x: clampedX, y: clampedY } : node
      )
    )
  }

  const handleSvgMouseUp = () => {
    setDraggedNodeId(null)
  }

  // Auto layout circle mapping
  const handleAutoReorganize = () => {
    if (nodes.length === 0) return
    const centerX = 380
    const centerY = 180
    const radius = 130
    
    setNodes((prev) =>
      prev.map((node, idx) => {
        const angle = (idx / prev.length) * 2 * Math.PI
        return {
          ...node,
          x: Math.round(centerX + radius * Math.cos(angle)),
          y: Math.round(centerY + radius * Math.sin(angle)),
        }
      })
    )
  }

  // Reset graph to initial
  const handleResetGraph = () => {
    if (confirm("Reset layout positions and custom nodes to default?")) {
      setNodes(DEFAULT_NODES)
      setEdges(DEFAULT_EDGES)
      setSelectedNodeId("3")
      setIsAddingNode(false)
    }
  }

  // Create new node
  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNodeName.trim()) return

    const newNodeId = `node-${Date.now()}`
    const newNode: GraphNode = {
      id: newNodeId,
      label: newNodeName.trim(),
      description: newNodeDesc.trim() || "Custom node added to knowledge base.",
      x: Math.round(250 + Math.random() * 200),
      y: Math.round(100 + Math.random() * 150),
      size: 24,
      color: newNodeColor,
      connections: 0
    }

    setNodes((prev) => [...prev, newNode])
    setSelectedNodeId(newNodeId)
    setNewNodeName("")
    setNewNodeDesc("")
    setIsAddingNode(false)
  }

  // Connect two nodes
  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedNodeId || !targetConnectionId || selectedNodeId === targetConnectionId) return

    // Avoid duplicate edges
    const exists = edges.some(
      (edge) =>
        (edge.source === selectedNodeId && edge.target === targetConnectionId) ||
        (edge.source === targetConnectionId && edge.target === selectedNodeId)
    )

    if (!exists) {
      const newEdge: GraphEdge = {
        id: `e-${selectedNodeId}-${targetConnectionId}`,
        source: selectedNodeId,
        target: targetConnectionId
      }
      setEdges((prev) => [...prev, newEdge])
      
      // Update local connection counts
      setNodes((prev) =>
        prev.map((node) =>
          node.id === selectedNodeId || node.id === targetConnectionId
            ? { ...node, connections: node.connections + 1 }
            : node
        )
      )
    }
    setTargetConnectionId("")
  }

  // Delete node
  const handleDeleteNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    if (confirm(`Forget and delete memory node "${node.label}"?`)) {
      setNodes((prev) => prev.filter((n) => n.id !== nodeId))
      setEdges((prev) => prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
      setSelectedNodeId(null)
    }
  }

  // Strengthen node connection (Increase circle size)
  const handleStrengthenNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId ? { ...node, size: Math.min(node.size + 3, 50) } : node
      )
    )
  }

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  // Nodes filtered by search query
  const filteredNodes = nodes.map((node) => {
    const isMatched = searchQuery
      ? node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase())
      : false
    return { ...node, isMatched }
  })

  // Dropdown nodes options to connect (excluding itself and currently connected nodes)
  const connectableNodes = nodes.filter((node) => {
    if (node.id === selectedNodeId) return false
    // Filter out already connected
    const isAlreadyConnected = edges.some(
      (edge) =>
        (edge.source === selectedNodeId && edge.target === node.id) ||
        (edge.source === node.id && edge.target === selectedNodeId)
    )
    return !isAlreadyConnected
  })

  return (
    <AppLayout>
      <div className="space-y-6 flex flex-col h-full">
        {/* Header Title & Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-5 select-none shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Memory Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Visualize, drag, link, or prune active memory nodes across your workspaces.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAutoReorganize}
              className="gap-1.5 text-xs h-9 bg-slate-900/40"
              title="Arrange nodes in a circular layout"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Arrange Circle</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetGraph}
              className="gap-1.5 text-xs h-9 bg-slate-900/40 hover:text-red-400"
              title="Reset graph to default layout"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Graph</span>
            </Button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 items-start">
          {/* Visual Canvas Panel (Left Column) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            {/* Search Bar inside canvas controls */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 inset-y-0 my-auto text-slate-500 w-4 h-4" />
                <Input
                  placeholder="Search and highlight memory nodes..."
                  className="pl-10 h-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="primary" 
                onClick={() => {
                  setIsAddingNode(true)
                  setSelectedNodeId(null)
                }}
                className="gap-1.5 text-xs h-10 px-4 bg-blue-600 hover:bg-blue-500 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Node</span>
              </Button>
            </div>

            {/* SVG Visualizer Container */}
            <div className="relative w-full h-[460px] bg-[#0c1222]/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center group">
              {/* Radial center glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

              <svg
                ref={svgRef}
                className="w-full h-full cursor-default select-none relative z-10"
                onMouseMove={handleSvgMouseMove}
                onMouseUp={handleSvgMouseUp}
                onMouseLeave={handleSvgMouseUp}
              >
                {/* Visual Draft Board Grid Pattern */}
                <defs>
                  <pattern id="graph-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#10182c" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#graph-grid)" />

                {/* Render Edges (Connecting Lines) */}
                {edges.map((edge) => {
                  const sourceNode = nodes.find((n) => n.id === edge.source)
                  const targetNode = nodes.find((n) => n.id === edge.target)
                  if (!sourceNode || !targetNode) return null
                  const isHighlighted = (sourceNode.id === selectedNodeId) || (targetNode.id === selectedNodeId)
                  
                  return (
                    <line
                      key={edge.id}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? "#3b82f6" : "#1e293b"}
                      strokeWidth={isHighlighted ? "2.5" : "1.5"}
                      strokeOpacity={isHighlighted ? "0.8" : "0.5"}
                      className="transition-all duration-100"
                    />
                  )
                })}

                {/* Render Nodes (Interactive Circles) */}
                {filteredNodes.map((node) => {
                  const isSelected = node.id === selectedNodeId
                  const isDragged = node.id === draggedNodeId
                  
                  return (
                    <g
                      key={node.id}
                      className="cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    >
                      {/* Active glow rings */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.size + 8}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.5"
                          strokeDasharray="4"
                          className="animate-[spin_12s_linear_infinite] opacity-60"
                        />
                      )}
                      {node.isMatched && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.size + 12}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                          className="animate-ping opacity-35"
                          style={{ animationDuration: "2s" }}
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill="#070a13"
                        stroke={node.isMatched ? "#ef4444" : node.color}
                        strokeWidth={isSelected ? "3" : "1.8"}
                        className="transition-all duration-75 shadow-lg shadow-black/80"
                      />

                      {/* Core center dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="4.5"
                        fill={node.isMatched ? "#ef4444" : node.color}
                        className="animate-pulse"
                      />

                      {/* Text Label */}
                      <text
                        x={node.x}
                        y={node.y + node.size + 15}
                        textAnchor="middle"
                        className="text-[10px] sm:text-[11px] font-semibold fill-slate-300 pointer-events-none select-none tracking-wide"
                      >
                        {node.label}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Instructions overlay */}
              <div className="absolute bottom-3 left-4 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none select-none flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Drag nodes to position • Click node to manage</span>
              </div>
            </div>
          </div>

          {/* Details Sidebar Panel (Right Column) */}
          <div className="flex flex-col space-y-4 h-full">
            {/* Adding Node Card */}
            {isAddingNode ? (
              <Card className="bg-[#0e1424]/90 border-slate-800/80 shadow-md">
                <CardHeader className="border-b border-slate-900/60 p-4">
                  <CardTitle className="text-xs font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                    <PlusCircle className="w-4 h-4 text-blue-400" />
                    <span>Initialize Node</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <form onSubmit={handleCreateNode} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Concept Name
                      </label>
                      <Input
                        required
                        value={newNodeName}
                        onChange={(e) => setNewNodeName(e.target.value)}
                        placeholder="e.g. Redux Toolkit, JWT Filter"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Brief Explanation
                      </label>
                      <textarea
                        value={newNodeDesc}
                        onChange={(e) => setNewNodeDesc(e.target.value)}
                        placeholder="Summarize this memory concept..."
                        className="flex min-h-[70px] w-full rounded-lg border border-slate-800/80 bg-[#161c2c]/40 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Node Category Color
                      </label>
                      <div className="flex items-center gap-2">
                        {[
                          { val: "#3b82f6", label: "Blue" },
                          { val: "#10b981", label: "Emerald" },
                          { val: "#8b5cf6", label: "Purple" },
                          { val: "#f59e0b", label: "Amber" },
                          { val: "#ec4899", label: "Pink" },
                        ].map((c) => (
                          <button
                            key={c.val}
                            type="button"
                            onClick={() => setNewNodeColor(c.val)}
                            className={`w-6 h-6 rounded-full border border-[#0B0F19] transition-transform ${newNodeColor === c.val ? "scale-110 ring-2 ring-blue-500/50" : "hover:scale-105"}`}
                            style={{ backgroundColor: c.val }}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-900/60">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingNode(false)}
                        className="text-xs h-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="text-xs h-8 bg-blue-600 hover:bg-blue-500"
                      >
                        Create Node
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : selectedNode ? (
              // Selected Node Detail Panel
              <Card className="bg-[#0e1424]/90 border-slate-800/80 shadow-md animate-in fade-in duration-200">
                <CardHeader className="border-b border-slate-900/60 p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }} />
                      <span>Memory Concept</span>
                    </CardTitle>
                    <button
                      onClick={() => handleDeleteNode(selectedNode.id)}
                      className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      title="Forget this concept node"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-100 tracking-tight leading-tight">
                      {selectedNode.label}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Strengthen button */}
                  <div className="flex items-center justify-between py-2.5 border-y border-slate-900/60">
                    <div className="text-xs font-semibold text-slate-500">Node Weight</div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStrengthenNode(selectedNode.id)}
                      className="text-[11px] h-8 px-2.5 gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Strengthen</span>
                    </Button>
                  </div>

                  {/* Connect Link Form */}
                  {connectableNodes.length > 0 ? (
                    <form onSubmit={handleAddConnection} className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Create Connection Link
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={targetConnectionId}
                          onChange={(e) => setTargetConnectionId(e.target.value)}
                          className="flex-1 rounded-lg border border-slate-800/80 bg-[#161c2c]/40 text-xs px-2 h-9 text-slate-200 outline-none focus:border-blue-500/50"
                        >
                          <option value="" className="bg-[#0e1424]">Select target node...</option>
                          {connectableNodes.map((node) => (
                            <option key={node.id} value={node.id} className="bg-[#0e1424]">
                              {node.label}
                            </option>
                          ))}
                        </select>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          disabled={!targetConnectionId}
                          className="h-9 text-xs gap-1 hover:border-blue-500/50 hover:bg-blue-500/5"
                        >
                          <Link2 className="w-3.5 h-3.5" />
                          <span>Link</span>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-xs font-medium text-slate-500 text-center py-2">
                      Connected to all available concepts.
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              // Empty State Sidebar
              <Card className="bg-[#0e1424]/90 border-slate-800/80 shadow-md py-12 flex flex-col items-center justify-center text-center px-4">
                <Cpu className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  No Node Selected
                </span>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                  Click on any graph bubble node to modify connections, strengthen link weight, or delete.
                </p>
              </Card>
            )}

            {/* Sync Status Card */}
            <Card className="bg-[#0e1424]/40 border-slate-800/60 shadow-sm p-4 space-y-3.5 select-none shrink-0">
              <div className="flex items-center gap-2 text-slate-300 border-b border-slate-900 pb-3">
                <Cpu className="w-4.5 h-4.5 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Sync Status
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Nodes Map Integrity</span>
                  <span className="text-emerald-400 font-bold">100% Secure</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Total Connections</span>
                  <span className="text-blue-400 font-bold">{edges.length} Links</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
