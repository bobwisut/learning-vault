import type { ReactNode } from 'react'
import Link from 'next/link'

interface LessonLinkProps {
  slug: string
  children: ReactNode
}

export default function LessonLink({ slug, children }: LessonLinkProps) {
  return (
    <Link
      href={`/lessons/${slug}`}
      className="font-medium text-sky-400 no-underline hover:text-sky-300 hover:underline"
    >
      {children}
    </Link>
  )
}
