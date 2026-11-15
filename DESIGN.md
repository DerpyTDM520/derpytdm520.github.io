# Portfolio visual system — V11 refinement

## Direction
A luminous technical environment: visible deep-blue light fields, fine engineering grids, cyan accents, readable layered surfaces and real project evidence. Avoid empty near-black stretches and overly small low-contrast type. The portfolio is a presentation of engineering work, not a fictional SaaS company or a cinematic mock product.

## Content and evidence
- Preserve the original images and videos. Never replace a functioning interface with a regenerated, synthetic imitation.
- Use `object-fit: contain` for evidence images/video. Keep the full original visible; use an accessible lightbox or native playback to inspect detail.
- Describe browser recordings, native simulator captures, real engine runs and design concepts accurately and separately.
- Do not invent metrics, clients, testimonials, awards or release-readiness claims.
- Retain source/asset credits, publication links, bilingual pages and existing project anchors.

## Tokens
- Page background: `#10243d`; surface: `#142d49`; high surface: `#1d3d5d`.
- Foreground: `#f1f7ff`; body secondary: `#bfd0e2`; accent: `#8aedf2`.
- Hairline: `#92c5ef38`.
- Display face: Space Grotesk, self-hosted under its SIL Open Font License. CJK falls back to local system sans-serif fonts.
- Section spacing: approximately 56–62px desktop and 38–45px mobile; page gutters scale from 18px to 48px.
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

## V11 media and navigation refinements
- Use full-frame original covers and real MP4 links for idle recordings; open the video on explicit request. Do not show a wall of blank or buffering players.
- Selected shooter footage: 20 seconds of M4 combat/reloads and 8 seconds of facility interaction, both from an actual Windows packaged build. Clearly label automated inputs, normal speed, silent capture, and incomplete playthrough.
- Retain the four earlier shooter screenshots in an expandable evidence section. Do not mix their completion result with this recording session.
- Exclude footage whose public-source records remain incomplete. Rendered video publication is not permission to distribute raw 3D models, textures or source projects.
- Keep category navigation compact on mobile, with a swipeable sub-navigation row, visible focus states and functioning deep links.
- CSS ambient breathing stops in hidden tabs and for reduced-motion users; no continuous canvas/WebGL scene is used for decoration.
