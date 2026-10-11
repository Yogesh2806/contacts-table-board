// Bundles the plugin and runs it against the mock Figma API in several scenarios.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createFigma } from './mock-figma.mjs';

const root = new URL('..', import.meta.url).pathname;
execSync('node scripts/gen-data.mjs && npx esbuild src/code.ts --bundle --format=iife --target=es2017 --outfile=code.js --log-level=warning', { cwd: root, stdio: 'inherit' });
const code = readFileSync(root + 'code.js', 'utf8');

async function run(figma) {
  const errs = [];
  const ctx = vm.createContext({ figma, console: { log() {}, warn: (...a) => { if (process.env.SHOW) errs.push(a.join(' ')); }, error: (...a) => errs.push(a.join(' ')) }, setTimeout, clearTimeout, Promise, Math, JSON, Object, Array, Set, Map, String, Number, Error, RegExp, Date, parseInt, parseFloat, isNaN });
  vm.runInContext(code, ctx);
  for (let i = 0; i < 4000 && figma._log.closed === null; i++) await new Promise((r) => setImmediate(r));
  return errs;
}
let failed = 0;
const check = (ok, msg) => { if (!ok) { failed++; console.log('  FAIL ' + msg); } else console.log('  ok   ' + msg); };

function walk(n, fn) { fn(n); for (const c of n._children || []) walk(c, fn); }
function stats(f) {
  let tagged = 0, total = 0, sets = 0, comps = 0, insts = 0, sections = 0, unboundSolid = 0;
  walk(f.root, (n) => {
    if (n.type === 'DOCUMENT' || n.type === 'PAGE') return;
    total++; if (n._data && n._data.generated === '1') tagged++;
    if (n.type === 'COMPONENT_SET') sets++; if (n.type === 'COMPONENT') comps++; if (n.type === 'INSTANCE') insts++; if (n.type === 'SECTION') sections++;
  });
  return { tagged, total, sets, comps, insts, sections, vars: f._variables.length, cols: f._collections.length, ts: f._textStyles.length, es: f._effectStyles.length, pages: f.root._children.map((p) => p.name) };
}
function libraryAudit(f) {
  const comp = f.root._children.find((p) => p.name === 'Components');
  let unboundFill = 0, unstyledText = 0, texts = 0, zero = 0;
  walk(comp, (n) => {
    if (n.type === 'COMPONENT' && !n.name.startsWith('Icon/')) walk(n, (m) => {
      if (m === n) return;
      if (m.type === 'TEXT') { texts++; if (!m._textStyleId) unstyledText++; }
      for (const p of m._fills || []) if (p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) unboundFill++;
      if (m._w === 0 || m._h === 0) zero++;
    });
  });
  return { unboundFill, unstyledText, texts, zero };
}
function audit(f) {
  const allScopes = f._variables.filter((v) => (v.scopes || []).includes('ALL_SCOPES') && !v.name.startsWith('__'));
  const noSyntax = f._variables.filter((v) => !(v.codeSyntax && v.codeSyntax.WEB));
  return { allScopes: allScopes.length, noSyntax: noSyntax.length };
}

for (const plan of ['paid', 'free']) {
  console.log(`\n== ${plan} plan: first Build ==`);
  const f = createFigma({ plan, command: 'build' });
  const errs = await run(f);
  if (errs.length) console.log(errs.slice(0, 40).join('\n'));
  check(f._log.closed !== null, 'closePlugin called');
  console.log('  message:', f._log.closed);
  check(f._log.closed && !/failed/.test(f._log.closed), 'no failure message');
  const s1 = stats(f); console.log('  ', JSON.stringify(s1));
  const a = audit(f);
  check(a.allScopes === 0, 'no ALL_SCOPES variables');
  check(a.noSyntax === 0, 'every variable has WEB code syntax');
  check(s1.pages.length === 3, '3 pages');
  check(plan === 'free' ? s1.cols === 6 : s1.cols === 4, `collections: ${s1.cols}`);
  check(s1.sets >= 22, `component sets: ${s1.sets}`);
  const overlaps = [];
  for (const p of f.root._children) { const sec = p._children.filter((c) => c.type === 'SECTION').sort((a, b) => a._y - b._y); for (let i = 1; i < sec.length; i++) if (sec[i]._y < sec[i - 1]._y + sec[i - 1]._h) overlaps.push(p.name + ': ' + sec[i - 1].name + ' / ' + sec[i].name); }
  check(overlaps.length === 0, 'no overlapping sections ' + overlaps.slice(0, 3).join('; '));
  const la = libraryAudit(f); console.log('  ', JSON.stringify(la));
  check(la.unstyledText === 0, 'every text layer in components uses a text style');
  check(la.unboundFill === 0, 'every solid fill in components is bound to a variable');
  check(la.zero === 0, 'no zero-size layers in components');
  check(s1.ts > 0 && s1.es > 0, 'text and shadow styles created');

  console.log(`== ${plan}: second Build (should add nothing) ==`);
  f._log.closed = null; f.command = 'build';
  const e2 = await run(f);
  if (e2.length) console.log(e2.slice(0, 5).join('\n'));
  const s2 = stats(f);
  check(f._log.closed !== null && !/failed/.test(f._log.closed), 'second run finished');
  check(s2.total === s1.total && s2.vars === s1.vars && s2.ts === s1.ts && s2.es === s1.es, `idempotent (nodes ${s1.total} → ${s2.total}, vars ${s1.vars} → ${s2.vars})`);

  console.log(`== ${plan}: Rebuild with a hand-made section ==`);
  const comp = f.root._children.find((p) => p.name === 'Components');
  await f.setCurrentPageAsync(comp);
  const mine = f.createSection(); mine.name = 'My hand-built section'; 
  f._log.closed = null; f.command = 'rebuild';
  const e3 = await run(f);
  if (e3.length) console.log(e3.slice(0, 5).join('\n'));
  const s3 = stats(f);
  check(f._log.closed !== null && !/failed/.test(f._log.closed), 'rebuild finished');
  check(comp._children.includes(mine), 'hand-built section left alone');
  check(Math.abs(s3.total - (s1.total + 1)) <= 2, `rebuild matches first build (nodes ${s1.total}+1 → ${s3.total})`);
}
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
