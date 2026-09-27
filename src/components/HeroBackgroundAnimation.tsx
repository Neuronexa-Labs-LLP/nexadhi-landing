"use client";

import React from "react";
import Orb from "./Orb";

export const HeroBackgroundAnimation: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden select-none z-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
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
