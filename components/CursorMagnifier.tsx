
import React, { useEffect, useState } from 'react';

const CursorMagnifier: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="magnifier-cursor" 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="magnifier-handle"></div>
      <div className="text-[8px] text-white opacity-40 font-bold">FOCUS</div>
    </div>
  );
};

export default CursorMagnifier;
