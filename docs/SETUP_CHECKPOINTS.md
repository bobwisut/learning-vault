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
