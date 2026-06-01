# Learning Vault Backlog

This backlog keeps future lesson work small enough for agents to execute.

## Ready Next

### Shader/VFX: UV Panning And Flow Maps

- Status: done
- Goal: explain how scrolling UVs make water, energy, and smoke feel like they move.
- Main visual: side-by-side static texture and panning texture preview.
- Interaction: speed and direction controls.
- Diagram: UV -> Offset Time -> Texture Sample -> Final Color.
- Notes: keep it conceptual; do not create Unity assets.
- Lesson: `uv-panning-flow-maps`

### Shader/VFX: Fresnel Rim Light

- Status: ready
- Goal: show why edges glow based on view angle.
- Main visual: sphere or card with adjustable rim intensity.
- Interaction: rim power and color controls.
- Diagram: View Direction + Normal -> Fresnel -> Emission.
- Notes: useful bridge to stylized shield, aura, and dissolve effects.

### Learning System: How To Read A Visual Lesson

- Status: ready
- Goal: teach Bob and future users how to use the vault pages.
- Main visual: annotated lesson layout.
- Interaction: none required.
- Diagram: Hook -> Concept Map -> Demo -> Presets -> Practice.
- Notes: keep short; this should support future onboarding.

## Needs Shaping

### Tarot: Major Arcana Overview Map

- Status: needs shaping
- Goal: introduce the Major Arcana as a journey rather than isolated cards.
- Main visual: ordered path of 22 cards.
- Interaction: select a card to show keywords and reflection prompts.
- Open questions: use symbolic placeholders first, or real card art later?

### Tarot: Three-Card Spread Trainer

- Status: needs shaping
- Goal: practice past-present-future or situation-action-outcome readings.
- Main visual: three card slots with meaning prompts.
- Interaction: reveal cards or prompts step by step.
- Open questions: should this store practice logs, or stay stateless for now?

### Shader/VFX: Masked Color Ramp

- Status: needs shaping
- Goal: show how grayscale masks pick colors from a gradient.
- Main visual: mask, gradient, and result panels.
- Interaction: move ramp stops and swap mask patterns.
- Open questions: should this build on the dissolve demo component?

## Parking Lot

- Particle burst timing.
- Normal map basics.
- Shader keyword glossary.
- Tarot suit maps.
- Lesson search and tags.
- Public/private content split.
