(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const modes = ['system', 'light', 'dark'];
  let theme = 'system';
  try {
    const savedTheme = localStorage.getItem('theme');
    if (['system', 'light', 'dark'].includes(savedTheme)) theme = savedTheme;
  } catch {} // Themes still work when browser storage is unavailable.
  function apply() {
    root.dataset.theme = theme === 'system' ? (system.matches ? 'dark' : 'light') : theme;
    const button = document.getElementById('theme-toggle');
    if (button) {
      const next = modes[(modes.indexOf(theme) + 1) % modes.length];
      const label = `Theme: ${theme[0].toUpperCase() + theme.slice(1)}. Switch to ${next[0].toUpperCase() + next.slice(1)}.`;
      button.dataset.mode = theme;
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }
  function save() {
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle').addEventListener('click', () => {
      theme = modes[(modes.indexOf(theme) + 1) % modes.length];
      apply();
      save();
    });
  });
})();
