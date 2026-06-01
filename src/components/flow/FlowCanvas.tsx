interface FlowCanvasProps {
  nodes: unknown
  edges: unknown
  className?: string
}

interface ConceptNode {
  id: string
  position?: { x: number; y: number }
  data?: { label?: string }
}

interface ConceptEdge {
  id: string
  source: string
  target: string
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') return Object.values(value) as T[]
  return []
}

function isConceptNode(value: unknown): value is ConceptNode {
  return Boolean(value && typeof value === 'object' && 'id' in value)
}

function isConceptEdge(value: unknown): value is ConceptEdge {
  return Boolean(value && typeof value === 'object' && 'source' in value && 'target' in value)
}

export default function FlowCanvas({ nodes, edges, className }: FlowCanvasProps) {
  const normalizedNodes = asArray<ConceptNode>(nodes).filter(isConceptNode)
  const normalizedEdges = asArray<ConceptEdge>(edges).filter(isConceptEdge)
  const orderedNodes = [...normalizedNodes].sort((a, b) => {
    const yDiff = (a.position?.y ?? 0) - (b.position?.y ?? 0)
    if (Math.abs(yDiff) > 40) return yDiff
    return (a.position?.x ?? 0) - (b.position?.x ?? 0)
  })

  const getNodeLabel = (id: string) => normalizedNodes.find((node) => node.id === id)?.data?.label ?? id

  if (orderedNodes.length === 0) {
    return (
      <div className={`not-prose my-8 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400 ${className ?? ''}`}>
        Concept map unavailable.
      </div>
    )
  }

  return (
    <div className={`not-prose my-8 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5 ${className ?? ''}`}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {orderedNodes.map((node, index) => {
          const label = node.data?.label ?? node.id

          return (
            <div
              key={node.id}
              className="rounded-md border border-zinc-700 bg-zinc-900 p-3 text-zinc-100"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-600 text-xs font-semibold text-zinc-400">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-white">{label}</p>
            </div>
          )
        })}
      </div>

      {normalizedEdges.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {normalizedEdges.map((edge) => (
            <span key={edge.id} className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
              {getNodeLabel(edge.source)}
              <span className="px-1 text-zinc-600">-&gt;</span>
              {getNodeLabel(edge.target)}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
