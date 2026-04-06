/* =============================================
   LUVZ COLLECTION — AI Chat Widget JS
   API: https://154ce531.luvz-ai-test.pages.dev/api/chat
   ============================================= */

(function () {
  'use strict';

  const API_URL = 'https://154ce531.luvz-ai-test.pages.dev/api/chat';

  const trigger   = document.getElementById('luvz-chat-trigger');
  const popup     = document.getElementById('luvz-chat-popup');
  const messages  = document.getElementById('luvz-messages');
  const input     = document.getElementById('luvz-chat-input');
  const sendBtn   = document.getElementById('luvz-chat-send');
  const chips     = document.querySelectorAll('.luvz-chip');
  const suggestionsBar = document.getElementById('luvz-suggestions');

  let isOpen = false;
  let hasGreeted = false;

  /* ---------- Toggle popup ---------- */
  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    trigger.classList.toggle('is-open', isOpen);
    popup.classList.toggle('is-visible', isOpen);

    // Remove notification dot once opened
    const dot = trigger.querySelector('.luvz-dot');
    if (dot) dot.style.display = 'none';

    if (isOpen && !hasGreeted) {
      greet();
      hasGreeted = true;
    }

    if (isOpen) {
      setTimeout(() => input.focus(), 300);
    }
  });

  /* ---------- Welcome message ---------- */
  function greet() {
    addMessage('bot', 'Welcome to Luvz Collection ✦\n\nI\'m your personal jewellery advisor. Ask me anything — from finding the perfect piece to shipping and return policies.');
  }

  /* ---------- Add a message bubble ---------- */
  function addMessage(role, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `luvz-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'luvz-msg-bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollBottom();
    return wrapper;
  }

  /* ---------- Typing indicator ---------- */
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'luvz-typing';
    el.id = 'luvz-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    scrollBottom();
  }

  function hideTyping() {
    const el = document.getElementById('luvz-typing');
    if (el) el.remove();
  }

  /* ---------- Scroll to bottom ---------- */
  function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  /* ---------- Send a message ---------- */
  async function send(text) {
    text = text.trim();
    if (!text) return;

    // Hide chips after first interaction
    suggestionsBar.style.display = 'none';

    addMessage('user', text);
    input.value = '';
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

      const reply = data.response || 'Sorry, I couldn\'t get a response. Please try again.';
      addMessage('bot', reply);

    } catch (err) {
      hideTyping();
      addMessage('bot', 'Something went wrong connecting to our assistant. Please try again in a moment.');
      console.error('Luvz Chat Error:', err);
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  /* ---------- Auto-resize textarea ---------- */
  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }

  /* ---------- Event listeners ---------- */
  sendBtn.addEventListener('click', () => send(input.value));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });

  input.addEventListener('input', autoResize);

  // Suggestion chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      send(chip.dataset.msg);
    });
  });

  // Close popup on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !popup.contains(e.target) && !trigger.contains(e.target)) {
      isOpen = false;
      trigger.classList.remove('is-open');
      popup.classList.remove('is-visible');
    }
  });

})();
