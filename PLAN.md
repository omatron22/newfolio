# Portfolio Redesign Plan

## Vision
Transform the current DaisyUI template-looking site into a warm, textured, hand-crafted feeling portfolio. Grain + serif fonts, custom cursor, magnetic buttons, scroll animations. One committed light theme. Multi-page structure.

---

## New Page Structure

| Route | Content |
|---|---|
| `/` | Minimal hero — name, tagline, scroll indicator. Sets the tone immediately. |
| `/about` | Bio, photo cluster, journey timeline, skills. Resume download link. |
| `/work` | Redesigned project grid (asymmetric). Samson game is a project card that links to `/video-game`. |
| `/blog` | Placeholder "coming soon" page. |
| `/video-game` | Keep game fully functional, just restyle the wrapper (strip DaisyUI). |

**Nav:** Home, About, Work, Blog. No "Play me!" in nav — game is discoverable from Work page.

---

## Design System

### Fonts
- **Headings:** Instrument Serif (warm, characterful serif — not overused like Playfair)
- **Body/accents:** JetBrains Mono (monospace signals "developer", readable at light weights)
- **UI/small text:** Inter (already installed, bridges serif + mono)

### Color Palette (warm, artisanal light theme)
| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#FAF7F2` | Main background (cream paper) |
| `bg-secondary` | `#F0EBE3` | Card/section backgrounds |
| `bg-accent` | `#E8E0D4` | Hover states |
| `text-primary` | `#2B2420` | Body text (dark warm brown) |
| `text-secondary` | `#6B5E54` | Captions, dates |
| `text-muted` | `#A39889` | Placeholders |
| `accent-warm` | `#C4704B` | Links, highlights (terracotta) |
| `accent-cool` | `#4A6670` | Secondary accent (muted teal) |
| `border` | `#D9D0C4` | Borders |

### Texture
- CSS-only grain overlay via SVG `feTurbulence` filter (no image files needed)
- Fixed position, pointer-events: none, ~4% opacity
- Barely noticeable but subconsciously signals "crafted"

---

## Interactive Features

### Custom Cursor (desktop only)
- Small dot (follows instantly) + larger trailing ring (spring delay via Framer Motion)
- Ring scales up on hoverable elements, shrinks on click
- Detected via `matchMedia('(hover: hover)')` — no cursor changes on mobile/tablet

### Magnetic Buttons
- Buttons subtly pull toward cursor when mouse enters their area
- Spring back on mouse leave
- Applied to CTAs, nav links, social icons

### Page Transitions
- Framer Motion `AnimatePresence` via `template.tsx` (re-mounts on route change)
- Fade + slight Y-translate on enter

### Scroll Animations
- `whileInView` with staggered timing
- Varied directions (not everything slides up)
- Subtle 1-2deg rotation on entry for organic feel
- `viewport={{ once: true, amount: 0.3 }}`

### Smooth Scroll
- Lenis library for butter-smooth scrolling

---

## Package Changes

**Add:** `lenis` (smooth scroll)
**Remove:** `daisyui`, `three`, `@react-three/fiber`, `@react-three/drei`, `styled-jsx`
**Keep:** `framer-motion`, `@iconify-icon/react`, `phaser`, `next`, `react`, `tailwindcss`
**Fonts:** Load Instrument Serif + JetBrains Mono via Google Fonts (in globals.css)

---

## New Components

```
src/components/
  ui/
    CustomCursor.tsx      — Animated two-part cursor (desktop only)
    MagneticButton.tsx    — Magnetic hover wrapper
    GrainOverlay.tsx      — Film grain noise overlay
    PageTransition.tsx    — Framer Motion page wrapper
    Navigation.tsx        — New nav (replaces AppBar)
    Footer.tsx            — Extracted footer
    SmoothScroll.tsx      — Lenis provider
    ScrollReveal.tsx      — Reusable scroll animation wrapper
  sections/
    Hero.tsx              — Landing hero
    About.tsx             — Bio + photos
    Journey.tsx           — Timeline
    Skills.tsx            — Skills grid
    ProjectGrid.tsx       — Project listing
    ProjectCard.tsx       — Individual project card
    BlogPlaceholder.tsx   — Coming soon
    ContactCTA.tsx        — Get in touch section
  game/
    (all existing game components — untouched)
```

---

## Files to Delete
- `src/components/ui/ThemeProvider.tsx` (no more theme switching)
- `src/components/ui/AppBar.tsx` (replaced by Navigation.tsx)
- `src/app/projects/page.tsx` (replaced by `/work`)

---

## Build Order

### Phase 1: Foundation
1. Update package.json (add/remove deps), npm install
2. Rewrite tailwind.config.js (remove DaisyUI, new tokens)
3. Rewrite globals.css (CSS variables, font imports, grain styles)
4. Create GrainOverlay.tsx
5. Update layout.tsx (remove ThemeProvider, add new providers)

### Phase 2: Navigation & Layout Shell
6. Create Navigation.tsx
7. Create Footer.tsx
8. Create SmoothScroll.tsx + PageTransition.tsx + template.tsx

### Phase 3: Interactive Primitives
9. Create CustomCursor.tsx
10. Create MagneticButton.tsx
11. Create ScrollReveal.tsx

### Phase 4: Pages
12. Rewrite `/` (hero)
13. Create `/about` (migrate content from old home page)
14. Create `/work` (redesign project cards)
15. Create `/blog` (placeholder)
16. Update `/video-game` wrapper (strip DaisyUI, keep game intact)

### Phase 5: Polish
17. Mobile responsive pass
18. Clean up MySVGComponent color references
19. Accessibility check (keyboard nav, aria labels, reduced motion)
