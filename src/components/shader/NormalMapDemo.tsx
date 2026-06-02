'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_W = 192
const CANVAS_H = 120

type Pattern = 'bricks' | 'ripples' | 'dots'
type PanelMode = 'height' | 'normals' | 'lighting' | 'final'

type Preset = {
  name: string
  pattern: Pattern
  scale: number
  bumpStrength: number
  lightAngle: number
  description: string
}

const presets: Preset[] = [
  {
    name: 'Bricks',
    pattern: 'bricks',
    scale: 4,
    bumpStrength: 1.2,
    lightAngle: 45,
    description: 'Flat tops, sharp mortar grooves. The edges create steep gradients — clear in every panel.',
  },
  {
    name: 'Ripples',
    pattern: 'ripples',
    scale: 4,
    bumpStrength: 0.8,
    lightAngle: 120,
    description: 'Concentric rings. The normal direction sweeps continuously around each circle.',
  },
  {
    name: 'Dots',
    pattern: 'dots',
    scale: 5,
    bumpStrength: 1.0,
    lightAngle: 200,
    description: 'Smooth hemispheres on a grid. The rounded top catches light evenly; edges fall off sharply.',
  },
]

function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function bricksHeight(u: number, v: number, scale: number): number {
  const row = Math.floor(v * scale)
  const offset = (row % 2) * 0.5
  const bu = ((u * scale * 2 + offset) % 1 + 1) % 1
  const bv = (v * scale % 1 + 1) % 1
  const margin = 0.1
  const ex = smoothStep(0, margin, bu) * (1 - smoothStep(1 - margin, 1, bu))
  const ey = smoothStep(0, margin, bv) * (1 - smoothStep(1 - margin, 1, bv))
  return ex * ey
}

function ripplesHeight(u: number, v: number, scale: number): number {
  const cu = (u * scale % 1 + 1) % 1 - 0.5
  const cv = (v * scale % 1 + 1) % 1 - 0.5
  const dist = Math.sqrt(cu * cu + cv * cv)
  const rings = Math.cos(dist * Math.PI * 6) * 0.5 + 0.5
  const fade = 1 - smoothStep(0.3, 0.5, dist)
  return rings * fade
}

function dotsHeight(u: number, v: number, scale: number): number {
  const cu = (u * scale % 1 + 1) % 1 - 0.5
  const cv = (v * scale % 1 + 1) % 1 - 0.5
  const dist = Math.sqrt(cu * cu + cv * cv)
  const radius = 0.38
  if (dist >= radius) return 0
  // Smooth hemisphere profile
  const t = 1 - dist / radius
  return t * t * (3 - 2 * t)
}

function getHeight(u: number, v: number, pattern: Pattern, scale: number): number {
  switch (pattern) {
    case 'bricks': return bricksHeight(u, v, scale)
    case 'ripples': return ripplesHeight(u, v, scale)
    case 'dots': return dotsHeight(u, v, scale)
  }
}

function drawPanel(
  canvas: HTMLCanvasElement,
  mode: PanelMode,
  pattern: Pattern,
  scale: number,
  bumpStrength: number,
  lightAngle: number,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.createImageData(CANVAS_W, CANVAS_H)

  const rad = (lightAngle * Math.PI) / 180
  const lx = Math.cos(rad)
  const ly = Math.sin(rad)
  const lz = 0.6
  const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz)
  const lightDir = [lx / lLen, ly / lLen, lz / lLen]

  const eps = 1 / CANVAS_W

  for (let y = 0; y < CANVAS_H; y++) {
    for (let x = 0; x < CANVAS_W; x++) {
      const u = x / CANVAS_W
      const v = y / CANVAS_H

      const h = getHeight(u, v, pattern, scale)
      const dhx = (getHeight(u + eps, v, pattern, scale) - getHeight(u - eps, v, pattern, scale)) / (2 * eps)
      const dhy = (getHeight(u, v + eps, pattern, scale) - getHeight(u, v - eps, pattern, scale)) / (2 * eps)

      const nx = -dhx * bumpStrength
      const ny = -dhy * bumpStrength
      const nz = 1.0
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const normal = [nx / nLen, ny / nLen, nz / nLen]

      let r = 0, g = 0, b = 0

      if (mode === 'height') {
        const gv = Math.round(h * 255)
        r = g = b = gv
      } else if (mode === 'normals') {
        r = Math.round((normal[0] * 0.5 + 0.5) * 255)
        g = Math.round((normal[1] * 0.5 + 0.5) * 255)
        b = Math.round((normal[2] * 0.5 + 0.5) * 255)
      } else if (mode === 'lighting') {
        const dot = Math.max(0, normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2])
        const gv = Math.round(dot * 255)
        r = g = b = gv
      } else if (mode === 'final') {
        const dot = Math.max(0, normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2])
        const ambient = 0.15
        const light = ambient + dot * 0.85
        r = Math.round(Math.min(255, (170 + h * 40) * light))
        g = Math.round(Math.min(255, (155 + h * 35) * light))
        b = Math.round(Math.min(255, (140 + h * 25) * light))
      }

      const i = (y * CANVAS_W + x) * 4
      imageData.data[i] = r
      imageData.data[i + 1] = g
      imageData.data[i + 2] = b
      imageData.data[i + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

const breakdownPanels: { title: string; mode: PanelMode; description: string }[] = [
  {
    title: '1. Height map',
    mode: 'height',
    description: 'A grayscale pattern: bright = raised, dark = recessed. This drives everything.',
  },
  {
    title: '2. Normal map',
    mode: 'normals',
    description:
      'Surface directions derived from the height gradient, encoded as RGB. Flat tops are blue; slopes shift toward red or green.',
  },
  {
    title: '3. Light dot product',
    mode: 'lighting',
    description: 'How much light each pixel receives: dot(normal, lightDir). Rotate the light to see it shift.',
  },
  {
    title: '4. Final result',
    mode: 'final',
    description: 'Base color × lighting. The flat mesh now reads as a surface with real depth.',
  },
]

function NormalCanvas({
  mode,
  pattern,
  scale,
  bumpStrength,
  lightAngle,
}: {
  mode: PanelMode
  pattern: Pattern
  scale: number
  bumpStrength: number
  lightAngle: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawPanel(canvas, mode, pattern, scale, bumpStrength, lightAngle)
  }, [mode, pattern, scale, bumpStrength, lightAngle])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="w-full rounded-md border border-zinc-800"
    />
  )
}

function LightAngleIndicator({ angle }: { angle: number }) {
  const rad = (angle * Math.PI) / 180
  const cx = 20
  const cy = 20
  const r = 14
  const ax = cx + Math.cos(rad) * r
  const ay = cy + Math.sin(rad) * r
  return (
    <svg width="40" height="40" className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="3" fill="#a1a1aa" />
      <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
      <circle cx={ax} cy={ay} r="3" fill="#67e8f9" />
    </svg>
  )
}

export default function NormalMapDemo() {
  const [activePreset, setActivePreset] = useState(0)
  const [pattern, setPattern] = useState<Pattern>(presets[0].pattern)
  const [scale, setScale] = useState(presets[0].scale)
  const [bumpStrength, setBumpStrength] = useState(presets[0].bumpStrength)
  const [lightAngle, setLightAngle] = useState(presets[0].lightAngle)

  function applyPreset(index: number) {
    setActivePreset(index)
    setPattern(presets[index].pattern)
    setScale(presets[index].scale)
    setBumpStrength(presets[index].bumpStrength)
    setLightAngle(presets[index].lightAngle)
  }

  return (
    <section className="my-8 not-prose rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-300">
                Normal map pipeline
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{presets[activePreset].name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <LightAngleIndicator angle={lightAngle} />
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                {lightAngle}°
              </span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {breakdownPanels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-white">{panel.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{panel.description}</p>
                </div>
                <NormalCanvas
                  mode={panel.mode}
                  pattern={pattern}
                  scale={scale}
                  bumpStrength={bumpStrength}
                  lightAngle={lightAngle}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Surface scale — {scale.toFixed(0)}×
              </span>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-amber-300"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Bump strength — {bumpStrength.toFixed(2)}
              </span>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.05"
                value={bumpStrength}
                onChange={(e) => setBumpStrength(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Light angle — {lightAngle}°
              </span>
              <input
                type="range"
                min="0"
                max="359"
                step="1"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-full accent-cyan-300"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-zinc-400">
            A normal map does not change the mesh. It changes how light calculates against each pixel
            by replacing the surface normal with one read from a texture.
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
                    ? 'border-amber-400 bg-amber-400/10'
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
