'use client'

import { useState } from 'react'

const COLS = 16
const ROWS = 10

type Preset = {
  name: string
  scale: number
  roughness: number
  description: string
}

const presets: Preset[] = [
  {
    name: 'Organic',
    scale: 2.5,
    roughness: 0.2,
    description: 'Wide, soft blobs. Good for clouds, smoke, and large dissolve masks.',
  },
  {
    name: 'Gritty',
    scale: 5,
    roughness: 0.75,
    description: 'High-frequency, high-contrast grain. Good for rust, surface grit, and weathering.',
  },
  {
    name: 'Ripple',
    scale: 3,
    roughness: 0.05,
    description: 'Ultra-smooth at medium scale. Good for water surfaces and flowing energy.',
  },
]

function hash2(ix: number, iy: number): number {
  const x = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function smoothNoise(u: number, v: number): number {
  const ix = Math.floor(u)
  const iy = Math.floor(v)
  const tx = u - ix
  const ty = v - iy
  // Smooth-step curve (same as GLSL smoothstep) prevents blocky transitions
  const sx = tx * tx * (3 - 2 * tx)
  const sy = ty * ty * (3 - 2 * ty)
  const a = hash2(ix, iy)
  const b = hash2(ix + 1, iy)
  const c = hash2(ix, iy + 1)
  const d = hash2(ix + 1, iy + 1)
  return a + (b - a) * sx + (c - a) * sy + (d - b - c + a) * sx * sy
}

function applyContrast(value: number, roughness: number): number {
  const factor = 0.2 + roughness * 3.5
  return Math.max(0, Math.min(1, (value - 0.5) * factor + 0.5))
}

type Mode = 'uv' | 'cell' | 'smooth' | 'final'

function getCellValue(col: number, row: number, scale: number, roughness: number, mode: Mode): number {
  const u = (col / COLS) * scale
  const v = (row / ROWS) * scale
  switch (mode) {
    case 'uv':
      return (col / COLS + row / ROWS) / 2
    case 'cell':
      return hash2(Math.floor(u), Math.floor(v))
    case 'smooth':
      return smoothNoise(u, v)
    case 'final':
      return applyContrast(smoothNoise(u, v), roughness)
  }
}

function CellGrid({ scale, roughness, mode }: { scale: number; roughness: number; mode: Mode }) {
  return (
    <div
      className="grid aspect-[8/5] gap-1"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, index) => {
        const col = index % COLS
        const row = Math.floor(index / COLS)
        const value = getCellValue(col, row, scale, roughness, mode)
        const g = Math.round(value * 255)
        return (
          <div
            key={index}
            className="rounded-[2px] transition-all duration-200"
            style={{ backgroundColor: `rgb(${g} ${g} ${g})` }}
          />
        )
      })}
    </div>
  )
}

const breakdownPanels: { title: string; mode: Mode; description: string }[] = [
  {
    title: '1. UV coordinates',
    mode: 'uv',
    description: 'The raw input: every pixel has a position. No randomness yet, just a diagonal gradient.',
  },
  {
    title: '2. Cell hash',
    mode: 'cell',
    description:
      'Each grid cell gets a deterministic random value. Same input always returns the same value.',
  },
  {
    title: '3. Smooth blend',
    mode: 'smooth',
    description:
      'The hash values smoothly interpolated between corners using a smooth-step curve. This is the noise.',
  },
  {
    title: '4. Final output',
    mode: 'final',
    description: 'Contrast applied to the smooth noise. Ready to use as a mask, dissolve input, or texture.',
  },
]

export default function NoiseBasicsDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [scale, setScale] = useState(presets[0].scale)
  const [roughness, setRoughness] = useState(presets[0].roughness)

  function applyPreset(index: number) {
    setActivePreset(index)
    setScale(presets[index].scale)
    setRoughness(presets[index].roughness)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
                Noise pipeline
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{presets[activePreset].name}</h3>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
              Scale ×{scale.toFixed(1)} · Roughness {Math.round(roughness * 100)}%
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {breakdownPanels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-white">{panel.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{panel.description}</p>
                </div>
                <div className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 p-3">
                  <CellGrid scale={scale} roughness={roughness} mode={panel.mode} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Scale</span>
              <input
                type="range"
                min="1"
                max="7"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-violet-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Roughness</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={roughness}
                onChange={(e) => setRoughness(Number(e.target.value))}
                className="w-full accent-violet-400"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            Noise is not truly random. The same UV coordinates always return the same value. Scale zooms
            the pattern in or out; roughness sharpens or softens the result.
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
                    ? 'border-violet-400 bg-violet-400/10'
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
