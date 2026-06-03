'use client'

import { useState } from 'react'
import {
  locales,
  majorArcanaContent,
  type Locale,
} from '@/content/locales/major-arcana-overview'
import MajorArcanaMap from './MajorArcanaMap'

export default function MajorArcanaLesson() {
  const [lang, setLang] = useState<Locale>('en')
  const c = majorArcanaContent[lang]

  return (
    <>
      <div className="not-prose mb-6 flex justify-end">
        <div className="flex rounded-full border border-zinc-700 p-0.5">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={[
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                lang === l
                  ? 'bg-violet-500 text-white'
                  : 'text-zinc-400 hover:text-zinc-200',
              ].join(' ')}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {c.intro.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <h2>{c.cardsHeading}</h2>
      <p>{c.cardsInstruction}</p>

      <MajorArcanaMap
        cards={c.cards}
        selectedInstruction={c.ui.selectedInstruction}
      />

      <h2>{c.journeyHeading}</h2>
      {c.chapters.map((ch) => (
        <p key={ch.title}>
          <strong>{ch.title}</strong>
          <br />
          {ch.body} <em>{ch.question}</em>
        </p>
      ))}

      <h2>{c.useHeading}</h2>
      {c.useBody.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}
