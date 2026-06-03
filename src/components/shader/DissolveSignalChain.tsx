import { CellGrid, buildNoiseCells, type CellMode } from './dissolveCore'

type Node = {
  name: string
  mode: CellMode
  receives: string
  changes: string
  lookFor: string
}

const THRESHOLD = 0.5
const EDGE_WIDTH = 0.14
const TINT = 'bg-cyan-300'

const nodes: Node[] = [
  {
    name: 'UV',
    mode: 'uv',
    receives: 'mesh surface position',
    changes: 'gives each pixel a coordinate',
    lookFor: 'a smooth coordinate gradient',
  },
  {
    name: 'Noise',
    mode: 'noise',
    receives: 'UV coordinate',
    changes: 'coordinate → grayscale 0–1 value',
    lookFor: 'bright and dark islands',
  },
  {
    name: 'Threshold',
    mode: 'mask',
    receives: 'noise value + cutoff',
    changes: 'grayscale → keep vs remove',
    lookFor: 'the surface splitting in two',
  },
  {
    name: 'Edge Glow',
    mode: 'edge',
    receives: 'values near the cutoff',
    changes: 'adds a readable border color',
    lookFor: 'a thin glowing dissolve edge',
  },
  {
    name: 'Final Color',
    mode: 'final',
    receives: 'mask + edge combined',
    changes: 'composites the visible result',
    lookFor: 'the finished dissolve',
  },
]

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className={`text-[10px] font-medium uppercase tracking-wide ${accent ? 'text-cyan-400/90' : 'text-zinc-500'}`}>
        {label}
      </dt>
      <dd className={`text-xs leading-snug ${accent ? 'text-cyan-100' : 'text-zinc-300'}`}>{value}</dd>
    </div>
  )
}

export default function DissolveSignalChain() {
  const cells = buildNoiseCells()

  return (
    <div className="not-prose my-8 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2 md:overflow-x-auto md:pb-2">
        {nodes.map((node, index) => (
          <div key={node.name} className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            <div className="flex w-full flex-col gap-3 rounded-md border border-zinc-700 bg-zinc-900 p-4 md:w-72 md:shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-sm font-semibold text-zinc-400">
                  {index + 1}
                </span>
                <p className="text-base font-semibold text-white">{node.name}</p>
              </div>
              <div className="overflow-hidden rounded border border-zinc-800 bg-[linear-gradient(135deg,#18181b,#020617)] p-2.5">
                <CellGrid cells={cells} threshold={THRESHOLD} edgeWidth={EDGE_WIDTH} tint={TINT} mode={node.mode} />
              </div>
              <dl className="flex flex-col gap-2">
                <Field label="Receives" value={node.receives} />
                <Field label="Changes" value={node.changes} />
                <Field label="Look for" value={node.lookFor} accent />
              </dl>
            </div>
            {index < nodes.length - 1 ? (
              <div className="flex shrink-0 items-center justify-center text-lg text-zinc-600 md:px-0.5" aria-hidden>
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
