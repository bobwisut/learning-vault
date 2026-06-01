'use client'

import { useState } from 'react'

const sections = [
  {
    id: 'hook',
    label: 'Hook',
    title: 'Start with the visible effect',
    description: 'Look at the preview first. Before reading deeply, name what changes on screen.',
    accent: 'border-teal-300 bg-teal-300/10 text-teal-100',
  },
  {
    id: 'map',
    label: 'Concept map',
    title: 'Follow the chain',
    description: 'Read the node diagram like a recipe. Each node changes the value before it reaches the result.',
    accent: 'border-sky-300 bg-sky-300/10 text-sky-100',
  },
  {
    id: 'demo',
    label: 'Demo',
    title: 'Move one control at a time',
    description: 'Change one slider or preset, then explain what happened in your own words.',
    accent: 'border-amber-300 bg-amber-300/10 text-amber-100',
  },
  {
    id: 'presets',
    label: 'Presets',
    title: 'Compare useful looks',
    description: 'Use presets as examples. Switch between two looks and name the difference.',
    accent: 'border-violet-300 bg-violet-300/10 text-violet-100',
  },
  {
    id: 'practice',
    label: 'Practice',
    title: 'Make a tiny transfer',
    description: 'Use the prompt to connect the lesson to a real material, VFX idea, card, or scene.',
    accent: 'border-fuchsia-300 bg-fuchsia-300/10 text-fuchsia-100',
  },
]

export default function VisualLessonMap() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const active = sections.find((section) => section.id === activeId) ?? sections[0]

  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-zinc-800 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Lesson page</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Read in passes</h3>
              </div>
              <span className="rounded-full border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
                5 steps
              </span>
            </div>

            <div className="space-y-3">
              {sections.map((section, index) => {
                const isActive = section.id === activeId

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveId(section.id)}
                    className={`w-full rounded-md border p-3 text-left transition-colors ${
                      isActive ? section.accent : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{section.label}</span>
                        <span className="mt-1 block text-xs opacity-75">{section.title}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Current pass</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{active.label}</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-300">{active.description}</p>
          </div>

          <div className="mt-8 rounded-md border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm font-medium text-white">Good reading habit</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Do not try to memorize the whole page. Use the visual, make one observation, then read only enough
              text to explain that observation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
