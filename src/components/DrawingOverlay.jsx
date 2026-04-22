import React from 'react';

function pointsToPath(points) {
  if (points.length < 2) return '';
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < rest.length - 1; i++) {
    const midX = (rest[i].x + rest[i + 1].x) / 2;
    const midY = (rest[i].y + rest[i + 1].y) / 2;
    d += ` Q ${rest[i].x} ${rest[i].y} ${midX} ${midY}`;
  }
  const last = rest[rest.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

export function DrawingOverlay({ strokes, width, height }) {
  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 5, overflow: 'visible' }}
    >
      {strokes.map((stroke) => {
        const d = pointsToPath(stroke.points);
        if (!d) return null;
        return (
          <React.Fragment key={stroke.id}>
            <path d={d} stroke={stroke.colour} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={stroke.opacity * 0.25} />
            <path d={d} stroke={stroke.colour} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={stroke.opacity * 0.55} />
            <path d={d} stroke={stroke.colour} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={stroke.opacity} />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
