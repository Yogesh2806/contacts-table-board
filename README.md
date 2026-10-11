# Contacts · Table & Board

Two working views of one contacts list: a **table** for scanning fields and a **board** for seeing people by stage. Stage and Notes can be edited from either view in one shared details panel, with explicit **Save** and **Cancel**, and both views always agree.

- **Live preview:** https://contacts-table-board.vercel.app
- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, dnd-kit. Mock data and local state only.
- **Key idea:** `contacts` is the only copy of the data. The table and board are computed from it, and edits live in a separate draft until you save, so the views can't drift apart or go stale.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 18 tests: reducer + full user flows
npm run build      # type-check and production build
```

Node 18 or newer.

## The brief, point by point

| Requirement | Where it is |
|---|---|
| One dataset of 8–12 fictional contacts | 10 contacts in `src/data/contacts.ts` |
| Table / Board switch | Segmented control under the page title (arrow keys work) |
| Board grouped into Lead, Prospect, Qualified, Customer | Always all four columns, in pipeline order |
| Fields: Name, Email, Company, Role, Owner, Labels, Stage, Notes | Table shows all; cards show name, role · company, labels, owner, notes hint; the panel shows everything |
| Edit Stage and Notes from either view | Shared details panel, opened from a row or a card |
| Clear Save and Cancel | Sticky footer with a change count; ⌘/Ctrl + Enter saves; Undo after saving |
| Saved stage moves the card and updates the table | One reducer action updates the single record; both views re-render from it |
| Switching views keeps edits, no duplicates or stale records | Draft survives view switches; covered by tests that repeat edits and switches |
| Empty board group | Qualified starts empty, with an explanation |
| Missing optional information | Lena (no email, labels or notes), Kenji (no owner), Amara (no role) |
| Closing the panel keeps the user's view | Same view and scroll position; focus returns to the record |
| Sensible keyboard focus | Real buttons and radios, row and card arrow keys, focus trap in dialogs, visible focus ring |
| Usable narrower desktop layout | At ~1024px the sidebar becomes a rail and the Notes column hides; the panel floats over the page |
| React + TypeScript, README, live preview, notes | This repo, this file, the link above, and the sections below |

## Scope and time

The core flow took about 4–5 hours, in line with the suggested effort. On top of that:

- **From the brief's optional list:** drag-and-drop between columns (pointer and keyboard), search, an owner filter, and light animation.
- **Beyond the brief:** a mock workspace sidebar (so the page sits in a believable product, and can be collapsed), a dark theme, Undo after saving, and keyboard shortcuts.

Unfinished items and what I'd do next are listed at the end.

## What to try

1. **Edit from the board.** Switch to **Board**, open Daniel Okafor, choose **Qualified**, change the note.
   - Nothing moves until you press **Save changes** (or ⌘/Ctrl + Enter).
   - Then the card moves to Qualified, the counts update, and the table row changes too.
   - A toast offers **Undo**.
2. **Edit from the table.** Open any row and do the same. Switch views while a draft is unsaved: the draft stays.
3. **Cancel and the guard.**
   - **Cancel** throws the draft away and takes you back to the row or card you came from.
   - **Esc** or **×** with unsaved changes asks *Discard unsaved changes?* instead of losing them silently. J/K to another contact asks the same.
4. **Keyboard only.**
   - Table: Tab to a name, then ↑/↓ and Enter.
   - Board: ←/→ moves between columns, ↑/↓ between cards. **Space** picks a card up, arrows move it, Space drops it.
   - Everywhere: `/` jumps to search, `[` opens or closes the sidebar, and `?` lists every shortcut.
   - When the panel closes, focus returns to the same record, even if its card moved to another column.
5. **Edge cases.**
   - Qualified starts empty.
   - Lena has no email, labels or notes. Kenji has no owner. Amara has no role.
   - Oliver's long name truncates. Isabela's third label shows as "+1".
   - Filter by owner to see columns that are empty *because of the filter* (with a count of what's hidden), as opposed to truly empty. Search "acme" for the no-results state.
6. **Sidebar, narrow desktop and dark theme.**
   - The panel icon next to the workspace name (or `[`) closes the sidebar to an icon rail and opens it again. On wide screens the choice is remembered.
   - Resize to ~1024px: the sidebar becomes a rail and the Notes column hides. Opening it there shows it over the page, so the table never squeezes; Esc or a click outside closes it.
   - Toggle the theme at the bottom of the sidebar.

## How it's built

```
src/
  data/contacts.ts        10 fictional contacts, chosen to cover the edge cases
  state/reducer.ts        the single source of truth + UI state, as one reducer
  state/selectors.ts      filtering, board grouping, dirty checks (pure functions)
  state/store.tsx         React context around the reducer
  components/
    AppShell.tsx          layout, the open/close/guard logic, keyboard shortcuts
    Header.tsx            title, view switch, search, owner filter, active filters
    ContactsTable.tsx     table view
    ContactsBoard.tsx     board view + drag-and-drop (dnd-kit)
    ContactCard.tsx       board card
    DetailsPanel.tsx      the shared panel: stage, notes, read-only details, footer
    StagePicker.tsx       the Lead › Prospect › Qualified › Customer picker
    Toast.tsx, ui/*       small Aa NAD-styled building blocks
  styles/tokens.css       Aa NAD tokens as CSS variables (light + dark)
```

**One source of truth, two lenses.**
- `contacts` is the only copy of the data. It changes in exactly three ways: `save`, `moveStage` (drag-and-drop) and `undo`, each replacing one record by id.
- Table rows and board columns are *computed* from it on every render, never copied. That's why a saved change shows in both views at once, and why repeated edits and view switches can't create duplicate or stale records.

**Draft vs saved.**
- Edits live in a separate `draft` that is `null` whenever it matches the saved record.
- "Unsaved", the change count, the Save/Cancel bar and the discard guard all come from comparing draft and saved values.
- Cancel just drops the draft, so it always goes back to exactly what was saved.

**Keeping your place.**
- Both views stay mounted. The inactive one is hidden with `visibility`, so each keeps its own scroll position.
- The panel floats over the page instead of pushing it, so the layout behind it doesn't jump.
- When a record changes or the panel closes, that record is scrolled into view (clear of the panel) and, on close, gets focus back.

## Design choices

- **Where fields go.**
  - The table shows almost everything, because it's for comparing.
  - Cards show only what identifies a person: name, role · company, two labels, owner and a notes hint. Stage isn't repeated on a card because the column *is* the stage.
  - The panel shows everything, and it's the only place you edit.
- **Explicit save instead of autosave** (unlike Notion). The brief asks for a clear Save and Cancel. A visible draft also makes "what has changed" obvious and lets Cancel mean something.
- **Undo instead of "Are you sure?" on save.** Saving is reversible, so it shouldn't need a confirmation. The only confirmation is for *losing* unsaved work.
- **The stage picker is a pipeline**, not a dropdown. All four options are visible in order with their colours. While editing, the saved stage keeps a dashed outline so you can compare "was" and "will be". It's built from native radio buttons.
- **Colour only where it means something.** The interface is black and white (Aa NAD's rule). Colour marks stages, and it always comes with the stage's name.
- **Empty states explain themselves.** "No qualified contacts yet" says how to fill the column. A column emptied by a filter says how many contacts are hidden and offers Clear filters.
- **Accessibility.**
  - Every control is a real button, link, radio or input, and focus is always visible.
  - The panel is labelled by the contact's name, and dialogs trap focus and return it afterwards.
  - Toasts use a polite live region; drag-and-drop announces each step.
  - Reduced-motion settings turn off all animation.

Nielsen's heuristics guided the details: unsaved and saved status always visible; Undo, Cancel and Esc for control; one stage component and one panel everywhere for consistency; the discard guard for error prevention; visible options and shortcut hints instead of memory; Enter, J/K and Space for experts.

## Trade-offs

- **Tokens, not the Aa NAD component bundle.** Aa NAD's React components ship as a pre-built script that loads its own copy of React as a global. Mixing that into a Vite app means two copies of React or awkward workarounds. Instead I built small typed components on the same tokens and fonts. The look matches; the code stays one React tree.
- **Fonts from Google Fonts.** Atkinson Hyperlegible Next and Mono load from Google Fonts instead of being bundled, which keeps the repo small. Offline, the app falls back to Roboto / system fonts.
- **Only Stage and Notes are editable**, as the brief scopes it. The other fields are read-only in the panel.
- **No persistence.** State is in memory and resets on reload, as the brief allows. The only things in `localStorage` are the theme and whether the sidebar is open.
- **Drag-and-drop changes stage only.** Card order within a column isn't stored.
- **One toast at a time.** A new change replaces the previous toast, so Undo always refers to the latest change.
- **The open record always stays visible**, even if it no longer matches the search, so editing never makes it vanish. It drops out when the panel closes.
- **No loading or error states.** With no backend there's nothing to wait for or fail. With an API, Save would show a spinner and a retryable error message.

## Unfinished and next

- Unit tests for drag-and-drop with a real pointer (it's covered by the reducer tests and checked by hand).
- Persist to `localStorage`, or to a real API with optimistic updates and rollback.
- Editing the other fields (owner, labels, email) with proper validation.
- Sorting, column visibility and saved views in the table.
- Optional push layout on very wide screens, where the panel could sit beside the board instead of over it.
- A visual regression test for the light and dark themes.

## Design files

- `design/tokens.json`: every colour (light and dark), type style, spacing step, radius and shadow.
- `design/COMPONENTS.md`: the component inventory, with variants and properties.
- `design/canvas/`: the original design canvas (problem breakdown, field map, flows, Nielsen's heuristics and screens A–K).
- `FIGMA-HANDOFF.md`: the plan for rebuilding these designs as an editable Figma file.
