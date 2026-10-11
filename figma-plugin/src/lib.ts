// Shared helpers: colour parsing, fonts, variables, styles, node builders and component-property linking.
// Everything that touches the Figma API lives behind small functions so code.ts reads like a spec.
import { DATA } from './data';

export const issues: string[] = [];
export const log = (m: string) => { console.log('[Contacts] ' + m); };
export const warn = (m: string) => { issues.push(m); console.warn('[Contacts] ' + m); };

// ---------- colour ----------
export function col(s: string): RGBA {
  s = s.trim();
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) { const p = m[1].split(',').map((x) => parseFloat(x)); return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 }; }
  let h = s.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255, a: h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1 };
}

// ---------- shared state ----------
export type Hosts = PageNode | SectionNode;
export const C = {
  /** Semantic colour variables, light and dark. Components bind to the light ones. */
  S: {} as Record<string, Variable>,
  SD: {} as Record<string, Variable>,
  /** Primitive variables (light), e.g. "blue/100". */
  P: {} as Record<string, Variable>,
  PD: {} as Record<string, Variable>,
  SP: {} as Record<string, Variable>,
  R: {} as Record<string, Variable>,
  TS: {} as Record<string, TextStyle>,
  ES: {} as Record<string, EffectStyle>,
  ICON: {} as Record<string, ComponentNode>,
  FAMILY: 'Atkinson Hyperlegible Next',
  MONO: 'Atkinson Hyperlegible Mono',
  split: false, // true on the free plan: Light and Dark live in separate collections
  stats: { variables: 0, textStyles: 0, effectStyles: 0, icons: 0, components: 0, variants: 0, screens: 0, skipped: [] as string[] },
};
export const FONT_STYLES: Record<string, string> = { Regular: 'Regular', SemiBold: 'SemiBold', Bold: 'Bold' };

// ---------- fonts ----------
export async function setupFonts() {
  const all = await figma.listAvailableFontsAsync();
  const fam = (n: string) => all.filter((f) => f.fontName.family === n).map((f) => f.fontName.style);
  const pick = (styles: string[], want: string[]) => want.find((s) => styles.includes(s)) || styles.find((s) => /regular/i.test(s)) || styles[0];
  let s = fam('Atkinson Hyperlegible Next');
  if (!s.length) { C.FAMILY = 'Inter'; s = fam('Inter'); warn('Atkinson Hyperlegible Next is not available in this Figma account, so Inter was used. Install the font and run Rebuild to switch.'); }
  let m = fam('Atkinson Hyperlegible Mono');
  if (!m.length) { C.MONO = fam('Roboto Mono').length ? 'Roboto Mono' : C.FAMILY; m = fam(C.MONO); }
  FONT_STYLES.Regular = pick(s, ['Regular']);
  FONT_STYLES.SemiBold = pick(s, ['SemiBold', 'Semi Bold', 'Bold']);
  FONT_STYLES.Bold = pick(s, ['Bold']);
  FONT_STYLES.Mono = pick(m, ['Regular']);
  await Promise.all([
    figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.Regular }),
    figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.SemiBold }),
    figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.Bold }),
    figma.loadFontAsync({ family: C.MONO, style: FONT_STYLES.Mono }),
  ]);
}

// ---------- variables ----------
const syntax = (n: string) => 'var(--' + n.replace(/\//g, '-') + ')';
function scopesFor(n: string): VariableScope[] {
  if (/(^|-)border|^focus-ring|segment-active-border/.test(n)) return ['STROKE_COLOR'];
  if (/^(text|on-)/.test(n)) return ['TEXT_FILL', 'SHAPE_FILL'];
  if (/^(danger|warning|success)$/.test(n)) return ['ALL_FILLS', 'STROKE_COLOR'];
  return ['FRAME_FILL', 'SHAPE_FILL'];
}

/** Creates (or finds, by name) every collection and variable. Existing variables are left exactly as they are. */
export async function buildVariables() {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const existing = await figma.variables.getLocalVariablesAsync();
  const byName = (n: string) => cols.find((c) => c.name === n);
  const made = new Set<string>(); // variable ids created in this run
  const idx = new Map<string, Variable>(); // collectionId|name -> variable
  for (const v of existing) idx.set(v.variableCollectionId + '|' + v.name, v);

  // Does this plan allow more than one mode per collection?
  if (byName('Primitives/Light')) C.split = true;
  else if (byName('Primitives')) C.split = false;
  else {
    const probe = figma.variables.createVariableCollection('__probe');
    try { probe.addMode('Dark'); C.split = false; } catch (e) { C.split = true; }
    probe.remove();
    if (C.split) warn('This Figma plan allows one mode per collection, so Dark values are separate collections: Primitives/Light + Primitives/Dark and Semantic/Light + Semantic/Dark.');
  }

  type Target = { coll: VariableCollection; modeId: string; mode: 'light' | 'dark' };
  const coll = (name: string, modeNames: string[]): { c: VariableCollection; modes: string[] } => {
    let c = byName(name);
    if (!c) { c = figma.variables.createVariableCollection(name); c.renameMode(c.modes[0].modeId, modeNames[0]); for (const mn of modeNames.slice(1)) c.addMode(mn); cols.push(c); }
    return { c, modes: c.modes.map((m) => m.modeId) };
  };
  const targets = (base: string): Target[] => {
    if (C.split) { const l = coll(base + '/Light', ['Value']), d = coll(base + '/Dark', ['Value']); return [{ coll: l.c, modeId: l.modes[0], mode: 'light' }, { coll: d.c, modeId: d.modes[0], mode: 'dark' }]; }
    const x = coll(base, ['Light', 'Dark']); return [{ coll: x.c, modeId: x.modes[0], mode: 'light' }, { coll: x.c, modeId: x.modes[1] || x.modes[0], mode: 'dark' }];
  };
  const ensure = (c: VariableCollection, name: string, type: VariableResolvedDataType): { v: Variable; fresh: boolean } => {
    const k = c.id + '|' + name;
    let v = idx.get(k);
    if (v) return { v, fresh: made.has(v.id) };
    v = figma.variables.createVariable(name, c, type);
    idx.set(k, v); made.add(v.id); C.stats.variables++;
    return { v, fresh: true };
  };

  // Primitives
  const pt = targets('Primitives');
  for (const t of pt) {
    for (const [name, hexv] of DATA.prim[t.mode] as [string, string][]) {
      const { v, fresh } = ensure(t.coll, name, 'COLOR');
      if (fresh) { v.setValueForMode(t.modeId, col(hexv)); v.scopes = []; v.setVariableCodeSyntax('WEB', syntax(name)); }
      RESOLVED.set(v.id, col(hexv));
      (t.mode === 'light' ? C.P : C.PD)[name] = v;
    }
  }
  // Semantic colour
  const st = targets('Semantic');
  for (const t of st) {
    for (const tok of DATA.semantic) {
      const { v, fresh } = ensure(t.coll, tok.name, 'COLOR');
      if (fresh) {
        const aliasName: string | undefined = tok.alias && tok.alias[t.mode];
        const target = aliasName && (t.mode === 'light' ? C.P : C.PD)[aliasName];
        v.setValueForMode(t.modeId, target ? figma.variables.createVariableAlias(target) : col(tok[t.mode]));
        v.scopes = scopesFor(tok.name); v.setVariableCodeSyntax('WEB', syntax(tok.name));
      }
      const aliased = tok.alias && tok.alias[t.mode];
      RESOLVED.set(v.id, aliased && RESOLVED.get(((t.mode === 'light' ? C.P : C.PD)[aliased] || ({} as Variable)).id) || col(tok[t.mode]));
      (t.mode === 'light' ? C.S : C.SD)[tok.name] = v;
    }
  }
  // Spacing and radius (single mode)
  const spc = coll('Spacing', ['Value']);
  for (const [k, val] of DATA.space as [string, number][]) {
    const { v, fresh } = ensure(spc.c, 'space/' + k, 'FLOAT');
    if (fresh) { v.setValueForMode(spc.modes[0], val); v.scopes = ['GAP', 'WIDTH_HEIGHT']; v.setVariableCodeSyntax('WEB', 'var(--space-' + k + ')'); }
    C.SP['space/' + k] = v;
  }
  const rad = coll('Radius', ['Value']);
  for (const [k, val] of DATA.radius as [string, number][]) {
    const { v, fresh } = ensure(rad.c, 'radius/' + k, 'FLOAT');
    if (fresh) { v.setValueForMode(rad.modes[0], val); v.scopes = ['CORNER_RADIUS']; v.setVariableCodeSyntax('WEB', 'var(--radius-' + k + ')'); }
    C.R['radius/' + k] = v;
  }
  log(`Variables: ${C.stats.variables} created`);
}

// ---------- styles ----------
function parseShadow(s: string): DropShadowEffect[] {
  return s.split(/,(?![^(]*\))/).map((part) => {
    const c = part.match(/rgba?\([^)]+\)/);
    const nums = part.replace(c ? c[0] : '', '').trim().split(/\s+/).map((x) => parseFloat(x));
    return { type: 'DROP_SHADOW', color: c ? col(c[0]) : { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: nums[0] || 0, y: nums[1] || 0 }, radius: nums[2] || 0, spread: nums[3] || 0, visible: true, blendMode: 'NORMAL' } as DropShadowEffect;
  });
}
export async function buildStyles() {
  const ts = await figma.getLocalTextStylesAsync();
  const es = await figma.getLocalEffectStylesAsync();
  for (const t of DATA.type) {
    const name = 'Type/' + t.name;
    let s = ts.find((x) => x.name === name);
    if (!s) {
      s = figma.createTextStyle(); s.name = name;
      const mono = t.family === 'mono';
      const style = mono ? FONT_STYLES.Mono : t.weight >= 700 ? FONT_STYLES.Bold : t.weight >= 600 ? FONT_STYLES.SemiBold : FONT_STYLES.Regular;
      s.fontName = { family: mono ? C.MONO : C.FAMILY, style };
      s.fontSize = t.size; s.lineHeight = { unit: 'PIXELS', value: t.line };
      s.letterSpacing = { unit: 'PERCENT', value: t.tracking ? parseFloat(t.tracking) * 100 : 0 };
      if (t.case === 'upper') s.textCase = 'UPPER';
      C.stats.textStyles++;
    }
    C.TS[t.name] = s;
  }
  for (const sh of DATA.shadow) for (const mode of ['light', 'dark']) {
    const name = `Shadow/${sh.name}/${mode === 'light' ? 'Light' : 'Dark'}`;
    let e = es.find((x) => x.name === name);
    if (!e) { e = figma.createEffectStyle(); e.name = name; e.effects = parseShadow(sh[mode]); C.stats.effectStyles++; }
    C.ES[name] = e;
  }
  log(`Styles: ${C.stats.textStyles} text, ${C.stats.effectStyles} effect created`);
}

// ---------- paints and bindings ----------
/** The real colour of every colour variable, so a bound paint also carries the right fallback colour (Figma keeps it when re-binding the same variable). */
export const RESOLVED = new Map<string, { r: number; g: number; b: number; a?: number }>();
export function paint(v: Variable | undefined, fallback = '#ff00ff'): SolidPaint {
  const known = v && RESOLVED.get(v.id);
  const c0 = known || col(fallback);
  const base: SolidPaint = { type: 'SOLID', color: { r: c0.r, g: c0.g, b: c0.b }, ...(known && known.a !== undefined && known.a < 1 ? { opacity: known.a } : {}) };
  if (!v) { warn('missing colour variable'); return base; }
  return figma.variables.setBoundVariableForPaint(base, 'color', v); // returns a NEW paint
}
/** A colour token: "text-muted" is semantic, "blue/100" is a primitive. */
export function tok(name: string): Variable { const v = name.includes('/') ? C.P[name] : C.S[name]; if (!v) warn('unknown colour token ' + name); return v; }
export const fillOf = (n: SceneNode & GeometryMixin, t: string | null) => { n.fills = t ? [paint(tok(t))] : []; };
export function strokeOf(n: SceneNode & GeometryMixin, t: string, w = 1, align: 'INSIDE' | 'OUTSIDE' | 'CENTER' = 'INSIDE', dash?: number[]) {
  n.strokes = [paint(tok(t))]; (n as any).strokeWeight = w; (n as any).strokeAlign = align; if (dash) (n as any).dashPattern = dash;
}
export function radius(n: any, k: string) {
  const v = C.R['radius/' + k];
  for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) { n[f] = parseFloat(String(DATA.radius.find((r: any) => r[0] === k)?.[1] ?? 0)); if (v) n.setBoundVariable(f, v); }
}
/** Sets a padding / gap value and binds it to the space token when one exists. */
export function space(n: any, field: string, val: number) {
  n[field] = val; const v = C.SP['space/' + val]; if (v) n.setBoundVariable(field, v);
}
export function effectStyle(n: any, name: string): Promise<void> | void {
  const s = C.ES[name]; if (!s) { warn('missing effect style ' + name); return; }
  return n.setEffectStyleIdAsync(s.id);
}
/** Focus ring = two stacked 0-blur shadows (2px page colour, then 4px ring colour), both bound to variables. */
export function focusRing(n: any) {
  const ring = (spread: number, token: string): Effect => {
    const k = RESOLVED.get(C.S[token] && C.S[token].id) || { r: 0, g: 0, b: 0 };
    const e: DropShadowEffect = { type: 'DROP_SHADOW', color: { r: k.r, g: k.g, b: k.b, a: 1 }, offset: { x: 0, y: 0 }, radius: 0, spread, visible: true, blendMode: 'NORMAL', showShadowBehindNode: true };
    return figma.variables.setBoundVariableForEffect(e, 'color', C.S[token]);
  };
  n.effects = [ring(2, 'bg'), ring(4, 'focus-ring')];
}
export function ringOf(n: any, primitive: string, spread = 3) {
  const k = RESOLVED.get(C.P[primitive] && C.P[primitive].id) || { r: 0, g: 0, b: 0 };
  const e: DropShadowEffect = { type: 'DROP_SHADOW', color: { r: k.r, g: k.g, b: k.b, a: 1 }, offset: { x: 0, y: 0 }, radius: 0, spread, visible: true, blendMode: 'NORMAL', showShadowBehindNode: true };
  n.effects = [figma.variables.setBoundVariableForEffect(e, 'color', C.P[primitive])];
}

// ---------- node builders ----------
export interface BoxOpts {
  dir?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
  gap?: number; pad?: number | [number, number] | [number, number, number, number];
  fill?: string | null; stroke?: string; sw?: number; dash?: number[]; strokeSides?: string; radius?: string;
  justify?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'; align?: 'MIN' | 'CENTER' | 'MAX';
  w?: number; h?: number; comp?: boolean; wrap?: boolean; clip?: boolean;
}
export function box(name: string, o: BoxOpts = {}): any {
  const f: any = o.comp ? figma.createComponent() : figma.createFrame();
  f.name = name; f.fills = []; f.clipsContent = !!o.clip;
  f.layoutMode = o.dir || 'HORIZONTAL';
  if (f.layoutMode !== 'NONE') {
    f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
    f.primaryAxisAlignItems = o.justify || 'MIN'; f.counterAxisAlignItems = o.align || 'CENTER';
    const p = o.pad == null ? [0, 0, 0, 0] : typeof o.pad === 'number' ? [o.pad, o.pad, o.pad, o.pad] : o.pad.length === 2 ? [o.pad[0], o.pad[1], o.pad[0], o.pad[1]] : o.pad;
    space(f, 'paddingTop', p[0]); space(f, 'paddingRight', p[1]); space(f, 'paddingBottom', p[2]); space(f, 'paddingLeft', p[3]);
    space(f, 'itemSpacing', o.gap || 0);
    if (o.wrap) f.layoutWrap = 'WRAP';
  }
  if (o.fill) fillOf(f, o.fill);
  if (o.stroke) {
    strokeOf(f, o.stroke, o.sw || 1, 'INSIDE', o.dash);
    if (o.strokeSides) { const s = o.strokeSides; f.strokeTopWeight = s.includes('t') ? o.sw || 1 : 0; f.strokeBottomWeight = s.includes('b') ? o.sw || 1 : 0; f.strokeLeftWeight = s.includes('l') ? o.sw || 1 : 0; f.strokeRightWeight = s.includes('r') ? o.sw || 1 : 0; }
  }
  if (o.radius) radius(f, o.radius);
  if (o.w != null || o.h != null) size(f, o.w, o.h);
  return f;
}
/** resize() resets both axes to FIXED, so hugging axes are restored afterwards. */
export function size(f: any, w?: number, h?: number) {
  f.resize(Math.max(w ?? f.width, 1), Math.max(h ?? f.height, 1));
  if (f.layoutMode === 'NONE') return;
  const horiz = f.layoutMode === 'HORIZONTAL';
  const axis = (isW: boolean, fixed: boolean) => { const primary = horiz ? isW : !isW; if (primary) f.primaryAxisSizingMode = fixed ? 'FIXED' : 'AUTO'; else f.counterAxisSizingMode = fixed ? 'FIXED' : 'AUTO'; };
  axis(true, w != null); axis(false, h != null);
}
export function add<T extends SceneNode>(parent: any, child: T): T { parent.appendChild(child); return child; }
/** Fill the parent's width (parent must already be an auto-layout frame). */
export function fillW(n: any) { n.layoutSizingHorizontal = 'FILL'; return n; }
export function fillH(n: any) { n.layoutSizingVertical = 'FILL'; return n; }
export function grow(n: any) { n.layoutGrow = 1; return n; }
export function spacer() { const s = figma.createFrame(); s.name = 'spacer'; s.fills = []; s.resize(1, 1); return s; }
export function rect(name: string, w: number, h: number, fill: string | null, r?: string) {
  const x = figma.createRectangle(); x.name = name; x.resize(w, h); fillOf(x, fill); if (r) radius(x, r); return x;
}
export function ellipse(name: string, d: number, fill: string | null) { const e = figma.createEllipse(); e.name = name; e.resize(d, d); fillOf(e, fill); return e; }

export async function txt(chars: string, style: string, color: string | null = 'text', name?: string, o: { w?: number; align?: 'LEFT' | 'CENTER' | 'RIGHT'; underline?: boolean; opacity?: number } = {}) {
  const t = figma.createText();
  const st = C.TS[style]; if (!st) warn('missing text style ' + style);
  t.fontName = st ? st.fontName : { family: C.FAMILY, style: FONT_STYLES.Regular };
  t.characters = chars;
  if (st) await t.setTextStyleIdAsync(st.id);
  if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; } // resize() resets auto-resize, so set it after
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.underline) t.textDecoration = 'UNDERLINE';
  fillOf(t, color); if (o.opacity != null) t.opacity = o.opacity;
  t.name = name || chars.slice(0, 28);
  return t;
}

// ---------- icons ----------
export function iconComp(name: string): ComponentNode | undefined { return C.ICON[name] || C.ICON[name + '-outline']; }
export function recolor(n: SceneNode, token: string) {
  const go = (x: SceneNode) => {
    if ('fills' in x && Array.isArray(x.fills) && x.fills.length && x.type !== 'TEXT') x.fills = x.fills.map((p) => (p.type === 'SOLID' ? paint(tok(token)) : p));
    if ('strokes' in x && Array.isArray(x.strokes) && x.strokes.length) x.strokes = x.strokes.map((p) => (p.type === 'SOLID' ? paint(tok(token)) : p));
    if ('children' in x && x.type !== 'INSTANCE') for (const c of x.children) go(c);
    else if (x.type === 'INSTANCE') for (const c of x.children) go(c);
  };
  go(n);
}
export function ico(name: string, sz = 16, color = 'text', label?: string): InstanceNode {
  const c = iconComp(name) || iconComp('information-circle');
  if (!c) throw new Error('icon missing: ' + name);
  const i = c.createInstance(); i.name = label || 'Icon'; i.resize(sz, sz); recolor(i, color); return i;
}

// ---------- components ----------
export function variantOf(set: ComponentSetNode, props: Record<string, string>): ComponentNode {
  const want = Object.entries(props).map(([k, v]) => `${k}=${v}`);
  const c = set.children.find((ch) => want.every((w) => ch.name.split(', ').includes(w))) as ComponentNode;
  if (!c) throw new Error(`variant not found in ${set.name}: ${want.join(', ')}`);
  return c;
}
/** Lays variants out in a grid and returns the set. Variants must already share the set's parent (page or section). */
export function combine(host: Hosts, comps: ComponentNode[], name: string, cols: number, description: string): ComponentSetNode {
  for (const c of comps) host.appendChild(c); // variants must live on the same page/section
  const set = figma.combineAsVariants(comps, host);
  set.name = name; set.description = description;
  const gap = 24, pad = 24;
  const colW: number[] = [], rowH: number[] = [];
  set.children.forEach((ch, i) => { const c = i % cols, r = Math.floor(i / cols); colW[c] = Math.max(colW[c] || 0, ch.width); rowH[r] = Math.max(rowH[r] || 0, ch.height); });
  set.children.forEach((ch, i) => { const c = i % cols, r = Math.floor(i / cols); ch.x = pad + colW.slice(0, c).reduce((a, b) => a + b + gap, 0); ch.y = pad + rowH.slice(0, r).reduce((a, b) => a + b + gap, 0); });
  let mx = 0, my = 0; for (const ch of set.children) { mx = Math.max(mx, ch.x + ch.width); my = Math.max(my, ch.y + ch.height); }
  set.resizeWithoutConstraints(mx + pad, my + pad);
  set.strokes = [{ type: 'SOLID', color: { r: 0.592, g: 0.278, b: 1 } }]; set.dashPattern = [6, 4]; set.strokeWeight = 1;
  C.stats.components++; C.stats.variants += comps.length;
  return set;
}
/** Nodes that belong to this variant itself (not to nested instances). */
export function own(root: ComponentNode, pred: (n: SceneNode) => boolean): SceneNode[] {
  const out: SceneNode[] = [];
  const walk = (n: SceneNode) => { if (pred(n)) out.push(n); if (n.type !== 'INSTANCE' && 'children' in n) for (const c of (n as FrameNode).children) walk(c); };
  for (const c of root.children) walk(c);
  return out;
}
type Owner = ComponentSetNode | ComponentNode;
const variantsOf = (o: Owner): ComponentNode[] => (o.type === 'COMPONENT_SET' ? (o.children as ComponentNode[]) : [o]);
export function linkText(o: Owner, prop: string, def: string, nodeName: string) {
  const key = o.addComponentProperty(prop, 'TEXT', def);
  for (const v of variantsOf(o)) for (const t of own(v, (n) => n.type === 'TEXT' && n.name === nodeName)) {
    t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { characters: key });
  }
  return key;
}
export function linkBool(o: Owner, prop: string, def: boolean, nodeName: string) {
  const key = o.addComponentProperty(prop, 'BOOLEAN', def);
  for (const v of variantsOf(o)) for (const t of own(v, (n) => n.name === nodeName)) t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { visible: key });
  return key;
}
export function linkSwap(o: Owner, prop: string, defIcon: string, nodeName: string) {
  const def = iconComp(defIcon); if (!def) return;
  const key = o.addComponentProperty(prop, 'INSTANCE_SWAP', def.id);
  for (const v of variantsOf(o)) for (const t of own(v, (n) => n.type === 'INSTANCE' && n.name === nodeName)) t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { mainComponent: key });
  return key;
}
/** Component set → each variant, for a generator `fn(props)`. */
export function props(name: string): Record<string, string> { const o: Record<string, string> = {}; for (const p of name.split(', ')) { const [k, v] = p.split('='); o[k] = v; } return o; }

// ---------- instances ----------
export function propKey(i: InstanceNode, name: string): string | undefined {
  return Object.keys(i.componentProperties).find((k) => k === name || k.startsWith(name + '#'));
}
export function setProp(i: InstanceNode, name: string, value: string | boolean) {
  const k = propKey(i, name); if (!k) { warn(`property "${name}" not found on ${i.name}`); return; }
  i.setProperties({ [k]: value as any });
}
export function setProps(i: InstanceNode, p: Record<string, string | boolean>) { for (const [k, v] of Object.entries(p)) setProp(i, k, v); }
export function find(n: SceneNode, name: string): SceneNode | null { return 'findOne' in n ? (n as FrameNode).findOne((x) => x.name === name) : null; }
export function findAll(n: SceneNode, name: string): SceneNode[] { return 'findAll' in n ? (n as FrameNode).findAll((x) => x.name === name) : []; }
export function findInst(n: SceneNode, name: string): InstanceNode | null { return (find(n, name) as InstanceNode) || null; }

// ---------- lookup of what already exists ----------
export function setByName(page: PageNode, name: string): ComponentSetNode | ComponentNode | undefined {
  return page.findOne((n) => (n.type === 'COMPONENT_SET' && n.name === name) || (n.type === 'COMPONENT' && n.name === name && n.parent?.type !== 'COMPONENT_SET')) as any;
}

// ---------- generated-node bookkeeping ----------
export const tag = <T extends BaseNode>(n: T): T => { n.setPluginData('generated', '1'); return n; };
export const isTagged = (n: BaseNode) => n.getPluginData('generated') === '1';

/** Section on a page, stacked below what is already there. */
export function newSection(page: PageNode, name: string): SectionNode {
  const s = figma.createSection(); s.name = name; page.appendChild(s); tag(s); return s;
}
export function nextY(page: PageNode, gap = 160): number {
  let y = 0; for (const n of page.children) y = Math.max(y, n.y + n.height + gap);
  return y;
}
/** Puts a title, a description and the nodes in a section, laid out in a column, and fits the section around them. */
export async function fitSection(sec: SectionNode, page: PageNode, title: string, desc: string, nodes: SceneNode[], opts: { row?: boolean; gap?: number } = {}) {
  const pad = 80, gap = opts.gap ?? 64;
  const head = box('Header', { dir: 'VERTICAL', gap: 8, align: 'MIN' });
  add(head, await txt(title, 'display', 'text', 'Title'));
  add(head, await txt(desc, 'body', 'text-muted', 'Description', { w: 880 }));
  sec.appendChild(head); head.x = pad; head.y = pad;
  let x = pad, y = pad + head.height + 48, w = head.width, bottom = y;
  for (const n of nodes) {
    sec.appendChild(n);
    if (opts.row) { n.x = x; n.y = y; x += n.width + gap; bottom = Math.max(bottom, y + n.height); w = Math.max(w, x - gap - pad); }
    else { n.x = pad; n.y = y; y += n.height + gap; bottom = y - gap; w = Math.max(w, n.width); }
  }
  sec.resizeWithoutConstraints(w + pad * 2, bottom + pad);
  sec.x = 0; sec.y = nextYExcluding(page, sec);
}
function nextYExcluding(page: PageNode, sec: SectionNode, gap = 160): number {
  let y = 0; for (const n of page.children) if (n !== sec) y = Math.max(y, n.y + n.height + gap);
  return y;
}

/** Pushes sections down so none overlap (only ever moves down; the order on the page is kept). */
export function restack(page: PageNode, gap = 160) {
  const secs = page.children.filter((c) => c.type === 'SECTION').sort((a, b) => a.y - b.y);
  let bottom = -Infinity;
  for (const s of secs) { if (s.y < bottom + gap) s.y = bottom + gap; bottom = s.y + s.height; }
}
