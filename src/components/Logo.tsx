/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "color";
  className?: string;
  height?: number;
}

export default function Logo({ variant = "color", className = "", height = 44 }: LogoProps) {
  // Variant colors configurations
  // "color": Original logo colors (Dark Navy, Red, White/Transparent background)
  // "dark": Deep navy and red text for bright white backgrounds
  // "light": Pure white text with orange/red accents for dark container themes

  const isLight = variant === "light";
  const primaryColor = isLight ? "#FFFFFF" : "#0A2540";
  const accentRed = "#D92D20"; // Premium red accent
  const secondaryColor = isLight ? "#E3E8EF" : "#475467";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ height }}>
      {/* SVG Stylized Truck Path with Road Waves */}
      <svg
        height="100%"
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Stylized Truck Cab Shape */}
        <path
          d="M20 40H64L76 28H52V18L36 18C30 18 24 23 22 28L20 40Z"
          fill={primaryColor}
          className="transition-colors duration-300"
        />
        {/* Windshield */}
        <polygon points="54,20 62,20 68,28 54,28" fill={isLight ? "#0A2540" : "#FFFFFF"} />
        {/* Front Wheel */}
        <circle cx="40" cy="40" r="4.5" fill={primaryColor} />
        <circle cx="40" cy="40" r="2" fill={isLight ? "#0A2540" : "#FFFFFF"} />

        {/* Dynamic Speed Lanes (top of truck) */}
        <path d="M12 21H24" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 26H20" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M14 31H26" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* Dynamic Road Waves / Swooshes */}
        {/* Wave 1: Red road line curving under truck */}
        <path
          d="M8 48C28 48 40 40 68 32C84 27 100 24 116 23"
          stroke={accentRed}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Wave 2: Navy / White road line below wave 1 */}
        <path
          d="M12 54C34 54 48 45 78 36C94 31 108 28 120 27"
          stroke={primaryColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
      </svg>

      {/* Brand Typography Text Frame */}
      <div className="flex flex-col justify-center leading-none text-left">
        {/* CTNS Main Text */}
        <span 
          className="font-sans font-black tracking-tight"
          style={{ 
            color: primaryColor, 
            fontSize: `${height * 0.44}px`,
            fontStyle: "italic",
            lineHeight: 1
          }}
        >
          CTNS
        </span>
        
        {/* Logistics LLC spacing banner */}
        <div className="flex items-center gap-1 mt-0.5" style={{ width: "100%" }}>
          <div className="h-[1px] flex-1" style={{ backgroundColor: secondaryColor }} />
          <span 
            className="font-mono font-extrabold uppercase whitespace-nowrap"
            style={{ 
              color: isLight ? "#98A2B3" : "#667085",
              fontSize: `${height * 0.17}px`,
              lineHeight: 1,
              letterSpacing: "0.14em"
            }}
          >
            LOGISTICS LLC
          </span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: secondaryColor }} />
        </div>
      </div>
    </div>
  );
}
