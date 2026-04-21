export function TennisCourt({ width, height, theme }) {
  const w = width;
  const h = height;

  const padX = w * 0.05;
  const padY = h * 0.04;
  const courtW = w - padX * 2;
  const courtH = h - padY * 2;

  const left = padX;
  const right = padX + courtW;
  const top = padY;
  const bottom = padY + courtH;
  const midX = w / 2;
  const midY = h / 2;

  const singlesInset = courtW * 0.072;
  const singlesLeft = left + singlesInset;
  const singlesRight = right - singlesInset;

  const serviceLineTop = top + courtH * 0.21;
  const serviceLineBottom = bottom - courtH * 0.21;

  const lw = Math.max(1.5, w * 0.004);

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <rect x={left} y={top} width={courtW} height={courtH} fill={theme.court} />
      <rect x={singlesLeft} y={serviceLineTop} width={singlesRight - singlesLeft} height={serviceLineBottom - serviceLineTop} fill={theme.courtLight} />

      <line x1={left} y1={top} x2={right} y2={top} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={left} y1={top} x2={left} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={right} y1={top} x2={right} y2={bottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={singlesLeft} y1={top} x2={singlesLeft} y2={bottom} stroke={theme.lines} strokeWidth={lw} />
      <line x1={singlesRight} y1={top} x2={singlesRight} y2={bottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={singlesLeft} y1={serviceLineTop} x2={singlesRight} y2={serviceLineTop} stroke={theme.lines} strokeWidth={lw} />
      <line x1={singlesLeft} y1={serviceLineBottom} x2={singlesRight} y2={serviceLineBottom} stroke={theme.lines} strokeWidth={lw} />

      <line x1={midX} y1={midY} x2={midX} y2={serviceLineTop} stroke={theme.lines} strokeWidth={lw} />
      <line x1={midX} y1={serviceLineBottom} x2={midX} y2={midY} stroke={theme.lines} strokeWidth={lw} />

      <line x1={midX} y1={top} x2={midX} y2={top + courtH * 0.015} stroke={theme.lines} strokeWidth={lw} />
      <line x1={midX} y1={bottom} x2={midX} y2={bottom - courtH * 0.015} stroke={theme.lines} strokeWidth={lw} />

      <line x1={left} y1={midY} x2={right} y2={midY} stroke={theme.net} strokeWidth={lw * 2} strokeDasharray="4,3" />
      <circle cx={left} cy={midY} r={lw * 2} fill={theme.net} />
      <circle cx={right} cy={midY} r={lw * 2} fill={theme.net} />
    </svg>
  );
}
