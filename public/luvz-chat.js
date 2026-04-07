/* =============================================
   LUVZ COLLECTION — AI Chat Widget JS v3
   Fixes: WA phone number, Enquire label,
          send button layout, navbar overlap
   ============================================= */

(function () {
  'use strict';

  var API_URL     = '/api/chat';
  var STORAGE_KEY = 'luvz_chat_v3';
  var MAX_AGE_MS  = 24 * 60 * 60 * 1000;
  var WA_NUMBER   = '918919359961';

  var trigger    = document.getElementById('luvz-chat-trigger');
  var popup      = document.getElementById('luvz-chat-popup');
  var messagesEl = document.getElementById('luvz-messages');
  var inputEl    = document.getElementById('luvz-chat-input');
  var sendBtn    = document.getElementById('luvz-chat-send');
  var suggestBar = document.getElementById('luvz-suggestions');
  var closeBtn   = document.querySelector('.luvz-close-btn');
  var chips      = document.querySelectorAll('.luvz-chip');

  var isOpen    = false;
  var hasLoaded = false;

  /* ── Small WA icon — explicit width/height, no oversized rendering ── */
  var WA_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;vertical-align:middle;fill:#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.532 5.856L.057 23.215a.75.75 0 00.916.916l5.356-1.474A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.372-.216-3.862 1.063 1.062-3.863-.216-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

  /* ── Build a clean WA link with the correct number ── */
  function waLink(productLabel) {
    var msg = productLabel
      ? 'Hi! I am interested in ' + productLabel + ' from Luvz Collection'
      : 'Hi! I found your Luvz Collection and would like to enquire';
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    return '<a href="' + url + '" target="_blank" rel="noopener" class="luvz-wa-btn">' + WA_ICON + ' Enquire on WhatsApp</a>';
  }

  /* ══════════════════════════════════════════
     MARKDOWN → HTML PARSER
  ══════════════════════════════════════════ */
  function parseMarkdown(raw) {
    /* Step 1: extract markdown links BEFORE escaping so URLs survive */
    var links = [];
    var placeholder = raw.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function(_, label, url) {
      var idx = links.length;
      var isWA = url.indexOf('wa.me') !== -1 || url.indexOf('whatsapp') !== -1;
      links.push(isWA ? waLink(label) : '<a href="' + url + '" target="_blank" rel="noopener">' + escHtml(label) + '</a>');
      return '\x00LINK' + idx + '\x00';
    });

    /* Step 2: replace any leftover bare wa.me URLs */
    placeholder = placeholder.replace(/https?:\/\/wa\.me\/[^\s<"]+/g, function() {
      return waLink('');
    });

    /* Step 3: escape remaining HTML */
    var escaped = escHtml(placeholder);

    /* Step 4: restore links */
    escaped = escaped.replace(/\x00LINK(\d+)\x00/g, function(_, i) { return links[+i]; });

    /* Step 5: inline formatting on escaped text */
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*(.+?)\*/g,     '<em>$1</em>');

    /* Step 6: build paragraphs / lists line by line */
    var lines  = escaped.split('\n');
    var html   = '';
    var inList = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^[*\-]\s+/.test(line)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + line.replace(/^[*\-]\s+/, '') + '</li>';
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (line.trim() === '') {
          if (html && !html.endsWith('<br>') && !html.endsWith('</p>') && !html.endsWith('</ul>')) {
            html += '<br>';
          }
        } else {
          html += '<p>' + line + '</p>';
        }
      }
    }
    if (inList) html += '</ul>';
    return html;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ══════════════════════════════════════════
     CHAT PERSISTENCE (localStorage, 24h TTL)
  ══════════════════════════════════════════ */
  function saveHistory(role, text) {
    try {
      var raw  = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : { ts: Date.now(), msgs: [] };
      if (Date.now() - data.ts > MAX_AGE_MS) { data.ts = Date.now(); data.msgs = []; }
      data.msgs.push({ role: role, text: text });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch(e) {}
  }

  function loadHistory() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (Date.now() - data.ts > MAX_AGE_MS) { localStorage.removeItem(STORAGE_KEY); return null; }
      return data.msgs;
    } catch(e) { return null; }
  }

  /* ══════════════════════════════════════════
     RENDER A MESSAGE BUBBLE
  ══════════════════════════════════════════ */
  function addMessage(role, text, save) {
    if (save !== false) saveHistory(role, text);
    var wrapper = document.createElement('div');
    wrapper.className = 'luvz-msg ' + role;
    var bubble = document.createElement('div');
    bubble.className = 'luvz-msg-bubble';
    if (role === 'bot') {
      bubble.innerHTML = parseMarkdown(text);
    } else {
      bubble.textContent = text;
    }
    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ══════════════════════════════════════════
     TYPING INDICATOR
  ══════════════════════════════════════════ */
  function showTyping() {
    var el = document.createElement('div');
    el.className = 'luvz-typing';
    el.id = 'luvz-typing-ind';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('luvz-typing-ind');
    if (el) el.remove();
  }

  /* ══════════════════════════════════════════
     SEND MESSAGE
  ══════════════════════════════════════════ */
  function send(text) {
    text = text.trim();
    if (!text) return;
    if (suggestBar) suggestBar.style.display = 'none';
    addMessage('user', text);
    inputEl.value = '';
    autoResize();
    sendBtn.disabled = true;
    showTyping();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      hideTyping();
      addMessage('bot', data.response || "I'm sorry, I couldn't get a response. Please try again.");
    })
    .catch(function(err) {
      hideTyping();
      addMessage('bot', 'Something went wrong. Please try again in a moment.');
      console.error('Luvz Chat Error:', err);
    })
    .finally(function() {
      sendBtn.disabled = false;
      inputEl.focus();
    });
  }

  /* ══════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════ */
  function openChat() {
    isOpen = true;
    popup.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    var dot = trigger.querySelector('.luvz-dot');
    if (dot) dot.style.display = 'none';
    if (!hasLoaded) {
      hasLoaded = true;
      var history = loadHistory();
      if (history && history.length) {
        history.forEach(function(m) { addMessage(m.role, m.text, false); });
      } else {
        addMessage('bot', 'Welcome to Luvz Collection \u2746\n\nI\'m your personal jewellery advisor. Ask me anything \u2014 from finding the perfect piece to shipping and return policies.', true);
      }
    }
    setTimeout(function() { inputEl.focus(); }, 350);
  }

  function closeChat() {
    isOpen = false;
    popup.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', function() { isOpen ? closeChat() : openChat(); });
  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('click', function(e) {
    if (isOpen && window.innerWidth > 600 && !popup.contains(e.target) && !trigger.contains(e.target)) {
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

  sendBtn.addEventListener('click', function() { send(inputEl.value); });

  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputEl.value); }
  });

  inputEl.addEventListener('input', autoResize);

  chips.forEach(function(chip) {
    chip.addEventListener('click', function() { send(chip.dataset.msg); });
  });

})();
