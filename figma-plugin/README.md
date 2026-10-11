# Contacts Table & Board — Figma plugin

Builds the design library from `design/tokens.json` and the React components as **real, editable Figma objects**: variables, text and shadow styles, 42 icon components, 28 components with variants and component properties (161 variants), 11 product screens and 5 context boards. No screenshots or flat images.

## Install
1. `cd figma-plugin && npm install && npm run build` (creates `code.js`).
2. In Figma desktop: **Plugins → Development → Import plugin from manifest…** and pick `figma-plugin/manifest.json`.
3. Open an empty design file and run **Plugins → Development → Contacts Table & Board → Build**.

## Commands
- **Build** — creates what is missing and skips anything that already exists *by name* (variables, styles, icons, component sections/sets, screens). Safe to run again after an interrupted run or after you added your own work.
- **Rebuild** — first removes only nodes the plugin tagged (`setPluginData('generated','1')`), then builds again. Sections or frames you made by hand are never touched. Variables and styles are kept and reused.

## Output
- **Pages (3):** `Cover & Foundations` (cover with counts, colour, type, spacing, radius and elevation sections), `Components` (one section per component, Icons first), `Screens` (Step 1 context boards, Step 2 screens A–K as live instances).
- **Variables:** colour primitives and semantic tokens (aliases, scopes set, WEB code syntax `var(--name)`), spacing, radius, layout and motion numbers.
- **Plans:** on paid plans Light/Dark are modes. On the free (Starter) plan collections are limited to one mode, so Dark lives in separate collections (`Primitives/Light`, `Primitives/Dark`, `Semantic/Light`, `Semantic/Dark`) and the file is kept to 3 pages using sections.
- Fonts: Atkinson Hyperlegible Next/Mono; falls back to Inter and notes it in the console if not installed.

## Approximations
- Motion (flash, panel slide, toast) is shown as static states; hover lift and button press scale are not drawn.
- Sticky columns, scrolling and focus order cannot be shown; focus is a two-shadow ring variant.
- Components bind to the **Light** semantic variables; Dark values exist as variables (swatches on the Foundations page bind to them).
- Empty column "hidden count" is folded into its `message` text; Table cell has an extra `name` variant; Details panel shows at most 3 label tags; the drag tilt is applied on the instance in screen I.
- Font weight "Medium" maps to the regular/semibold styles.

## Figma gotchas handled
Font loaded before any text write; no `currentPage` setter and async-only style APIs (`dynamic-page`); `setBoundVariableForPaint` result reassigned; paint colours are r,g,b only; scopes never ALL_SCOPES; `layoutSizing` HUG/FILL set only after the node is in the right auto-layout parent; `resize()` before sizing modes (it resets to FIXED); wrapping text uses `textAutoResize = 'HEIGHT'`; `combineAsVariants` only with components under the same parent; `addComponentProperty` only on sets, `componentPropertyDefinitions` never read on a variant; no children added to instances; no nested sections; description only on components.

## Development
- `npm run gen-data` regenerates `src/data.ts` from `design/tokens.json`, `src/data/contacts.ts`, `Icon.tsx` and Ionicons.
- `npm run typecheck`, `npm run build` (gen-data + esbuild → `code.js`).
- `npm test` bundles and runs the plugin against `scripts/mock-figma.mjs`, an in-memory Figma API that throws on the gotchas above. Scenarios: paid and free plan first Build, a second Build that must add nothing, and a Rebuild that must leave hand-made sections alone; plus audits (scopes, code syntax, unbound fills, unstyled text, zero-size layers).
