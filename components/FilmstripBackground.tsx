
import React from 'react';

const CHUNWAN_IMAGES = [
  'https://images.unsplash.com/photo-1543080133-f9a86a695d7f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop',
];

interface WindingStripProps {
  top: string;
  rotation: number;
  direction: 'left' | 'right';
  speed: string;
  opacity: number;
}

const WindingStrip: React.FC<WindingStripProps> = ({ top, rotation, direction, speed, opacity }) => (
  <div 
    className="absolute left-[-20%] w-[140%] h-32 select-none"
    style={{ 
      top, 
      transform: `rotate(${rotation}deg)`,
      opacity,
      animation: 'drift 35s ease-in-out infinite alternate'
    }}
  >
    <div 
      className={`flex bg-[#000]/95 py-1.5 border-y-[5px] border-[#111] shadow-2xl transition-all duration-500 hover:bg-black group/strip ${direction === 'right' ? 'animate-[scroll-film_linear_infinite]' : 'animate-[scroll-film_linear_infinite_reverse]'}`}
      style={{ animationDuration: speed }}
    >
      {[...Array(15)].map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-1.5 py-4">
          {/* Frame with Hover Pop-out Effect */}
          <div className="relative group/frame">
            <div className="relative w-44 h-28 bg-[#050505] border-x border-white/20 mx-1 flex items-center justify-center overflow-hidden transition-all duration-500 ease-out hover:scale-150 hover:z-[100] hover:rotate-0 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-yellow-500/60 cursor-none">
              {i % 4 === 0 ? (
                <div className="text-4xl font-mono font-black text-yellow-500/80 flex items-center justify-center border-4 border-yellow-500/30 rounded-full w-16 h-16 transition-transform group-hover/frame:scale-110">
                  {Math.floor(Math.random() * 8) + 1}
                </div>
              ) : (
                <img 
                  src={CHUNWAN_IMAGES[i % CHUNWAN_IMAGES.length]} 
                  className="w-full h-full object-cover brightness-100 contrast-110 sepia-[0.1] transition-all duration-500 group-hover/frame:brightness-125 group-hover/frame:sepia-0 group-hover/frame:scale-110"
                  alt="Memory"
                />
              )}
              
              {/* Sprocket Holes */}
              <div className="absolute top-1 left-0 right-0 flex justify-around px-1 z-10">
                {[...Array(8)].map((_, idx) => <div key={idx} className="w-1.5 h-2.5 bg-black/80 rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>
              <div className="absolute bottom-1 left-0 right-0 flex justify-around px-1 z-10">
                {[...Array(8)].map((_, idx) => <div key={idx} className="w-1.5 h-2.5 bg-black/80 rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>

              {/* Subtle gloss reflection - fades on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover/frame:opacity-0"></div>
              
              {/* Extra light mask only visible on hover */}
              <div className="absolute inset-0 bg-yellow-500/0 group-hover/frame:bg-yellow-500/5 transition-colors pointer-events-none"></div>
            </div>
          </div>
          
          {/* Frame Bar */}
          <div className="w-2.5 h-full flex flex-col justify-around py-2 opacity-50">
            <div className="w-1 h-1 bg-yellow-600 rounded-full mx-auto"></div>
            <div className="w-1 h-1 bg-yellow-600 rounded-full mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FilmstripBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 
          A clean, flat, full-screen red mask. 
          z-20 is above the strips, so we make it pointer-events-none to click/hover through.
      */}
      <div className="absolute inset-0 bg-red-600/10 pointer-events-none z-20"></div>
      
      {/* Film Layers - Uniform opacity for full screen consistency */}
      <WindingStrip top="10%" rotation={-6} direction="right" speed="65s" opacity={0.85} />
      <WindingStrip top="40%" rotation={3} direction="left" speed="85s" opacity={0.85} />
      <WindingStrip top="70%" rotation={-2} direction="right" speed="55s" opacity={0.85} />
    </div>
  );
};

export default FilmstripBackground;
