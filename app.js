'use strict';
const colors = [
  ['red','#df5360'], ['orange','#ef9745'], ['yellow','#e9bf46'], ['green','#4e996d'],
  ['blue','#558bc8'], ['purple','#9675b5'], ['black','#303641'], ['white','#fff']
];
const majorCodes = new Set('cn us gb fr de jp kr ca au in ru br it es mx za'.split(' '));
const hidden = new Set();
const $ = id => document.getElementById(id);
let sort = 'color', hideMajor = false, lastHidden = null, toastTimer;
const languageIds = LANGUAGES.map(([id]) => id);
function matchLanguage(value) {
  if (typeof value !== 'string') return null;
  if (languageIds.includes(value)) return value;
  const code = value.toLowerCase();
  if (code.startsWith('zh')) return /tw|hk|mo|hant/.test(code) ? 'zh-TW' : 'zh-CN';
  return languageIds.find(id => id === code.split('-')[0]) || null;
}
function initialLanguage() {
  try { const saved = localStorage.getItem('flag-cheatsheet-language'); if (languageIds.includes(saved)) return saved; } catch {}
  for (const candidate of (typeof navigator !== 'undefined' ? navigator.languages || [navigator.language] : [])) {
    const match = matchLanguage(candidate); if (match) return match;
  }
  return 'zh-CN';
}
let language = initialLanguage();
const nameCaches = new Map();
function namesFor(locale) {
  if (!nameCaches.has(locale)) {
    const display = new Intl.DisplayNames([locale], {type:'region'});
    nameCaches.set(locale, new Map(COUNTRIES.map(c => [c.code, display.of(c.code.toUpperCase()) || c.name])));
  }
  return nameCaches.get(locale);
}
function countryName(c) { return namesFor(language).get(c.code); }
function englishName(c) { return namesFor('en').get(c.code); }
function t(key, values = {}) {
  return TRANSLATIONS[language][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
}
function collationLocale() { return language.startsWith('zh') ? language + '-u-co-pinyin' : language; }
function compareCountries(a, b) {
  return countryName(a).localeCompare(countryName(b), collationLocale()) || a.code.localeCompare(b.code);
}
function visibleCountries() {
  return COUNTRIES.filter(c => !hidden.has(c.code) && !(hideMajor && majorCodes.has(c.code))).sort(compareCountries);
}
function element(tag, cls, txt) {
  const e = document.createElement(tag); if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt; return e;
}
function dot(key) {
  const d = element('span','dot'); d.style.background = colors.find(x => x[0] === key)?.[1] || '#aaa';
  d.setAttribute('aria-hidden','true'); return d;
}
function applyTranslations() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = 'Name the Flag — ' + t('title');
  document.querySelector('meta[name="description"]').content = t('description');
  $('language-select').value = language;
  $('language-label').textContent = t('language');
  document.querySelector('.brand').setAttribute('aria-label', t('home'));
  for (const [selector, key] of Object.entries({
    '#page-title':'title', '.eyebrow':'eyebrow', '.intro-copy':'intro', '.total span':'total',
    '.control-label':'sort', '#restore':'restore', '.method-note':'method',
    '#dialog-title':'dialogTitle', '.dialog-copy':'dialogCopy', '#dialog-done':'done', '#undo':'undo'
  })) document.querySelector(selector).textContent = t(key);
  for (const e of document.querySelectorAll('[data-i18n]')) e.textContent = t(e.getAttribute('data-i18n'));
  document.querySelector('.controls').setAttribute('aria-label', t('options'));
  document.querySelector('.segmented').setAttribute('aria-label', t('sort'));
  $('group-nav').setAttribute('aria-label', t('jump'));
  $('close-dialog').setAttribute('aria-label', t('close'));
  document.querySelector('.az-icon').textContent = /^(zh|ja|ko)/.test(language) ? '↓' : language === 'ar' ? 'أ↓ي' : 'A↓Z';
  if (lastHidden) $('toast-text').textContent = t('hidden', {name: countryName(COUNTRIES.find(c => c.code === lastHidden))});
  const list = document.createDocumentFragment();
  for (const c of COUNTRIES.filter(c => majorCodes.has(c.code)).sort(compareCountries)) {
    const item = element('div','major-country'), img = element('img');
    img.src = `flags/${c.code}.png`; img.alt = ''; item.append(img, element('span',null,countryName(c))); list.append(item);
  }
  $('major-list').replaceChildren(list);
}
function countryGroups(visible) {
  if (sort === 'color') return colors.map(([key], index) => ({key, label:TRANSLATIONS[language].colors[index], items:visible.filter(c => c.color === key)}));
  // CJK names are collated in the selected locale, without inventing phonetic readings.
  if (/^(zh|ja|ko)/.test(language)) return [{key:'names', label:t('names'), items:visible}];
  const groups = new Map();
  for (const c of visible) {
    const initial = Array.from(countryName(c))[0].normalize('NFD').replace(/\p{M}/gu,'').toLocaleUpperCase(language);
    if (!groups.has(initial)) groups.set(initial, {key:'initial-' + initial.codePointAt(0).toString(16), label:initial, items:[]});
    groups.get(initial).items.push(c);
  }
  return [...groups.values()];
}
function render() {
  const visible = visibleCountries(); $('total').textContent = COUNTRIES.length;
  $('count').textContent = t('shown',{count:visible.length,total:COUNTRIES.length}) + ' · ' + t(sort === 'color' ? 'colorOrder' : 'alphaOrder');
  $('restore').hidden = hidden.size === 0 && !hideMajor;
  for (const key of ['color','alpha']) {
    $('sort-' + key).classList.toggle('selected', sort === key);
    $('sort-' + key).setAttribute('aria-pressed', String(sort === key));
  }
  $('major-toggle').checked = hideMajor;
  const groups = countryGroups(visible), nav = document.createDocumentFragment(), content = document.createDocumentFragment();
  for (const g of groups) {
    if (!g.items.length) continue;
    const anchor = element('a'); anchor.href = '#group-' + g.key;
    if (sort === 'color') anchor.append(dot(g.key)); anchor.append(g.label); nav.append(anchor);
    const section = element('section','flag-section'); section.id = 'group-' + g.key;
    const heading = element('div','section-heading'); if (sort === 'color') heading.append(dot(g.key));
    heading.append(element('h2',null,g.label),element('span','section-count',String(g.items.length)),element('span','section-rule')); section.append(heading);
    const grid = element('div','flag-grid');
    for (const c of g.items) {
      const card = element('article','flag-card'); card.dataset.code = c.code;
      const btn = element('button','hide-card','×'); btn.setAttribute('aria-label',t('hide',{name:countryName(c)})); btn.title = t('hide',{name:countryName(c)});
      btn.addEventListener('click',() => hideCountry(c.code));
      const visual = element('div','flag-visual'), img = element('img','flag-image'); img.src = `flags/${c.code}.png`;
      img.alt = t('flag',{name:countryName(c)}); img.loading = 'lazy'; img.decoding = 'async'; img.width = c.width; img.height = c.height; visual.append(img);
      const info = element('div','card-info'), name = element('h3','country-en',countryName(c)); name.lang = language; info.append(name);
      const bottom = element('div','country-bottom'), secondary = element('span','country-zh',englishName(c));
      secondary.lang = 'en'; secondary.dir = 'ltr'; secondary.hidden = language === 'en'; bottom.append(secondary);
      const palette = element('span','palette'); palette.title = t('palette');
      for (const color of c.palette) palette.append(dot(color)); bottom.append(palette); info.append(bottom);
      card.append(btn,visual,info); grid.append(card);
    }
    section.append(grid); content.append(section);
  }
  $('group-nav').replaceChildren(nav); $('group-nav').hidden = sort === 'alpha' && /^(zh|ja|ko)/.test(language);
  $('collection').replaceChildren(content);
  if (!visible.length) $('collection').append(element('div','empty-state',t('empty')));
}
function setLanguage(value, remember = true) {
  if (!languageIds.includes(value)) throw new Error('Unsupported language');
  language = value; if (remember) { try { localStorage.setItem('flag-cheatsheet-language',value); } catch {} }
  applyTranslations(); render();
}
function setSort(value) { if (!['color','alpha'].includes(value)) throw new Error('Invalid sort'); sort = value; render(); }
function hideCountry(code) {
  const c = COUNTRIES.find(c => c.code === code); if (!c) throw new Error('Unknown country code');
  const cards = [...document.querySelectorAll('.flag-card')].map(card => card.dataset.code), index = cards.indexOf(code);
  hidden.add(code); lastHidden = code; render();
  const next = cards[index + 1] || cards[index - 1]; if (next) document.querySelector(`[data-code="${next}"] .hide-card`)?.focus({preventScroll:true});
  $('toast-text').textContent = t('hidden',{name:countryName(c)}); $('toast').hidden = false; clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').hidden = true, 6000);
}
for (const [id, label] of LANGUAGES) { const option = element('option',null,label); option.value = id; option.lang = id; $('language-select').append(option); }
$('language-select').onchange = e => setLanguage(e.target.value);
$('sort-color').onclick = () => setSort('color'); $('sort-alpha').onclick = () => setSort('alpha');
$('major-toggle').onchange = e => { hideMajor = e.target.checked; render(); };
$('restore').onclick = () => { hidden.clear(); hideMajor = false; lastHidden = null; $('toast').hidden = true; render(); };
$('undo').onclick = () => { if (lastHidden) { hidden.delete(lastHidden); lastHidden = null; render(); } $('toast').hidden = true; };
$('manage').onclick = () => $('major-dialog').showModal();
$('close-dialog').onclick = $('dialog-done').onclick = () => $('major-dialog').close();
$('major-dialog').addEventListener('click', e => {
  if (e.target === $('major-dialog')) { const r = e.target.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close(); }
});
setLanguage(language,false);
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const tool = {
    name:'configure_flag_cheatsheet', title:'Configure flag cheatsheet',
    description:'Set language, sort by dominant color or localized name, hide the major-country preset, and hide or restore countries. Updates the visible interface.',
    inputSchema:{type:'object',properties:{language:{type:'string',enum:languageIds},sort:{type:'string',enum:['color','alpha']},hideMajor:{type:'boolean'},hideCodes:{type:'array',items:{type:'string'}},restoreCodes:{type:'array',items:{type:'string'}}},additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Expected object');
      if (Object.keys(input).some(k => !['language','sort','hideMajor','hideCodes','restoreCodes'].includes(k))) throw new Error('Unknown option');
      if (input.language !== undefined && !languageIds.includes(input.language)) throw new Error('Unsupported language');
      if (input.sort !== undefined && !['color','alpha'].includes(input.sort)) throw new Error('Invalid sort');
      if (input.hideMajor !== undefined && typeof input.hideMajor !== 'boolean') throw new Error('Invalid hideMajor');
      for (const key of ['hideCodes','restoreCodes']) if (input[key] !== undefined && (!Array.isArray(input[key]) || input[key].some(code => !COUNTRIES.some(c => c.code === code)))) throw new Error('Invalid country code');
      if (input.sort !== undefined) sort = input.sort; if (input.hideMajor !== undefined) hideMajor = input.hideMajor;
      for (const code of input.hideCodes || []) hidden.add(code); for (const code of input.restoreCodes || []) hidden.delete(code);
      if (input.language !== undefined) setLanguage(input.language); else render();
      return {language,sort,hideMajor,visible:visibleCountries().length,hiddenCodes:[...hidden]};
    }
  };
  try { Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(() => {}); } catch {}
  window.addEventListener('pagehide',() => lifecycle.abort(),{once:true});
}
