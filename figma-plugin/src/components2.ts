// Components 17-29: board cards and columns, the details panel and its parts, toast, dialog and sidebar.
import { C, Hosts, add, box, combine, ellipse, effectStyle, fillH, fillW, fillOf, find, findInst, focusRing, ico, iconComp, linkBool, linkSwap, linkText, rect, ringOf, setProp, setProps, spacer, strokeOf, txt, grow, space } from './lib';
import { HUE, REG, STAGES, avatar, button, hueFor, iconButton, initials, mk, swap } from './components';

/** One line, truncated with an ellipsis; call after the node is inside an auto-layout parent. */
export function oneLine(t: TextNode) { t.textAutoResize = 'HEIGHT'; t.textTruncation = 'ENDING'; t.maxLines = 1; t.layoutSizingHorizontal = 'FILL'; return t; }
export function wrapText(t: TextNode, align?: 'LEFT' | 'CENTER' | 'RIGHT') { t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; if (align) t.textAlignHorizontal = align; return t; }

// ---- 17. Contact card ----
export async function buildContactCard(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['default', 'hover', 'selected', 'dragging', 'flash']) {
    const c = box(`State=${st}`, { comp: true, dir: 'VERTICAL', gap: 12, pad: 12, align: 'MIN', fill: 'surface', stroke: st === 'selected' ? 'action' : st === 'hover' || st === 'dragging' ? 'border-strong' : 'border', sw: st === 'selected' ? 2 : 1, radius: 'md', w: 256 });
    const id = add(c, box('Identity', { dir: 'VERTICAL', gap: 2, align: 'MIN' })); fillW(id);
    oneLine(add(id, await txt('Daniel Okafor', 'card-name', 'text', 'name')));
    oneLine(add(id, await txt('CTO · Northwind Labs', 'body-sm', 'text-muted', 'subtitle')));
    const miss = add(id, await txt('No role or company', 'body-sm', 'text-subtle', 'no role or company')); miss.visible = false;
    const labels = add(c, box('Labels', { gap: 4 }));
    add(labels, mk('Label tag')).name = 'Label 1'; add(labels, mk('Label tag')).name = 'Label 2'; add(labels, await txt('+1', 'caption-strong', 'text-muted', 'more'));
    const foot = add(c, box('Footer', { gap: 8 })); fillW(foot);
    const owner = add(foot, box('Owner', { gap: 6 }));
    add(owner, mk('Avatar', { Size: '24', Hue: 'blue' })).name = 'Avatar'; add(owner, await txt('Sara', 'caption', 'text-muted', 'owner name'));
    grow(add(foot, spacer()));
    add(foot, ico('document-text', 16, 'text-muted', 'notes icon'));
    if (st === 'hover') await effectStyle(c, 'Shadow/elevation-1/Light');
    if (st === 'dragging') await effectStyle(c, 'Shadow/elevation-4/Light');
    if (st === 'flash') ringOf(c, 'amber/300', 4);
    comps.push(c);
  }
  const set = combine(host, comps, 'Contact card', 5, 'Board card: only what identifies a person (name, role · company, up to two labels, owner, a notes hint). Stage is the column, so it is not repeated. dragging is the floating copy (the 2° tilt is applied on the instance).');
  linkText(set, 'name', 'Daniel Okafor', 'name'); linkText(set, 'subtitle', 'CTO · Northwind Labs', 'subtitle');
  linkBool(set, 'show labels', true, 'Labels'); linkBool(set, 'show owner', true, 'Owner'); linkBool(set, 'show notes icon', true, 'notes icon');
  linkBool(set, 'missing subtitle', false, 'no role or company');
  REG['Contact card'] = set; return [set];
}

// ---- 18. Column header ----
export async function buildColumnHeader(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const s of STAGES) {
    const c = box(`Stage=${s}`, { comp: true, gap: 8, pad: [4, 4, 0, 4], w: 256 });
    add(c, mk('Stage pill', { Stage: s }));
    const n = add(c, box('Count', { justify: 'CENTER', pad: [0, 8], fill: 'surface', stroke: 'border', radius: 'full', h: 24 })); n.minWidth = 24;
    add(n, await txt('4', 'caption-strong', 'text-muted', 'count'));
    comps.push(c);
  }
  const set = combine(host, comps, 'Column header', 4, 'Stage pill plus a live count. Counts update as cards move.');
  linkText(set, 'count', '4', 'count'); REG['Column header'] = set; return [set];
}

// ---- 19. Empty column ----
export async function buildEmptyColumn(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const type of ['empty', 'filtered', 'drop-target']) for (const s of STAGES) {
    const h = HUE[s];
    const c = box(`Type=${type}, Stage=${s}`, {
      comp: true, dir: 'VERTICAL', gap: 8, pad: 24, justify: 'CENTER', align: 'CENTER', radius: 'md', w: 256, h: type === 'filtered' ? 200 : 240,
      fill: type === 'drop-target' ? `${h}/100` : null, stroke: type === 'empty' ? `${h}/300` : type === 'filtered' ? 'border-strong' : `${h}/600`, sw: type === 'drop-target' ? 2 : type === 'empty' ? 1.5 : 1, dash: [6, 4],
    });
    const circle = add(c, box('Icon', { justify: 'CENTER', radius: 'full', w: 40, h: 40, fill: type === 'empty' ? `${h}/100` : type === 'filtered' ? 'surface' : `${h}/600` }));
    if (type === 'filtered') strokeOf(circle, 'border', 1, 'INSIDE');
    add(circle, ico(type === 'empty' ? 'trending-up' : type === 'filtered' ? 'funnel' : 'arrow-down', 20, type === 'empty' ? `${h}/800` : type === 'filtered' ? 'text-muted' : 'text-inverse', 'glyph'));
    const title = type === 'empty' ? `No ${s.toLowerCase()} contacts yet` : type === 'filtered' ? 'None match your filters' : `Drop to move to ${s}`;
    const msg = type === 'empty' ? `Drag a card here, or open a contact and set its stage to ${s}.` : type === 'filtered' ? `2 ${s} contacts are hidden by your filters.` : 'Daniel Okafor will leave their current stage. You can undo right after.';
    wrapText(add(c, await txt(title, 'body-sm-strong', type === 'drop-target' ? `${h}/800` : 'text', 'title')), 'CENTER');
    wrapText(add(c, await txt(msg, 'body-sm', type === 'drop-target' ? `${h}/800` : 'text-muted', 'message')), 'CENTER');
    if (type === 'filtered') { const b = add(c, button('Clear filters', 'secondary', 'sm')); b.name = 'Clear filters'; }
    comps.push(c);
  }
  const set = combine(host, comps, 'Empty column', 4, 'A stage column with no cards: empty for everyone, empty because of the filters (offers Clear filters), or the live drop target while dragging. The count of hidden contacts is part of the message text.');
  linkText(set, 'message', 'Message', 'message'); REG['Empty column'] = set; return [set];
}

// ---- 20. Stage option ----
export async function buildStageOption(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const s of STAGES) for (const st of ['unselected', 'selected', 'saved', 'hover', 'focus']) {
    const h = HUE[s]; const sel = st === 'selected';
    const c = box(`Stage=${s}, State=${st}`, {
      comp: true, gap: 6, pad: [0, sel ? 7 : 8], radius: 'full', h: 32,
      fill: sel ? `${h}/100` : st === 'saved' ? `${h}/50` : 'surface',
      stroke: sel || st === 'saved' ? `${h}/600` : st === 'hover' ? 'border-strong' : 'border', sw: sel ? 2 : 1, dash: st === 'saved' ? [4, 3] : undefined,
    });
    const fg = sel || st === 'saved' ? `${h}/800` : st === 'hover' ? 'text' : 'text-muted';
    add(c, sel ? ico('checkmark-circle', 16, fg, 'check') : ellipse('dot', 8, `${h}/600`));
    add(c, await txt(s, 'caption-strong', fg, 'label'));
    if (sel) ringOf(c, `${h}/50`, 3);
    if (st === 'focus') focusRing(c);
    comps.push(c);
  }
  const set = combine(host, comps, 'Stage option', 5, 'One stop on the stage picker (a real radio underneath). selected = ticked + 2px border; saved = dashed outline while a different stage is chosen.');
  REG['Stage option'] = set; return [set];
}

// ---- 21. Stage picker ----
export async function buildStagePicker(host: Hosts) {
  const c = box('Stage picker', { comp: true, dir: 'VERTICAL', gap: 8, align: 'MIN', w: 392 });
  add(c, await txt('Stage', 'body-sm-strong', 'text', 'legend'));
  const row = add(c, box('Options', { gap: 2, wrap: true })); fillW(row); row.counterAxisSpacing = 8;
  STAGES.forEach((s, i) => {
    if (i > 0) add(row, ico('chevron-forward', 16, 'text-subtle', 'chevron'));
    const o = add(row, mk('Stage option', { Stage: s, State: s === 'Qualified' ? 'selected' : s === 'Prospect' ? 'saved' : 'unselected' })); o.name = s;
  });
  const hint = add(c, box('Hint', { gap: 6 }));
  add(hint, ico('information-circle', 16, 'text-muted', 'icon')); add(hint, await txt('Saved as Prospect. Saving moves this contact to Qualified.', 'caption', 'text-muted', 'hint text'));
  host.appendChild(c); c.description = 'The pipeline as four stage pills joined by chevrons. Arrow keys move the choice. The hint shows only while the choice differs from the saved stage.';
  linkBool(c, 'show hint', true, 'Hint'); C.stats.components++; REG['Stage picker'] = c; return [c];
}
export function setPicker(p: InstanceNode, selected: string, saved: string | null, hint: string | null) {
  for (const s of STAGES) {
    const o = find(p, s) as InstanceNode; if (!o) continue;
    setProp(o, 'State', s === selected ? 'selected' : s === saved && s !== selected ? 'saved' : 'unselected');
  }
  setProp(p, 'show hint', !!hint);
  const t = find(p, 'hint text') as TextNode; if (t && hint) t.characters = hint;
}

// ---- 22. Notes field ----
export async function buildNotesField(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['empty', 'filled', 'focus']) {
    const c = box(`State=${st}`, { comp: true, dir: 'VERTICAL', gap: 8, align: 'MIN', w: 392 });
    add(c, await txt('Notes', 'body-sm-strong', 'text', 'label'));
    const ta = add(c, box('Textarea', { dir: 'VERTICAL', align: 'MIN', pad: [8, 12], fill: 'surface', stroke: 'border-strong', radius: 'sm', h: 136 })); fillW(ta);
    wrapText(add(ta, await txt(st === 'empty' ? 'Add a note about this contact' : 'Needs a security review before the pilot.', 'body', st === 'empty' ? 'text-subtle' : 'text', 'value')));
    if (st === 'focus') focusRing(ta);
    const cnt = add(c, await txt(st === 'empty' ? '0 / 1000' : '41 / 1000', 'caption', 'text-muted', 'counter')); cnt.textAlignHorizontal = 'RIGHT'; cnt.textAutoResize = 'HEIGHT'; cnt.layoutSizingHorizontal = 'FILL';
    comps.push(c);
  }
  const set = combine(host, comps, 'Notes field', 3, 'Multi-line notes with a live character counter (max 1000). Edits stay in a draft until Save changes.');
  linkText(set, 'value', 'Add a note about this contact', 'value'); linkText(set, 'counter', '0 / 1000', 'counter');
  REG['Notes field'] = set; return [set];
}

// ---- 23. Detail row ----
export async function buildDetailRow(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['filled', 'missing']) {
    const c = box(`State=${st}`, { comp: true, gap: 16, align: 'MIN', w: 392 });
    await txt('Company', 'body-sm', 'text-muted', 'label', { w: 96 }).then((t) => add(c, t));
    if (st === 'filled') grow(add(c, await txt('Northwind Labs', 'body-sm', 'text', 'value')));
    else { const v = add(c, box('Missing', { gap: 6 })); add(v, ico('mail-unread', 16, 'text-subtle', 'icon')); add(v, await txt('No email yet', 'body-sm', 'text-subtle', 'value')); }
    comps.push(c);
  }
  const set = combine(host, comps, 'Detail row', 2, 'A label + value row in the details panel. Missing values say what is missing ("No email yet") instead of staying blank.');
  linkText(set, 'label', 'Company', 'label'); linkText(set, 'value', 'Northwind Labs', 'value'); linkSwap(set, 'icon', 'mail-unread', 'icon');
  REG['Detail row'] = set; return [set];
}

// ---- 24. Panel footer ----
export async function buildPanelFooter(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['clean', 'dirty', 'saved']) {
    const dirty = st === 'dirty';
    const c = box(`State=${st}`, { comp: true, gap: 8, pad: [16, 24], fill: dirty ? 'warning-bg' : null, stroke: dirty ? 'warning-border' : 'border', strokeSides: 't', w: 440, h: dirty ? undefined : 72 });
    if (dirty) {
      const col = add(c, box('Summary', { dir: 'VERTICAL', align: 'MIN' })); grow(col);
      const l1 = add(col, box('Line', { gap: 4 })); add(l1, await txt('2', 'body-sm-strong', 'text', 'change count')); add(l1, await txt('unsaved changes', 'body-sm-strong', 'text', 'unsaved label'));
      add(col, await txt('⌘↵ save · Esc cancel', 'caption', 'text-muted', 'shortcuts'));
      add(c, button('Cancel', 'secondary', 'md')).name = 'Cancel'; add(c, button('Save changes', 'primary', 'md', 'checkmark')).name = 'Save changes';
    } else {
      const saved = st === 'saved';
      add(c, ico(saved ? 'checkmark-circle' : 'checkmark-circle-outline', 20, saved ? 'success' : 'text-muted', 'status icon'));
      grow(add(c, await txt(saved ? 'All changes saved' : 'No changes yet', saved ? 'body-sm-strong' : 'body-sm', saved ? 'success' : 'text-muted', 'status')));
      add(c, await txt('Esc close', 'caption', 'text-muted', 'hint'));
    }
    comps.push(c);
  }
  const set = combine(host, comps, 'Panel footer', 3, 'Save bar: clean ("No changes yet"), dirty (warning colours, Cancel + Save changes) and saved ("All changes saved").');
  linkText(set, 'change count', '2', 'change count'); REG['Panel footer'] = set; return [set];
}

// ---- 25. Details panel ----
export async function buildDetailsPanel(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['clean', 'dirty', 'saved']) {
    const dirty = st === 'dirty'; const stage = st === 'saved' ? 'Qualified' : 'Prospect';
    const c = box(`State=${st}`, { comp: true, dir: 'VERTICAL', align: 'MIN', fill: 'surface-raised', stroke: 'border', strokeSides: 'l', w: 440, h: 900, clip: true });
    await effectStyle(c, 'Shadow/elevation-4/Light');
    const top = add(c, box('Top bar', { gap: 4, pad: [8, 12], stroke: 'border', strokeSides: 'b' })); fillW(top);
    add(top, iconButton('chevron-up')).name = 'Previous'; add(top, iconButton('chevron-down')).name = 'Next';
    const idx = add(top, box('Index', { pad: [0, 0, 0, 4] })); add(idx, await txt('5 of 10', 'caption', 'text-muted', 'index'));
    grow(add(top, spacer())); add(top, iconButton('close')).name = 'Close';
    const body = add(c, box('Body', { dir: 'VERTICAL', gap: 24, pad: 24, align: 'MIN', clip: true })); fillW(body); grow(body);
    // identity
    const idr = add(body, box('Identity', { gap: 16 })); fillW(idr);
    add(idr, avatar('Daniel Okafor', 48)).name = 'Avatar';
    const nb = add(idr, box('Name block', { dir: 'VERTICAL', gap: 4, align: 'MIN' })); grow(nb);
    wrapText(add(nb, await txt('Daniel Okafor', 'title', 'text', 'name')));
    wrapText(add(nb, await txt('CTO · Northwind Labs', 'body-sm', 'text-muted', 'position')));
    if (dirty) {
      const chip = add(idr, box('Unsaved', { gap: 6, pad: [0, 10, 0, 8], fill: 'warning-bg', radius: 'full', h: 24 }));
      add(chip, ellipse('dot', 8, 'warning')); add(chip, await txt('Unsaved', 'caption-strong', 'warning', 'unsaved text'));
    } else add(idr, mk('Stage pill', { Stage: stage })).name = 'Stage pill';
    // stage + notes
    const sp = add(body, mk('Stage picker')); sp.name = 'Stage picker'; fillW(sp);
    if (dirty) setPicker(sp, 'Qualified', 'Prospect', 'Saved as Prospect. Saving moves this contact to Qualified.'); else setPicker(sp, stage, null, null);
    const nf = add(body, mk('Notes field', { State: 'filled' })); nf.name = 'Notes field'; fillW(nf);
    add(body, rect('Divider', 100, 1, 'border')).layoutSizingHorizontal = 'FILL';
    // details
    const det = add(body, box('Details', { dir: 'VERTICAL', gap: 12, align: 'MIN' })); fillW(det);
    add(det, await txt('Details', 'overline', 'text-muted', 'details heading'));
    const em = add(det, box('Email row', { gap: 16, align: 'CENTER' })); fillW(em);
    await txt('Email', 'body-sm', 'text-muted', 'label', { w: 96 }).then((t) => add(em, t));
    const ev = add(em, box('Email value', { gap: 4 })); grow(ev);
    add(ev, await txt('daniel.okafor@northwind.io', 'body-sm', 'text', 'email')); add(ev, iconButton('copy-outline')).name = 'Copy email';
    for (const [l, v] of [['Company', 'Northwind Labs'], ['Role', 'CTO']]) {
      const r = add(det, mk('Detail row', { State: 'filled' })); r.name = l + ' row'; fillW(r); setProps(r, { label: l, value: v });
    }
    const ow = add(det, box('Owner row', { gap: 16 })); fillW(ow);
    await txt('Owner', 'body-sm', 'text-muted', 'label', { w: 96 }).then((t) => add(ow, t));
    const ov = add(ow, box('Owner value', { gap: 8 })); add(ov, avatar('Sara Kim', 24)).name = 'Avatar'; add(ov, await txt('Sara Kim', 'body-sm', 'text', 'owner name'));
    const lb = add(det, box('Labels row', { gap: 16, align: 'MIN' })); fillW(lb);
    await txt('Labels', 'body-sm', 'text-muted', 'label', { w: 96 }).then((t) => add(lb, t));
    const lv = add(lb, box('Labels value', { gap: 4 }));
    for (const n of [1, 2, 3]) { const t = add(lv, mk('Label tag')); t.name = 'Label ' + n; if (n > 1) t.visible = false; }
    const nol = add(lv, await txt('No labels', 'body-sm', 'text-subtle', 'no labels')); nol.visible = false;
    // footer
    const f = add(c, mk('Panel footer', { State: st })); f.name = 'Panel footer'; fillW(f);
    comps.push(c);
  }
  const set = combine(host, comps, 'Details panel', 3, 'The shared side panel, opened from either view. Floats over the page at full height (440px). clean / dirty (Unsaved chip, stage hint, warning footer) / saved.');
  linkText(set, 'name', 'Daniel Okafor', 'name'); linkText(set, 'position', 'CTO · Northwind Labs', 'position');
  REG['Details panel'] = set; return [set];
}

// ---- 26. Toast ----
export async function buildToast(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const type of ['saved-with-undo', 'info']) {
    const undo = type === 'saved-with-undo';
    const c = box(`Type=${type}`, { comp: true, gap: 12, pad: 16, align: 'MIN', fill: 'surface-inverse', radius: 'md', w: 420 });
    await effectStyle(c, 'Shadow/elevation-3/Light');
    const ic = add(c, ico('checkmark-circle', 20, 'green/300', 'status icon'));
    const col = add(c, box('Text', { dir: 'VERTICAL', align: 'MIN' })); grow(col);
    wrapText(add(col, await txt(undo ? 'Daniel Okafor moved to Qualified' : 'Undone. Daniel Okafor is back in Prospect.', 'body-sm-strong', 'text-inverse', 'message')));
    if (undo) wrapText(add(col, await txt('Notes were updated too.', 'body-sm', 'text-inverse', 'description', { opacity: 0.8 })));
    if (undo) {
      const u = add(c, box('Undo', { gap: 6, pad: [0, 8], radius: 'sm', h: 32, justify: 'CENTER' }));
      add(u, ico('arrow-undo', 16, 'text-inverse', 'icon')); add(u, await txt('Undo', 'body-sm-strong', 'text-inverse', 'undo label'));
    }
    const x = add(c, box('Dismiss', { justify: 'CENTER', radius: 'sm', w: 32, h: 32 })); add(x, ico('close', 16, 'text-inverse', 'icon')).opacity = 0.8;
    comps.push(c);
  }
  const set = combine(host, comps, 'Toast', 2, 'One toast at a time, announced politely (focus never jumps to it). A toast with Undo stays until replaced or dismissed; a plain confirmation leaves after 4 seconds. Slide-in is 200ms (not drawn).');
  linkText(set, 'message', 'Daniel Okafor moved to Qualified', 'message');
  const key = set.addComponentProperty('show undo', 'BOOLEAN', true);
  for (const v of set.children as ComponentNode[]) for (const n of v.findAll((x) => x.name === 'Undo' && x.type === 'FRAME')) n.componentPropertyReferences = { visible: key };
  REG['Toast'] = set; return [set];
}

// ---- 27. Dialog ----
export async function buildDialog(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const type of ['discard', 'shortcuts']) {
    const d = type === 'discard';
    const c = box(`Type=${type}`, { comp: true, dir: 'VERTICAL', gap: 16, pad: 32, align: 'MIN', fill: 'surface-raised', radius: 'md', w: 440 });
    await effectStyle(c, 'Shadow/elevation-4/Light');
    const head = add(c, box('Header', { gap: 16, align: 'MIN' })); fillW(head);
    const ic = add(head, box('Icon', { justify: 'CENTER', radius: 'full', w: 40, h: 40, fill: d ? 'warning-bg' : 'surface-sunken' }));
    add(ic, ico(d ? 'warning-outline' : 'keypad-outline', 20, d ? 'warning' : 'text-muted', 'glyph'));
    const tb = add(head, box('Text', { dir: 'VERTICAL', gap: 8, align: 'MIN' })); grow(tb);
    wrapText(add(tb, await txt(d ? 'Discard your changes?' : 'Keyboard shortcuts', 'title', 'text', 'title')));
    if (d) wrapText(add(tb, await txt("Your changes to Daniel Okafor haven't been saved. If you discard them, the record stays as it was.", 'body', 'text-muted', 'description')));
    if (!d) {
      const list = add(c, box('Shortcuts', { dir: 'VERTICAL', gap: 8, align: 'MIN' })); fillW(list);
      const rows: [string, string][] = [['/', 'Search'], ['[', 'Open or close the sidebar'], ['↑ ↓', 'Move between rows or cards'], ['← →', 'Move between board columns'], ['Enter', 'Open the focused contact'], ['Space', 'Pick up a card to move it (board)'], ['J / K', 'Next / previous contact in the panel'], ['⌘ Enter', 'Save changes'], ['Esc', 'Cancel or close']];
      for (const [k, w] of rows) {
        const r = add(list, box('Row', { gap: 24, align: 'CENTER' }));
        const kc = add(r, box('Key', { w: 88, align: 'CENTER' })); const kb = add(kc, mk('Kbd')); setProp(kb, 'key', k);
        add(r, await txt(w, 'body-sm', 'text-muted', 'what'));
      }
    }
    const foot = add(c, box('Actions', { gap: 8, justify: 'MAX', pad: [8, 0, 0, 0] })); fillW(foot);
    if (d) { add(foot, button('Keep editing', 'secondary', 'md')).name = 'Keep editing'; add(foot, button('Discard changes', 'danger', 'md')).name = 'Discard changes'; }
    else add(foot, button('Close', 'secondary', 'md')).name = 'Close';
    comps.push(c);
  }
  const set = combine(host, comps, 'Dialog', 2, 'Modal: focus moves in, Tab is trapped, Esc dismisses. The first button is the safe one. discard asks before throwing away a draft; shortcuts lists the keys.');
  linkText(set, 'title', 'Discard your changes?', 'title'); linkText(set, 'description', "Your changes to Daniel Okafor haven't been saved. If you discard them, the record stays as it was.", 'description');
  REG['Dialog'] = set; return [set];
}

// ---- 28. Sidebar item ----
export async function buildSidebarItem(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const mode of ['expanded', 'rail']) for (const st of ['default', 'hover', 'current']) {
    const ex = mode === 'expanded'; const cur = st === 'current';
    const c = box(`State=${st}, Mode=${mode}`, { comp: true, gap: 8, pad: [0, 8], justify: ex ? 'MIN' : 'CENTER', fill: cur ? 'surface-pressed' : st === 'hover' ? 'surface-hover' : null, radius: 'sm', w: ex ? 208 : 64, h: ex ? 32 : 44 });
    add(c, ico(cur ? 'people' : 'home-outline', 16, 'text', 'icon'));
    const l = add(c, await txt('Contacts', cur ? 'body-sm-strong' : 'body-sm', 'text', 'label')); l.visible = ex; if (ex) grow(l);
    const n = add(c, await txt('10', 'body-sm', 'text-muted', 'count')); n.visible = ex;
    const b = add(c, mk('Badge', { Type: 'danger' })); b.name = 'Badge'; b.visible = false;
    if (!ex) { const dot = add(c, ellipse('Badge dot', 8, 'danger-solid')); dot.layoutPositioning = 'ABSOLUTE'; dot.x = 46; dot.y = 8; dot.visible = false; }
    comps.push(c);
  }
  const set = combine(host, comps, 'Sidebar item', 3, 'A nav link. expanded shows label, count and badge; rail shows just the icon (44px target) with a red dot for new items. current = pressed background, semibold label, filled icon.');
  linkText(set, 'label', 'Contacts', 'label'); linkText(set, 'count', '10', 'count'); linkSwap(set, 'icon', 'home-outline', 'icon');
  const key = set.addComponentProperty('show badge', 'BOOLEAN', false);
  for (const v of set.children as ComponentNode[]) for (const n of v.findAll((x) => (x.name === 'Badge' && x.type === 'INSTANCE') || x.name === 'Badge dot')) n.componentPropertyReferences = { visible: key };
  REG['Sidebar item'] = set; return [set];
}

// ---- 29. Sidebar ----
const NAV: { title?: string; items: { label: string; icon: string; count?: string; badge?: [string, string]; current?: boolean }[] }[] = [
  { items: [{ label: 'Home', icon: 'home' }, { label: 'Conversations', icon: 'chatbubbles', badge: ['danger', '3'] }] },
  { title: 'Intelligence', items: [{ label: 'Contacts', icon: 'people', count: '10', current: true }, { label: 'Accounts', icon: 'business', count: '24' }, { label: 'Signals', icon: 'pulse', badge: ['info', '5 new'] }] },
  { title: 'Outreach', items: [{ label: 'Campaigns', icon: 'megaphone', count: '4' }, { label: 'Assets', icon: 'images' }, { label: 'Knowledge', icon: 'library' }] },
];
const VIEWS = [['My leads', 'blue'], ['Ready to qualify', 'amber'], ['Enterprise customers', 'green']];
export async function buildSidebar(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const mode of ['expanded', 'rail']) {
    const ex = mode === 'expanded';
    const c = box(`Mode=${mode}`, { comp: true, dir: 'VERTICAL', gap: 16, pad: ex ? [16, 12] : [16, 0], align: ex ? 'MIN' : 'CENTER', fill: 'bg-subtle', stroke: 'border', strokeSides: 'r', w: ex ? 232 : 64, h: 900, clip: true });
    const head = add(c, box('Header', { dir: ex ? 'HORIZONTAL' : 'VERTICAL', gap: ex ? 8 : 16, pad: ex ? [0, 8] : 0, h: ex ? 40 : undefined })); if (ex) fillW(head);
    const logo = add(head, box('Logo', { justify: 'CENTER', fill: 'action', radius: 'sm', w: 28, h: 28 })); add(logo, await txt('S', 'caption-strong', 'on-action', 'logo letter'));
    if (ex) grow(add(head, await txt('Sundial Studio', 'body-sm-strong', 'text', 'workspace')));
    const tg = add(head, box('Toggle', { justify: 'CENTER', radius: 'sm', w: 32, h: 32 })); add(tg, ico('sidebar', 16, 'text-muted', 'glyph'));
    if (ex) {
      const s = add(c, box('Search', { gap: 8, pad: [0, 8], fill: 'surface', stroke: 'border', radius: 'sm', h: 32 })); fillW(s);
      add(s, ico('search-outline', 16, 'text-muted', 'icon')); grow(add(s, await txt('Search', 'body-sm', 'text-muted', 'label'))); add(s, await txt('/', 'caption', 'text-subtle', 'hint'));
    }
    const nav = add(c, box('Pages', { dir: 'VERTICAL', gap: 16, align: ex ? 'MIN' : 'CENTER' })); if (ex) fillW(nav);
    for (const sec of NAV) {
      const g = add(nav, box(sec.title || 'Main', { dir: 'VERTICAL', gap: 2, align: ex ? 'MIN' : 'CENTER' })); if (ex) fillW(g);
      if (sec.title && ex) add(g, box('Title', { pad: [0, 8, 4, 8] })).appendChild(await txt(sec.title, 'overline', 'text-muted', 'section title'));
      for (const it of sec.items) {
        const i = add(g, mk('Sidebar item', { State: it.current ? 'current' : 'default', Mode: mode })); i.name = it.label; if (ex) fillW(i);
        setProps(i, { label: it.label, count: it.count || '' }); swap(i, 'icon', it.icon);
        if (it.badge) { setProp(i, 'show badge', true); const b = findInst(i, 'Badge'); if (b) { setProp(b, 'Type', it.badge[0]); setProp(b, 'value', it.badge[1]); } const n = find(i, 'count'); if (n) n.visible = false; }
        else if (!it.count) { const n = find(i, 'count'); if (n) n.visible = false; }
      }
    }
    if (ex) {
      const sv = add(nav, box('Saved views', { dir: 'VERTICAL', gap: 2, align: 'MIN' })); fillW(sv);
      add(add(sv, box('Title', { pad: [0, 8, 4, 8] })), await txt('Saved views', 'overline', 'text-muted', 'section title'));
      for (const [l, h] of VIEWS) {
        const r = add(sv, box(l, { gap: 8, pad: [0, 8], h: 32 })); fillW(r);
        const dotBox = add(r, box('Dot', { justify: 'CENTER', w: 16, h: 16 })); add(dotBox, rect('dot', 8, 8, `${h}/600`)).cornerRadius = 2;
        add(r, await txt(l, 'body-sm', 'text', 'label'));
      }
    }
    grow(add(c, spacer()));
    const foot = add(c, box('Footer', { dir: 'VERTICAL', gap: 4, pad: [12, 0, 0, 0], align: ex ? 'MIN' : 'CENTER', stroke: 'border', strokeSides: 't' })); if (ex) fillW(foot);
    const th = add(foot, box('Theme toggle', { gap: 8, pad: [0, 8], justify: ex ? 'MIN' : 'CENTER', radius: 'sm', h: ex ? 32 : 44, w: ex ? undefined : 64 })); if (ex) fillW(th);
    add(th, ico('moon-outline', 16, 'text', 'icon')); if (ex) add(th, await txt('Dark theme', 'body-sm', 'text', 'label'));
    const u = add(foot, box('User', { gap: 8, pad: ex ? [4, 8] : [4, 4] })); add(u, avatar(DATA_ME, 32)).name = 'Avatar';
    if (ex) { const t = add(u, box('Name', { dir: 'VERTICAL', align: 'MIN' })); add(t, await txt(DATA_ME, 'body-sm-strong', 'text', 'user name')); add(t, await txt('Sales lead', 'caption', 'text-muted', 'user role')); }
    comps.push(c);
  }
  const set = combine(host, comps, 'Sidebar', 2, 'Workspace sidebar. expanded = 232px with labels (pinned from 1280px); rail = 64px icon rail below that. Built from Sidebar item.');
  REG['Sidebar'] = set; return [set];
}
import { DATA } from './data';
const DATA_ME: string = DATA.me.name;
