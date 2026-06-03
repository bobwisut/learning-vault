'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { MajorArcanaCard } from '@/content/locales/major-arcana-overview'

const toRoman = (n: number) =>
  ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
   'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'][n]

type MajorArcanaMapProps = {
  cards: MajorArcanaCard[]
  selectedInstruction: string
}

export default function MajorArcanaMap({
  cards,
  selectedInstruction,
}: MajorArcanaMapProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const selected = cards.find((card) => card.number === selectedNumber)

  return (
    <div className="not-prose flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
        {cards.map((card) => (
          <button
            key={card.number}
            type="button"
            onClick={() =>
              setSelectedNumber(selectedNumber === card.number ? null : card.number)
            }
            className={[
              'group flex flex-col items-center gap-1 rounded-lg border p-1.5 text-center transition-all',
              selectedNumber === card.number
                ? 'border-violet-400 bg-violet-400/10 ring-1 ring-violet-400/40'
                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600',
            ].join(' ')}
          >
            <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: '2/3' }}>
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                unoptimized
              />
            </div>
            <span className="text-[10px] font-medium text-zinc-500">{toRoman(card.number)}</span>
            <span className="line-clamp-2 text-[10px] leading-tight text-zinc-300">{card.name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="grid gap-5 rounded-lg border border-violet-800/50 bg-violet-950/20 p-5 sm:grid-cols-[120px_1fr]">
          <div
            className="relative mx-auto w-28 shrink-0 overflow-hidden rounded-lg border border-violet-700/40 sm:mx-0 sm:w-full"
            style={{ aspectRatio: '2/3' }}
          >
            <Image
              src={selected.image}
              alt={selected.name}
              fill
              sizes="160px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
                {toRoman(selected.number)} · {selected.theme}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{selected.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-violet-700/50 bg-violet-900/30 px-3 py-1 text-xs text-violet-200"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-500">{selectedInstruction}</p>
          </div>
        </div>
      )}
    </div>
  )
}
