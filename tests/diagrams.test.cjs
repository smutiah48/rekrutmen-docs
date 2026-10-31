// Run with playwright-core installed, CHROME_PATH set, and DOCS_TEST_URL pointing to the site.
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROME_PATH});
  const base = process.env.DOCS_TEST_URL || 'http://127.0.0.1:8765/';
  const context = await browser.newContext({viewport: {width: 1440, height: 900}});
  const page = await context.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const requests = []; page.on('request', request => requests.push(request.url()));
  await page.goto(`${base}?doc=${encodeURIComponent('docs/specs/01-system-overview.md')}`);
  await page.locator('#article h1').waitFor();
  assert.equal(requests.some(url => url.includes('mermaid-12.2.0.min.js')), false, 'renderer is loaded only when needed');
  for (const doc of ['README.md', 'DESIGN.md', 'docs/structures/01-architecture.md', 'docs/specs/03-data-and-workflows.md']) {
    await page.goto(`${base}?doc=${encodeURIComponent(doc)}`);
    await page.locator('.diagram img').waitFor();
    assert.equal(await page.locator('.diagram-error').count(), 0, doc);
    assert.equal(await page.locator('.diagram img').evaluate(image => image.decode().then(() => image.naturalWidth > 0)), true);
  }
  const viewport = page.locator('.diagram-viewport'), image = viewport.locator('img');
  const initial = await image.evaluate(element => element.getBoundingClientRect().width);
  for (let i = 0; i < 4; i++) await page.getByRole('button', {name: 'Perbesar diagram'}).click();
  assert.ok(await image.evaluate(element => element.getBoundingClientRect().width) > initial);
  await viewport.scrollIntoViewIfNeeded();
  const box = await viewport.boundingBox();
  await page.mouse.move(box.x + box.width * .7, box.y + 100); await page.mouse.down();
  await page.mouse.move(box.x + box.width * .3, box.y + 100, {steps: 8}); await page.mouse.up();
  assert.ok(await viewport.evaluate(element => element.scrollLeft) > 0, 'mouse drag scrolls the diagram');
  await page.getByRole('button', {name: 'Reset ukuran diagram'}).click();
  assert.ok(Math.abs(await image.evaluate(element => element.getBoundingClientRect().width) - initial) < 1);
  await page.getByText('Lihat teks diagram').click();
  assert.match(await page.locator('.diagram code').textContent(), /sequenceDiagram/);

  await page.route('**/README.md', route => route.fulfill({contentType: 'text/markdown', body: '# Uji\n\n```mermaid\n%%{init: {"securityLevel":"loose"}}%%\nflowchart TD\nA-->B\n```'}));
  await page.goto(`${base}?doc=README.md`); await page.locator('.diagram-error').waitFor();
  assert.equal(await page.locator('.diagram').count(), 0, 'diagram configuration overrides are rejected');
  await page.unrouteAll();
  await page.route('**/README.md', route => route.fulfill({contentType: 'text/markdown', body: '# Uji\n\n```mermaid\nflowchart LR\nA["<img src=x onerror=alert(1)>"]-->B\n```'}));
  await page.goto(`${base}?doc=README.md`); await page.locator('.diagram img').waitFor();
  assert.equal(await page.locator('#article img:not(.diagram img), #article [onerror], #article script').count(), 0, 'HTML in labels cannot execute');
  await page.unrouteAll();
  await page.route('**/README.md', route => route.fulfill({contentType: 'text/markdown', body: '# Uji\n\n```mermaid\nnot a valid diagram\n```'}));
  await page.goto(`${base}?doc=README.md`); await page.locator('.diagram-error').waitFor();
  assert.match(await page.locator('#article code.language-mermaid').textContent(), /not a valid diagram/);
  await page.unrouteAll();
  assert.deepEqual(errors, []);
  await context.close();

  const offline = await browser.newPage();
  await offline.route('**/mermaid-12.2.0.min.js', route => route.abort());
  await offline.goto(`${base}?doc=README.md`); await offline.locator('.diagram-error').waitFor();
  assert.equal(await offline.locator('code.language-mermaid').count(), 1, 'diagram source stays readable if the renderer fails');
  await offline.close();

  const mobile = await browser.newContext({viewport: {width: 375, height: 812}, isMobile: true, hasTouch: true});
  const touchPage = await mobile.newPage();
  await touchPage.goto(`${base}?doc=${encodeURIComponent('docs/specs/03-data-and-workflows.md')}`);
  await touchPage.locator('.diagram img').waitFor();
  for (let i = 0; i < 4; i++) await touchPage.getByRole('button', {name: 'Perbesar diagram'}).click();
  const touchViewport = touchPage.locator('.diagram-viewport'); await touchViewport.scrollIntoViewIfNeeded();
  const touchBox = await touchViewport.boundingBox();
  const cdp = await mobile.newCDPSession(touchPage);
  const point = (x, y) => [{x, y}];
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: point(touchBox.x + touchBox.width * .8, touchBox.y + 100)});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: point(touchBox.x + touchBox.width * .2, touchBox.y + 100)});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  await touchPage.waitForTimeout(300);
  assert.ok(await touchViewport.evaluate(element => element.scrollLeft) > 0, 'touch swipe scrolls the diagram');
  await mobile.close(); await browser.close();
  console.log('PASS: four diagrams, zoom, reset, mouse drag, touch swipe, source text, and configuration safety');
})().catch(error => { console.error(error); process.exit(1); });
