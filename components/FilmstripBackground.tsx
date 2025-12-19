
import React from 'react';

// Sepia/Warm filter style program images
const CHUNWAN_IMAGES = [
  'https://images.unsplash.com/photo-1543080133-f9a86a695d7f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop',
];

interface WindingFilmStripProps {
  delay: string;
  top: string;
  rotation: number;
  direction: 'left' | 'right';
  opacity?: number;
  scale?: number;
}

const WindingFilmStrip: React.FC<WindingFilmStripProps> = ({ delay, top, rotation, direction, opacity = 0.5, scale = 1 }) => (
  <div 
    className="absolute left-[-20%] w-[140%] h-40 pointer-events-none select-none"
    style={{ 
      top, 
      transform: `rotate(${rotation}deg) scale(${scale})`,
      opacity,
      animation: `drift 25s ease-in-out infinite alternate`,
      animationDelay: delay
    }}
  >
    {/* The Film Ribbon */}
    <div 
      className={`flex bg-[#2c1a0c] py-2 border-y-[6px] border-[#1a0f07] shadow-[0_15px_40px_rgba(0,0,0,0.6)] ${direction === 'right' ? 'animate-[scroll-film_80s_linear_infinite]' : 'animate-[scroll-film_80s_linear_infinite_reverse]'}`}
    >
      {[...Array(20)].map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-1">
          {/* Frame Container */}
          <div className="relative w-48 h-32 bg-black/40 border-x border-white/5 mx-1 flex flex-col justify-center items-center overflow-hidden">
             {/* Countdown Numbers or Images - Styled to look like old film countdown */}
             {i % 4 === 0 ? (
               <div className="flex items-center justify-center w-full h-full border-[10px] border-[#d4af37]/5 rounded-full">
                 <div className="text-6xl font-black text-[#d4af37]/30 font-mono tracking-tighter">
                   {Math.floor(Math.random() * 8) + 1}
                 </div>
               </div>
             ) : (
               <img 
                 src={CHUNWAN_IMAGES[i % CHUNWAN_IMAGES.length]} 
                 className="w-full h-full object-cover sepia-[0.9] brightness-[0.5] contrast-125"
                 alt="Memory"
               />
             )}
             
             {/* Top/Bottom Perforations */}
             <div className="absolute top-1 left-0 right-0 flex justify-around opacity-40">
                {[...Array(6)].map((_, idx) => <div key={idx} className="w-2.5 h-3.5 bg-[#1a0f07] rounded-sm border border-white/5 shadow-inner"></div>)}
             </div>
             <div className="absolute bottom-1 left-0 right-0 flex justify-around opacity-40">
                {[...Array(6)].map((_, idx) => <div key={idx} className="w-2.5 h-3.5 bg-[#1a0f07] rounded-sm border border-white/5 shadow-inner"></div>)}
             </div>
             
             {/* Dust/Scratch Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
          </div>
          {/* Frame Separator */}
          <div className="w-4 h-full flex flex-col justify-between py-1 opacity-20">
             <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mx-auto"></div>
             <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FilmstripBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#500000]">
      {/* Deep textured background with a subtle paper/film grain */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* Film Reel Hub Visualization in corner (Top-Left area) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#1a0f07] border-[20px] border-[#331d0d] shadow-2xl opacity-40 flex items-center justify-center">
         <div className="w-40 h-40 border-8 border-[#4d2c14] rounded-full opacity-50"></div>
         {[...Array(5)].map((_, i) => (
           <div key={i} className="absolute w-2 h-full bg-[#331d0d]" style={{ transform: `rotate(${i * 36}deg)` }}></div>
         ))}
      </div>

      {/* Winding Layers - overlapping more naturally like the reference */}
      <WindingFilmStrip top="5%" rotation={-15} direction="right" delay="0s" opacity={0.25} scale={1.2} />
      <WindingFilmStrip top="25%" rotation={5} direction="left" delay="-4s" opacity={0.4} scale={1} />
      <WindingFilmStrip top="55%" rotation={-8} direction="right" delay="-10s" opacity={0.35} scale={1.1} />
      <WindingFilmStrip top="80%" rotation={12} direction="left" delay="-2s" opacity={0.2} scale={0.9} />

      {/* Vignette and Atmospheric Lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a0000]/40 via-transparent to-[#4a0000]/40"></div>
      
      {/* Soft Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-yellow-500/5 blur-[120px] rounded-full"></div>
    </div>
  );
};

export default FilmstripBackground;
