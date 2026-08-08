import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { Code2, Layout, Server, Cpu, Database, Wrench } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Programming & Query Languages':
        return <Code2 className="w-4 h-4 text-[#D88E8E]" />;
      case 'Frontend Development':
        return <Layout className="w-4 h-4 text-[#D88E8E]" />;
      case 'Backend Development':
        return <Server className="w-4 h-4 text-[#D88E8E]" />;
      case 'AI / ML & Voice Tech':
        return <Cpu className="w-4 h-4 text-[#D88E8E]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#D88E8E]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#D88E8E]" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Notebook Matrix / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESUME_DATA.skillCategories.map((cat) => (
          <div
            key={cat.category}
            className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E7DDD4] paper-elevation-sm space-y-4 hover:border-[#D88E8E]/50 transition-colors"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-[#E7DDD4] pb-3">
              <div className="flex items-center gap-2">
                {getIconForCategory(cat.category)}
                <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
                  {cat.category}
                </h3>
              </div>
            </div>

            {/* Chips Container */}
            <div className="flex flex-wrap gap-2 pt-1">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F1EA] hover:bg-[#FFFDF9] border border-[#E7DDD4] hover:border-[#D88E8E] transition-all shadow-2xs group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D88E8E] group-hover:scale-125 transition-transform" />
                  <span className="font-sans text-xs font-medium text-[#2E2A27]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
