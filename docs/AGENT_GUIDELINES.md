# Learning Vault Agent Guidelines

## Main Rule

Agents should work inside the requested scope only.

Do not edit unrelated domains, unrelated lessons, or broad architecture unless
the task explicitly asks for it.

## Agent Behavior

When creating or modifying lessons:

- Prefer reusable components over one-off messy code.
- Keep file names clear and domain-specific.
- Keep lesson content beginner-friendly.
- Use visual explanations wherever possible.
- Keep text short and useful.
- Add comments only where they help future maintainability.
- Avoid changing the global app structure unless necessary.
- Do not add Unity project files.
- Do not generate real ASE files unless explicitly requested.
- Do not claim that a web diagram is an exact Unity, Shader Graph, or ASE
  implementation.

## Lesson Authoring Rules

A lesson should normally include:

- Title
- Short description
- Tags
- Visual concept section
- Interactive or animated example
- Explanation of key parts
- Mistakes or gotchas
- Practice prompt or small exercise

Use this learning module pattern when appropriate:

1. Visual hook
2. Concept map
3. Interactive example
4. Variations or presets
5. Explanation of each part
6. Common mistakes
7. Practice exercise

For broad requests, start by filling out `docs/templates/LESSON_REQUEST.md`.
Use `docs/BACKLOG.md` for ready lesson candidates and `docs/REVIEW_CHECKLIST.md`
before publishing.

## Visual-First Rule

Visual-first does not mean no text.

Use this priority:

1. Visual demonstration
2. Interaction
3. Short label
4. Optional explanation

If the visual is not self-explanatory, add small explanatory text.

Use text as support, not the main experience.

Good:

- Short labels
- Tooltips
- Small captions
- Optional explanation panels

Avoid:

- Long essay-like lessons
- Large paragraphs before the visual
- Overexplaining obvious visuals
- Hiding the actual example below too much text

## Shader and VFX Lessons

For shader lessons, prefer:

- Node-flow diagrams
- Visual previews
- Sliders or presets
- Before/after comparisons
- ASE or Unity equivalent notes when useful

A good shader page may include:

- Node-flow diagram
- Live preview or animated placeholder
- Sliders for parameters
- Preset cards
- Before/after comparison
- Small implementation notes
- ASE / Shader Graph equivalent explanation

Example dissolve node chain:

```text
UV -> Noise -> Threshold -> Alpha Cutoff -> Edge Glow -> Final Color
```

Important: a web-based node-flow diagram is conceptual. It teaches how the
logic connects, but it is not automatically an actual ASE graph, Shader Graph,
or Unity asset.

## Tarot Lessons

For tarot lessons, prefer:

- Card imagery or symbolic representation
- Keyword clusters
- Upright / reversed meaning
- Emotional tone
- Example readings
- Spread position diagrams
- Reflection prompts
- Practice log

Avoid presenting tarot as guaranteed prediction. Treat it as reflective
interpretation and pattern reading.

## Localized Lessons

English is the default language. Keep shader and VFX lessons English-only by
default; only localize tarot-type lessons or pages that are explicitly planned
for localization.

Localized lesson copy should live in `src/content/locales/<lesson-slug>/` as
one JSON file per language. Translate values only; keep keys and array order
stable so the rendering components can stay simple. See `docs/LOCALIZATION.md`
for the authoring workflow.

## Interaction Ideas

Useful visual interactions:

- Dragging nodes
- Hover explanations
- Toggle before/after
- Scrubbable timeline
- Parameter sliders
- Preset grid
- Step-by-step reveal
- Animated arrows
- Comparison cards
- Minimal quiz or recall prompt

## Code Quality

Expected code style:

- TypeScript
- Small focused components
- Clear props
- Avoid large all-in-one files
- Keep reusable visual components in `src/components`
- Keep content in `src/content/lessons`
- Keep project docs in `docs`

New MDX components must be registered in `src/app/lessons/[slug]/page.tsx`
before lessons can use them through `MDXRemote`.

For client-side visual demos, use explicit client components and keep browser
logic out of server-only lesson loading code.

## Safety and Scope

Agents should not:

- Add external services without approval
- Add databases unless explicitly requested
- Add authentication unless explicitly requested
- Add payment, tracking, analytics, or account features
- Add Unity, Unreal, or heavy native dependencies
- Create many lessons in one task unless requested

## Review Checklist

Before finishing, check:

- Does the app still build or lint?
- Does the lesson appear on the homepage if published?
- Does the lesson route render?
- Are visuals actually useful?
- Did the task stay in scope?
- Are file names clear?

Trigger an independent code review when a change touches shared app structure,
shared components, build/deploy config, MDX registration, workflow rules, or
several files at once. Most new visual lessons require independent review
because they usually add components and MDX registration. For small text-only
lesson edits, lint, typecheck, build, and this checklist are enough by default.
