// Screens A-K: live instances of the components, arranged exactly like design/canvas/*.dc.html and the app.
import { DATA } from './data';
import { C, add, box, effectStyle, fillH, fillW, find, findAll, findInst, focusRing, ico, fillOf, grow, paint, rect, setProp, setProps, size, spacer, tag, tok, txt, warn } from './lib';
import { COLS, HUE, REG, STAGES, avatar, button, hueFor, initials, mk, swap } from './components';
import { oneLine, setPicker, wrapText } from './components2';

export interface Contact { id: string; name: string; stage: string; email: string; company: string; role: string; owner: string; labels: string[]; notes: string }
export const CONTACTS: Contact[] = DATA.contacts;
const cid = (id: string) => CONTACTS.find((c) => c.id === id)!;

// ---------- populate instances ----------
function populateCard(card: InstanceNode, c: Contact) {
  const sub = [c.role, c.company].filter(Boolean).join(' · ');
  setProp(card, 'name', c.name);
  if (sub) setProp(card, 'subtitle', sub); else { setProp(card, 'missing subtitle', true); const s = find(card, 'subtitle'); if (s) s.visible = false; }
  setProp(card, 'show labels', c.labels.length > 0);
  if (c.labels.length) {
    const l1 = findInst(card, 'Label 1'), l2 = findInst(card, 'Label 2'), more = find(card, 'more') as TextNode;
    if (l1) setProp(l1, 'label', c.labels[0]);
    if (l2) { if (c.labels[1]) setProp(l2, 'label', c.labels[1]); else l2.visible = false; }
    if (more) { if (c.labels.length > 2) more.characters = '+' + (c.labels.length - 2); else more.visible = false; }
  }
  const av = findInst(card, 'Avatar'), on = find(card, 'owner name') as TextNode;
  if (c.owner) { if (av) { setProp(av, 'Hue', hueFor(c.owner)); setProp(av, 'initials', initials(c.owner)); } if (on) on.characters = c.owner.split(' ')[0]; }
  else { if (av) setProp(av, 'Hue', 'empty'); if (on) { on.characters = 'No owner'; on.fills = [paint(tok('text-subtle'))]; } }
  setProp(card, 'show notes icon', !!c.notes);
}
function populateRow(row: InstanceNode, c: Contact) {
  const cell = (n: string) => findInst(row, n)!;
  const name = cell('Name'); setProp(name, 'value', c.name);
  const av = findInst(name, 'Avatar'); if (av) { setProp(av, 'Hue', hueFor(c.name)); setProp(av, 'initials', initials(c.name)); }
  const st = findInst(cell('Stage'), 'Stage pill'); if (st) setProp(st, 'Stage', c.stage);
  for (const [col, v] of [['Company', c.company], ['Role', c.role]] as [string, string][]) { const x = cell(col); if (v) setProp(x, 'value', v); else setProp(x, 'Content', 'missing'); }
  const ow = cell('Owner');
  if (c.owner) { setProp(ow, 'value', c.owner.split(' ')[0]); const a = findInst(ow, 'Avatar'); if (a) { setProp(a, 'Hue', hueFor(c.owner)); setProp(a, 'initials', initials(c.owner)); } } else setProp(ow, 'Content', 'no-owner');
  const lb = cell('Labels');
  if (!c.labels.length) setProp(lb, 'Content', 'missing');
  else {
    const l1 = findInst(lb, 'Label 1'), l2 = findInst(lb, 'Label 2'), more = find(lb, 'more') as TextNode;
    if (l1) setProp(l1, 'label', c.labels[0]);
    if (l2) { if (c.labels[1]) setProp(l2, 'label', c.labels[1]); else l2.visible = false; }
    if (more) { if (c.labels.length > 2) more.characters = '+' + (c.labels.length - 2); else more.visible = false; }
  }
  for (const [col, v] of [['Email', c.email], ['Notes', c.notes]] as [string, string][]) { const x = cell(col); if (v) setProp(x, 'value', v); else setProp(x, 'Content', 'missing'); }
}
interface PanelOpts { state: 'clean' | 'dirty' | 'saved'; contact: Contact; savedStage?: string; draftStage?: string; notes?: string; changes?: number; index?: number }
function populatePanel(p: InstanceNode, o: PanelOpts) {
  const c = o.contact; const sub = [c.role, c.company].filter(Boolean).join(' · ') || 'No role or company yet';
  setProps(p, { name: c.name, position: sub });
  const avs = findAll(p, 'Avatar') as InstanceNode[];
  if (avs[0]) { setProp(avs[0], 'Hue', hueFor(c.name)); setProp(avs[0], 'initials', initials(c.name)); }
  const pill = findInst(p, 'Stage pill'); if (pill) setProp(pill, 'Stage', c.stage);
  const picker = findInst(p, 'Stage picker')!;
  if (o.state === 'dirty') setPicker(picker, o.draftStage!, c.stage, `Saved as ${c.stage}. Saving moves this contact to ${o.draftStage}.`); else setPicker(picker, c.stage, null, null);
  const notes = o.notes ?? c.notes; const nf = findInst(p, 'Notes field')!;
  if (notes) { setProp(nf, 'State', o.state === 'dirty' ? 'focus' : 'filled'); setProps(nf, { value: notes, counter: `${notes.length} / 1000` }); } else { setProp(nf, 'State', 'empty'); setProp(nf, 'counter', '0 / 1000'); }
  const email = find(p, 'email') as TextNode; if (email) { if (c.email) email.characters = c.email; else { email.characters = 'No email yet'; email.fills = [paint(tok('text-subtle'))]; const cp = find(p, 'Copy email'); if (cp) cp.visible = false; } }
  for (const [n, v, none] of [['Company row', c.company, 'No company yet'], ['Role row', c.role, 'No role yet']] as [string, string, string][]) {
    const r = findInst(p, n); if (!r) continue; if (v) setProp(r, 'value', v); else { setProp(r, 'State', 'missing'); setProp(r, 'value', none); swap(r, 'icon', 'information-circle'); }
  }
  const oav = avs[1], on = find(p, 'owner name') as TextNode;
  if (c.owner) { if (oav) { setProp(oav, 'Hue', hueFor(c.owner)); setProp(oav, 'initials', initials(c.owner)); } if (on) on.characters = c.owner; }
  else { if (oav) setProp(oav, 'Hue', 'empty'); if (on) { on.characters = 'No owner yet'; on.fills = [paint(tok('text-subtle'))]; } }
  const tags = ['Label 1', 'Label 2', 'Label 3'].map((n) => findInst(p, n));
  tags.forEach((t, i) => { if (!t) return; if (c.labels[i]) { setProp(t, 'label', c.labels[i]); t.visible = true; } else t.visible = false; });
  const nol = find(p, 'no labels'); if (nol) nol.visible = c.labels.length === 0;
  const idx = find(p, 'index') as TextNode; if (idx) idx.characters = `${(o.index ?? 0) + 1} of ${CONTACTS.length}`;
  const f = findInst(p, 'Panel footer'); if (f && o.state === 'dirty') setProp(f, 'change count', String(o.changes ?? 2));
}

// ---------- screen builder ----------
export interface Spec {
  name: string; w?: number; h?: number; rail?: boolean; view: 'table' | 'board';
  search?: string; owner?: string; moved?: Record<string, string>; selectedId?: string; flashId?: string; focusId?: string;
  panel?: PanelOpts & { contactId: string }; toast?: { type: 'saved-with-undo' | 'info'; message: string; description?: string };
  dialog?: 'discard'; drag?: { id: string; over: string }; empty?: boolean;
}
export async function buildScreen(spec: Spec): Promise<FrameNode> {
  const W = spec.w || 1440, H = spec.h || 900, sb = spec.rail ? 64 : 232, colW = W - sb;
  const moved = spec.moved || {};
  const all = CONTACTS.map((c) => (moved[c.id] ? Object.assign({}, c, { stage: moved[c.id] }) : c));
  const q = (spec.search || '').trim().toLowerCase();
  const visible = all.filter((c) => (spec.owner && spec.owner !== 'all' ? (spec.owner === 'none' ? !c.owner : c.owner === spec.owner) : true) && (!q || [c.name, c.company, c.role, c.email].join(' ').toLowerCase().includes(q)));
  const filtered = !!q || (!!spec.owner && spec.owner !== 'all');

  const f = box(spec.name, { dir: 'NONE', fill: 'bg', clip: true }); f.resize(W, H); tag(f);
  const side = add(f, mk('Sidebar', { Mode: spec.rail ? 'rail' : 'expanded' })); side.name = 'Sidebar'; side.resize(sb, H); side.x = 0; side.y = 0;

  const main = add(f, box('Main', { dir: 'VERTICAL', align: 'MIN', fill: 'bg', clip: true, w: colW, h: H })); main.x = sb; main.y = 0;
  // header
  const head = add(main, box('Header', { dir: 'VERTICAL', gap: 16, pad: [24, 32, 16, 32], align: 'MIN', stroke: 'border', strokeSides: 'b' })); fillW(head);
  const tr = add(head, box('Title row', { gap: 12 }));
  add(tr, await txt('Contacts', 'display', 'text', 'title'));
  const cnt = add(tr, box('Count', { pad: [0, 8], justify: 'CENTER', fill: 'surface-sunken', radius: 'sm', h: 24 }));
  add(cnt, await txt(filtered ? `${visible.length} of ${CONTACTS.length} people` : `${CONTACTS.length} people`, 'caption-strong', 'text-muted', 'count'));
  const tb = add(head, box('Toolbar', { gap: 12 })); fillW(tb);
  add(tb, mk('View switch', { Value: spec.view === 'table' ? 'Table' : 'Board' })).name = 'View switch';
  grow(add(tb, spacer()));
  const si = add(tb, mk('Search input', { State: q ? 'filled' : 'empty' })); si.name = 'Search input'; if (q) setProp(si, 'value', spec.search!);
  const sel = add(tb, mk('Select', { State: 'default' })); sel.name = 'Owner filter';
  if (spec.owner && spec.owner !== 'all') setProp(sel, 'value', spec.owner === 'none' ? 'No owner' : spec.owner);
  if (filtered) {
    const fr = add(head, box('Active filters', { gap: 8 }));
    add(fr, await txt(`Showing ${visible.length} of ${CONTACTS.length} contacts`, 'body-sm', 'text-muted', 'status'));
    if (q) { const ch = add(fr, mk('Filter chip')); setProp(ch, 'label', `Search: “${spec.search!.trim()}”`); }
    if (spec.owner && spec.owner !== 'all') { const ch = add(fr, mk('Filter chip')); setProp(ch, 'label', `Owner is ${spec.owner === 'none' ? 'No owner' : spec.owner}`); }
    add(fr, button('Clear filters', 'ghost', 'sm'));
  }
  // body
  const body = add(main, box('Body', { dir: 'VERTICAL', align: 'MIN', clip: true })); fillW(body); grow(body);
  if (spec.view === 'table') {
    const tbl = add(body, box('Table', { dir: 'VERTICAL', pad: [0, 0, 0, 32], align: 'MIN' }));
    const hr = add(tbl, box('Header row', { align: 'MIN' }));
    COLS.forEach((c, i) => { const h = add(hr, mk('Table header cell', { Type: i === 0 ? 'sticky' : 'regular' })); h.name = c.label; setProp(h, 'label', c.label); swap(h, 'icon', c.icon); h.resize(c.w, 41); });
    for (const c of visible) {
      const st = c.id === spec.flashId ? 'flash' : c.id === spec.selectedId ? 'selected' : 'default';
      const r = add(tbl, mk('Table row', { State: st })); r.name = c.name; populateRow(r, c);
    }
    if (!visible.length) {
      const e = add(body, box('Empty state', { dir: 'VERTICAL', gap: 12, pad: [96, 24], align: 'CENTER', justify: 'MIN' })); fillW(e);
      const ic = add(e, box('Icon', { justify: 'CENTER', radius: 'full', fill: 'surface-sunken', w: 56, h: 56 })); add(ic, ico('search-outline', 24, 'text-muted', 'glyph'));
      add(e, await txt(`No contacts match “${spec.search}”`, 'heading', 'text', 'title'));
      const p = add(e, await txt('Search looks at names, companies, roles and emails. Check the spelling, or clear the filters to see everyone.', 'body', 'text-muted', 'description', { w: 420 })); p.textAlignHorizontal = 'CENTER';
      add(e, button('Clear filters', 'primary', 'md', 'close'));
    }
  } else {
    const board = add(body, box('Board', { gap: 16, pad: [24, 32], align: 'MIN' }));
    for (const stg of STAGES) {
      const h = HUE[stg];
      const col = add(board, box(`${stg} column`, { dir: 'VERTICAL', gap: 12, pad: 12, align: 'MIN', fill: `${h}/50`, radius: 'md', w: 280, h: 560 }));
      const ch = add(col, mk('Column header', { Stage: stg })); fillW(ch); setProp(ch, 'count', String(visible.filter((c) => c.stage === stg).length));
      const cards = visible.filter((c) => c.stage === stg);
      const dragging = spec.drag && spec.drag.over === stg;
      for (const c of cards) {
        if (spec.drag && spec.drag.id === c.id) { const gap = add(col, box('Drag origin', { dir: 'VERTICAL', radius: 'md', stroke: `${h}/300`, dash: [6, 4], w: 256, h: 112 })); gap.opacity = 0.6; fillW(gap); continue; }
        const st = c.id === spec.flashId ? 'flash' : c.id === spec.selectedId ? 'selected' : 'default';
        const card = add(col, mk('Contact card', { State: st })); card.name = c.name; fillW(card); populateCard(card, c);
        if (c.id === spec.focusId) focusRing(card);
      }
      if (dragging) {
        const e = add(col, mk('Empty column', { Type: 'drop-target', Stage: stg })); fillW(e); const m = find(e, 'message') as TextNode; if (m) m.characters = `${cid(spec.drag!.id).name} will leave their current stage. You can undo right after.`;
      } else if (!cards.length) {
        const e = add(col, mk('Empty column', { Type: filtered ? 'filtered' : 'empty', Stage: stg })); fillW(e);
        if (filtered) {
          const hidden = CONTACTS.filter((c) => (moved[c.id] || c.stage) === stg).length;
          const m = find(e, 'message') as TextNode, b = find(e, 'Clear filters');
          if (hidden > 0) { if (m) m.characters = `${hidden} ${stg} ${hidden === 1 ? 'contact is' : 'contacts are'} hidden by your filters.`; } else { if (m) m.characters = `No ${stg} contacts yet, for anyone.`; if (b) b.visible = false; }
        }
      }
    }
  }
  // footer
  const foot = add(main, box('Footer', { gap: 16, pad: [12, 32], stroke: 'border', strokeSides: 't' })); fillW(foot);
  add(foot, await txt(spec.view === 'table' ? `${visible.length} ${visible.length === 1 ? 'contact' : 'contacts'}` : 'Drag a card to change its stage', 'caption', 'text-muted', 'summary'));
  grow(add(foot, spacer()));
  if (W >= 1100) add(foot, await txt(spec.view === 'table' ? 'Select a name or press Enter to open · ↑ ↓ move between rows · ? shortcuts' : '← → columns · ↑ ↓ cards · Enter open · Space move · ? shortcuts', 'caption', 'text-muted', 'keys'));
  // overlays
  if (spec.drag) {
    const dc = cid(spec.drag.id); const card = add(f, mk('Contact card', { State: 'dragging' })); card.name = 'Dragged card'; populateCard(card, dc); card.rotation = 2;
    const stageIdx = STAGES.indexOf(spec.drag.over as any); card.x = sb + 32 + stageIdx * 296 + 12 + 40; card.y = 190;
  }
  if (spec.panel) {
    const o = spec.panel; const p = add(f, mk('Details panel', { State: o.state })); p.name = 'Details panel'; p.resize(440, H); p.x = W - 440; p.y = 0;
    populatePanel(p, Object.assign({}, o, { contact: all.find((c) => c.id === o.contactId)!, index: CONTACTS.findIndex((c) => c.id === o.contactId) }));
  }
  if (spec.toast) {
    const t = add(f, mk('Toast', { Type: spec.toast.type })); t.name = 'Toast'; setProp(t, 'message', spec.toast.message);
    const d = find(t, 'description') as TextNode; if (d) { if (spec.toast.description) d.characters = spec.toast.description; else d.visible = false; }
    t.x = sb + 32; t.y = H - 64 - t.height;
  }
  if (spec.dialog) {
    const scrim = add(f, rect('Scrim', W, H, 'overlay')); scrim.x = 0; scrim.y = 0;
    const d = add(f, mk('Dialog', { Type: 'discard' })); d.name = 'Dialog'; setProp(d, 'description', `Your changes to ${cid(spec.panel!.contactId).name} haven't been saved. If you discard them, the record stays as it was.`);
    d.x = Math.round((W - d.width) / 2); d.y = Math.round((H - d.height) / 2);
  }
  C.stats.screens++;
  return f;
}

// ---------- the eleven product screens ----------
const DRAFT_NOTES = 'Needs a security review before the pilot. Security questionnaire sent; follow up Friday.';
export const SCREENS: { key: string; x: number; y: number; spec: Spec }[] = [
  { key: 'A', x: 0, y: 0, spec: { name: 'A · Table view', view: 'table' } },
  { key: 'B', x: 1520, y: 0, spec: { name: 'B · Board view (Qualified empty)', view: 'board' } },
  { key: 'C', x: 3040, y: 0, spec: { name: 'C · Editing a draft from the board', view: 'board', selectedId: 'c5', panel: { contactId: 'c5', state: 'dirty', contact: cid('c5'), draftStage: 'Qualified', notes: DRAFT_NOTES, changes: 2 } } },
  { key: 'C2', x: 4560, y: 0, spec: { name: 'C2 · Editing the same draft from the table', view: 'table', selectedId: 'c5', panel: { contactId: 'c5', state: 'dirty', contact: cid('c5'), draftStage: 'Qualified', notes: DRAFT_NOTES, changes: 2 } } },
  { key: 'D', x: 0, y: 1020, spec: { name: 'D · Saved: card moved, Undo toast', view: 'board', moved: { c5: 'Qualified' }, flashId: 'c5', panel: { contactId: 'c5', state: 'saved', contact: cid('c5'), notes: DRAFT_NOTES }, toast: { type: 'saved-with-undo', message: 'Daniel Okafor moved to Qualified', description: 'Notes were updated too.' } } },
  { key: 'E', x: 1520, y: 1020, spec: { name: 'E · From the table: missing data + discard guard', view: 'table', selectedId: 'c2', panel: { contactId: 'c2', state: 'dirty', contact: cid('c2'), draftStage: 'Prospect', changes: 1 }, dialog: 'discard' } },
  { key: 'F', x: 3040, y: 1020, spec: { name: 'F · Narrow desktop, 1024px', w: 1024, h: 768, rail: true, view: 'board', selectedId: 'c5', panel: { contactId: 'c5', state: 'dirty', contact: cid('c5'), draftStage: 'Qualified', notes: DRAFT_NOTES, changes: 2 } } },
  { key: 'G', x: 0, y: 2040, spec: { name: 'G · Same save, seen in the table (views in sync)', view: 'table', moved: { c5: 'Qualified' }, flashId: 'c5', panel: { contactId: 'c5', state: 'saved', contact: cid('c5'), notes: DRAFT_NOTES }, toast: { type: 'saved-with-undo', message: 'Daniel Okafor moved to Qualified', description: 'Notes were updated too.' } } },
  { key: 'H', x: 1520, y: 2040, spec: { name: 'H · Keyboard focus returns to the moved card', view: 'board', moved: { c5: 'Qualified' }, focusId: 'c5', toast: { type: 'saved-with-undo', message: 'Daniel Okafor moved to Qualified', description: 'Notes were updated too.' } } },
  { key: 'I', x: 3040, y: 2040, spec: { name: 'I · Drag a card to an empty column', view: 'board', drag: { id: 'c5', over: 'Qualified' } } },
  { key: 'J', x: 4560, y: 2040, spec: { name: 'J · Owner filter: empty because filtered vs truly empty', view: 'board', owner: 'Sara Kim' } },
  { key: 'K', x: 6080, y: 2040, spec: { name: 'K · Search with no results', view: 'table', search: 'zzz' } },
];
export { REG };
