import React from 'react';
import { FileText } from 'lucide-react';

interface ResumeButtonProps {
  onOpenResume: () => void;
}

// 📎 Metallic Rose-Gold Paper Clip Component
const RoseGoldPaperClip: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 20 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3.5 h-6 filter drop-shadow-[0_1.5px_2px_rgba(110,65,55,0.22)] ${className}`}
  >
    <defs>
      <linearGradient id="roseGoldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F7D3C8" />
        <stop offset="25%" stopColor="#E2A698" />
        <stop offset="55%" stopColor="#C07E70" />
        <stop offset="80%" stopColor="#965749" />
        <stop offset="100%" stopColor="#E8AFA2" />
      </linearGradient>
    </defs>
    {/* Realistic Paper Clip Wire Path */}
    <path
      d="M 12.5 17.5 V 10 C 12.5 7.2 10.7 5.5 8.5 5.5 C 6.3 5.5 4.5 7.2 4.5 10 V 22.5 C 4.5 26.2 7 28.5 9.8 28.5 C 12.6 28.5 15.2 26.2 15.2 22.5 V 6 C 15.2 3 12.8 1.2 9.8 1.2 C 6.8 1.2 3.8 3.2 3.8 6.5"
      stroke="url(#roseGoldMetallic)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 📄 Folded Paper Corner SVG Flap
const FoldedCorner: React.FC = () => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none text-[#EFE5DC]"
  >
    <path
      d="M 0 12 L 12 0 L 12 12 Z"
      fill="currentColor"
    />
    <path
      d="M 0 12 L 12 0"
      stroke="#D8C3B5"
      strokeWidth="1"
    />
    <path
      d="M 0 12 L 0 0 L 12 0"
      fill="#FFFBF8"
    />
    <path
      d="M 0 12 L 12 0"
      stroke="#E4CFC7"
      strokeWidth="0.8"
    />
  </svg>
);

export const ResumeButton: React.FC<ResumeButtonProps> = ({ onOpenResume }) => {
  return (
    <button
      onClick={onOpenResume}
      type="button"
      className="group relative inline-flex items-center gap-2 bg-[#FFFBF8] hover:bg-[#FFFDFB] border border-[#E4CFC7] rounded-[12px] px-3.5 py-1.5 cursor-pointer select-none transition-all duration-300 hover:-translate-y-[3px] active:translate-y-0 active:scale-95 shadow-[0_2px_8px_rgba(138,110,96,0.10)] hover:shadow-[0_8px_20px_rgba(138,110,96,0.18)] overflow-visible"
      title="Open Resume"
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 rounded-[12px] opacity-40 bg-[radial-gradient(#E8DDD5_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

      {/* 📎 Metallic Paper Clip hooked onto the top-right paper edge */}
      {/* Positioned so ~65% is above/outside the top-right edge and ~35% overlaps onto the paper */}
      <div className="absolute -top-3.5 right-1.5 z-20 pointer-events-none transform rotate-[-12deg] group-hover:rotate-[-15deg] transition-transform duration-300 origin-center">
        <RoseGoldPaperClip />
      </div>

      {/* Subtle clip grip shadow on the paper where clip overlaps */}
      <div className="absolute top-0 right-2 w-2 h-1.5 bg-[#8F5143]/10 blur-[1px] rounded-full pointer-events-none z-10" />

      {/* Outlined Document Icon */}
      <div className="relative z-10 flex items-center justify-center w-4 h-4 text-[#C68B7B] group-hover:text-[#B07464] transition-colors">
        <FileText className="w-4 h-4 stroke-[1.75]" />
      </div>

      {/* Label */}
      <span className="relative z-10 font-label font-medium text-xs tracking-wide text-[#3D3530] group-hover:text-[#2A231F]">
        Resume
      </span>

      {/* Folded Corner flap on bottom-right */}
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 overflow-hidden rounded-br-[12px] pointer-events-none z-10">
        <div className="w-full h-full relative">
          <FoldedCorner />
        </div>
      </div>
    </button>
  );
};
