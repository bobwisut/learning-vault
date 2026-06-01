import type { ReactNode } from 'react'
import type { LessonMeta } from '@/lib/types'
import Link from 'next/link'

interface LessonLayoutProps {
  frontmatter: LessonMeta
  children: ReactNode
}

export default function LessonLayout({ frontmatter, children }: LessonLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 inline-block">
          ← All lessons
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">{frontmatter.title}</h1>
          <p className="text-zinc-400 text-lg mb-4">{frontmatter.description}</p>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        <article className="prose prose-invert prose-zinc max-w-none">
          {children}
        </article>
      </div>
    </main>
  )
}
