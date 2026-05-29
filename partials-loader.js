/* Partial Loader - Load header/footer/chat dynamically */
async function loadPartials() {
  try {
    // Load header
    const headerRes = await fetch('partials/header.html');
    const headerHtml = await headerRes.text();
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
    
    // Load footer
    const footerRes = await fetch('partials/footer.html');
    const footerHtml = await footerRes.text();
    document.body.insertAdjacentHTML('beforeend', footerHtml);
    
    // Initialize components
    initMobileMenu();
    initChat();
    initScrollEffects();
    
    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    
  } catch (e) {
    console.error('Error loading partials:', e);
  }
}

function initMobileMenu() {
  const mm = document.getElementById('mobileMenu');
  const navToggle = document.getElementById('navToggle');
  
  if (!mm || !navToggle) return;
  
  navToggle.addEventListener('click', () => {
    mm.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  
  mm.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mm.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

function initChat() {
  const chatWindow = document.getElementById('chatWindow');
  const chatFab = document.getElementById('chatFab');
  const chatMsgs = document.getElementById('chatMessages');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  
  if (!chatFab || !chatWindow) return;
  
  chatFab.addEventListener('click', () => {
    chatWindow.classList.add('open');
    chatFab.style.display = 'none';
  });
  
  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('open');
      chatFab.style.display = '';
    });
  }
  
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
      
      // Add user message
      const userDiv = document.createElement('div');
      userDiv.className = 'chat-msg user';
      userDiv.textContent = msg;
      chatMsgs.appendChild(userDiv);
      input.value = '';
      
      // Add bot response
      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg bot';
        botDiv.textContent = 'Thanks for reaching out! We\'ll get back to you soon. 💬';
        chatMsgs.appendChild(botDiv);
        chatMsgs.scrollTop = chatMsgs.scrollHeight;
      }, 800);
    });
  }
}

function initScrollEffects() {
  const nav = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 500);
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

// Load partials when DOM ready
document.addEventListener('DOMContentLoaded', loadPartials);