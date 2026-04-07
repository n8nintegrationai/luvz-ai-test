/* =============================================
   LUVZ COLLECTION — AI Chat Widget JS v2
   Fixes: markdown rendering, WhatsApp links,
          mobile safe area, chat persistence
   ============================================= */

(function () {
  'use strict';

  const API_URL = '/api/chat';
  const STORAGE_KEY = 'luvz_chat_history';
  const MAX_AGE_MS  = 24 * 60 * 60 * 1000; // 24 hours

  const trigger      = document.getElementById('luvz-chat-trigger');
  const popup        = document.getElementById('luvz-chat-popup');
  const messagesEl   = document.getElementById('luvz-messages');
  const inputEl      = document.getElementById('luvz-chat-input');
  const sendBtn      = document.getElementById('luvz-chat-send');
  const suggestBar   = document.getElementById('luvz-suggestions');
  const closeBtn     = document.querySelector('.luvz-close-btn');
  const chips        = document.querySelectorAll('.luvz-chip');

  let isOpen    = false;
  let hasLoaded = false;

  /* ── WhatsApp SVG icon ── */
  const WA_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.532 5.856L.057 23.215a.75.75 0 00.916.916l5.356-1.474A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.372-.216-3.862 1.063 1.062-3.863-.216-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  /* ══════════════════════════════════════════
     MARKDOWN → HTML PARSER
     Handles: **bold**, *italic*, [text](url),
     bullet lists, line breaks
  ══════════════════════════════════════════ */
  function parseMarkdown(text) {
    // Escape HTML to prevent XSS
    const escape = s => s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Split into lines for processing
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Bullet list items: * item or - item
      if (/^[\*\-]\s+/.test(line)) {
        if (!inList) { html += '<ul>'; inList = true; }
        const content = line.replace(/^[\*\-]\s+/, '');
        html += '<li>' + inlineFormat(escape(content)) + '</li>';
        continue;
      }

      // Close list if we were in one
      if (inList) { html += '</ul>'; inList = false; }

      // Skip empty lines (add spacing via paragraph breaks)
      if (line.trim() === '') {
        // Only add break if previous content exists
        if (html && !html.endsWith('<br>') && !html.endsWith('</p>') && !html.endsWith('</ul>')) {
          html += '<br>';
        }
        continue;
      }

      html += '<p>' + inlineFormat(escape(line)) + '</p>';
    }

    if (inList) html += '</ul>';
    return html;
  }

  /* Inline formatting: bold, italic, links, WhatsApp links */
  function inlineFormat(text) {
    // **bold**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // *italic*
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Markdown links [label](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (_, label, url) => {
      const isWA = url.includes('wa.me') || url.includes('whatsapp');
      if (isWA) {
        return `<a href="${url}" target="_blank" rel="noopener" class="luvz-wa-btn">${WA_ICON}${label}</a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
    });

    // Bare WhatsApp URLs not in markdown
    text = text.replace(/(https?:\/\/wa\.me\/[^\s<"]+)/g, url => {
      return `<a href="${url}" target="_blank" rel="noopener" class="luvz-wa-btn">${WA_ICON} Chat on WhatsApp</a>`;
    });

    // Other bare URLs
    text = text.replace(/(https?:\/\/(?!wa\.me)[^\s<"]+)/g, url => {
      return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
    });

    return text;
  }

  /* ══════════════════════════════════════════
     CHAT PERSISTENCE (localStorage, 24h TTL)
  ══════════════════════════════════════════ */
  function saveHistory(role, text) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : { ts: Date.now(), msgs: [] };
      // Reset if older than 24h
      if (Date.now() - data.ts > MAX_AGE_MS) {
        data.ts = Date.now();
        data.msgs = [];
      }
      data.msgs.push({ role, text });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch(e) {}
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.ts > MAX_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.msgs;
    } catch(e) { return null; }
  }

  /* ══════════════════════════════════════════
     RENDER A MESSAGE BUBBLE
  ══════════════════════════════════════════ */
  function addMessage(role, text, save = true) {
    if (save) saveHistory(role, text);

    const wrapper = document.createElement('div');
    wrapper.className = `luvz-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'luvz-msg-bubble';

    if (role === 'bot') {
      bubble.innerHTML = parseMarkdown(text);
    } else {
      bubble.textContent = text;
    }

    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ══════════════════════════════════════════
     TYPING INDICATOR
  ══════════════════════════════════════════ */
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'luvz-typing';
    el.id = 'luvz-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('luvz-typing-indicator');
    if (el) el.remove();
  }

  /* ══════════════════════════════════════════
     SEND MESSAGE
  ══════════════════════════════════════════ */
  async function send(text) {
    text = text.trim();
    if (!text) return;

    // Hide chips after first real message
    if (suggestBar) suggestBar.style.display = 'none';

    addMessage('user', text);
    inputEl.value = '';
    autoResize();
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      hideTyping();

      const reply = data.response || "I'm sorry, I couldn't get a response. Please try again.";
      addMessage('bot', reply);

    } catch (err) {
      hideTyping();
      addMessage('bot', 'Something went wrong connecting to our assistant. Please try again in a moment.');
      console.error('Luvz Chat Error:', err);
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  /* ══════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════ */
  function openChat() {
    isOpen = true;
    popup.classList.add('is-visible');
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';

    // Remove pulse dot
    const dot = trigger.querySelector('.luvz-dot');
    if (dot) dot.style.display = 'none';

    // First open: load history or show welcome
    if (!hasLoaded) {
      hasLoaded = true;
      const history = loadHistory();
      if (history && history.length > 0) {
        history.forEach(m => addMessage(m.role, m.text, false));
      } else {
        addMessage('bot', 'Welcome to Luvz Collection ✦\n\nI\'m your personal jewellery advisor. Ask me anything — from finding the perfect piece to shipping and return policies.', true);
      }
    }

    setTimeout(() => inputEl.focus(), 350);
  }

  function closeChat() {
    isOpen = false;
    popup.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', () => {
    isOpen ? closeChat() : openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  // Close on backdrop click (desktop only)
  document.addEventListener('click', (e) => {
    if (isOpen && window.innerWidth > 600 &&
        !popup.contains(e.target) && !trigger.contains(e.target)) {
      closeChat();
    }
  });

  /* ══════════════════════════════════════════
     INPUT EVENTS
  ══════════════════════════════════════════ */
  function autoResize() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 110) + 'px';
  }

  sendBtn.addEventListener('click', () => send(inputEl.value));

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(inputEl.value);
    }
  });

  inputEl.addEventListener('input', autoResize);

  chips.forEach(chip => {
    chip.addEventListener('click', () => send(chip.dataset.msg));
  });

})();
