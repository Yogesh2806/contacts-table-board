// Components 1-16: the small pieces (avatar, pills, buttons, inputs, table cells and rows).
// Each builder returns the nodes to show in its Components-page section. Names match design/COMPONENTS.md.
import { DATA } from './data';
import { C, Hosts, add, box, combine, ellipse, effectStyle, fillOf, find, findInst, focusRing, ico, iconComp, linkBool, linkSwap, linkText, paint, radius, recolor, rect, ringOf, setProp, setProps, size, spacer, strokeOf, tok, txt, variantOf, warn, grow } from './lib';

export const STAGES = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const;
export const HUE: Record<string, string> = { Lead: 'blue', Prospect: 'violet', Qualified: 'amber', Customer: 'green' };
export const REG: Record<string, ComponentSetNode | ComponentNode> = {};

/** Instance of a built component (a given variant, or the default one). */
export function mk(name: string, vp?: Record<string, string>): InstanceNode {
  const o = REG[name]; if (!o) throw new Error('component not built yet: ' + name);
  if (o.type === 'COMPONENT_SET') return (vp ? variantOf(o, vp) : (o.defaultVariant as ComponentNode)).createInstance();
  return (o as ComponentNode).createInstance();
}
export function swap(i: InstanceNode, prop: string, icon: string) { const c = iconComp(icon); if (c) setProp(i, prop, c.id); }
export function nameOf(n: SceneNode, nm: string) { n.name = nm; return n; }
/** The hue the app derives from a person's name (same hash as ui/Avatar.tsx). */
export function hueFor(name: string): string {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return ['blue', 'violet', 'amber', 'green'][h % 4];
}
export const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
export function avatar(name: string, sz: 24 | 32 | 48 = 24): InstanceNode {
  const a = mk('Avatar', { Size: String(sz), Hue: hueFor(name) }); setProp(a, 'initials', initials(name)); return a;
}

// ---- 2. Avatar ----
export async function buildAvatar(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const sz of [24, 32, 48]) for (const hue of ['blue', 'violet', 'amber', 'green', 'empty']) {
    const c = box(`Size=${sz}, Hue=${hue}`, { comp: true, justify: 'CENTER', radius: 'full', w: sz, h: sz });
    if (hue === 'empty') strokeOf(c, 'border-strong', 1, 'INSIDE', [4, 3]);
    else { fillOf(c, `${hue}/100`); add(c, await txt('AR', sz === 24 ? 'label' : sz === 32 ? 'caption-strong' : 'card-name', `${hue}/800`, 'initials')); }
    comps.push(c);
  }
  const set = combine(host, comps, 'Avatar', 5, 'Initials on a hue derived from the name (-100 fill, -800 text). "empty" is the dashed circle for a missing owner.');
  linkText(set, 'initials', 'AR', 'initials');
  REG['Avatar'] = set; return [set];
}
// ---- 3. Stage pill ----
export async function buildStagePill(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const s of STAGES) {
    const h = HUE[s];
    const c = box(`Stage=${s}`, { comp: true, gap: 6, pad: [0, 10, 0, 8], fill: `${h}/100`, radius: 'full', h: 24 });
    add(c, ellipse('dot', 8, `${h}/600`)); add(c, await txt(s, 'caption-strong', `${h}/800`, 'stage-label'));
    comps.push(c);
  }
  const set = combine(host, comps, 'Stage pill', 4, 'Read-only stage badge for table, board header and panel. Colour always comes with the stage name.');
  REG['Stage pill'] = set; return [set];
}
// ---- 4. Label tag ----
export async function buildLabelTag(host: Hosts) {
  const c = box('Label tag', { comp: true, pad: [0, 6], stroke: 'border-strong', radius: 'sm', h: 20 });
  add(c, await txt('Warm', 'label', 'text', 'label-text'));
  host.appendChild(c); c.description = 'A contact label (outlined, sharp corners).';
  const key = c.addComponentProperty('label', 'TEXT', 'Warm'); c.children[0].componentPropertyReferences = { characters: key };
  C.stats.components++; REG['Label tag'] = c; return [c];
}
// ---- 5. Badge ----
export async function buildBadge(host: Hosts) {
  const spec: Record<string, [string | null, string]> = { count: [null, 'text-muted'], danger: ['danger-solid', 'text-inverse'], info: ['blue/100', 'blue/800'] };
  const comps: ComponentNode[] = [];
  for (const [type, [bg, fg]] of Object.entries(spec)) {
    const c = box(`Type=${type}`, { comp: true, justify: 'CENTER', pad: type === 'count' ? 0 : [0, 6], radius: type === 'count' ? undefined : 'sm', h: 20, fill: bg });
    add(c, await txt('3', type === 'count' ? 'body-sm' : 'label', fg, 'badge-value')); comps.push(c);
  }
  const set = combine(host, comps, 'Badge', 3, 'Sidebar counts: plain count, danger (new conversations) and info ("5 new").');
  linkText(set, 'value', '3', 'badge-value'); REG['Badge'] = set; return [set];
}
// ---- 6. Kbd ----
export async function buildKbd(host: Hosts) {
  const c = box('Kbd', { comp: true, justify: 'CENTER', pad: [1, 6], stroke: 'border-strong', radius: 'sm' });
  add(c, await txt('/', 'mono', 'text', 'key')); host.appendChild(c); c.description = 'Keyboard key hint (.kbd in index.css).';
  const key = c.addComponentProperty('key', 'TEXT', '/'); c.children[0].componentPropertyReferences = { characters: key };
  C.stats.components++; REG['Kbd'] = c; return [c];
}

// ---- 7. Button ----
const BTN: Record<string, { fill: string | null; fg: string; stroke?: string; hover: string | null; press: string | null }> = {
  primary: { fill: 'action', fg: 'on-action', hover: 'action-hover', press: 'action-hover' },
  secondary: { fill: 'surface', fg: 'text', stroke: 'border-strong', hover: 'surface-hover', press: 'surface-pressed' },
  ghost: { fill: null, fg: 'text', hover: 'surface-hover', press: 'surface-pressed' },
  danger: { fill: 'danger-solid', fg: 'text-inverse', hover: 'danger-solid', press: 'danger-solid' },
};
export async function buildButton(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const type of Object.keys(BTN)) for (const sz of ['sm', 'md']) for (const st of ['default', 'hover', 'pressed', 'focus', 'disabled']) {
    const b = BTN[type];
    const f = st === 'hover' ? b.hover : st === 'pressed' ? b.press : b.fill;
    const c = box(`Type=${type}, Size=${sz}, State=${st}`, { comp: true, gap: 8, pad: [0, sz === 'sm' ? 12 : 16], justify: 'CENTER', fill: f, stroke: b.stroke, radius: 'sm', h: sz === 'sm' ? 32 : 40 });
    if (type === 'danger' && (st === 'hover' || st === 'pressed')) c.fills = c.fills.map((p: Paint) => Object.assign({}, p, { opacity: st === 'hover' ? 0.9 : 0.8 }));
    add(c, ico('checkmark', 16, b.fg, 'icon')).visible = false;
    add(c, await txt('Button', 'body-sm-strong', b.fg, 'label'));
    if (st === 'focus') focusRing(c);
    if (st === 'disabled') c.opacity = 0.4;
    comps.push(c);
  }
  const set = combine(host, comps, 'Button', 5, 'Verb-first, sentence case. Primary at most once per view. Pressed in the app also scales to 97% (not drawn).');
  linkText(set, 'label', 'Button', 'label'); linkBool(set, 'show icon', false, 'icon'); linkSwap(set, 'icon', 'checkmark', 'icon');
  REG['Button'] = set; return [set];
}
export function button(label: string, type = 'secondary', sz = 'md', icon?: string): InstanceNode {
  const b = mk('Button', { Type: type, Size: sz, State: 'default' }); setProp(b, 'label', label);
  if (icon) { setProp(b, 'show icon', true); swap(b, 'icon', icon); } return b;
}
// ---- 8. Icon button ----
export async function buildIconButton(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['default', 'hover', 'focus', 'disabled']) {
    const c = box(`State=${st}`, { comp: true, justify: 'CENTER', fill: st === 'hover' ? 'surface-hover' : null, radius: 'sm', w: 32, h: 32 });
    add(c, ico('close', 16, st === 'hover' ? 'text' : 'text-muted', 'icon'));
    if (st === 'focus') focusRing(c); if (st === 'disabled') c.opacity = 0.4; comps.push(c);
  }
  const set = combine(host, comps, 'Icon button', 4, '32px icon-only button. Always labelled in code (aria-label and tooltip).');
  linkSwap(set, 'icon', 'close', 'icon'); REG['Icon button'] = set; return [set];
}
export function iconButton(icon: string): InstanceNode { const b = mk('Icon button', { State: 'default' }); swap(b, 'icon', icon); return b; }

// ---- 9. Segmented item ----
export async function buildSegmentedItem(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const sel of ['yes', 'no']) for (const st of ['default', 'hover', 'focus']) {
    const on = sel === 'yes';
    const c = box(`Selected=${sel}, State=${st}`, { comp: true, gap: 6, pad: [0, 12], justify: 'CENTER', fill: on ? 'segment-active' : null, radius: 'sm', h: 28 });
    if (on) { strokeOf(c, 'segment-active-border', 1, 'INSIDE'); }
    const fg = on || st === 'hover' ? 'text' : 'text-muted';
    add(c, ico(on ? 'list' : 'list-outline', 16, fg, 'icon')); add(c, await txt('Table', 'body-sm-strong', fg, 'label'));
    if (on) await effectStyle(c, 'Shadow/elevation-1/Light');
    if (st === 'focus') focusRing(c);
    comps.push(c);
  }
  const set = combine(host, comps, 'Segmented item', 3, 'One option of the Table / Board switch. Selected: raised white segment with a filled icon.');
  linkText(set, 'label', 'Table', 'label'); linkSwap(set, 'icon', 'list-outline', 'icon'); REG['Segmented item'] = set; return [set];
}
// ---- 10. View switch ----
export async function buildViewSwitch(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const v of ['Table', 'Board']) {
    const c = box(`Value=${v}`, { comp: true, pad: 2, fill: 'surface-sunken', stroke: 'border', radius: 'sm' });
    for (const o of ['Table', 'Board']) {
      const i = mk('Segmented item', { Selected: o === v ? 'yes' : 'no', State: 'default' });
      setProp(i, 'label', o); swap(i, 'icon', o === 'Table' ? (o === v ? 'list' : 'list-outline') : (o === v ? 'albums' : 'albums-outline')); i.name = o; add(c, i);
    }
    comps.push(c);
  }
  const set = combine(host, comps, 'View switch', 2, 'Table / Board switch (native radios in code, so arrow keys switch views). Built from Segmented item.');
  REG['View switch'] = set; return [set];
}
// ---- 11. Search input ----
export async function buildSearchInput(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['empty', 'filled', 'focus']) {
    const filled = st === 'filled';
    const c = box(`State=${st}`, { comp: true, gap: 8, pad: [0, 8, 0, 10], fill: 'surface', stroke: 'border-strong', radius: 'sm', w: 280, h: 32 });
    add(c, ico('search', 16, 'text-muted', 'icon'));
    const v = add(c, await txt(filled ? 'Lena' : 'Search name, company or email', 'body-sm', filled ? 'text' : 'text-subtle', 'value')); grow(v);
    const k = add(c, mk('Kbd')); k.name = 'shortcut'; setProp(k, 'key', '/'); k.visible = !filled;
    const x = add(c, box('clear', { justify: 'CENTER', radius: 'sm', w: 24, h: 24 })); add(x, ico('close', 16, 'text-muted', 'icon')); x.visible = filled;
    if (st === 'focus') focusRing(c);
    comps.push(c);
  }
  const set = combine(host, comps, 'Search input', 3, 'Header search. "/" focuses it; Esc clears it. Shows a clear button once it has text.');
  linkText(set, 'value', 'Search name, company or email', 'value'); linkBool(set, 'show shortcut hint', true, 'shortcut');
  REG['Search input'] = set; return [set];
}
// ---- 12. Select ----
export async function buildSelect(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const st of ['default', 'focus']) {
    const c = box(`State=${st}`, { comp: true, gap: 8, pad: [0, 10], fill: 'surface', stroke: 'border-strong', radius: 'sm', w: 184, h: 32 });
    add(c, ico('person-circle', 16, 'text-muted', 'icon'));
    grow(add(c, await txt('Everyone', 'body-sm', 'text', 'value')));
    add(c, ico('chevron-down', 16, 'text-muted', 'chevron'));
    if (st === 'focus') focusRing(c); comps.push(c);
  }
  const set = combine(host, comps, 'Select', 2, 'Owner filter (native select styled to match).');
  linkText(set, 'value', 'Everyone', 'value'); REG['Select'] = set; return [set];
}
// ---- 13. Filter chip ----
export async function buildFilterChip(host: Hosts) {
  const c = box('Filter chip', { comp: true, gap: 4, pad: [0, 4, 0, 12], fill: 'surface', stroke: 'border', radius: 'full', h: 28 });
  add(c, await txt('Owner is Sara Kim', 'body-sm', 'text', 'label'));
  const x = add(c, box('remove', { justify: 'CENTER', radius: 'full', w: 20, h: 20 })); add(x, ico('close', 16, 'text-muted', 'icon'));
  host.appendChild(c); c.description = 'An active filter with a remove button.';
  const key = c.addComponentProperty('label', 'TEXT', 'Owner is Sara Kim'); c.children[0].componentPropertyReferences = { characters: key };
  C.stats.components++; REG['Filter chip'] = c; return [c];
}

// ---- 14. Table header cell ----
export const COLS: { label: string; icon: string; w: number }[] = [
  { label: 'Name', icon: 'person-outline', w: 240 }, { label: 'Stage', icon: 'flag-outline', w: 130 }, { label: 'Company', icon: 'business-outline', w: 190 },
  { label: 'Role', icon: 'briefcase-outline', w: 180 }, { label: 'Owner', icon: 'person-circle-outline', w: 140 }, { label: 'Labels', icon: 'pricetags-outline', w: 200 },
  { label: 'Email', icon: 'mail-outline', w: 240 }, { label: 'Notes', icon: 'document-text-outline', w: 320 },
];
export async function buildTableHeaderCell(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const type of ['regular', 'sticky']) {
    const c = box(`Type=${type}`, { comp: true, gap: 6, pad: [12, 12], fill: 'bg', stroke: 'border', strokeSides: type === 'sticky' ? 'br' : 'b', w: type === 'sticky' ? 240 : 190, h: 41, align: 'CENTER' });
    add(c, ico('person-outline', 16, 'text-muted', 'icon')); add(c, await txt('Company', 'caption-strong', 'text-muted', 'label'));
    comps.push(c);
  }
  const set = combine(host, comps, 'Table header cell', 2, 'Column header with an icon. The Name column is sticky (frozen) with a right divider.');
  linkText(set, 'label', 'Company', 'label'); linkSwap(set, 'icon', 'person-outline', 'icon'); REG['Table header cell'] = set; return [set];
}

// ---- 15. Table cell ----
export const CELL_CONTENT = ['name', 'text', 'muted', 'stage', 'owner', 'no-owner', 'labels', 'missing'];
export async function buildTableCell(host: Hosts) {
  const comps: ComponentNode[] = [];
  for (const k of CELL_CONTENT) {
    const c = box(`Content=${k}`, { comp: true, gap: k === 'name' ? 8 : k === 'labels' ? 4 : 6, pad: [0, 12], fill: 'bg', stroke: 'border', strokeSides: k === 'name' ? 'br' : 'b', w: k === 'name' ? 240 : 190, h: 48 });
    if (k === 'name') { add(c, mk('Avatar', { Size: '24', Hue: 'blue' })).name = 'Avatar'; add(c, await txt('Maya Patel', 'body-sm-strong', 'text', 'value')); }
    if (k === 'text') add(c, await txt('Lumen Brew', 'body-sm', 'text', 'value'));
    if (k === 'muted') add(c, await txt('maya@lumenbrew.co', 'body-sm', 'text-muted', 'value'));
    if (k === 'stage') add(c, mk('Stage pill', { Stage: 'Lead' })).name = 'Stage pill';
    if (k === 'owner') { add(c, mk('Avatar', { Size: '24', Hue: 'blue' })).name = 'Avatar'; add(c, await txt('Arjun', 'body-sm', 'text', 'value')); }
    if (k === 'no-owner') { add(c, mk('Avatar', { Size: '24', Hue: 'empty' })).name = 'Avatar'; add(c, await txt('No owner', 'body-sm', 'text-subtle', 'value')); }
    if (k === 'labels') {
      add(c, mk('Label tag')).name = 'Label 1'; add(c, mk('Label tag')).name = 'Label 2'; add(c, await txt('+1', 'caption-strong', 'text-muted', 'more'));
    }
    if (k === 'missing') add(c, await txt('—', 'body-sm', 'text-subtle', 'value'));
    comps.push(c);
  }
  const set = combine(host, comps, 'Table cell', 4, 'One table cell. "missing" draws an em dash on purpose. Name is the frozen first column (avatar + semibold name).');
  linkText(set, 'value', 'Value', 'value'); REG['Table cell'] = set; return [set];
}

// ---- 16. Table row ----
export async function buildTableRow(host: Hosts) {
  const comps: ComponentNode[] = [];
  const plan: [string, string][] = [['Name', 'name'], ['Stage', 'stage'], ['Company', 'text'], ['Role', 'text'], ['Owner', 'owner'], ['Labels', 'labels'], ['Email', 'muted'], ['Notes', 'muted']];
  for (const st of ['default', 'hover', 'selected', 'flash']) {
    const bg = st === 'hover' ? 'surface-hover' : st === 'selected' ? 'blue/50' : st === 'flash' ? 'amber/100' : 'bg';
    const c = box(`State=${st}`, { comp: true, h: 48, align: 'MIN' });
    plan.forEach(([nm, kind], i) => {
      const cell = mk('Table cell', { Content: kind }); cell.name = nm; add(c, cell);
      cell.resize(COLS[i].w, 48); cell.fills = [paint(tok(bg))];
    });
    comps.push(c);
  }
  const set = combine(host, comps, 'Table row', 1, 'A contact row made of Table cell instances. selected = blue-50; flash = amber-100 (the 1.6s row flash after a save, shown static).');
  REG['Table row'] = set; return [set];
}
