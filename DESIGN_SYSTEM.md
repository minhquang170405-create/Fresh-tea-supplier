# TS 567 design system

This is the implementation guide for the four-language TS 567 supplier site. `DESIGN.md` explains the brand and content boundaries; `styles.css` is the source of truth for the values currently shipped. Update this document when a component or token changes.

## Design direction

The organizing idea is a **journey from the Cù Mông mountains to the sea**. Forest-green fields and quiet contour lines introduce the tea; warm paper surfaces carry the details. The large Lora headings give the story an editorial tone, while Be Vietnam Pro keeps specifications and controls legible. The owner-provided rocky hillside photograph leads the page and appears in the tea story. The tea-region gallery focuses on tea plants and hillside scenery. A separate Community and Partners gallery follows it with photographs of people and production stages. Other image spaces still awaiting assets state exactly what is missing and stay visually secondary to the text.

The page is for prospective tea partners and discerning buyers. Its main action is an enquiry about cooperation. Do not present the approximately 20 kg of **fresh leaves every two months** as finished-tea yield or available stock. Switzerland is a target audience, not an established export claim.

## Foundations

| CSS token / role | Value | Current use |
| --- | --- | --- |
| `--forest` | `#153d32` | Dark sections, primary text, header CTA |
| `--deep` | `#0d3028` | Hero and contact surfaces |
| `--pine` | `#1f5140` | Dark-green interaction state |
| `--leaf` | `#8fc957` | Main action and restrained accents |
| `--cream` | `#f6f4ec` | Main page background |
| `--paper` | `#fffdf8` | Header and light content surfaces |
| `--ink` | `#18382f` | Body text |
| `--muted` | `#53675a` | Supporting text on cream or paper |
| `--line` | `#d9dfd3` | Quiet section and list dividers |
| `--clay` | `#c8764e` | Minor warm accent; no competing CTA |

The current focus outline is 3px `#cb823c`, offset by 3px. Sample text pairs were computed with the WCAG contrast formula: ink on cream **11.59:1**, muted on cream **5.52:1**, forest on paper **11.84:1**, dark text `#123228` on leaf **7.05:1**, and placeholder text `#315a47` on pale green `#dcebd7` **6.30:1**. Recompute new foreground/background pairs; do not judge contrast by eye. Small supporting copy still exists at 14–15px in the current CSS, so protect its contrast and do not reduce it further.

Use self-hosted **Lora** for Vietnamese/English editorial headings and **Be Vietnam Pro** for body text and controls. The Chinese pages use system CJK sans and serif fallback stacks specified in `styles.css`; test their actual rendering. Body text is 16px/1.7; hero lead is 18px; the hero headline is `clamp(48px, 4.5vw, 76px)` on desktop and `clamp(43px, 12vw, 58px)` on narrow screens. Section headings are `clamp(42px, 5.5vw, 70px)`, with 44px on mobile. Use the existing 8/16/24/32/48/64px rhythm as the default before adding one-off spacing.

The content container is capped at **1240px**. It has 32px side gutters on a wide screen and 16px at 560px or below. Current layout transitions are at 1100px (nav tightening), 980px (mobile navigation, stacked hero and tea story), 800px (other main grids stack), 560px (phone layout), and 360px (narrow-phone header). The sticky header is 86px on desktop and 72px once the navigation collapses. Fragment targets must clear it.

## Component rules

| Component | Use and visual treatment | Behavior and access |
| --- | --- | --- |
| Header and language switcher | Paper surface, one dark CTA, restrained two-color hover on links; language control is pale leaf with a forest hover. | Header remains sticky. Menu button is at least 44px; language summary is at least 46px, selected language uses `aria-current`, and the menu works by keyboard and touch. |
| Hero actions | One filled leaf button (`.button-lime`), then a quieter outlined action (`.button-ghost`); both use the site's rectangular 3px button radius. | Buttons have at least 52px height, clear hover, active, and focus states. Keep the principal action consistent in the page. |
| Floating return to top | A 56px circle with a paper surface, pine border, green upward arrow, and soft shadow stays in the lower-right corner on desktop and tablet. Hover and keyboard focus invert it to a pine fill with a paper-white arrow. It becomes 52px with 16px insets on phones and respects safe-area insets. | Always visible, it links to `#top` on all four pages. Its localized accessible name, visible focus, 44px-plus touch target, hover state, and reduced-motion behavior support keyboard and touch use. The phone footer reserves space so its last row stays unobscured. |
| Tea story | A 45/55 headline and prose grid with a 28–48px gutter. The prose starts level with the headline, below its eyebrow. A 4:3 rocky hillside photograph sits 28px below the headline; four short narrative paragraphs close with a ruled editorial signature. The story stacks at 980px. | Reuse the optimized 800px and 1280px WebP source, load the story instance lazily, reserve its dimensions, and describe only what the photograph visibly shows. Keep the story readable at 16px on phones, with CJK serif fallbacks for the closing line. |
| Split section heading | Uses the same 45/55 column proportion and 28–48px gutter as the tea story. Its supporting copy begins level with the headline instead of floating at the far edge of the section. | Stack the title and supporting copy at 980px, preserving the reading order. |
| Quality and future headings | The highlighted phrase starts on its own line in every language so each title reads as two balanced parts. | Allow natural wrapping on narrow phones; do not force a fixed width or horizontal overflow. |
| Hero photograph | The owner-provided rocky hillside photograph replaces the former harvest image. It is framed at 4:3 on desktop and narrow phones, and 16:9 on tablets. The dark-green copy panel remains separate from the photograph. | Serve responsive 800px and 1280px WebP files. The above-the-fold image loads eagerly with high fetch priority, has reserved dimensions and meaningful alt text in each language, and makes no unverified location claim. |
| Image and document placeholders | Pale green, dashed frame or simple illustrated field; label missing product, packaging, or report assets in the page language. | Placeholder copy must not look like evidence of an existing photo, certificate, package, or lab result. Replace it with approved imagery plus meaningful alt text and reserved dimensions. |
| Photo galleries | Vùng trà holds six tea-plant and hillside photographs. The following Community and Partners section holds eight photographs of people, harvesting, leaves laid out, sorting, and bamboo trays, on a pale green surface already used elsewhere in the site. Do not imply that photographed people are identified partners. Desktop shows two complete photos at once; narrow screens show one complete photo. Images are at most 1800px and lazy-loaded; captions describe visible scenes without asserting an unverified location or role. | Both rails use independent instances of the same controller. Touch/trackpad scrolling uses snap points, with the scrollbar visually hidden. Previous/next buttons overlay the image edges and change color on hover or keyboard focus. Each click advances two photos on desktop or one on mobile; Left/Right keys work when the rail is focused. Buttons disable at the ends, focus remains visible, and reduced-motion preference avoids smooth movement. |
| Process and future-content lists | Use ruled columns and whitespace instead of repeated raised cards. The quality details use a vertical status list. | On phones, stack into a reading-order list with visible dividers and no horizontal scrolling. |
| Enquiry form | Paper form on the dark contact section; 16px inputs. | It is a preview. Keep labels and required markers visible, preserve input during validation, announce feedback in text, and never imply delivery or transmit data before a real destination is configured. |

Use native HTML controls and the existing CSS/JS rather than adding a UI framework. Keep the brand logo as supplied. The gallery photos come from the owner's `photos/` folder, but the exact location and production stage of each image have not been independently verified. No invented tasting notes, certifications, health claims, partners, or contact methods. All four language pages must keep the same section intent, placeholder status, and interaction meaning.

## Review gate before publishing

1. Inspect every page at 320, 375, 768, 980, 1024, and 1440px; check the hero at roughly 700px and 800px viewport heights. Confirm no horizontal overflow and that text/actions remain readable.
2. Check keyboard navigation, skip link, visible focus, language-menu open/close, fragment targets below the sticky header, 44px touch targets, and reduced-motion behavior.
3. Compute contrast for changed text/background pairs (normal text at least 4.5:1; large text and interface outlines at least 3:1). Check form labels and feedback in every language.
4. Confirm placeholders still disclose missing assets, and the enquiry preview never sends or saves submitted information.

## Downloaded references and what was adapted

The sources were cloned into the project sibling directory `../reference-repos` for review. They are references for process, not a replacement for TS 567's brand or a package dependency of the public site.

| Source file reviewed | Principle applied here |
| --- | --- |
| [VoltAgent/awesome-design-md — Linear DESIGN.md](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/linear.app/DESIGN.md) | Document color roles, type, components, and responsive behavior explicitly; no Linear colors or typography were copied. |
| [arham777/ui-ux-kit — quality floor](https://github.com/arham777/ui-ux-kit/blob/af67a2cba570f64d93cba01d798fc41be6110f8f/references/quality-floor.md) and [landing-page rules](https://github.com/arham777/ui-ux-kit/blob/af67a2cba570f64d93cba01d798fc41be6110f8f/references/surface-rules.md) | Compute contrast, give the hero a clear hierarchy, check real viewport heights, and leave a project design-system document. |
| [studioalexwolf/cursor-design-rules — `.cursorrules`](https://github.com/studioalexwolf/cursor-design-rules/blob/b0e1d31d11c55afaf610baa919941d47c5c45797/.cursorrules) | One primary action style, consistent spacing and component shapes, legible text. |
| [spencergoldade/cursor-designer — layout](https://github.com/spencergoldade/cursor-designer/blob/30b15ac1d67a7cdc0986f3a20ceb91943e683cec/.cursor/rules/frontend/ui-layout-and-density.mdc) and [forms](https://github.com/spencergoldade/cursor-designer/blob/30b15ac1d67a7cdc0986f3a20ceb91943e683cec/.cursor/rules/frontend/ux-forms-and-validation.mdc) | Preserve reading order as grids stack and make form feedback specific and recoverable. These source rules target TSX; their principles were adapted to this HTML site. |
| [shaun0927/awesome-design-systems — component documentation](https://github.com/shaun0927/awesome-design-systems/blob/5f0f8dbfe2767cc732ca9aa7040974759536de67/04-component-documentation/03-component-design-guidelines---writing-effective-component-documentation.md) | Describe each component's use, visual role, behavior, and accessibility. |

The current site uses an asymmetric text/photo hero with the owner's rocky hillside image. The tea-region gallery contains tea plants and hillside scenery only. The following Community and Partners gallery displays the former harvest image and other people and production photographs, with an explicit placeholder for unconfirmed partner identities. The contour-line field and editorial typography remain part of the tea story; other pending assets retain explicit placeholders.
