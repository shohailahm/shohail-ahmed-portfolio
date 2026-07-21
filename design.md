# Design

## Colour

OKLCH throughout. Light and dark themes toggle via `data-theme="dark"` on `<html>`. The palette centres on a green-primary axis with a warm orange accent. Tokens are named semantically (`--ink`, `--muted`, `--panel`, `--line`) so the theme-swap never touches component styles.

- Light: near-white background (`oklch(0.990 0.002 158)`), dark ink.
- Dark: deep teal-black background (`oklch(0.090 0.014 172)`), near-white ink.
- Primary green works against both backgrounds; accent orange reserved for the AI-Worker proof card.

## Typography

`Avenir Next` / `Helvetica Neue` for body. Mono stack (`SFMono-Regular`, `Consolas`, `Liberation Mono`) for metadata labels (role, project-proof, timeline companies, photo caption). Headings are tight—`0.92` line-height on the hero `h1`, negative letter-spacing. Sizes use `clamp()` so they scale smoothly without breakpoint noise.

## Layout

A single `--max: 1180px` constraint. The hero, about, project, and experience sections all collapse from 2-column to single-column at `920px`. The header goes from row to column at `680px` for narrow screens.

The grid pairings are asymmetric by intent:

- Hero: copy takes `1.2fr`, proof-stack takes `0.8fr` — headline gets clear visual priority.
- About: `1fr` copy, `0.8fr` photo + skill list — photo and skills share the right column.
- Project featured: `0.55fr` copy, `1fr` screenshot — visual primacy.
- Timeline: `0.45fr` company, `1fr` bullet list — results are the substance.

## Components

### Proof cards

Two cards in the hero sidebar with direct `<strong>` titles (no separate kicker labels — fewer visual layers). The first (AI-Worker) gets a distinctive `panel-2` gradient. Cards have a `1px` border, `12px` radius, and a subtle panel-to-bg gradient.

### Theme toggle

A single `44x44px` button with moon/sun icons. Moon visible in light mode, sun visible in dark mode. The initial theme respects the OS `prefers-color-scheme` setting before falling back to light. State is persisted to `localStorage("portfolio-theme")` once changed. The `theme-color` meta tag also updates so the browser chrome matches.

### Project list

Featured projects get a two-column layout with screenshot; mini projects (in a `2x1` grid) get a card treatment. The grid collapses to single-column below `680px`. Eyebrow labels were removed — titles and descriptions speak for themselves.

### About photo

Circular `180px` headshot with a `3px` primary-green border, placed in the right column of the about section above the skill list. Falls back gracefully (hidden via `onerror`) if the image file isn't present yet.

### Currently box

A small panel below the about copy showing what I'm reading, building, and available for. Replaces static filler with an evolving signal.

### Skip link

Fixed-position skip-to-content link that drops into view on focus (`translateY(-100%)`) — standard a11y pattern.

### Hamburger nav

Hamburger button appears below `680px`. Toggles a full-screen overlay drawer with centered nav links + actions. State tracked via `aria-expanded` and `data-open` attribute. Closes automatically when a link is clicked.

## Responsive strategy

No media queries for font sizes (clamp handles that). Three breakpoints only:

- `920px`: collapse multi-column sections.
- `680px`: hamburger nav replaces inline header, collapse mini-project grid, widen button targets.
- `prefers-reduced-motion`: disables smooth scrolling.

## Accessibility

- Skip link at page top.
- `aria-label` on nav, sections, buttons, and links.
- `min-height: 44px` / `min-width: 44px` touch targets throughout.
- Focus-visible ring at `2px solid var(--primary)`.
- Screen-reader-friendly theme-toggle label that updates per state.
- Hamburger nav uses `aria-expanded` and `aria-label` for screen-reader state.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body copy.

## Voice

The copy was rewritten to kill AI-generated feel. Principles: specificity over benefit statements, first-person over corporate-speak, concrete examples over generic taglines. The hero now leads with a fact ("9 years of React and TypeScript in production") instead of a mission statement. Section headings vary in structure. The "Currently" box adds a personal signal that evolves over time.

## Performance

Zero runtime dependencies — no framework, no build step, no JavaScript library. The JS file is ~1.6 KB before gzip. Images are `loading="lazy"` with explicit `width`/`height` to prevent layout shift.


