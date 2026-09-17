const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {JSDOM, VirtualConsole} = require('jsdom');
const root = path.resolve(__dirname, '..');

function setup(t, {savedColumns, mobile = false} = {}) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'https://wchen-ai.github.io/name-the-flag/', runScripts: 'outside-only', virtualConsole
  });
  const {window} = dom;
  window.matchMedia = () => ({matches: mobile});
  window.localStorage.setItem('flag-cheatsheet-language', 'en');
  if (savedColumns !== undefined) window.localStorage.setItem('flag-cheatsheet-columns', savedColumns);
  const scrolls = [];
  window.HTMLElement.prototype.scrollIntoView = function (options) { scrolls.push({id: this.id, options}); };
  for (const file of ['data.js', 'locales.js', 'patterns.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), dom.getInternalVMContext(), {filename: file});
  }
  t.after(() => { window.close(); assert.deepEqual(errors, []); });
  return {window, document: window.document, scrolls, dom};
}

test('column radios sync across both panels and remember the choice', t => {
  const {document, window} = setup(t);
  for (const count of [2, 3, 4]) {
    document.querySelector(`[name="main-columns"][value="${count}"]`).click();
    assert.equal(document.documentElement.dataset.columns, String(count));
    assert.equal(document.documentElement.style.getPropertyValue('--flag-columns'), String(count));
    assert.equal(window.localStorage.getItem('flag-cheatsheet-columns'), String(count));
    assert.equal(document.querySelector('[name="floating-columns"]:checked').value, String(count));
  }
  document.querySelector('[name="floating-columns"][value="3"]').click();
  assert.equal(document.querySelector('[name="main-columns"]:checked').value, '3');
});

test('saved column count is restored and invalid values fall back on mobile', t => {
  assert.equal(setup(t, {savedColumns: '3'}).document.documentElement.dataset.columns, '3');
  assert.equal(setup(t, {savedColumns: '999', mobile: true}).document.documentElement.dataset.columns, '2');
});

test('pattern selection combines with hiding and restores all results', t => {
  const {document} = setup(t);
  const choose = id => document.querySelector(`#view-controls [data-pattern="${id}"]`).click();
  const has = code => !!document.querySelector(`.flag-card[data-code="${code}"]`);
  choose('cross');
  assert.ok(has('dk')); assert.ok(has('gb')); assert.ok(!has('fr')); assert.ok(!has('jp'));
  choose('horizontal');
  assert.ok(has('de')); assert.ok(has('dk')); assert.ok(!has('fr'));
  document.getElementById('major-toggle').click();
  assert.ok(!has('gb')); assert.ok(!has('de')); assert.ok(has('dk'));
  document.querySelector('[data-code="dk"] .hide-card').click();
  assert.ok(!has('dk'));
  document.getElementById('undo').click();
  assert.ok(has('dk'));
  document.getElementById('restore').click();
  assert.equal(document.querySelectorAll('.flag-card').length, 195);
  assert.equal(document.querySelector('#view-controls [data-pattern="all"]').getAttribute('aria-pressed'), 'true');
});

test('floating color selection survives pointer blur and jumps from name sorting', t => {
  const {document, window, scrolls} = setup(t);
  document.getElementById('sort-alpha').click();
  document.getElementById('color-picker-toggle').click();
  const panel = document.getElementById('color-picker');
  document.activeElement.dispatchEvent(new window.FocusEvent('focusout', {bubbles:true, relatedTarget:null}));
  assert.equal(panel.hidden, false, 'blur before a touch click must not dismiss the panel');
  document.querySelector('[data-color="blue"] .dot').click();
  assert.equal(panel.hidden, true);
  assert.equal(scrolls.at(-1).id, 'group-blue');
  assert.equal(document.getElementById('sort-color').getAttribute('aria-pressed'), 'true');
  assert.equal(document.activeElement.closest('section').id, 'group-blue');
  for (const button of [...document.querySelectorAll('#color-picker-options button:not(:disabled)')]) {
    document.getElementById('color-picker-toggle').click();
    button.click();
    assert.equal(scrolls.at(-1).id, 'group-' + button.dataset.color);
    assert.equal(panel.hidden, true);
  }
});

test('floating pattern selection stays open, then color jump uses filtered results', t => {
  const {document, scrolls} = setup(t);
  document.getElementById('color-picker-toggle').click();
  document.querySelector('#floating-view-controls [data-pattern="cross"]').click();
  assert.equal(document.getElementById('color-picker').hidden, false);
  assert.equal(document.querySelector('#view-controls [data-pattern="cross"]').getAttribute('aria-pressed'), 'true');
  assert.equal(document.querySelector('[data-color="orange"]').disabled, true);
  document.querySelector('[data-color="blue"]').click();
  assert.equal(scrolls.at(-1).id, 'group-blue');
  assert.ok(!document.querySelector('[data-code="fr"]'));
});

test('empty results remain recoverable through the floating panel and Restore all', t => {
  const {document} = setup(t);
  document.querySelector('#view-controls [data-pattern="cross"]').click();
  for (const button of [...document.querySelectorAll('.hide-card')]) button.click();
  assert.equal(document.querySelectorAll('.flag-card').length, 0);
  assert.match(document.querySelector('.empty-state').textContent, /No matching flags/);
  assert.equal(document.getElementById('floating-colors').hidden, false);
  assert.equal(document.getElementById('restore').hidden, false);
  document.getElementById('restore').click();
  assert.equal(document.querySelectorAll('.flag-card').length, 195);
});

test('all languages translate new controls and Arabic keeps right-to-left direction', t => {
  const {document, window} = setup(t);
  for (const option of document.querySelectorAll('#language-select option')) {
    const select = document.getElementById('language-select'); select.value = option.value;
    select.dispatchEvent(new window.Event('change'));
    for (const label of document.querySelectorAll('.view-controls [data-i18n]')) {
      assert.ok(label.textContent.length > 0); assert.ok(!label.textContent.includes('undefined'));
    }
    assert.equal(document.documentElement.dir, option.value === 'ar' ? 'rtl' : 'ltr');
  }
});

test('pattern metadata uses known codes and supports overlapping visual features', t => {
  const {dom} = setup(t);
  const result = vm.runInContext(`({
    invalid: Object.values(FLAG_PATTERNS).flat().filter(code => !COUNTRIES.some(c => c.code === code)),
    duplicates: Object.values(FLAG_PATTERNS).some(codes => new Set(codes).size !== codes.length),
    india: ['horizontal', 'center'].every(id => patternCountries.get(id).has('in')),
    france: patternCountries.get('vertical').has('fr') && !patternCountries.get('horizontal').has('fr')
  })`, dom.getInternalVMContext());
  assert.equal(result.invalid.length, 0); assert.equal(result.duplicates, false);
  assert.ok(result.india); assert.ok(result.france);
});

test('Escape restores trigger focus and outside pointer clicks dismiss the menu', t => {
  const {document, window} = setup(t);
  const toggle = document.getElementById('color-picker-toggle');
  toggle.click();
  document.activeElement.dispatchEvent(new window.KeyboardEvent('keydown', {key:'Escape', bubbles:true}));
  assert.equal(document.getElementById('color-picker').hidden, true);
  assert.equal(document.activeElement, toggle);
  toggle.click();
  document.body.dispatchEvent(new window.Event('pointerdown', {bubbles:true}));
  assert.equal(document.getElementById('color-picker').hidden, true);
});
