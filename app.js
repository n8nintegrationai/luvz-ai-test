    // ╔══════════════════════════════════════╗
    // ║   ✦  LUVZ COLLECTION — CONFIG   ✦   ║
    // jsDelivr CDN URL for fastest global delivery
    // const DATA_URL = 'https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection@main/data/products.json';
    // Change '@main' to '@latest'
    const DATA_URL = 'https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection@latest/data/products.json';
    const WA_NUM = '918919359961';
    const VIS = 4; // cards per page on desktop
    // ╚══════════════════════════════════════╝

    /* ── Theme ─────────────────────────── */
    function setTheme(t, save = true) {
      document.documentElement.setAttribute('data-theme', t);
      document.querySelectorAll('.tb').forEach(b => b.classList.toggle('on', b.dataset.t === t));
      if (save) localStorage.setItem('luvz-theme', t);
    }
    setTheme(localStorage.getItem('luvz-theme') || 'dark', false);

    /* ── Navbar ─────────────────────────── */
    // Keep --modal-h accurate on orientation change
    window.addEventListener('resize', () => {
      if (document.getElementById('moverlay').classList.contains('open')) {
        document.documentElement.style.setProperty('--modal-h', window.innerHeight + 'px');
      }
    }, { passive: true });

    window.addEventListener('scroll', () => {
      document.getElementById('nav').classList.toggle('stuck', window.scrollY > 50);
      const si = document.querySelector('.scroll-ind');
      if (si) si.style.opacity = window.scrollY > 100 ? '0' : '1';

      // Task 4B: show floating WA only after scrolling past hero
      const fwa = document.getElementById('fwa');
      if (fwa) {
        const hero = document.querySelector('.hero');
        const heroH = hero ? hero.offsetHeight : window.innerHeight;
        fwa.classList.toggle('fwa-visible', window.scrollY > heroH * 0.6);
      }
    }, { passive: true });
    function toggleMenu(forceClose) {
      const m = document.getElementById('mob-menu');
      const willOpen = forceClose ? false : !m.classList.contains('open');
      m.classList.toggle('open', willOpen);
      // Lock body scroll while overlay is open
      document.body.style.overflow = willOpen ? 'hidden' : '';
    }
    // Close menu on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.getElementById('mob-menu').classList.contains('open')) {
        toggleMenu(true);
      }
    });

    /* ── Reveal ─────────────────────────── */
    const ro = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target) } });
    }, { threshold: .07 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

    /* ── Category meta ──────────────────── */
    const CAT_META = {
      necklace: { icon: '📿', label: 'Necklace' },
      pendant: { icon: '💎', label: 'Pendant' },
      earrings: { icon: '✨', label: 'Earrings' },
      bangles: { icon: '⭕', label: 'Bangles' },
      jhumkas: { icon: '🔔', label: 'Jhumkas' },
      sets: { icon: '👑', label: 'Sets' },
    };

    function initCategoryAutoScroll() {
      const outer = document.querySelector('.cat-carousel-outer');
      const track = document.getElementById('cat-grid');
      if (!outer || !track) return;

      // Desktop: CSS catScroll animation handles it — no JS needed.
      // Mobile only: rAF-based scrollLeft auto-scroll.
      // On mobile, CSS sets animation:none, so no conflict.
      const isMobile = () => window.innerWidth <= 768;
      if (!isMobile()) return;

      let raf = null;
      let paused = false;
      let speed = 0.5; // px per frame — slow, smooth glide

      function autoScroll() {
        if (!paused) {
          outer.scrollLeft += speed;
          // Seamless loop: when we've scrolled past half the track width,
          // snap back to 0. Track is doubled (tilesHTML + tilesHTML).
          if (outer.scrollLeft >= track.scrollWidth / 2) {
            outer.scrollLeft = 0;
          }
        }
        raf = requestAnimationFrame(autoScroll);
      }

      // Pause on touch, resume after lift
      outer.addEventListener('touchstart', () => { paused = true; }, { passive: true });
      outer.addEventListener('touchend', () => {
        setTimeout(() => { paused = false; }, 1200); // 1.2s pause after swipe
      }, { passive: true });

      raf = requestAnimationFrame(autoScroll);

      // Stop if viewport resizes to desktop
      window.addEventListener('resize', () => {
        if (!isMobile() && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        } else if (isMobile() && !raf) {
          raf = requestAnimationFrame(autoScroll);
        }
      }, { passive: true });
    }

    /* ── Section meta ───────────────────── */
    const SM = {
      top_sellers: { badge: 'b-hot', label: '✨ Bestseller', bt: 'Best Seller' },
      new_collection: { badge: 'b-new', label: '💎 New Arrival', bt: 'New Arrival' },
    };

    /* ── Helpers ────────────────────────── */
    const waURL = n => `https://wa.me/${WA_NUM}?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(n || 'this piece')}%20%F0%9F%A4%A9`;
    const fmtP = p => (p && p > 0) ? '₹' + Number(p).toLocaleString('en-IN') : null;
    const WA_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

    /* ── Image optimization helpers ─────── */
    // Optimize Cloudinary URLs with auto format, quality, and responsive sizes
    function optimizeCloudinaryUrl(url, width = 800, quality = 85) {
      if (!url || !url.includes('cloudinary.com')) return url;
      // Insert transformation params: f_auto (format), q_auto (quality), w (width), c (crop)
      return url.replace(
        /\/image\/upload\//,
        `/image/upload/f_auto,q_auto:best,w_${width},c_fill/`
      );
    }

    // Generate srcset for responsive images
    function generateSrcset(url, widths = [400, 600, 800]) {
      if (!url || !url.includes('cloudinary.com')) return '';
      return widths.map(w => `${optimizeCloudinaryUrl(url, w)} ${w}w`).join(', ');
    }


    /* ── Task 3A: JSON-LD Schema injection ─── */
    function injectProductSchema(data) {
      // Remove any previous injection
      const prev = document.getElementById('ld-products');
      if (prev) prev.remove();

      // Gather all products from all sections
      const sections = ['top_sellers','new_collection','necklace','pendant',
                        'earrings','bangles','jhumkas','sets'];
      const allProducts = [];
      sections.forEach(sec => {
        const items = data[sec] || [];
        items.forEach(p => { if (p && p.name && p.image) allProducts.push(p); });
      });
      if (!allProducts.length) return;

      const SITE = 'https://luvzcollection.netlify.app';
      const listItems = allProducts.map((p, i) => {
        const slug = (p.name || '').toLowerCase()
          .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const price = (p.price && p.price > 0) ? p.price : null;
        const productNode = {
          "@type": "Product",
          "name": p.name,
          "description": p.description || '',
          "image": p.image || '',
          "url": `${SITE}/#product/${slug}`,
          "brand": { "@type": "Brand", "name": "LUVZ Collection" },
          "category": p.category || 'Jewellery',
          "material": "92.5 Sterling Silver with 22 Carat Gold Polish"
        };
        if (price) {
          productNode.offers = {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": price,
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "LUVZ Collection" }
          };
        }
        return { "@type": "ListItem", "position": i + 1, "item": productNode };
      });

      const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "LUVZ Collection — Handcrafted Silver Jewellery",
        "description": "Shop 92.5 silver jewellery with 22K gold polish from LUVZ Collection",
        "url": SITE,
        "numberOfItems": listItems.length,
        "itemListElement": listItems
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-products';
      script.textContent = JSON.stringify(schema, null, 0);
      document.head.appendChild(script);
    }

    /* ── Heritage & About — driven from JSON ── */
    function renderHeritagePage(cfg) {
      // cfg = d.heritage = { image, title, body, cta_text, cta_href }
      if (!cfg) return;
      const bg = document.getElementById('heritage-bg');
      if (bg && cfg.image) {
        const url = optimizeCloudinaryUrl(cfg.image, 1400);
        bg.style.backgroundImage = `url('${url}')`;
      }
      const t = document.querySelector('.heritage-title');
      if (t && cfg.title) t.innerHTML = cfg.title; // allows <br/> in JSON

      const b = document.querySelector('.heritage-body');
      if (b && cfg.body) b.textContent = cfg.body;

      const cta = document.querySelector('.heritage-cta');
      if (cta) {
        if (cfg.cta_text) cta.textContent = cfg.cta_text;
        if (cfg.cta_href) cta.href = cfg.cta_href;
      }
    }

    function renderAboutSection(cfg) {
      // cfg = d.about = { image, title, body1, body2 }
      if (!cfg || !cfg.image) return;
      const sk  = document.getElementById('about-img-sk');
      const img = document.getElementById('about-img');
      if (!img) return;

      const url = optimizeCloudinaryUrl(cfg.image, 700);
      img.src = url;
      img.srcset = generateSrcset(cfg.image, [400, 600, 800]);
      img.sizes = '(max-width:720px) 90vw, 45vw';

      img.onload = () => {
        img.style.opacity = '1';
        if (sk) sk.style.display = 'none';
      };
      img.onerror = () => {
        img.style.opacity = '1'; // show fallback colour from about-img-wrap background
        if (sk) sk.style.display = 'none';
      };

      const title = document.querySelector('.about-title');
      if (title && cfg.title) title.innerHTML = cfg.title;

      const bodies = document.querySelectorAll('.about-body');
      if (cfg.body1 && bodies[0]) bodies[0].textContent = cfg.body1;
      if (cfg.body2 && bodies[1]) bodies[1].textContent = cfg.body2;
    }

    /* ── Build product card ─────────────── */
    /* ── Wishlist (localStorage) ─────────── */
    const productRegistry = {}; // id → product object, populated as cards are built

    function getWishlist() { try { return JSON.parse(localStorage.getItem('luvz-wish') || '[]') } catch { return [] } }
    function saveWishlist(w) { try { localStorage.setItem('luvz-wish', JSON.stringify(w)) } catch { } }
    function isWished(id) { return getWishlist().includes(id) }

    function toggleWish(btn, id) {
      let w = getWishlist();
      const idx = w.indexOf(id);
      if (idx === -1) {
        w.push(id);
        btn.classList.add('wished');
        btn.querySelector('svg').setAttribute('fill', 'var(--gold)');
      } else {
        w.splice(idx, 1);
        btn.classList.remove('wished');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
      saveWishlist(w);
      updateWishCount();
    }

    function updateWishCount() {
      const count = getWishlist().length;
      // Desktop nav badge
      const nb = document.getElementById('nav-wish-count');
      if (nb) { nb.textContent = count; nb.classList.toggle('has-items', count > 0); }
      // Mobile nav badge
      const mb = document.getElementById('mob-wish-count');
      if (mb) { mb.textContent = count; mb.style.display = count > 0 ? 'block' : 'none'; }
      // Drawer badge
      const wb = document.getElementById('wish-count-badge');
      if (wb) wb.textContent = count;
    }

    function openWishlist() {
      renderWishDrawer();
      document.getElementById('wish-overlay').classList.add('open');
      document.getElementById('wish-drawer').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeWishlist() {
      document.getElementById('wish-overlay').classList.remove('open');
      document.getElementById('wish-drawer').classList.remove('open');
      document.body.style.overflow = '';
    }

    function removeFromWishlist(id) {
      let w = getWishlist();
      w = w.filter(x => x !== id);
      saveWishlist(w);
      updateWishCount();
      // Update any visible heart buttons on the page
      document.querySelectorAll('.pcard-wish').forEach(btn => {
        if (btn.getAttribute('data-pid') === id || btn.onclick?.toString().includes(`'${id}'`)) {
          btn.classList.remove('wished');
          btn.querySelector('svg')?.setAttribute('fill', 'none');
        }
      });
      renderWishDrawer();
    }


    /* ── Task 3B + 4A: Hash routing & dynamic meta ─── */
    const SITE_TITLE = 'LUVZ Collection | 92.5 Silver Jewelry with 22K Gold Polish';
    const SITE_DESC  = 'Shop handcrafted 92.5 sterling silver jewelry with 22 carat gold polish. Elegant necklaces, bangles, jhumkas, earrings and pendant sets.';
    const SITE_URL   = 'https://luvzcollection.netlify.app';

    function toSlug(name) {
      return (name || '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    function setMetaTags(title, desc, image, url) {
      document.title = title;
      const setMeta = (sel, val) => {
        const el = document.querySelector(sel);
        if (el) el.setAttribute('content', val);
      };
      setMeta('meta[name="description"]', desc);
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[property="og:description"]', desc);
      if (image) setMeta('meta[property="og:image"]', image);
      if (url) setMeta('meta[property="og:url"]', url);
    }

    function pushProductHash(slug) {
      if (history.replaceState) {
        history.replaceState(null, '', `#product/${slug}`);
      }
    }

    function clearHash() {
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      setMetaTags(SITE_TITLE, SITE_DESC, null, SITE_URL);
    }

    // On page load: if hash matches a product, open its modal
    function handleInitialHash() {
      const hash = location.hash;
      if (!hash.startsWith('#product/')) return;
      const slug = hash.replace('#product/', '');
      // Search productRegistry for matching slug
      const found = Object.values(productRegistry).find(p =>
        toSlug(p.name) === slug
      );
      if (found) {
        // Determine badge from context
        const badge = found.badge === 'new' ? 'New Arrival' : 'LUVZ Collection';
        setTimeout(() => openModal(found, badge), 400); // slight delay for DOM ready
      }
    }

    function renderWishDrawer() {
      const ids = getWishlist();
      const body = document.getElementById('wish-body');
      const footer = document.getElementById('wish-footer');
      const badge = document.getElementById('wish-count-badge');
      if (badge) badge.textContent = ids.length;

      if (ids.length === 0) {
        body.innerHTML = `<div class="wish-empty">
      <div class="wish-empty-icon">🤍</div>
      <div class="wish-empty-title">Your wishlist is empty</div>
      <p class="wish-empty-sub">Tap the heart ♡ on any product to save it here for later.</p>
    </div>`;
        if (footer) footer.style.display = 'none';
        return;
      }

      // Build items — use productRegistry if available, fallback gracefully
      const items = ids.map(id => {
        const p = productRegistry[id];
        if (!p) return `<div class="wish-item">
      <div class="wish-item-img" style="display:flex;align-items:center;justify-content:center;color:var(--txt2);opacity:.3;font-size:1.4rem">💍</div>
      <div class="wish-item-info">
        <div class="wish-item-name" style="opacity:.4">Product #${id}</div>
        <div class="wish-item-btns">
          <button class="wish-item-remove" onclick="removeFromWishlist('${id}')" aria-label="Remove">✕</button>
        </div>
      </div>
    </div>`;
        const fb = `https://placehold.co/140x186/141210/D4AF37?text=${encodeURIComponent(p.name || 'LUVZ')}`;
        const price = fmtP(p.price);
        return `<div class="wish-item">
      <div class="wish-item-img">
        <img loading="lazy" src="${optimizeCloudinaryUrl(p.image || fb, 200)}" srcset="${generateSrcset(p.image, [140, 200])}" sizes="70px" alt="${p.name || ''}" loading="lazy" onerror="this.onerror=null;this.src='${optimizeCloudinaryUrl(fb, 200)}'" decoding="async"/>
      </div>
      <div class="wish-item-info">
        ${p.category ? `<div class="wish-item-cat">${p.category}</div>` : ''}
        <div class="wish-item-name gold-text">${p.name || ''}</div>
        ${price ? `<div class="wish-item-price">${price}</div>` : ''}
        <div class="wish-item-btns">
          <a href="${waURL(p.name)}" target="_blank" rel="noopener noreferrer" class="wish-item-wa">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Enquire
          </a>
          <button class="wish-item-remove" onclick="removeFromWishlist('${id}')" aria-label="Remove from wishlist">✕</button>
        </div>
      </div>
    </div>`;
      }).join('');

      body.innerHTML = items;

      // "Enquire All" WhatsApp link
      const wishedProducts = ids.map(id => productRegistry[id]).filter(Boolean);
      if (wishedProducts.length > 0 && footer) {
        footer.style.display = 'block';
        const names = wishedProducts.map(p => p.name).filter(Boolean).join(', ');
        const msg = `Hi! I'm interested in these pieces from LUVZ Collection 🤩\n${names}\n\nCould you please share details and pricing?`;
        const waLink = document.getElementById('wish-wa-all');
        if (waLink) waLink.href = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
      } else if (footer) {
        footer.style.display = 'none';
      }
    }


    function buildCard(p, sec) {
      const m = SM[sec];
      const fb = `https://placehold.co/400x533/141210/D4AF37?text=${encodeURIComponent(p.name || 'LUVZ')}`;
      const ps = JSON.stringify(p).replace(/\\/g, '\\\\').replace(/'/g, "&#39;").replace(/"/g, '&quot;');
      const price = fmtP(p.price);
      const cat = p.category || sec.replace('_', ' ');
      const pid = p.id || btoa(p.name || Math.random()).slice(0, 8);

      // Register in product map so wishlist drawer can display full details
      productRegistry[pid] = { ...p, category: cat };

      // Badge: JSON can override with badge:"limited"|"soldout"|"new" or use section default
      let badgeHtml = '';
      if (p.badge === 'soldout' || p.sold_out) {
        badgeHtml = `<div class="badge b-soldout">Sold Out</div>`;
      } else if (p.badge === 'limited' || p.limited) {
        badgeHtml = `<div class="badge b-lim">🔥 Limited Stock</div>`;
      } else if (p.badge === 'new') {
        badgeHtml = `<div class="badge b-new">✦ New Arrival</div>`;
      } else {
        badgeHtml = `<div class="badge ${m.badge}">${m.label}</div>`;
      }

      // Scarcity line
      const scarcity = p.scarcity ? `<div class="pcard-scarcity">🔴 ${p.scarcity}</div>` : '';

      return `<div class="carousel-item"><div class="pcard reveal" onclick="openModal(JSON.parse(this.dataset.p),'${m.bt}')" data-p='${ps}'>
    <div class="pcard-img">
      <img loading="lazy" src="${optimizeCloudinaryUrl(p.image || fb, 600)}" srcset="${generateSrcset(p.image, [400, 600, 800])}" sizes="(max-width: 480px) 90vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw" alt="${(p.name || '').replace(/"/g, '&quot;')}" loading="lazy" onerror="this.onerror=null;this.src='${optimizeCloudinaryUrl(fb, 600)}'" decoding="async"/>
      <div class="pcard-img-ov"></div>
      <div class="pcard-bloom" aria-hidden="true"></div>
      <div class="pcard-sweep" aria-hidden="true"></div>
      <div class="pcard-quick-view">Quick View</div>
      <button class="pcard-wish${isWished(pid) ? ' wished' : ''}" onclick="event.stopPropagation();toggleWish(this,'${pid}')" aria-label="Add to wishlist">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="${isWished(pid) ? 'var(--gold)' : 'none'}" stroke="var(--gold)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      ${badgeHtml}
    </div>
    <div class="pcard-info">
      <div class="pcard-cat">${cat}</div>
      <div class="pcard-name gold-text">${p.name || ''}</div>
      <div class="pcard-desc">${p.description || ''}</div>
      ${price ? `<div class="pcard-price">${price}</div>` : ''}
      ${scarcity}
      <a href="${waURL(p.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="pcard-btn">${WA_SVG} Enquire Now</a>
    </div>
  </div></div>`;
    }

    /* ── Build category tile ────────────── */
    function buildCatTile(cat) {
      const key = (cat.key || '').toLowerCase();
      const meta = CAT_META[key] || { icon: '💍', label: cat.name || key };
      const name = cat.name || meta.label;
      // Always link to the category's own section
      const anchor = cat.anchor || `category-${key}`;
      const href = `#${anchor}`;
      const fb = `https://placehold.co/300x400/141210/D4AF37?text=${encodeURIComponent(name)}`;
      return `<a class="cat-tile reveal" href="${href}" aria-label="${name}" onclick="smoothScrollTo('${anchor}')">
    <div class="cat-tile-img">
      ${cat.image ? `<img loading="lazy" src="${optimizeCloudinaryUrl(cat.image, 500)}" srcset="${generateSrcset(cat.image, [300, 400, 500])}" sizes="(max-width: 768px) 90vw, 180px" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='${optimizeCloudinaryUrl(fb, 500)}'" decoding="async"/>` :
          `<div class="cat-placeholder">${meta.icon}</div>`}
    </div>
    <div class="cat-tile-body">
      <span class="cat-tile-name">${name}</span>
      <span class="cat-tile-arrow">→</span>
    </div>
  </a>`;
    }

    /* ── Smooth scroll to section ───────── */
    function smoothScrollTo(sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ── Carousel ───────────────────────── */
    const CS = {};
    function getVis() { const w = window.innerWidth; return w <= 700 ? 2 : w <= 1100 ? 3 : VIS } // always min 2 on mobile

    function buildCarousel(sec, items) {
      const track = document.getElementById('ct-' + sec);
      const nav = document.getElementById('cn-' + sec);
      if (!track || !nav) return;
      track.innerHTML = items.map(p => buildCard(p, sec)).join('');
      track.querySelectorAll('.reveal').forEach(el => ro.observe(el));
      const total = items.length, vis = getVis(), pages = Math.max(1, Math.ceil(total / vis));
      if (total <= vis) { nav.innerHTML = ''; return }
      CS[sec] = { page: 0, pages, total, vis };

      function render() {
        const s = CS[sec];
        const tr = document.getElementById('ct-' + sec); if (!tr) return;
        const w = (tr.parentElement.clientWidth - 16 * (s.vis - 1)) / s.vis;
        tr.style.transform = `translateX(-${s.page * (w + 16) * s.vis}px)`;
        const nv = document.getElementById('cn-' + sec); if (!nv) return;
        nv.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === s.page));
        nv.querySelector('.c-btn.prev').disabled = s.page === 0;
        nv.querySelector('.c-btn.next').disabled = s.page >= s.pages - 1;
        nv.querySelector('.c-count').textContent = `${s.page * s.vis + 1}–${Math.min(s.page * s.vis + s.vis, s.total)} of ${s.total}`;
      }

      const dots = Array.from({ length: pages }, (_, i) =>
        `<button class="c-dot${i === 0 ? ' active' : ''}" onclick="goPage('${sec}',${i})" aria-label="Page ${i + 1}"></button>`).join('');
      nav.innerHTML = `
    <button class="c-btn prev" onclick="prevPage('${sec}')" aria-label="Prev" disabled>
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="c-dots">${dots}</div>
    <span class="c-count"></span>
    <button class="c-btn next" onclick="nextPage('${sec}')" aria-label="Next">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
    </button>`;
      render(); CS[sec]._r = render;

      let tx = 0;
      track.addEventListener('touchstart', e => { tx = e.touches[0].clientX }, { passive: true });
      track.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 44) dx < 0 ? nextPage(sec) : prevPage(sec) }, { passive: true });
    }

    function goPage(sec, p) { const s = CS[sec]; if (!s) return; s.page = Math.max(0, Math.min(p, s.pages - 1)); s._r() }
    function nextPage(sec) { const s = CS[sec]; if (s) goPage(sec, s.page + 1) }
    function prevPage(sec) { const s = CS[sec]; if (s) goPage(sec, s.page - 1) }

    /* ── Build carousel into any track/nav pair ── */
    function buildCarouselInSection(trackId, navId, items, categoryKey) {
      // Re-use buildCarousel logic but target arbitrary IDs
      // Map category key to a section meta for badge styling
      const catBadgeMeta = { badge: 'b-hot', label: '✦ ' + categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1), bt: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1) };
      const track = document.getElementById(trackId);
      const nav = document.getElementById(navId);
      if (!track || !nav) return;
      track.innerHTML = items.map(p => {
        const m = catBadgeMeta;
        const fb = `https://placehold.co/400x533/141210/D4AF37?text=${encodeURIComponent(p.name || 'LUVZ')}`;
        const ps = JSON.stringify(p).replace(/\\/g, '\\\\').replace(/'/g, "&#39;").replace(/"/g, '&quot;');
        const price = fmtP(p.price);
        const cat = p.category || categoryKey;
        const pid = p.id || btoa(p.name || String(Math.random())).slice(0, 8);

        // Register in product map so wishlist drawer can display full details
        productRegistry[pid] = { ...p, category: cat };

        let badgeHtml = '';
        if (p.badge === 'soldout' || p.sold_out) badgeHtml = `<div class="badge b-soldout">Sold Out</div>`;
        else if (p.badge === 'limited' || p.limited) badgeHtml = `<div class="badge b-lim">🔥 Limited Stock</div>`;
        else if (p.badge === 'new') badgeHtml = `<div class="badge b-new">✦ New Arrival</div>`;
        else badgeHtml = `<div class="badge b-hot">${m.label}</div>`;

        const scarcity = p.scarcity ? `<div class="pcard-scarcity">🔴 ${p.scarcity}</div>` : '';

        return `<div class="carousel-item"><div class="pcard reveal" onclick="openModal(JSON.parse(this.dataset.p),'${m.bt}')" data-p='${ps}'>
      <div class="pcard-img">
        <img loading="lazy" src="${p.image || fb}" alt="${(p.name || '').replace(/"/g, '&quot;')}" loading="lazy" onerror="this.onerror=null;this.src='${fb}'" decoding="async"/>
        <div class="pcard-img-ov"></div>
        <div class="pcard-quick-view">Quick View</div>
        <button class="pcard-wish${isWished(pid) ? ' wished' : ''}" onclick="event.stopPropagation();toggleWish(this,'${pid}')" aria-label="Add to wishlist">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="${isWished(pid) ? 'var(--gold)' : 'none'}" stroke="var(--gold)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        ${badgeHtml}
      </div>
      <div class="pcard-info">
        <div class="pcard-cat">${cat}</div>
        <div class="pcard-name gold-text">${p.name || ''}</div>
        <div class="pcard-desc">${p.description || ''}</div>
        ${price ? `<div class="pcard-price">${price}</div>` : ''}
        ${scarcity}
        <a href="${waURL(p.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="pcard-btn">${WA_SVG} Enquire Now</a>
      </div>
    </div></div>`;
      }).join('');
      track.querySelectorAll('.reveal').forEach(el => ro.observe(el));

      const total = items.length, vis = getVis(), pages = Math.max(1, Math.ceil(total / vis));
      if (total <= vis) { nav.innerHTML = ''; return }
      CS[trackId] = { page: 0, pages, total, vis };
      function render() {
        const s = CS[trackId];
        const tr = document.getElementById(trackId); if (!tr) return;
        const w = (tr.parentElement.clientWidth - 16 * (s.vis - 1)) / s.vis;
        tr.style.transform = `translateX(-${s.page * (w + 16) * s.vis}px)`;
        const nv = document.getElementById(navId); if (!nv) return;
        nv.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === s.page));
        nv.querySelector('.c-btn.prev').disabled = s.page === 0;
        nv.querySelector('.c-btn.next').disabled = s.page >= s.pages - 1;
        nv.querySelector('.c-count').textContent = `${s.page * s.vis + 1}–${Math.min(s.page * s.vis + s.vis, s.total)} of ${s.total}`;
      }
      const dots = Array.from({ length: pages }, (_, i) =>
        `<button class="c-dot${i === 0 ? ' active' : ''}" onclick="goPage('${trackId}',${i})" aria-label="Page ${i + 1}"></button>`).join('');
      nav.innerHTML = `
    <button class="c-btn prev" onclick="goPage('${trackId}',CS['${trackId}'].page-1)" aria-label="Prev" disabled>
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="c-dots">${dots}</div>
    <span class="c-count"></span>
    <button class="c-btn next" onclick="goPage('${trackId}',CS['${trackId}'].page+1)" aria-label="Next">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
    </button>`;
      render(); CS[trackId]._r = render;
      let tx = 0;
      track.addEventListener('touchstart', e => { tx = e.touches[0].clientX }, { passive: true });
      track.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 44) dx < 0 ? goPage(trackId, CS[trackId].page + 1) : goPage(trackId, CS[trackId].page - 1) }, { passive: true });
    }
    window.addEventListener('resize', () => {
      Object.keys(CS).forEach(key => {
        const s = CS[key]; if (!s || !s._r) return;
        s.vis = getVis(); s.pages = Math.max(1, Math.ceil(s.total / s.vis));
        s.page = Math.min(s.page, s.pages - 1); s._r();
      });
    }, { passive: true });

    /* ── Poster (kept for compatibility, no-op if no poster element) ── */
    let posterData = null;
    function renderPoster(p) { posterData = p; /* poster panel removed from hero */ }
    function openPosterModal() { /* intentionally blank */ }
    function closePosterModal() { /* intentionally blank */ }

    /* ── Load from local JSON (cache-busted) ───────────── */
    // ── Task 3: MOCK_DATA fallback for file:/// local testing
    // When running from file:// the fetch will be blocked by CORS/security policy.
    // This minimal stub prevents a blank page during local development.
    const MOCK_DATA = {
      theme: 'earth',
      categories: [],
      top_sellers: [],
      new_collection: [],
      reviews: []
    };

    async function load() {
      try {
        let url = DATA_URL;

        // On file:// protocol all cross-origin fetches are blocked — skip
        // straight to jsDelivr CDN URL to avoid console security errors
        const isFileProtocol = location.protocol === 'file:';

        if (!isFileProtocol) {
          try {
            const commitRes = await fetch('https://api.github.com/repos/n8nintegrationai/luvz-collection/commits/main', { cache: 'no-cache' });
            if (!commitRes.ok) throw new Error(`Commit ${commitRes.status}`);
            const commitData = await commitRes.json();
            const sha = commitData.sha;
            if (!sha) throw new Error('Missing commit SHA');
            url = `https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection@${sha}/data/products.json`;
          } catch (err) {
            url = `https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection@main/data/products.json?v=${Date.now()}`;
          }
        } else {
          url = `https://cdn.jsdelivr.net/gh/n8nintegrationai/luvz-collection@main/data/products.json?v=${Date.now()}`;
        }

        let d;
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) throw new Error(`Data ${res.status}`);
          d = await res.json();
        } catch (fetchErr) {
          // Network failure — use mock data so page renders without errors
          console.warn('Data fetch failed, using mock data:', fetchErr.message);
          d = MOCK_DATA;
        }
        if (d.theme && !localStorage.getItem('luvz-theme')) setTheme(d.theme, false);
        renderPoster(d.poster || null);
        renderHeritagePage(d.heritage || null);
        renderAboutSection(d.about || null);

        const cg = document.getElementById('cat-grid');
        if (cg && d.categories && d.categories.length) {

          const tilesHTML = d.categories.map(buildCatTile).join('');
          cg.innerHTML = tilesHTML + tilesHTML;
          cg.querySelectorAll('.reveal').forEach(el => ro.observe(el));
          initCategoryAutoScroll();
        }
        ['top_sellers', 'new_collection'].forEach(sec => {
          if (d[sec] && d[sec].length) {
            buildCarousel(sec, d[sec]);
            if (sec === 'top_sellers') requestAnimationFrame(() => window._buildVaultFromTrack && window._buildVaultFromTrack());
          }
          else {
            const t = document.getElementById('ct-' + sec);
            if (t) t.innerHTML = `<p style="font-family:'Cinzel',serif;font-size:.68rem;letter-spacing:.2em;color:var(--txt2);opacity:.3;padding:24px;text-align:center">Add products to /data/products.json to display here</p>`;
          }
        });


        const catKeys = ['necklace', 'pendant', 'earrings', 'bangles', 'jhumkas', 'sets'];
        catKeys.forEach(key => {
          const sectionId = `category-${key}`;
          const sec = document.getElementById(sectionId);
          const trackId = `ct-${sectionId}`;
          const navId = `cn-${sectionId}`;
          if (!sec) return;
          const products = d[key] || d[`category_${key}`] || [];

          const catDef = (d.categories || []).find(c => (c.key || '').toLowerCase() === key);
          const catName = catDef ? catDef.name : key.charAt(0).toUpperCase() + key.slice(1);
          const titleEl = sec.querySelector('.sec-title');
          if (titleEl) titleEl.textContent = catName;

          const subEl = document.getElementById(`sub-category-${key}`);
          const storyEl = document.getElementById(`story-category-${key}`);
          if (subEl && catDef && catDef.subtitle) subEl.textContent = catDef.subtitle;
          if (storyEl && catDef && catDef.story) storyEl.textContent = catDef.story;
          if (products.length) {
            buildCarouselInSection(trackId, navId, products, key);
          }

        });


        if (d.reviews && d.reviews.length) {
          renderReviews(d.reviews);
        }

        // Task 3A: inject JSON-LD product schema
        injectProductSchema(d);
      } catch (err) {
        console.error(err); renderPoster(null);
        const b = document.createElement('div'); b.className = 'ebanner err';
        b.innerHTML = `⚠ Could not load: ${err.message} <span style="cursor:pointer;opacity:.45;margin-left:8px" onclick="this.parentElement.remove()">✕</span>`;
        document.body.appendChild(b);
      }
    }
    load().then(() => handleInitialHash()).catch(() => {});
    updateWishCount();


    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closePosterModal(); closeWishlist() } });


    let _gallery = { imgs: [], index: 0 };
    function getGalleryImages(p) {
      const fb = `https://placehold.co/400x533/141210/D4AF37?text=${encodeURIComponent(p.name || '')}`;
      if (Array.isArray(p.images) && p.images.length) {
        const valid = p.images.filter(u => u && u.trim());
        if (valid.length) return valid;
      }
      return [p.image || fb];
    }
    function renderGalleryFrame() {
      const wrap = document.getElementById('mimg-wrap');
      const img = document.getElementById('mimg');
      const prev = document.getElementById('gallery-prev');
      const next = document.getElementById('gallery-next');
      const counter = document.getElementById('gallery-counter');
      const n = _gallery.imgs.length;
      if (n === 0) return;

      img.src = optimizeCloudinaryUrl(_gallery.imgs[_gallery.index], 800);
      img.srcset = generateSrcset(_gallery.imgs[_gallery.index], [600, 800, 1000]);
      img.sizes = '(max-width: 600px) 90vw, 90vw';
      img.alt = document.getElementById('m-name')?.textContent || '';
      img.classList.remove('z');
      const multi = n > 1;
      wrap.classList.toggle('has-gallery', multi);
      if (prev) { prev.style.display = multi ? 'flex' : 'none'; prev.disabled = _gallery.index <= 0; }
      if (next) { next.style.display = multi ? 'flex' : 'none'; next.disabled = _gallery.index >= n - 1; }
      if (counter) { counter.style.display = multi ? 'block' : 'none'; counter.textContent = `${_gallery.index + 1} / ${n}`; }
    }
    function galleryPrev() { if (_gallery.index > 0) { _gallery.index--; renderGalleryFrame(); } }
    function galleryNext() { if (_gallery.index < _gallery.imgs.length - 1) { _gallery.index++; renderGalleryFrame(); } }

    function openModal(p, badge) {
      const fb = `https://placehold.co/400x533/141210/D4AF37?text=${encodeURIComponent(p.name || '')}`;
      _gallery.imgs = getGalleryImages(p);
      _gallery.index = 0;
      const mimg = document.getElementById('mimg');

      mimg.src = optimizeCloudinaryUrl(_gallery.imgs[0] || p.image || fb, 800);
      mimg.srcset = generateSrcset(_gallery.imgs[0] || p.image, [600, 800, 1000]);
      mimg.sizes = '(max-width: 600px) 90vw, 90vw';
      mimg.alt = p.name || '';
      mimg.classList.remove('z');
      document.getElementById('m-name').textContent = p.name || '';
      document.getElementById('m-desc').textContent = p.description || '';
      document.getElementById('m-badge').textContent = badge;
      const pe = document.getElementById('m-price'), fmt = fmtP(p.price);
      pe.textContent = fmt || ''; pe.style.display = fmt ? 'block' : 'none';
      // Store product for referral code system and set initial WA URL
      _currentModalProduct = p;
      // Reset referral field
      const _ri = document.getElementById('referral-code');
      const _ra = document.getElementById('referral-applied');
      if (_ri) { _ri.value = ''; }
      if (_ra) { _ra.classList.remove('show'); }
      // Set base WA URL (referral code appended dynamically via applyReferralCode)
      document.getElementById('m-wa').href = p.whatsapp || waURL(p.name);
      // Set --modal-h to actual visible height (Chrome vh bug fix)
      // window.innerHeight = true visible area excluding browser chrome
      document.documentElement.style.setProperty(
        '--modal-h', window.innerHeight + 'px'
      );
      document.getElementById('moverlay').classList.add('open');
      const minfo = document.querySelector('.minfo');
      const minfoScroll = document.querySelector('.minfo-scroll');
      if (minfo) minfo.scrollTop = 0;
      if (minfoScroll) minfoScroll.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      renderGalleryFrame();

      // Task 3B + 4A: update URL hash and meta tags for sharing
      const slug = toSlug(p.name);
      pushProductHash(slug);
      const productUrl = `${SITE_URL}/#product/${slug}`;
      const desc = p.description
        ? `${p.description} — Handcrafted 92.5 silver with 22K gold polish by LUVZ Collection.`
        : SITE_DESC;
      setMetaTags(
        `${p.name} | LUVZ Collection`,
        desc,
        p.image || '',
        productUrl
      );

      _gallery._keyHandler = e => {
        if (document.getElementById('moverlay').classList.contains('open') && _gallery.imgs.length > 1) {
          if (e.key === 'ArrowLeft') { e.preventDefault(); galleryPrev(); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); galleryNext(); }
        }
      };
      document.addEventListener('keydown', _gallery._keyHandler);
    }
    function closeModal() {
      document.getElementById('moverlay').classList.remove('open');
      document.getElementById('moverlay').classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      if (_gallery._keyHandler) document.removeEventListener('keydown', _gallery._keyHandler);
      _gallery._keyHandler = null;
      // Task 3B + 4A: restore original meta + clear hash
      clearHash();
    }
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = closeModal;
    document.getElementById('moverlay').addEventListener('click', e => { if (e.target === document.getElementById('moverlay')) closeModal() });


    (function () {
      const wrap = document.getElementById('mimg-wrap');
      if (!wrap) return;
      let startX = 0;
      wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX }, { passive: true });
      wrap.addEventListener('touchend', e => {
        if (_gallery.imgs.length <= 1) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) dx < 0 ? galleryNext() : galleryPrev();
      }, { passive: true });
    })();



    /* ══════════════════════════════════════════════
       TASK 1: 3D VAULT — Top Sellers
    ══════════════════════════════════════════════ */
    (function initVault() {
      const MAX_CARDS = 9;
      let _items  = [];
      let _angle  = 0;
      let _target = 0;
      let _raf    = null;
      let _dragging = false;
      let _dragStartX = 0;
      let _dragStartAngle = 0;
      let _lastInteraction = 0;
      let _autoRunning = false;

      // How far apart cards sit on the ring (degrees)
      function stepDeg() { return 360 / Math.max(_items.length, 1); }
      // translateZ = ~40% of perspective keeps cards visible and proportional
      // perspective:680 → tz:280 means front card appears at 680/(680-280)=1.7× size
      // Cards at 60°/120° still visible; at 180° they face away (hidden by background)
      function tz() {
        const w = window.innerWidth;
        return w <= 480 ? 140 : w <= 768 ? 200 : 280;
      }

      function applyRing() {
        const ring = document.getElementById('vault-ring');
        if (!ring) return;
        ring.style.transform = `rotateY(${_angle}deg)`;
        const cards = ring.querySelectorAll('.vault-card');

        // ALL cards are shown (opacity:1, fully opaque) except the one
        // directly at the back (wa 150°–210°). This shows the full catalog.
        //
        // Depth dimming is via a .vault-dim overlay div INSIDE each card —
        // its background-rgba darkness scales with world angle.
        // We NEVER reduce card opacity itself — doing so on preserve-3d
        // siblings causes bleed-through (GPU composites by depth, not z-index).
        cards.forEach((card, i) => {
          const deg = i * stepDeg();
          card.style.transform = `rotateY(${deg}deg) translateZ(${tz()}px)`;

          // wa=0 → front-facing, wa=180 → back-facing
          const wa = ((deg - _angle) % 360 + 360) % 360;

          // Hide only the card directly behind (±60° of 180° = 150°–210°)
          const isBack   = wa > 150 && wa < 210;
          // Front-facing: fully visible, clickable
          const isCenter = wa < 45 || wa > 315;

          // Card is always opacity:1 — solid, never bleeds
          card.style.opacity       = '1';
          card.style.visibility    = isBack ? 'hidden' : 'visible';
          // All visible cards accept pointer events — onPointerUp finds correct card
          card.style.pointerEvents = isBack ? 'none' : 'auto';

          // Dim overlay: darker as card rotates away from viewer
          // wa=0 → dim=0 (fully lit), wa=90 → dim=0.55, wa=150 → dim=0.8
          const dim = card.querySelector('.vault-dim');
          if (dim) {
            let dimAmount = 0;
            if (!isCenter) {
              // Normalise side angle to 0–1 (0 at ±45°, 1 at ±150°)
              const sideWa = wa <= 180 ? wa : 360 - wa; // fold to 0–180
              dimAmount = Math.min(0.82, ((sideWa - 45) / 105) * 0.82);
              dimAmount = Math.max(0, dimAmount);
            }
            dim.style.background = `rgba(0,0,0,${dimAmount.toFixed(3)})`;
          }
        });
      }

      // Continuous animation loop — runs every frame, always.
      // Auto-rotation: smooth constant velocity (deg/ms).
      // Manual step: ease to snapped target, then resume auto-velocity.
      const AUTO_DEG_PER_SEC = 18;  // full rotation in ~20s — luxury glide speed
      const EASE_FACTOR      = 0.07; // lower = smoother ease-to-snap
      const IDLE_RESUME_MS   = 2200; // ms after interaction before auto resumes
      let _prevTimestamp = 0;
      let _snapping = false;  // true while easing to a manual snap target

      function loop(timestamp) {
        _raf = requestAnimationFrame(loop);

        const dt = Math.min(timestamp - _prevTimestamp, 64); // cap at 64ms (handles tab-blur)
        _prevTimestamp = timestamp;
        if (dt <= 0) return;

        if (_dragging) return; // drag updates _angle directly via onMove

        if (_snapping) {
          // Ease toward snapped target after button press or drag-release
          const diff = _target - _angle;
          if (Math.abs(diff) < 0.06) {
            _angle = _target;
            _snapping = false;
          } else {
            _angle += diff * EASE_FACTOR;
          }
        } else {
          // Auto-rotate continuously if idle
          const idle = Date.now() - _lastInteraction > IDLE_RESUME_MS;
          if (idle && !_dragging) {
            const delta = (AUTO_DEG_PER_SEC * dt) / 1000;
            _angle -= delta;
            _target = _angle; // keep target in sync so next snap is relative
          }
        }

        applyRing();
      }

      function startLoop() {
        if (_raf) return;
        _prevTimestamp = performance.now();
        _raf = requestAnimationFrame(loop);
      }

      // Keep startAuto as a no-op shim so existing setInterval call doesn't throw
      function startAuto() {}

      window.vaultStep = function(dir) {
        _lastInteraction = Date.now();
        _snapping = true;
        _target = _angle + dir * stepDeg();
        // Snap to nearest clean multiple so we don't accumulate drift
        _target = Math.round(_target / stepDeg()) * stepDeg() + dir * stepDeg();
      };

      // Drag support (mouse + touch)
      const DRAG_THRESHOLD = 8; // px movement before treating as drag not tap

      function bindDrag(scene) {
        let _pointerStartX = 0;
        let _pointerMoved  = false;

        let _tappedCard = null; // card under pointer at down-time (captured before setPointerCapture)

        function onPointerDown(e) {
          // Capture the card BEFORE setPointerCapture routes events to scene
          // After capture, e.target in pointermove/pointerup will be the scene, not the card
          _tappedCard    = e.target ? e.target.closest('.vault-card') : null;
          _dragging      = true;
          _pointerMoved  = false;
          _pointerStartX = e.clientX;
          _dragStartX    = e.clientX;
          _dragStartAngle = _angle;
          _lastInteraction = Date.now();
          _snapping = false;
          scene.setPointerCapture && scene.setPointerCapture(e.pointerId);
        }
        function onPointerMove(e) {
          if (!_dragging) return;
          const dx = e.clientX - _pointerStartX;
          if (Math.abs(dx) > DRAG_THRESHOLD) _pointerMoved = true;
          _angle  = _dragStartAngle - (e.clientX - _dragStartX) * 0.35;
          _target = _angle;
          applyRing();
        }
        function onPointerUp(e) {
          if (!_dragging) return;
          _dragging = false;
          _lastInteraction = Date.now();
          const s = stepDeg();
          _target   = Math.round(_angle / s) * s;
          _snapping = true;

          // If pointer barely moved — treat as a tap.
          // Use _tappedCard (captured at pointerdown) because setPointerCapture
          // makes e.target the scene in pointerup — e.target.closest() would return null.
          if (!_pointerMoved) {
            const tappedCard = _tappedCard;
            _tappedCard = null; // reset for next interaction
            if (tappedCard && tappedCard.style.visibility !== 'hidden') {
              // Find which index this card is
              const ring = document.getElementById('vault-ring');
              const allCards = ring ? Array.from(ring.querySelectorAll('.vault-card')) : [];
              const idx = allCards.indexOf(tappedCard);

              if (idx !== -1) {
                // Check if this card is front-facing (isCenter)
                const deg = idx * stepDeg();
                const wa = ((deg - _angle) % 360 + 360) % 360;
                const isFront = wa < 45 || wa > 315;

                if (isFront) {
                  // Already front — open modal immediately
                  tappedCard.dispatchEvent(new CustomEvent('vault-tap', { bubbles: false }));
                } else {
                  // Rotate to bring this card to the front, then open modal
                  // Snap target = -deg (so card at deg becomes the front)
                  const currentSnap = Math.round(_angle / s) * s;
                  const rotations = Math.round((currentSnap - (-deg)) / 360);
                  _target = -deg + rotations * 360;
                  // Normalise to shortest path
                  while (_target - _angle > 180)  _target -= 360;
                  while (_angle - _target > 180)  _target += 360;
                  _snapping = true;
                  // Open modal after rotation completes (~600ms)
                  setTimeout(() => {
                    tappedCard.dispatchEvent(new CustomEvent('vault-tap', { bubbles: false }));
                  }, 650);
                }
              }
            }
          }
        }

        // Pointer events: unified mouse + touch, no preventDefault needed
        scene.addEventListener('pointerdown',  onPointerDown);
        scene.addEventListener('pointermove',  onPointerMove);
        scene.addEventListener('pointerup',    onPointerUp);
        scene.addEventListener('pointercancel', () => { _dragging = false; });
      }

      // Called by buildCarousel after top_sellers data is ready
      // We hook into the existing flow: after buildCarousel populates
      // #ct-top_sellers (hidden), we read the .pcard elements and clone them
      window._buildVaultFromTrack = function() {
        const track = document.getElementById('ct-top_sellers');
        const ring  = document.getElementById('vault-ring');
        const scene = document.getElementById('vault-scene');
        if (!track || !ring || !scene) return;

        // Reduced-motion: flat horizontal scroll, no 3D
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          scene.style.cssText = 'overflow-x:auto;display:flex;gap:14px;padding:16px;height:auto;cursor:auto';
          ring.style.cssText  = 'position:static;transform:none;display:flex;gap:14px;height:auto;width:max-content;transform-style:flat';
          track.querySelectorAll('.pcard').forEach(card => {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'flex-shrink:0;width:180px';
            wrap.appendChild(card.cloneNode(true));
            ring.appendChild(wrap);
          });
          return;
        }

        // Collect product data directly from dataset (JSON) — NOT from DOM img.currentSrc
        // img.currentSrc is empty when cards haven't loaded yet (most cases at call time)
        const cardEls = Array.from(track.querySelectorAll('.carousel-item'));
        const products = [];
        cardEls.slice(0, MAX_CARDS).forEach(item => {
          const inner = item.querySelector('.pcard');
          if (!inner) return;
          try {
            const p = JSON.parse(
              inner.dataset.p.replace(/&#39;/g, "'").replace(/&quot;/g, '"')
            );
            // Use optimizeCloudinaryUrl if available, fall back to raw p.image
            const rawSrc = p.image || '';
            p._vaultSrc = (typeof optimizeCloudinaryUrl === 'function' && rawSrc)
              ? optimizeCloudinaryUrl(rawSrc, 600)
              : rawSrc;
            if (p._vaultSrc) products.push(p);
          } catch(e) {}
        });

        if (!products.length) return;
        _items = products;

        // Preload images — ensure browser has decoded before 3D placement
        const preloads = products.map(p => new Promise(resolve => {
          if (!p._vaultSrc) { resolve(); return; }
          const img = new Image();
          img.onload  = resolve;
          img.onerror = resolve;
          img.src = p._vaultSrc;
        }));

        Promise.all(preloads).then(() => {
          ring.innerHTML = '';

          products.forEach((p, i) => {
            const isMob = window.innerWidth <= 700;
            const cardW = isMob ? 140 : 170;
            const cardH = isMob ? 270 : 330;
            const imgH  = Math.round(cardH * 0.64);
            const price = (p.price && p.price > 0)
              ? '\u20B9' + Number(p.price).toLocaleString('en-IN') : '';

            // ── Vault card: clean DOM, explicit dimensions, no overflow:hidden ──
            const vc = document.createElement('div');
            vc.className = 'vault-card';
            vc.setAttribute('role', 'listitem');

            // Solid background is critical — without it, back-face cards (180° away)
            // show the page content through them, causing the "transparent" look.
            // border-radius is visual only; clipping is done by .vault-clip wrapper.
            const vcStyles = [
              'position:absolute',
              'top:50%','left:50%',
              `width:${cardW}px`,
              `height:${cardH}px`,
              `margin-left:${-cardW/2}px`,
              `margin-top:${-cardH/2}px`,
              'border-radius:14px',
              'background:var(--card)',           // solid — no transparency
              'border:1px solid var(--border)',
              'box-shadow:var(--sh)',
              'cursor:pointer',
              'transform-style:preserve-3d',
              'backface-visibility:visible',
              '-webkit-backface-visibility:visible',
              'display:flex',
              'flex-direction:column',
              'overflow:visible',                 // clipping done by .vault-clip, not here
            ];
            vc.style.cssText = vcStyles.join(';');

            // Image container
            const imgWrap = document.createElement('div');
            const iwStyles = [
              'position:relative',
              'width:100%',
              `height:${imgH}px`,
              'flex-shrink:0',
              'border-radius:14px 14px 0 0',
              'background:var(--card2)',
              'overflow:hidden',                  // ok here — this div is not 3D-transformed
            ];
            imgWrap.style.cssText = iwStyles.join(';');

            if (p._vaultSrc) {
              const img = document.createElement('img');
              img.width  = cardW;
              img.height = imgH;
              img.alt    = p.name || '';
              img.src    = p._vaultSrc;
              // Inline style on img itself — overrides any inherited CSS
              img.style.cssText = [
                'width:100%',
                `height:${imgH}px`,
                'object-fit:cover',
                'display:block',
                'opacity:1',
                'will-change:auto',
                'pointer-events:none',
                'transform:none',                 // no inherited transforms
              ].join(';');
              imgWrap.appendChild(img);
            }

            // Subtle bottom gradient on image
            const ov = document.createElement('div');
            ov.style.cssText = [
              'position:absolute','inset:0',
              'border-radius:14px 14px 0 0',
              'background:linear-gradient(to bottom,transparent 52%,rgba(0,0,0,.5))',
              'pointer-events:none',
            ].join(';');
            imgWrap.appendChild(ov);
            vc.appendChild(imgWrap);

            // Info strip
            const info = document.createElement('div');
            info.style.cssText = 'padding:9px 11px 11px;flex:1;display:flex;flex-direction:column;gap:3px;background:var(--card);border-radius:0 0 14px 14px;';

            const cat = document.createElement('div');
            cat.style.cssText = "font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);opacity:.55;";
            cat.textContent = p.category || '';
            info.appendChild(cat);

            const name = document.createElement('div');
            name.style.cssText = "font-family:'Cinzel',serif;font-size:.68rem;font-weight:700;letter-spacing:.06em;line-height:1.28;color:var(--txt);";
            name.textContent = p.name || '';
            info.appendChild(name);

            if (price) {
              const pr = document.createElement('div');
              pr.style.cssText = "font-family:'Cinzel',serif;font-size:.7rem;font-weight:700;color:var(--gold);margin-top:auto;padding-top:4px;";
              pr.textContent = price;
              info.appendChild(pr);
            }

            vc.appendChild(info);

            // Dim overlay — controls depth darkness, never reduces card opacity
            // (reducing card opacity on preserve-3d siblings causes bleed-through)
            const dim = document.createElement('div');
            dim.className = 'vault-dim';
            dim.style.cssText = [
              'position:absolute',
              'inset:0',
              'border-radius:14px',
              'background:rgba(0,0,0,0)',   // starts transparent, applyRing updates it
              'pointer-events:none',         // never intercepts clicks
              'z-index:10',
              'transition:background 0.12s linear',
            ].join(';');
            dim.setAttribute('aria-hidden', 'true');
            vc.appendChild(dim);

            // vault-tap fires from onPointerUp when pointer didn't move (= real tap/click)
            // This bypasses the synthetic click event which is suppressed by drag handling
            vc.addEventListener('vault-tap', () => {
              openModal(p, 'Best Seller');
            });
            // Also keep native click as fallback for keyboard/accessibility
            vc.addEventListener('click', (e) => {
              // Only fire from keyboard (e.detail===0) — pointer taps handled by vault-tap
              if (e.detail === 0) openModal(p, 'Best Seller');
            });

            const deg = i * stepDeg();
            vc.style.transform = `rotateY(${deg}deg) translateZ(${tz()}px)`;
            ring.appendChild(vc);
          });

          applyRing();
          bindDrag(scene);

          // Start rAF loop only when vault is visible (saves CPU/GPU when scrolled away)
          const _vaultIO = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                startLoop();
              } else if (_raf) {
                cancelAnimationFrame(_raf);
                _raf = null;
              }
            }
          }, { threshold: 0.05 });
          _vaultIO.observe(document.querySelector('.vault-clip') || scene);
        });
      };
    })();

    /* ══════════════════════════════════════════════
       TASK 6: Review Lightbox
    ══════════════════════════════════════════════ */
    function openLightbox(src) {
      if (!src) return;
      const lb  = document.getElementById('review-lightbox');
      const img = document.getElementById('review-lightbox-img');
      if (!lb || !img) return;
      // Pause love-strip animation while lightbox is open
      const strip = document.getElementById('love-strip');
      if (strip) strip.style.animationPlayState = 'paused';
      img.src = src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    function closeLightbox(e) {
      // Allow close from: no event (Escape), backdrop click, close button click
      // Block close if click was on the image itself (allow zoom/inspect)
      if (e) {
        const img = document.getElementById('review-lightbox-img');
        if (e.target === img) return; // click on image doesn't close
      }
      const lb = document.getElementById('review-lightbox');
      if (!lb || !lb.classList.contains('open')) return;
      lb.classList.remove('open');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      // Resume love-strip
      const strip = document.getElementById('love-strip');
      if (strip) strip.style.animationPlayState = '';
      // Clear src to free memory
      setTimeout(() => {
        const img = document.getElementById('review-lightbox-img');
        if (img && !document.getElementById('review-lightbox').classList.contains('open')) img.src = '';
      }, 400);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });

    /* ══════════════════════════════════════════════
       TASK 9: Prism — mobile touchstart on cards outside vault
    ══════════════════════════════════════════════ */
    document.addEventListener('touchstart', e => {
      const card = e.target.closest('.pcard');
      if (!card) return;
      card.classList.add('prism-active');
      setTimeout(() => card.classList.remove('prism-active'), 1800);
    }, { passive: true });

    /* ══════════════════════════════════════════════
       TASK 10: Resize — update vault translateZ on orientation change
    ══════════════════════════════════════════════ */
    window.addEventListener('resize', () => {
      const ring = document.getElementById('vault-ring');
      if (!ring) return;
      // Recalculate translateZ inline — matches tz() inside initVault IIFE
      const tzVal = window.innerWidth <= 480 ? 140 : window.innerWidth <= 768 ? 200 : 280;
      ring.querySelectorAll('.vault-card').forEach(card => {
        card.style.transform = card.style.transform.replace(
          /translateZ\([^)]+\)/,
          `translateZ(${tzVal}px)`
        );
      });
    }, { passive: true });


    /* ── Referral Code System ─────────────────── */
    // Stores the current product data so we can rebuild the WA URL on code change
    let _currentModalProduct = null;

    function applyReferralCode() {
      const input   = document.getElementById('referral-code');
      const applied = document.getElementById('referral-applied');
      const waBtn   = document.getElementById('m-wa');
      if (!input || !waBtn || !_currentModalProduct) return;

      const code = (input.value || '').trim().toUpperCase();
      const p    = _currentModalProduct;
      const name = p.name || 'this piece';

      // Build WhatsApp message: base text + optional referral code
      let msg = `Hi! I'm interested in ${name} 🤩`;
      if (code) {
        msg += `\nReferral Code: ${code}`;
        applied.classList.add('show');
      } else {
        applied.classList.remove('show');
      }

      // Use product-specific WA URL or construct from WA_NUM
      const base = `https://wa.me/${WA_NUM}`;
      waBtn.href = `${base}?text=${encodeURIComponent(msg)}`;
    }

    function renderReviews(reviews) {
      const strip = document.getElementById('love-strip');
      if (!strip) return;

      const cards = reviews.map((r, idx) => {
        const img = r.image || '';
        if (!img) return '';
        const name = r.name || '';
        const text = r.text || '';
        // <figure> + <blockquote> = semantic testimonial markup for search engines
        return `<figure class="love-card"
          role="button"
          tabindex="0"
          data-src="${img}"
          aria-label="${name ? 'Review by ' + name : 'View customer review'}"
          style="cursor:pointer;margin:0"
          onclick="openLightbox(this.dataset.src)"
          onkeydown="if(event.key==='Enter'||event.key===' ')openLightbox(this.dataset.src)">
      <blockquote itemscope itemtype="https://schema.org/Review" style="margin:0">
        <meta itemprop="reviewRating" content="5"/>
        <img loading="lazy" src="${img}"
             alt="${name ? 'Customer review by ' + name + ' — LUVZ Collection 925 silver jewellery' : 'LUVZ Collection customer review — 925 silver jewellery'}"
             itemprop="image"
             onerror="this.closest('figure').style.display='none'" decoding="async"/>
        ${name ? `<figcaption itemprop="author" style="display:none"><strong>${name}</strong></figcaption>` : ''}
        ${text ? `<p itemprop="reviewBody" style="display:none">${text}</p>` : ''}
      </blockquote>
    </figure>`;
      }).filter(Boolean).join('');
      strip.innerHTML = cards + cards;
    }



/* ── Google Analytics: deferred until browser is idle ──────
   Removes gtag from the critical path, reducing TBT.
   Falls back to setTimeout(500ms) on browsers without rIC. */
(function loadGTM() {
  var GA_ID = 'G-7X8ZXT03Y9';
  function initGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initGA, { timeout: 4000 });
  } else {
    setTimeout(initGA, 500);
  }
})();

/* ── Netlify Identity: load only when admin shortcut is used ── */
(function setupAdminLink() {
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'l') {
      var al = document.getElementById('admin-link');
      if (al) al.classList.toggle('admin-hidden');
      // Load Netlify Identity widget on first access
      if (!window.netlifyIdentity) {
        var s = document.createElement('script');
        s.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
        document.head.appendChild(s);
      }
    }
  });
})();
