'use client'

import { useMemo, useState } from 'react'
import { CellGrid, buildNoiseCells, formatPercent } from './dissolveCore'

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

const breakdownPanels = [
  {
    title: '1. Raw noise',
    mode: 'noise' as const,
    description: 'The shader samples a grayscale pattern. Bright cells have higher values.',
  },
  {
    title: '2. Threshold mask',
    mode: 'mask' as const,
    description: 'The cutoff turns grayscale into yes or no: stay visible or disappear.',
  },
  {
    title: '3. Edge band',
    mode: 'edge' as const,
    description: 'Values near the cutoff become the glowing border.',
  },
  {
    title: '4. Final dissolve',
    mode: 'final' as const,
    description: 'The mask hides pixels, then the edge band adds color back.',
  },
]

export default function DissolveShaderDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [threshold, setThreshold] = useState(presets[0].threshold)
  const [edgeWidth, setEdgeWidth] = useState(presets[0].edgeWidth)
  const active = presets[activePreset]
  const cells = useMemo(() => buildNoiseCells(), [])

  function applyPreset(index: number) {
    setActivePreset(index)
    setThreshold(presets[index].threshold)
    setEdgeWidth(presets[index].edgeWidth)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-300">
                Dissolve pipeline
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{active.name}</h3>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
              Threshold {formatPercent(threshold)}
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {breakdownPanels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-white">{panel.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{panel.description}</p>
                </div>
                <div className="overflow-hidden rounded-md border border-zinc-800 bg-[radial-gradient(circle_at_30%_20%,#334155,transparent_32%),linear-gradient(135deg,#18181b,#020617)] p-3">
                  <CellGrid
                    cells={cells}
                    threshold={threshold}
                    edgeWidth={edgeWidth}
                    tint={active.tint}
                    mode={panel.mode}
                  />
                </div>
              </div>
            ))}
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
            Read the panels from left to right. The same noise pattern becomes a hard mask,
            then a thin edge band, then the final visible dissolve.
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
