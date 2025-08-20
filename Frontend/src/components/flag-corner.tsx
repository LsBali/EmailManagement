import React from 'react';

type FlagCornerProps = {
  position: 'top-right' | 'bottom-left';
  className?: string;
};

// Iridescent waving flag rendered as SVG with animated turbulence/displacement.
// Placed absolutely in the page corners; purely decorative.
export const FlagCorner: React.FC<FlagCornerProps> = ({ position, className }) => {
  const isTopRight = position === 'top-right';

  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none absolute z-0',
        'w-[44vw] max-w-[560px] h-[36vh] max-h-[380px]',
        isTopRight ? 'top-[-48px] right-[-64px]' : 'bottom-[-48px] left-[-64px]',
        className || '',
      ].join(' ')}
    >
      <svg viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="flagGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#caa8ff" />
            <stop offset="100%" stopColor="#9ad5ff" />
          </linearGradient>

          {/* Soft highlight sheen that drifts across */}
          <linearGradient id="sheenGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Waving filter */}
          <filter id="waveFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="3" result="noise">
              <animate attributeName="baseFrequency" dur="6s" values="0.008 0.02; 0.012 0.03; 0.008 0.02" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="22; 28; 22" dur="6s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>

        {/* Base flag */}
        <g filter="url(#waveFilter)">
          <rect x="0" y="0" width="600" height="400" rx="28" fill="url(#flagGradient)" />
        </g>

        {/* Moving sheen overlay */}
        <g style={{ mixBlendMode: 'screen' }} opacity={0.55}>
          <rect x="0" y="0" width="600" height="400" rx="28" fill="url(#sheenGradient)">
            <animate attributeName="x" values="-300;0;-300" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Subtle shadow at the tail for depth */}
        <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.0" />
        </linearGradient>
        <rect x="0" y="260" width="600" height="140" fill="url(#shadowGrad)" />
      </svg>
    </div>
  );
};

export default FlagCorner;


