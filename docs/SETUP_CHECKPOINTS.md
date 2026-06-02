# Setup Checkpoints

## Checkpoint 1: App Foundation

Status: complete

- Keep Learning Vault as the existing Next.js visual learning app.
- Keep MDX lessons in `src/content/lessons`.
- Keep reusable visual components in `src/components`.
- Keep project direction and agent rules in `docs/`.
- Add a homepage that shows the current foundation and lesson pipeline.
- Add a lesson workflow template for future lesson work.

## Checkpoint 2: Online Deployment

Status: complete

- Deploy the static app through GitHub Pages.
- Use GitHub Actions to rebuild on pushes to `main`.
- Use the default GitHub Pages domain first.
- Avoid custom domains until the learning flow is stable.

## Checkpoint 3: First Real Lesson

Status: complete

- Replace the demo-only foundation with one useful shader lesson.
- Target: UV flow and dissolve shader node chain.
- Include a node-flow diagram, visual preview, presets, beginner explanation, gotchas, and a practice prompt.
- Publish `uv-dissolve-shader` as the first real visual lesson.

## Checkpoint 4: Content Workflow

Status: complete

- Add a repeatable lesson request template.
- Add review criteria for visual lessons.
- Add a lightweight backlog for future shader, VFX, and tarot modules.
- Link the workflow docs from agent guidance and lesson workflow.

## Checkpoint 5: Backlog Lesson Loop

Status: complete

- Use the content workflow to select a ready backlog item.
- Publish `uv-panning-flow-maps` as the next shader/VFX lesson.
- Include side-by-side static vs panning previews.
- Include speed and direction controls.
- Include the UV -> Offset Time -> Texture Sample -> Final Color diagram.

## Checkpoint 6: Fresnel Rim Lesson

Status: complete

- Publish `fresnel-rim-light` as the next shader/VFX lesson.
- Include an adjustable rim preview.
- Include rim power, emission intensity, and color controls.
- Include the View Direction + Normal -> Fresnel -> Emission diagram.

## Checkpoint 7: Visual Lesson Onboarding

Status: complete

- Publish `how-to-read-a-visual-lesson` as the onboarding lesson.
- Include an annotated lesson layout visual.
- Include the Hook -> Concept Map -> Demo -> Presets -> Practice diagram.
- Keep the lesson short enough to support future readers before they enter deeper shader or tarot lessons.

## Checkpoint 8: Masked Color Ramp Lesson

Status: complete

- Publish `masked-color-ramp` as the third shader/VFX lesson.
- Include a four-panel pipeline: grayscale mask, banded zones, ramp lookup, final result.
- Include mid and high ramp stop sliders driving all panels simultaneously.
- Include three presets (Lava, Toxic, Ice).

## Checkpoint 9: Noise Basics Lesson

Status: complete

- Publish `noise-basics` as the fourth shader/VFX lesson.
- Include a four-panel pipeline: UV coordinates, cell hash, smooth blend, final output.
- Include scale and roughness sliders driving all panels simultaneously.
- Include three presets (Organic, Gritty, Ripple).
- Connect lesson explicitly to dissolve, color ramp, and flow map lessons.
