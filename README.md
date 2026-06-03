# Learning Vault

Learning Vault is a personal, visual-first learning system for difficult topics.
The first focus is shader and VFX learning, with room for tarot and other
personal learning domains later.

The app is intentionally lightweight. It is a Next.js web app for interactive
lessons, not a Unity project, LMS, or generic note-taking system.

## Current Stack

- Next.js App Router
- React and TypeScript
- MDX lesson content
- React Flow for node and concept diagrams
- Three.js / React Three Fiber for visual demos
- Framer Motion for small animations
- Tailwind CSS

## Project Structure

- `src/content/lessons` - published MDX lessons
- `src/components` - reusable visual and lesson components
- `src/lib/lessons.ts` - lesson discovery and frontmatter loading
- `docs/PROJECT_PLAN.md` - project direction and milestones
- `docs/AGENT_GUIDELINES.md` - guidance for agents creating lessons

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Useful validation commands:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

There is no test suite yet.

## Deployment

The app is configured for static export and GitHub Pages.

Pushes to `main` run `.github/workflows/deploy.yml`, build the app with
`npm run build`, upload the generated `out` directory, and deploy it to the
default GitHub Pages domain.

## Lesson Authoring

Lessons are MDX files in `src/content/lessons`. Published lessons need
frontmatter like:

```mdx
---
title: Lesson Title
description: Short lesson summary.
tags: [shader, visual]
published: true
---
```

See `docs/AGENT_GUIDELINES.md`, `docs/LESSON_WORKFLOW.md`, and
`docs/REVIEW_CHECKLIST.md` before adding or changing lesson content. Current
status and next steps live in `docs/PROJECT_STATE.md`; candidate lessons live in
`docs/BACKLOG.md`.
