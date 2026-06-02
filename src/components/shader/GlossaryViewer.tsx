'use client'

import { useState, useMemo } from 'react'

type Term = {
  term: string
  category: string
  definition: string
  lesson?: string
}

const terms: Term[] = [
  // Coordinates & Space
  {
    term: 'UV',
    category: 'Coordinates',
    definition: 'A 2D coordinate that maps a flat texture onto a 3D surface. U runs left-right, V runs bottom-top. Values normally range from 0 to 1 across the surface.',
    lesson: 'uv-panning-flow-maps',
  },
  {
    term: 'UV Offset',
    category: 'Coordinates',
    definition: 'Adding a value to UV coordinates before sampling a texture. Used to scroll or pan a texture across a surface over time.',
    lesson: 'uv-panning-flow-maps',
  },
  {
    term: 'UV Tiling',
    category: 'Coordinates',
    definition: 'Multiplying UV coordinates to repeat a texture multiple times across a surface. Higher tiling = smaller, more repeated pattern.',
  },
  {
    term: 'Tangent Space',
    category: 'Coordinates',
    definition: 'A local coordinate space aligned to the surface of a mesh. Normal maps are stored in tangent space so they work correctly regardless of which way the mesh faces.',
    lesson: 'normal-map-basics',
  },
  {
    term: 'World Space',
    category: 'Coordinates',
    definition: 'The global coordinate system of the scene. A world-space position (1, 0, 0) means one unit to the right of the scene origin, regardless of how the object is rotated.',
  },
  {
    term: 'Triplanar Mapping',
    category: 'Coordinates',
    definition: 'A technique that samples a texture three times — once from each axis — and blends the results. Avoids UV stretching on irregular or procedural geometry.',
  },

  // Surface & Lighting
  {
    term: 'Normal',
    category: 'Surface & Lighting',
    definition: 'A unit vector that points perpendicular to a surface. The lighting calculation uses the normal to determine how much light a pixel receives.',
    lesson: 'normal-map-basics',
  },
  {
    term: 'Normal Map',
    category: 'Surface & Lighting',
    definition: 'A texture that stores per-pixel surface normals encoded as RGB color (XYZ → 0–1 range). Lets a flat mesh respond to light as if it has bumps and detail without adding geometry.',
    lesson: 'normal-map-basics',
  },
  {
    term: 'Fresnel',
    category: 'Surface & Lighting',
    definition: 'The optical effect where surfaces reflect more light at grazing angles (when viewed edge-on) than at direct angles. Used to create rim glow, shield effects, and stylized outlines.',
    lesson: 'fresnel-rim-light',
  },
  {
    term: 'Albedo',
    category: 'Surface & Lighting',
    definition: 'The base color of a surface before any lighting is applied. In PBR workflows, albedo (or base color) represents the raw pigment color with no shadows or highlights baked in.',
  },
  {
    term: 'Emission',
    category: 'Surface & Lighting',
    definition: 'Light emitted by a surface independently of the scene lighting. An emissive surface glows even in complete darkness and can cause bloom in HDR pipelines.',
  },
  {
    term: 'Diffuse',
    category: 'Surface & Lighting',
    definition: 'The scattered, direction-independent component of lighting on a matte surface. Controlled by the dot product of the surface normal and the light direction.',
  },
  {
    term: 'Specular',
    category: 'Surface & Lighting',
    definition: 'The sharp, view-dependent highlight on a surface. A tight specular makes a surface look polished; a wide specular makes it look rough.',
  },
  {
    term: 'Ambient Occlusion',
    category: 'Surface & Lighting',
    definition: 'A darkening applied to corners, crevices, and concave areas to simulate where indirect light cannot easily reach. Does not represent a real light source.',
  },
  {
    term: 'PBR',
    category: 'Surface & Lighting',
    definition: 'Physically Based Rendering. A shading model that uses real-world material properties (metallic, roughness/smoothness) to produce consistent results under different lighting conditions.',
  },

  // Patterns & Masks
  {
    term: 'Grayscale Mask',
    category: 'Patterns & Masks',
    definition: 'A texture where each pixel is a single value between 0 (black) and 1 (white), used to control which parts of a surface an effect applies to.',
    lesson: 'masked-color-ramp',
  },
  {
    term: 'Alpha',
    category: 'Patterns & Masks',
    definition: 'A per-pixel transparency value. Alpha = 1 is fully opaque; Alpha = 0 is fully transparent. Used for cutout effects, soft edges, and dissolve shaders.',
    lesson: 'uv-dissolve-shader',
  },
  {
    term: 'Alpha Cutoff',
    category: 'Patterns & Masks',
    definition: 'A threshold value that makes pixels with alpha below the cutoff fully transparent and pixels above fully opaque. Produces hard-edged cutout transparency.',
    lesson: 'uv-dissolve-shader',
  },
  {
    term: 'Color Ramp',
    category: 'Patterns & Masks',
    definition: 'A gradient that maps a single grayscale value to a color. A value of 0 returns the leftmost color; a value of 1 returns the rightmost color.',
    lesson: 'masked-color-ramp',
  },
  {
    term: 'Flow Map',
    category: 'Patterns & Masks',
    definition: 'A texture that stores 2D direction vectors encoded as RG color. Used to distort UV offsets so a panning texture appears to bend and flow rather than slide uniformly.',
    lesson: 'uv-panning-flow-maps',
  },
  {
    term: 'Noise',
    category: 'Patterns & Masks',
    definition: 'A deterministic function that returns a pseudo-random value for any given input coordinate. The same input always returns the same value. Used to generate organic patterns, masks, and animated effects.',
    lesson: 'noise-basics',
  },
  {
    term: 'Value Noise',
    category: 'Patterns & Masks',
    definition: 'A type of noise that hashes integer grid coordinates to random values, then smoothly interpolates between them. Produces blurry, organic blobs.',
    lesson: 'noise-basics',
  },
  {
    term: 'Vertex Color',
    category: 'Patterns & Masks',
    definition: 'Color data stored directly on the vertices of a mesh, rather than in a texture. Commonly used as a mask to blend materials or control effects along mesh surfaces.',
  },

  // Math
  {
    term: 'Dot Product',
    category: 'Math',
    definition: 'A single number computed from two vectors that measures how much they point in the same direction. Returns 1 when parallel, 0 when perpendicular, and -1 when opposite. Used in every lighting calculation.',
    lesson: 'normal-map-basics',
  },
  {
    term: 'Lerp',
    category: 'Math',
    definition: 'Linear interpolation between two values A and B by a factor T. At T=0 the result is A; at T=1 the result is B; at T=0.5 the result is halfway between.',
  },
  {
    term: 'Smoothstep',
    category: 'Math',
    definition: 'An S-curve interpolation that eases in and out at both ends of the 0–1 range. Produces softer transitions than linear interpolation and is used heavily in noise and edge blending.',
    lesson: 'noise-basics',
  },
  {
    term: 'Remap',
    category: 'Math',
    definition: 'Converting a value from one range to another. For example, remapping a noise value from [0.3, 0.7] to [0, 1] stretches the contrast so the full output range is used.',
  },
  {
    term: 'Step',
    category: 'Math',
    definition: 'A hard threshold function. Returns 0 if the input is below the edge value, and 1 if it is above. Used for sharp cutoffs like alpha cutout edges.',
  },
  {
    term: 'Power',
    category: 'Math',
    definition: 'Raising a value to an exponent. In shaders, pow(value, n) with n > 1 pushes values toward 0; n < 1 pushes values toward 1. Used to control the falloff curve of Fresnel and rim effects.',
    lesson: 'fresnel-rim-light',
  },

  // Render Pipeline
  {
    term: 'Vertex Shader',
    category: 'Render Pipeline',
    definition: 'A program that runs once per vertex before rasterization. Handles transforming positions from object space to clip space. Can also be used to animate or deform mesh geometry.',
  },
  {
    term: 'Fragment Shader',
    category: 'Render Pipeline',
    definition: 'A program that runs once per pixel (fragment) during rasterization. Responsible for computing the final color of each pixel, including all lighting, masking, and texture sampling.',
  },
  {
    term: 'SDF',
    category: 'Render Pipeline',
    definition: 'Signed Distance Field. A texture or function that stores the distance from each point to the nearest surface. Positive outside, negative inside, zero on the boundary. Used for crisp UI, font rendering, and dynamic effects.',
  },
  {
    term: 'HDR',
    category: 'Render Pipeline',
    definition: 'High Dynamic Range. Allows color values above 1 in the rendering pipeline. Values above 1 can produce bloom and other post-processing effects before being tone-mapped back to the 0–1 display range.',
  },
  {
    term: 'LOD',
    category: 'Render Pipeline',
    definition: 'Level of Detail. A technique where lower-resolution versions of a mesh or texture are used when the object is far from the camera, reducing GPU load.',
  },
]

const categories = ['All', ...Array.from(new Set(terms.map((t) => t.category)))]

const categoryColors: Record<string, string> = {
  'Coordinates': 'text-cyan-300 border-cyan-800 bg-cyan-950/40',
  'Surface & Lighting': 'text-amber-300 border-amber-800 bg-amber-950/40',
  'Patterns & Masks': 'text-violet-300 border-violet-800 bg-violet-950/40',
  'Math': 'text-teal-300 border-teal-800 bg-teal-950/40',
  'Render Pipeline': 'text-rose-300 border-rose-800 bg-rose-950/40',
}

const lessonTitles: Record<string, string> = {
  'uv-panning-flow-maps': 'UV Panning & Flow Maps',
  'uv-dissolve-shader': 'UV Dissolve Shader',
  'fresnel-rim-light': 'Fresnel Rim Light',
  'masked-color-ramp': 'Masked Color Ramp',
  'noise-basics': 'Noise Basics',
  'normal-map-basics': 'Normal Map Basics',
  'two-layer-uv-panning': 'Two-Layer UV Panning',
}

export default function GlossaryViewer() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return terms.filter((t) => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory
      const matchesQuery =
        q === '' ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <div className="flex flex-col gap-5 not-prose">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search terms…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-lg font-normal text-white placeholder-zinc-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={[
                'rounded-full border px-3 py-1 text-xs transition-colors',
                activeCategory === cat
                  ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-500">
          No terms match your search.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((t) => {
            const colorClass = categoryColors[t.category] ?? 'text-zinc-300 border-zinc-700 bg-zinc-900'
            return (
              <div
                key={t.term}
                className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{t.term}</h3>
                  <span
                    className={[
                      'shrink-0 rounded-full border px-2 py-0.5 text-xs',
                      colorClass,
                    ].join(' ')}
                  >
                    {t.category}
                  </span>
                </div>
                <p className="text-sm leading-6 text-zinc-400">{t.definition}</p>
                {t.lesson && (
                  <a
                    href={`/learning-vault/lessons/${t.lesson}`}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    See: {lessonTitles[t.lesson] ?? t.lesson}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      )}

      <p className="text-right text-xs text-zinc-600">
        {filtered.length} of {terms.length} terms
      </p>
    </div>
  )
}
