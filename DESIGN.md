# TS 567 website design guide

## Purpose and concept

This is a four-language introduction for a small-volume Vietnamese tea supplier. It should help prospective partners understand the tea, its Cù Mông origin, the limited fresh-leaf harvest, and which information is still awaiting confirmation.

The visual idea is **a journey from mountain to sea**: deep tea-green fields frame the story, warm paper surfaces make detailed information easy to read, and a restrained leaf-green accent marks actions. The page should feel editorial, calm, and grounded in real provenance. Keep the existing TS 567 logo intact.

## Design tokens

The current source of truth is `styles.css`. Reuse its variables before adding a new color.

| Role | Value | Use |
| --- | --- | --- |
| Forest | `#153d32` | Primary dark surface, strong text, buttons |
| Deep | `#0d3028` | Hero background |
| Pine | `#1f5140` | Hover and secondary dark green |
| Leaf | `#8fc957` | Main call to action and small emphasis |
| Cream | `#f6f4ec` | Page background |
| Paper | `#fffdf8` | Header, cards, form surface |
| Ink | `#18382f` | Main body text |
| Muted | `#53675a` | Secondary text on cream or paper; at least 4.5:1 contrast |
| Line | `#d9dfd3` | Quiet dividers |

Use green by role, with leaf green reserved mainly for the most important action. Do not introduce another competing accent or copy a software brand's palette into this tea site.

## Typography and spacing

- Use self-hosted **Be Vietnam Pro** for body text, controls, and Vietnamese labels. Use **Lora** for Vietnamese and English editorial headings. Keep fallbacks for Chinese pages (`Noto Serif CJK SC/TC`, Songti, SimSun/PMingLiU); do not force Latin-only glyphs onto Chinese text.
- Base body text is 16px with generous line height. Long paragraphs should stay within a comfortable reading width. Small labels may be smaller, but essential instructions and form feedback must stay readable.
- Keep a consistent spacing rhythm around 8, 16, 24, 32, 48, 64, and 96px. The content container is at most 1240px wide, with responsive side gutters.
- Desktop header is 86px high; the compact header is 72px. The menu collapses at 980px. Anchored sections need enough scroll offset to remain visible below the sticky header.

## Components and interaction

- Keep one visually dominant action in each section. Main buttons use a restrained rectangular shape, at least 44px of clickable height, clear hover/pressed states, and a visible keyboard focus ring.
- Navigation, language choices, footer links, and text links need comfortable touch targets. The language menu must work by tap and keyboard, show its current language, and close with Escape or an outside click.
- Use cards and dashed frames to mark missing images and documents. Placeholder text must say what asset is missing. Replace the whole placeholder when approved source material arrives; do not use a low-resolution source image as a hero. The owner-provided rocky hillside photograph now appears in the hero and tea story; its exact location has not been independently verified.
- The contact area is a preview until the owner supplies a real recipient or endpoint. It must never imply that a message was delivered or submit entered details to a URL.
- Respect `prefers-reduced-motion`. Motion should clarify a state change; it should not interrupt reading.

## Content and trust rules

- Keep Vietnamese, English, Simplified Chinese, and Traditional Chinese for Taiwan aligned in meaning and section order. Translate for tea-industry context rather than word for word.
- The stated harvest is approximately **20 kg of fresh leaves every two months**. Do not turn it into finished-tea yield, stock on hand, or order capacity.
- Switzerland is an intended audience, not a claimed established export market.
- Leave unconfirmed sensory notes, packaging, contact details, partners, lab results, and product images as explicit placeholders until approved. The tea-region gallery shows only tea plants and hillside scenery. The following Community and Partners section holds photographs of people, harvesting, drying, and sorting; it must not imply that any pictured person is a named partner. Describe only what each displayed image visibly shows until its exact location and the person's role are confirmed. Do not invent certifications or health claims.

## Review before publishing

Check all four pages at 320, 375, 768, 980, 1024, and 1440px. Verify no page-level horizontal overflow; readable hero and content; keyboard focus and navigation; all fragment links; language switching; gallery arrows, touch scrolling, and keyboard controls; text contrast of at least 4.5:1 for normal text; 44px touch targets; reduced-motion behavior; and that the contact preview never transmits information. When adding a real image, set its dimensions and optimize it for the web.

## Reference material

This guide adapts the review principles in the local `ui-ux-pro-max` skill and the approaches described by [VoltAgent DESIGN.md](https://github.com/VoltAgent/awesome-design-md), [ui-ux-kit](https://github.com/arham777/ui-ux-kit), [cursor-design-rules](https://github.com/studioalexwolf/cursor-design-rules), [cursor-designer](https://github.com/spencergoldade/cursor-designer), and [awesome-design-systems](https://github.com/shaun0927/awesome-design-systems). These are references for process and quality checks; the TS 567 brand and the owner's confirmed facts determine the actual design.
