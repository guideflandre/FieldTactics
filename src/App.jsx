import { useState, useRef, useCallback, useEffect } from 'react';
import { SportCourt } from './components/courts/SportCourt.jsx';
import { PlayerToken } from './components/PlayerToken.jsx';
import { DrawingOverlay } from './components/DrawingOverlay.jsx';
import { SettingsPanel } from './components/SettingsPanel.jsx';
import { useSettings } from './hooks/useSettings.js';
import { usePlayers } from './hooks/usePlayers.js';
import { useDrawing } from './hooks/useDrawing.js';
import { TEAM_COLOURS } from './constants/theme.js';
import { SPORTS } from './constants/sports.js';

export default function App() {
  const { theme, themeId, setTheme, sportId, setSportId } = useSettings();
  const maxPerTeam = SPORTS[sportId]?.maxPerTeam ?? 2;
  const { players, addPlayer, removePlayer, movePlayer, clearPlayers } = usePlayers(maxPerTeam);
  const { strokes, startStroke, continueStroke, endStroke, clearStrokes } = useDrawing(theme.drawColour);

  const [isDrawMode, setIsDrawMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [courtSize, setCourtSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  const courtContainerRef = useRef(null);
  const scaleRef = useRef(1);
  const isDrawingRef = useRef(false);
  const isPinchingRef = useRef(false);
  const activePointersRef = useRef(new Map());
  const pinchDataRef = useRef({ initialDist: 1, initialScale: 1 });
  const draggingPlayerRef = useRef(false);
  const isDrawModeRef = useRef(false);
  isDrawModeRef.current = isDrawMode;

  // Measure court container
  useEffect(() => {
    const el = courtContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCourtSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Wheel zoom (desktop / trackpad)
  useEffect(() => {
    const el = courtContainerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const next = Math.max(0.5, Math.min(3.5, scaleRef.current * factor));
      scaleRef.current = next;
      setScale(next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const getCourtCoords = useCallback((clientX, clientY) => {
    const rect = courtContainerRef.current.getBoundingClientRect();
    const lx = clientX - rect.left;
    const ly = clientY - rect.top;
    const s = scaleRef.current;
    const w = rect.width;
    const h = rect.height;
    return {
      x: (lx - w / 2) / s + w / 2,
      y: (ly - h / 2) / s + h / 2,
    };
  }, []);

  const handleCourtPointerDown = useCallback((e) => {
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 2) {
      const pts = [...activePointersRef.current.values()];
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      isPinchingRef.current = true;
      pinchDataRef.current = { initialDist: Math.max(dist, 1), initialScale: scaleRef.current };
      if (isDrawingRef.current) {
        endStroke();
        isDrawingRef.current = false;
      }
      return;
    }

    if (isDrawModeRef.current && !draggingPlayerRef.current) {
      const { x, y } = getCourtCoords(e.clientX, e.clientY);
      startStroke({ x, y });
      isDrawingRef.current = true;
      try { courtContainerRef.current.setPointerCapture(e.pointerId); } catch {}
    }
  }, [startStroke, endStroke, getCourtCoords]);

  const handleCourtPointerMove = useCallback((e) => {
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (isPinchingRef.current && activePointersRef.current.size === 2) {
      const pts = [...activePointersRef.current.values()];
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      const { initialDist, initialScale } = pinchDataRef.current;
      const next = Math.max(0.5, Math.min(3.5, initialScale * dist / initialDist));
      scaleRef.current = next;
      setScale(next);
      return;
    }

    if (isDrawingRef.current) {
      const { x, y } = getCourtCoords(e.clientX, e.clientY);
      continueStroke({ x, y });
    }
  }, [continueStroke, getCourtCoords]);

  const handleCourtPointerUp = useCallback((e) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) isPinchingRef.current = false;
    if (isDrawingRef.current) {
      endStroke();
      isDrawingRef.current = false;
    }
  }, [endStroke]);

  const handleAddPlayer = useCallback((team) => {
    const teamPlayers = players.filter(p => p.team === team);
    if (teamPlayers.length >= maxPerTeam) {
      alert(`${TEAM_COLOURS[team].label} already has ${maxPerTeam} player${maxPerTeam !== 1 ? 's' : ''} on court.`);
      return;
    }
    addPlayer(team);
  }, [players, addPlayer, maxPerTeam]);

  const handleReset = useCallback(() => {
    clearPlayers();
    clearStrokes();
    if (sportId === 'tennis') setTheme('australian_open');
  }, [clearPlayers, clearStrokes, setTheme, sportId]);

  const handleSelectSport = useCallback((id) => {
    setSportId(id);
    clearPlayers();
    clearStrokes();
  }, [setSportId, clearPlayers, clearStrokes]);

  const currentSport = SPORTS[sportId];
  const appTitle = sportId === 'tennis' ? '🎾 Tactics' : `${currentSport?.icon} ${currentSport?.label}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: theme.background }}>
      {/* Toolbar */}
      <div style={s.toolbar}>
        <span style={s.appTitle}>{appTitle}</span>
        <div style={s.toolbarActions}>
          <button
            style={{ ...s.toolbarBtn, ...(isDrawMode ? s.toolbarBtnActive : {}) }}
            onClick={() => setIsDrawMode(v => !v)}
          >
            {isDrawMode ? '✏️ Draw' : '👆 Move'}
          </button>
          <button style={s.toolbarBtn} onClick={() => setShowSettings(true)}>⚙️</button>
        </div>
      </div>

      {/* Court area */}
      <div
        ref={courtContainerRef}
        style={{ ...s.courtContainer, backgroundColor: theme.surrounds }}
        onPointerDown={handleCourtPointerDown}
        onPointerMove={handleCourtPointerMove}
        onPointerUp={handleCourtPointerUp}
        onPointerCancel={handleCourtPointerUp}
      >
        {courtSize.width > 0 && (
          <div style={{ width: '100%', height: '100%', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <SportCourt sportId={sportId} theme={theme} width={courtSize.width} height={courtSize.height} />
            <DrawingOverlay strokes={strokes} width={courtSize.width} height={courtSize.height} />
            {players.map(player => (
              <PlayerToken
                key={player.id}
                player={player}
                courtSize={courtSize}
                scaleRef={scaleRef}
                onMove={movePlayer}
                onRemove={removePlayer}
                isDrawMode={isDrawMode}
                draggingPlayerRef={draggingPlayerRef}
              />
            ))}
          </div>
        )}
        {isDrawMode && (
          <div style={s.drawHint}>Draw mode — drag to sketch</div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={s.bottomBar}>
        <button
          style={{ ...s.addBtn, backgroundColor: TEAM_COLOURS.A.primary }}
          onClick={() => handleAddPlayer('A')}
        >
          + A
        </button>
        <button style={s.clearBtn} onClick={handleReset}>Reset</button>
        <button
          style={{ ...s.addBtn, backgroundColor: TEAM_COLOURS.B.primary }}
          onClick={() => handleAddPlayer('B')}
        >
          + B
        </button>
      </div>

      {showSettings && (
        <SettingsPanel
          currentThemeId={themeId}
          onSelectTheme={(id) => { setTheme(id); setShowSettings(false); }}
          sportId={sportId}
          onSelectSport={(id) => { handleSelectSport(id); setShowSettings(false); }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

const s = {
  toolbar: {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 0.5,
  },
  toolbarActions: {
    display: 'flex',
    gap: 8,
  },
  toolbarBtn: {
    padding: '8px 14px',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  toolbarBtnActive: {
    backgroundColor: 'rgba(255,220,0,0.25)',
    border: '1px solid rgba(255,220,0,0.5)',
  },
  courtContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'none',
  },
  drawHint: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: 'rgba(255,255,255,0.75)',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    gap: 10,
    flexShrink: 0,
  },
  addBtn: {
    flex: 1,
    padding: '13px 0',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: 0.5,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
    cursor: 'pointer',
  },
  clearBtn: {
    flex: 1.2,
    padding: '13px 0',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
};
