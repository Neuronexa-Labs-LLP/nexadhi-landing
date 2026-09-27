"use client";

import React from "react";
import Orb from "./Orb";

export const HeroBackgroundAnimation: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden select-none z-0 pointer-events-none flex items-center justify-center bg-[#F8FAFC]"
      aria-hidden="true"
    >
      <div className="w-full h-full relative">
        <Orb
          hoverIntensity={0.47}
          rotateOnHover={false}
          hue={360}
          forceHoverState={false}
          backgroundColor="#F8FAFC"
          color3="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default HeroBackgroundAnimation;
