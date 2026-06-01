# Visual Lesson Review Checklist

Use this checklist before publishing or accepting a Learning Vault lesson.

## Product Fit

- The lesson teaches one clear idea.
- The lesson is visual-first, not essay-first.
- The page does not claim to generate Unity, Shader Graph, ASE, or other engine assets unless it really does.
- The content matches the requested domain and does not add unrelated lessons.

## Lesson Shape

- Frontmatter has `title`, `description`, `tags`, and `published`.
- The title and description are beginner-readable.
- The first screen makes the topic obvious.
- The lesson includes a useful visual hook, concept map, interaction, examples or presets, gotchas, and a practice prompt when appropriate.
- Text supports the visual instead of burying it.

## Visual Quality

- The main visual is visible before heavy explanation.
- Labels fit their containers on mobile and desktop.
- Interactions have clear controls and readable states.
- Diagrams show meaningful relationships, not decoration.
- Presets or examples demonstrate a real difference.
- Color, motion, and contrast help understanding.

## Technical Quality

- Reusable visuals live in `src/components`.
- Lesson content lives in `src/content/lessons`.
- New MDX components are registered in `src/app/lessons/[slug]/page.tsx`.
- Browser-only logic stays inside client components.
- File names are clear and domain-specific.
- Shared code changes are small and justified.

## Validation

### Local Pre-Handoff

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then check:

- Homepage lists the lesson if published.
- Homepage hides the lesson if it is a draft.
- Local build generates the expected lesson route.
- Existing lessons still render locally.

### Post-Push Deployment

The agent or person who pushes to `main` should check:

- Lesson URL returns `200` after deployment.
- GitHub Pages deploy succeeds after push.
- Existing published lessons still return `200`.

## Independent Review Rule

Independent review is required when a change touches:

- shared app structure
- shared components
- MDX registration
- build or deployment config
- several files at once
- project workflow rules
- new visual lessons that add components or require MDX registration

Independent review is optional for small single-lesson text edits after lint,
typecheck, build, and this checklist pass.
