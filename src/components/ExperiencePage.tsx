import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2, Sparkles } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Notebook Timeline Section */}
      <div className="relative pl-6 sm:pl-10 space-y-10">
        
        {/* Red / Terracotta Ink Vertical Dotted Line */}
        <div className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-[2px] border-l-2 border-dashed border-[#D88E8E]" />

        {RESUME_DATA.experience.map((exp) => (
          <div key={exp.id} className="relative group">
            
            {/* Timeline Stamp Node */}
            <div className="absolute -left-6 sm:-left-10 top-1 w-5 h-5 rounded-full bg-[#FFFDF9] border-2 border-[#D88E8E] flex items-center justify-center shadow-xs group-hover:bg-[#D88E8E] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D88E8E] group-hover:bg-white" />
            </div>

            {/* Experience Card */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm hover:paper-elevation-md transition-all space-y-4">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#E7DDD4] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl font-bold text-[#2E2A27]">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-label font-semibold border border-emerald-200">
                        PRESENT ROLE
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-sm font-semibold text-[#D88E8E] flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4 text-[#8A8078]" />
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end text-xs font-mono text-[#8A8078]">
                  <span className="flex items-center gap-1 bg-[#F7F1EA] px-2.5 py-1 rounded-md border border-[#E7DDD4]">
                    <Calendar className="w-3.5 h-3.5 text-[#D88E8E]" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1 mt-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#8A8078]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Bulleted Notebook Points from Resume */}
              <div className="space-y-2.5">
                {exp.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2E2A27] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#D88E8E] mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Technologies / Skills Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[#E7DDD4]">
                {exp.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-[#F7F1EA] border border-[#E7DDD4] font-mono text-xs text-[#2E2A27]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
