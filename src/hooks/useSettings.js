import { useState, useCallback } from 'react';
import { COURT_THEMES } from '../constants/theme.js';
import { SPORTS, DEFAULT_SPORT } from '../constants/sports.js';

const STORAGE_KEY = 'tennis_tactics_theme';
const DEFAULT_THEME = 'roland_garros';

export function useSettings() {
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved && COURT_THEMES[saved] ? saved : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const [sportId, setSportId] = useState(DEFAULT_SPORT);

  const setTheme = useCallback((id) => {
    if (!COURT_THEMES[id]) return;
    setThemeId(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch {}
  }, []);

  const activeTheme = sportId === 'tennis' ? COURT_THEMES[themeId] : SPORTS[sportId].theme;

  return { themeId, theme: activeTheme, setTheme, sportId, setSportId };
}
