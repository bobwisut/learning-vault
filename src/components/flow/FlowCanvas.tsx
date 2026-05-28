'use client'

import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface FlowCanvasProps {
  nodes: Node[]
  edges: Edge[]
  className?: string
}

export default function FlowCanvas({ nodes, edges, className }: FlowCanvasProps) {
  return (
    <div className={`h-80 w-full rounded-lg border border-zinc-700 overflow-hidden ${className ?? ''}`}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
