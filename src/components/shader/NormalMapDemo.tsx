'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_W = 192
const CANVAS_H = 120

type PanelMode = 'height' | 'normals' | 'lighting' | 'final'

type Preset = {
  name: string
  scale: number
  bumpStrength: number
  lightAngle: number
  description: string
}

const presets: Preset[] = [
  {
    name: 'Cobblestone',
    scale: 6,
    bumpStrength: 1.2,
    lightAngle: 45,
    description: 'Medium-scale bumps with clear edges. Strong side lighting reveals the seams.',
  },
  {
    name: 'Waves',
    scale: 3,
    bumpStrength: 0.6,
    lightAngle: 120,
    description: 'Smooth, rolling surface. Gentle normals catch light softly across the whole surface.',
  },
  {
    name: 'Rough',
    scale: 10,
    bumpStrength: 1.8,
    lightAngle: 200,
    description: 'High-frequency noise with exaggerated bump strength. Looks like raw stone or bark.',
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

function getHeight(u: number, v: number, scale: number): number {
  return smoothNoise(u * scale, v * scale)
}

function drawPanel(
  canvas: HTMLCanvasElement,
  mode: PanelMode,
  scale: number,
  bumpStrength: number,
  lightAngle: number,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.createImageData(CANVAS_W, CANVAS_H)

  const rad = (lightAngle * Math.PI) / 180
  // Light direction in XYZ; Z is always positive (light coming from above the surface)
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

      const h = getHeight(u, v, scale)

      // Derive surface normal from finite-difference height gradient
      const dhx = (getHeight(u + eps, v, scale) - getHeight(u - eps, v, scale)) / (2 * eps)
      const dhy = (getHeight(u, v + eps, scale) - getHeight(u, v - eps, scale)) / (2 * eps)
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
        // Encode normal as RGB: (n * 0.5 + 0.5) — the classic normal map encoding
        r = Math.round((normal[0] * 0.5 + 0.5) * 255)
        g = Math.round((normal[1] * 0.5 + 0.5) * 255)
        b = Math.round((normal[2] * 0.5 + 0.5) * 255)
      } else if (mode === 'lighting') {
        // Dot product of normal with light direction (diffuse term only)
        const dot = Math.max(0, normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2])
        const gv = Math.round(dot * 255)
        r = g = b = gv
      } else if (mode === 'final') {
        // Base color (warm stone) × diffuse lighting + small ambient
        const dot = Math.max(0, normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2])
        const ambient = 0.15
        const light = ambient + dot * 0.85
        // Warm gray base tinted slightly by height
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
    description: 'A grayscale texture where bright = raised and dark = recessed. This drives everything.',
  },
  {
    title: '2. Normal map',
    mode: 'normals',
    description:
      'Normals derived from the height gradient, encoded as RGB. That signature blue-purple is Z pointing outward.',
  },
  {
    title: '3. Light dot product',
    mode: 'lighting',
    description: 'How much light each pixel receives: dot(normal, lightDir). Rotate the light to see it shift.',
  },
  {
    title: '4. Final result',
    mode: 'final',
    description: 'Base color multiplied by the lighting. The flat mesh now reads as a bumpy surface.',
  },
]

function NormalCanvas({
  mode,
  scale,
  bumpStrength,
  lightAngle,
}: {
  mode: PanelMode
  scale: number
  bumpStrength: number
  lightAngle: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawPanel(canvas, mode, scale, bumpStrength, lightAngle)
  }, [mode, scale, bumpStrength, lightAngle])

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
  const [scale, setScale] = useState(presets[0].scale)
  const [bumpStrength, setBumpStrength] = useState(presets[0].bumpStrength)
  const [lightAngle, setLightAngle] = useState(presets[0].lightAngle)

  function applyPreset(index: number) {
    setActivePreset(index)
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
                max="14"
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
