import React from 'react';
import { Film } from 'lucide-react';

interface FilmStripProps {
  title?: string;
  className?: string;
}

export const FilmStrip: React.FC<FilmStripProps> = ({ title, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* 3-frame film strip */}
      <div className="flex bg-[#000000] border border-[#002200] rounded-lg p-1.5 shadow-[0_0_12px_rgba(51,255,102,0.1)]">
        {[1, 2, 3].map((frame) => (
          <div key={frame} className="flex flex-col items-center">
            {/* Top sprocket hole */}
            <div className="w-1.5 h-1 bg-[#141414] rounded-[1px] mb-1" />
            
            {/* Frame Window */}
            <div className="w-9 h-7 bg-[#0f1f0f] border border-[#003300] rounded-[2px] mx-1 flex items-center justify-center text-accent/60 group-hover:text-primary transition-colors">
              <Film className="w-3.5 h-3.5" />
            </div>

            {/* Bottom sprocket hole */}
            <div className="w-1.5 h-1 bg-[#141414] rounded-[1px] mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};
