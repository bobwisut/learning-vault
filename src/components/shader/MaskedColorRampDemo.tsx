'use client'

import { useMemo, useState } from 'react'

const GRID_COLUMNS = 12
const GRID_ROWS = 8

type RGB = [number, number, number]

type Preset = {
  name: string
  colors: [RGB, RGB, RGB]
  posA: number
  posB: number
  description: string
}

const presets: Preset[] = [
  {
    name: 'Lava',
    colors: [
      [20, 8, 30],
      [200, 60, 20],
      [255, 220, 120],
    ],
    posA: 0.45,
    posB: 0.78,
    description: 'Dark rock, glowing edge, bright molten core.',
  },
  {
    name: 'Toxic',
    colors: [
      [10, 25, 15],
      [40, 160, 60],
      [200, 255, 120],
    ],
    posA: 0.4,
    posB: 0.72,
    description: 'Deep green base ramping into an acid highlight.',
  },
  {
    name: 'Ice',
    colors: [
      [10, 20, 40],
      [60, 130, 210],
      [210, 240, 255],
    ],
    posA: 0.38,
    posB: 0.7,
    description: 'Cold shadow into bright frozen highlights.',
  },
]

function noiseAt(index: number) {
  const x = index % GRID_COLUMNS
  const y = Math.floor(index / GRID_COLUMNS)
  const wave = Math.sin(x * 1.7 + y * 0.9) + Math.cos(x * 0.8 - y * 1.3)
  const grain = Math.sin((x + 3) * (y + 5) * 0.37)
  return Math.max(0, Math.min(1, 0.5 + wave * 0.18 + grain * 0.16))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ]
}

// Map a grayscale value to a 3-stop color ramp. posA / posB control where the
// mid and bright colors take over.
function rampColor(value: number, colors: [RGB, RGB, RGB], posA: number, posB: number): RGB {
  const [low, mid, high] = colors
  if (value <= posA) {
    const t = posA <= 0 ? 1 : value / posA
    return lerpRGB(low, mid, t)
  }
  if (value <= posB) {
    const span = posB - posA
    const t = span <= 0 ? 1 : (value - posA) / span
    return lerpRGB(mid, high, t)
  }
  return high
}

function rgbString([r, g, b]: RGB) {
  return `rgb(${r} ${g} ${b})`
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

function CellGrid({
  cells,
  colors,
  posA,
  posB,
  mode,
}: {
  cells: number[]
  colors: [RGB, RGB, RGB]
  posA: number
  posB: number
  mode: 'gray' | 'bands' | 'color' | 'final'
}) {
  return (
    <div className="grid aspect-[3/2] grid-cols-[repeat(12,minmax(0,1fr))] gap-1.5">
      {cells.map((value, index) => {
        const gray = Math.round(35 + value * 55)
        let className = 'rounded-sm border border-zinc-800 transition-all duration-200'
        let style: { backgroundColor?: string } = {}

        if (mode === 'gray') {
          style = { backgroundColor: `rgb(${gray} ${gray} ${gray})` }
        }

        if (mode === 'bands') {
          // Show which ramp segment each cell falls into: low / mid / high.
          const band = value <= posA ? colors[0] : value <= posB ? colors[1] : colors[2]
          style = { backgroundColor: rgbString(band) }
        }

        if (mode === 'color' || mode === 'final') {
          style = { backgroundColor: rgbString(rampColor(value, colors, posA, posB)) }
        }

        if (mode === 'final') {
          className += ' shadow-[0_0_8px_rgba(0,0,0,0.4)]'
        }

        return (
          <div
            key={index}
            className={className}
            style={style}
            title={`mask ${formatPercent(value)}`}
          />
        )
      })}
    </div>
  )
}

const breakdownPanels = [
  {
    title: '1. Grayscale mask',
    mode: 'gray' as const,
    description: 'The input is a single grayscale value per pixel: how far along the ramp it lands.',
  },
  {
    title: '2. Banded zones',
    mode: 'bands' as const,
    description: 'The two stop positions split the mask into low, mid, and high color zones.',
  },
  {
    title: '3. Ramp lookup',
    mode: 'color' as const,
    description: 'Each value is smoothly mapped into the gradient between the stops.',
  },
  {
    title: '4. Final result',
    mode: 'final' as const,
    description: 'Same gray mask, now reading as a stylized colored surface.',
  },
]

function RampBar({
  colors,
  posA,
  posB,
}: {
  colors: [RGB, RGB, RGB]
  posA: number
  posB: number
}) {
  const gradient = `linear-gradient(to right, ${rgbString(colors[0])} 0%, ${rgbString(colors[1])} ${Math.round(
    posA * 100,
  )}%, ${rgbString(colors[2])} ${Math.round(posB * 100)}%)`
  return (
    <div className="relative">
      <div className="h-6 w-full rounded-md border border-zinc-700" style={{ background: gradient }} />
      <div
        className="absolute -top-1 h-8 w-0.5 bg-white/80"
        style={{ left: `${Math.round(posA * 100)}%` }}
      />
      <div
        className="absolute -top-1 h-8 w-0.5 bg-white/80"
        style={{ left: `${Math.round(posB * 100)}%` }}
      />
    </div>
  )
}

export default function MaskedColorRampDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [posA, setPosA] = useState(presets[0].posA)
  const [posB, setPosB] = useState(presets[0].posB)
  const active = presets[activePreset]
  const cells = useMemo(
    () => Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, index) => noiseAt(index)),
    [],
  )

  function applyPreset(index: number) {
    setActivePreset(index)
    setPosA(presets[index].posA)
    setPosB(presets[index].posB)
  }

  // Keep the stops ordered so the mid color never collapses past the high stop.
  const safeA = Math.min(posA, posB - 0.05)
  const safeB = Math.max(posB, posA + 0.05)

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-300">
                Color ramp pipeline
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{active.name}</h3>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
              Stops {formatPercent(safeA)} / {formatPercent(safeB)}
            </span>
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium text-zinc-300">The ramp</span>
            <RampBar colors={active.colors} posA={safeA} posB={safeB} />
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
                    colors={active.colors}
                    posA={safeA}
                    posB={safeB}
                    mode={panel.mode}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Mid stop position</span>
              <input
                type="range"
                min="0.1"
                max="0.7"
                step="0.01"
                value={posA}
                onChange={(event) => setPosA(Number(event.target.value))}
                className="w-full accent-teal-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">High stop position</span>
              <input
                type="range"
                min="0.3"
                max="0.95"
                step="0.01"
                value={posB}
                onChange={(event) => setPosB(Number(event.target.value))}
                className="w-full accent-amber-300"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            One grayscale mask drives every panel. Moving the stops only changes where each
            color takes over, not the underlying mask.
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
                <span className="flex items-center gap-2">
                  <span className="flex gap-1">
                    {preset.colors.map((color, i) => (
                      <span
                        key={i}
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ backgroundColor: rgbString(color) }}
                      />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-white">{preset.name}</span>
                </span>
                <span className="mt-1 block text-sm leading-5 text-zinc-400">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
