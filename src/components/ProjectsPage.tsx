import React, { useState } from 'react';
import { RESUME_DATA, Project } from '../data/resumeData';
import { Bookmark, ArrowUpRight, Code, Cpu, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI & Real-Time Engineering', 'Full-Stack Web Application', 'Full-Stack E-Commerce'];

  const filteredProjects = activeFilter === 'All'
    ? RESUME_DATA.projects
    : RESUME_DATA.projects.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-label transition-all ${
              activeFilter === cat
                ? 'bg-[#2E2A27] text-[#FFFDF9] font-medium shadow-xs'
                : 'bg-[#F7F1EA] text-[#8A8078] hover:bg-[#FFFDF9] hover:text-[#2E2A27] border border-[#E7DDD4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Journal Cards / Notebook Inserts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group relative p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm hover:paper-elevation-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-full"
          >
            {/* Top Hover Red Ribbon Bookmark */}
            <div className="absolute top-0 right-6 w-5 h-8 bg-[#D88E8E] rounded-b-sm shadow-xs -translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-center pb-1 text-white">
              <Bookmark className="w-3 h-3 fill-current" />
            </div>

            <div className="space-y-4">
              {/* Category Stamp */}
              <div className="flex items-center justify-between text-[11px] font-label text-[#8A8078] flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#F7F1EA] border border-[#E7DDD4] text-[#D88E8E] font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="font-mono text-[#8A8078]/80 group-hover:text-[#2E2A27] transition-colors">
                  INSPECT SPREAD →
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2E2A27] group-hover:text-[#D88E8E] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-[#8A8078] mt-1 line-clamp-2">
                  {project.subtitle}
                </p>
              </div>

              {/* Problem Brief */}
              <p className="font-sans text-xs text-[#2E2A27]/90 leading-relaxed border-l-2 border-l-[#E7DDD4] pl-3 group-hover:border-l-[#D88E8E] transition-colors">
                {project.problem}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#F7F1EA] border border-[#E7DDD4] font-mono text-[10px] text-[#2E2A27]"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded bg-[#F7F1EA] border border-[#E7DDD4] font-mono text-[10px] text-[#8A8078]">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Card Action Link */}
            <div className="mt-6 pt-3 border-t border-[#E7DDD4] flex items-center justify-between text-xs font-label text-[#8A8078] group-hover:text-[#2E2A27]">
              <span className="flex items-center gap-1 font-medium">
                <Code className="w-3.5 h-3.5 text-[#D88E8E]" />
                View Full Entry
              </span>
              <div className="w-6 h-6 rounded-full bg-[#F7F1EA] group-hover:bg-[#D88E8E] group-hover:text-white border border-[#E7DDD4] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
