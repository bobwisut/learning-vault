'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { LessonMeta } from '@/lib/types'

export default function LessonSearch({ lessons }: { lessons: LessonMeta[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const lesson of lessons) {
      for (const tag of lesson.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
  }, [lessons])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return lessons.filter((lesson) => {
      const matchesTag = activeTag === null || lesson.tags.includes(activeTag)
      const matchesQuery =
        q === '' ||
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q) ||
        lesson.tags.some((t) => t.includes(q))
      return matchesTag && matchesQuery
    })
  }, [lessons, query, activeTag])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search lessons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={[
              'rounded-full border px-3 py-1 text-xs transition-colors',
              activeTag === null
                ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500',
            ].join(' ')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={[
                'rounded-full border px-3 py-1 text-xs capitalize transition-colors',
                activeTag === tag
                  ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-500">
          No lessons match your search.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/lessons/${lesson.slug}`}
                className="block h-full rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-teal-500/70 hover:bg-zinc-900/80"
              >
                <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{lesson.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <span
                      key={tag}
                      className={[
                        'rounded-full border px-2 py-0.5 text-xs',
                        tag === activeTag
                          ? 'border-teal-600 bg-teal-950 text-teal-300'
                          : 'border-zinc-700 bg-zinc-950 text-zinc-400',
                      ].join(' ')}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-right text-xs text-zinc-600">
        {filtered.length} of {lessons.length} lessons
      </p>
    </div>
  )
}
