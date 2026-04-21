import { useRef } from 'react';
import { TEAM_COLOURS, PLAYER_RADIUS } from '../constants/theme.js';

export function PlayerToken({ player, courtSize, scaleRef, onMove, onRemove, isDrawMode, draggingPlayerRef }) {
  const teamColour = TEAM_COLOURS[player.team];
  const longPressTimer = useRef(null);
  const dragStart = useRef(null);

  const absX = player.position.x * courtSize.width;
  const absY = player.position.y * courtSize.height;

  const handlePointerDown = (e) => {
    if (isDrawMode) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingPlayerRef.current = true;
    dragStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startPos: { ...player.position },
    };
    longPressTimer.current = setTimeout(() => {
      onRemove(player.id);
      dragStart.current = null;
      draggingPlayerRef.current = false;
    }, 600);
  };

  const handlePointerMove = (e) => {
    if (!dragStart.current) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    const s = scaleRef.current;
    const dx = (e.clientX - dragStart.current.clientX) / s;
    const dy = (e.clientY - dragStart.current.clientY) / s;
    onMove(player.id, {
      x: Math.max(0, Math.min(1, dragStart.current.startPos.x + dx / courtSize.width)),
      y: Math.max(0, Math.min(1, dragStart.current.startPos.y + dy / courtSize.height)),
    });
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    dragStart.current = null;
    draggingPlayerRef.current = false;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: absX - PLAYER_RADIUS,
        top: absY - PLAYER_RADIUS,
        width: PLAYER_RADIUS * 2,
        height: PLAYER_RADIUS * 2,
        borderRadius: '50%',
        backgroundColor: teamColour.primary,
        border: '2px solid rgba(255,255,255,0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
        cursor: isDrawMode ? 'default' : 'grab',
        pointerEvents: isDrawMode ? 'none' : 'auto',
        touchAction: 'none',
        zIndex: 10,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <span style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 900, lineHeight: 1 }}>
        {player.number}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 7, fontWeight: 700, letterSpacing: 0.5, lineHeight: 1.2 }}>
        {player.team}
      </span>
    </div>
  );
}
