# Lesson Workflow

Use this workflow when adding a new Learning Vault lesson.

Start from `docs/templates/LESSON_REQUEST.md` when the request is broad or
needs handoff to another agent.

## 1. Define The Lesson

Keep the lesson narrow enough that one visual can carry the idea.

```md
Lesson title:
Primary learner question:
Topic area:
Visual proof:
Interaction:
Beginner gotchas:
Practice prompt:
```

## 2. Choose The Shape

A normal visual lesson should include:

- a short hook
- a concept map or node flow
- one interactive or animated example
- two or three variations or presets
- a beginner explanation
- common mistakes
- a practice task

## 3. Build The Content

- Add the MDX file in `src/content/lessons`.
- Add reusable visual components in `src/components`.
- Register new MDX components in `src/app/lessons/[slug]/page.tsx`.
- Keep shader and VFX diagrams conceptual unless real engine assets are explicitly requested.

## 4. Review Before Publishing

Use `docs/REVIEW_CHECKLIST.md` for the full review path.

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Check:

- The lesson appears on the homepage if `published: true`.
- The lesson remains hidden from the homepage if `published: false`.
- The lesson route renders.
- The main visual is visible before heavy explanation.
- The interaction or visual walkthrough teaches one clear idea.
- The text is short enough to scan.
- Most new visual lessons require independent review because they usually add a
  component and register it for MDX. Small text-only lesson edits can skip that
  review after local validation passes.

## 5. Choose The Next Lesson

Use `docs/BACKLOG.md` to pick future work. Prefer items marked `ready` unless
Bob asks for a different topic.
