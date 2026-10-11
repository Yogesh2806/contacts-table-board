// Contacts Table & Board: Figma library builder.
// Plugins → Development → Import plugin from manifest… → run "Build" (skips anything that already exists by name)
// or "Rebuild" (removes only the nodes this plugin generated, then builds again).
// Creates variables, text and shadow styles, icon components, 28 components with variants and properties, plus 42 icon components,
// the eleven product screens and the five context boards, all bound to the variables. No images.
import { DATA } from './data';
import { C, FONT_STYLES, add, box, buildStyles, buildVariables, fitSection, issues, isTagged, log, newSection, nextY, paint, radius, recolor, rect, setupFonts, setByName, tag, tok, txt, warn, effectStyle, fillOf, Hosts, size } from './lib';
import * as A from './components';
import * as B from './components2';
import { SCREENS, buildScreen } from './screens';
import { BOARDS } from './boards';

const PAGES = ['Cover & Foundations', 'Components', 'Screens'];

// ---------- pages (always three: works on the free plan) ----------
async function ensurePages(): Promise<Record<string, PageNode>> {
  const out: Record<string, PageNode> = {};
  const first = figma.root.children[0];
  if (!figma.root.children.some((p) => p.name === PAGES[0]) && figma.root.children.length === 1 && first.children.length === 0) first.name = PAGES[0];
  for (const n of PAGES) {
    let p = figma.root.children.find((x) => x.name === n);
    if (!p) { try { p = figma.createPage(); p.name = n; } catch (e) { warn(`Could not create the page "${n}" (${(e as Error).message}). Its content goes on the first page instead.`); p = figma.root.children[0]; } }
    out[n] = p;
  }
  for (const p of Object.values(out)) p.backgrounds = [{ type: 'SOLID', color: { r: 0.957, g: 0.957, b: 0.957 } }];
  return out;
}

// ---------- Rebuild: remove only what this plugin generated ----------
async function removeGenerated(pages: Record<string, PageNode>) {
  let n = 0;
  for (const p of Object.values(pages)) {
    for (const c of [...p.children]) {
      if (isTagged(c)) { c.remove(); n++; }
      else if (c.type === 'FRAME' && c.name === 'Icons') for (const k of [...c.children]) if (isTagged(k)) { k.remove(); n++; }
    }
  }
  log(`Rebuild: removed ${n} generated nodes`);
}

// ---------- what already exists ----------
function collectRegistry(page: PageNode) {
  for (const s of page.findAllWithCriteria({ types: ['COMPONENT_SET'] })) A.REG[s.name] = s as ComponentSetNode;
  for (const c of page.findAllWithCriteria({ types: ['COMPONENT'] })) {
    if (c.name.startsWith('Icon/')) C.ICON[c.name.slice(5)] = c as ComponentNode;
    else if (c.parent && c.parent.type !== 'COMPONENT_SET') A.REG[c.name] = c as ComponentNode;
  }
}

// ---------- icons ----------
async function buildIcons(page: PageNode) {
  const missing = Object.keys(DATA.icons).filter((n) => !C.ICON[n]);
  if (!missing.length) return;
  let grid = page.children.find((n) => n.type === 'FRAME' && n.name === 'Icons') as FrameNode | undefined;
  if (!grid) {
    grid = box('Icons', { gap: 24, pad: 32, align: 'MIN', wrap: true }) as FrameNode; tag(grid);
    page.appendChild(grid); size(grid, 8 * 20 + 7 * 24 + 64); grid.counterAxisSpacing = 24; grid.x = 0; grid.y = nextY(page);
  }
  for (const name of missing) {
    const svg = figma.createNodeFromSvg(DATA.icons[name]);
    const vb = svg.width || 512;
    svg.rescale(20 / vb); // rescale scales the vectors inside; resize would only crop the frame
    const c = figma.createComponent(); c.name = 'Icon/' + name; c.resize(20, 20); c.fills = []; c.clipsContent = true;
    c.appendChild(svg); svg.x = 0; svg.y = 0; svg.name = 'glyph'; svg.fills = [];
    svg.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; // instances resize to 16/24 without cropping
    for (const d of svg.findAll(() => true)) if ('constraints' in d) (d as ConstraintMixin & SceneNode).constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    recolor(c, 'text');
    c.description = `Ionicons ${name} (MIT).`;
    grid.appendChild(c); tag(c);
    C.ICON[name] = c; C.stats.icons++;
  }
  log(`Icons: ${C.stats.icons} created`);
}

// ---------- components ----------
type Builder = (host: Hosts) => Promise<SceneNode[]>;
const LIST: [string, Builder][] = [
  ['Avatar', A.buildAvatar], ['Stage pill', A.buildStagePill], ['Label tag', A.buildLabelTag], ['Badge', A.buildBadge], ['Kbd', A.buildKbd],
  ['Button', A.buildButton], ['Icon button', A.buildIconButton], ['Segmented item', A.buildSegmentedItem], ['View switch', A.buildViewSwitch],
  ['Search input', A.buildSearchInput], ['Select', A.buildSelect], ['Filter chip', A.buildFilterChip],
  ['Table header cell', A.buildTableHeaderCell], ['Table cell', A.buildTableCell], ['Table row', A.buildTableRow],
  ['Contact card', B.buildContactCard], ['Column header', B.buildColumnHeader], ['Empty column', B.buildEmptyColumn],
  ['Stage option', B.buildStageOption], ['Stage picker', B.buildStagePicker], ['Notes field', B.buildNotesField], ['Detail row', B.buildDetailRow],
  ['Panel footer', B.buildPanelFooter], ['Details panel', B.buildDetailsPanel], ['Toast', B.buildToast], ['Dialog', B.buildDialog],
  ['Sidebar item', B.buildSidebarItem], ['Sidebar', B.buildSidebar],
];
async function buildComponents(page: PageNode) {
  for (const [name, fn] of LIST) {
    const exists = page.children.some((n) => n.type === 'SECTION' && n.name === name) || !!setByName(page, name);
    if (exists) { C.stats.skipped.push(name); continue; }
    const sec = newSection(page, name);
    try {
      const nodes = await fn(sec);
      await fitSection(sec, page, name, (nodes[0] as any).description || '', nodes);
    } catch (e: any) {
      warn(`${name}: ${e.message}`); sec.remove();
      if (A.REG[name] && !A.REG[name].parent) delete A.REG[name];
    }
  }
}

// ---------- screens and boards ----------
async function buildScreens(page: PageNode) {
  const place = async (secName: string, items: { name: string; x: number; y: number; make: () => Promise<FrameNode> }[]) => {
    let sec = page.children.find((n) => n.type === 'SECTION' && n.name === secName) as SectionNode | undefined;
    if (!sec) { sec = newSection(page, secName); sec.x = 0; sec.y = nextY(page); sec.resizeWithoutConstraints(200, 200); }
    for (const it of items) {
      if (sec.findOne((n) => n.name === it.name)) { C.stats.skipped.push(it.name); continue; }
      try {
        const f = await it.make(); sec.appendChild(f); f.x = 80 + it.x; f.y = 80 + it.y;
      } catch (e: any) { warn(`${it.name}: ${e.message}`); }
    }
    let w = 0, h = 0; for (const k of sec.children) { w = Math.max(w, k.x + k.width); h = Math.max(h, k.y + k.height); }
    sec.resizeWithoutConstraints(Math.max(w + 80, 200), Math.max(h + 80, 200));
  };
  const nm = (b: any) => b.name;
  await place('Step 1 · Understand the problem', BOARDS.map((b) => ({ name: ({ Main: '01 · The problem', References: '02 · Learn from real products', FieldMap: '03 · Fields & data', Flow: '04 · Edit flow & state', Heuristics: "05 · Nielsen's 10, applied" } as any)[b.key], x: b.x, y: b.y, make: b.build as any })));
  await place('Step 2 · Interface design', SCREENS.map((s) => ({ name: s.spec.name, x: s.x, y: s.y, make: () => buildScreen(s.spec) })));
}

// ---------- cover and foundations ----------
async function sw(parent: FrameNode, name: string, v: Variable | undefined, label: string) {
  const row = add(parent, box(name, { gap: 12 }));
  const r = add(row, rect(name, 40, 24, null, 'sm')); r.fills = [paint(v)]; r.strokes = [paint(C.S['border'])]; r.strokeWeight = 1;
  add(row, await txt(label, 'mono', 'text', 'name'));
  return row;
}
async function buildFoundations(page: PageNode) {
  const have = (n: string) => page.children.some((c) => c.type === 'SECTION' && c.name === n);
  if (!have('Foundations · Colour')) {
    const sec = newSection(page, 'Foundations · Colour');
    const root = box('Colour', { dir: 'VERTICAL', gap: 48, align: 'MIN' }) as FrameNode;
    const modes = add(root, box('Semantic', { gap: 48, align: 'MIN' }));
    for (const [label, bag, base] of [['Light', C.S, 'bg'], ['Dark', C.SD, 'bg']] as [string, Record<string, Variable>, string][]) {
      const col = add(modes, box(label, { dir: 'VERTICAL', gap: 8, pad: 24, align: 'MIN', radius: 'md', stroke: 'border' }));
      col.fills = [paint(bag[base])]; // the column is painted with that mode's own background
      const t = await txt(`Semantic colour · ${label}`, 'heading', 'text', 'title'); t.fills = [paint(bag['text'])]; add(col, t);
      for (const tkn of DATA.semantic) {
        const row = add(col, box(tkn.name, { gap: 12 }));
        const r = add(row, rect(tkn.name, 40, 24, null, 'sm')); r.fills = [paint(bag[tkn.name])]; r.strokes = [paint(bag['border-strong'])]; r.strokeWeight = 1;
        const lbl = add(row, await txt(tkn.name + '   ' + tkn[label.toLowerCase()], 'mono', 'text', 'name')); lbl.fills = [paint(bag['text'])];
      }
    }
    add(root, await txt('Stage hues and neutrals', 'heading', 'text', 'palette title'));
    for (const hue of ['blue', 'violet', 'amber', 'green', 'neutral']) {
      const row = add(root, box(hue, { gap: 4, align: 'MIN' }));
      const names = (DATA.prim.light as [string, string][]).filter(([n]) => n.startsWith(hue + '/')).map(([n]) => n);
      for (const [mode, bag] of [['Light', C.P], ['Dark', C.PD]] as [string, Record<string, Variable>][]) {
        const g = add(row, box(`${hue} ${mode}`, { gap: 2, pad: 8, radius: 'sm', stroke: 'border' }));
        for (const n of names) { const r = add(g, rect(n, hue === 'neutral' ? 20 : 48, 40, null, 'sm')); r.fills = [paint(bag[n])]; }
      }
    }
    await fitSection(sec, page, 'Foundations · Colour', 'Semantic colours in Light and Dark (each swatch is bound to that mode\'s variable), then the stage hues and neutral ramp.', [root]);
    tag(sec);
  }
  if (!have('Foundations · Type, space, radius, elevation')) {
    const sec = newSection(page, 'Foundations · Type, space, radius, elevation');
    const root = box('Type and layout', { dir: 'VERTICAL', gap: 48, align: 'MIN' }) as FrameNode;
    add(root, await txt('Typography', 'heading', 'text', 'type title'));
    const samples: Record<string, string> = { display: 'Contacts', title: 'Discard your changes?', heading: 'No contacts match “zzz”', 'card-name': 'Maya Patel', body: 'Search looks at names, companies, roles and emails.', 'body-sm': 'Head of Operations · Lumen Brew', 'body-sm-strong': 'Save changes', caption: '10 contacts', 'caption-strong': 'Lead', label: 'Warm', overline: 'Intelligence', mono: 'maya@lumenbrew.co' };
    for (const t of DATA.type) {
      const r = add(root, box(t.name, { gap: 24 }));
      await txt(`${t.name}\n${t.size}/${t.line} · ${t.weight}`, 'mono', 'text-muted', 'spec', { w: 180 }).then((x) => add(r, x));
      add(r, await txt(samples[t.name] || t.name, t.name, 'text', 'sample'));
    }
    add(root, await txt('Spacing', 'heading', 'text', 'space title'));
    for (const [k, v] of DATA.space as [string, number][]) {
      const r = add(root, box('space-' + k, { gap: 16 }));
      await txt('space/' + k + '  ' + v + 'px', 'mono', 'text-muted', 'name', { w: 160 }).then((x) => add(r, x));
      const bar = add(r, rect('bar', Math.max(v, 1), 16, 'action'));
      const sp = C.SP['space/' + k]; if (sp && v > 0) { try { bar.setBoundVariable('width', sp); } catch (e) { /* keep the fixed width */ } }
    }
    add(root, await txt('Radius', 'heading', 'text', 'radius title'));
    const rr = add(root, box('Radii', { gap: 16, align: 'MIN' }));
    for (const [k, v] of DATA.radius as [string, number][]) {
      const b = add(rr, box('radius-' + k, { dir: 'VERTICAL', justify: 'MAX', pad: 8, fill: 'surface', stroke: 'border-strong', sw: 2, radius: k, w: 96, h: 96, align: 'MIN' }));
      add(b, await txt(`${k}\n${v}px`, 'mono', 'text-muted', 'name'));
    }
    add(root, await txt('Elevation', 'heading', 'text', 'elevation title'));
    const er = add(root, box('Shadows', { gap: 48, pad: 24, align: 'MIN' }));
    for (const mode of ['Light', 'Dark']) {
      const bg = add(er, box(mode, { gap: 24, pad: 32, radius: 'md', w: undefined }));
      const bag = mode === 'Light' ? C.S : C.SD;
      bg.fills = [paint(bag['bg'])];
      for (const s of DATA.shadow) {
        const b = add(bg, box(s.name, { justify: 'CENTER', radius: 'md', w: 120, h: 80 })); b.fills = [paint(bag['surface-raised'])];
        await effectStyle(b, `Shadow/${s.name}/${mode}`);
        const l = add(b, await txt(s.name.replace('elevation-', 'Elevation '), 'caption-strong', 'text', 'name')); l.fills = [paint(bag['text'])];
      }
    }
    await fitSection(sec, page, 'Foundations · Type, space, radius, elevation', '12 text styles, the spacing scale, radius tokens and 4 elevation levels (light and dark styles).', [root]);
    tag(sec);
  }
}
function countComponents(comp: PageNode) {
  const sets = comp.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  const loose = comp.findAllWithCriteria({ types: ['COMPONENT'] }).filter((c) => !c.name.startsWith('Icon/') && c.parent && c.parent.type !== 'COMPONENT_SET');
  const variants = sets.reduce((a, s) => a + (s as ComponentSetNode).children.length, 0) + loose.length;
  return { components: sets.length + loose.length, variants };
}
async function buildCover(page: PageNode, comp: PageNode, vars: number) {
  if (page.children.some((c) => c.type === 'SECTION' && c.name === 'Cover')) return;
  const sec = newSection(page, 'Cover'); sec.x = 0; sec.y = -1;
  const f = box('Cover', { dir: 'VERTICAL', gap: 24, pad: 64, align: 'MIN', fill: 'bg', stroke: 'border', radius: 'md', w: 1200 }) as FrameNode;
  add(f, await txt('FIGMA LIBRARY', 'overline', 'text-muted', 'eyebrow'));
  add(f, await txt('Contacts — Table & Board', 'display', 'text', 'title'));
  add(f, await txt('A real, editable rebuild of the design: variables, text and shadow styles, icon components, 28 components with variants and properties, plus 42 icon components, eleven product screens and five context boards. Generated from design/tokens.json and the React components, so the file and the code agree.', 'body', 'text-muted', 'lede', { w: 880 }));
  const n = countComponents(comp);
  const stats = add(f, box('Counts', { gap: 16, align: 'MIN', wrap: true }));
  const items: [string, string][] = [[String(vars), 'variables'], [String(Object.keys(C.TS).length), 'text styles'], [String(Object.keys(C.ES).length), 'shadow styles'], [String(Object.keys(C.ICON).length), 'icons'], [String(n.components), 'components'], [String(n.variants), 'variants'], [String(SCREENS.length), 'screens'], [String(BOARDS.length), 'context boards']];
  for (const [v, l] of items) {
    const c = add(stats, box(l, { dir: 'VERTICAL', gap: 4, pad: 16, align: 'MIN', fill: 'surface-sunken', radius: 'md', w: 132 }));
    add(c, await txt(v, 'display', 'text', 'value')); add(c, await txt(l, 'caption', 'text-muted', 'label'));
  }
  add(f, await txt('Pages: Cover & Foundations · Components (one section per component) · Screens (Step 1 context boards, Step 2 product screens A–K).\nDark mode: every colour variable has a Dark value; on the free plan Light and Dark are separate collections.', 'body-sm', 'text-muted', 'pages', { w: 880 }));
  await fitSection(sec, page, 'Contacts — Table & Board', 'Design system and screens for the contacts table and board.', [f]);
  tag(sec); sec.y = 0;
  for (const o of page.children) if (o !== sec && o.type === 'SECTION') o.y = Math.max(o.y, sec.y + sec.height + 160);
}

async function main() {
  await figma.loadAllPagesAsync();
  const rebuild = figma.command === 'rebuild';
  const pages = await ensurePages();
  if (rebuild) await removeGenerated(pages);
  figma.notify('Contacts Table & Board: building… this can take a few minutes.', { timeout: 120000 });
  await setupFonts();
  await buildVariables();
  await buildStyles();

  const comp = pages['Components'];
  await figma.setCurrentPageAsync(comp);
  collectRegistry(comp);
  await buildIcons(comp);
  await buildComponents(comp);
  collectRegistry(comp);

  const scr = pages['Screens'];
  await figma.setCurrentPageAsync(scr);
  await buildScreens(scr);

  const cover = pages['Cover & Foundations'];
  await figma.setCurrentPageAsync(cover);
  await buildFoundations(cover);
  const allVars = (await figma.variables.getLocalVariablesAsync()).length;
  await buildCover(cover, comp, allVars);

  const n = countComponents(comp);
  const s = C.stats;
  const msg = `Built ${allVars} variables, ${Object.keys(C.TS).length} text styles, ${Object.keys(C.ES).length} shadow styles, ${Object.keys(C.ICON).length} icons, ${n.components} components (${n.variants} variants), ${s.screens} screens/boards.` +
    (s.skipped.length ? ` Skipped ${s.skipped.length} that already existed.` : '') + (issues.length ? ` ${issues.length} note(s) in the console (Plugins → Development → Open console).` : '');
  figma.closePlugin(msg);
}
main().catch((e) => { console.error(e); figma.closePlugin('Contacts Table & Board failed: ' + (e && e.message ? e.message : e)); });
