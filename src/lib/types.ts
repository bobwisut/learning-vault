export interface LessonFrontmatter {
  title: string
  description: string
  tags: string[]
  published: boolean
}

export interface LessonMeta extends LessonFrontmatter {
  slug: string
}
