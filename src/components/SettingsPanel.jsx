import { useState } from 'react';
import { COURT_THEMES } from '../constants/theme.js';
import { SPORTS, SPORT_IDS } from '../constants/sports.js';

export function SettingsPanel({ currentThemeId, onSelectTheme, sportId, onSelectSport, onClose }) {
  const [showSportPicker, setShowSportPicker] = useState(false);

  return (
    <div style={s.overlay}>
      <div style={s.header}>
        <span style={s.title}>Settings</span>
        <button style={s.closeBtn} onClick={onClose}>Done</button>
      </div>

      <div style={s.scrollArea}>
        <div style={s.sectionTitle}>SPORT</div>
        <button style={s.sportRow} onClick={() => setShowSportPicker(v => !v)}>
          <span style={s.sportIcon}>{SPORTS[sportId]?.icon}</span>
          <span style={s.sportName}>{SPORTS[sportId]?.label}</span>
          <span style={s.sportChevron}>{showSportPicker ? '▾' : '▸'}</span>
        </button>

        {showSportPicker && (
          <div style={s.sportPickerContainer}>
            {SPORT_IDS.map(id => {
              const sport = SPORTS[id];
              const isSelected = id === sportId;
              return (
                <button
                  key={id}
                  style={{ ...s.sportOption, ...(isSelected ? s.sportOptionSelected : {}) }}
                  onClick={() => { onSelectSport(id); setShowSportPicker(false); }}
                >
                  <span style={s.sportOptionIcon}>{sport.icon}</span>
                  <span style={s.sportOptionLabel}>{sport.label}</span>
                  {isSelected && <span style={s.checkmark}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {sportId === 'tennis' && (
          <>
            <div style={s.sectionTitle}>COURT THEME</div>
            {Object.values(COURT_THEMES).map(theme => {
              const isSelected = theme.id === currentThemeId;
              return (
                <button
                  key={theme.id}
                  style={{ ...s.themeRow, ...(isSelected ? s.themeRowSelected : {}) }}
                  onClick={() => onSelectTheme(theme.id)}
                >
                  <div style={s.swatchContainer}>
                    <div style={{ ...s.swatchOuter, backgroundColor: theme.surrounds }}>
                      <div style={{ ...s.swatchInner, backgroundColor: theme.court }} />
                    </div>
                  </div>
                  <div style={s.themeInfo}>
                    <span style={s.themeName}>{theme.flag}  {theme.name}</span>
                    <div style={s.colourDots}>
                      <div style={{ ...s.dot, backgroundColor: theme.court }} />
                      <div style={{ ...s.dot, backgroundColor: theme.drawColour }} />
                    </div>
                  </div>
                  {isSelected && <span style={s.checkmark}>✓</span>}
                </button>
              );
            })}
          </>
        )}

        <div style={s.hint}>
          <p style={s.hintText}>💡 Long-press (hold) a player token to remove them.</p>
          <p style={s.hintText}>✏️ Switch to Draw mode to sketch tactical lines — they fade automatically.</p>
          <p style={s.hintText}>🔄 Changing sport clears all players and resets the court.</p>
          <p style={s.hintText}>🖱️ Scroll wheel or two-finger pinch to zoom in/out.</p>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    backgroundColor: '#0d1520',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    flexShrink: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 700,
  },
  closeBtn: {
    padding: '6px 14px',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: 24,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    padding: '28px 20px 10px',
  },
  sportRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 16px',
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    width: 'calc(100% - 32px)',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#FFFFFF',
  },
  sportIcon: { fontSize: 22, marginRight: 12 },
  sportName: { flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: 600 },
  sportChevron: { color: 'rgba(255,255,255,0.5)', fontSize: 16 },
  sportPickerContainer: {
    margin: '4px 16px 0',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  sportOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'transparent',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#FFFFFF',
  },
  sportOptionSelected: { backgroundColor: 'rgba(255,255,255,0.1)' },
  sportOptionIcon: { fontSize: 20, marginRight: 12, width: 28, textAlign: 'center' },
  sportOptionLabel: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: 500 },
  themeRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '4px 16px',
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid transparent',
    width: 'calc(100% - 32px)',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#FFFFFF',
  },
  themeRowSelected: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  swatchContainer: { marginRight: 14 },
  swatchOuter: {
    width: 48,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchInner: { width: 32, height: 20, borderRadius: 4 },
  themeInfo: { flex: 1 },
  themeName: {
    display: 'block',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 6,
  },
  colourDots: { display: 'flex', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 900,
    flexShrink: 0,
  },
  hint: {
    margin: '32px 20px 0',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  hintText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    lineHeight: '18px',
    margin: '0 0 8px 0',
  },
};
