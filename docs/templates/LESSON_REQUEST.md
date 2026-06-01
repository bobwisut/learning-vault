# Lesson Request Template

Use this when asking an agent to create or revise a Learning Vault lesson.

## Request

```md
Lesson title:
Lesson slug:
Domain: shader-vfx | tarot | learning-system | other
Learner level: beginner | intermediate | advanced
Primary learner question:
Outcome:
```

## Frontmatter

```md
title:
description:
tags:
published: true | false
```

## Visual Plan

```md
Main visual:
Interaction: required | optional | none
Diagram:
Presets or examples:
Animation:
Reference style or source:
```

## Content Requirements

```md
Must include:
- 

Must avoid:
- 

Beginner gotchas:
- 

Practice prompt:
- 
```

## Technical Scope

```md
Expected files:
- src/content/lessons/<slug>.mdx
- src/components/<domain>/<ComponentName>.tsx

Allowed shared changes:
- 

Not allowed:
- app architecture changes
- external services
- Unity or real ASE files unless explicitly requested
```

## Acceptance Criteria

- Lesson appears on the homepage if `published: true`.
- Lesson remains hidden from the homepage if `published: false`.
- Lesson route renders without obvious runtime errors.
- Main visual is visible before long explanation.
- Interaction or visual walkthrough teaches one clear idea.
- At least one diagram, visual preview, preset set, or practice prompt is included.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.

## Review Trigger

Request an independent review if the work touches shared app structure, shared
components, build/deploy config, MDX registration, workflow rules, or several
files at once. Most new visual lessons require independent review because they
usually add a component and register it for MDX.
