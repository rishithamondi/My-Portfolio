import React from 'react';
import { motion } from 'motion/react';

interface BookmarkTabsProps {
  currentPage: number;
  onPageSelect: (pageIndex: number) => void;
}

const TABS = [
  { index: 0, num: '01', title: 'Cover', label: 'Cover' },
  { index: 1, num: '02', title: 'About', label: 'About' },
  { index: 2, num: '03', title: 'Projects', label: 'Projects' },
  { index: 3, num: '04', title: 'Spread', label: 'Deep Dive' },
  { index: 4, num: '05', title: 'Experience', label: 'Experience' },
  { index: 5, num: '06', title: 'Skills', label: 'Skills' },
  { index: 6, num: '07', title: 'Achievements', label: 'Honors' },
  { index: 7, num: '08', title: 'Contact', label: 'Contact' },
];

export const BookmarkTabs: React.FC<BookmarkTabsProps> = ({
  currentPage,
  onPageSelect,
}) => {
  return (
    <>
      {/* Desktop Right Side Notebook Chapter Tabs */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 pr-0.5 select-none">
        {TABS.map((tab) => {
          const isActive = currentPage === tab.index;
          return (
            <button
              key={tab.index}
              onClick={() => onPageSelect(tab.index)}
              className={`group relative flex items-center justify-between pl-3.5 pr-3 py-1.5 rounded-l-xl font-label text-xs tracking-wider transition-all duration-300 shadow-xs border-y border-l cursor-pointer ${
                isActive
                  ? 'bg-[#D88E8E] text-white border-[#C27B7B] -translate-x-1.5 shadow-md font-semibold z-10'
                  : 'bg-[#F7F1EA]/95 text-[#8A8078] border-[#E7DDD4] translate-x-2.5 hover:translate-x-0 hover:bg-[#FFFDF9] hover:text-[#2E2A27] hover:shadow-xs'
              }`}
            >
              {/* Active Tab Accent Bar */}
              {isActive && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-l-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <span className="whitespace-nowrap flex items-center gap-2">
                <span className={`font-mono text-[10px] tracking-tight ${isActive ? 'text-white/90' : 'text-[#D88E8E] group-hover:text-[#D88E8E]'}`}>
                  {tab.num}.
                </span>
                <span>{tab.title}</span>
              </span>

              {/* Dot Indicator */}
              <span
                className={`ml-2 w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-white' : 'bg-[#D88E8E]/40 group-hover:bg-[#D88E8E]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile / Tablet Horizontal Bookmark Strip */}
      <div className="lg:hidden sticky top-[57px] z-30 w-full bg-[#F8F5F1]/95 backdrop-blur-md border-b border-[#E7DDD4] py-2 px-3 overflow-x-auto no-scrollbar flex items-center gap-2">
        {TABS.map((tab) => {
          const isActive = currentPage === tab.index;
          return (
            <button
              key={tab.index}
              onClick={() => onPageSelect(tab.index)}
              className={`whitespace-nowrap text-xs font-label min-h-[38px] px-3.5 py-1.5 rounded-full transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-[#D88E8E] text-white border-[#C27B7B] font-semibold shadow-xs'
                  : 'bg-[#FFFDF9] text-[#8A8078] border-[#E7DDD4] hover:text-[#2E2A27]'
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
