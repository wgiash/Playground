// Build a flat slides page: all 32 slides laid out in a grid, no deck-stage JS.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'slide-library.html');
const html = fs.readFileSync(SRC, 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('No <style> block');
const cssOriginal = styleMatch[1];

const deckMatch = html.match(/<deck-stage[^>]*>([\s\S]*?)<\/deck-stage>/);
if (!deckMatch) throw new Error('No <deck-stage>');
const deckBody = deckMatch[1];

// Find each <section ...> opening, slice to next one.
const starts = [];
const openRe = /<section\b[^>]*>/g;
let m;
while ((m = openRe.exec(deckBody)) !== null) starts.push(m.index);
const slides = [];
for (let i = 0; i < starts.length; i++) {
  const from = starts[i];
  const to = i + 1 < starts.length ? starts[i + 1] : deckBody.length;
  // End the block at the slide's own </section> — anything after (inter-slide
  // comments, whitespace) is dropped. Prior regex-strip was greedy and chewed
  // up internal <!-- ... --> comments inside the slide.
  let block = deckBody.slice(from, to);
  const endIdx = block.lastIndexOf('</section>');
  if (endIdx !== -1) block = block.slice(0, endIdx + '</section>'.length);
  block = block.trim();
  const labelMatch = block.match(/data-screen-label="([^"]+)"/);
  slides.push({ label: labelMatch ? labelMatch[1] : `Slide ${i + 1}`, html: block });
}

// Layout: single horizontal row — all 32 slides side-by-side. No labels —
// user wants the slides exactly as-is, nothing added.
const SLIDE_W = 1920, SLIDE_H = 1080, GAP = 200;
const items = slides.map((s, i) => ({
  ...s,
  x: i * (SLIDE_W + GAP),
  y: 0,
}));
const maxX = slides.length * SLIDE_W + (slides.length - 1) * GAP;
const maxY = SLIDE_H;

// The deck-stage CSS scopes sections under `deck-stage > section` — we use
// the actual <deck-stage> tag as the wrapper (unregistered, since we don't
// load deck-stage.js here — it stays a generic element but the TAG-NAME
// selectors still match, preserving width/height/background on each section).
const slidesHtml = items.map(({ html, x, y }) => `
  <deck-stage class="sf" style="left:${x}px; top:${y}px;">${html}</deck-stage>`).join('\n');

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Slide frames</title>
<style>
${cssOriginal}

/* flat-page layout — pin body to flat-row dimensions, position each slide
   absolutely. Section styling comes entirely from the original CSS. */
body { position: relative; width: ${maxX}px; height: ${maxY}px; }
deck-stage.sf { position: absolute; display: block; width: ${SLIDE_W}px; height: ${SLIDE_H}px; }
</style>
</head>
<body>
${slidesHtml}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'slides-flat.html'), out);
fs.writeFileSync(path.join(__dirname, 'slides-flat.meta.json'),
  JSON.stringify({ maxX, maxY, count: slides.length }, null, 2));

console.log(`Built slides-flat.html`);
console.log(`  ${slides.length} slides, single row, ${maxX}×${maxY}px`);
