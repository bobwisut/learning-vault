export const GRID_COLUMNS = 12
export const GRID_ROWS = 8

export function noiseAt(index: number) {
  const x = index % GRID_COLUMNS
  const y = Math.floor(index / GRID_COLUMNS)
  const wave = Math.sin(x * 1.7 + y * 0.9) + Math.cos(x * 0.8 - y * 1.3)
  const grain = Math.sin((x + 3) * (y + 5) * 0.37)
  return Math.max(0, Math.min(1, 0.5 + wave * 0.18 + grain * 0.16))
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

export function buildNoiseCells() {
  return Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, index) => noiseAt(index))
}

export type CellMode = 'uv' | 'noise' | 'mask' | 'edge' | 'final'

export function CellGrid({
  cells,
  threshold,
  edgeWidth,
  tint,
  mode,
}: {
  cells: number[]
  threshold: number
  edgeWidth: number
  tint: string
  mode: CellMode
}) {
  return (
    <div className="grid aspect-[3/2] grid-cols-[repeat(12,minmax(0,1fr))] gap-1.5">
      {cells.map((value, index) => {
        const visible = value >= threshold
        const edge = Math.abs(value - threshold) <= edgeWidth
        const noiseLevel = Math.round(35 + value * 55)

        let className = 'rounded-sm border transition-all duration-200'
        let opacity = 1
        let style: { opacity?: number; backgroundColor?: string } = {}

        if (mode === 'uv') {
          const col = index % GRID_COLUMNS
          const row = Math.floor(index / GRID_COLUMNS)
          const r = Math.round(40 + (col / (GRID_COLUMNS - 1)) * 150)
          const g = Math.round(40 + (row / (GRID_ROWS - 1)) * 150)
          className += ' border-zinc-800'
          style = { backgroundColor: `rgb(${r} ${g} 90)` }
        }

        if (mode === 'noise') {
          className += ' border-zinc-800'
          style = { backgroundColor: `rgb(${noiseLevel} ${noiseLevel} ${noiseLevel})` }
        }

        if (mode === 'mask') {
          className += visible ? ' border-white/40 bg-white' : ' border-zinc-900 bg-zinc-950'
          opacity = visible ? 0.92 : 0.9
        }

        if (mode === 'edge') {
          className += edge ? `${tint} border-white/70 shadow-[0_0_14px_rgba(255,255,255,0.4)]` : ' border-zinc-900 bg-zinc-950'
          opacity = edge ? 0.95 : 0.16
        }

        if (mode === 'final') {
          className += [
            edge ? `${tint} border-white/70 shadow-[0_0_16px_rgba(255,255,255,0.45)]` : '',
            visible && !edge ? 'border-teal-200/40 bg-teal-300' : '',
            !visible ? 'border-zinc-900 bg-zinc-900' : '',
          ].join(' ')
          opacity = visible ? 0.78 + value * 0.22 : 0.06
        }

        return (
          <div
            key={index}
            className={className}
            style={{ opacity, ...style }}
            title={`noise ${formatPercent(value)}`}
          />
        )
      })}
    </div>
  )
}
