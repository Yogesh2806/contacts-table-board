# Component inventory (signed off)

What becomes a Figma component, with its variants and properties. Built from the live React code (`src/components`) and the canvas screens (`design/canvas`). Tokens: `design/tokens.json`.

Sign-off decisions:

- **Button keeps all five states** (default, hover, pressed, focus, disabled), so 40 variants.
- **Context boards are included** as editable frames (text, diagrams, notes), not images.

## Foundations

| Collection | Contents | Modes |
|---|---|---|
| Primitives (scopes hidden) | `neutral/*` (21 greys) and `blue`, `violet`, `amber`, `green` × 50/100/200/300/600/800 | Light / Dark. On the free plan: two collections, `Primitives/Light` and `Primitives/Dark` |
| Semantic colour | Every key in `color.semantic`, aliased to primitives via `alias` | Light / Dark (two collections on the free plan) |
| Spacing | `space` (0–48) | — |
| Radius | `radius` (none, sm, md, lg, full) | — |

Code syntax on every variable: `var(--<name>)`, matching `src/styles/tokens.css`.

**Text styles (12):** display, title, heading, card-name, body, body-sm, body-sm-strong, caption, caption-strong, label, overline, mono (see `type` in tokens.json). Font: Atkinson Hyperlegible Next / Mono, Inter fallback.

**Shadow styles (8):** elevation-1 to elevation-4, light and dark.

## Components

| # | Component | Variants | Properties | Source |
|---|---|---|---|---|
| 1 | Icon (about 40 Ionicons + sidebar glyph) | One component each, 20px base | — | `ui/Icon.tsx`, `Sidebar.tsx` |
| 2 | Avatar | size 24/32/48 × hue blue/violet/amber/green, plus `empty` | initials (text) | `ui/Avatar.tsx` |
| 3 | Stage pill | stage Lead/Prospect/Qualified/Customer | — (text fixed per variant) | `ui/stage.tsx` |
| 4 | Label tag | — | label (text) | `ContactCard.tsx`, `ContactsTable.tsx` |
| 5 | Badge | type count/danger/info | value (text) | `Sidebar.tsx` |
| 6 | Kbd | — | key (text) | `index.css` `.kbd` |
| 7 | Button | type primary/secondary/ghost/danger × size sm/md × state default/hover/pressed/focus/disabled (40) | label (text), show icon (bool), icon (swap) | `ui/Button.tsx` |
| 8 | Icon button | state default/hover/focus/disabled | icon (swap) | `ui/Button.tsx` |
| 9 | Segmented item | selected yes/no × state default/hover/focus | label (text), icon (swap) | `Header.tsx` |
| 10 | View switch | value Table/Board | — (built from #9) | `Header.tsx` |
| 11 | Search input | state empty/filled/focus | value (text), show shortcut hint (bool) | `Header.tsx` |
| 12 | Select (owner filter) | state default/focus | value (text) | `Header.tsx` |
| 13 | Filter chip | — | label (text) | `Header.tsx` |
| 14 | Table header cell | type sticky/regular | label (text), icon (swap) | `ContactsTable.tsx` |
| 15 | Table cell | content text/muted/stage/owner/no-owner/labels/missing | value (text) | `ContactsTable.tsx` |
| 16 | Table row | state default/hover/selected/flash | — (made of #15) | `ContactsTable.tsx` |
| 17 | Contact card | state default/hover/selected/dragging/flash | name, subtitle (text); show labels, show owner, show notes icon, missing subtitle (bool) | `ContactCard.tsx` |
| 18 | Column header | stage × 4 | count (text) | `ContactsBoard.tsx` |
| 19 | Empty column | type empty/filtered/drop-target × stage 4 | message, hidden count (text) | `ContactsBoard.tsx` |
| 20 | Stage option | stage 4 × state unselected/selected/saved/hover/focus (20) | — | `StagePicker.tsx` |
| 21 | Stage picker | — | show hint (bool) | `StagePicker.tsx` |
| 22 | Notes field | state empty/filled/focus | value, counter (text) | `DetailsPanel.tsx` |
| 23 | Detail row | state filled/missing | label, value (text), icon (swap) | `DetailsPanel.tsx` |
| 24 | Panel footer | state clean/dirty/saved | change count (text) | `DetailsPanel.tsx` |
| 25 | Details panel | state clean/dirty/saved | name, position (text) | `DetailsPanel.tsx` |
| 26 | Toast | type saved-with-undo/info | message (text), show undo (bool) | `Toast.tsx` |
| 27 | Dialog | type discard/shortcuts | title, description (text) | `ui/Dialog.tsx`, `AppShell.tsx` |
| 28 | Sidebar item | state default/hover/current × mode expanded/rail | label, count (text), show badge (bool), icon (swap) | `Sidebar.tsx` |
| 29 | Sidebar | mode expanded/rail | — | `Sidebar.tsx` |

About 170 variants in total, plus about 41 icon components.

## Screens (live instances only)

Product: A Table, B Board, C Board edit, C2 Table edit, D Saved, E Discard guard, F Narrow (1024px), G Synced, H Focus, I Drag, J Filtered, K No results.
Context boards: Main (problem), References, Field map, Flow, Heuristics.

Each screen matches `design/canvas/<Name>.dc.html` and the live app at https://contacts-table-board.vercel.app.

## Approximations

- Motion (row and card flash, panel slide-in, toast) becomes static frames, with timing noted from `motion` in tokens.json.
- Hover lift and the dragged card's tilt are separate variants.
- Sticky columns, scrolling and focus behaviour can't be shown; focus is drawn as a 2px outline variant.
