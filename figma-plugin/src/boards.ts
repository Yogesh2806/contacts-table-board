// The five context boards (design/canvas Main, References, FieldMap, Flow, Heuristics) as editable frames:
// real text, cards and diagrams built from the same tokens and a few live component instances. No images.
import { DATA } from './data';
import { add, box, fillW, grow, ico, rect, setProp, size, spacer, tag, txt } from './lib';
import { HUE, STAGES, avatar, mk } from './components';
import { wrapText } from './components2';

type Frame = FrameNode;
const BW = 1440;
async function board(name: string, w = BW): Promise<Frame> { const f = box(name, { dir: 'VERTICAL', gap: 32, pad: 64, align: 'MIN', fill: 'bg', w }); tag(f); return f as Frame; }
async function head(f: Frame, eyebrow: string, title: string, lede: string) {
  const h = add(f, box('Header', { dir: 'VERTICAL', gap: 8, align: 'MIN' }));
  add(h, await txt(eyebrow, 'overline', 'text-muted', 'eyebrow'));
  add(h, await txt(title, 'display', 'text', 'title'));
  add(h, await txt(lede, 'body', 'text-muted', 'lede', { w: 880 }));
  return h;
}
/** A bordered card with a heading and body lines. Lines may start with "**Bold.** rest" (split on the first ". "). */
async function card(name: string, w: number, heading: string, lines: string[], opts: { fill?: string; badge?: string; sub?: string } = {}) {
  const c = box(name, { dir: 'VERTICAL', gap: 12, pad: 24, align: 'MIN', fill: opts.fill ?? 'surface', stroke: 'border', radius: 'md', w });
  if (opts.badge) {
    const r = add(c, box('Title row', { gap: 12 }));
    const b = add(r, box('Badge', { justify: 'CENTER', radius: 'full', fill: 'action', w: 28, h: 28 })); add(b, await txt(opts.badge, 'caption-strong', 'on-action', 'letter'));
    add(r, await txt(heading, 'heading', 'text', 'heading'));
  } else add(c, await txt(heading, 'heading', 'text', 'heading'));
  if (opts.sub) add(c, await txt(opts.sub, 'caption', 'text-muted', 'subtitle'));
  for (const l of lines) {
    const m = l.match(/^\*\*(.+?)\*\* ?(.*)$/);
    if (m) {
      const r = add(c, box('Line', { gap: 6, align: 'MIN' })); fillW(r);
      add(r, await txt(m[1], 'body-sm-strong', 'text', 'lead'));
      wrapText(add(r, await txt(m[2], 'body-sm', 'text-muted', 'text')));
    } else wrapText(add(c, await txt(l, 'body-sm', 'text-muted', 'text'))).layoutSizingHorizontal = 'FILL';
  }
  return c;
}
async function rowOf(parent: Frame, name: string, gap = 24) { const r = add(parent, box(name, { gap, align: 'MIN' })); return r; }
async function chip(label: string, fill = 'surface-sunken', fg = 'text') {
  const c = box(label, { gap: 6, pad: [0, 12], justify: 'CENTER', fill, radius: 'full', h: 28 }); c.appendChild(await txt(label, 'body-sm-strong', fg, 'label')); return c;
}

// ---- 01 · The problem ----
export async function buildMain(): Promise<Frame> {
  const f = await board('01 · The problem');
  await head(f, 'STEP 1 OF 4 · UNDERSTAND', 'Contacts: one dataset, two ways to look at it',
    'A small team keeps business contacts in a Notion-style database. They need a table to scan fields and a board to see the pipeline — and they need to fix a contact\'s stage or notes from either view without losing their place.');
  const pills = add(f, box('Stages', { gap: 8 })); for (const s of STAGES) add(pills, mk('Stage pill', { Stage: s }));
  const cols = add(f, box('Columns', { gap: 24, align: 'MIN' }));
  add(cols, await card('The job to be done', 432, 'The job to be done', [
    'Three teammates (Arjun, Priya, Sara) own about ten contacts. Three moments matter:',
    '**Scan.** “When I review my list, I want to see every field at a glance so I can spot gaps — missing emails, no owner.”',
    '**Move.** “When a deal moves forward, I want to change its stage from wherever I am so the pipeline stays true.”',
    '**Return.** “When I\'m done editing, I want to land exactly where I was — same view, same scroll, same row.”'], { badge: 'A' }));
  add(cols, await card('What must work', 432, 'What must work', [
    '✓ One shared dataset of 8–12 fictional contacts', '✓ A Table / Board switch over that same data', '✓ Board groups: Lead, Prospect, Qualified, Customer',
    '✓ Edit Stage and Notes from either view, with a clear Save and Cancel', '✓ A saved stage moves the card and updates the table row', '✓ No duplicate or stale records after any number of switches',
    '✓ An empty board group and missing optional fields', '✓ Closing the panel keeps your view; keyboard focus makes sense; works on a narrow desktop'], { badge: 'B' }));
  add(cols, await card('Where it can break', 432, 'Where it can break', [
    '**Draft leaks.** Typing in Notes must not change the table or board until you press Save.',
    '**Cancel lies.** Cancel must restore the saved values exactly — even after five edits in a row.',
    '**Focus gets lost.** After a stage save, the card has moved to another column. Focus has to follow it, not vanish.',
    '**The empty column.** Qualified starts empty. It still needs a header, a count of 0 and a reason to exist.',
    '**Narrow screens.** At 1024px, eight columns plus a side panel don\'t fit side by side.'], { badge: '!' }));
  const row = add(f, box('Rules', { gap: 24, align: 'MIN' }));
  add(row, await card('Assumptions', 432, 'Assumptions', ['Name and Stage are required; every other field can be empty. Stage is one choice of four. Only Stage and Notes are editable in this exercise.']));
  add(row, await card('Out of scope, on purpose', 432, 'Out of scope, on purpose', ['Backend, login, adding or deleting contacts, editing other fields. Search, filters and drag-and-drop are stretch goals, after the core flow is solid.']));
  const j = add(row, await card('How it will be judged', 432, 'How it will be judged', []));
  const chips = add(j, box('Criteria', { gap: 8, wrap: true })); fillW(chips);
  for (const c of ['Visual design', 'Interaction', 'Implementation', 'Robustness', 'Reasoning']) add(chips, await chip(c));
  return f;
}

// ---- 02 · References ----
export async function buildReferences(): Promise<Frame> {
  const f = await board('02 · Learn from real products');
  await head(f, 'STEP 1 · REAL-WORLD PATTERNS', 'Borrow what people already know', 'Familiar patterns cost users nothing to learn. For each product: the pattern, what we take, and where we deliberately differ.');
  const refs: [string, string, string, string][] = [
    ['Notion databases', 'View tabs over one data source · side peek', 'Table and Board as tabs on the same data. Opening a record in a side peek, so the list stays visible behind it.', 'Notion autosaves. The brief asks for a clear Save and Cancel, so edits are a draft until you commit.'],
    ['Linear', 'Keyboard-first · calm density', 'Every action has a key. J and K walk records with the panel open; ⌘↵ saves; Esc backs out one level at a time.', 'We show shortcuts in tooltips and button labels, so nobody has to memorise them first.'],
    ['Attio', 'Modern CRM · monochrome chrome', 'Owners as avatar plus name, quiet black-and-white chrome, and colour only where it means something. That is Aa NAD\'s rule too.', 'Missing data is drawn on purpose — a dashed “No owner” — not left as a blank cell.'],
    ['Pipedrive and HubSpot deal boards', 'Stages left to right · counts per column', 'Stages read left to right in the order a deal moves. Each column header shows a live count.', 'An empty column keeps its full height with a hint, so it is still a visible target.'],
    ['Airtable', 'Frozen primary column · expanded record', 'The Name column stays frozen while the rest scrolls sideways. That is our answer to the narrow desktop.', 'Fewer columns by default. Notes collapse into a one-line preview.'],
    ['Gmail', '“Archived · Undo” toast', 'After a save, a toast says what changed in plain words, with Undo. Saving feels safe because it is reversible.', 'Focus never jumps to the toast. It is announced politely to screen readers.'],
  ];
  const grid = add(f, box('Products', { gap: 24, wrap: true, align: 'MIN' })); size(grid, BW - 128); grid.counterAxisSpacing = 24;
  for (let i = 0; i < refs.length; i++) {
    const [t, sub, take, differ] = refs[i];
    const c = await card(t, 420, t, [`**Take:** ${take}`, `**Differ:** ${differ}`], { sub });
    // a small live specimen under the text
    const spec = add(c, box('Specimen', { gap: 8 }));
    if (i === 0) add(spec, mk('View switch', { Value: 'Table' }));
    if (i === 1) for (const k of ['J', 'K', '⌘ ↵', 'Esc']) { const x = add(spec, mk('Kbd')); setProp(x, 'key', k); }
    if (i === 2) { add(spec, avatar('Arjun Rao', 24)); add(spec, avatar('Priya Shah', 24)); add(spec, mk('Avatar', { Size: '24', Hue: 'empty' })); }
    if (i === 3) for (const s of STAGES) { const h = add(spec, mk('Column header', { Stage: s })); h.resize(150, h.height); }
    if (i === 5) { const t2 = add(spec, mk('Toast', { Type: 'saved-with-undo' })); t2.resize(380, t2.height); }
    if (i === 4) spec.remove();
    add(grid, c);
  }
  return f;
}

// ---- 03 · Fields & data ----
const FIELDS: [string, boolean, string, [string, string], [string, string], [string, string], string][] = [
  ['Name', true, 'Text', ['Frozen first column, with avatar', 'S'], ['Card title', 'S'], ['Panel heading', 'S'], 'The anchor you look for in every view.'],
  ['Stage', true, 'Select, 1 of 4', ['Coloured pill; click opens the panel at Stage', 'S'], ['The column is the stage', 'C'], ['Editable select', 'E'], 'Repeating the stage on a card inside its own column is noise.'],
  ['Company', false, 'Text', ['Column', 'S'], ['Subtitle: Role · Company', 'C'], ['Read-only field', 'S'], 'The second thing you look for after the name.'],
  ['Role', false, 'Text', ['Column', 'S'], ['Merged into the subtitle', 'C'], ['Read-only field', 'S'], 'One line on the card instead of two; if either is missing, the other stands alone.'],
  ['Owner', false, 'Person', ['Avatar and first name', 'S'], ['Avatar only, with tooltip', 'C'], ['Read-only field', 'S'], 'Who to ask. On a small card a face is enough.'],
  ['Labels', false, 'Multi-select', ['First 2 tags, then “+1”', 'C'], ['First 2 tags', 'C'], ['All tags', 'S'], 'Context at a glance without wrapping rows or growing cards.'],
  ['Email', false, 'Email', ['Column, truncated', 'S'], ['Hidden', 'H'], ['Field with copy button', 'S'], 'Long and rarely scanned on a board. You need it when you act, so it lives in the panel.'],
  ['Notes', false, 'Long text', ['One-line preview; hidden under 1100px', 'C'], ['Note icon when present', 'C'], ['Editable text area', 'E'], 'A hint that something is written, without turning cards into paragraphs.'],
];
const CODE: Record<string, [string | null, string | undefined]> = { S: ['surface', undefined], C: ['amber/50', undefined], H: [null, 'border-strong'], E: ['blue/50', undefined] };
export async function buildFieldMap(): Promise<Frame> {
  const f = await board('03 · Fields & data');
  await head(f, 'STEP 1 · INFORMATION ARCHITECTURE', 'Which field lives where', 'The table is for comparing, so it shows almost everything. Cards are for recognising a person in a column, so they show only what identifies them. The panel shows everything and is the only place you edit.');
  const lg = add(f, box('Legend', { gap: 12 }));
  for (const [l, k] of [['Shown', 'S'], ['Condensed', 'C'], ['Hidden', 'H'], ['Editable', 'E']]) {
    const c = add(lg, box(l, { gap: 8, pad: [0, 12], radius: 'sm', h: 28, fill: CODE[k][0], stroke: CODE[k][1] || 'border', dash: k === 'H' ? [4, 3] : undefined })); add(c, await txt(l, 'body-sm-strong', 'text', 'label'));
  }
  const widths = [150, 150, 250, 220, 180, 330];
  const tbl = add(f, box('Fields', { dir: 'VERTICAL', align: 'MIN', stroke: 'border', radius: 'md', clip: true }));
  const heads = ['Field', 'Type', 'Table', 'Board card', 'Details panel', 'Why'];
  const hr = add(tbl, box('Header', { fill: 'bg-subtle', align: 'MIN' }));
  for (let i = 0; i < 6; i++) { const c = add(hr, box(heads[i], { pad: 12, w: widths[i], align: 'MIN' })); add(c, await txt(heads[i], 'caption-strong', 'text-muted', 'label')); }
  for (const [name, req, type, t, b, p, why] of FIELDS) {
    const r = add(tbl, box(name, { align: 'MIN', stroke: 'border', strokeSides: 't' }));
    const cells: [string, string | null, string][] = [[name + (req ? '  · required' : ''), null, 'body-sm-strong'], [type, null, 'body-sm'], [t[0], t[1], 'body-sm'], [b[0], b[1], 'body-sm'], [p[0], p[1], 'body-sm'], [why, null, 'body-sm']];
    for (let i = 0; i < 6; i++) {
      const [s, code, style] = cells[i];
      const c = add(r, box(heads[i], { dir: 'VERTICAL', pad: 12, w: widths[i], align: 'MIN', fill: code ? CODE[code][0] : null, stroke: code && CODE[code][1] ? CODE[code][1] : undefined, dash: code === 'H' ? [4, 3] : undefined }));
      wrapText(add(c, await txt(s, style, i >= 5 ? 'text-muted' : 'text', 'value')));
    }
  }
  add(f, await txt(`Sample dataset · ${DATA.contacts.length} fictional contacts`, 'heading', 'text', 'dataset title'));
  const cols = ['Name', 'Company', 'Role', 'Email', 'Owner', 'Labels', 'Stage', 'Notes'], w2 = [170, 190, 160, 230, 80, 170, 80, 260];
  const dt = add(f, box('Dataset', { dir: 'VERTICAL', align: 'MIN', stroke: 'border', radius: 'md', clip: true }));
  const dh = add(dt, box('Header', { fill: 'bg-subtle', align: 'MIN' }));
  for (let i = 0; i < 8; i++) { const c = add(dh, box(cols[i], { pad: [8, 12], w: w2[i], align: 'MIN' })); add(c, await txt(cols[i], 'caption-strong', 'text-muted', 'label')); }
  for (const c of DATA.contacts) {
    const vals = [c.name, c.company || 'missing', c.role || 'missing', c.email || 'missing', c.owner ? c.owner.split(' ')[0] : 'none', c.labels.length ? c.labels.join(', ') : 'none', c.stage, c.notes || 'empty'];
    const r = add(dt, box(c.name, { align: 'MIN', stroke: 'border', strokeSides: 't' }));
    for (let i = 0; i < 8; i++) {
      const cell = add(r, box(cols[i], { dir: 'VERTICAL', pad: [8, 12], w: w2[i], align: 'MIN' }));
      const miss = ['missing', 'none', 'empty'].includes(vals[i]);
      wrapText(add(cell, await txt(vals[i], i === 0 ? 'body-sm-strong' : 'body-sm', miss ? 'text-subtle' : 'text', 'value')));
    }
  }
  return f;
}

// ---- 04 · Edit flow & state ----
export async function buildFlow(): Promise<Frame> {
  const f = await board('04 · Edit flow & state', 1600);
  await head(f, 'STEP 1 · INTERACTION MODEL', 'One edit path, from either view', 'Table and board open the same panel. Edits stay in a draft until Save, so the views never show half-finished changes — and Cancel always has something true to go back to.');
  const node = async (title: string, sub: string, accent = false) => {
    const n = box(title, { dir: 'VERTICAL', gap: 4, pad: 16, align: 'MIN', fill: accent ? 'action' : 'surface', stroke: 'border-strong', radius: 'md', w: 220 });
    add(n, await txt(title, 'body-sm-strong', accent ? 'on-action' : 'text', 'title'));
    if (sub) wrapText(add(n, await txt(sub, 'caption', accent ? 'on-action' : 'text-muted', 'text')));
    return n;
  };
  const arrow = () => ico('chevron-forward', 20, 'text-subtle', 'then');
  const lane = async (name: string, items: [string, string, boolean?][]) => {
    const r = add(f, box(name, { gap: 12, align: 'MIN' }));
    for (let i = 0; i < items.length; i++) { if (i) add(r, arrow()); add(r, await node(items[i][0], items[i][1], items[i][2])); }
    return r;
  };
  add(f, await txt('Open and edit', 'heading', 'text', 'lane title'));
  await lane('Open and edit', [['Table', 'Click a row or press Enter'], ['Board', 'Click a card or press Enter'], ['Open side panel', 'Focus moves to its heading'], ['Edit a draft', 'Stage or Notes; an Unsaved dot appears'], ['Save or cancel?', '', true]]);
  add(f, await txt('Save', 'heading', 'text', 'lane title'));
  await lane('Save', [['Save', '⌘↵ or the Save changes button', true], ['Commit once', 'One update to the store'], ['Both views re-render', 'Card changes column, row pill updates, toast with Undo']]);
  add(f, await txt('Cancel or leave', 'heading', 'text', 'lane title'));
  await lane('Cancel or leave', [['Cancel · Esc', 'Drop the draft', true], ['Close or J/K while dirty', 'Unsaved changes?'], ['Keep editing or Discard', 'Discard drops the draft'], ['Drop the draft', 'Saved values untouched'], ['Back to context', 'Same view and scroll; focus on that record']]);
  const row = add(f, box('Rules', { gap: 24, align: 'MIN' }));
  add(row, await card('Panel rules', 480, 'Panel rules', [
    '• Side peek on the right: pushes the list at 1280px and up, overlays it below.', '• Tab order inside: Stage → Notes → Cancel → Save changes.',
    '• J / K walk to the previous or next record; a dirty draft asks first.', '• After Save the panel stays open on the saved record.', '• Esc or close returns focus to the row or card, even if the card moved column.']));
  const st = add(row, box('State', { dir: 'VERTICAL', gap: 16, align: 'MIN' }));
  add(st, await card('Source of truth', 480, '1 · Source of truth', ['contacts: one list, keyed by id, changed only by a reducer action updateContact(id, patch).']));
  add(st, await card('Derived, never copied', 480, '2 · Derived, never copied', ['Table rows and board groups are computed from contacts on every render. No second copy means no duplicate or stale card.']));
  add(st, await card('UI state, kept per view', 480, '3 · UI state, kept per view', ['view, selectedId, draft, scroll position per view and the element that opened the panel — so closing puts you back.']));
  return f;
}

// ---- 05 · Heuristics ----
const HEUR: [string, string, string][] = [
  ['01', 'Visibility of system status', 'Unsaved dot on the panel. Save enables only when something changed. Column counts update live; the moved card flashes once in its new column.'],
  ['02', 'Match the real world', 'Stages run left to right, Lead to Customer, like a sales pipeline. Plain words: “Save changes”, not “Submit”.'],
  ['03', 'User control and freedom', 'Cancel and Esc drop the draft. Every save shows a toast with Undo. Closing the panel never moves you somewhere new.'],
  ['04', 'Consistency and standards', 'One stage pill, one avatar, one panel — the same in both views. Aa NAD components and tokens throughout.'],
  ['05', 'Error prevention', 'Stage is a fixed list, so it can\'t be blank or misspelled. Leaving a dirty draft asks Keep editing or Discard.'],
  ['06', 'Recognition over recall', 'The stage picker shows all four options with their colours. View switch shows both names with icons. Shortcuts sit in tooltips.'],
  ['07', 'Flexibility and efficiency', 'Mouse for beginners; ⌘↵, Esc, J/K and arrow keys for experts. Drag-and-drop between columns as a stretch shortcut.'],
  ['08', 'Aesthetic, minimal design', 'Cards carry 4 things: name, role · company, labels, owner. Ink and paper; colour is used only for stages.'],
  ['09', 'Recover from errors', 'Moved the wrong person? Undo in the toast puts the stage and notes back exactly as they were.'],
  ['10', 'Help and documentation', 'The empty Qualified column explains how to fill it. Missing fields say “Add email” instead of staying blank. Press ? for shortcuts.'],
];
export async function buildHeuristics(): Promise<Frame> {
  const f = await board('05 · Nielsen\'s 10, applied');
  await head(f, 'STEP 1 · DESIGN PRINCIPLES', 'Nielsen\'s 10 heuristics, as decisions', 'Each heuristic becomes something you can point at in the interface — and check in the prototype.');
  const grid = add(f, box('Heuristics', { gap: 16, wrap: true, align: 'MIN' })); size(grid, BW - 128); grid.counterAxisSpacing = 16;
  for (const [n, t, d] of HEUR) add(grid, await card(t, 648, `${n}  ${t}`, [d]));
  add(f, await card('Lively, within the system', BW - 128, 'Lively, within the system', ['Calm motion only where it explains a change: card lifts 2px on hover, panel slides in over 320ms, the moved card fades into its new column, the toast slides up. All of it turns off under reduced motion.'], { fill: 'surface-sunken' }));
  return f;
}
export const BOARDS: { key: string; x: number; y: number; build: () => Promise<Frame> }[] = [
  { key: 'Main', x: 0, y: 0, build: buildMain },
  { key: 'References', x: 1520, y: 0, build: buildReferences },
  { key: 'FieldMap', x: 0, y: 1200, build: buildFieldMap },
  { key: 'Flow', x: 1520, y: 1200, build: buildFlow },
  { key: 'Heuristics', x: 0, y: 2440, build: buildHeuristics },
];
