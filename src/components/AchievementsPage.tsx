import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { Award, Trophy, Sparkles, Medal, BookOpenCheck, ShieldCheck } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Honors & Hackathons Grid */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#2E2A27] flex items-center gap-2 border-b border-[#E7DDD4] pb-2">
          <Trophy className="w-5 h-5 text-[#D88E8E]" />
          Honors, Hackathons & Activities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME_DATA.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm hover:paper-elevation-md transition-all space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F1EA] border border-[#E7DDD4] font-label text-[10px] font-semibold text-[#D88E8E] uppercase tracking-wider">
                  {ach.badge}
                </span>
                <Medal className="w-4 h-4 text-[#D88E8E]" />
              </div>

              <h4 className="font-serif text-lg font-bold text-[#2E2A27]">
                {ach.title}
              </h4>
              <p className="font-sans text-xs text-[#8A8078] font-medium">
                {ach.organization}
              </p>
              <p className="font-sans text-xs text-[#2E2A27]/90 leading-relaxed pt-1 border-t border-[#E7DDD4]/60">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certifications Notebook Cards */}
      <div className="space-y-4 pt-4 border-t border-[#E7DDD4]">
        <h3 className="font-serif text-2xl font-bold text-[#2E2A27] flex items-center gap-2 border-b border-[#E7DDD4] pb-2">
          <BookOpenCheck className="w-5 h-5 text-[#D88E8E]" />
          Verified Industry Certifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESUME_DATA.certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] space-y-2 hover:bg-[#FFFDF9] hover:border-[#D88E8E] transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#D88E8E]" />
              <h5 className="font-serif text-base font-bold text-[#2E2A27] leading-snug">
                {cert.title}
              </h5>
              <p className="font-mono text-[11px] text-[#8A8078]">
                Issuer: {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
