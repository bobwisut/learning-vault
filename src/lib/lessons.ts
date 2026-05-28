import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { LessonMeta } from './types'

const LESSONS_DIR = path.join(process.cwd(), 'src/content/lessons')

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
