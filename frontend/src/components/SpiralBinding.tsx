import React from 'react';

interface SpiralBindingProps {
  orientation?: 'horizontal' | 'vertical';
  count?: number;
}

export const SpiralBinding: React.FC<SpiralBindingProps> = ({
  orientation = 'horizontal',
  count = 16,
}) => {
  const rings = Array.from({ length: count });

  if (orientation === 'horizontal') {
    return (
      <div className="w-full flex justify-between items-center px-3 sm:px-6 py-2 bg-[#F0E8DF]/60 border-b border-[#E7DDD4] select-none relative z-20 overflow-hidden">
        {rings.map((_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center group relative ${
              i >= 10 ? 'hidden sm:flex' : 'flex'
            }`}
          >
            {/* Paper Hole Punch (Top) */}
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E3D7CB] shadow-inner border border-[#D0C2B4]" />
            
            {/* Metal Ring Loop */}
            <div className="-my-1 sm:-my-1.5 w-1.5 sm:w-2 h-5 sm:h-6 bg-gradient-to-r from-[#A89F91] via-[#D5CDC2] to-[#8E8578] rounded-full shadow-md transform -rotate-6 border border-[#7D7468]/30 group-hover:scale-105 transition-transform" />
            
            {/* Paper Hole Punch (Bottom) */}
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E3D7CB] shadow-inner border border-[#D0C2B4]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between items-center py-6 px-2 bg-[#F0E8DF]/60 border-r border-[#E7DDD4] select-none relative z-20">
      {rings.map((_, i) => (
        <div key={i} className="flex items-center group relative">
          {/* Paper Hole Punch (Left) */}
          <div className="w-3 h-3 rounded-full bg-[#E3D7CB] shadow-inner border border-[#D0C2B4]" />
          
          {/* Metal Ring Loop */}
          <div className="-mx-1.5 h-2 w-6 bg-gradient-to-b from-[#A89F91] via-[#D5CDC2] to-[#8E8578] rounded-full shadow-md transform -rotate-6 border border-[#7D7468]/30 group-hover:scale-105 transition-transform" />
          
          {/* Paper Hole Punch (Right) */}
          <div className="w-3 h-3 rounded-full bg-[#E3D7CB] shadow-inner border border-[#D0C2B4]" />
        </div>
      ))}
    </div>
  );
};
