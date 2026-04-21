export function FieldHockeyPitch({ width, height, theme }) {
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

  const dRadius = cW * 0.266;
  const goalW = cW * 0.067;
  const goalDepth = cH * 0.018;
  const goalLeft = midX - goalW / 2;
  const penSpot = cH * 0.070;
  const centreR = cW * 0.04;

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={cW} height={cH} fill={theme.court} />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={left} y={top + (cH / 6) * i} width={cW} height={cH / 6}
          fill={i % 2 === 0 ? theme.court : theme.courtLight} opacity={0.5} />
      ))}

      <rect x={left} y={top} width={cW} height={cH} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={centreR} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <circle cx={midX} cy={midY} r={lw * 2} fill={theme.lines} />

      <line x1={left} y1={top + cH * 0.252} x2={right} y2={top + cH * 0.252} stroke={theme.lines} strokeWidth={lw} strokeDasharray="6,4" opacity={0.7} />
      <line x1={left} y1={bottom - cH * 0.252} x2={right} y2={bottom - cH * 0.252} stroke={theme.lines} strokeWidth={lw} strokeDasharray="6,4" opacity={0.7} />

      <path d={`M ${midX - dRadius} ${top} A ${dRadius} ${dRadius} 0 0 0 ${midX + dRadius} ${top}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={goalLeft} y={top - goalDepth} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
      <circle cx={midX} cy={top + penSpot} r={lw * 2} fill={theme.lines} />

      <path d={`M ${midX - dRadius} ${bottom} A ${dRadius} ${dRadius} 0 0 1 ${midX + dRadius} ${bottom}`} fill="none" stroke={theme.lines} strokeWidth={lw} />
      <rect x={goalLeft} y={bottom} width={goalW} height={goalDepth} fill="none" stroke={theme.net} strokeWidth={lw} />
      <circle cx={midX} cy={bottom - penSpot} r={lw * 2} fill={theme.lines} />

      {[[left, top], [right, top], [left, bottom], [right, bottom]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={lw * 1.5} fill={theme.lines} />
      ))}
    </svg>
  );
}
