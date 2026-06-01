'use client'

import { useMemo, useState } from 'react'

const presets = [
  {
    name: 'Soft shield',
    rimPower: 2.2,
    intensity: 64,
    color: '#38bdf8',
    description: 'A broad readable rim for shields, bubbles, and selection outlines.',
  },
  {
    name: 'Sharp aura',
    rimPower: 4.8,
    intensity: 82,
    color: '#c084fc',
    description: 'A tight edge glow for magical outlines and stylized silhouettes.',
  },
  {
    name: 'Warm dissolve edge',
    rimPower: 3.2,
    intensity: 74,
    color: '#f59e0b',
    description: 'A bridge from rim lighting into dissolve and burn-edge effects.',
  },
]

function rimValue(x: number, y: number, rimPower: number) {
  const dx = x - 0.5
  const dy = y - 0.5
  const radius = Math.sqrt(dx * dx + dy * dy) / 0.5
  const sphereMask = radius <= 1 ? 1 : 0
  const normalZ = Math.sqrt(Math.max(0, 1 - radius * radius))
  const fresnel = Math.pow(1 - normalZ, rimPower)
  return sphereMask ? fresnel : 0
}

function hexToRgb(hex: string) {
  const value = hex.replace('#', '')
  const bigint = Number.parseInt(value, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

export default function FresnelRimDemo() {
  const [activePreset, setActivePreset] = useState<number | null>(0)
  const [rimPower, setRimPower] = useState(presets[0].rimPower)
  const [intensity, setIntensity] = useState(presets[0].intensity)
  const [rimColor, setRimColor] = useState(presets[0].color)
  const title = activePreset === null ? 'Custom rim' : presets[activePreset].name

  const cells = useMemo(() => {
    const size = 28
    return Array.from({ length: size * size }, (_, index) => {
      const x = (index % size) / (size - 1)
      const y = Math.floor(index / size) / (size - 1)
      return { x, y }
    })
  }, [])

  function applyPreset(index: number) {
    const preset = presets[index]
    setActivePreset(index)
    setRimPower(preset.rimPower)
    setIntensity(preset.intensity)
    setRimColor(preset.color)
  }

  const rgb = hexToRgb(rimColor)

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
            Fresnel rim preview
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="w-fit rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
          Power {rimPower.toFixed(1)} · Intensity {intensity}%
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-[radial-gradient(circle_at_35%_25%,#334155,#020617_62%)] p-4">
            <div className="mx-auto grid aspect-square max-w-md grid-cols-[repeat(28,minmax(0,1fr))] gap-px">
              {cells.map(({ x, y }, index) => {
                const dx = x - 0.5
                const dy = y - 0.5
                const radius = Math.sqrt(dx * dx + dy * dy) / 0.5
                const lit = radius <= 1
                const rim = rimValue(x, y, rimPower)
                const rimAlpha = Math.min(1, rim * (intensity / 45))
                const coreLight = lit ? Math.max(0, 1 - radius) : 0
                const background = lit
                  ? `rgba(${Math.round(25 + coreLight * 35)}, ${Math.round(32 + coreLight * 42)}, ${Math.round(
                      52 + coreLight * 58,
                    )}, 1)`
                  : 'transparent'
                const boxShadow = rimAlpha > 0.04 ? `0 0 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rimAlpha})` : ''

                return (
                  <div
                    key={index}
                    className="rounded-[2px]"
                    style={{
                      background,
                      boxShadow,
                      opacity: lit ? 1 : 0,
                      outline: rimAlpha > 0.06 ? `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rimAlpha})` : '',
                    }}
                  />
                )
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Rim power</span>
              <input
                type="range"
                min="1"
                max="7"
                step="0.1"
                value={rimPower}
                onChange={(event) => {
                  setRimPower(Number(event.target.value))
                  setActivePreset(null)
                }}
                className="w-full accent-violet-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">Emission intensity</span>
              <input
                type="range"
                min="20"
                max="100"
                value={intensity}
                onChange={(event) => {
                  setIntensity(Number(event.target.value))
                  setActivePreset(null)
                }}
                className="w-full accent-amber-300"
              />
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-zinc-300">Rim color</p>
            <div className="flex flex-wrap gap-2">
              {['#38bdf8', '#c084fc', '#f59e0b', '#34d399'].map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Set rim color ${color}`}
                  onClick={() => {
                    setRimColor(color)
                    setActivePreset(null)
                  }}
                  className={[
                    'h-9 w-9 rounded-full border transition-transform hover:scale-105',
                    rimColor === color ? 'border-white' : 'border-zinc-700',
                  ].join(' ')}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            Fresnel is strongest where the surface points away from the camera. On a sphere,
            that means the outer edge glows while the center stays calmer.
          </p>

          {presets.map((preset, index) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(index)}
              className={[
                'rounded-lg border p-4 text-left transition-colors',
                activePreset === index
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
    </section>
  )
}
