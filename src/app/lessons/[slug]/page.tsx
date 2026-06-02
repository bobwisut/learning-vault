import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllLessons, getLessonBySlug } from '@/lib/lessons'
import LessonLayout from '@/components/lesson/LessonLayout'
import FadeIn from '@/components/motion/FadeIn'
import FlowCanvas from '@/components/flow/FlowCanvas'
import R3FCanvas from '@/components/canvas/R3FCanvas'
import VisualLessonMap from '@/components/lesson/VisualLessonMap'
import { ReadingPathDiagram } from '@/components/lesson/VisualLessonMap'
import DissolveShaderDemo from '@/components/shader/DissolveShaderDemo'
import FlowMapDemo from '@/components/shader/FlowMapDemo'
import FresnelRimDemo from '@/components/shader/FresnelRimDemo'
import MaskedColorRampDemo from '@/components/shader/MaskedColorRampDemo'
import NoiseBasicsDemo from '@/components/shader/NoiseBasicsDemo'
import TwoLayerUVPanningDemo from '@/components/shader/TwoLayerUVPanningDemo'

const components = {
  FadeIn,
  FlowCanvas,
  R3FCanvas,
  VisualLessonMap,
  ReadingPathDiagram,
  DissolveShaderDemo,
  FlowMapDemo,
  FresnelRimDemo,
  MaskedColorRampDemo,
  NoiseBasicsDemo,
  TwoLayerUVPanningDemo,
}

export async function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) return {}
  return { title: lesson.frontmatter.title, description: lesson.frontmatter.description }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) notFound()

  return (
    <LessonLayout frontmatter={lesson.frontmatter}>
      <MDXRemote source={lesson.source} components={components} />
    </LessonLayout>
  )
}
