import React from 'react';
import { motion } from 'motion/react';
import { RESUME_DATA } from '../data/resumeData';
import { SunflowerLogo } from './SunflowerLogo';
import { ArrowRight, FileText, Sparkles, BookOpen, MapPin } from 'lucide-react';

interface CoverPageProps {
  onNavigateProjects: () => void;
  onOpenResume: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onNavigateProjects,
  onOpenResume,
}) => {
  const { name, title, subTitle, cgpa, location, bio, shortQuote } = RESUME_DATA.personalInfo;

  return (
    <div className="space-y-10 py-4">
      {/* Notebook Cover Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title & Personal Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Notebook Title Stamp */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F7F1EA] border border-[#E7DDD4] font-label text-xs text-[#8A8078]">
            <Sparkles className="w-3.5 h-3.5 text-[#D88E8E]" />
            <span>ACADEMIC PERFORMANCE</span>
            <span className="text-[#E7DDD4]">•</span>
            <span className="font-mono text-[#2E2A27]">CGPA {cgpa}</span>
          </div>

          {/* Name & Role */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-[#2E2A27] tracking-tight leading-[1.08]">
              {name}
            </h1>
            <p className="font-label text-base sm:text-xl text-[#D88E8E] font-medium tracking-wide">
              {title}
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#8A8078] flex items-center gap-2 flex-wrap">
              <MapPin className="w-4 h-4 text-[#D88E8E] shrink-0" />
              <span>{subTitle} • {location}</span>
            </p>
          </div>

          {/* Short Bio */}
          <p className="font-sans text-sm sm:text-base text-[#2E2A27]/90 leading-relaxed max-w-xl">
            {bio}
          </p>

          {/* Tiny Handwritten Quote */}
          <div className="p-4 rounded-xl bg-[#F7F1EA]/80 border border-[#E7DDD4] relative shadow-2xs">
            <p className="font-handwriting text-xl sm:text-2xl text-[#2E2A27] leading-snug">
              {shortQuote}
            </p>
            <span className="font-label text-[10px] text-[#8A8078] tracking-widest uppercase block mt-1">
              Personal Entry
            </span>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={onNavigateProjects}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E2A27] hover:bg-[#3D3834] text-[#FFFDF9] min-h-[44px] px-6 py-3 rounded-xl font-label text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#D88E8E]" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenResume}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#F7F1EA] text-[#2E2A27] border border-[#E7DDD4] min-h-[44px] px-6 py-3 rounded-xl font-label text-sm shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#D88E8E]" />
              <span>Read Full Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Sunflower Brand Stamp & Notebook Cover Index Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#F7F1EA] border border-[#E7DDD4] paper-elevation-md relative overflow-hidden text-center space-y-6">
            
            {/* Elegant Sunflower Personal Brand Logo */}
            <div className="w-28 h-28 mx-auto flex items-center justify-center p-3 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] shadow-xs group hover:rotate-6 transition-transform duration-300">
              <SunflowerLogo size={80} className="text-[#D88E8E]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold text-[#2E2A27]">
                Portfolio Index
              </h3>
              <p className="font-sans text-xs text-[#8A8078]">
                Multilingual AI • Full-Stack Systems • Research
              </p>
            </div>

            {/* Quick Metrics Badge List */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs font-label pt-2 border-t border-[#E7DDD4]">
              <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E7DDD4]">
                <p className="text-[10px] text-[#8A8078]">INTERNSHIPS</p>
                <p className="font-semibold text-[#2E2A27]">AI/ML & Web Dev</p>
              </div>
              <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E7DDD4]">
                <p className="text-[10px] text-[#8A8078]">SCHOLARSHIP</p>
                <p className="font-semibold text-[#2E2A27]">Reliance Scholar</p>
              </div>
            </div>

            {/* Signature Stamp */}
            <div className="pt-2 font-handwriting text-xl text-[#2E2A27]/80">
              Rishitha Mondi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
