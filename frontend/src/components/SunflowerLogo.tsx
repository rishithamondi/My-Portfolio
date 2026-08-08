import React from 'react';
import { motion } from 'motion/react';

interface SunflowerLogoProps {
  className?: string;
  size?: number;
  showStem?: boolean;
  animated?: boolean;
  showBgCircle?: boolean;
  stemSway?: boolean;
  petalBloom?: boolean;
}

export const SunflowerLogo: React.FC<SunflowerLogoProps> = ({
  className = "transition-transform duration-300 hover:rotate-6 cursor-pointer",
  size = 40,
  showStem = true,
  animated = true,
  showBgCircle = false,
  stemSway = false,
  petalBloom = false,
}) => {
  // 14 soft geometric petals with alternating editorial tones
  const petals = [
    { angle: 0, color: '#D99B8A' },
    { angle: 25.71, color: '#E8C7B8' },
    { angle: 51.42, color: '#D99B8A' },
    { angle: 77.14, color: '#EFD8CB' },
    { angle: 102.85, color: '#D99B8A' },
    { angle: 128.57, color: '#E8C7B8' },
    { angle: 154.28, color: '#D99B8A' },
    { angle: 180, color: '#EFD8CB' },
    { angle: 205.71, color: '#D99B8A' },
    { angle: 231.42, color: '#E8C7B8' },
    { angle: 257.14, color: '#D99B8A' },
    { angle: 282.85, color: '#EFD8CB' },
    { angle: 308.57, color: '#D99B8A' },
    { angle: 334.28, color: '#E8C7B8' },
  ];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Optional Outer Background Circle & Border */}
        {showBgCircle && (
          <circle cx="20" cy="20" r="19" fill="#FFFBF7" stroke="#D99B8A" strokeWidth="1" />
        )}

        {/* Stem & Leaves with gentle ±2° sway every 4 seconds */}
        {showStem && (
          <motion.g
            animate={stemSway ? { rotate: [-2, 2, -2] } : {}}
            transition={
              stemSway
                ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                : {}
            }
            style={{ transformOrigin: '20px 35.5px' }}
            className={animated && !stemSway ? "transition-transform duration-500 ease-out group-hover:rotate-1" : ""}
          >
            {/* Elegant Muted Olive Stem */}
            <path
              d="M 20 20 C 20 25, 20.6 30, 20 35.5"
              stroke="#8D8A72"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Sage Green Leaf */}
            <path
              d="M 19.8 26.5 C 16.2 25.5, 14.5 23.8, 14 22 C 16 22.4, 18.6 23.8, 19.8 26 Z"
              fill="#A7B69A"
            />
            {/* Right Sage Green Leaf */}
            <path
              d="M 20.2 28.5 C 23.8 27.5, 25.5 25.8, 26 24 C 24 24.4, 21.4 25.8, 20.2 28 Z"
              fill="#A7B69A"
            />
          </motion.g>
        )}

        {/* Flower Head Group with petals bloom pulse every 8–10 seconds */}
        <motion.g
          animate={
            petalBloom
              ? { scale: [1, 1.07, 1], rotate: [0, 2, 0] }
              : {}
          }
          transition={
            petalBloom
              ? { duration: 9, repeat: Infinity, ease: 'easeInOut' }
              : {}
          }
          style={{ transformOrigin: '20px 16.5px' }}
          className={animated && !petalBloom ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""}
        >
          {/* 14 Soft Petals */}
          {petals.map((p, i) => (
            <path
              key={i}
              d="M 20 16.5 C 18.7 12, 18.8 8.2, 20 7.2 C 21.2 8.2, 21.3 12, 20 16.5 Z"
              fill={p.color}
              transform={`rotate(${p.angle} 20 16.5)`}
              className={animated ? "transition-opacity duration-300 hover:opacity-90" : ""}
            />
          ))}

          {/* Warm Brown Center Seed Circle */}
          <circle cx="20" cy="16.5" r="3.4" fill="#5D4A3F" />
          
          {/* Inner Soft Accent Ring */}
          <circle cx="20" cy="16.5" r="1.6" fill="#EFD8CB" opacity="0.6" />
          <circle cx="20" cy="16.5" r="0.8" fill="#5D4A3F" />
        </motion.g>
      </svg>
    </div>
  );
};
