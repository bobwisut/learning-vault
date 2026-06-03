# Project State

_Last updated: 2026-06-03_

## Project Purpose

Learning Vault is Bob's personal visual-first learning system **for Bob to learn topics he wants to learn**. The current shader/VFX and tarot lessons cover things Bob already knows — they exist mainly to establish a reusable lesson **template/blueprint** so that producing a lesson on an *unknown* topic (where Bob has no prior expertise) becomes as easy as possible. Implication for design decisions: prize formats and patterns that are **portable and easy to author for any future topic**, not just maximally polished on the current known domains. A shader-only enhancement that can't transfer to a topic without a custom demo is "icing," not the blueprint.

## Current Goal

Keep building clear, visual lessons that use diagrams, interaction, and compact beginner explanations. The shader/VFX core path is now complete; current work is refinement (consistency, cross-linking) and selecting the next lesson from the backlog.

## Current Phase

Phase 3: Implementation.

The app foundation, deployment, lesson workflow, onboarding lesson, and the full first shader/VFX batch are complete. Current work is lesson refinement and continued production.

## Active Checkpoints

- [ ] Concept Map upgrade: piloted on UV Dissolve; roll the `FlowCanvas` `cards` format (Receives / Changes / Watch) out to the other 8 shader lessons once Bob signs off on the live pilot.
- [ ] Pick the next lesson from `docs/BACKLOG.md`.
- [ ] Keep each lesson aligned with the visual lesson workflow and review checklist.
- [ ] Verify GitHub Pages after publishing new lessons.

## Recently Completed

- [x] Published 10 lessons total: How To Read A Visual Lesson; shader/VFX (UV Dissolve, Fresnel Rim Light, UV Panning And Flow Maps, Masked Color Ramp, Noise Basics, Two-Layer UV Panning, Normal Map Basics); Shader Keyword Glossary (reference); Major Arcana overview (Thai, tarot).
- [x] Unpublished the `hello-world` starter demo so it no longer clutters the lesson list / shader filter.
- [x] Renamed "UV Flow And Dissolve Shader" -> "UV Dissolve Shader" (slug unchanged) to remove overlap with the Flow Maps lesson.
- [x] Added a `LessonLink` component (next/link, auto-prefixes the GitHub Pages basePath) and wired real cross-lesson links into every "How This Connects" section; added that section to the 4 shaders that lacked it.
- [x] Standardized section heading to "Three Useful Presets" and mental-model arrows to Unicode `→` across all lessons.
- [x] Replaced "ASE Equivalent" with a "Shader Graph Equivalent" section on all 7 shader lessons (Bob's familiar field; node mappings are verifiable). Kept conceptual — node wiring only, no `.shadergraph` assets.
- [x] Added lesson workflow docs, review checklist, backlog, and lesson request template.
- [x] Made the Major Arcana lesson fully bilingual (EN/TH): a single page-level toggle (`MajorArcanaLesson`) switches the prose and the card map together. Default language is English.
- [x] Extracted Major Arcana localized copy into editable JSON files under `src/content/locales/major-arcana-overview/` and documented the per-lesson localization workflow in `docs/LOCALIZATION.md`.
- [x] Cleaned up the homepage so it reads as a lesson library instead of an internal build-status page.

## Blocked / Waiting

- Needs confirmation if any future lesson should use real engine-specific assets instead of conceptual web diagrams.
- Reconcile Linear cards COD-53 / COD-55 against repo reality (needs Bob's input on what they cover and whether they are still open).

## Important Decisions

- Learning Vault is a lightweight Next.js visual learning app, not a Unity project, LMS, or generic notes app.
- Lessons live as MDX in `src/content/lessons`.
- Reusable visuals live in `src/components`.
- Shader/VFX diagrams are conceptual unless Bob explicitly asks for real engine assets.
- Localization: English is the default language. Thai is reserved for tarot-type lessons we plan to localize (e.g. Major Arcana). Shader lessons stay English-only; no Thai toggle on shaders. Bilingual lessons use per-lesson JSON files in `src/content/locales/<lesson-slug>/`, with a wrapper component that owns one `lang` state and passes localized content to interactive children. Card proper names stay English in both languages by tarot convention.
- Cross-lesson references must use the `LessonLink` component, never raw markdown links — raw links do not get the `/learning-vault` basePath in production and break on GitHub Pages.
- Section naming standard: "Three Useful Presets". Mental-model arrows: Unicode `→`.
- Engine-mapping sections use **Unity Shader Graph** ("Shader Graph Equivalent"), not Amplify Shader Editor. Bob's familiar field. Keep them conceptual: node names/wiring only, never `.shadergraph` asset files.
- Most new visual lessons should get independent review because they usually add a component and register it for MDX.
- The four-panel visual pipeline is the preferred pattern for shader lessons when it fits the concept.
- Concept Maps should be "signal chains," not label chains: each `FlowCanvas` step carries name + **Receives** / **Changes** / **Watch** (which demo panel/control shows the step). Authored via the `steps` string using `::` field separators per step, `|` between steps: `"Name :: receives :: changes :: watch | ..."`. Plain `steps="A|B|C"` (no `::`) still renders the simple label chain. Keep each field a short phrase.
- IMPORTANT toolchain constraint: `next-mdx-remote/rsc` (v6) only passes **literal string** props from MDX to components — JSX **expression** props like `cards={[...]}` are silently dropped at render. Any structured data an MDX component needs must come through a string prop (e.g. a `::`/`|` DSL or JSON string), never an object/array literal.
- Active repo is `C:\Users\Wisut\.openclaw\workspace\learning-vault`; the older `D:\Projects\learning-vault` copy is stale.

## Active Files / Areas

- `src/content/lessons/`
- `src/content/locales/`
- `src/components/shader/`
- `src/components/lesson/`
- `src/app/lessons/[slug]/page.tsx`
- `docs/BACKLOG.md`
- `docs/LESSON_WORKFLOW.md`
- `docs/REVIEW_CHECKLIST.md`
- `docs/templates/LESSON_REQUEST.md`
- `.github/workflows/deploy.yml`

## Next Recommended Action

Pick the next lesson from `docs/BACKLOG.md` using `docs/templates/LESSON_REQUEST.md`. Validate changes with `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Notes for Future Agents

- Read this file before starting any Learning Vault task, then read the related Linear card or task instruction.
- After finishing, update this file with completed work, blockers, important decisions, and the next recommended action.
- Prefer small, reviewable lesson increments.
- Keep text short and make the main visual teach the lesson.
- Check existing lesson/component patterns before adding new architecture.
