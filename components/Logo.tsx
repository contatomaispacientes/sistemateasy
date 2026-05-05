type LogoProps = {
  size?: number;
};

export default function Logo({ size = 1 }: LogoProps) {
  return (
    <div className="flex items-baseline relative">
      <span
        className="font-display text-white tracking-[-0.02em] leading-none"
        style={{ fontSize: 22 * size }}
      >
        Sistemat
      </span>
      <span className="relative inline-block">
        <span
          className="font-sans italic text-accent leading-none"
          style={{ fontSize: 23 * size }}
        >
          easy
        </span>
        <svg
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: -3 * size,
            left: -2 * size,
            width: `calc(100% + ${4 * size}px)`,
            height: 8 * size,
          }}
          viewBox="0 0 80 12"
          fill="none"
        >
          <path
            d="M2 8 C20 2, 60 2, 78 6"
            stroke="var(--accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
    </div>
  );
}
