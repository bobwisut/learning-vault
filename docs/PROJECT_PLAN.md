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

- A Next.js app scaffold
- Filesystem-based MDX lesson loading
- A demo lesson at `src/content/lessons/hello-world.mdx`
- Reusable starter components for animation, React Flow, and R3F

The repo does not yet have the first real shader lesson. The existing
`hello-world` lesson is a component demo, not the COD-56 UV/dissolve lesson.

## First Milestone

Build a strong foundation for agent-created visual lessons.

The first milestone should prove that an agent can create a useful visual lesson
with:

- MDX content
- Interactive React components
- Node-flow diagrams
- Simple animations
- Reusable visual components

## First Shader Lesson Target

The first real shader lesson should teach UV flow and a dissolve shader node
chain.

Minimum target:

- One published MDX lesson
- One node-flow diagram
- One animated or interactive visual
- Three preset examples
- Short beginner-friendly explanations
- A clear note that web diagrams are conceptual and are not generated Unity,
  Shader Graph, or ASE assets

Suggested dissolve chain:

```text
UV -> Noise -> Threshold -> Alpha Cutoff -> Edge Glow -> Final Color
```

A simple but working module is better than an ambitious half-broken one.
