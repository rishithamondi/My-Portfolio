import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { GraduationCap, MapPin, Target, Award, Sparkles, Bookmark, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { name, bio, institution, cgpa, location, currentFocus } = RESUME_DATA.personalInfo;

  return (
    <div className="space-y-8">
      {/* Opened Notebook Spread (Left & Right Pages) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT PAGE: Introduction, Education, Location, Current Focus */}
        <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-6 relative">
          
          <div className="flex items-center gap-2 text-xs font-label text-[#D88E8E] font-medium uppercase tracking-widest border-b border-[#E7DDD4] pb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Personal Background & Education</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-semibold text-[#2E2A27]">
              Hello, I'm {name}.
            </h3>
            <p className="font-sans text-sm text-[#2E2A27]/90 leading-relaxed">
              {bio}
            </p>
          </div>

          {/* Education Block */}
          <div className="p-4 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] space-y-2">
            <div className="flex items-center justify-between text-xs font-label">
              <span className="flex items-center gap-1.5 font-semibold text-[#2E2A27]">
                <GraduationCap className="w-4 h-4 text-[#D88E8E]" />
                Education
              </span>
              <span className="font-mono bg-[#FFFDF9] px-2 py-0.5 rounded text-[#2E2A27] font-medium border border-[#E7DDD4]">
                CGPA: {cgpa}
              </span>
            </div>
            <p className="font-sans text-sm font-medium text-[#2E2A27]">
              B.Tech in Computer Science & Engineering (Data Science)
            </p>
            <p className="font-sans text-xs text-[#8A8078]">
              {institution} • Visakhapatnam (2023 – 2027)
            </p>
          </div>

          {/* Location & Current Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#F7F1EA] border border-[#E7DDD4] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-label text-[#8A8078]">
                <MapPin className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Base Location</span>
              </div>
              <p className="font-sans text-xs font-medium text-[#2E2A27]">
                {location}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#F7F1EA] border border-[#E7DDD4] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-label text-[#8A8078]">
                <Target className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Scholarship</span>
              </div>
              <p className="font-sans text-xs font-medium text-[#2E2A27]">
                Reliance Foundation Scholar
              </p>
            </div>
          </div>

          {/* Current Focus Note */}
          <div className="p-4 rounded-xl bg-[#FFFDF9] border-l-4 border-l-[#D88E8E] border border-[#E7DDD4] space-y-1">
            <p className="font-label text-xs uppercase tracking-wider text-[#8A8078]">
              Current Technical Focus
            </p>
            <p className="font-sans text-xs text-[#2E2A27] leading-relaxed">
              {currentFocus}
            </p>
          </div>
        </div>

        {/* RIGHT PAGE: Profile Canvas Frame, Sticky Note, Handwritten Note */}
        <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-6 relative">
          
          <div className="flex items-center gap-2 text-xs font-label text-[#D88E8E] font-medium uppercase tracking-widest border-b border-[#E7DDD4] pb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Highlights & Focus</span>
          </div>

          {/* Profile Canvas / Illustration Frame */}
          <div className="p-4 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] flex flex-col items-center text-center space-y-3 relative overflow-hidden group">
            {/* Pencil sketch border frame */}
            <div className="w-28 h-28 rounded-full bg-[#FFFDF9] border-2 border-dashed border-[#D88E8E]/60 flex items-center justify-center p-1.5 shadow-xs overflow-hidden relative group/avatar">
              <img
                src="/profile.jpeg"
                alt="Rishitha Mondi"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover scale-125 shadow-xs group-hover/avatar:scale-130 transition-transform duration-300"
                style={{ objectPosition: 'center 12%' }}
                onError={(e) => {
                  // Fallback to stylized initials if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="avatar-fallback hidden w-full h-full rounded-full bg-gradient-to-br from-[#D88E8E]/20 to-[#E7DDD4] items-center justify-center text-2xl font-serif font-bold text-[#2E2A27]">
                RM
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold text-[#2E2A27]">
                Rishitha Mondi
              </h4>
              <p className="font-sans text-xs text-[#8A8078]">
                AI & Full-Stack Systems Specialist
              </p>
            </div>
          </div>

          {/* Sticky Note Component */}
          <div className="p-4 rounded-xl bg-[#FEF9C3] border border-[#FDE047] shadow-sm transform rotate-1 hover:rotate-0 transition-transform relative">
            <div className="w-4 h-4 bg-[#EAB308]/30 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-xs" />
            <p className="font-handwriting text-xl text-[#713F12] leading-snug">
              "Building conversational AI is not just about LLMs; it requires low STT/TTS latency, WebSocket stability, and clear microservice boundaries."
            </p>
          </div>

          {/* Small Handwritten Note & Icons */}
          <div className="p-4 rounded-xl bg-[#F7F1EA] border border-[#E7DDD4] space-y-3">
            <p className="font-label text-xs uppercase tracking-wider text-[#8A8078] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D88E8E]" />
              Core Competencies
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#2E2A27]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Multilingual Voice AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Real-Time WebSockets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Relational Eager Loading</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D88E8E]" />
                <span>Cryptographic QR Passes</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
