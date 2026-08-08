import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaperTexture, PageInfo } from './types';
import { playPaperRustle } from './utils/audioUtils';
import { RESUME_DATA, Project } from './data/resumeData';

import { NotebookHeader } from './components/NotebookHeader';
import { BookmarkTabs } from './components/BookmarkTabs';
import { NotebookPageWrapper } from './components/NotebookPageWrapper';

import { CoverPage } from './components/CoverPage';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectSpread } from './components/ProjectSpread';
import { ExperiencePage } from './components/ExperiencePage';
import { SkillsPage } from './components/SkillsPage';
import { AchievementsPage } from './components/AchievementsPage';
import { ContactPage } from './components/ContactPage';

import { ResumeModal } from './components/ResumeModal';
import { AINotebookAssistant } from './components/AINotebookAssistant';

const PAGES: PageInfo[] = [
  { id: 'cover', number: 1, title: 'Front Cover & Index', subtitle: 'Personal Engineering Portfolio' },
  { id: 'about', number: 2, title: 'About & Background', subtitle: 'Biography & Engineering Philosophy' },
  { id: 'projects', number: 3, title: 'Featured Projects', subtitle: 'Key Systems & Applications' },
  { id: 'spread', number: 4, title: 'Project Deep Dive', subtitle: 'System Architecture & Flow' },
  { id: 'experience', number: 5, title: 'Professional Timeline', subtitle: 'Internships & Microservices' },
  { id: 'skills', number: 6, title: 'Technical Matrix', subtitle: 'Languages, Tools & Frameworks' },
  { id: 'achievements', number: 7, title: 'Honors & Certifications', subtitle: 'Scholarships & Credentials' },
  { id: 'contact', number: 8, title: 'Contact & Network', subtitle: 'Direct Channels & Inquiries' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paperTexture, setPaperTexture] = useState<PaperTexture>('ruled');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project>(RESUME_DATA.projects[0]);

  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const handlePageSelect = (pageIndex: number) => {
    if (pageIndex !== currentPage) {
      if (soundEnabled) {
        playPaperRustle(true);
      }
      setCurrentPage(pageIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    if (soundEnabled) {
      playPaperRustle(true);
    }
    // Automatically transition to Page 3 (Project Spread)
    setCurrentPage(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPageInfo = PAGES[currentPage];

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#2E2A27] font-sans flex flex-col justify-between selection:bg-[#D88E8E]/30 relative overflow-x-hidden print:bg-white print:min-h-0 print:p-0">
      
      {/* Top Fixed Notebook Header */}
      <div className="print:hidden">
        <NotebookHeader
          paperTexture={paperTexture}
          setPaperTexture={setPaperTexture}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          currentPage={currentPage}
          totalPages={PAGES.length}
          onOpenResume={() => setIsResumeOpen(true)}
          onPageSelect={handlePageSelect}
        />
      </div>

      {/* Side Bookmark Ribbons */}
      <div className="print:hidden">
        <BookmarkTabs
          currentPage={currentPage}
          onPageSelect={handlePageSelect}
        />
      </div>

      {/* Main Notebook Canvas Area */}
      <main className="flex-1 py-4 sm:py-8 print:hidden">
        <AnimatePresence mode="wait">
          <NotebookPageWrapper
            key={currentPageInfo.id}
            pageNumber={currentPageInfo.number}
            totalPages={PAGES.length}
            title={currentPageInfo.title}
            category={currentPageInfo.subtitle}
            paperTexture={paperTexture}
            isActive={true}
          >
            {currentPage === 0 && (
              <CoverPage
                onNavigateProjects={() => handlePageSelect(2)}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            )}

            {currentPage === 1 && <AboutPage />}

            {currentPage === 2 && (
              <ProjectsPage onSelectProject={handleProjectSelect} />
            )}

            {currentPage === 3 && (
              <ProjectSpread
                selectedProject={selectedProject}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            )}

            {currentPage === 4 && <ExperiencePage />}

            {currentPage === 5 && <SkillsPage />}

            {currentPage === 6 && <AchievementsPage />}

            {currentPage === 7 && <ContactPage />}
          </NotebookPageWrapper>
        </AnimatePresence>
      </main>

      {/* Page Turning Navigation Footbar */}
      <footer className="w-full bg-[#F8F5F1] border-t border-[#E7DDD4] py-4 px-6 flex items-center justify-between text-xs font-label text-[#8A8078] max-w-5xl mx-auto print:hidden">
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageSelect(currentPage - 1)}
          className="px-4 py-2 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] hover:bg-[#F7F1EA] text-[#2E2A27] disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-all active:scale-95"
        >
          ← Previous Page
        </button>

        <span className="font-mono text-[#2E2A27]">
          {currentPage + 1} / {PAGES.length}
        </span>

        <button
          disabled={currentPage === PAGES.length - 1}
          onClick={() => handlePageSelect(currentPage + 1)}
          className="px-4 py-2 rounded-xl bg-[#2E2A27] hover:bg-[#3D3834] text-[#FFFDF9] disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-all active:scale-95"
        >
          Next Page →
        </button>
      </footer>

      {/* Modals & AI Assistant Floating Widget */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <div className="print:hidden">
        <AINotebookAssistant
          isOpen={isAssistantOpen}
          onOpen={() => setIsAssistantOpen(true)}
          onClose={() => setIsAssistantOpen(false)}
        />
      </div>
    </div>
  );
}
