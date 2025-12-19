
import React from 'react';
import { FILMSTRIP_IMAGES } from '../constants';

const FilmstripBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {[...FILMSTRIP_IMAGES, ...FILMSTRIP_IMAGES].map((src, i) => (
          <div key={i} className="inline-block px-4 py-8">
            <div className="relative group overflow-hidden border-x-8 border-black shadow-2xl">
              <img 
                src={src} 
                alt="Classic Chunwan Moment" 
                className="w-[500px] h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4">
                <div className="flex gap-2">
                    {[1,2,3,4].map(n => <div key={n} className="w-6 h-8 bg-black/50 border border-white/20 rounded"></div>)}
                </div>
                <div className="flex justify-end gap-2">
                    {[1,2,3,4].map(n => <div key={n} className="w-6 h-8 bg-black/50 border border-white/20 rounded"></div>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default FilmstripBackground;
