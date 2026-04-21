export function PadelCourt({ width, height, theme }) {
  const w = width;
  const h = height;

  const padX = w * 0.05;
  const padY = h * 0.04;
  const cW = w - padX * 2;
  const cH = h - padY * 2;

  const left = padX;
  const right = padX + cW;
  const top = padY;
  const bottom = padY + cH;
  const midX = w / 2;
  const midY = h / 2;

  const lw = Math.max(1.5, w * 0.004);
  const wallW = Math.max(4, w * 0.012);

  const serviceLineTop = top + cH * 0.25;
  const serviceLineBottom = bottom - cH * 0.25;

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={cW} height={cH} fill={theme.court} />
      <rect x={left} y={serviceLineTop} width={cW} height={serviceLineBottom - serviceLineTop} fill={theme.courtLight} />

      <rect x={left} y={top} width={cW} height={wallW} fill={theme.surrounds} opacity={0.7} />
      <rect x={left} y={bottom - wallW} width={cW} height={wallW} fill={theme.surrounds} opacity={0.7} />
      <rect x={left} y={top} width={wallW} height={cH} fill={theme.surrounds} opacity={0.5} />
      <rect x={right - wallW} y={top} width={wallW} height={cH} fill={theme.surrounds} opacity={0.5} />

      <line x1={left} y1={top} x2={right} y2={top} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={top} x2={left} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={right} y1={top} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={left} y1={serviceLineTop} x2={right} y2={serviceLineTop} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={serviceLineBottom} x2={right} y2={serviceLineBottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={midX} y1={midY} x2={midX} y2={serviceLineTop} stroke={theme.lines} strokeWidth={lw} />
      <line x1={midX} y1={midY} x2={midX} y2={serviceLineBottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.net} strokeWidth={lw * 2.5} strokeDasharray="5,3" />
      <circle cx={left} cy={midY} r={lw * 2.5} fill={theme.net} />
      <circle cx={right} cy={midY} r={lw * 2.5} fill={theme.net} />
    </svg>
  );
}
