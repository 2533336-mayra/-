
import React from 'react';

const CHUNWAN_IMAGES = [
  // Zhao Benshan & Song Dandan (Yesterday Today Tomorrow)
  'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?q=80&w=800&auto=format&fit=crop', 
  // Representative for Zhao Lirong / Classic Sketches
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800&auto=format&fit=crop',
  // Representative for 2025 Modern Stage (Bright Red/Gold)
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop',
  // Representative for Liu Qian / Magic
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop',
  // Fan Wei / Zhao Benshan (Selling Carts)
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
  // Shen Teng / Ma Li (Modern Skits)
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
];

// Note: In a real environment, we'd use the exact local file paths for your screenshots.
// Here we use high-quality themed placeholders that match the vibe of your provided images.

interface WindingStripProps {
  top: string;
  rotation: number;
  direction: 'left' | 'right';
  speed: string;
  opacity: number;
}

const WindingStrip: React.FC<WindingStripProps> = ({ top, rotation, direction, speed, opacity }) => (
  <div 
    className="absolute left-[-20%] w-[140%] h-32 select-none z-10"
    style={{ 
      top, 
      transform: `rotate(${rotation}deg)`,
      opacity,
      animation: 'drift 35s ease-in-out infinite alternate'
    }}
  >
    <div 
      className={`flex bg-[#000]/95 py-1.5 border-y-[5px] border-[#111] shadow-2xl transition-all duration-700 hover:bg-black group/strip ${direction === 'right' ? 'animate-[scroll-film_linear_infinite]' : 'animate-[scroll-film_linear_infinite_reverse]'}`}
      style={{ animationDuration: speed }}
    >
      {[...Array(20)].map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-1.5 py-4">
          {/* Individual Frame with Interactive Pop-out */}
          <div className="relative group/frame">
            <div 
              className="relative w-48 h-32 bg-[#0a0a0a] border-x border-white/10 mx-2 flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-150 hover:z-[100] hover:rotate-0 hover:shadow-[0_25px_60px_rgba(0,0,0,1)] hover:border-yellow-500/80 cursor-none"
              style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 1}deg)` }}
            >
              {i % 5 === 0 ? (
                <div className="text-4xl font-mono font-black text-yellow-500/40 flex items-center justify-center border-4 border-yellow-500/10 rounded-full w-20 h-20 transition-all group-hover/frame:text-yellow-400 group-hover/frame:border-yellow-400 group-hover/frame:scale-110">
                  {1983 + (i % 40)}
                </div>
              ) : (
                <img 
                  src={CHUNWAN_IMAGES[i % CHUNWAN_IMAGES.length]} 
                  className="w-full h-full object-cover brightness-75 contrast-125 sepia-[0.3] grayscale-[0.2] transition-all duration-500 group-hover/frame:brightness-110 group-hover/frame:sepia-0 group-hover/frame:grayscale-0 group-hover/frame:scale-110"
                  alt={`Chunwan Moment ${i}`}
                />
              )}
              
              {/* Sprocket Holes (Film Detail) */}
              <div className="absolute top-1.5 left-0 right-0 flex justify-around px-2 z-10 opacity-60">
                {[...Array(10)].map((_, idx) => <div key={idx} className="w-1.5 h-3 bg-black/90 rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>
              <div className="absolute bottom-1.5 left-0 right-0 flex justify-around px-2 z-10 opacity-60">
                {[...Array(10)].map((_, idx) => <div key={idx} className="w-1.5 h-3 bg-black/90 rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>

              {/* Surface Gloss */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover/frame:opacity-0"></div>
              
              {/* Highlight Overlay */}
              <div className="absolute inset-0 bg-yellow-500/0 group-hover/frame:bg-yellow-500/5 transition-colors pointer-events-none"></div>
            </div>
            
            {/* Year Label (only on hover) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/frame:opacity-100 transition-all duration-300 translate-y-4 z-[110]">
               <span className="bg-yellow-500 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-sm whitespace-nowrap shadow-xl uppercase tracking-tighter">
                 Memory Captured
               </span>
            </div>
          </div>
          
          {/* Film Connector */}
          <div className="w-3 h-full flex flex-col justify-around py-4 opacity-20">
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
    <div className="absolute inset-0 overflow-hidden bg-[#800]">
      {/* 
          Main Festive Tint Layer 
          Lower opacity (0.1) allows the "captured moments" to pop through clearly on hover
      */}
      <div className="absolute inset-0 bg-red-600/10 pointer-events-none z-20"></div>
      
      {/* Decorative Gradient Mask to draw focus to center initially */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#900]/40 pointer-events-none z-15"></div>

      {/* Multiple Film Strips spanning the screen */}
      <WindingStrip top="5%" rotation={-4} direction="right" speed="80s" opacity={0.9} />
      <WindingStrip top="30%" rotation={2} direction="left" speed="110s" opacity={0.9} />
      <WindingStrip top="55%" rotation={-1} direction="right" speed="70s" opacity={0.9} />
      <WindingStrip top="80%" rotation={3} direction="left" speed="95s" opacity={0.9} />
    </div>
  );
};

export default FilmstripBackground;
