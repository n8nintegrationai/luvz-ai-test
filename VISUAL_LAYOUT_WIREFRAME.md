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

**Mobile:** Single column, centered, 40px padding

---

## CORE FEATURES (NON-NEGOTIABLE)

These features are fundamental to the website's operation and user experience. They must be fully implemented in the redesign and must not be removed, replaced, or broken. Each feature is documented in detail in its own section below.

| Feature | Storage / Integration | Desktop | Mobile |
|---|---|---|---|
| Theme Selector | JSON (remote URL) | Manual switcher UI | Auto from JSON |
| Wishlist | Browser Local Storage | Heart icon + panel | Heart icon + panel |
| WhatsApp Wishlist Share | WhatsApp deep link | Pre-filled message | Pre-filled message |
| WhatsApp Floating Button | WhatsApp deep link | Persistent, all pages | Persistent, all pages |

---

## THEME SYSTEM

### Overview
The website uses a JSON-driven theme system. The active theme is defined by the `"theme"` key in the remote product data JSON file. The UI must respond dynamically to the loaded theme value without requiring a page reload.

### Theme Source
- **Data URL**: `https://raw.githubusercontent.com/n8nintegrationai/luvz-collection-dev/refs/heads/main/public/data/products.json`
- **JSON Key**: `"theme"`
- **Example value**: `"earth"`
- **Do NOT change** how the theme is fetched or how the JSON is structured — only document and implement behavior

### Available Themes

#### Light Theme
- Background: Pure white (#FFFFFF) / off-white (#FAF8F5)
- Text: Deep charcoal (#1A1812)
- Accent: Warm gold (#D4AF37)
- Cards/surfaces: White with subtle gold borders
- Overall feel: Clean, editorial, minimal luxury

#### Dark Theme
- Background: Deep charcoal (#1A1812)
- Text: White / light gold (#F0CF6A)
- Accent: Warm gold (#D4AF37)
- Cards/surfaces: Dark surfaces with gold accents
- Overall feel: Premium, dramatic, night editorial

#### Earth Theme
- Background: Warm cream / parchment tones
- Text: Dark earth brown
- Accent: Muted gold / bronze
- Cards/surfaces: Warm off-white with earth-toned borders
- Overall feel: Organic, grounded, artisanal luxury

### Behavior Requirements

#### Desktop Browsers
- A **theme selector UI** must be present and accessible
- Recommended placement: Top-right area of sticky header or as a compact floating control
- Selector UI options (choose one at implementation):
  - Three labeled buttons: `Light` | `Dark` | `Earth`
  - Three small color swatches/icons representing each theme
  - A minimal dropdown control
- On selection:
  - Active theme is applied immediately (no page reload)
  - Layout must remain fully intact — no broken spacing, overflow, or contrast issues
  - Selected theme state may be stored in `localStorage` so the user's preference persists across sessions
  - The JSON-defined default should be used on first load; user override takes precedence thereafter

#### Mobile Browsers
- No manual theme switcher is required on mobile (unless explicitly added in a future iteration)
- Theme defaults to the value defined in the remote JSON (`"theme": "earth"`)
- The loaded theme is applied automatically on page load
- No user-facing controls needed

### UI Reactivity Requirements
- All text, backgrounds, borders, hover states, buttons, and modal overlays must adapt to the active theme
- No hardcoded color values that would break under a different theme
- Transitions between themes (on desktop) must be smooth — use CSS variable transitions (~200ms)
- Icons, SVGs, and decorative elements must also respond to theme context where applicable

### Reference Site
- Live implementation reference: `https://luvz-ai-test.pages.dev/`
- Do NOT replicate code — use only for visual behavior reference

---

## WISHLIST SYSTEM

### Overview
Users can save products they are interested in by clicking a heart icon on product cards. The wishlist is stored in the browser's local storage and persists across sessions. Users can view, manage, and share their wishlist via WhatsApp.

### Heart Icon — Product Cards

- **Location**: Top-right corner of every product card image container
- **Icon**: Heart (outline by default, filled on active/saved state)
- **Size**: 24px × 24px
- **Color**:
  - Default (not saved): Charcoal outline (#1A1812) or white outline with subtle shadow for visibility on images
  - Active (saved): Filled red or filled gold (#D4AF37) — to be confirmed at implementation
- **Interaction**:
  - Single tap/click toggles saved/unsaved state
  - Toggling on: Heart fills, item is added to wishlist in local storage
  - Toggling off: Heart empties, item is removed from wishlist in local storage
  - Micro-animation on toggle: subtle scale pulse (scale 1.2 → 1.0, 200ms)

### Local Storage Schema
- **Storage key**: `luvz_wishlist` (or equivalent, consistent across the codebase)
- **Value format**: JSON array of saved product objects
- Each product entry must include at minimum:
  - Product ID
  - Product name
  - Product image URL (for display in wishlist panel)
  - Any additional fields required for WhatsApp message generation
- **Persistence**: Items remain across browser sessions until explicitly removed by the user
- **Do NOT change** the storage mechanism — must remain local storage

### Wishlist Panel / View

- **Access**: Via a wishlist icon in the sticky header (heart icon with item count badge)
- **Display**: Slide-in panel from the right (desktop) or bottom sheet (mobile)
- **Contents**:
  - List of all saved products
  - Each item shows: product image thumbnail, product name, remove button (×)
  - Empty state: Friendly message e.g. "Your wishlist is empty. Tap ♡ on any piece to save it."
- **Remove item**: Clicking × removes from panel and from local storage immediately
- **Wishlist count badge**:
  - Shown on the header heart icon
  - Updates in real time as items are added/removed
  - Hidden or shows `0` when wishlist is empty

### WhatsApp Share — "Send Wishlist"

- **Button**: "Send Wishlist via WhatsApp" — displayed inside the wishlist panel, below the items list
- **Visibility**: Only shown when wishlist contains at least one item
- **Behavior on click**:
  - Constructs a pre-filled WhatsApp message containing all saved product names
  - Opens WhatsApp (web or app) with the message pre-filled to the LUVZ Collection WhatsApp number
- **Message format** (illustrative):
  ```
  Hi LUVZ Collection! Here is my wishlist:
  - [Product Name 1]
  - [Product Name 2]
  - [Product Name 3]
  Could you please share pricing and availability? Thank you!
  ```
- **Do NOT change** the WhatsApp flow logic or the storage mechanism that feeds into it

---

## WHATSAPP INTEGRATION

### 1. Floating WhatsApp Button (Persistent)

- **Type**: Fixed-position floating action button
- **Visibility**: Present on all pages at all times, across all breakpoints
- **Icon**: WhatsApp logo (official green brand icon or equivalent SVG)
- **Color**: WhatsApp green (#25D366) background
- **Size**: 56px × 56px (desktop), 52px × 52px (mobile)
- **Position**: Bottom-right corner of viewport
  - Desktop: 32px from right, 32px from bottom
  - Mobile: 20px from right, 20px from bottom
- **Purpose**:
  - Opens a WhatsApp chat with the LUVZ Collection number
  - Enables customers to initiate a conversation or place an order directly
- **Allowed enhancements** (design only — do not change function):
  - Subtle pulse/glow animation to draw attention (soft shadow animation, 2s loop)
  - Tooltip on hover (desktop): "Chat with us on WhatsApp"
  - Smooth entrance animation on page load (scale-in or fade-in, 300ms)
  - Slight hover elevation effect (box-shadow increase, scale 1.05)
- **Do NOT remove or replace** this button

### 2. Product Price Enquiry via WhatsApp

- **Trigger**: "Price Enquiry →" button on every product card
- **Behavior**: Opens WhatsApp with a pre-filled message specific to the product
- **Message format**:
  ```
  Hi LUVZ Collection, I'm interested in the [PRODUCT_NAME]. 
  Could you provide the current price and availability?
  ```
- **Styling** (design enhancement only):
  - Gold border button with hover fill effect (as documented in Section 5)
  - Optional small WhatsApp icon (12px) before button text
  - No functional changes to the WhatsApp link generation

### 3. WhatsApp Wishlist Share

- Documented fully under **Wishlist System → WhatsApp Share** above
- Reuses the same LUVZ Collection WhatsApp number
- Message is dynamically constructed from wishlist contents

---

## PERFORMANCE REQUIREMENTS

### Lighthouse Score Benchmarks

The following scores reflect the **current baseline** and must be **maintained or improved** throughout the redesign. No regression is acceptable.

| Metric | Current Score | Minimum Acceptable |
|---|---|---|
| Performance | 92 | ≥ 92 |
| Accessibility | 97 | ≥ 97 |
| Best Practices | 77 | ≥ 77 (target: 90+) |
| SEO | 100 | 100 |

### Performance Rules

- No heavy third-party scripts (analytics, tracking pixels, etc.) that block rendering
- No synchronous JavaScript in `<head>`
- All non-critical scripts must be `defer` or `async`
- Avoid layout shifts (CLS): reserve space for images using explicit width/height or aspect-ratio CSS
- Use native lazy loading for below-fold images (`loading="lazy"`)
- LCP (Largest Contentful Paint) image must be preloaded
- No render-blocking CSS from external sources (self-host or inline critical CSS)
- Avoid adding new JavaScript libraries unless essential — existing vanilla JS approach must be preserved

### Accessibility Rules (Score: 97 — Do Not Degrade)

- All interactive elements must have accessible labels (`aria-label`, `aria-describedby`, or visible text)
- Heart (wishlist) icon buttons must have `aria-label="Add to wishlist"` / `aria-label="Remove from wishlist"`
- Theme selector controls must be keyboard navigable and labelled
- WhatsApp buttons must have descriptive `aria-label` values (e.g., `"Chat with LUVZ Collection on WhatsApp"`)
- Colour contrast must meet WCAG AA minimum (4.5:1 for body text, 3:1 for large text) across all three themes
- Modal/panel overlays must trap focus and be dismissible via keyboard (Escape key)
- All images must have meaningful `alt` attributes
- Touch targets must be minimum 44px × 44px

### Asset Optimisation Rules

- Images: WebP format primary, JPG fallback (as documented in Performance & Image Optimization section)
- Fonts: Subset to required characters only; use `font-display: swap`
- CSS: Single optimised stylesheet, no unused rules
- JavaScript: Remain under ~30KB total (minified); no jQuery or bloat libraries
- SVG icons: Inline or sprite-based, not loaded as separate network requests where avoidable

### SEO Rules (Score: 100 — Must Not Drop)

- All pages must have unique, descriptive `<title>` and `<meta description>` tags
- Heading hierarchy must be preserved (`h1` → `h2` → `h3`, no skipping)
- Images must have descriptive `alt` text
- No broken links or missing canonical tags
- Structured data (JSON-LD) for products should be maintained or added if not present
- Sitemap and robots.txt must remain valid

---

## PROTECTED FEATURES (MUST REMAIN UNCHANGED)

### 1. WhatsApp Price Enquiry Button
- **Behavior**: Every product has a "Price Enquiry" button
- **Action**: On click → Opens WhatsApp with pre-filled message
- **Message Format**: 
  ```
  Hi LUVZ Collection, I'm interested in the [PRODUCT_NAME]. 
  Could you provide the current price and availability?
  ```
- **UI Enhancement** (design only):
  - Styled as: Gold border button with hover effect
  - Positioned: Below product name or in product card footer
  - Icon: Optional WhatsApp icon (12px) before text
  - No functional changes to WhatsApp integration

### 2. AI Chat Assistant (Gemini Integration)
- **Current Integration**: AI chat is active and functional
- **UI Enhancement** (design only):
  - **Chat Icon**: Positioned in sticky header (right side)
  - **Chat Window**: Slides in from right on desktop, from bottom on mobile
  - **Styling**:
    - Header: Gold bar with white text (Cinzel 14px)
    - Message bubbles: White (user), light gold (AI)
    - Input field: White text on charcoal background
    - Send button: Gold background
  - **Animation**: Smooth slide-in (300ms ease-out)
  - **No functional changes** — only visual redesign

### 3. Product Image Modal / Lightbox
- **Current Interaction**: Clicking product image opens modal with multiple angles
- **Enhancement** (visual only):
  - **Modal Background**: Semi-transparent charcoal (rgba(26, 24, 18, 0.95))
  - **Modal Card**:
    - Background: White
    - Padding: 40px
    - Border-radius: 0 (sharp edges)
    - Max-width: 700px
    - Centered on viewport
  
  - **Image Carousel**:
    - Main image: Full width (fill modal width minus padding)
    - Aspect ratio: 3:4 (portrait)
    - Thumbnails: 4 small images below (60px × 80px each, 8px gap)
    - Active thumbnail: Gold border
    - Hover: Slight scale + gold border
  
  - **Navigation**:
    - Left/Right arrows (Cinzel 28px, gold)
    - Or swipe/arrow key support
    - Transition: 200ms fade between images
  
  - **Close Button**:
    - "×" symbol (Cinzel 32px, charcoal)
    - Top-right corner
    - Hover: Gold, scale 1.1
  
  - **Product Info** (optional, in modal):
    - Below carousel: Product name, material, description
    - Same styling as product card
  
  - **No functional changes** — enhance visual presentation only

### 4. Brand Logo
- **LUVZ Collection Logo**: Remain unchanged
- **Usage**:
  - Header: 70px height
  - Footer: 60px height
- **Spacing**: Consistent with brand guidelines

---

## GLOBAL INTERACTIONS & ANIMATIONS

### Hover Effects
- **Links**: Gold underline fade-in (200ms), opacity increase
- **Buttons**: 
  - Primary: Gold border fade-in, text color shift
  - Secondary: Background color shift to gold, text white
  - Duration: 200ms ease-out
- **Cards**: Subtle shadow increase (0 4px 20px rgba), 200ms
- **Images**: Subtle scale (1.02) or opacity shift (0.95), 200ms

### Scroll Animations
- **Fade-in**: Elements fade in as they scroll into view (200-400ms, with slight scale)
- **Parallax**: Very subtle (0.5x speed) on large hero images
- **Sticky Header**: Subtle shadow appears on scroll (0 2px 12px rgba(0,0,0,0.04))

### Page Transitions
- **Fade between pages**: 150ms fade-out/fade-in
- **No jarring changes** — smooth, luxury aesthetic

### Mobile Interactions
- **Touch targets**: Minimum 44px × 44px
- **Tap feedback**: Very subtle opacity shift (0.9)
- **Swipe**: Product carousel supports left/right swipe
- **Scroll**: Smooth scrolling enabled

---

## RESPONSIVE DESIGN BREAKPOINTS

### Desktop (1200px and up)
- Full multi-column layouts
- All features visible
- 120px horizontal padding

### Tablet (768px - 1199px)
- 2-column grids become 2-column or 1-column
- Product cards maintain quality
- 60px horizontal padding
- Slightly smaller typography (90% of desktop size)

### Mobile (320px - 767px)
- Full single-column layout
- Hamburger menu navigation
- Simplified hero image (smaller file size)
- 40px horizontal padding
- All touch targets 44px+ 
- Font sizes scale down proportionally (80% of tablet size)

---

## PERFORMANCE & IMAGE OPTIMIZATION

### Hero Image
- **Desktop**: 3000px × 2000px (optimized JPG/WebP, ~400KB)
- **Tablet**: 1600px × 1200px (~200KB)
- **Mobile**: 800px × 600px (~80KB)
- **Format**: WebP primary, JPG fallback
- **Lazy loading**: LCP image, preload for speed

### Product Images
- **Display**: 400px × 500px (optimized, ~150KB each)
- **Thumbnails**: 60px × 80px (~15KB each)
- **Format**: WebP + JPG fallback
- **Lazy loading**: Lazy load product grid images below fold

### Background Images
- **Minimal use** — prefer solid colors
- **When used**: Ultra-light, 1-2KB SVG or tiny JPG

### Typography
- **Font subsetting**: Load only necessary characters
- **Font-display**: swap (show system font while loading)
- **Preload**: Cinzel 600/700 weights (priority fonts)

### CSS
- **Single stylesheet** (optimized, ~50KB gzipped)
- **No bloat**: Only necessary styles
- **Grid/Flexbox**: Modern layout techniques

### JavaScript
- **Minimal vanilla JS** (~30KB total)
- **No jQuery or bloat libraries**
- **Functionality**: 
  - Navigation toggle (mobile)
  - Modal/lightbox handling
  - Chat window slide-in
  - Testimonial carousel
  - Email form submission

---

## COLOR REFERENCE PALETTE

```
Primary:
- Deep Charcoal: #1A1812 (text, headers, primary elements)
- Pure White: #FFFFFF (backgrounds, cards)
- Off-White/Cream: #FAF8F5 (subtle backgrounds)

Accent:
- Warm Gold: #D4AF37 (premium, accent, hover states)
- Darker Gold: #A8860A (hover, active states)
- Lighter Gold: #F0CF6A (very light accents)

Text:
- Warm Gray: #5C5555 (body text, readable)
- Light Gray: #B8AB90 (secondary/footer text)
- Super Light: #D8D3CB (borders, very subtle elements)

Shadows:
- Shadow Light: 0 2px 12px rgba(0,0,0,0.04)
- Shadow Medium: 0 4px 20px rgba(0,0,0,0.08)
- Shadow Dark: 0 8px 32px rgba(0,0,0,0.12)

Borders:
- Subtle Border: #E8E3D8 or rgba(212, 175, 55, 0.12)
- Gold Border: #D4AF37
```

---

## SUMMARY

This luxury redesign maintains the integrity of LUVZ Collection while elevating it to a premium jewelry brand standard. Every section is:

✓ **Minimal and intentional** — no clutter, every element has purpose
✓ **Editorial in tone** — reads like luxury magazine, not a commerce site
✓ **Focused on craftsmanship** — jewelry is the hero, photography is paramount
✓ **Premium in execution** — whitespace, typography, subtle animations
✓ **Emotionally engaging** — storytelling about silver, durability, artistry
✓ **Functionally preserved** — WhatsApp, chat, modals, logo all protected
✓ **Performant** — optimized images, minimal code, fast load times
✓ **Theme-adaptive** — JSON-driven theme system (Light / Dark / Earth) with desktop switcher
✓ **Wishlist-enabled** — heart icon saving to local storage with WhatsApp share flow
✓ **Always-on WhatsApp** — persistent floating button on all pages, all breakpoints
✓ **Lighthouse-compliant** — Performance ≥92, Accessibility ≥97, SEO = 100 must be maintained

The result: A website that feels like **Tiffany & Co. meets Cartier meets Mejuri**, but uniquely LUVZ Collection.

---

**READY FOR APPROVAL**

Awaiting review and feedback on this visual layout before proceeding to implementation (HTML, CSS, JavaScript).
