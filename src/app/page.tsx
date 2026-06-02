import { getAllLessons } from '@/lib/lessons'
import LessonSearch from '@/components/lesson/LessonSearch'

const focusAreas = [
  'Shader and VFX concepts',
  'Interactive visual explanations',
  'Tarot learning maps',
]

const checkpointItems = [
  'Next.js app is published online',
  'MDX lesson loading is working',
  'Reusable animation, graph, and 3D components exist',
  'Agent lesson workflow is documented',
]

const lessonPipeline = [
  { label: 'Plan', detail: 'Choose one concept and define the visual proof.' },
  { label: 'Build', detail: 'Create MDX plus focused interactive components.' },
  { label: 'Review', detail: 'Check clarity, build health, and beginner usefulness.' },
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
              A focused place for lessons that explain difficult topics through diagrams,
              interaction, animation, and small examples.
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

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-300">
              Checkpoint 1
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">App foundation</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              The foundation should make it easy for an agent to add one useful visual
              lesson without changing the app shape every time.
            </p>
            <ul className="mt-5 space-y-3">
              {checkpointItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-200">
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {lessonPipeline.map((step) => (
              <div key={step.label} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="text-base font-semibold text-white">{step.label}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.detail}</p>
              </div>
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
