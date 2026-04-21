export function BaseballField({ width, height, theme }) {
  const w = width;
  const h = height;

  const lw = Math.max(1.5, w * 0.004);

  const homeX = w / 2;
  const homeY = h * 0.85;
  const baseLen = Math.min(w, h) * 0.22;

  const firstX = homeX + baseLen;
  const firstY = homeY - baseLen;
  const secondX = homeX;
  const secondY = homeY - baseLen * 2;
  const thirdX = homeX - baseLen;
  const thirdY = homeY - baseLen;
  const pitcherX = homeX;
  const pitcherY = homeY - baseLen;

  const ofRadius = baseLen * 3.2;
  const foulAngle = 45 * (Math.PI / 180);
  const ofWallRightX = homeX + ofRadius * Math.sin(foulAngle);
  const ofWallRightY = homeY - ofRadius * Math.cos(foulAngle);
  const ofWallLeftX = homeX - ofRadius * Math.sin(foulAngle);
  const ofWallLeftY = homeY - ofRadius * Math.cos(foulAngle);

  const inDirtR = baseLen * 1.3;
  const baseSz = Math.max(5, w * 0.018);

  return (
    <svg width={w} height={h}>
      <rect x={0} y={0} width={w} height={h} fill={theme.surrounds} />
      <path d={`M ${homeX} ${homeY} L ${ofWallLeftX} ${ofWallLeftY} A ${ofRadius} ${ofRadius} 0 0 1 ${ofWallRightX} ${ofWallRightY} Z`} fill={theme.court} />
      <circle cx={homeX} cy={homeY - baseLen * 0.85} r={inDirtR} fill={theme.courtLight} />

      <line x1={homeX} y1={homeY} x2={ofWallRightX} y2={ofWallRightY} stroke={theme.lines} strokeWidth={lw} />
      <line x1={homeX} y1={homeY} x2={ofWallLeftX} y2={ofWallLeftY} stroke={theme.lines} strokeWidth={lw} />
      <path d={`M ${ofWallLeftX} ${ofWallLeftY} A ${ofRadius} ${ofRadius} 0 0 1 ${ofWallRightX} ${ofWallRightY}`} fill="none" stroke={theme.lines} strokeWidth={lw * 2} />

      <line x1={homeX} y1={homeY} x2={firstX} y2={firstY} stroke={theme.lines} strokeWidth={lw} />
      <line x1={firstX} y1={firstY} x2={secondX} y2={secondY} stroke={theme.lines} strokeWidth={lw} />
      <line x1={secondX} y1={secondY} x2={thirdX} y2={thirdY} stroke={theme.lines} strokeWidth={lw} />
      <line x1={thirdX} y1={thirdY} x2={homeX} y2={homeY} stroke={theme.lines} strokeWidth={lw} />

      <circle cx={pitcherX} cy={pitcherY} r={baseLen * 0.12} fill={theme.lines} opacity={0.6} />

      {[[homeX, homeY], [firstX, firstY], [secondX, secondY], [thirdX, thirdY]].map(([bx, by], i) => (
        <rect key={i} x={bx - baseSz / 2} y={by - baseSz / 2} width={baseSz} height={baseSz}
          fill={theme.lines} transform={`rotate(45 ${bx} ${by})`} />
      ))}
    </svg>
  );
}
