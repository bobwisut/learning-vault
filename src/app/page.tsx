import Link from 'next/link'
import { getAllLessons } from '@/lib/lessons'
import LessonSearch from '@/components/lesson/LessonSearch'

const focusAreas = [
  'Shader and VFX fundamentals',
  'Unity Shader Graph equivalents',
  'Tarot learning maps',
]

const startHere = [
  {
    title: 'New Here?',
    detail: 'Learn how the visual lessons are structured before jumping into a topic.',
    slug: 'how-to-read-a-visual-lesson',
  },
  {
    title: 'Shader Path',
    detail: 'Start with UV dissolve, then follow the shader and VFX building blocks.',
    slug: 'uv-dissolve-shader',
  },
  {
    title: 'Tarot Map',
    detail: 'Explore the Major Arcana as one connected journey in English or Thai.',
    slug: 'major-arcana-overview',
  },
]

export default function Home() {
  const lessons = getAllLessons()

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10 sm:py-14 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-teal-300">
              Visual learning lab
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Learning Vault
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              A visual lesson library for topics that are easier to understand through
              diagrams, interaction, animation, and small examples.
            </p>
          </div>

          <div className="border-l border-zinc-800 pl-6">
            <p className="text-sm font-medium text-zinc-400">Current focus</p>
            <ul className="mt-3 space-y-2">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-3 text-sm text-zinc-200">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section>
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-300">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Pick a path</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {startHere.map((item) => (
              <Link
                key={item.slug}
                href={`/lessons/${item.slug}`}
                className="block rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-teal-500/70 hover:bg-zinc-900/80"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-300">
                Published lessons
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Available modules</h2>
            </div>
            <p className="text-sm text-zinc-500">{lessons.length} lessons</p>
          </div>

          <LessonSearch lessons={lessons} />
        </section>
      </div>
    </main>
  )
}
