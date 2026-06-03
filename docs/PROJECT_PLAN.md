# Learning Vault Project Plan

## Purpose

Learning Vault is Bob's personal visual-first learning system.

The goal is to create interactive web-based learning modules that make hard
topics easier to understand through visuals, animation, interaction, and small
examples.

Initial focus areas:

- Shader and VFX learning
- Tarot learning
- Future personal learning topics

The project should prioritize understanding over completeness.

## Direction

Learning Vault is a web-based learning source, not a Unity project.

It should support lessons such as:

- Shader node connection guides
- Interactive concept diagrams
- Animated examples
- Before/after visual comparisons
- Tarot card maps and spread diagrams
- Practice prompts and exercises

The first version should stay practical and lightweight.

## Stack

Current stack:

- Next.js / React
- TypeScript
- MDX
- React Flow
- Three.js / React Three Fiber
- Framer Motion
- SVG / Canvas
- Tailwind CSS
- GitHub
- Linear
- AI coding agents such as Codex and Claude Code

## Non-Goals

Learning Vault is not:

- A full LMS
- A public course platform
- A Unity project
- A shader editor clone
- A generic note-taking app
- A database-heavy app
- A polished commercial product at this stage

Avoid over-engineering early.

## Current Repo State

The app currently has:

- A deployed Next.js static-export app on GitHub Pages
- Filesystem-based MDX lesson loading
- Search/filter support for published lessons
- A reader-facing homepage with start paths for onboarding, shader lessons, and tarot
- Ten published lessons across onboarding, shader/VFX fundamentals, a shader glossary, and Major Arcana tarot
- Reusable visual components for lesson layout, links, React Flow diagrams, canvas demos, and React Three Fiber demos
- Per-lesson localization support for the bilingual Major Arcana lesson

The original starter `hello-world` demo is unpublished so it does not appear in
the lesson library.

## Completed Milestone

The first milestone is complete: agents can add useful visual lessons with MDX,
interactive React components, diagrams, animation, and reusable lesson patterns.

The first shader/VFX batch is also complete. It covers UV dissolve, Fresnel rim
light, UV panning and flow maps, masked color ramps, noise basics, two-layer UV
panning, normal map basics, and a shader keyword glossary.

## Next Milestone

Refine the library and add the next high-value lesson in a small, reviewable
increment.

Recommended target shape:

- Choose one lesson from `docs/BACKLOG.md`
- Write a short request using `docs/templates/LESSON_REQUEST.md`
- Keep diagrams conceptual unless Bob explicitly asks for engine-specific assets
- Use "Shader Graph Equivalent" for shader engine mapping sections
- Validate with lint, TypeScript, and build before publishing
