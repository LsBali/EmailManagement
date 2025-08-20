import React from 'react';

// Decorative animated shapes rendered on the sides of the page
const DecorShapes: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Left side column (some fully visible) */}
      <div className="absolute left-4 top-20 space-y-10">
        <div className="shape shape-circle size-24" />
        <div className="shape shape-circle size-28 delay-300" />
        <div className="shape shape-circle size-20 delay-700" />
      </div>

      {/* Left edge partially offscreen for depth */}
      <div className="absolute left-[-40px] top-1/2 space-y-8">
        <div className="shape shape-circle size-16 delay-900" />
        <div className="shape shape-circle size-14 delay-1200" />
      </div>

      {/* Right side column (fully visible) */}
      <div className="absolute right-4 top-28 space-y-12">
        <div className="shape shape-circle size-28" />
        <div className="shape shape-circle size-16 delay-500" />
        <div className="shape shape-circle size-24 delay-900" />
      </div>

      {/* Right edge partially offscreen for depth */}
      <div className="absolute right-[-36px] top-1/2 space-y-6">
        <div className="shape shape-circle size-20 delay-1100" />
        <div className="shape shape-circle size-14 delay-1400" />
      </div>

      {/* Bottom left cluster (fully visible) */}
      <div className="absolute left-8 bottom-20 space-y-6">
        <div className="shape shape-circle size-16 delay-1000" />
        <div className="shape shape-circle size-14 delay-600" />
      </div>

      {/* Top right single (fully visible) */}
      <div className="absolute right-8 top-10">
        <div className="shape shape-circle size-16 delay-1200" />
      </div>
    </div>
  );
};

export default DecorShapes;


