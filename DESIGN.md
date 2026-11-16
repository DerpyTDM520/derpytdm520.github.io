# Portfolio design — Cinematic implementation

The current presentation implements the user-approved November 2026 concept: a teal night sky, illuminated planetary arc, cyan/gold light trails, mountain foreground, ivory serif headings and gold actions. It is a working static website, not an image-only mockup.

## Content
Headings describe the work directly: AI tools, notebook software, interactive worlds, projects and research. Avoid vague aspirational slogans. English and Chinese pages retain real navigation, category filters, source evidence and image viewers.

## Composition
The home hero contains three native linked project panels, followed by three selected project cards. Five additional projects remain below. All labels, buttons and cards are native HTML. Decorative raster layers and a small dust canvas are marked aria-hidden and cannot capture pointer input.

## Authenticity
Original project screenshots and recordings are retained. Cinematic concept images of imaginary product interfaces are not presented as real work. The environmental background is decorative art derived from the approved generated concept, not geography or gameplay. Native recording provenance, source credits and development limitations remain unchanged.

## Responsive and accessible behavior
At narrow widths the hero project panels form a swipeable row; selected cards stack. Real MP4 links work without JavaScript. Existing modal playback supports Escape and focus return. The decorative canvas is static with reduced motion and stops when the hero or page is not visible. Static perspective is kept even when animation is disabled.

## Assets and implementation
`assets/portfolio-cinema.css` and `assets/portfolio-cinema.js` extend the existing static architecture. `assets/cinema/` contains three lightweight decorative layers. Do not replace evidence media with concept renders. Preserve the original 31.44-second Atlas MP4 and all existing source figures.

## Verification
Compare real browser captures against the approved composition at 1448×1086 and test 320/390/820px layouts. Verify live video playback, deep links, filters, language switching, no-script fallbacks and image sources. Tests are functional evidence, not an automatic aesthetic score.
