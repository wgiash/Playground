# Aither Rendered Design System

## The app
An infinite pan/zoom canvas with three zones, left-to-right: **Design System → Templates → Flows**.

- The **Design System** zone on the far left is already built and organized by atomic design (Foundations → Atoms → Molecules → Organisms → Patterns), growing downward for new items.
- Rightward is reserved for **Templates**.
- **Flows** live on the right and stack vertically.

Canonical artifact: [rendered-design-system.html](apps/rendered-design-system.html) — it inlines tokens, chrome, and app. Source files ([tokens.css](system/tokens.css), [chrome.css](system/chrome.css), [canvas.css](system/canvas.css), [app.jsx](system/app.jsx), etc.) are the editable sources that get baked into the canonical file.

## Reference materials — always check before designing

Before composing anything for a named product, surface, or feature, **scan the repo for reference materials first.** The user drops PRDs, screenshots, briefs, and other source material into the repo as work comes in — none of it is wired into the canvas, but all of it is load-bearing context.

Where to look (non-exhaustive — new folders appear over time):

- `assets/<product>-references/` or `assets/aither-work(references)/` — screenshot dumps, mood boards, competitor refs, exported Figma frames.
- `apps/<product>-prd*.html`, `apps/<product>-prd-template.html` — product requirement decks ([sunpull-prd.html](apps/sunpull-prd.html), [sunspell-prd-template.html](apps/sunspell-prd-template.html)).
- `apps/<product>-flows.html`, `apps/<product>-prototype.html` — existing flow canvases or working prototypes for that product.
- Anywhere else under `assets/`, `apps/`, or the repo root — folder names usually carry the product name.

How to apply: when a brief names a product (e.g. "design a sunpull onboarding"), run a Glob / Grep pass for that product name across the repo before drawing. If you find a PRD, read its slides; if you find a references folder, look at the images. Never compose for a named product without first checking what context already exists — the user will not always remember to point you at it.

## Standing rules (always apply)

Mirrored in [apps/agent-design-guide.html#rules](apps/agent-design-guide.html#rules) with full Why / How for each. Same numbering, same order.

- **Rule 01 — Tokens only.** Use only existing tokens in [tokens.css](system/tokens.css). Do not introduce new color, font, or styling tokens. If something uses a hardcoded value, pull it back to the closest existing token — do not add a new one.
- **Rule 02 — Don't touch infrastructure.** Do not modify [canvas.css](system/canvas.css), [chrome.css](system/chrome.css), the comment system ([comments.js](shared/comments.js)), the pan/zoom in [app.jsx](system/app.jsx) beyond registering new sections, the shared menu component ([shared/ds-menu.css](shared/ds-menu.css), [shared/ds-menu.js](shared/ds-menu.js)), or base `.slide` / `.deck` CSS in PRD templates.
- **Rule 03 — Respect the atomic taxonomy.** When adding something, decide which layer it belongs to (Foundations / Atoms / Molecules / Organisms / Patterns / Flows) and place it under the correct labelled header. If a new item doesn't fit an existing layer, flag it rather than forcing it.
- **Rule 04 — No color at the wireframe stage.** Compose with bone and dark via the wireframe-mode tokens (`--bg`, `--fg`, `--panel`, `--input`, `--hair`) inherited from the `.wf` wrapper. Warm and cool tones exist as system colors but never indicate state, severity, or selection at this stage. Selection = filled background inversion; severity = position; state = label. Brand color enters in the §Brand layer, after wireframe approval.
- **Rule 05 — Flows always include auth and error states.** Any flow added to the Flows zone must show its auth path(s) and at least one error/failure state, not just the happy path. If these are missing from a source template, surface the gap rather than shipping the flow without them.
- **Rule 06 — No OS or device chrome in wireframes.** No iOS / Android status bar (carrier · time · battery), no notch or Dynamic Island, no home indicator, no Mac menu bar / Touch Bar, no browser address bar, no drawn scrollbars. Wireframes show only the product surface — the device is implied by the frame ratio, not rendered.
- **Rule 07 — Keep canvas maintenance current.** Preserve zoomed-out readability of labelled header rows. If a change alters the taxonomy, canonical file, or growth rules, update the IntroCard (`IntroCard` and `DsIntro` in [rendered-design-system.html](apps/rendered-design-system.html); mirrored in [app.jsx](system/app.jsx) and [app.combined.jsx](system/app.combined.jsx)).
- **Rule 08 — Icons come from a real icon library; never hand-drawn.** In Playground, use `Icons.*` from [system/icons.jsx](system/icons.jsx) (the kit is sourced from Lucide: 1.5px stroke, 24px viewBox, currentColor). In Paper, drop in icons from a real library — Lucide first (matches the kit), Phosphor or Heroicons only if Lucide can't express the metaphor. Never compose icons from rectangles, lines, or freehand shapes. If the icon you need isn't available, raise the gap rather than inlining a one-off SVG.
- **Rule 09 — Design-system fonts only; in Paper, preflight the font set.** Wireframes use TWK Lausanne Pan (300 / 550 / 700) and Space Mono — nothing else. Apercu is display-only on the home tile; Inter is not in the system. In Playground, use `var(--font-ui)` / `var(--font-mono)` / `var(--font-note)` — never name a face directly. In Paper, before any typographic styling, call `get_font_family_info`; if Lausanne Pan or Space Mono is missing from the file, **stop** and surface that to the PM (and the human, via the PM) before composing. Do not substitute system-ui, Inter, or any other fallback.

## Shared menu component — [shared/ds-menu.css](shared/ds-menu.css) + [shared/ds-menu.js](shared/ds-menu.js)

The fixed sidebar / index nav / mobile drop-down is one component, used by [agent-design-guide.html](apps/agent-design-guide.html) and every PRD ([prd-template.html](apps/prd-template.html), [sunpull-prd.html](apps/sunpull-prd.html), [sunspell-prd-template.html](apps/sunspell-prd-template.html)). It auto-builds the nav from the document:

- `<section class="ds-section" data-title="...">` → numbered link (design reference).
- `<div class="ds-part" data-part="...">` → non-clickable "part" divider (design reference).
- `<section class="slide" data-title="..." data-status="open|signed">` → numbered link with sign-off dot (PRDs).
- `<section class="slide" data-group="...">` → injects a non-clickable group divider before that row (PRDs).

Required host DOM (already in place on every host page; do not change the IDs):
- `<header class="ds-menu-bar" id="ds-menu-bar">` with `.ds-menu-toggle` (id `ds-menu-toggle`) carrying `.cur-num` / `.cur-label` spans.
- `<div class="ds-menu-backdrop" id="ds-menu-backdrop">`.
- `<aside class="ds-menu" id="ds-menu">` containing `.deck-title`, `.deck-sub`, an `<h2>` eyebrow, and `<nav id="ds-menu-nav">`.

**Do not edit `shared/ds-menu.css` or `shared/ds-menu.js`** for a single page. If the sidebar needs to behave differently on one host, the host's content is wrong (missing `data-title`, wrong section class) — fix that, not the component.

## Deck template — [prd-template.html](apps/prd-template.html)

Separate artifact from the canvas. Single-file, auto-wired deck — this file is the foundation for PRD clones. The sidebar / scroll-spy / mobile sheet come from the shared menu component (above). Do not edit the deck's infrastructure (DOM contract, slide-numbering runtime, back-home button, base `.slide`/`.deck` CSS, or the shared menu); clone it and add content inside the clone. When generating or adding slides:

- **Only add `<section class="slide">` blocks** inside `<main class="deck">`. Use the canonical template in the `HOW TO ADD A SLIDE` comment inside the file.
- **Do not hand-edit `<nav id="ds-menu-nav">`.** The shared menu rebuilds it on load from the slides — hardcoded entries are discarded.
- **Do not write slide numbers into `.tag` or `.page` by hand.** The deck's runtime stamps `NN · label` into `.tag` and `NN / TOTAL` into `.page` on load.
- **Preserve the DOM contract:** `<main class="deck" id="deck">`, the shared menu host DOM (above), each slide = `<section class="slide">` with `.tag`, `<h1>`, `.page`. Optional per-slide attributes: `data-title="..."` (overrides h1 in the nav), `data-status="open|signed"` (sign-off dot), `data-group="..."` (group divider in the nav before this row).
- **Keep per-slide content to tag + h1 + (optional) p by default.** Richer content goes inside the `<section>` under a new scoped class — never modify the base `.slide` / `.deck` CSS or the shared menu CSS.
- **Sidebar chrome, back-home button, and scroll-spy live in the shared component** — don't restyle or rewire them for a single slide.
- If a requested change would violate any of the above, surface the conflict rather than silently breaking the UI.
