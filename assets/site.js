'use strict';
const groups = {
  'Pengantar': [['README.md','Ringkasan proyek'],['DESIGN.md','Sistem desain'],['PUBLIC-NOTICE.md','Pemberitahuan publik'],['docs/README.md','Pusat dokumentasi']],
  'Spesifikasi': [['docs/specs/01-system-overview.md','Gambaran sistem'],['docs/specs/02-functional-requirements.md','Kebutuhan fungsional'],['docs/specs/03-data-and-workflows.md','Data dan alur kerja'],['docs/specs/04-security-and-privacy.md','Keamanan dan privasi'],['docs/specs/05-ui-content-contracts.md','Kontrak UX dan konten']],
  'Rencana': [['docs/plans/01-deployment.md','Deployment'],['docs/plans/02-testing-qa.md','Pengujian dan QA'],['docs/plans/03-github-portfolio.md','Repositori GitHub'],['docs/plans/04-maintenance-roadmap.md','Pemeliharaan']],
  'Struktur': [['docs/structures/01-architecture.md','Arsitektur'],['docs/structures/02-file-structure.md','Struktur dokumentasi'],['docs/structures/03-frontend-map.md','Antarmuka'],['docs/structures/04-backend-map.md','Layanan data'],['docs/structures/05-private-technical-documentation.md','Batas dokumentasi'],['docs/structures/06-component-overview.md','Gambaran komponen']]
};
const entries = Object.entries(groups).flatMap(([group, docs]) => docs.map(([path, title]) => ({group, path, title})));
const byPath = new Map(entries.map(doc => [doc.path, doc]));
const article = document.querySelector('#article'), status = document.querySelector('#status'), retry = document.querySelector('#retry');
const nav = document.querySelector('#nav-list'), toc = document.querySelector('#toc'), menu = document.querySelector('#menu-button');
let activePath = 'README.md', sequence = 0;
for (const [group, docs] of Object.entries(groups)) {
  const heading = document.createElement('p'); heading.className = 'nav-group'; heading.textContent = group.toUpperCase(); nav.append(heading);
  for (const [path, title] of docs) {
    const link = document.createElement('a'); link.href = `?doc=${encodeURIComponent(path)}`; link.dataset.doc = path; link.textContent = title; nav.append(link);
  }
}
function updateUrl(path, hash = '', replace = false) {
  const url = new URL(location.href); url.search = ''; url.searchParams.set('doc', path); url.hash = hash;
  history[replace ? 'replaceState' : 'pushState'](null, '', url);
}
function resolveLink(href, current) {
  try {
    const base = new URL(current, document.baseURI), url = new URL(href, base), root = new URL('.', document.baseURI);
    if (url.origin !== root.origin) return url.protocol === 'https:' || url.protocol === 'http:' || url.protocol === 'mailto:' ? {external: url.href} : null;
    if (!url.pathname.startsWith(root.pathname)) return null;
    let path = decodeURIComponent(url.pathname.slice(root.pathname.length));
    if (path.endsWith('/')) path = byPath.has(`${path}README.md`) ? `${path}README.md` : entries.find(doc => doc.path.startsWith(path))?.path;
    if (!byPath.has(path)) return null;
    return {path, hash: url.hash};
  } catch { return null; }
}
function setLinks(path) {
  article.querySelectorAll('a[href]').forEach(link => {
    const target = resolveLink(link.getAttribute('href'), path);
    if (!target) { link.removeAttribute('href'); return; }
    if (target.external) { link.href = target.external; link.rel = 'noopener noreferrer'; link.target = '_blank'; }
    else { const url = new URL(location.href); url.search = ''; url.searchParams.set('doc', target.path); url.hash = target.hash; link.href = url.href; link.dataset.doc = target.path; }
  });
  article.querySelectorAll('img').forEach(image => image.remove());
}
function makeToc() {
  toc.replaceChildren(); const used = new Map();
  article.querySelectorAll('h1,h2,h3,h4').forEach(heading => {
    const base = heading.textContent.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-') || 'bagian';
    const count = used.get(base) || 0; used.set(base, count + 1); heading.id = count ? `${base}-${count}` : base;
    if (heading.tagName === 'H2' || heading.tagName === 'H3') { const link = document.createElement('a'); link.href = `#${heading.id}`; link.textContent = heading.textContent; toc.append(link); }
  });
}
async function render(path, hash = '') {
  const request = ++sequence, doc = byPath.get(path); activePath = path;
  clearDiagrams();
  article.replaceChildren(); toc.replaceChildren(); retry.hidden = true; status.hidden = false;
  nav.querySelectorAll('a').forEach(link => link.toggleAttribute('aria-current', false));
  if (!doc) { status.textContent = 'Dokumen tidak ditemukan.'; return; }
  document.querySelector('#current-group').textContent = doc.group.toUpperCase(); document.title = `${doc.title} — Dokumentasi Portal Rekrutmen`;
  nav.querySelectorAll('a').forEach(link => { if (link.dataset.doc === path) link.setAttribute('aria-current', 'page'); });
  status.textContent = 'Memuat dokumentasi…';
  try {
    if (!window.marked || !window.DOMPurify) throw new Error('renderer');
    const response = await fetch(new URL(doc.path, document.baseURI)); if (!response.ok) throw new Error('fetch');
    const markdown = await response.text(); if (request !== sequence) return;
    const parsed = marked.parse(markdown, {gfm:true});
    article.innerHTML = DOMPurify.sanitize(parsed, {FORBID_TAGS:['style','form','iframe','svg','math'], FORBID_ATTR:['style']});
    setLinks(path); makeToc(); status.hidden = true;
    await renderDiagrams(article);
    if (request !== sequence) return;
    if (hash) { const id = decodeURIComponent(hash.slice(1)); document.getElementById(id)?.scrollIntoView(); }
  } catch { if (request !== sequence) return; status.textContent = 'Dokumentasi tidak dapat dimuat. Periksa koneksi dan coba lagi.'; retry.hidden = false; }
}
function navigate(path, hash = '') { updateUrl(path, hash); render(path, hash); document.querySelector('#navigation').classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-doc]'); if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); const url = new URL(link.href); navigate(link.dataset.doc, url.hash);
});
menu.addEventListener('click', () => { const open = document.querySelector('#navigation').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
retry.addEventListener('click', () => render(activePath, location.hash));
document.querySelector('#copy-link').addEventListener('click', async event => {
  try { await navigator.clipboard.writeText(location.href); event.currentTarget.textContent = 'Tautan tersalin'; } catch { event.currentTarget.textContent = 'Salin alamat dari bilah browser'; }
});
window.addEventListener('popstate', () => render(new URLSearchParams(location.search).get('doc') || 'README.md', location.hash));
render(new URLSearchParams(location.search).get('doc') || 'README.md', location.hash);
