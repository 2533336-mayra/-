
import React, { useEffect, useState } from 'react';

const CursorMagnifier: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-20%, -20%) scale(${active ? 1.1 : 1}) rotate(-10deg)`
      }}
    >
      <div className="relative">
        {/* Compact Lens and Silver Rim - roughly 40px diameter (standard cursor-ish size) */}
        <div className="w-10 h-10 rounded-full border-[3px] border-[#d1d1d1] bg-white/10 backdrop-blur-[1px] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(255,255,255,0.2)] flex items-center justify-center relative overflow-hidden">
          {/* Glass Glint Effect */}
          <div className="absolute top-1 left-2 w-5 h-2.5 bg-white/20 rounded-[100%] rotate-[-25deg]"></div>
          
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
        </div>

        {/* The Metal Neck Piece - Scaled down */}
        <div className="absolute top-[34px] left-[32px] w-2 h-3 bg-gradient-to-r from-[#888] via-[#eee] to-[#888] rounded-sm transform rotate-[-45deg] z-10 border border-black/10"></div>

        {/* The Black Handle - Scaled down */}
        <div className="absolute top-[39px] left-[37px] w-2.5 h-12 bg-gradient-to-r from-[#111] via-[#333] to-[#111] rounded-full transform rotate-[-45deg] shadow-lg border-x border-white/5">
          {/* Handle highlights */}
          <div className="absolute inset-y-0 left-0.5 w-0.5 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CursorMagnifier;
