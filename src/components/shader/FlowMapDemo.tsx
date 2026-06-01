'use client'

import { useState } from 'react'

const presets = [
  {
    name: 'Water drift',
    speed: 38,
    direction: 'right',
    colors: ['#0f766e', '#22d3ee', '#164e63'],
    description: 'Slow sideways movement, useful for water or mist.',
  },
  {
    name: 'Energy stream',
    speed: 72,
    direction: 'up',
    colors: ['#581c87', '#c084fc', '#06b6d4'],
    description: 'Fast vertical movement for magic or shield energy.',
  },
  {
    name: 'Smoke crawl',
    speed: 24,
    direction: 'down-right',
    colors: ['#27272a', '#a1a1aa', '#52525b'],
    description: 'Heavy diagonal motion for smoke, dust, or cloud masks.',
  },
]

const directions = {
  right: { label: 'Right', x: 128, y: 0 },
  up: { label: 'Up', x: 0, y: -128 },
  'down-right': { label: 'Down right', x: 128, y: 128 },
  left: { label: 'Left', x: -128, y: 0 },
}

type Direction = keyof typeof directions

function durationFromSpeed(speed: number) {
  return `${Math.max(1.8, 8 - speed / 12)}s`
}

function Pattern({
  animated,
  bent,
  colors,
  direction,
  speed,
}: {
  animated: boolean
  bent: boolean
  colors: string[]
  direction: Direction
  speed: number
}) {
  const vector = directions[direction]
  const style = {
    '--flow-x': `${vector.x}px`,
    '--flow-y': `${vector.y}px`,
    '--flow-duration': durationFromSpeed(speed),
    backgroundImage: `
      radial-gradient(circle at 20% 30%, ${colors[1]} 0 9%, transparent 10%),
      radial-gradient(circle at 70% 45%, ${colors[2]} 0 12%, transparent 13%),
      radial-gradient(circle at 42% 78%, ${colors[1]} 0 8%, transparent 9%),
      linear-gradient(135deg, ${colors[0]}, #020617)
    `,
    backgroundSize: '128px 128px, 128px 128px, 128px 128px, auto',
  } as React.CSSProperties

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div
        className={[
          'absolute -inset-40 opacity-90',
          animated ? 'flow-map-pan' : '',
          bent ? 'flow-map-bend' : '',
        ].join(' ')}
        style={style}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white">
        {animated ? `${bent ? 'Bent flow' : 'Panning'} ${vector.label.toLowerCase()}` : 'Static sample'}
      </div>
    </div>
  )
}

export default function FlowMapDemo() {
  const [activePreset, setActivePreset] = useState<number | null>(0)
  const [themePreset, setThemePreset] = useState(0)
  const [speed, setSpeed] = useState(presets[0].speed)
  const [direction, setDirection] = useState<Direction>('right')
  const [bentFlow, setBentFlow] = useState(false)
  const active = presets[themePreset]
  const title = activePreset === null ? 'Custom flow' : active.name

  function applyPreset(index: number) {
    const preset = presets[index]
    setActivePreset(index)
    setThemePreset(index)
    setSpeed(preset.speed)
    setDirection(preset.direction as Direction)
    setBentFlow(index === 2)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
      <style>{`
        @keyframes flow-map-pan {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--flow-x), var(--flow-y), 0); }
        }

        .flow-map-pan {
          animation: flow-map-pan var(--flow-duration) linear infinite;
        }

        .flow-map-bend {
          filter: url("#flow-map-bend-filter");
        }
      `}</style>

      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="flow-map-bend-filter">
          <feTurbulence baseFrequency="0.018 0.035" numOctaves="2" seed="8" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
            UV panning preview
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="w-fit rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
          Speed {speed}% · {directions[direction].label}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">Same UVs, no time offset</p>
          <Pattern animated={false} bent={bentFlow} colors={active.colors} direction={direction} speed={speed} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">UVs plus time offset</p>
          <Pattern animated bent={bentFlow} colors={active.colors} direction={direction} speed={speed} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-300">Pan speed</span>
            <input
              type="range"
              min="10"
              max="90"
              value={speed}
              onChange={(event) => {
                setSpeed(Number(event.target.value))
                setActivePreset(null)
              }}
              className="w-full accent-cyan-300"
            />
          </label>

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-zinc-300">Direction</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(directions) as Direction[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setDirection(key)
                    setActivePreset(null)
                  }}
                  className={[
                    'rounded-lg border px-3 py-2 text-sm transition-colors',
                    direction === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-white'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600',
                  ].join(' ')}
                >
                  {directions[key].label}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2">
            <span>
              <span className="block text-sm font-medium text-zinc-200">Flow map bend</span>
              <span className="block text-xs text-zinc-500">Distort the panner like a simple local direction map.</span>
            </span>
            <input
              type="checkbox"
              checked={bentFlow}
              onChange={(event) => {
                setBentFlow(event.target.checked)
                setActivePreset(null)
              }}
              className="h-4 w-4 accent-cyan-300"
            />
          </label>
        </div>

        <div className="grid gap-3">
          {presets.map((preset, index) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(index)}
              className={[
                'rounded-lg border p-4 text-left transition-colors',
                activePreset === index
                  ? 'border-cyan-400 bg-cyan-400/10'
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
