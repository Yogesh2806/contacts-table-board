// A small in-memory mock of the Figma Plugin API that ENFORCES the gotchas the plugin must respect.
// It is not a renderer: sizes are estimated just well enough to catch zero-size / wrong-order bugs.
// Enforced (each throws like Figma does):
//   - text writes need the font loaded first (characters, fontName-dependent writes, setProperties on text)
//   - sync getters are gone under documentAccess "dynamic-page": pages must be loaded; figma.currentPage can't be set
//   - setBoundVariableForPaint returns a NEW paint (the input is never mutated); solid paint colours take r,g,b only
//   - layoutSizing HUG/FILL are only valid in the right structural context; FILL needs an auto-layout parent
//   - resize() resets both axes to FIXED
//   - combineAsVariants needs COMPONENT nodes that already share the target parent
//   - componentPropertyDefinitions can't be read on a variant; addComponentProperty can't be called on a variant
//   - instances can't have children added; sections can't nest; description only on components
//   - free plan: one mode per collection (addMode throws), three pages per file
//   - variable names are unique per collection; bound-variable type must fit the field; scopes are audited
//   - fills/strokes/effects/children are read-only arrays (frozen)
const TEXT_FIELDS = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
let uid = 1;
const clone = (o) => (o === undefined ? undefined : JSON.parse(JSON.stringify(o)));
const AUTOLAYOUT = (n) => n.layoutMode === 'HORIZONTAL' || n.layoutMode === 'VERTICAL';
const BIND_NUMERIC = new Set(['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing', 'counterAxisSpacing', 'width', 'height', 'minWidth', ...TEXT_FIELDS]);

export function createFigma({ plan = 'paid', command = 'build', fonts } = {}) {
  const log = { closed: null, notes: [], warns: [], errors: [] };
  const nodes = new Map();
  const loadedFonts = new Set();
  const available = fonts || [
    ['Atkinson Hyperlegible Next', ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']], ['Atkinson Hyperlegible Mono', ['Regular', 'Medium']], ['Inter', ['Regular', 'Medium', 'SemiBold', 'Bold']],
  ];
  const collections = [], variables = [], textStyles = [], effectStyles = [];
  const fail = (m) => { throw new Error(m); };

  class Node {
    constructor(type) {
      this.type = type; this.id = (type === 'PAGE' ? '0:' : '') + (uid++) + ':' + type.length; this.name = type; this._parent = null; this._children = []; this._data = {};
      this._x = 0; this._y = 0; this._w = 100; this._h = 100; this.rotation = 0; this.opacity = 1; this.visible = true; this._fills = []; this._strokes = []; this._effects = [];
      this.layoutMode = 'NONE'; this.primaryAxisSizingMode = 'AUTO'; this.counterAxisSizingMode = 'AUTO'; this._sz = { w: 'FIXED', h: 'FIXED' };
      this.primaryAxisAlignItems = 'MIN'; this.counterAxisAlignItems = 'MIN'; this.itemSpacing = 0; this.paddingTop = 0; this.paddingBottom = 0; this.paddingLeft = 0; this.paddingRight = 0;
      this.layoutGrow = 0; this.layoutPositioning = 'AUTO'; this.clipsContent = type === 'FRAME' || type === 'COMPONENT' ? true : false; this.strokeWeight = 1; this.strokeAlign = 'CENTER'; this.cornerRadius = 0;
      this._bv = {}; this._refs = {}; this.constraints = { horizontal: 'MIN', vertical: 'MIN' }; this._desc = '';
      for (const f of TEXT_FIELDS) this[f] = 0;
      if (type === 'TEXT') { this._chars = ''; this.fontName = { family: 'Inter', style: 'Regular' }; this.textAutoResize = 'WIDTH_AND_HEIGHT'; this._textStyleId = ''; this.fontSize = 12; this._lh = 16; this.textAlignHorizontal = 'LEFT'; }
      if (type === 'COMPONENT_SET') { this._defs = {}; this._pc = 0; }
      if (type === 'COMPONENT') { this._defs = {}; this._pc = 0; }
      if (type === 'INSTANCE') { this._main = null; this._vals = {}; }
      nodes.set(this.id, this);
    }
    // ----- tree -----
    get parent() { return this._parent; }
    get children() { this._chk(); return Object.freeze([...this._children]); }
    _chk() { let p = this; while (p && p.type !== 'PAGE') p = p._parent; if (p && !p._loaded) fail('Cannot access children on a page that has not been loaded (documentAccess: dynamic-page)'); }
    get removed() { return !!this._removed; }
    appendChild(c) {
      if (!['PAGE', 'FRAME', 'COMPONENT', 'COMPONENT_SET', 'SECTION', 'GROUP', 'INSTANCE', 'DOCUMENT'].includes(this.type)) fail(`Node of type ${this.type} cannot have children`);
      if (this.type === 'INSTANCE') fail('Cannot add children to an instance');
      if (c.type === 'PAGE' || c.type === 'DOCUMENT') fail('Cannot append a page');
      if (this.type === 'SECTION' && c.type === 'SECTION') fail('Sections cannot be nested');
      if (this.type === 'COMPONENT_SET' && c.type !== 'COMPONENT') fail('Only components can be children of a component set');
      if (c === this) fail('Cannot append to itself');
      for (let p = this; p; p = p._parent) if (p === c) fail('Cannot create a cycle');
      if (c._parent) c._parent._children.splice(c._parent._children.indexOf(c), 1);
      c._parent = this; this._children.push(c);
      if (c._sz.w === 'FILL' && !AUTOLAYOUT(this)) c._sz.w = 'FIXED';
      if (c._sz.h === 'FILL' && !AUTOLAYOUT(this)) c._sz.h = 'FIXED';
    }
    insertChild(i, c) { this.appendChild(c); this._children.splice(this._children.indexOf(c), 1); this._children.splice(i, 0, c); }
    remove() { if (this._parent) this._parent._children.splice(this._parent._children.indexOf(this), 1); this._parent = null; this._removed = true; const kill = (n) => { nodes.delete(n.id); n._children.forEach(kill); }; kill(this); }
    // ----- search -----
    _all(pred, out = []) { for (const c of this._children) { if (pred(c)) out.push(c); c._all(pred, out); } return out; }
    findAll(pred) { this._chk(); return this._all(pred || (() => true)); }
    findOne(pred) { this._chk(); return this._all(pred)[0] || null; }
    findAllWithCriteria({ types }) { this._chk(); return this._all((n) => types.includes(n.type)); }
    // ----- plugin data -----
    setPluginData(k, v) { this._data[k] = String(v); } getPluginData(k) { return this._data[k] || ''; }
    // ----- geometry -----
    get x() { return this._x; } set x(v) { this._x = v; } get y() { return this._y; } set y(v) { this._y = v; }
    get width() { return this._size('w'); } get height() { return this._size('h'); }
    set width(v) { fail('width is read-only; use resize()'); } set height(v) { fail('height is read-only; use resize()'); }
    resize(w, h) {
      if (!(w >= 0.01) || !(h >= 0.01)) fail(`Invalid size ${w}x${h}`);
      this._w = w; this._h = h; this._sz.w = 'FIXED'; this._sz.h = 'FIXED';
      if (AUTOLAYOUT(this)) { this.primaryAxisSizingMode = 'FIXED'; this.counterAxisSizingMode = 'FIXED'; }
      if (this.type === 'TEXT') this.textAutoResize = this.textAutoResize === 'WIDTH_AND_HEIGHT' ? 'NONE' : this.textAutoResize; // resize() resets auto-resize
    }
    resizeWithoutConstraints(w, h) { this.resize(w, h); }
    rescale(s) { if (!(s > 0)) fail('rescale needs a positive scale'); this._w *= s; this._h *= s; }
    _axisMode(ax) { // 'FIXED' | 'HUG' | 'FILL'
      if (AUTOLAYOUT(this)) { const horiz = this.layoutMode === 'HORIZONTAL'; const mode = (ax === 'w') === horiz ? this.primaryAxisSizingMode : this.counterAxisSizingMode; if (this._sz[ax] === 'FILL') return 'FILL'; return mode === 'AUTO' ? 'HUG' : 'FIXED'; }
      return this._sz[ax];
    }
    _intrinsic(ax) {
      if (this.type === 'TEXT') {
        const lines = this._chars.split('\n'); const cw = (this.fontSize || 12) * 0.55; const lh = this._lh || 16;
        if (ax === 'w') return Math.max(1, Math.max(...lines.map((l) => l.length)) * cw);
        if (this.textAutoResize === 'WIDTH_AND_HEIGHT') return lines.length * lh;
        const w = this._w; let n = 0; for (const l of lines) n += Math.max(1, Math.ceil((l.length * cw) / Math.max(w, 1))); return n * lh;
      }
      if (AUTOLAYOUT(this)) {
        const kids = this._children.filter((c) => c.visible && c.layoutPositioning !== 'ABSOLUTE');
        const horiz = this.layoutMode === 'HORIZONTAL'; const main = (ax === 'w') === horiz;
        const pad = ax === 'w' ? this.paddingLeft + this.paddingRight : this.paddingTop + this.paddingBottom;
        const sizes = kids.map((k) => (k._axisMode(ax) === 'FILL' ? k._intrinsicFill(ax) : k._size(ax)));
        if (main) return pad + sizes.reduce((a, b) => a + b, 0) + Math.max(0, kids.length - 1) * this.itemSpacing;
        return pad + (sizes.length ? Math.max(...sizes) : 0);
      }
      return ax === 'w' ? this._w : this._h;
    }
    _intrinsicFill(ax) { const m = this._axisMode; return this.type === 'TEXT' || AUTOLAYOUT(this) ? this._hugOnly(ax) : (ax === 'w' ? this._w : this._h); }
    _hugOnly(ax) { return this._intrinsic(ax); }
    _size(ax) {
      const mode = this._axisMode(ax);
      if (mode === 'FIXED') return ax === 'w' ? this._w : this._h;
      if (mode === 'HUG') return this._intrinsic(ax);
      const p = this._parent; if (!p || !AUTOLAYOUT(p) || p._guard) return this._intrinsic(ax);
      p._guard = true;
      try {
        if (p._axisMode(ax) === 'HUG') return this._intrinsic(ax);
        const horiz = p.layoutMode === 'HORIZONTAL'; const main = (ax === 'w') === horiz;
        const pad = ax === 'w' ? p.paddingLeft + p.paddingRight : p.paddingTop + p.paddingBottom; const inner = p._size(ax) - pad;
        if (!main) return inner;
        const kids = p._children.filter((c) => c.visible && c.layoutPositioning !== 'ABSOLUTE');
        let fixed = Math.max(0, kids.length - 1) * p.itemSpacing; let fills = 0;
        for (const k of kids) { if (k._axisMode(ax) === 'FILL') fills++; else fixed += k._size(ax); }
        return Math.max(1, (inner - fixed) / Math.max(fills, 1));
      } finally { p._guard = false; }
    }
    get layoutSizingHorizontal() { return this._axisMode('w'); } get layoutSizingVertical() { return this._axisMode('h'); }
    set layoutSizingHorizontal(v) { this._setSizing('w', v); } set layoutSizingVertical(v) { this._setSizing('h', v); }
    _setSizing(ax, v) {
      if (!['FIXED', 'HUG', 'FILL'].includes(v)) fail(`Expected 'FIXED' | 'HUG' | 'FILL', received '${v}'`);
      if (v === 'HUG' && !(AUTOLAYOUT(this) || this.type === 'TEXT')) fail(`layoutSizing${ax === 'w' ? 'Horizontal' : 'Vertical'} HUG can only be set on an auto-layout frame or a text node (${this.type} "${this.name}")`);
      if (v === 'FILL') {
        const p = this._parent;
        if (!p || !AUTOLAYOUT(p)) fail(`FILL can only be set on children of auto-layout frames ("${this.name}" has parent ${p ? p.type + ' "' + p.name + '"' : 'none'})`);
        if (this.layoutPositioning === 'ABSOLUTE') fail('FILL cannot be set on an absolutely positioned child');
      }
      if (AUTOLAYOUT(this) && v !== 'FILL') { const horiz = this.layoutMode === 'HORIZONTAL'; if ((ax === 'w') === horiz) this.primaryAxisSizingMode = v === 'HUG' ? 'AUTO' : 'FIXED'; else this.counterAxisSizingMode = v === 'HUG' ? 'AUTO' : 'FIXED'; }
      this._sz[ax] = v === 'HUG' && !AUTOLAYOUT(this) && this.type !== 'TEXT' ? 'FIXED' : v;
      if (this.type === 'TEXT' && v === 'HUG') this.textAutoResize = ax === 'w' ? 'WIDTH_AND_HEIGHT' : 'HEIGHT';
    }
    // ----- paint-ish read-only arrays -----
    get fills() { return Object.freeze(clone(this._fills)); } set fills(v) { this._paints('fills', v); }
    get strokes() { return Object.freeze(clone(this._strokes)); } set strokes(v) { this._paints('strokes', v); }
    get effects() { return Object.freeze(clone(this._effects)); } set effects(v) { if (!Array.isArray(v)) fail('effects must be an array'); this._effects = clone(v); }
    _paints(k, v) {
      if (!Array.isArray(v)) fail(`${k} must be an array`);
      for (const p of v) if (p.type === 'SOLID') { if (!p.color) fail('SOLID paint needs a colour'); if ('a' in p.color) fail('Invalid paint: SOLID colour takes r, g, b only (put alpha in opacity)'); for (const c of ['r', 'g', 'b']) if (!(p.color[c] >= 0 && p.color[c] <= 1)) fail('Colour channels are 0-1'); }
      this[k === 'fills' ? '_fills' : '_strokes'] = clone(v);
    }
    get cornerRadiusMixed() { return 0; }
    // ----- component info -----
    get description() { return this._desc; }
    set description(v) { if (this.type !== 'COMPONENT' && this.type !== 'COMPONENT_SET') fail(`description can only be set on components and component sets, not ${this.type}`); this._desc = v; }
    get componentPropertyReferences() { return clone(this._refs); }
    set componentPropertyReferences(v) {
      for (const [field, key] of Object.entries(v || {})) {
        if (!['characters', 'visible', 'mainComponent'].includes(field)) fail('Bad property reference field ' + field);
        const owner = this._owner(); if (!owner || !owner._defs || !owner._defs[key]) fail(`Property "${key}" is not defined on the component this node belongs to`);
        const t = owner._defs[key].type; if ((field === 'characters' && t !== 'TEXT') || (field === 'visible' && t !== 'BOOLEAN') || (field === 'mainComponent' && t !== 'INSTANCE_SWAP')) fail(`Property type ${t} cannot drive ${field}`);
        if (field === 'characters' && this.type !== 'TEXT') fail('characters reference needs a text node'); if (field === 'mainComponent' && this.type !== 'INSTANCE') fail('mainComponent reference needs an instance');
      }
      this._refs = clone(v);
    }
    _owner() { let p = this._parent; while (p && p.type !== 'COMPONENT' && p.type !== 'COMPONENT_SET' && p.type !== 'INSTANCE') p = p._parent; if (p && p.type === 'COMPONENT' && p._parent && p._parent.type === 'COMPONENT_SET') return p._parent; return p; }
    get componentPropertyDefinitions() {
      if (this.type === 'COMPONENT' && this._parent && this._parent.type === 'COMPONENT_SET') fail('Can only get component property definitions of a component set or non-variant component');
      if (this.type !== 'COMPONENT' && this.type !== 'COMPONENT_SET') fail('Not a component');
      return clone(this._defs);
    }
    addComponentProperty(name, type, def) {
      if (this.type === 'COMPONENT' && this._parent && this._parent.type === 'COMPONENT_SET') fail('Cannot add properties to a variant; add them to the component set');
      if (this.type !== 'COMPONENT' && this.type !== 'COMPONENT_SET') fail('addComponentProperty needs a component or component set');
      if (!['TEXT', 'BOOLEAN', 'INSTANCE_SWAP', 'VARIANT'].includes(type)) fail('Bad property type ' + type);
      if (type === 'INSTANCE_SWAP' && !nodes.get(def)) fail('INSTANCE_SWAP default must be the id of a component');
      if (type === 'BOOLEAN' && typeof def !== 'boolean') fail('BOOLEAN default must be boolean'); if (type === 'TEXT' && typeof def !== 'string') fail('TEXT default must be string');
      const key = `${name}#${++this._pc}:${this._pc}`; this._defs[key] = { type, defaultValue: def, name }; return key;
    }
    // ----- variables -----
    setBoundVariable(field, v) {
      if (!v || v.type !== 'VARIABLE') fail('setBoundVariable needs a variable');
      if (!BIND_NUMERIC.has(field)) fail(`Cannot bind field ${field}`); if (v.resolvedType !== 'FLOAT') fail(`Field ${field} needs a FLOAT variable`);
      this._bv[field] = v.id; const val = Object.values(v.valuesByMode)[0]; if (typeof val === 'number' && field !== 'width' && field !== 'height') this[field] = val;
    }
    // ----- styles -----
    async setTextStyleIdAsync(id) {
      if (this.type !== 'TEXT') fail('Not a text node'); const s = textStyles.find((x) => x.id === id); if (!s) fail('Unknown text style');
      if (!loadedFonts.has(s.fontName.family + '|' + s.fontName.style)) fail(`Cannot apply text style: font "${s.fontName.family} ${s.fontName.style}" is not loaded`);
      this._textStyleId = id; this.fontName = clone(s.fontName); this.fontSize = s.fontSize; this._lh = s.lineHeight.value;
    }
    async setEffectStyleIdAsync(id) { const s = effectStyles.find((x) => x.id === id); if (!s) fail('Unknown effect style'); this._effects = clone(s.effects); this._effectStyleId = id; }
    // ----- text -----
    get characters() { return this._chars; }
    set characters(v) {
      if (this.type !== 'TEXT') fail('characters needs a text node');
      if (!loadedFonts.has(this.fontName.family + '|' + this.fontName.style)) fail(`Cannot write to node with unloaded font "${this.fontName.family} ${this.fontName.style}". Please call figma.loadFontAsync() and await the returned promise first.`);
      this._chars = String(v);
    }
    // ----- component set / instance -----
    get defaultVariant() { if (this.type !== 'COMPONENT_SET') fail('defaultVariant is only on component sets'); return this._children[0]; }
    createInstance() {
      if (this.type !== 'COMPONENT') fail('createInstance needs a component'); if (this._removed) fail('component was removed');
      const i = copyNode(this, 'INSTANCE'); i._main = this.id; i._w = this._size('w'); i._h = this._size('h'); i._sz = { w: 'FIXED', h: 'FIXED' }; i.primaryAxisSizingMode = 'FIXED'; i.counterAxisSizingMode = 'FIXED';
      i._vals = {}; return i;
    }
    get mainComponent() { return this._main ? nodes.get(this._main) || null : null; }
    get componentProperties() {
      if (this.type !== 'INSTANCE') fail('componentProperties needs an instance');
      const main = this.mainComponent; if (!main) fail('Instance has no main component'); const out = {};
      if (main._parent && main._parent.type === 'COMPONENT_SET') {
        const opts = {}; for (const v of main._parent._children) for (const [k, val] of Object.entries(parseVariant(v.name))) (opts[k] ||= new Set()).add(val);
        for (const [k, val] of Object.entries(parseVariant(main.name))) out[k] = { type: 'VARIANT', value: val, variantOptions: [...opts[k]] };
      }
      const owner = main._parent && main._parent.type === 'COMPONENT_SET' ? main._parent : main;
      for (const [k, d] of Object.entries(owner._defs)) out[k] = { type: d.type, value: k in this._vals ? this._vals[k] : d.defaultValue };
      return out;
    }
    setProperties(map) {
      if (this.type !== 'INSTANCE') fail('setProperties needs an instance'); const cp = this.componentProperties;
      for (const [k, v] of Object.entries(map)) {
        const d = cp[k]; if (!d) fail(`Property "${k}" does not exist on this instance. Available: ${Object.keys(cp).join(', ')}`);
        if (d.type === 'VARIANT') {
          if (!d.variantOptions.includes(v)) fail(`Variant value "${v}" is not valid for ${k}`);
          const main = this.mainComponent; const want = { ...parseVariant(main.name), [k]: v };
          const t = main._parent._children.find((c) => { const pv = parseVariant(c.name); return Object.keys(want).every((x) => pv[x] === want[x]); });
          if (!t) fail(`No variant with ${JSON.stringify(want)} in ${main._parent.name}`);
          this._main = t.id; this._children.splice(0).forEach((c) => { c._parent = null; }); for (const c of t._children) { const cc = copyNode(c); cc._parent = this; this._children.push(cc); }
          for (const [vk, vv] of Object.entries(this._vals)) this._apply(vk, vv);
        } else if (d.type === 'TEXT') { if (typeof v !== 'string') fail('TEXT value must be a string'); this._vals[k] = v; this._apply(k, v); }
        else if (d.type === 'BOOLEAN') { if (typeof v !== 'boolean') fail('BOOLEAN value must be boolean'); this._vals[k] = v; this._apply(k, v); }
        else if (d.type === 'INSTANCE_SWAP') { if (!nodes.get(v) || nodes.get(v).type !== 'COMPONENT') fail('INSTANCE_SWAP value must be a component id'); this._vals[k] = v; this._apply(k, v); }
      }
    }
    _apply(key, val) {
      const walk = (n) => { for (const c of n._children) {
        const r = c._refs || {};
        if (r.characters === key) { if (!loadedFonts.has(c.fontName.family + '|' + c.fontName.style)) fail(`Cannot write to node with unloaded font "${c.fontName.family} ${c.fontName.style}"`); c._chars = val; }
        if (r.visible === key) c.visible = val;
        if (r.mainComponent === key) { const t = nodes.get(val); c._main = t.id; c._children.splice(0); for (const k of t._children) { const cc = copyNode(k); cc._parent = c; c._children.push(cc); } }
        if (c.type !== 'INSTANCE') walk(c);
      } };
      walk(this);
    }
    swapComponent(c) { this._main = c.id; }
  }
  const parseVariant = (name) => Object.fromEntries(name.split(',').map((s) => s.trim().split('=')));
  function copyNode(src, asType) {
    const n = new Node(asType || src.type); const keep = ['name', '_x', '_y', '_w', '_h', 'rotation', 'opacity', 'visible', 'layoutMode', 'primaryAxisSizingMode', 'counterAxisSizingMode', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'itemSpacing', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'layoutGrow', 'layoutPositioning', 'clipsContent', 'strokeWeight', 'strokeAlign', 'cornerRadius', 'constraints', ...TEXT_FIELDS];
    for (const k of keep) n[k] = clone(src[k]);
    n._sz = clone(src._sz); n._fills = clone(src._fills); n._strokes = clone(src._strokes); n._effects = clone(src._effects); n._bv = clone(src._bv); n._refs = clone(src._refs);
    if (src.type === 'TEXT') { for (const k of ['_chars', 'fontName', 'textAutoResize', '_textStyleId', 'fontSize', '_lh', 'textAlignHorizontal']) n[k] = clone(src[k]); }
    if (src.type === 'INSTANCE') { n._main = src._main; n._vals = clone(src._vals); }
    if (asType === 'INSTANCE') n.clipsContent = src.clipsContent;
    for (const c of src._children) { const cc = copyNode(c); cc._parent = n; n._children.push(cc); }
    return n;
  }

  // ---------- variables ----------
  const vname = new Set();
  const figma = {
    command, root: null, _log: log, _nodes: nodes, _collections: collections, _variables: variables, _textStyles: textStyles, _effectStyles: effectStyles,
    get currentPage() { return this._cur; }, set currentPage(v) { fail('Setting figma.currentPage is not supported. Use figma.setCurrentPageAsync(page) instead.'); },
    notify(m) { log.notes.push(m); return { cancel() {} }; },
    closePlugin(m) { if (log.closed !== null) fail('closePlugin called twice'); log.closed = m || ''; },
    async loadAllPagesAsync() { for (const p of this.root._children) p._loaded = true; },
    async setCurrentPageAsync(p) { if (p.type !== 'PAGE') fail('Not a page'); p._loaded = true; this._cur = p; },
    async listAvailableFontsAsync() { return available.flatMap(([family, styles]) => styles.map((style) => ({ fontName: { family, style } }))); },
    async loadFontAsync(f) { const ok = available.some(([fam, st]) => fam === f.family && st.includes(f.style)); if (!ok) fail(`Font not found: ${f.family} ${f.style}`); loadedFonts.add(f.family + '|' + f.style); },
    async getLocalTextStylesAsync() { return [...textStyles]; }, async getLocalEffectStylesAsync() { return [...effectStyles]; },
    async getNodeByIdAsync(id) { return nodes.get(id) || null; },
    createPage() { if (plan === 'free' && this.root._children.length >= 3) fail('Cannot add page: the Starter plan allows 3 pages per file'); const p = new Node('PAGE'); p.name = 'Page ' + (this.root._children.length + 1); p._loaded = true; p._parent = this.root; this.root._children.push(p); p.backgrounds = []; return p; },
    createFrame() { const n = new Node('FRAME'); n._fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; this._cur._children.push(n); n._parent = this._cur; return n; },
    createComponent() { const n = new Node('COMPONENT'); n._fills = []; this._cur._children.push(n); n._parent = this._cur; return n; },
    createRectangle() { const n = new Node('RECTANGLE'); n._fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }]; this._cur._children.push(n); n._parent = this._cur; return n; },
    createEllipse() { const n = new Node('ELLIPSE'); n._fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }]; this._cur._children.push(n); n._parent = this._cur; return n; },
    createText() { const n = new Node('TEXT'); n._fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; this._cur._children.push(n); n._parent = this._cur; return n; },
    createSection() { const n = new Node('SECTION'); this._cur._children.push(n); n._parent = this._cur; return n; },
    createNodeFromSvg(svg) {
      if (!/^<svg[\s>]/.test(svg)) fail('Invalid SVG'); const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/); const f = new Node('FRAME'); f.name = 'svg'; f._w = vb ? +vb[1] : 24; f._h = vb ? +vb[2] : 24;
      const v = new Node('VECTOR'); v.name = 'Vector'; v._fills = []; v._strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; v._w = f._w; v._h = f._h; v._parent = f; f._children.push(v);
      this._cur._children.push(f); f._parent = this._cur; return f;
    },
    combineAsVariants(comps, parent) {
      if (!comps.length) fail('combineAsVariants needs at least one component');
      for (const c of comps) { if (c.type !== 'COMPONENT') fail('combineAsVariants only accepts components'); if (c._parent !== parent) fail(`All variants must share the target parent (variant "${c.name}" is in "${c._parent && c._parent.name}", target is "${parent.name}")`); }
      const seen = new Set(); const keys0 = Object.keys(parseVariant(comps[0].name)).join('|');
      for (const c of comps) { if (seen.has(c.name)) fail('Duplicate variant name ' + c.name); seen.add(c.name); if (Object.keys(parseVariant(c.name)).join('|') !== keys0 && !Object.keys(parseVariant(c.name)).every((k) => keys0.split('|').includes(k))) fail('Inconsistent variant properties: ' + c.name); }
      const s = new Node('COMPONENT_SET'); s.name = comps[0].name; s._fills = []; parent._children.push(s); s._parent = parent;
      for (const c of comps) { parent._children.splice(parent._children.indexOf(c), 1); c._parent = s; s._children.push(c); }
      s._w = 100; s._h = 100; s._autoSize = true; return s;
    },
    variables: {
      async getLocalVariableCollectionsAsync() { return [...collections]; },
      async getLocalVariablesAsync(type) { return variables.filter((v) => !type || v.resolvedType === type); },
      createVariableCollection(name) {
        const c = { type: 'VARIABLE_COLLECTION', id: 'VariableCollectionId:' + uid++, name, modes: [{ modeId: 'm' + uid++, name: 'Mode 1' }], variableIds: [], removed: false,
          renameMode(id, n) { this.modes.find((m) => m.modeId === id).name = n; },
          addMode(n) { if (plan === 'free' && this.modes.length >= 1) fail('Limited to 1 mode on the Starter plan'); const m = { modeId: 'm' + uid++, name: n }; this.modes.push(m); return m.modeId; },
          remove() { this.removed = true; collections.splice(collections.indexOf(this), 1); for (const v of [...variables]) if (v.variableCollectionId === this.id) variables.splice(variables.indexOf(v), 1); } };
        collections.push(c); return c;
      },
      createVariable(name, coll, type) {
        const c = typeof coll === 'string' ? collections.find((x) => x.id === coll) : coll; if (!c) fail('Unknown collection');
        if (variables.some((v) => v.variableCollectionId === c.id && v.name === name)) fail(`Duplicate variable name "${name}" in collection "${c.name}"`);
        if (!['COLOR', 'FLOAT', 'STRING', 'BOOLEAN'].includes(type)) fail('Bad variable type');
        const v = { type: 'VARIABLE', id: 'VariableID:' + uid++, name, variableCollectionId: c.id, resolvedType: type, valuesByMode: {}, scopes: ['ALL_SCOPES'], codeSyntax: {}, description: '',
          setValueForMode(mode, val) { if (!c.modes.some((m) => m.modeId === mode)) fail('Unknown mode'); if (type === 'COLOR' && !(val && (val.type === 'VARIABLE_ALIAS' || ('r' in val)))) fail('COLOR value must be RGBA or alias'); if (type === 'FLOAT' && !(typeof val === 'number' || val.type === 'VARIABLE_ALIAS')) fail('FLOAT value must be a number'); this.valuesByMode[mode] = val; },
          setVariableCodeSyntax(p, s) { if (!['WEB', 'ANDROID', 'iOS'].includes(p)) fail('Bad platform'); if (p === 'WEB' && !/^var\(--[\w-]+\)$/.test(s)) fail('WEB code syntax must be var(--name): ' + s); this.codeSyntax[p] = s; }, remove() { variables.splice(variables.indexOf(this), 1); } };
        variables.push(v); c.variableIds.push(v.id); return v;
      },
      createVariableAlias(v) { if (!v || v.type !== 'VARIABLE') fail('createVariableAlias needs a variable'); return { type: 'VARIABLE_ALIAS', id: v.id }; },
      setBoundVariableForPaint(paint, field, v) {
        if (field !== 'color') fail('Only color can be bound on a paint'); if (paint.type !== 'SOLID') fail('Only solid paints can bind a colour'); if (!v || v.resolvedType !== 'COLOR') fail('Needs a COLOR variable');
        return { ...clone(paint), boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } };
      },
      setBoundVariableForEffect(effect, field, v) {
        if (effect.type !== 'DROP_SHADOW' && effect.type !== 'INNER_SHADOW') fail('Only shadows can bind a colour'); if (field !== 'color') fail('Only color can be bound'); if (!v || v.resolvedType !== 'COLOR') fail('Needs a COLOR variable');
        return { ...clone(effect), boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } };
      },
    },
    createTextStyle() { const s = { type: 'TEXT_STYLE', id: 'S:ts' + uid++, name: 'Style', fontName: { family: 'Inter', style: 'Regular' }, fontSize: 12, lineHeight: { unit: 'AUTO' }, letterSpacing: { unit: 'PERCENT', value: 0 }, textCase: 'ORIGINAL', description: '' };
      Object.defineProperty(s, 'fontName', { get() { return this._fn; }, set(v) { if (!loadedFonts.has(v.family + '|' + v.style)) fail(`Cannot set style font: "${v.family} ${v.style}" is not loaded`); this._fn = v; }, enumerable: true }); s._fn = { family: 'Inter', style: 'Regular' };
      textStyles.push(s); return s; },
    createEffectStyle() { const s = { type: 'EFFECT_STYLE', id: 'S:es' + uid++, name: 'Style', effects: [], description: '' }; effectStyles.push(s); return s; },
  };
  const doc = new Node('DOCUMENT'); figma.root = doc;
  const page = new Node('PAGE'); page.name = 'Page 1'; page._loaded = false; page._parent = doc; doc._children.push(page); page.backgrounds = [];
  figma._cur = page;
  // the "real" Figma starts with page 1 loaded for the plugin's current page only
  page._loaded = true;
  for (const p of [page]) p.setPluginData = Node.prototype.setPluginData;
  figma.__proto = Node;
  return figma;
}
