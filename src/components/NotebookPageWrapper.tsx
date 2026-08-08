import React from 'react';
import { motion } from 'motion/react';
import { SpiralBinding } from './SpiralBinding';
import { PaperTexture } from '../types';

interface NotebookPageWrapperProps {
  pageNumber: number;
  totalPages: number;
  title: string;
  category: string;
  paperTexture: PaperTexture;
  children: React.ReactNode;
  isActive?: boolean;
}

export const NotebookPageWrapper: React.FC<NotebookPageWrapperProps> = ({
  pageNumber,
  totalPages,
  title,
  category,
  paperTexture,
  children,
  isActive = true,
}) => {
  // Map paper texture to CSS background pattern
  const textureClass =
    paperTexture === 'ruled'
      ? 'bg-notebook-ruled'
      : paperTexture === 'grid'
      ? 'bg-notebook-grid'
      : paperTexture === 'dots'
      ? 'bg-notebook-dots'
      : 'bg-[#FFFDF9]';

  return (
    <motion.section
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: isActive ? 1 : 0.85, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.99 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto my-6 px-3 sm:px-6 lg:px-8 relative"
    >
      {/* Physical Notebook Card Container */}
      <div className={`w-full bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl paper-elevation-lg relative overflow-hidden page-curl-corner ${textureClass}`}>
        
        {/* Top Spiral Binding */}
        <SpiralBinding orientation="horizontal" count={16} />

        {/* Top Paper Header Strip (Notebook Page Header) */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-[#E7DDD4]/80 flex items-center justify-between font-label text-[11px] sm:text-xs text-[#8A8078] bg-[#FFFDF9]/80 backdrop-blur-xs select-none">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-mono text-[#D88E8E] font-semibold shrink-0">
              PAGE {String(pageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>
            <span className="text-[#E7DDD4]">•</span>
            <span className="uppercase tracking-widest font-medium text-[#2E2A27]/80 truncate">
              {category}
            </span>
          </div>


        </div>

        {/* Page Main Content Body */}
        <div className="p-4 sm:p-8 lg:p-12 min-h-[50vh] sm:min-h-[70vh] flex flex-col justify-between relative">
          
          {/* Subtle Left Margin Line (Red margin line found in physical notebooks) */}
          <div className="absolute left-4 sm:left-10 top-0 bottom-0 w-[1px] bg-[#D88E8E]/25 pointer-events-none hidden md:block" />

          {/* Section Heading Banner */}
          <div className="mb-6 sm:mb-8 pl-0 md:pl-6 border-b border-[#E7DDD4] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-handwriting text-base sm:text-lg text-[#D88E8E]">
                ~ {category} ~
              </p>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#2E2A27] tracking-tight leading-tight">
                {title}
              </h2>
            </div>
            
            <span className="font-mono text-[11px] sm:text-xs text-[#8A8078] shrink-0">
              // ENTRY #{String(pageNumber).padStart(3, '0')}
            </span>
          </div>

          {/* Core Page Content */}
          <div className="pl-0 md:pl-6 flex-1">
            {children}
          </div>

          {/* Footer Paper Page Rules */}
          <div className="mt-12 pt-4 border-t border-[#E7DDD4] flex items-center justify-between text-xs font-label text-[#8A8078] select-none pl-0 md:pl-6">
            <span className="font-serif italic text-[#8A8078]">
              Rishitha Mondi • AI & Full-Stack Engineer
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
