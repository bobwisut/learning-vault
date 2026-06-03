# Learning Vault Backlog

This backlog keeps future lesson work small enough for agents to execute.

## Ready Next

### Shader/VFX: Particle Burst Timing

- Status: ready to shape
- Goal: explain how timing controls make a burst feel snappy, soft, or delayed.
- Main visual: layered timeline for spawn, size over lifetime, color over lifetime, and emission.
- Interaction: adjust duration, start delay, and fade timing.
- Notes: keep conceptual; do not create Unity particle system assets unless requested.

### Tarot: Three-Card Spread Trainer

- Status: ready to shape
- Goal: practice past-present-future or situation-action-outcome readings.
- Main visual: three card slots with meaning prompts.
- Interaction: reveal cards or prompts step by step.
- Open questions: should this store practice logs, or stay stateless for now?

## Done

### Shader/VFX: UV Panning And Flow Maps

- Status: done
- Goal: explain how scrolling UVs make water, energy, and smoke feel like they move.
- Main visual: side-by-side static texture and panning texture preview.
- Interaction: speed and direction controls.
- Diagram: UV -> Offset Time -> Texture Sample -> Final Color.
- Notes: keep it conceptual; do not create Unity assets.
- Lesson: `uv-panning-flow-maps`

### Shader/VFX: Fresnel Rim Light

- Status: done
- Goal: show why edges glow based on view angle.
- Main visual: sphere or card with adjustable rim intensity.
- Interaction: rim power and color controls.
- Diagram: View Direction + Normal -> Fresnel -> Emission.
- Notes: useful bridge to stylized shield, aura, and dissolve effects.
- Lesson: `fresnel-rim-light`

### Learning System: How To Read A Visual Lesson

- Status: done
- Goal: teach Bob and future users how to use the vault pages.
- Main visual: annotated lesson layout.
- Interaction: none required.
- Diagram: Hook -> Concept Map -> Demo -> Presets -> Practice.
- Notes: keep short; this should support future onboarding.
- Lesson: `how-to-read-a-visual-lesson`

### Tarot: Major Arcana Overview Map

- Status: done
- Goal: introduce the Major Arcana as a journey rather than isolated cards.
- Main visual: ordered path of 22 cards.
- Interaction: select a card to show keywords and reflection prompts.
- Lesson: `major-arcana-overview`

### Shader/VFX: Masked Color Ramp

- Status: done
- Goal: show how grayscale masks pick colors from a gradient.
- Main visual: grayscale mask, banded zones, ramp lookup, and final result panels.
- Interaction: move mid and high ramp stop positions.
- Lesson: `masked-color-ramp`

### Shader/VFX: Noise Basics

- Status: done
- Goal: explain how noise functions generate organic patterns from UV coordinates.
- Main visual: UV coords, cell hash, smooth blend, and final output panels.
- Interaction: scale and roughness sliders; three presets (Organic, Gritty, Ripple).
- Lesson: `noise-basics`

### Shader/VFX: Two-Layer UV Panning

- Status: done
- Goal: show how panning two UV layers at different speeds creates complex organic motion.
- Main visual: animated 4-panel pipeline (layer A, layer B, combined, final). Canvas-based.
- Interaction: speed sliders per layer, multiply/add blend toggle, three presets (Water, Magma, Energy).
- Lesson: `two-layer-uv-panning`

## Parking Lot

- Normal map basics follow-up.
- Shader keyword glossary.
- Tarot suit maps.
- Lesson search and tags.
- Public/private content split.
