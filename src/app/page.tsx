import Link from 'next/link'
import { getAllLessons } from '@/lib/lessons'

export default function Home() {
  const lessons = getAllLessons()

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-3">Learning Vault</h1>
          <p className="text-zinc-400 text-xl">
            Visual lessons on shaders, VFX, tarot, and beyond.
          </p>
        </header>

        {lessons.length === 0 ? (
          <p className="text-zinc-500">No published lessons yet.</p>
        ) : (
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="block p-5 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                  <h2 className="text-lg font-semibold mb-1">{lesson.title}</h2>
                  <p className="text-zinc-400 text-sm mb-3">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700"
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
      </div>
    </main>
  )
}
