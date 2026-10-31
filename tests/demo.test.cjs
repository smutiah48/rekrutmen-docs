// Run with playwright-core installed, CHROME_PATH set, and DOCS_TEST_URL pointing to the site.
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROME_PATH});
  const base = process.env.DOCS_TEST_URL || 'http://127.0.0.1:8765/';
  for (const viewport of [{width: 1440, height: 900}, {width: 375, height: 812}]) {
    const page = await browser.newPage({viewport}), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.getByRole('heading', {name: 'Demo alur rekrutmen', level: 2}).waitFor();
    const cards = page.locator('.demo-card'), images = cards.locator('img');
    assert.equal(await cards.count(), 23);
    assert.equal(await cards.locator('figcaption h4').count(), 23);
    assert.equal(await cards.locator('figcaption p').count(), 23);
    assert.equal(await page.locator('#demo > h3').count(), 5);
    const results = await images.evaluateAll(async elements => {
      for (const image of elements) image.loading = 'eager';
      return Promise.all(elements.map(async image => {
        try { await image.decode(); return {src: image.getAttribute('src'), alt: image.alt, loaded: image.naturalWidth > 0}; }
        catch { return {src: image.getAttribute('src'), alt: image.alt, loaded: false}; }
      }));
    });
    assert.ok(results.every(result => result.loaded && result.alt), 'all screenshots load and have alternative text');
    assert.deepEqual(results.map(result => Number(new URL(result.src).pathname.split('/').pop().slice(0, 2))), Array.from({length: 23}, (_, i) => i + 1));
    assert.equal(await page.locator('html').evaluate(element => element.scrollWidth <= element.clientWidth), true);
    assert.equal(await page.getByRole('link', {name: 'Lihat proyek ini'}).getAttribute('href'), 'https://karier.ui.ac.id/');
    assert.deepEqual(errors, []); await page.close();
  }
  await browser.close(); console.log('PASS: 23 ordered screenshots, captions, CTA and mobile layout');
})().catch(error => { console.error(error); process.exit(1); });
