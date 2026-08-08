import React, { useState } from 'react';
import { RESUME_DATA, Project } from '../data/resumeData';
import { Github, ExternalLink, Cpu, CheckCircle2, Layers, Terminal, Sparkles, ArrowLeft, ArrowRight, Activity } from 'lucide-react';

interface ProjectSpreadProps {
  selectedProject?: Project;
  onSelectProject: (project: Project) => void;
}

export const ProjectSpread: React.FC<ProjectSpreadProps> = ({
  selectedProject = RESUME_DATA.projects[0],
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'highlights' | 'metrics'>('architecture');

  const currentIndex = RESUME_DATA.projects.findIndex(p => p.id === selectedProject.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % RESUME_DATA.projects.length;
    onSelectProject(RESUME_DATA.projects[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + RESUME_DATA.projects.length) % RESUME_DATA.projects.length;
    onSelectProject(RESUME_DATA.projects[prevIdx]);
  };

  return (
    <div className="space-y-6">
      {/* Project Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F7F1EA] p-2.5 rounded-xl border border-[#E7DDD4] gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {RESUME_DATA.projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className={`px-3 py-1.5 rounded-lg text-xs font-label whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedProject.id === proj.id
                  ? 'bg-[#2E2A27] text-[#FFFDF9] font-medium shadow-xs'
                  : 'bg-[#FFFDF9] text-[#8A8078] hover:text-[#2E2A27] border border-[#E7DDD4]'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-1.5 text-xs font-label text-[#8A8078] shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#E7DDD4]">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-md bg-[#FFFDF9] border border-[#E7DDD4] hover:text-[#2E2A27] min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer active:scale-95"
            title="Previous Project"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1">
            {currentIndex + 1} / {RESUME_DATA.projects.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-md bg-[#FFFDF9] border border-[#E7DDD4] hover:text-[#2E2A27] min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer active:scale-95"
            title="Next Project"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notebook Spread Layout (Left & Right Pages) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT PAGE: Problem, Solution, Tech Stack, Links */}
        <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7DDD4] pb-2">
            <span className="font-label text-xs uppercase tracking-widest text-[#D88E8E] font-medium">
              PROBLEM & SOLUTION
            </span>
            <span className="font-mono text-xs text-[#8A8078]">
              {selectedProject.category}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-3xl font-bold text-[#2E2A27]">
              {selectedProject.title}
            </h3>
            <p className="font-sans text-xs text-[#8A8078] mt-1">
              {selectedProject.subtitle}
            </p>
          </div>

          {/* Problem Block */}
          <div className="p-4 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] space-y-2">
            <span className="font-label text-xs uppercase tracking-wider text-[#D88E8E] font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              The Challenge / Problem
            </span>
            <p className="font-sans text-xs text-[#2E2A27] leading-relaxed">
              {selectedProject.problem}
            </p>
          </div>

          {/* Solution Block */}
          <div className="p-4 rounded-xl bg-[#FFFDF9] border-l-4 border-l-[#D88E8E] border border-[#E7DDD4] space-y-2">
            <span className="font-label text-xs uppercase tracking-wider text-[#2E2A27] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D88E8E]" />
              Engineering Solution
            </span>
            <p className="font-sans text-xs text-[#2E2A27] leading-relaxed">
              {selectedProject.solution}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <span className="font-label text-xs uppercase tracking-wider text-[#8A8078]">
              Tech Stack & Libraries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-[#F7F1EA] border border-[#E7DDD4] font-mono text-xs text-[#2E2A27]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E2A27] text-[#FFFDF9] hover:bg-[#3D3834] font-label text-xs shadow-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>GitHub Repository</span>
              </a>
            )}
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFDF9] border border-[#E7DDD4] text-[#2E2A27] hover:bg-[#F7F1EA] font-label text-xs shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Live System Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT PAGE: Architecture / Flow Diagram, Key Highlights & Metrics */}
        <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7DDD4] pb-2">
            <span className="font-label text-xs uppercase tracking-widest text-[#D88E8E] font-medium">
              ARCHITECTURE & METRICS
            </span>
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#F7F1EA] p-0.5 rounded-lg text-[10px] font-label">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  activeTab === 'architecture' ? 'bg-[#FFFDF9] text-[#2E2A27] font-semibold' : 'text-[#8A8078]'
                }`}
              >
                Flow
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  activeTab === 'highlights' ? 'bg-[#FFFDF9] text-[#2E2A27] font-semibold' : 'text-[#8A8078]'
                }`}
              >
                Highlights
              </button>
            </div>
          </div>

          {/* Architecture / Flowchart Simulation Visualizer */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#2E2A27] text-[#FFFDF9] font-mono text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-[#D88E8E] border-b border-white/10 pb-2">
                  <span>SYSTEM_FLOW // {selectedProject.title.toUpperCase()}</span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="space-y-2 text-[11px] leading-relaxed">
                  {selectedProject.architectureDetails.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#D88E8E] font-bold">[{idx + 1}]</span>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics Cards */}
              <div className="grid grid-cols-3 gap-2">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#F7F1EA] border border-[#E7DDD4] text-center">
                    <p className="font-mono text-[10px] text-[#8A8078] uppercase">{m.label}</p>
                    <p className="font-serif font-bold text-sm text-[#2E2A27] mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights Bulleted Notebook List */}
          {activeTab === 'highlights' && (
            <div className="space-y-3">
              <p className="font-label text-xs uppercase tracking-wider text-[#8A8078]">
                Key Project Highlights & Deliverables
              </p>
              <ul className="space-y-2">
                {selectedProject.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2E2A27] font-sans leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D88E8E] mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sticky Handwritten Annotation */}
          <div className="p-3 rounded-lg bg-[#FEF9C3] border border-[#FDE047] font-handwriting text-lg text-[#713F12]">
            "Architecture verified & tested. All query optimizations eager-loaded successfully."
          </div>
        </div>

      </div>
    </div>
  );
};
