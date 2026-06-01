'use client'

import { useMemo, useState } from 'react'

const presets = [
  {
    name: 'Soft edge',
    threshold: 0.42,
    edgeWidth: 0.18,
    tint: 'bg-cyan-300',
    description: 'Wide glow band, useful when the dissolve should feel magical.',
  },
  {
    name: 'Crisp cut',
    threshold: 0.58,
    edgeWidth: 0.08,
    tint: 'bg-amber-300',
    description: 'Tighter cutoff, closer to a hard alpha clip.',
  },
  {
    name: 'Almost gone',
    threshold: 0.74,
    edgeWidth: 0.12,
    tint: 'bg-fuchsia-300',
    description: 'Only the brightest noise islands remain visible.',
  },
]

function noiseAt(index: number) {
  const x = index % 18
  const y = Math.floor(index / 18)
  const wave = Math.sin(x * 1.7 + y * 0.9) + Math.cos(x * 0.8 - y * 1.3)
  const grain = Math.sin((x + 3) * (y + 5) * 0.37)
  return Math.max(0, Math.min(1, 0.5 + wave * 0.18 + grain * 0.16))
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

export default function DissolveShaderDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [threshold, setThreshold] = useState(presets[0].threshold)
  const [edgeWidth, setEdgeWidth] = useState(presets[0].edgeWidth)
  const active = presets[activePreset]
  const cells = useMemo(() => Array.from({ length: 18 * 12 }, (_, index) => noiseAt(index)), [])

  function applyPreset(index: number) {
    setActivePreset(index)
    setThreshold(presets[index].threshold)
    setEdgeWidth(presets[index].edgeWidth)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-300">
                Live dissolve preview
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{active.name}</h3>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
              Threshold {formatPercent(threshold)}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-[radial-gradient(circle_at_30%_20%,#334155,transparent_32%),linear-gradient(135deg,#18181b,#020617)] p-3">
            <div className="grid aspect-[3/2] grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
              {cells.map((value, index) => {
                const visible = value >= threshold
                const edge = Math.abs(value - threshold) <= edgeWidth
                const opacity = visible ? 0.78 + value * 0.22 : 0.06

                return (
                  <div
                    key={index}
                    className={[
                      'rounded-sm border transition-all duration-200',
                      edge ? `${active.tint} border-white/70 shadow-[0_0_16px_rgba(255,255,255,0.45)]` : '',
                      visible && !edge ? 'border-teal-200/40 bg-teal-300' : '',
                      !visible ? 'border-zinc-900 bg-zinc-900' : '',
                    ].join(' ')}
                    style={{ opacity }}
                    title={`noise ${formatPercent(value)}`}
                  />
                )
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Alpha cutoff</span>
              <input
                type="range"
                min="0.2"
                max="0.86"
                step="0.01"
                value={threshold}
                onChange={(event) => setThreshold(Number(event.target.value))}
                className="w-full accent-teal-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Edge width</span>
              <input
                type="range"
                min="0.03"
                max="0.24"
                step="0.01"
                value={edgeWidth}
                onChange={(event) => setEdgeWidth(Number(event.target.value))}
                className="w-full accent-amber-300"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            The grid stands in for a surface. Each square samples a noise value. Raising the
            cutoff hides more squares; the edge band highlights values close to the cutoff.
          </p>

          <div className="grid gap-3">
            {presets.map((preset, index) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(index)}
                className={[
                  'rounded-lg border p-4 text-left transition-colors',
                  index === activePreset
                    ? 'border-teal-400 bg-teal-400/10'
                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600',
                ].join(' ')}
              >
                <span className="block text-sm font-semibold text-white">{preset.name}</span>
                <span className="mt-1 block text-sm leading-5 text-zinc-400">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
