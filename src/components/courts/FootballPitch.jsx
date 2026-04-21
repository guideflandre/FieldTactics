export function FootballPitch({ width, height, theme }) {
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

  const penW = cW * 0.593;
  const penH = cH * 0.157;
  const penLeft = midX - penW / 2;

  const gaW = cW * 0.269;
  const gaH = cH * 0.052;
  const gaLeft = midX - gaW / 2;

  const goalW = cW * 0.108;
  const goalDepth = cH * 0.018;
  const goalLeft = midX - goalW / 2;

  const centreR = cW * 0.134;
  const penSpot = cH * 0.105;

  const penArcDy = penH - penSpot;
  const penArcDx = Math.sqrt(Math.max(0, centreR * centreR - penArcDy * penArcDy));

  const cornerR = cW * 0.03;

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={cW} height={cH} fill={theme.court} />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={left} y={top + (cH / 6) * i} width={cW} height={cH / 6}
          fill={i % 2 === 0 ? theme.court : theme.courtLight} opacity={0.6} />
      ))}

      <rect x={left} y={top} width={cW} height={cH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={centreR} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={lw * 2} fill={theme.lines} />

      <rect x={penLeft} y={top} width={penW} height={penH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={gaLeft} y={top} width={gaW} height={gaH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={goalLeft} y={top - goalDepth} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
      <circle cx={midX} cy={top + penSpot} r={lw * 2} fill={theme.lines} />
      {penArcDx > 0 && (
        <path d={`M ${midX - penArcDx} ${top + penH} A ${centreR} ${centreR} 0 0 0 ${midX + penArcDx} ${top + penH}`}
          fill="none" stroke={theme.lines} strokeWidth={lw} />
      )}

      <rect x={penLeft} y={bottom - penH} width={penW} height={penH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={gaLeft} y={bottom - gaH} width={gaW} height={gaH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={goalLeft} y={bottom} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
      <circle cx={midX} cy={bottom - penSpot} r={lw * 2} fill={theme.lines} />
      {penArcDx > 0 && (
        <path d={`M ${midX - penArcDx} ${bottom - penH} A ${centreR} ${centreR} 0 0 1 ${midX + penArcDx} ${bottom - penH}`}
          fill="none" stroke={theme.lines} strokeWidth={lw} />
      )}

      <path d={`M ${left + cornerR} ${top} A ${cornerR} ${cornerR} 0 0 0 ${left} ${top + cornerR}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${right - cornerR} ${top} A ${cornerR} ${cornerR} 0 0 1 ${right} ${top + cornerR}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${left} ${bottom - cornerR} A ${cornerR} ${cornerR} 0 0 0 ${left + cornerR} ${bottom}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${right - cornerR} ${bottom} A ${cornerR} ${cornerR} 0 0 0 ${right} ${bottom - cornerR}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
    </svg>
  );
}
