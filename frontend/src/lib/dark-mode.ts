const initDarkMode = () => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  root.classList.add(systemTheme);
};

export default initDarkMode;
