import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { LessonMeta } from './types'

const LESSONS_DIR = path.join(process.cwd(), 'src/content/lessons')
const FEATURED_LESSON_ORDER = ['how-to-read-a-visual-lesson']

export function getAllLessons(): LessonMeta[] {
  if (!fs.existsSync(LESSONS_DIR)) return []

  return fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return { slug, ...(data as Omit<LessonMeta, 'slug'>) }
    })
    .filter((lesson) => lesson.published)
    .sort((a, b) => {
      const aIndex = FEATURED_LESSON_ORDER.indexOf(a.slug)
      const bIndex = FEATURED_LESSON_ORDER.indexOf(b.slug)

      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      }

      return a.title.localeCompare(b.title)
    })
}

export function getLessonBySlug(slug: string): { frontmatter: LessonMeta; source: string } | null {
  const filePath = path.join(LESSONS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    frontmatter: { slug, ...(data as Omit<LessonMeta, 'slug'>) },
    source: content,
  }
}
