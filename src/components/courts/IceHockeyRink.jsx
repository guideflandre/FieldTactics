import React from 'react';

export function IceHockeyRink({ width, height, theme }) {
  const w = width;
  const h = height;

  const padX = w * 0.04;
  const padY = h * 0.03;
  const cW = w - padX * 2;
  const cH = h - padY * 2;

  const left = padX;
  const right = padX + cW;
  const top = padY;
  const bottom = padY + cH;
  const midX = w / 2;
  const midY = h / 2;

  const lw = Math.max(1.5, w * 0.004);

  const cornerR = cW * 0.18;

  const blueLineTop = top + cH * 0.328;
  const blueLineBottom = bottom - cH * 0.328;
  const blueLineW = lw * 3;
  const redLineW = lw * 2.5;

  const circleR = cW * 0.173;
  const zoFX = cW * 0.269;
  const zoFY = cH * 0.246;

  const creaseR = cW * 0.1;
  const goalW = cW * 0.16;
  const goalDepth = cH * 0.022;
  const goalLeft = midX - goalW / 2;

  const rinkPath = [
    `M ${left + cornerR} ${top}`,
    `L ${right - cornerR} ${top}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${right} ${top + cornerR}`,
    `L ${right} ${bottom - cornerR}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${right - cornerR} ${bottom}`,
    `L ${left + cornerR} ${bottom}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${left} ${bottom - cornerR}`,
    `L ${left} ${top + cornerR}`,
    `A ${cornerR} ${cornerR} 0 0 1 ${left + cornerR} ${top}`,
    `Z`,
  ].join(' ');

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <path d={rinkPath} fill={theme.court} />
      <path d={rinkPath} fill="none" stroke={theme.lines} strokeWidth={lw * 2} />

      <line x1={left} y1={blueLineTop} x2={right} y2={blueLineTop} stroke="#1565C0" strokeWidth={blueLineW} />
      <line x1={left} y1={blueLineBottom} x2={right} y2={blueLineBottom} stroke="#1565C0" strokeWidth={blueLineW} />
      <line x1={left} y1={midY} x2={right} y2={midY} stroke="#D32F2F" strokeWidth={redLineW} />

      <circle cx={midX} cy={midY} r={circleR} fill="none" stroke="#D32F2F" strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={lw * 2} fill="#D32F2F" />

      {[
        [midX - zoFX, top + zoFY],
        [midX + zoFX, top + zoFY],
        [midX - zoFX, bottom - zoFY],
        [midX + zoFX, bottom - zoFY],
      ].map(([cx, cy], i) => (
        <React.Fragment key={i}>
          <circle cx={cx} cy={cy} r={circleR} fill="none" stroke="#D32F2F" strokeWidth={lw} />
          <circle cx={cx} cy={cy} r={lw * 2} fill="#D32F2F" />
        </React.Fragment>
      ))}

      <line x1={left + cW * 0.05} y1={top + cH * 0.066} x2={right - cW * 0.05} y2={top + cH * 0.066} stroke="#D32F2F" strokeWidth={lw} />
      <line x1={left + cW * 0.05} y1={bottom - cH * 0.066} x2={right - cW * 0.05} y2={bottom - cH * 0.066} stroke="#D32F2F" strokeWidth={lw} />

      <path d={`M ${midX - creaseR} ${top + cH * 0.066} A ${creaseR} ${creaseR} 0 0 0 ${midX + creaseR} ${top + cH * 0.066}`}
        fill={theme.courtLight} stroke="#D32F2F" strokeWidth={lw} opacity={0.6} />
      <path d={`M ${midX - creaseR} ${bottom - cH * 0.066} A ${creaseR} ${creaseR} 0 0 1 ${midX + creaseR} ${bottom - cH * 0.066}`}
        fill={theme.courtLight} stroke="#D32F2F" strokeWidth={lw} opacity={0.6} />

      <rect x={goalLeft} y={top + cH * 0.066 - goalDepth} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
      <rect x={goalLeft} y={bottom - cH * 0.066} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
    </svg>
  );
}
