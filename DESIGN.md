# Portfolio visual system — V10

## Direction
A restrained digital atelier: graphite backgrounds, silver-blue typography, a small cool accent, generous editorial spacing and real project evidence. The portfolio is a presentation of engineering work, not a fictional SaaS company or a cinematic mock product.

## Content and evidence
- Preserve the original images and videos. Never replace a functioning interface with a regenerated, synthetic imitation.
- Use `object-fit: contain` for evidence images/video. Keep the full original visible; use an accessible lightbox or native playback to inspect detail.
- Describe browser recordings, native simulator captures, real engine runs and design concepts accurately and separately.
- Do not invent metrics, clients, testimonials, awards or release-readiness claims.
- Retain source/asset credits, publication links, bilingual pages and existing project anchors.

## Tokens
- Page background: `#080c12`; surface: `#0f151e`; high surface: `#161f2b`.
- Foreground: `#ecf0f5`; body secondary: `#a5b1c0`; accent: `#9ad6d7`.
- Hairline: `#c5d8f21c`.
- Display face: Space Grotesk, self-hosted under its SIL Open Font License. CJK falls back to local system sans-serif fonts.
- Section spacing: 72–88px desktop, approximately 45–50px mobile; page gutters scale from 18px to 48px.
- Major headings use modest negative tracking; CJK text should never be squeezed into desktop-sized labels.

## Components
- Home: short headline and two original project surfaces, followed by selected cases, capabilities, evidence, visual studies and research.
- Work: category filtering with state in the URL. No project is removed by the filter implementation; deep links must reveal their matching section.
- Research: white source figures are retained as white; labels, controls and surrounding surfaces use the dark design system.
- A portrait recording is never expanded to the full width of a desktop column. Use a bounded portrait frame and an explicit full-size playback option.
- Modal video and image previews must close using Escape and return keyboard focus.

## Motion and performance
Use CSS transforms/opacity and a one-time IntersectionObserver entrance. Respect `prefers-reduced-motion`. No scroll hijacking, forced pointer replacement, decorative WebGL background, perpetual particle loop or multiple autoplay videos. Page content is visible without JavaScript; media triggers remain real links.

## Acceptance
Check English and Chinese home/work/research pages at 320, 390, 820 and 1440px; verify no horizontal overflow, image decoding, keyboard navigation, filter state, deep links, original MP4 playback and no-script links. Inspect screenshots rather than relying on pass counts alone. Compare asset hashes when replacing or publishing original evidence.
