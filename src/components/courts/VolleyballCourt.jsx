export function VolleyballCourt({ width, height, theme }) {
  const w = width;
  const h = height;

  const padX = w * 0.06;
  const padY = h * 0.05;
  const cW = w - padX * 2;
  const cH = h - padY * 2;

  const left = padX;
  const right = padX + cW;
  const top = padY;
  const bottom = padY + cH;
  const midX = w / 2;
  const midY = h / 2;

  const lw = Math.max(1.5, w * 0.004);

  const attackLineTop = midY - cH / 6;
  const attackLineBottom = midY + cH / 6;

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={cW} height={cH} fill={theme.court} />
      <rect x={left} y={attackLineTop} width={cW} height={attackLineBottom - attackLineTop} fill={theme.courtLight} opacity={0.5} />

      <line x1={left} y1={top} x2={right} y2={top} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={top} x2={left} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={right} y1={top} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={left} y1={attackLineTop} x2={right} y2={attackLineTop} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={attackLineBottom} x2={right} y2={attackLineBottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.net} strokeWidth={lw * 3} />
      <circle cx={left} cy={midY} r={lw * 2.5} fill={theme.net} />
      <circle cx={right} cy={midY} r={lw * 2.5} fill={theme.net} />

      <line x1={midX} y1={top} x2={midX} y2={bottom} stroke={theme.lines} strokeWidth={lw * 0.7} strokeDasharray="4,4" opacity={0.4} />
    </svg>
  );
}
