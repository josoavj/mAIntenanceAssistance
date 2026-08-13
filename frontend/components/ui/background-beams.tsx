"use client";

/**
 * BackgroundBeams — Pure SVG + CSS animation implementation
 * Faithful recreation of the Aceternity UI BackgroundBeams component.
 * No framer-motion / external dependency required.
 *
 * Technique:
 * - SVG radial beams with animated stroke-dashoffset
 * - Layered glows via CSS filter: blur()
 * - Fully transparent so the content sits on top naturally
 */

import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  // Each path traces a beam from the bottom-center outward
  const paths = [
    "M 0 800 Q 200 600 400 400 T 800 0",
    "M 100 800 Q 250 580 450 370 T 900 -50",
    "M -100 800 Q 150 620 350 430 T 700 50",
    "M 200 800 Q 320 560 500 340 T 1000 -100",
    "M -200 800 Q 100 640 300 460 T 600 100",
    "M 300 800 Q 400 550 560 310 T 1100 -150",
    "M -300 800 Q 50 660 250 490 T 500 150",
    "M 400 800 Q 480 540 620 280 T 1200 -200",
    "M -400 800 Q 0 680 200 520 T 400 200",
    "M 500 800 Q 560 530 680 250 T 1300 -250",
    "M -500 800 Q -50 700 150 550 T 300 250",
    "M 600 800 Q 640 520 740 220 T 1400 -300",
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Animated gradient for each beam */}
          {paths.map((_, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`beam-grad-${i}`}
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop
                offset="40%"
                stopColor={i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#818cf8" : "#4f46e5"}
                stopOpacity="0"
              >
                <animate
                  attributeName="stop-opacity"
                  values="0;0.6;0"
                  dur={`${3 + (i % 4) * 0.8}s`}
                  repeatCount="indefinite"
                  begin={`${(i * 0.4) % 3}s`}
                />
              </stop>
              <stop
                offset="60%"
                stopColor={i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#6366f1" : "#a5b4fc"}
                stopOpacity="0"
              >
                <animate
                  attributeName="stop-opacity"
                  values="0;0.4;0"
                  dur={`${3 + (i % 4) * 0.8}s`}
                  repeatCount="indefinite"
                  begin={`${(i * 0.4) % 3}s`}
                />
              </stop>
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}

          {/* Blur filter for glow */}
          <filter id="beam-blur-sm">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="beam-blur-md">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Render each beam twice: one sharp, one blurred glow */}
        {paths.map((d, i) => (
          <g key={`beam-${i}`}>
            {/* Glow layer */}
            <path
              d={d}
              fill="none"
              stroke={`url(#beam-grad-${i})`}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#beam-blur-md)"
              opacity="0.5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="-1000"
                dur={`${4 + (i % 5) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 4}s`}
              />
              <animate
                attributeName="stroke-dasharray"
                values="0 1000;300 700;0 1000"
                dur={`${4 + (i % 5) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 4}s`}
              />
            </path>

            {/* Sharp layer */}
            <path
              d={d}
              fill="none"
              stroke={`url(#beam-grad-${i})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#beam-blur-sm)"
              opacity="0.8"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="-1000"
                dur={`${4 + (i % 5) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 4}s`}
              />
              <animate
                attributeName="stroke-dasharray"
                values="0 1000;300 700;0 1000"
                dur={`${4 + (i % 5) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 4}s`}
              />
            </path>
          </g>
        ))}

        {/* Radial glow at convergence point */}
        <radialGradient id="center-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <rect x="0" y="0" width="800" height="800" fill="url(#center-glow)" />
      </svg>
    </div>
  );
}
