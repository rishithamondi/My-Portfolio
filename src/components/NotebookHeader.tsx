import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaperTexture } from '../types';
import { SunflowerLogo } from './SunflowerLogo';
import { ResumeButton } from './ResumeButton';
import { RESUME_DATA } from '../data/resumeData';
import {
  Volume2,
  VolumeX,
  Grid,
  AlignJustify,
  MoreHorizontal,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  BookOpen,
  FileText,
} from 'lucide-react';

interface NotebookHeaderProps {
  paperTexture: PaperTexture;
  setPaperTexture: (texture: PaperTexture) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  currentPage: number;
  totalPages: number;
  onOpenResume: () => void;
  onOpenAssistant?: () => void;
  onPageSelect?: (pageIndex: number) => void;
}

// Custom LeetCode Icon
const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.17 5.79a1.374 1.374 0 0 0 0 1.94l5.352 5.352a1.374 1.374 0 0 0 1.942 0 1.374 1.374 0 0 0 0-1.942l-4.38-4.38 4.38-4.38A1.374 1.374 0 0 0 13.483 0zm-7.067 11.23a1.374 1.374 0 0 0-1.94 0L.438 15.268a1.374 1.374 0 0 0 0 1.94l4.038 4.038a1.374 1.374 0 0 0 1.941 0 1.374 1.374 0 0 0 0-1.94l-3.067-3.068 3.067-3.067a1.374 1.374 0 0 0 0-1.942zm11.337-1.007a1.374 1.374 0 0 0-.961.438l-2.02 2.02a1.374 1.374 0 0 0 1.942 1.942l2.02-2.02a1.374 1.374 0 0 0-.981-2.38z" />
  </svg>
);

// Custom CodeChef Icon
const CodeChefIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 13.8a4 4 0 1 1 2.2-7.4A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 3.8 1.4A4 4 0 1 1 18 13.8V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5.2z"/>
    <path d="M6 17h12"/>
  </svg>
);

const NAV_ITEMS = [
  { index: 0, num: '01', title: 'Cover' },
  { index: 1, num: '02', title: 'About' },
  { index: 2, num: '03', title: 'Projects' },
  { index: 3, num: '04', title: 'Deep Dive' },
  { index: 4, num: '05', title: 'Experience' },
  { index: 5, num: '06', title: 'Skills' },
  { index: 6, num: '07', title: 'Honors' },
  { index: 7, num: '08', title: 'Contact' },
];

export const NotebookHeader: React.FC<NotebookHeaderProps> = ({
  paperTexture,
  setPaperTexture,
  soundEnabled,
  setSoundEnabled,
  currentPage,
  totalPages,
  onOpenResume,
  onOpenAssistant,
  onPageSelect,
}) => {
  const { socialLinks, email } = RESUME_DATA.personalInfo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (idx: number) => {
    if (onPageSelect) {
      onPageSelect(idx);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F8F5F1]/95 backdrop-blur-md border-b border-[#E7DDD4] px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-[#2E2A27]">
        
        {/* 1. Sunflower Logo & Notebook Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="cursor-pointer flex items-center justify-center shrink-0">
            <SunflowerLogo size={40} className="w-9 h-9 sm:w-11 sm:h-11 text-[#D88E8E] hover:rotate-12 transition-transform duration-300" />
          </div>
          <h1 className="font-serif text-base sm:text-lg font-semibold tracking-tight text-[#2E2A27] leading-none">
            Rishitha Mondi
          </h1>
        </div>

        {/* 2. Page Indicator (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 bg-[#FFFDF9] border border-[#E7DDD4] px-3.5 py-1 rounded-full text-xs font-label text-[#8A8078] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#D88E8E] animate-pulse" />
          <span className="font-mono">Page {String(currentPage + 1).padStart(2, '0')} of {String(totalPages).padStart(2, '0')}</span>
        </div>

        {/* 3. Right Utility Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Paper Texture Switcher Menu (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center bg-[#F7F1EA] border border-[#E7DDD4] rounded-lg p-0.5 text-xs font-label text-[#8A8078]">
            <button
              title="Ruled Paper"
              onClick={() => setPaperTexture('ruled')}
              className={`p-1.5 rounded-md transition-colors ${
                paperTexture === 'ruled'
                  ? 'bg-[#FFFDF9] text-[#2E2A27] shadow-xs'
                  : 'hover:text-[#2E2A27]'
              }`}
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
            <button
              title="Grid Paper"
              onClick={() => setPaperTexture('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                paperTexture === 'grid'
                  ? 'bg-[#FFFDF9] text-[#2E2A27] shadow-xs'
                  : 'hover:text-[#2E2A27]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              title="Dots Paper"
              onClick={() => setPaperTexture('dots')}
              className={`p-1.5 rounded-md transition-colors ${
                paperTexture === 'dots'
                  ? 'bg-[#FFFDF9] text-[#2E2A27] shadow-xs'
                  : 'hover:text-[#2E2A27]'
              }`}
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio Rustle Sound Toggle */}
          <button
            title={soundEnabled ? 'Paper Rustle Sound ON' : 'Paper Rustle Sound OFF'}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`min-w-[36px] min-h-[36px] p-2 rounded-lg border text-xs transition-all hover:-translate-y-0.5 flex items-center justify-center ${
              soundEnabled
                ? 'bg-[#FFFDF9] border-[#E7DDD4] text-[#D88E8E] shadow-2xs'
                : 'bg-[#F7F1EA] border-[#E7DDD4] text-[#8A8078]'
            }`}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Link Icon Buttons (Desktop only to prevent wrapping) */}
          <div className="hidden lg:flex items-center gap-1.5 pl-1 border-l border-[#E7DDD4]/60">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:text-[#D88E8E] hover:border-[#D88E8E]/40 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:text-[#D88E8E] hover:border-[#D88E8E]/40 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              title="LeetCode Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:text-[#D88E8E] hover:border-[#D88E8E]/40 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              <LeetCodeIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={socialLinks.codechef}
              target="_blank"
              rel="noopener noreferrer"
              title="CodeChef Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:text-[#D88E8E] hover:border-[#D88E8E]/40 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              <CodeChefIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${email}`}
              title="Send Email"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:text-[#D88E8E] hover:border-[#D88E8E]/40 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Resume Button */}
          <div className="hidden sm:flex items-center ml-1">
            <ResumeButton onOpenResume={onOpenResume} />
          </div>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[40px] min-h-[40px] p-2 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:bg-[#F7F1EA] flex items-center justify-center transition-all active:scale-95 shadow-2xs cursor-pointer ml-1"
            title="Open Notebook Index Menu"
            aria-label="Toggle Notebook Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D88E8E]" /> : <Menu className="w-5 h-5 text-[#2E2A27]" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Slide-Down / Notebook Index Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2E2A27]/40 backdrop-blur-xs z-40 lg:hidden"
            />

            <motion.aside
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[57px] left-3 right-3 z-50 bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl paper-elevation-lg overflow-hidden lg:hidden max-h-[85vh] flex flex-col"
            >
              {/* Drawer Top Header */}
              <div className="px-5 py-3.5 bg-[#F7F1EA] border-b border-[#E7DDD4] flex items-center justify-between text-xs font-label">
                <span className="font-serif font-bold text-sm text-[#2E2A27]">
                  Portfolio Table of Contents
                </span>
                <span className="font-mono text-[#D88E8E]">
                  PAGE {String(currentPage + 1).padStart(2, '0')} OF {String(totalPages).padStart(2, '0')}
                </span>
              </div>

              {/* Scrollable Drawer Body */}
              <div className="p-4 overflow-y-auto space-y-4">
                
                {/* 1. Notebook Chapter List */}
                <div className="grid grid-cols-2 gap-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = currentPage === item.index;
                    return (
                      <button
                        key={item.index}
                        onClick={() => handleNavClick(item.index)}
                        className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all active:scale-98 ${
                          isActive
                            ? 'bg-[#D88E8E] text-white border-[#C27B7B] font-semibold shadow-xs'
                            : 'bg-[#FFFDF9] text-[#2E2A27] border-[#E7DDD4] hover:bg-[#F7F1EA]'
                        }`}
                      >
                        <span className="font-mono text-xs opacity-80">{item.num}.</span>
                        <span className="font-label text-xs font-medium">{item.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 2. Paper Texture Switcher */}
                <div className="pt-3 border-t border-[#E7DDD4] space-y-1.5">
                  <p className="font-label text-[10px] uppercase tracking-wider text-[#8A8078]">
                    Paper Grid Pattern
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-label">
                    <button
                      onClick={() => setPaperTexture('ruled')}
                      className={`min-h-[40px] px-3 py-2 rounded-xl border flex items-center justify-center gap-1.5 ${
                        paperTexture === 'ruled'
                          ? 'bg-[#2E2A27] text-white border-[#2E2A27]'
                          : 'bg-[#F7F1EA] text-[#2E2A27] border-[#E7DDD4]'
                      }`}
                    >
                      <AlignJustify className="w-3.5 h-3.5" />
                      <span>Ruled</span>
                    </button>
                    <button
                      onClick={() => setPaperTexture('grid')}
                      className={`min-h-[40px] px-3 py-2 rounded-xl border flex items-center justify-center gap-1.5 ${
                        paperTexture === 'grid'
                          ? 'bg-[#2E2A27] text-white border-[#2E2A27]'
                          : 'bg-[#F7F1EA] text-[#2E2A27] border-[#E7DDD4]'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                    <button
                      onClick={() => setPaperTexture('dots')}
                      className={`min-h-[40px] px-3 py-2 rounded-xl border flex items-center justify-center gap-1.5 ${
                        paperTexture === 'dots'
                          ? 'bg-[#2E2A27] text-white border-[#2E2A27]'
                          : 'bg-[#F7F1EA] text-[#2E2A27] border-[#E7DDD4]'
                      }`}
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                      <span>Dots</span>
                    </button>
                  </div>
                </div>

                {/* 3. Resume Mobile Button & Social Links */}
                <div className="pt-3 border-t border-[#E7DDD4] space-y-3">
                  <button
                    onClick={() => {
                      onOpenResume();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#2E2A27] text-white font-label text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-[#D88E8E]" />
                    <span>View / Print Technical Resume</span>
                  </button>

                  <div className="flex items-center justify-center gap-3 pt-1">
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] text-[#2E2A27] flex items-center justify-center"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] text-[#2E2A27] flex items-center justify-center"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={socialLinks.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] text-[#2E2A27] flex items-center justify-center"
                      title="LeetCode"
                    >
                      <LeetCodeIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={socialLinks.codechef}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] text-[#2E2A27] flex items-center justify-center"
                      title="CodeChef"
                    >
                      <CodeChefIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="w-10 h-10 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] text-[#2E2A27] flex items-center justify-center"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

