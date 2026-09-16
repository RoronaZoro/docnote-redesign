const fs = require('fs');

const root = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('app.js', 'utf8');
const styles = fs.readFileSync('styles.css', 'utf8');
const marker = '<script type="application/ld+json">';
const start = root.indexOf(marker) + marker.length;
const end = root.indexOf('</script>', start);
const schema = JSON.parse(root.slice(start, end));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(start >= marker.length, 'JSON-LD is missing');
assert((root.match(/<h1\b/g) || []).length === 1, 'expected exactly one H1');
assert(root.includes('https://docnote.care/app/'), 'app CTA is missing');
assert(root.includes('https://calendar.app.google/szBdVAxnmAfQ1ogy8'), 'demo CTA is missing');
assert(root.includes('https://docnote.care/privacy/'), 'privacy route is missing');
assert(root.includes('<figure class="hero-visual clinical-visual" aria-labelledby="mockup-caption">'), 'accessible mockup figure is missing');
assert(!/ios|android|operatingSystem/i.test(JSON.stringify(schema)), 'unsupported platform claim exists');
assert(script.includes("body.dataset.design = 'clinical'"), 'Clinical design state is missing');
assert(styles.includes('body[data-design="editorial"] .hero{grid-template-columns:1fr}'), 'Editorial single-column hero is missing');
assert(styles.includes('body[data-design="dark"] .button{color:#0b1719}'), 'Dark CTA contrast treatment is missing');

for (const variant of [1, 2, 3, 4]) {
  const wrapper = fs.readFileSync(`design-${variant}/index.html`, 'utf8');
  assert(wrapper.includes('name="robots" content="noindex,follow"'), `missing noindex on design ${variant}`);
  assert(wrapper.includes(`index.html?design=${variant}`), `missing design ${variant} route`);
}

const luminance = hex => {
  const channels = hex.match(/\w\w/g).map(value => parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrast = (foreground, background) => {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
};
const pairs = [
  ['Clinical CTA', 'b64f3d', 'ffffff'],
  ['Clinical secondary', '55716c', 'f5f7f4'],
  ['Clinical supporting text', '5f7570', 'f5f7f4'],
  ['Product CTA', '237d72', 'ffffff'],
  ['Editorial CTA', 'a5523f', 'ffffff'],
  ['Dark CTA', '0b1719', 'e47b65'],
];
for (const [name, foreground, background] of pairs) {
  const value = contrast(foreground, background);
  assert(value >= 4.5, `${name} contrast is below 4.5:1`);
  console.log(`${name}: ${value.toFixed(2)}:1`);
}

console.log('Static SEO, route, schema, and mockup assertions: PASS');
