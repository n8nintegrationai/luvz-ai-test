# LUVZ COLLECTION — LUXURY REDESIGN WIREFRAME (COMPRESSED)

**Design Philosophy:** Minimal, intentional, editorial luxury. Heavy whitespace. Jewelry = art. Inspired by Tiffany & Co., Cartier, Mejuri—but distinctly LUVZ.

---

## GLOBAL DESIGN SYSTEM

### Color Palette
| Element | Color | Usage |
|---|---|---|
| Background (Primary) | #FFFFFF, #FAF8F5 | Main surfaces |
| Text (Headers) | #1A1812 | Headlines |
| Text (Body) | #5C5555 | Body copy |
| Accent Gold | #D4AF37 | Sparse, intentional |
| Borders | #E8E3D8 | Ultra-light lines |
| Hover States | rgba(212, 175, 55, 0.08) | Gold glow |

### Typography
- **Headlines:** Cinzel (600-700) – elegant, luxe
- **Body:** Cormorant Garamond (300-400) – refined
- **Accent:** Crimson Pro (200-300) – editorial
- **Line-height:** 1.8-2.0 (generous spacing)

### Spacing
- Base grid: 8px
- Section padding: 80-120px (desktop), 40px (mobile)
- Section gap: 120-160px
- Card spacing: 32-48px

### Imagery
- **Lighting:** Soft, diffused, studio quality
- **Style:** Macro/close-up of silver shine, texture, detail
- **Background:** Minimal, neutral (soft white, cream)
- **Reflections:** Show light, depth, dimensionality
- **Motion:** Subtle only (fade-ins, 300ms transitions)

---

## SECTION 1: NAVIGATION & HEADER

**Header (Sticky, Desktop):**
```
LUVZ  [Home] [Collections] [About] [Contact]  [Chat][WhatsApp]
```

**Specs:**
- Logo: 60-80px height (unchanged)
- Nav items: Cinzel, 12px, tracking 1.5px
- Color: Deep charcoal (#1A1812)
- Hover: Gold underline (2px), 200ms fade-in
- Active: Gold underline persistent
- Icons: Chat & WhatsApp, 24px, non-intrusive
- Background: White + 1px gold border (#E8E3D8)
- Sticky: Box-shadow appears on scroll (0 2px 12px rgba(0,0,0,0.04))

**Mobile:**
- Hamburger menu (charcoal)
- Dropdown vertical nav
- Logo + icons remain visible

---

## SECTION 2: HERO SECTION

**Layout:**
```
[HERO IMAGE: 3000×2000px optimal, 60% viewport height]
[Macro silverware, soft lighting, editorial feel]

"HANDCRAFTED SILVER. TIMELESS BEAUTY."

Each piece carries legacy of 92.5 sterling silver.
Finished with 22K gold. Made for those who know
the difference.

[EXPLORE COLLECTIONS] [PRICE ENQUIRY]
```

**Image:** Close-up jewelry macro, light rays on silver, soft diffuse studio lighting, neutral background

**Typography:**
- Headline: Cinzel, 72px (desktop)/48px (tablet)/36px (mobile), 700 weight, letter-spacing 2px
- Subheading: Cormorant Garamond, 18px, 300 weight, line-height 1.9, max-width 520px

**Buttons:**

| Button | Style |
|---|---|
| EXPLORE COLLECTIONS | Charcoal bg, white text, Cinzel 13px. Hover: gold border (1px). 200ms. |
| PRICE ENQUIRY | Transparent, gold border, gold text. Hover: gold bg, white text. 200ms. |

**Spacing:** Top padding 160px (sticky nav), centered text, 32px gap between buttons, 120px bottom margin

---

## SECTION 3: BRAND STORY — "THE CRAFT"

**Layout (2-col desktop, 1-col mobile):**
```
[LEFT: TEXT]                [RIGHT: MACRO IMAGE]
"WHY STERLING SILVER?"      [400×500px macro detail]
92.5 purity. Commitment.   [Silver texture, light reflection]
...4 copy paragraphs...     
✧ 92.5% Pure Silver
✧ 22K Gold Polish
✧ Lifetime Durability
✧ Conscious Craftsmanship
```

**Left Column:**
- Max-width: 520px. Padding: 60px right.
- **Headline:** Cinzel, 52px, 700, tracking 1.5px, border-top 2px gold, padding-top 24px
- **Body:** Cormorant Garamond, 17px, 300, line-height 1.95, 24px margin per paragraph
- **List:** Cinzel, 14px, 600, 8px per item, ✧ in gold

**Right Column (Desktop only):**
- Macro shot of silver texture, polished metal, ornate detail
- Soft directional studio light
- ~400×500px, margin-left 80px, vertical center align

**Spacing:** 120px horizontal, 100px vertical, 140px gap to next section

---

## SECTION 4: COLLECTIONS SHOWCASE

**Intro:**
```
OUR COLLECTIONS

Curated timeless pieces in 92.5 silver.
```

**Typography:**
- Headline: Cinzel, 56px, 700, tracking 2px
- Subheading: Cormorant Garamond, 18px, 300, line-height 1.8

**Grid:** 4 items (2×2 desktop, 1 mobile), gap 48px, max-width 1000px

**Collection Cards:**
- Image: 1:1 aspect, background #FAF8F5, hover scale 1.02 (300ms ease)
- Title: Cinzel, 20px, 700, tracking 1px
- Description: Cormorant Garamond, 14px, 300
- Price: Crimson Pro, 13px, 200, gold color, "Starting ₹XXXX"
- CTA: "View Collection →", Cinzel 12px, charcoal 0.6 opacity, hover gold 1.0

---

## SECTION 5: FEATURED PRODUCTS

**Intro:**
```
FEATURED PIECES
Hand-selected treasures from current collection
```

**Typography:**
- Headline: Cinzel, 52px, 700, tracking 2px
- Subheading: Cormorant Garamond, 16px, 300

**Product Grid:** 4 items (2×2 desktop), gap 40px

**Individual Product Card:**
- **Image container:** 3:4 portrait, white bg, border 1px gold (#E8E3D8)
  - Hover: shadow 0 8px 32px rgba(0,0,0,0.08), pointer, image opacity 0.95
  - **Click behavior:** Opens modal lightbox with multiple angles
  
- **Card content:**
  - Padding: 28px
  - Title: Cinzel, 18px, 600, tracking 0.8px
  - Material: Cormorant Garamond, 13px, 300, gold color, "92.5 Silver"
  - Description: Cormorant Garamond, 13px, 300, line-height 1.6
  - **Price Enquiry button:** "Price Enquiry →", Cinzel 12px, 600, gold border, gold text. Hover: gold bg, white text (200ms). Opens WhatsApp pre-filled.

**Modal Lightbox:**
- Background: Semi-transparent charcoal (rgba(26, 24, 18, 0.95))
- Card: White, padding 40px, border-radius 0, max-width 700px, centered
- **Image carousel:** Full-width main, 3:4 aspect. Thumbnails 60×80px below (8px gap). Active: gold border.
- **Navigation:** Left/Right arrows (Cinzel 28px, gold). Swipe support. 200ms fade transition.
- **Close:** "×" (Cinzel 32px, charcoal), top-right. Hover: gold, scale 1.1

**View All Button (centered below grid):**
- "VIEW ALL PRODUCTS →", Cinzel 14px, 700, charcoal text, 2px charcoal border, 16×48px padding
- Hover: charcoal bg, white text
- Margin-top: 60px

**Spacing:** 120px horizontal, 100px vertical, 140px gap

---

## SECTION 6: WHY 92.5 SILVER

**Intro:**
```
WHY 92.5 STERLING SILVER?
Not all silver created equal. Here's exceptional.
```

**Typography:**
- Headline: Cinzel, 52px, 700, tracking 2px, centered
- Intro: Cormorant Garamond, 18px, 300, line-height 1.8, max-width 600px, centered, margin-bottom 80px

**Feature Grid:** 6 cards (3×2 desktop, 2 tablet, 1 mobile), gap 32px, max-width 1100px

**Feature Card:**
- Background: #FAF8F5, padding 40×28px, border 1px gold (#E8E3D8), text-align center
- Hover: shadow 0 4px 16px rgba(0,0,0,0.06) (200ms)
- **Title:** Cinzel, 16px, 700, tracking 1px, uppercase
- **Icon** (optional): 40×40px, gold geometric, margin-bottom 12px
- **Description:** Cormorant Garamond, 14px, 300, line-height 1.7

Cards: 92.5% Purity | 22K Gold Polish | Lifetime Durability | Lightweight | Eco-Conscious | Artisan Crafted

---

## SECTION 7: SOCIAL PROOF & TESTIMONIALS

**Headline:**
```
"Jewelry that feels like an investment"
Beloved by 1000+ customers
```

**Typography:**
- Quote: Cormorant Garamond, 24px, 300 italic
- Subheading: Cinzel, 13px, 600, gold

**Testimonial Carousel:**
- Max-width: 700px, centered
- Card: White bg, padding 48px, border-left 4px gold (#D4AF37), shadow 0 4px 20px rgba(0,0,0,0.04)
- **Text:** Cormorant Garamond, 18px, 300 italic, line-height 2.0, margin-bottom 28px
- **Author:** Cinzel, 14px, 600, charcoal. Location: Cormorant Garamond, 13px, 300, gold. Rating: ★★★★★ gold.

**Controls:**
- Previous/Next: Cinzel 28px, gold. Hover opacity 0.7. 40×40px click area. ±24px from card.
- Dots: Active gold (8px), inactive light gray (6px). 8px spacing, centered below. Margin-top 32px.
- Auto-rotate: 5s per testimonial, pause on hover (optional)

**Spacing:** 120px horizontal, 100px vertical, 140px gap

---

## SECTION 8: EMAIL CAPTURE

**Layout:**
```
EXCLUSIVE ACCESS TO NEW LAUNCHES

First to know about limited drops.
Handcrafted pieces. Premium pricing. Luxury, not noise.

[email input field] [SUBSCRIBE button]

We respect privacy. No spam, ever.
```

**Background:** Deep charcoal (#1A1812) OR cream with gold border

**Typography:**
- Headline: Cinzel, 44px, 700, tracking 1.5px, white (or gold on dark)
- Subheading: Cormorant Garamond, 16px, 300, line-height 1.8, max-width 480px, centered
- Privacy note: Crimson Pro, 12px, 200, opacity 0.7

**Form:**
- Layout: Horizontal (desktop), vertical (mobile)
- Container: White/charcoal, 1px gold border, 8px padding, border-radius 2px
- **Email field:** 60% width (desktop), Cormorant Garamond 14px, placeholder "your@email.com". Focus: gold outline, inset shadow.
- **Submit:** "SUBSCRIBE", 40% width, Cinzel 13px, 700, white text, gold bg. Hover: darker gold (#A8860A) (200ms).

**Spacing:** 80px horizontal, 100px vertical, 140px top margin

---

## SECTION 9: FOOTER

**Layout (3-col desktop, stacked mobile):**
```
LUVZ COLLECTION
Handcrafted 92.5 Sterling Silver Jewelry
─────────────────
COLLECTIONS | ABOUT US | CONTACT
• Bangles   | • Craft   | 📞 WhatsApp
• Necklaces | • Sustain | 📧 Email
• Jhumkas   | • Package | 📍 Location
• Pendants  | • Returns |
─────────────────
[Facebook] [Instagram] [Pinterest] [LinkedIn]
© 2025 LUVZ. Handcrafted India. Worldwide shipping.
Privacy Policy | Terms | Sustainability
```

**Background:** Deep charcoal (#1A1812), padding 100×80px

**Logo & Tagline:**
- Logo: 60px height
- Tagline: Cormorant Garamond, 14px, 300 italic, gold color

**Borders:** 1px gold (#D4AF37), opacity 0.3, margin 24px 0

**Columns:** Gap 80px, width ~200px each

**Column Content:**
- Title: Cinzel, 12px, 700, gold, tracking 1.2px
- Items: Cormorant Garamond, 13px, 300, light gold. Bullet • gold. Spacing 8px. Hover: brighter gold (#F0CF6A).

**Social Media:**
- Centered, 4 icons (24px), gold color. Hover: brighter gold + scale 1.1 (200ms). Spacing 20px. Margin 32px 0.

**Copyright:** Crimson Pro, 12px, 200, light gray (#B8AB90), centered, margin-top 32px

**Footer Links:** Cinzel, 11px, 600, gold. Hover: brighter gold. Centered, margin-top 20px.

---

## CORE FEATURES (NON-NEGOTIABLE)

### Theme System (JSON-Driven)

**Source:** `https://raw.githubusercontent.com/.../products.json` — `"theme"` key

**Available Themes:**

| Theme | BG | Text | Accent | Feel |
|---|---|---|---|---|
| Light | #FFFFFF | #1A1812 | #D4AF37 | Clean, editorial |
| Dark | #1A1812 | #F0CF6A | #D4AF37 | Premium, dramatic |
| Earth | Cream | Brown | Muted gold | Organic, artisanal |

**Desktop Behavior:**
- Theme selector UI (3 buttons or swatches) in header
- On selection: Apply immediately (no reload)
- CSS variable transitions (~200ms)
- Store in localStorage (user override persists)
- Default from JSON on first load

**Mobile Behavior:**
- No manual selector (default to JSON value)
- Applied on load automatically

**UI Reactivity:** All text, backgrounds, borders, hover states, buttons, modals adapt to active theme. No hardcoded color values that break.

**Reference:** https://luvz-ai-test.pages.dev/ (visual behavior only, don't copy code)

---

### Wishlist System (Local Storage)

**Heart Icon:**
- Location: Top-right product card image
- Default: Outline charcoal (#1A1812) or white
- Active/Saved: Filled gold (#D4AF37)
- Size: 24px×24px
- Interaction: Toggle saved/unsaved on click. Micro-animation: scale 1.2→1.0 (200ms).

**Local Storage Schema:**
- Key: `luvz_wishlist` (JSON array)
- Contents: Product ID, name, image URL, required fields for WhatsApp
- Persistence: Across sessions until removed
- **Do NOT change** storage mechanism (must stay local storage)

**Wishlist Panel:**
- Access: Heart icon in sticky header with count badge
- Display: Slide-in right (desktop), bottom sheet (mobile)
- Contents: Thumbnails + names + remove buttons (×)
- Empty state: Friendly message
- Badge: Shows item count, hidden when 0

**WhatsApp Share Button:**
- Show: Only when ≥1 item in wishlist
- Behavior: Pre-fill WhatsApp message with all product names. Message format:
  ```
  Hi LUVZ Collection! Wishlist:
  - [Product Name 1]
  - [Product Name 2]
  Could you share pricing & availability?
  ```
- **Do NOT change** WhatsApp flow or storage mechanism

---

### WhatsApp Integration (Persistent)

**Floating Button (Fixed, All Pages):**
- Icon: WhatsApp green logo (#25D366)
- Size: 56×56px (desktop), 52×52px (mobile)
- Position: 32px from right/bottom (desktop), 20px (mobile)
- Purpose: Chat with LUVZ Collection, start conversation
- Enhancements (design only):
  - Subtle pulse glow (2s loop)
  - Tooltip on hover: "Chat with us on WhatsApp"
  - Entrance: Scale-in or fade-in (300ms)
  - Hover: Elevation + scale 1.05
- **Do NOT remove or replace**

**Product Price Enquiry:**
- Trigger: "Price Enquiry →" button on product card
- Message: `Hi LUVZ Collection, I'm interested in [PRODUCT_NAME]. Could you provide current price and availability?`
- Styling (design only): Gold border button, optional 12px WhatsApp icon before text. No functional changes.

**Wishlist Share:** See Wishlist System section above.

---

## PERFORMANCE REQUIREMENTS

### Lighthouse Benchmarks (Current Baseline — Maintain or Improve)

| Metric | Current | Minimum |
|---|---|---|
| Performance | 92 | ≥ 92 |
| Accessibility | 97 | ≥ 97 |
| Best Practices | 77 | ≥ 77 (target 90+) |
| SEO | 100 | 100 |

### Rules

- No heavy third-party scripts blocking render
- No sync JS in `<head>`, use `defer`/`async`
- Avoid layout shifts (CLS): reserve space with width/height or aspect-ratio CSS
- Lazy load below-fold images (`loading="lazy"`)
- Preload LCP image
- No render-blocking CSS (self-host or inline critical)
- No new JS libraries unless essential—preserve vanilla JS approach

### Accessibility (97 — Don't Degrade)

- Interactive elements: `aria-label`, `aria-describedby`, visible text
- Heart buttons: `aria-label="Add to wishlist"` / `"Remove from wishlist"`
- Theme selectors: Keyboard navigable + labelled
- WhatsApp buttons: Descriptive `aria-label`
- Contrast: WCAG AA minimum (4.5:1 body, 3:1 large) across all themes
- Modals: Focus trap + keyboard dismissible (Escape)
- Images: Meaningful `alt` text
- Touch targets: 44×44px minimum

### Asset Optimisation

- Images: WebP primary, JPG fallback
- Fonts: Subset only necessary characters. Font-display: swap. Preload Cinzel weights.
- CSS: Single optimised stylesheet (<50KB gzipped), no unused rules
- JS: <30KB total (minified). No jQuery. Handles nav toggle, modals, chat, carousel, forms.
- SVG: Inline or sprite-based, not separate requests

### SEO (100 — Must Hold)

- Unique `<title>` & `<meta description>` per page
- Heading hierarchy: h1→h2→h3 (no skips)
- Descriptive image `alt` text
- No broken links, valid canonical tags
- Maintain/add structured data (JSON-LD for products)
- Valid sitemap & robots.txt

---

## PROTECTED FEATURES (MUST NOT CHANGE FUNCTION)

1. **WhatsApp Price Enquiry:** Pre-filled message to LUVZ WhatsApp number. Design enhancements only (gold border, hover). No logic changes.

2. **AI Chat (Gemini):** Active & functional. UI enhancement: Chat icon in header (right), slide-in window (right desktop/bottom mobile), gold styling. Function unchanged.

3. **Product Modal:** Click image → modal with multiple angles. Enhancement: Transparent charcoal overlay, white card, image carousel with thumbnails, swipe/arrows, 200ms fade transitions. Function unchanged.

4. **Brand Logo:** LUVZ Collection unchanged. Header 70px, footer 60px.

---

## RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Layout | Padding | Font Scale |
|---|---|---|---|---|
| Desktop | 1200px+ | Multi-column 100% | 120px horiz | 100% |
| Tablet | 768-1199px | 2-col or 1-col | 60px horiz | 90% |
| Mobile | 320-767px | 1-col full | 40px horiz | 80% |

- All grids collapse to 1 column mobile
- Hero image: responsive sizes (desktop 3000×2000, tablet 1600×1200, mobile 800×600)
- Touch targets 44px+ mobile

---

## IMAGE OPTIMISATION

| Asset | Desktop | Tablet | Mobile | Format |
|---|---|---|---|---|
| Hero | 3000×2000 ~400KB | 1600×1200 ~200KB | 800×600 ~80KB | WebP/JPG |
| Product | 400×500 ~150KB | — | — | WebP/JPG |
| Thumbnails | 60×80 ~15KB ea | — | — | WebP/JPG |
| Backgrounds | Minimal (prefer solid) | Minimal | Minimal | SVG/tiny JPG |

- LCP image: preload
- Below-fold: lazy load (`loading="lazy"`)
- Format: WebP primary, JPG fallback

---

## COLOR PALETTE

```
Primary:
#1A1812 (deep charcoal—text, headers)
#FFFFFF (white—backgrounds)
#FAF8F5 (off-white/cream—subtle surfaces)

Accent:
#D4AF37 (warm gold—premium)
#A8860A (darker gold—hover/active)
#F0CF6A (lighter gold—accents)

Text:
#5C5555 (warm gray—body)
#B8AB90 (light gray—secondary)
#D8D3CB (super light—borders)

Shadows:
Light: 0 2px 12px rgba(0,0,0,0.04)
Medium: 0 4px 20px rgba(0,0,0,0.08)
Dark: 0 8px 32px rgba(0,0,0,0.12)

Borders:
#E8E3D8 or rgba(212, 175, 55, 0.12) (subtle)
#D4AF37 (gold)
```

---

## SUMMARY

✓ Minimal + intentional (no clutter)
✓ Editorial tone (luxury magazine, not store)
✓ Craftsmanship focus (jewelry = hero)
✓ Premium execution (whitespace, typography, motion)
✓ Emotional narrative (silver, durability, artistry)
✓ Functionally preserved (WhatsApp, chat, modals, logo safe)
✓ Performant (optimized images, minimal code, fast load)
✓ Theme-adaptive (JSON-driven Light/Dark/Earth + desktop switcher)
✓ Wishlist-enabled (heart local storage + WhatsApp share)
✓ Always-on WhatsApp (floating button all pages)
✓ Lighthouse-compliant (Performance ≥92, Accessibility ≥97, SEO 100)

**Result:** Tiffany & Co. meets Cartier meets Mejuri — uniquely LUVZ Collection.

---

**AWAITING APPROVAL**

Ready for feedback before implementation (HTML / CSS / JavaScript).
