'use client'

import { useState } from 'react'
import MajorArcanaMap, { type Locale } from './MajorArcanaMap'

type Chapter = { title: string; body: string; question: string }

type Content = {
  intro: string[]
  cardsHeading: string
  cardsInstruction: string
  journeyHeading: string
  chapters: Chapter[]
  useHeading: string
  useBody: string[]
}

const content: Record<Locale, Content> = {
  en: {
    intro: [
      "The Major Arcana tells a single story — the soul's journey from a pure, innocent beginning to complete, unified wholeness. Each card is a step, not an isolated symbol.",
      'Read them in order from 0 to 21 and a pattern appears. The Fool sets out; the early cards (I–VII) build identity and will; the middle cards (VIII–XIV) test and refine it; the late cards (XV–XXI) break it down and rebuild it into something more complete.',
    ],
    cardsHeading: 'The 22 Cards',
    cardsInstruction: 'Click any card to see its keywords and core theme.',
    journeyHeading: 'The Journey in Three Chapters',
    chapters: [
      {
        title: 'Chapter 1 — Building the Self (0–VII)',
        body: 'The Fool steps into the world and meets the tools of conscious life: will, intuition, nurture, structure, tradition, choice, and drive. These cards answer the question:',
        question: 'Who am I, and what can I do?',
      },
      {
        title: 'Chapter 2 — Testing the Self (VIII–XIV)',
        body: 'The journey turns inward: strength, reflection, fate, balance, surrender, transition, and moderation. These cards answer the question:',
        question: 'What do I truly believe, and what must I let go?',
      },
      {
        title: 'Chapter 3 — Dissolving and Becoming (XV–XXI)',
        body: 'Shadow, then sudden collapse, followed by hope, mystery, joy, awakening, and finally — wholeness. These cards answer the question:',
        question: 'What have I been becoming all along?',
      },
    ],
    useHeading: 'How to Use This Map',
    useBody: [
      'A single card is a prompt, not a verdict. When a card appears in a reading, the useful question is not "what does it predict?" but "where does this theme already live in my life right now?"',
      'The keywords on each card are a starting point. The image on the card says more than any words.',
    ],
  },
  th: {
    intro: [
      'Major Arcana เล่าเรื่องราวเดียว — การเดินทางของจิตวิญญาณจากจุดเริ่มต้นที่บริสุทธิ์ไร้เดียงสา จนถึงการรวมเป็นหนึ่งเดียวที่สมบูรณ์ ไพ่แต่ละใบคือขั้นตอน ไม่ใช่สัญลักษณ์ที่แยกจากกัน',
      'อ่านตามลำดับ 0 ถึง 21 แล้วจะเห็นรูปแบบ The Fool ออกเดินทาง ไพ่ชุดต้น (I–VII) สร้างตัวตนและเจตจำนง ไพ่ชุดกลาง (VIII–XIV) ทดสอบและกลั่นกรองมัน ไพ่ชุดปลาย (XV–XXI) ทลายมันลงแล้วสร้างขึ้นใหม่ให้สมบูรณ์กว่าเดิม',
    ],
    cardsHeading: 'ไพ่ทั้ง 22 ใบ',
    cardsInstruction: 'คลิกที่ไพ่ใดก็ได้เพื่อดูคำสำคัญและธีมหลัก',
    journeyHeading: 'การเดินทางใน 3 บท',
    chapters: [
      {
        title: 'บทที่ 1 — สร้างตัวตน (0–VII)',
        body: 'The Fool ก้าวเข้าสู่โลกและพบกับเครื่องมือแห่งจิตสำนึก ได้แก่ เจตจำนง สัญชาตญาณ การดูแลเลี้ยงดู โครงสร้าง ประเพณี การเลือก และแรงขับ ไพ่กลุ่มนี้ตอบคำถามว่า',
        question: 'ฉันเป็นใคร และฉันทำอะไรได้บ้าง?',
      },
      {
        title: 'บทที่ 2 — ทดสอบตัวตน (VIII–XIV)',
        body: 'การเดินทางหันเข้าสู่ภายใน ความเข้มแข็ง การไตร่ตรอง โชคชะตา ความสมดุล การยอมวาง การเปลี่ยนผ่าน และความพอดี ไพ่กลุ่มนี้ตอบคำถามว่า',
        question: 'ฉันเชื่อในอะไรอย่างแท้จริง และต้องปล่อยวางอะไร?',
      },
      {
        title: 'บทที่ 3 — สลายและกลายเป็น (XV–XXI)',
        body: 'เงามืด การพังทลายฉับพลัน แล้วตามมาด้วยความหวัง ความลึกลับ ความสุข การตื่นรู้ และในที่สุด — ความสมบูรณ์ ไพ่กลุ่มนี้ตอบคำถามว่า',
        question: 'ฉันกำลังกลายเป็นอะไรมาตลอด?',
      },
    ],
    useHeading: 'วิธีใช้แผนที่นี้',
    useBody: [
      'ไพ่ใบเดียวคือโจทย์ ไม่ใช่คำตัดสิน เมื่อไพ่ปรากฏในการอ่าน คำถามที่มีประโยชน์ไม่ใช่ "มันทำนายอะไร?" แต่คือ "ธีมนี้มีอยู่ในชีวิตฉันตรงไหนตอนนี้?"',
      'คำสำคัญบนแต่ละใบเป็นจุดเริ่มต้น ภาพในไพ่บอกได้มากกว่าคำใดๆ',
    ],
  },
}

export default function MajorArcanaLesson() {
  const [lang, setLang] = useState<Locale>('th')
  const c = content[lang]

  return (
    <>
      <div className="not-prose mb-6 flex justify-end">
        <div className="flex rounded-full border border-zinc-700 p-0.5">
          {(['en', 'th'] as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={[
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                lang === l
                  ? 'bg-violet-500 text-white'
                  : 'text-zinc-400 hover:text-zinc-200',
              ].join(' ')}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {c.intro.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <h2>{c.cardsHeading}</h2>
      <p>{c.cardsInstruction}</p>

      <MajorArcanaMap lang={lang} />

      <h2>{c.journeyHeading}</h2>
      {c.chapters.map((ch) => (
        <p key={ch.title}>
          <strong>{ch.title}</strong>
          <br />
          {ch.body} <em>{ch.question}</em>
        </p>
      ))}

      <h2>{c.useHeading}</h2>
      {c.useBody.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}
