---
name: astro-page-vs-island
description: Decides when to use Astro pages versus React islands, minimizing unnecessary client-side JavaScript.
---

# Astro Page vs Island Decision

This skill enforces **correct separation between Astro and React**, preventing overuse of client-side hydration.

## When to use this skill

Use this skill when:
- Creating or refactoring pages in an AstroJS project
- Mixing `.astro` files with React components
- Deciding whether a feature needs interactivity

Do NOT use this skill when:
- The project is not using AstroJS
- The component is already clearly interactive or static

## How to use it

1. Analyze the feature requirements
2. Classify the component as:
   - Static (Astro page/component)
   - Interactive (React island)
3. Use React **only** when interactivity is required
4. Apply the minimum necessary `client:*` directive

## Decision Rules

- Static content → `.astro`
- Forms, state, events → React
- Avoid `client:load` by default
- Prefer `client:visible` or `client:idle`

## Expected Output

- Clear justification for Astro vs React usage
- Reduced client-side JavaScript
- Better performance and maintainability
