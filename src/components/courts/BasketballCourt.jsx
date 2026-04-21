export function BasketballCourt({ width, height, theme }) {
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

  const keyW = cW * 0.327;
  const keyH = cH * 0.207;
  const keyLeft = midX - keyW / 2;

  const ftR = cW * 0.12;
  const basketDist = cH * 0.056;
  const restrictedR = cW * 0.083;
  const threeR = cH * 0.241;
  const cornerInset = cW * 0.06;
  const threeCornerDx = midX - (left + cornerInset);
  const threeArcOffset = Math.sqrt(Math.max(0, threeR * threeR - threeCornerDx * threeCornerDx));
  const threeCornerY_top = top + basketDist + threeArcOffset;
  const centreR = cW * 0.12;

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={cW} height={cH} fill={theme.court} />

      <rect x={keyLeft} y={top} width={keyW} height={keyH} fill={theme.courtLight} stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${midX - ftR} ${top + keyH} A ${ftR} ${ftR} 0 0 1 ${midX + ftR} ${top + keyH}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${midX - ftR} ${top + keyH} A ${ftR} ${ftR} 0 0 0 ${midX + ftR} ${top + keyH}`} fill="none" stroke={theme.lines} strokeWidth={lw} strokeDasharray="5,4" />
      <path d={`M ${midX - restrictedR} ${top + basketDist} A ${restrictedR} ${restrictedR} 0 0 0 ${midX + restrictedR} ${top + basketDist}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={top + basketDist} r={lw * 2.5} fill={theme.lines} />
      <line x1={midX - cW * 0.06} y1={top} x2={midX + cW * 0.06} y2={top} stroke={theme.lines} strokeWidth={lw * 2.5} />
      <line x1={left + cornerInset} y1={top} x2={left + cornerInset} y2={threeCornerY_top} stroke={theme.lines} strokeWidth={lw} />
      <line x1={right - cornerInset} y1={top} x2={right - cornerInset} y2={threeCornerY_top} stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${left + cornerInset} ${threeCornerY_top} A ${threeR} ${threeR} 0 0 0 ${right - cornerInset} ${threeCornerY_top}`} fill="none" stroke={theme.lines} strokeWidth={lw} />

      <rect x={keyLeft} y={bottom - keyH} width={keyW} height={keyH} fill={theme.courtLight} stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${midX - ftR} ${bottom - keyH} A ${ftR} ${ftR} 0 0 0 ${midX + ftR} ${bottom - keyH}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${midX - ftR} ${bottom - keyH} A ${ftR} ${ftR} 0 0 1 ${midX + ftR} ${bottom - keyH}`} fill="none" stroke={theme.lines} strokeWidth={lw} strokeDasharray="5,4" />
      <path d={`M ${midX - restrictedR} ${bottom - basketDist} A ${restrictedR} ${restrictedR} 0 0 1 ${midX + restrictedR} ${bottom - basketDist}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={bottom - basketDist} r={lw * 2.5} fill={theme.lines} />
      <line x1={midX - cW * 0.06} y1={bottom} x2={midX + cW * 0.06} y2={bottom} stroke={theme.lines} strokeWidth={lw * 2.5} />
      <line x1={left + cornerInset} y1={bottom} x2={left + cornerInset} y2={bottom - threeArcOffset - basketDist} stroke={theme.lines} strokeWidth={lw} />
      <line x1={right - cornerInset} y1={bottom} x2={right - cornerInset} y2={bottom - threeArcOffset - basketDist} stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${left + cornerInset} ${bottom - threeArcOffset - basketDist} A ${threeR} ${threeR} 0 0 1 ${right - cornerInset} ${bottom - threeArcOffset - basketDist}`} fill="none" stroke={theme.lines} strokeWidth={lw} />

      <rect x={left} y={top} width={cW} height={cH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={centreR} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={lw * 2} fill={theme.lines} />
    </svg>
  );
}
