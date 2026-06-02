'use client'

import { useState } from 'react'
import Image from 'next/image'

type Locale = 'en' | 'th'

type CardData = {
  number: number
  image: string
  en: { name: string; keywords: string[]; theme: string }
  th: { name: string; keywords: string[]; theme: string }
}

// Images from Wikimedia Commons (public domain — Rider-Waite-Smith, 1909)
// To switch to self-hosted: replace BASE with '/learning-vault/tarot'
const BASE = 'https://upload.wikimedia.org/wikipedia/commons'

const cards: CardData[] = [
  {
    number: 0, image: `${BASE}/9/90/RWS_Tarot_00_Fool.jpg`,
    en: { name: 'The Fool',          keywords: ['beginnings', 'innocence', 'leap of faith'],      theme: 'Beginning'  },
    th: { name: 'The Fool',          keywords: ['การเริ่มต้น', 'ความบริสุทธิ์', 'การก้าวออกด้วยความกล้า'], theme: 'จุดเริ่มต้น' },
  },
  {
    number: 1, image: `${BASE}/d/de/RWS_Tarot_01_Magician.jpg`,
    en: { name: 'The Magician',      keywords: ['willpower', 'skill', 'manifestation'],           theme: 'Action'     },
    th: { name: 'The Magician',      keywords: ['เจตจำนง', 'ทักษะ', 'การสร้างสรรค์'],             theme: 'การลงมือทำ' },
  },
  {
    number: 2, image: `${BASE}/8/88/RWS_Tarot_02_High_Priestess.jpg`,
    en: { name: 'The High Priestess', keywords: ['intuition', 'mystery', 'inner knowing'],        theme: 'Stillness'  },
    th: { name: 'The High Priestess', keywords: ['สัญชาตญาณ', 'ความลึกลับ', 'ความรู้ภายใน'],     theme: 'ความสงบนิ่ง' },
  },
  {
    number: 3, image: `${BASE}/d/d2/RWS_Tarot_03_Empress.jpg`,
    en: { name: 'The Empress',       keywords: ['abundance', 'nurture', 'creation'],              theme: 'Nurture'    },
    th: { name: 'The Empress',       keywords: ['ความอุดมสมบูรณ์', 'การดูแลเอาใจใส่', 'การสร้าง'], theme: 'การบ่มเพาะ' },
  },
  {
    number: 4, image: `${BASE}/c/c3/RWS_Tarot_04_Emperor.jpg`,
    en: { name: 'The Emperor',       keywords: ['structure', 'authority', 'stability'],           theme: 'Structure'  },
    th: { name: 'The Emperor',       keywords: ['โครงสร้าง', 'อำนาจ', 'ความมั่นคง'],              theme: 'โครงสร้าง'  },
  },
  {
    number: 5, image: `${BASE}/8/8d/RWS_Tarot_05_Hierophant.jpg`,
    en: { name: 'The Hierophant',    keywords: ['tradition', 'guidance', 'belief'],               theme: 'Tradition'  },
    th: { name: 'The Hierophant',    keywords: ['ประเพณี', 'การชี้แนะ', 'ความเชื่อ'],              theme: 'ประเพณี'    },
  },
  {
    number: 6, image: `${BASE}/d/db/RWS_Tarot_06_Lovers.jpg`,
    en: { name: 'The Lovers',        keywords: ['choice', 'union', 'values'],                     theme: 'Choice'     },
    th: { name: 'The Lovers',        keywords: ['การเลือก', 'การรวมเป็นหนึ่ง', 'คุณค่า'],         theme: 'การเลือก'   },
  },
  {
    number: 7, image: `${BASE}/9/9b/RWS_Tarot_07_Chariot.jpg`,
    en: { name: 'The Chariot',       keywords: ['drive', 'control', 'victory'],                   theme: 'Drive'      },
    th: { name: 'The Chariot',       keywords: ['แรงขับเคลื่อน', 'การควบคุม', 'ชัยชนะ'],          theme: 'แรงขับ'     },
  },
  {
    number: 8, image: `${BASE}/f/f5/RWS_Tarot_08_Strength.jpg`,
    en: { name: 'Strength',          keywords: ['courage', 'patience', 'inner force'],            theme: 'Strength'   },
    th: { name: 'Strength',          keywords: ['ความกล้า', 'ความอดทน', 'พลังภายใน'],              theme: 'ความเข้มแข็ง' },
  },
  {
    number: 9, image: `${BASE}/4/4d/RWS_Tarot_09_Hermit.jpg`,
    en: { name: 'The Hermit',        keywords: ['solitude', 'wisdom', 'inner search'],            theme: 'Reflection' },
    th: { name: 'The Hermit',        keywords: ['ความสันโดษ', 'ปัญญา', 'การค้นหาภายใน'],          theme: 'การไตร่ตรอง' },
  },
  {
    number: 10, image: `${BASE}/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg`,
    en: { name: 'Wheel of Fortune',  keywords: ['cycles', 'change', 'fate'],                      theme: 'Cycles'     },
    th: { name: 'Wheel of Fortune',  keywords: ['วัฏจักร', 'การเปลี่ยนแปลง', 'โชคชะตา'],          theme: 'วัฏจักร'    },
  },
  {
    number: 11, image: `${BASE}/e/e0/RWS_Tarot_11_Justice.jpg`,
    en: { name: 'Justice',           keywords: ['truth', 'balance', 'cause and effect'],          theme: 'Balance'    },
    th: { name: 'Justice',           keywords: ['ความจริง', 'ความสมดุล', 'กรรมและผล'],             theme: 'ความสมดุล'  },
  },
  {
    number: 12, image: `${BASE}/2/2b/RWS_Tarot_12_Hanged_Man.jpg`,
    en: { name: 'The Hanged Man',    keywords: ['surrender', 'pause', 'new perspective'],         theme: 'Surrender'  },
    th: { name: 'The Hanged Man',    keywords: ['การยอมวาง', 'การหยุดพัก', 'มุมมองใหม่'],          theme: 'การยอมวาง'  },
  },
  {
    number: 13, image: `${BASE}/d/d7/RWS_Tarot_13_Death.jpg`,
    en: { name: 'Death',             keywords: ['endings', 'transition', 'transformation'],       theme: 'Transition' },
    th: { name: 'Death',             keywords: ['การสิ้นสุด', 'การเปลี่ยนผ่าน', 'การแปรเปลี่ยน'], theme: 'การเปลี่ยนผ่าน' },
  },
  {
    number: 14, image: `${BASE}/f/f8/RWS_Tarot_14_Temperance.jpg`,
    en: { name: 'Temperance',        keywords: ['patience', 'moderation', 'flow'],                theme: 'Flow'       },
    th: { name: 'Temperance',        keywords: ['ความอดทน', 'ความพอดี', 'การไหลเวียน'],            theme: 'การไหลลื่น' },
  },
  {
    number: 15, image: `${BASE}/5/55/RWS_Tarot_15_Devil.jpg`,
    en: { name: 'The Devil',         keywords: ['attachment', 'shadow', 'illusion'],              theme: 'Shadow'     },
    th: { name: 'The Devil',         keywords: ['การยึดติด', 'เงามืด', 'มายา'],                   theme: 'เงามืด'     },
  },
  {
    number: 16, image: `${BASE}/5/53/RWS_Tarot_16_Tower.jpg`,
    en: { name: 'The Tower',         keywords: ['upheaval', 'revelation', 'sudden change'],       theme: 'Disruption' },
    th: { name: 'The Tower',         keywords: ['ความปั่นป่วน', 'การเปิดเผย', 'การเปลี่ยนแปลงฉับพลัน'], theme: 'การปั่นป่วน' },
  },
  {
    number: 17, image: `${BASE}/d/db/RWS_Tarot_17_Star.jpg`,
    en: { name: 'The Star',          keywords: ['hope', 'renewal', 'inspiration'],                theme: 'Hope'       },
    th: { name: 'The Star',          keywords: ['ความหวัง', 'การฟื้นฟู', 'แรงบันดาลใจ'],           theme: 'ความหวัง'   },
  },
  {
    number: 18, image: `${BASE}/7/7f/RWS_Tarot_18_Moon.jpg`,
    en: { name: 'The Moon',          keywords: ['illusion', 'fear', 'the unconscious'],           theme: 'Mystery'    },
    th: { name: 'The Moon',          keywords: ['มายา', 'ความกลัว', 'จิตใต้สำนึก'],               theme: 'ความลึกลับ' },
  },
  {
    number: 19, image: `${BASE}/1/17/RWS_Tarot_19_Sun.jpg`,
    en: { name: 'The Sun',           keywords: ['joy', 'clarity', 'vitality'],                   theme: 'Joy'        },
    th: { name: 'The Sun',           keywords: ['ความสุข', 'ความชัดเจน', 'ชีวิตชีวา'],             theme: 'ความสุข'    },
  },
  {
    number: 20, image: `${BASE}/d/dd/RWS_Tarot_20_Judgement.jpg`,
    en: { name: 'Judgement',         keywords: ['awakening', 'reckoning', 'renewal'],             theme: 'Awakening'  },
    th: { name: 'Judgement',         keywords: ['การตื่นรู้', 'การชำระบัญชีชีวิต', 'การเริ่มใหม่'], theme: 'การตื่นรู้' },
  },
  {
    number: 21, image: `${BASE}/f/ff/RWS_Tarot_21_World.jpg`,
    en: { name: 'The World',         keywords: ['completion', 'wholeness', 'integration'],        theme: 'Completion' },
    th: { name: 'The World',         keywords: ['ความสมบูรณ์', 'ความครบถ้วน', 'การบูรณาการ'],      theme: 'ความสมบูรณ์' },
  },
]

const toRoman = (n: number) =>
  ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
   'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'][n]

export default function MajorArcanaMap({ locale = 'en' }: { locale?: Locale }) {
  const [selected, setSelected] = useState<CardData | null>(null)
  const [activeLang, setActiveLang] = useState<Locale>(locale)

  const t = (card: CardData) => card[activeLang]

  return (
    <div className="not-prose flex flex-col gap-6">
      <div className="flex justify-end">
        <div className="flex rounded-full border border-zinc-700 p-0.5">
          {(['en', 'th'] as Locale[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={[
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeLang === lang
                  ? 'bg-violet-500 text-white'
                  : 'text-zinc-400 hover:text-zinc-200',
              ].join(' ')}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8">
        {cards.map((card) => (
          <button
            key={card.number}
            type="button"
            onClick={() => setSelected(selected?.number === card.number ? null : card)}
            className={[
              'group flex flex-col items-center gap-1 rounded-lg border p-1.5 text-center transition-all',
              selected?.number === card.number
                ? 'border-violet-400 bg-violet-400/10 ring-1 ring-violet-400/40'
                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600',
            ].join(' ')}
          >
            <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: '2/3' }}>
              <Image
                src={card.image}
                alt={t(card).name}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                unoptimized
              />
            </div>
            <span className="text-[10px] font-medium text-zinc-500">{toRoman(card.number)}</span>
            <span className="line-clamp-2 text-[10px] leading-tight text-zinc-300">{t(card).name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="grid gap-5 rounded-lg border border-violet-800/50 bg-violet-950/20 p-5 sm:grid-cols-[120px_1fr]">
          <div
            className="relative mx-auto w-28 shrink-0 overflow-hidden rounded-lg border border-violet-700/40 sm:mx-0 sm:w-full"
            style={{ aspectRatio: '2/3' }}
          >
            <Image
              src={selected.image}
              alt={t(selected).name}
              fill
              sizes="160px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
                {toRoman(selected.number)} · {t(selected).theme}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{t(selected).name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {t(selected).keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-violet-700/50 bg-violet-900/30 px-3 py-1 text-xs text-violet-200"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-500">
              {activeLang === 'th'
                ? 'คลิกไพ่ใบอื่นเพื่อดู หรือคลิกซ้ำเพื่อปิด'
                : 'Click another card to explore it, or click this card again to close.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
