// Run: node tests/export.test.js  (no dependencies)
// Checks the structure of the one-page PDF written by js/export.js: header, object offsets in the
// cross-reference table, stream lengths and page size, so PDF readers open the file without repair.
const assert = require('assert');
const { buildPdf } = require('../js/export.js');

const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 0x0a, 0x0d, 0, 255, 0xff, 0xd9]); // bytes only; not decoded
const out = buildPdf(jpeg, 1654, 2339, 595.28, 841.89, 'פרופיל ההשפעה שלי');
const s = Buffer.from(out).toString('latin1');

assert.ok(s.startsWith('%PDF-1.4\n'), 'header');
assert.ok(s.endsWith('%%EOF\n'), 'trailer');

// startxref points at the xref table
const startxref = +s.match(/startxref\n(\d+)\n%%EOF\n$/)[1];
assert.strictEqual(s.slice(startxref, startxref + 4), 'xref');

// every xref entry points at the start of its object
const entries = s.slice(startxref).match(/^\d{10} \d{5} [nf] \n/gm);
assert.strictEqual(entries.length, 7, 'free entry + 6 objects');
entries.slice(1).forEach((e, i) => {
  const off = +e.slice(0, 10);
  assert.strictEqual(s.slice(off, off + `${i + 1} 0 obj`.length), `${i + 1} 0 obj`, `object ${i + 1} offset`);
});
entries.forEach(e => assert.strictEqual(e.length, 20, 'xref entries are 20 bytes'));

// image stream: declared length equals the JPEG bytes, which are embedded unchanged
const img = s.match(/\/Length (\d+) >>\nstream\n/);
assert.strictEqual(+img[1], jpeg.length);
const at = img.index + img[0].length;
assert.deepStrictEqual(Array.from(out.slice(at, at + jpeg.length)), Array.from(jpeg));
assert.ok(/\/Width 1654 \/Height 2339 /.test(s));

// content stream length and A4 page box
const content = s.match(/5 0 obj\n<< \/Length (\d+) >>\nstream\n([\s\S]*?)\nendstream/);
assert.strictEqual(+content[1], content[2].length);
assert.ok(s.includes('/MediaBox [0 0 595.28 841.89]'));
assert.ok(content[2].includes('595.28 0 0 841.89 0 0 cm'));

// Hebrew title as UTF-16BE with BOM
assert.ok(s.includes('/Title <FEFF05E405E805D505E405D905DC'), 'title');

console.log('PDF export: all checks passed');
