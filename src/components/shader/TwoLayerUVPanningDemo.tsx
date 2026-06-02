'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_W = 192
const CANVAS_H = 120

type BlendMode = 'multiply' | 'add'
type PanelMode = 'layerA' | 'layerB' | 'combined' | 'final'

type Preset = {
  name: string
  speedA: number
  speedB: number
  blend: BlendMode
  description: string
}

const presets: Preset[] = [
  {
    name: 'Water',
    speedA: 0.8,
    speedB: 1.9,
    blend: 'multiply',
    description: 'Slow base layer, faster ripple layer multiplied together for deep, shifting troughs.',
  },
  {
    name: 'Magma',
    speedA: 0.35,
    speedB: 0.65,
    blend: 'multiply',
    description: 'Both layers slow and coarse. The churning interaction reveals organic blobs.',
  },
  {
    name: 'Energy',
    speedA: 1.5,
    speedB: 2.8,
    blend: 'add',
    description: 'Fast layers added together. Bright hotspots flare where both layers peak at once.',
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
  const sx = tx * tx * (3 - 2 * tx)
  const sy = ty * ty * (3 - 2 * ty)
  const a = hash2(ix, iy)
  const b = hash2(ix + 1, iy)
  const c = hash2(ix, iy + 1)
  const d = hash2(ix + 1, iy + 1)
  return a + (b - a) * sx + (c - a) * sy + (d - b - c + a) * sx * sy
}

function computePixel(
  u: number,
  v: number,
  mode: PanelMode,
  t: number,
  speedA: number,
  speedB: number,
  blend: BlendMode,
): number {
  const scaleA = 2.5
  const scaleB = 3.8
  // Layer A pans horizontally; Layer B pans diagonally at a different scale
  const layerA = smoothNoise(u * scaleA + t * speedA * 0.25, v * scaleA)
  const layerB = smoothNoise(u * scaleB - t * speedB * 0.15, v * scaleB + t * speedB * 0.2)

  switch (mode) {
    case 'layerA':
      return layerA
    case 'layerB':
      return layerB
    case 'combined':
      return blend === 'multiply' ? layerA * layerB : Math.min(1, (layerA + layerB) * 0.65)
    case 'final': {
      const raw =
        blend === 'multiply' ? layerA * layerB : Math.min(1, (layerA + layerB) * 0.65)
      // Stretch contrast so the output uses the full 0–1 range
      return Math.max(0, Math.min(1, (raw - 0.12) * 1.45))
    }
  }
}

function drawPanel(
  canvas: HTMLCanvasElement,
  mode: PanelMode,
  t: number,
  speedA: number,
  speedB: number,
  blend: BlendMode,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.createImageData(CANVAS_W, CANVAS_H)
  for (let y = 0; y < CANVAS_H; y++) {
    for (let x = 0; x < CANVAS_W; x++) {
      const u = x / CANVAS_W
      const v = y / CANVAS_H
      const value = computePixel(u, v, mode, t, speedA, speedB, blend)
      const g = Math.round(value * 255)
      const i = (y * CANVAS_W + x) * 4
      imageData.data[i] = g
      imageData.data[i + 1] = g
      imageData.data[i + 2] = g
      imageData.data[i + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

const breakdownPanels: { title: string; mode: PanelMode; description: string }[] = [
  {
    title: '1. Layer A',
    mode: 'layerA',
    description: 'Coarse noise scrolling horizontally. One layer alone is simple and repetitive.',
  },
  {
    title: '2. Layer B',
    mode: 'layerB',
    description: 'Finer noise scrolling at a different speed and angle.',
  },
  {
    title: '3. Combined',
    mode: 'combined',
    description: 'Both layers blended. Neither layer can produce this pattern on its own.',
  },
  {
    title: '4. Final',
    mode: 'final',
    description: 'Contrast stretched. This output feeds a dissolve threshold, color ramp, or alpha.',
  },
]

function NoiseCanvas({
  mode,
  timeRef,
  speedARef,
  speedBRef,
  blendRef,
  tick,
}: {
  mode: PanelMode
  timeRef: React.RefObject<number>
  speedARef: React.RefObject<number>
  speedBRef: React.RefObject<number>
  blendRef: React.RefObject<BlendMode>
  tick: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawPanel(canvas, mode, timeRef.current, speedARef.current, speedBRef.current, blendRef.current)
  }, [tick, mode, timeRef, speedARef, speedBRef, blendRef])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="w-full rounded-md border border-zinc-800"
    />
  )
}

export default function TwoLayerUVPanningDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [speedA, setSpeedA] = useState(presets[0].speedA)
  const [speedB, setSpeedB] = useState(presets[0].speedB)
  const [blend, setBlend] = useState<BlendMode>(presets[0].blend)
  const [tick, setTick] = useState(0)

  // Refs so the RAF loop always reads the latest values without deps
  const timeRef = useRef(0)
  const speedARef = useRef(speedA)
  const speedBRef = useRef(speedB)
  const blendRef = useRef(blend)

  useEffect(() => { speedARef.current = speedA }, [speedA])
  useEffect(() => { speedBRef.current = speedB }, [speedB])
  useEffect(() => { blendRef.current = blend }, [blend])

  // Animation loop — capped to ~24fps to limit CPU use
  useEffect(() => {
    let raf: number
    let last = performance.now()
    let accumulator = 0
    const step = 1 / 24

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      accumulator += dt
      if (accumulator >= step) {
        timeRef.current += accumulator
        accumulator = 0
        setTick((n) => n + 1)
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  function applyPreset(index: number) {
    setActivePreset(index)
    setSpeedA(presets[index].speedA)
    setSpeedB(presets[index].speedB)
    setBlend(presets[index].blend)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
                Two-layer UV panning
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{presets[activePreset].name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {(['multiply', 'add'] as BlendMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setBlend(m)}
                  className={[
                    'rounded-full border px-3 py-1 text-xs capitalize transition-colors',
                    blend === m
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500',
                  ].join(' ')}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {breakdownPanels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-white">{panel.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{panel.description}</p>
                </div>
                <NoiseCanvas
                  mode={panel.mode}
                  timeRef={timeRef}
                  speedARef={speedARef}
                  speedBRef={speedBRef}
                  blendRef={blendRef}
                  tick={tick}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Layer A speed — {speedA.toFixed(2)}×
              </span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.05"
                value={speedA}
                onChange={(e) => setSpeedA(Number(e.target.value))}
                className="w-full accent-cyan-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Layer B speed — {speedB.toFixed(2)}×
              </span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.05"
                value={speedB}
                onChange={(e) => setSpeedB(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            Two noise layers panning at different speeds produce patterns neither layer can make alone.
            The speed ratio determines how quickly the combined result evolves over time.
          </p>
          <p className="text-sm leading-6 text-zinc-400">
            <strong className="text-zinc-200">Multiply</strong> keeps only overlapping bright areas.{' '}
            <strong className="text-zinc-200">Add</strong> brightens where both layers peak at once.
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
      </div>
    </section>
  )
}
