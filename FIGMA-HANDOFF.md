# Figma handoff: Contacts Table & Board

**For the next Claude task.** Rebuild this project's designs in Figma as a real, editable file: variables, styles, and components with variants and properties. No flat images or screenshots.

Start by reading, in this order:

1. `design/COMPONENTS.md`: the signed-off component inventory. Build exactly this.
2. `design/tokens.json`: every colour (light and dark), type style, spacing step, radius, shadow and layout size. Key names match the CSS variables in `src/styles/tokens.css`.
3. `src/components/*`: the React source of truth for structure, spacing and states.
4. `design/canvas/*.dc.html`: the original canvas screens A–K and the context boards. They reference an Aa NAD component bundle that isn't in this repo, so treat them as layout references. The live app is https://contacts-table-board.vercel.app.

**Template:** `Yogesh2806/Aa-NAD-Design-System`, `figma-plugin/src/code.ts`, is a working plugin built the same way. Reuse its structure: variable creation, the component-set grid, properties and the rebuild command.

## 1. Source of truth (done)

`design/tokens.json`, `design/COMPONENTS.md` and the React code. Don't redesign anything; reproduce what's there.

## 2. Figma plugin

- TypeScript in `figma-plugin/src/code.ts`, bundled with esbuild into `figma-plugin/code.js`.
- A generated data file, `figma-plugin/src/data.ts`, built by a script (`figma-plugin/scripts/gen-data.mjs`) from `design/tokens.json` and the Ionicons SVGs listed in `src/components/ui/Icon.tsx` (from `node_modules/ionicons/dist/svg`), plus the sidebar glyph in `src/components/Sidebar.tsx`.
- `manifest.json`: `editorType: ["figma"]`, `documentAccess: "dynamic-page"`, `networkAccess: { "allowedDomains": ["none"] }`, and a menu with **Build** and **Rebuild** commands.
- If Figma's own connector/MCP is available in that session, write to Figma directly instead of building a plugin.

**Build order:**

1. **Variables:**
   - Primitives first (`neutral/*` and the hue scales), with scopes hidden.
   - Then semantic colours, aliased to primitives using each token's `alias`.
   - Then spacing and radius.
   - Set scopes and code syntax `var(--name)` on every variable.
2. **Styles:** text styles (`type`) and shadow styles (`shadow`, light and dark).
3. **Icons:** one component per icon.
4. **Components:**
   - Use auto-layout, with fills, strokes, padding, gaps and radius bound to variables.
   - Combine into variant sets laid out in a grid, then add component properties as listed in COMPONENTS.md.
5. **Pages:** one per component plus Screens, and a cover built from live instances. See the free-plan rule below.

**Re-run safety:**

- Build skips anything that already exists (match by name).
- Rebuild removes only the pages or sections the plugin generated (tag them with `setPluginData('generated', '1')`), then builds again.

## 3. Known Figma gotchas (handle all of them)

- **Free/Starter plan limits:** 1 variable mode per collection, 3 pages per file, 3 files per team project.
  - Fall back to separate collections (`Semantic/Light`, `Semantic/Dark`).
  - If pages run out, use sections on 3 pages: *Cover & Foundations*, *Components*, *Screens*.
  - Create the file in Drafts.
- **`combineAsVariants`:** every variant must already be on the same page as the target parent.
- **SVGs:** use `rescale()`, not `resize()`. Otherwise shapes and stroke widths don't scale and icons turn into black squares.
- **Text:** call `resize()` before setting `textAutoResize = 'HEIGHT'`, or wrapped text overlaps what's below.
- **Fill and grow:** `layoutSizingHorizontal = 'FILL'` and `layoutGrow` only work after the node is appended to an auto-layout parent.
- **Fonts:** load every font weight before using it. If Atkinson Hyperlegible is missing, fall back to Inter and report it.
- **Paints:** `setBoundVariableForPaint` returns a new paint. Assign it back.
- **Text properties:** don't link one text property across variants whose text differs; it overwrites them all. Set per-variant text directly.
- **Glyphs and contrast:** avoid glyphs the font lacks (for example ⌘; write "Cmd"). Give pages light backgrounds so dark text stays readable.
- **Removing pages:** you can't remove the page you're on. Switch to another page first.

## 4. Test before touching real Figma

- Type-check against `@figma/plugin-typings`, then bundle.
- Run the bundle against a mock of the Figma API that enforces every gotcha above, including the free-plan limits (modes, pages), the same-page rule for `combineAsVariants`, appended-before-FILL, and font loading.

## 5. Run and review in Figma

- Ask the user for computer-use access to Figma. Create a new design file in Drafts.
- Choose Plugins → Development → Import plugin from manifest… → `figma-plugin/manifest.json`, then run **Build**.
- Open every page, zoom to fit and check it visually against the live app and `design/canvas`. Check the plugin console for warnings. Fix and re-run until it's clean.
- Don't publish anything or click irreversible buttons without asking the user.

## 6. Deliver

- Commit `figma-plugin/` to this repo, with a short `figma-plugin/README.md` on how to re-run it.
- Tell the user in plain language what was built: counts of variables, styles, components and variants, and anything approximated (motion, hover lift, drag tilt, sticky columns, scrolling).

## Project facts

- **Stages and hues:** Lead blue, Prospect violet, Qualified amber, Customer green. Colour always comes with the stage name.
- **Theme:** the UI is black and white (Aa NAD rule), with colour only for stages and status.
- **Layout:** sidebar 232px open, 64px rail; details panel 440px floating over the page, full height; table minimum width 1100px, with a sticky Name column.
- **Data:** 10 fictional contacts in `src/data/contacts.ts`. Use the same names in the screens.
