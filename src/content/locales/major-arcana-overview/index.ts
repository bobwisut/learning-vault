import en from './en.json'
import th from './th.json'

export type Locale = 'en' | 'th'

export type MajorArcanaCard = {
  number: number
  image: string
  name: string
  keywords: string[]
  theme: string
}

export type MajorArcanaLessonContent = {
  intro: string[]
  cardsHeading: string
  cardsInstruction: string
  journeyHeading: string
  chapters: {
    title: string
    body: string
    question: string
  }[]
  useHeading: string
  useBody: string[]
  cards: MajorArcanaCard[]
  ui: {
    selectedInstruction: string
  }
}

export const locales: Locale[] = ['en', 'th']

export const majorArcanaContent = {
  en,
  th,
} satisfies Record<Locale, MajorArcanaLessonContent>
