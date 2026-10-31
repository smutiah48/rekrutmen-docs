'use strict';
let diagramId = 0;
let mermaidLoading;
const diagramUrls = new Set();

function clearDiagrams() {
  for (const url of diagramUrls) URL.revokeObjectURL(url);
  diagramUrls.clear();
}

async function renderDiagrams(root) {
  const blocks = root.querySelectorAll('pre > code.language-mermaid');
  if (!blocks.length) return;
  if (!mermaidLoading) mermaidLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = new URL('assets/mermaid-12.2.0.min.js', document.baseURI);
    script.onload = resolve; script.onerror = reject; document.head.append(script);
  });
  await mermaidLoading.catch(() => {});
  if (window.mermaid) mermaid.initialize({startOnLoad: false, securityLevel: 'strict', htmlLabels: false, suppressErrorRendering: true, maxTextSize: 20000});
  for (const code of blocks) {
    const pre = code.parentElement, source = code.textContent;
    try {
      if (!window.mermaid || /^\s*---/.test(source) || /%%\s*\{/.test(source)) throw new Error('unsupported');
      const {svg} = await mermaid.render(`documentation-diagram-${++diagramId}`, source);
      if (!pre.isConnected) continue;
      const clean = DOMPurify.sanitize(svg, {USE_PROFILES: {svg: true, svgFilters: true}, FORBID_TAGS: ['script', 'foreignObject', 'a'], FORBID_ATTR: ['href', 'xlink:href']});
      const imageDocument = new DOMParser().parseFromString(clean, 'image/svg+xml');
      const imageSvg = imageDocument.documentElement;
      if (imageSvg.localName !== 'svg' || !imageSvg.hasAttribute('viewBox')) throw new Error('invalid diagram');
      const dimensions = imageSvg.getAttribute('viewBox').trim().split(/[ ,]+/).map(Number);
      const width = dimensions[2], height = dimensions[3];
      if (!(width > 0 && height > 0)) throw new Error('invalid dimensions');
      imageSvg.setAttribute('width', width); imageSvg.setAttribute('height', height);
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(imageSvg)], {type: 'image/svg+xml'}));
      diagramUrls.add(url);
      const section = document.createElement('section'); section.className = 'diagram';
      const toolbar = document.createElement('div'); toolbar.className = 'diagram-toolbar';
      const label = document.createElement('span'); label.textContent = 'Diagram'; toolbar.append(label);
      const viewport = document.createElement('div'); viewport.className = 'diagram-viewport'; viewport.tabIndex = 0;
      viewport.setAttribute('role', 'region'); viewport.setAttribute('aria-label', 'Diagram interaktif; geser untuk menjelajahi');
      const image = document.createElement('img'); image.src = url; image.alt = 'Diagram Mermaid. Teks diagram tersedia di bawah.'; image.draggable = false;
      viewport.append(image);
      const details = document.createElement('details'), summary = document.createElement('summary');
      summary.textContent = 'Lihat teks diagram'; details.append(summary);
      section.append(toolbar, viewport, details); pre.replaceWith(section); details.append(pre);
      let zoom = 1;
      const update = () => { image.style.width = `${Math.min(width, viewport.clientWidth - 24) * zoom}px`; };
      for (const [text, action] of [['−', () => { zoom = Math.max(.5, zoom / 1.25); }], ['+', () => { zoom = Math.min(4, zoom * 1.25); }], ['Reset', () => { zoom = 1; viewport.scrollTo(0, 0); }]]) {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = text;
        button.setAttribute('aria-label', text === '+' ? 'Perbesar diagram' : text === '−' ? 'Perkecil diagram' : 'Reset ukuran diagram');
        button.addEventListener('click', () => { action(); update(); }); toolbar.append(button);
      }
      update();
      let drag = null;
      viewport.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        drag = {x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop};
        viewport.setPointerCapture(event.pointerId); viewport.classList.add('dragging'); event.preventDefault();
      });
      viewport.addEventListener('pointermove', event => { if (drag) { viewport.scrollLeft = drag.left + drag.x - event.clientX; viewport.scrollTop = drag.top + drag.y - event.clientY; } });
      viewport.addEventListener('lostpointercapture', () => { drag = null; viewport.classList.remove('dragging'); });
    } catch {
      if (!pre.isConnected) continue;
      const note = document.createElement('p'); note.className = 'diagram-error'; note.textContent = 'Diagram tidak dapat ditampilkan. Sumber diagram tersedia di bawah.'; pre.before(note);
    }
  }
}
