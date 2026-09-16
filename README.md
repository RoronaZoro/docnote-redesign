# DocNote landing-page recreation

## Project overview

This static project recreates/redesigns the public DocNote landing page. The original DocNote source code was unavailable, so the main landing-page scope was recreated from publicly accessible content. It contains four visual concepts with shared content and interaction behavior. 

## Design concepts

1. **Clinical** (`/` and `/design-1/`) — a calm clinical palette, generous spacing, and report mockup.
2. **Product** (`/design-2/`) — an interface-led consultation-to-record workflow.
3. **Editorial** (`/design-3/`) — serif-led typography, rules, and a reading-first rhythm.
4. **Dark** (`/design-4/`) — a deep healthcare-SaaS surface system with the same information journey.

These are alternative concepts, not ranked production recommendations.

## UI/UX principles

The page follows a hero → workflow → capabilities → security → FAQ sequence for visual hierarchy and workflow storytelling. Short headings, cards, specialty chips, and native FAQ disclosures support scannability and progressive disclosure. “Start for free” is the primary CTA; “Book a demo” is secondary.

Responsive breakpoints adapt grids, CTA layout, and mobile navigation. Semantic controls, visible focus states, contrast work, mockup labeling, and reduced-motion behavior support accessibility. Hover, active, FAQ, and navigation states provide interaction feedback. Healthcare-oriented trust is expressed through public reference content; this repository does not independently verify those claims.

## Motion system

- Staggered hero entrance, report-line animation, and status pulse.
- One-time scroll reveals with `IntersectionObserver` and workflow-step staggering.
- CTA, card, testimonial, specialty, security-row, and navigation hover/focus feedback.
- Mobile-menu transition and native FAQ disclosure transition.
- A reduced-motion path that disables entrance/transition effects, reveals content immediately, and activates the workflow without delayed scheduling.

## SEO

The root document implements a title, meta description, canonical (`https://docnote.care/`), one H1 plus hierarchical headings, semantic landmarks, same-page links, Open Graph type/title/description/URL, and Organization/WebSite/SoftwareApplication JSON-LD. The HTML/CSS mockup uses a `figure` and visible `figcaption`; there are no `<img>` elements or image `alt` attributes.

The root is the intended canonical document. `design-1/` through `design-4/` are preview wrappers with `noindex,follow` that redirect to query-selected root states, so they are not intended as independent production pages. No `robots.txt`, sitemap, Twitter/X metadata, Open Graph image, external crawler validation, or deployment indexing verification is included.

## GEO / AI search

GEO means making content easier for search engines and AI systems to understand and retrieve; it does not guarantee rankings or citations. The visible HTML defines the product, clinical audience, problem/solution, recording-to-validation workflow, capabilities, use cases, specialties, integrations, and security/privacy information. FAQ content and consistent terminology reinforce that structure, while JSON-LD supplies machine-readable organization, site, and product metadata.

Security, privacy, integration, specialty, language, testimonial, and metric statements originate from public reference content and are not independently verified here.

## Accessibility

Source-level measures include semantic `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `details`, and `summary` elements; a skip link; native links/buttons; keyboard-visible focus styles; mobile-menu ARIA state; `aria-hidden` decorative symbols; and visible illustrative-demo-data/physician-review labeling in the mockup.

Representative text and CTA pairs were calculated at or above 4.5:1 using the WCAG relative-luminance formula. This is not a full WCAG conformance claim: browser keyboard, screen-reader, touch-target, and comprehensive contrast testing were not performed.

## Performance

There is no package manifest, framework, runtime dependency, external font, image, video, canvas, or animation library. HTML/CSS mockups and CSS transforms/opacity are used with lightweight JavaScript (`IntersectionObserver`, passive scroll handling, and `requestAnimationFrame`). No image optimization or lazy loading is needed because there are no images; no bundling, minification, or compression configuration exists.

Lighthouse/Core Web Vitals: **N/A — browser/Lighthouse environment unavailable**.

## Testing

| Test | Result |
| --- | --- |
| Build | N/A — no build configuration or package manifest |
| Lint | N/A — no lint configuration |
| Typecheck | N/A — no typed source or typecheck configuration |
| JavaScript syntax | PASS — `node --check app.js`; `node --check design-5/app.js` |
| Route smoke test | PASS — temporary Node server returned HTTP 200 for `/` and `/design-1/` through `/design-4/` |
| JSON-LD validation | PASS — parsed with Node; unsupported `operatingSystem`, iOS, and Android claims absent |
| SEO metadata inspection | PASS — static assertions covered canonical, CTA/demo/privacy destinations, one H1, noindex wrappers, and mockup semantics |
| Accessibility static checks | PASS with limitations — source inspection and representative contrast calculations |
| Unsupported-claim/URL search | PASS — no unsupported platform or placeholder URL matches in Designs 1–4 |
| Browser/Lighthouse | N/A — browser/Lighthouse environment unavailable |

Measured uncompressed source sizes: `index.html` 14,721 bytes, `styles.css` 54,559 bytes, `app.js` 6,810 bytes, and `audit-check.js` 2,814 bytes. These are source sizes, not page-weight or Core Web Vitals measurements.

## Final audit & remediation

| Original audit item | Status | Evidence / limitation |
| --- | --- | --- |
| CTA destinations | Fixed | App CTAs use `https://docnote.care/app/`; demo CTAs use the live-page calendar destination. |
| Privacy route | Fixed | Footer uses `https://docnote.care/privacy/`; destination behavior was not browser-tested. |
| Preview indexing / canonical | Fixed | Root canonical plus noindex preview wrappers. |
| CTA contrast | Fixed | Representative Clinical, Product, Editorial, and Dark CTA pairs calculate to at least 4.5:1. |
| Secondary text contrast | Fixed | Representative affected Clinical secondary pairs calculate to at least 4.5:1. |
| Structured data | Fixed | JSON-LD has no iOS/Android operating-system claim and matches visible product framing. |
| Product mockup accessibility | Fixed | Figure/caption, illustrative-data wording, and decorative-element handling are present. |
| Design 3 empty hero space | Fixed | Editorial hero uses one content column when its mockup is hidden. |
| Design 3 product comprehension | Fixed | The hero describes the documentation outcome and DocNote’s consultation-to-report role. |
| Illustrative/demo patient data label | Fixed | Visible caption and mockup text identify illustrative demo data. |
| Trust metric context | Fixed | Metrics include specialty/language scope and average daily administrative-work context. |
| Geographic/compliance ambiguity | Partially fixed | Swiss wording is retained; public geography/compliance assertions are not independently verifiable. |
| Physician review responsibility | Fixed | Hero, workflow, mockup, and FAQ state physician review/validation. |
| Design 4 discoverability | Fixed | Dark appears in the concept switcher and has a wrapper route. |
| JavaScript dependency for Designs 2–4 | Partially fixed | No-JS fallback explains that Clinical is shown; independent no-JS variants need separate pages. |
| Mobile menu transition | Fixed | The default Clinical state now activates transition rules. |
| Reduced-motion workflow | Fixed | JavaScript and CSS provide immediate, non-delayed workflow state. |
| Motion CSS cascade | Fixed | Motion rules are scoped by design state with reduced-motion overrides. |
| JavaScript maintainability | Fixed | Runtime uses named setup functions. |
| Social metadata | Partially fixed | Basic Open Graph exists; no Twitter/X metadata or verified social image asset. |
| `robots.txt` / sitemap | Not fixed | No deployment URL strategy is available for this static study. |
| Testimonial semantics/credibility | Partially fixed | Semantic `blockquote`/`cite` markup exists; identities and claims are unverified. |
| Decorative Unicode icons | Fixed | Meaningless mockup/workflow symbols are hidden from assistive technology. |
| Cross-design duplicate metadata/indexability | Fixed | Preview wrappers are noindex and the root is canonical. |

## Known limitations

- Original DocNote source code was unavailable.
- This is a public-content recreation, not an official deployment or backend integration.
- Backend behavior, recording, transcription, export, EHR connectivity, and external CTA behavior are unverified.
- Business, geographic, compliance, security, metric, integration, and testimonial claims are unverified.
- Browser/Lighthouse, formal WCAG, screen-reader, real-device, and visual-regression testing were unavailable.
- Performance measurements are deployment-dependent, and GEO cannot guarantee ranking or citations.

## Project structure

```text
Nathan/
├── index.html          Shared landing-page markup; Clinical default
├── styles.css          Shared Design 1–4 styles, responsive rules, and motion
├── app.js              Shared variant, navigation, reveal, workflow, and FAQ behavior
├── audit-check.js      Dependency-free static audit assertions
├── design-1/index.html Clinical preview wrapper
├── design-2/index.html Product preview wrapper
├── design-3/index.html Editorial preview wrapper
├── design-4/index.html Dark preview wrapper
```

## How to run

No dependency installation or build command is required. From this directory, use Python’s built-in static server:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/`. Preview routes are `/design-1/`, `/design-2/`, `/design-3/`, and `/design-4/`.
