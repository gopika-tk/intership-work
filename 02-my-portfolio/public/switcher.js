document.addEventListener('DOMContentLoaded', () => {
  // 1. Define theme structures
  const themes = ['teal', 'gold'];
  let currentTheme = localStorage.getItem('portfolio-theme') || 'teal';

  // 2. Apply saved theme on page load
  applyTheme(currentTheme);

  // 3. Inject the floating switcher UI
  const container = document.createElement('div');
  container.className = 'theme-switcher-container';
  container.innerHTML = `
    <button class="switcher-btn" id="theme-switcher-btn" title="Switch Color Palette" aria-label="Switch Color Palette">
      <svg viewBox="0 0 24 24">
        <!-- Palette icon -->
        <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.75-.4-1.01a1.48 1.48 0 0 1-.4-1c0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5 9 9 0 0 0-9-9Zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      </svg>
    </button>
    <div class="switcher-panel" id="theme-switcher-panel">
      <button class="theme-option" data-theme="teal" id="opt-teal">
        Teal Slate <span class="theme-dot" style="color: #3BBA9C"></span>
      </button>
      <button class="theme-option" data-theme="gold" id="opt-gold">
        Gold Obsidian <span class="theme-dot" style="color: #FFB300"></span>
      </button>
    </div>
  `;
  document.body.appendChild(container);

  // 4. Cache DOM references
  const btn = document.getElementById('theme-switcher-btn');
  const panel = document.getElementById('theme-switcher-panel');
  const optTeal = document.getElementById('opt-teal');
  const optGold = document.getElementById('opt-gold');

  // 5. Toggle panel active state
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('active');
  });

  // Close panel on clicking outside
  document.addEventListener('click', () => {
    panel.classList.remove('active');
  });

  panel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // 6. Handle option clicks
  optTeal.addEventListener('click', () => {
    setTheme('teal');
  });

  optGold.addEventListener('click', () => {
    setTheme('gold');
  });

  function setTheme(themeName) {
    applyTheme(themeName);
    localStorage.setItem('portfolio-theme', themeName);
    panel.classList.remove('active');
  }

  function applyTheme(themeName) {
    themes.forEach(t => {
      document.body.classList.remove(`theme-${t}`);
    });
    document.body.classList.add(`theme-${themeName}`);

    // Update active states on options if DOM has loaded
    setTimeout(() => {
      const activeOpt = document.querySelector(`.theme-option[data-theme="${themeName}"]`);
      if (activeOpt) {
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        activeOpt.classList.add('active');
      }
    }, 50);
  }
});
