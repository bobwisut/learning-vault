'use client'

import { useState } from 'react'
import Image from 'next/image'

type Card = {
  number: number
  name: string
  keywords: string[]
  theme: string
  image: string
}

// Images from Wikimedia Commons (public domain — Rider-Waite-Smith, 1909)
// To switch to self-hosted: replace base URL with /learning-vault/tarot/
const BASE = 'https://upload.wikimedia.org/wikipedia/commons'

const cards: Card[] = [
  { number: 0,  name: 'The Fool',           keywords: ['beginnings', 'innocence', 'leap of faith'], theme: 'Beginning',   image: `${BASE}/9/90/RWS_Tarot_00_Fool.jpg` },
  { number: 1,  name: 'The Magician',        keywords: ['willpower', 'skill', 'manifestation'],      theme: 'Action',      image: `${BASE}/d/de/RWS_Tarot_01_Magician.jpg` },
  { number: 2,  name: 'The High Priestess',  keywords: ['intuition', 'mystery', 'inner knowing'],    theme: 'Stillness',   image: `${BASE}/8/88/RWS_Tarot_02_High_Priestess.jpg` },
  { number: 3,  name: 'The Empress',         keywords: ['abundance', 'nurture', 'creation'],         theme: 'Nurture',     image: `${BASE}/d/d2/RWS_Tarot_03_Empress.jpg` },
  { number: 4,  name: 'The Emperor',         keywords: ['structure', 'authority', 'stability'],      theme: 'Structure',   image: `${BASE}/c/c3/RWS_Tarot_04_Emperor.jpg` },
  { number: 5,  name: 'The Hierophant',      keywords: ['tradition', 'guidance', 'belief'],          theme: 'Tradition',   image: `${BASE}/8/8d/RWS_Tarot_05_Hierophant.jpg` },
  { number: 6,  name: 'The Lovers',          keywords: ['choice', 'union', 'values'],                theme: 'Choice',      image: `${BASE}/3/3a/TheLovers.jpg` },
  { number: 7,  name: 'The Chariot',         keywords: ['drive', 'control', 'victory'],              theme: 'Drive',       image: `${BASE}/9/9b/RWS_Tarot_07_Chariot.jpg` },
  { number: 8,  name: 'Strength',            keywords: ['courage', 'patience', 'inner force'],       theme: 'Strength',    image: `${BASE}/f/f5/RWS_Tarot_08_Strength.jpg` },
  { number: 9,  name: 'The Hermit',          keywords: ['solitude', 'wisdom', 'inner search'],       theme: 'Reflection',  image: `${BASE}/4/4d/RWS_Tarot_09_Hermit.jpg` },
  { number: 10, name: 'Wheel of Fortune',    keywords: ['cycles', 'change', 'fate'],                 theme: 'Cycles',      image: `${BASE}/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg` },
  { number: 11, name: 'Justice',             keywords: ['truth', 'balance', 'cause and effect'],     theme: 'Balance',     image: `${BASE}/e/e0/RWS_Tarot_11_Justice.jpg` },
  { number: 12, name: 'The Hanged Man',      keywords: ['surrender', 'pause', 'new perspective'],    theme: 'Surrender',   image: `${BASE}/2/2b/RWS_Tarot_12_Hanged_Man.jpg` },
  { number: 13, name: 'Death',               keywords: ['endings', 'transition', 'transformation'],  theme: 'Transition',  image: `${BASE}/d/d7/RWS_Tarot_13_Death.jpg` },
  { number: 14, name: 'Temperance',          keywords: ['patience', 'moderation', 'flow'],           theme: 'Flow',        image: `${BASE}/f/f8/RWS_Tarot_14_Temperance.jpg` },
  { number: 15, name: 'The Devil',           keywords: ['attachment', 'shadow', 'illusion'],         theme: 'Shadow',      image: `${BASE}/5/55/RWS_Tarot_15_Devil.jpg` },
  { number: 16, name: 'The Tower',           keywords: ['upheaval', 'revelation', 'sudden change'],  theme: 'Disruption',  image: `${BASE}/5/53/RWS_Tarot_16_Tower.jpg` },
  { number: 17, name: 'The Star',            keywords: ['hope', 'renewal', 'inspiration'],           theme: 'Hope',        image: `${BASE}/d/db/RWS_Tarot_17_Star.jpg` },
  { number: 18, name: 'The Moon',            keywords: ['illusion', 'fear', 'the unconscious'],      theme: 'Mystery',     image: `${BASE}/7/7f/RWS_Tarot_18_Moon.jpg` },
  { number: 19, name: 'The Sun',             keywords: ['joy', 'clarity', 'vitality'],               theme: 'Joy',         image: `${BASE}/1/17/RWS_Tarot_19_Sun.jpg` },
  { number: 20, name: 'Judgement',           keywords: ['awakening', 'reckoning', 'renewal'],        theme: 'Awakening',   image: `${BASE}/d/dd/RWS_Tarot_20_Judgement.jpg` },
  { number: 21, name: 'The World',           keywords: ['completion', 'wholeness', 'integration'],   theme: 'Completion',  image: `${BASE}/f/ff/RWS_Tarot_21_World.jpg` },
]

const toRoman = (n: number) =>
  ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
   'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'][n]

export default function MajorArcanaMap() {
  const [selected, setSelected] = useState<Card | null>(null)

  return (
    <div className="not-prose flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
        {cards.map((card) => (
          <button
            key={card.number}
            type="button"
            onClick={() => setSelected(selected?.number === card.number ? null : card)}
            className={[
              'group flex flex-col items-center gap-1 rounded-lg border p-1.5 text-center transition-all',
              selected?.number === card.number
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
          <div className="relative mx-auto w-28 shrink-0 overflow-hidden rounded-lg border border-violet-700/40 sm:mx-0 sm:w-full" style={{ aspectRatio: '2/3' }}>
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
            <p className="text-xs text-zinc-500">
              Click another card to compare, or click again to close.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
