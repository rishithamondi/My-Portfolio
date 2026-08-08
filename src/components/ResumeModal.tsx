import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Briefcase, Code, Award, ExternalLink, Check } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2E2A27]/60 backdrop-blur-sm overflow-y-auto print:static print:inset-auto print:block print:p-0 print:bg-transparent print:backdrop-blur-none print:z-auto print:overflow-visible">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl paper-elevation-lg overflow-y-auto flex flex-col my-4 sm:my-8 print:static print:w-full print:max-w-none print:max-h-none print:h-auto print:bg-white print:border-none print:shadow-none print:rounded-none print:overflow-visible print:my-0">
        
        {/* Sticky Modal Top Bar - Hidden in Print */}
        <div className="sticky top-0 z-10 bg-[#FFFDF9]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-[#E7DDD4] flex items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2 font-serif text-sm sm:text-lg font-bold text-[#2E2A27] truncate">
            <span className="truncate">Rishitha Mondi | Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2E2A27] hover:bg-[#3D3834] text-white text-xs font-label transition-all min-h-[38px] cursor-pointer shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-[#D88E8E]" />
              <span className="font-semibold hidden sm:inline">Print / Save PDF</span>
              <span className="font-semibold sm:hidden">Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="min-w-[38px] min-h-[38px] p-2 rounded-lg bg-[#F7F1EA] border border-[#E7DDD4] text-[#8A8078] hover:text-[#2E2A27] transition-colors flex items-center justify-center cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="p-4 sm:p-8 lg:p-12 space-y-6 font-sans text-[#2E2A27] print:p-0 print:space-y-5 print:text-black print:bg-white">
          
          {/* Document Header */}
          <div className="text-center space-y-2 border-b border-[#E7DDD4] pb-5 print:pb-4 print:border-gray-300 print-avoid-break">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#2E2A27] print:text-black">
              RISHITHA MONDI
            </h1>
            <p className="font-label text-xs text-[#8A8078] print:text-gray-700 tracking-wider uppercase leading-relaxed">
              {RESUME_DATA.personalInfo.phone} • <a href={`mailto:${RESUME_DATA.personalInfo.email}`} className="hover:underline text-[#2E2A27] print:text-black font-semibold">{RESUME_DATA.personalInfo.email}</a> • {RESUME_DATA.personalInfo.location}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-label text-[#D88E8E] print:text-black pt-1">
              <a href={RESUME_DATA.personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a> • 
              <a href={RESUME_DATA.personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a> • 
              <a href={RESUME_DATA.personalInfo.socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="hover:underline">LeetCode</a> • 
              <a href={RESUME_DATA.personalInfo.socialLinks.codechef} target="_blank" rel="noopener noreferrer" className="hover:underline">CodeChef</a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 print-avoid-break">
            <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-start text-xs sm:text-sm">
              <div>
                <p className="font-bold text-[#2E2A27] print:text-black">{RESUME_DATA.personalInfo.institution}</p>
                <p className="text-xs text-[#8A8078] print:text-gray-700">B.Tech in CSE (Data Science)</p>
              </div>
              <div className="text-right text-xs text-[#8A8078] print:text-gray-700">
                <p>2023 – 2027</p>
                <p className="font-mono font-bold text-[#2E2A27] print:text-black">CGPA: {RESUME_DATA.personalInfo.cgpa}</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1 print-avoid-break">
              Experience
            </h2>
            {RESUME_DATA.experience.map((exp) => (
              <div key={exp.id} className="space-y-1 text-xs print-avoid-break">
                <div className="flex justify-between font-bold text-[#2E2A27] print:text-black text-xs sm:text-sm">
                  <span>{exp.role} | {exp.company}</span>
                  <span className="font-mono text-xs font-normal text-[#8A8078] print:text-gray-700">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#2E2A27]/90 print:text-black leading-relaxed pl-1">
                  {exp.bulletPoints.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1 print-avoid-break">
              Projects
            </h2>
            {RESUME_DATA.projects.map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs print-avoid-break">
                <div className="flex justify-between font-bold text-[#2E2A27] print:text-black text-xs sm:text-sm">
                  <span>{proj.title}</span>
                  <span className="font-mono text-xs font-normal text-[#8A8078] print:text-gray-700">
                    {proj.techStack.slice(0, 5).join(', ')}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#2E2A27]/90 print:text-black leading-relaxed pl-1">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2 print-avoid-break">
            <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {RESUME_DATA.skillCategories.map((cat) => (
                <div key={cat.category}>
                  <span className="font-bold text-[#2E2A27] print:text-black">{cat.category}: </span>
                  <span className="text-[#8A8078] print:text-gray-700">{cat.skills.map(s => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 print-avoid-break">
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#2E2A27] print:text-black">
                {RESUME_DATA.certifications.map((c) => (
                  <li key={c.id}>
                    <span className="font-medium">{c.title}</span> ({c.issuer})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#2E2A27] print:text-black border-b border-[#E7DDD4] print:border-gray-300 pb-1 mb-2">
                Achievements & Activities
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#2E2A27] print:text-black">
                {RESUME_DATA.achievements.map((a) => (
                  <li key={a.id}>
                    <span className="font-medium">{a.title}</span>, {a.organization}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
