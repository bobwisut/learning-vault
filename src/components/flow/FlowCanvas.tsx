interface ConceptCard {
  name: string
  receives?: string
  changes?: string
  watch?: string
}

interface FlowCanvasProps {
  nodes?: unknown
  edges?: unknown
  steps?: string
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

function CardFieldRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt
        className={`text-[10px] font-medium uppercase tracking-wide ${
          accent ? 'text-sky-500/80' : 'text-zinc-500'
        }`}
      >
        {label}
      </dt>
      <dd className={`text-xs ${accent ? 'text-sky-200' : 'text-zinc-300'}`}>{value}</dd>
    </div>
  )
}

// A "rich" step uses the `::` field separator: "Name :: receives :: changes :: watch".
// Plain steps (no `::`) keep the simple label-chain layout. Steps are `|`-separated.
function parseRichCards(steps?: string): ConceptCard[] | null {
  if (!steps) return null
  const rows = steps
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split('::').map((p) => p.trim()))
  if (!rows.some((parts) => parts.length > 1)) return null
  return rows.map(([name, receives, changes, watch]) => ({
    name,
    receives: receives || undefined,
    changes: changes || undefined,
    watch: watch || undefined,
  }))
}

export default function FlowCanvas({ nodes, edges, steps, className }: FlowCanvasProps) {
  const cards = parseRichCards(steps)
  if (cards && cards.length > 0) {
    return (
      <div className={`not-prose my-8 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5 ${className ?? ''}`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={`${card.name}-${index}`}
              className="flex flex-col gap-2 rounded-md border border-zinc-700 bg-zinc-900 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-xs font-semibold text-zinc-400">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-white">{card.name}</p>
              </div>
              <dl className="flex flex-col gap-1.5">
                {card.receives ? <CardFieldRow label="Receives" value={card.receives} /> : null}
                {card.changes ? <CardFieldRow label="Changes" value={card.changes} /> : null}
                {card.watch ? <CardFieldRow label="Watch" value={card.watch} accent /> : null}
              </dl>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const stepNodes = steps
    ?.split('|')
    .map((step) => step.trim())
    .filter(Boolean)
    .map((label, index) => ({
      id: `step-${index + 1}`,
      position: { x: index * 100, y: 0 },
      data: { label },
    }))

  const normalizedNodes = stepNodes ?? asArray<ConceptNode>(nodes).filter(isConceptNode)
  const normalizedEdges =
    stepNodes?.slice(0, -1).map((node, index) => ({
      id: `${node.id}-${stepNodes[index + 1].id}`,
      source: node.id,
      target: stepNodes[index + 1].id,
    })) ?? asArray<ConceptEdge>(edges).filter(isConceptEdge)
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
