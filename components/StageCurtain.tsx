
import React, { useEffect, useState } from 'react';

interface StageCurtainProps {
  onOpened: () => void;
}

const StageCurtain: React.FC<StageCurtainProps> = ({ onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500);
    const finishTimer = setTimeout(onOpened, 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onOpened]);

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">
      <div 
        className={`w-1/2 h-full bg-[#8b0000] shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[2000ms] ease-in-out origin-left flex items-center justify-end overflow-hidden ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
        style={{ backgroundImage: 'linear-gradient(90deg, #8b0000 0%, #b22222 50%, #8b0000 100%)', backgroundSize: '100px 100%' }}
      >
          <div className="h-full w-4 flex flex-col justify-around">
            {[...Array(20)].map((_, i) => <div key={i} className="w-full h-8 border-r-2 border-yellow-600/30"></div>)}
          </div>
      </div>
      <div 
        className={`w-1/2 h-full bg-[#8b0000] shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[2000ms] ease-in-out origin-right flex items-center justify-start overflow-hidden ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{ backgroundImage: 'linear-gradient(90deg, #8b0000 0%, #b22222 50%, #8b0000 100%)', backgroundSize: '100px 100%' }}
      >
          <div className="h-full w-4 flex flex-col justify-around">
            {[...Array(20)].map((_, i) => <div key={i} className="w-full h-8 border-l-2 border-yellow-600/30"></div>)}
          </div>
      </div>
    </div>
  );
};

export default StageCurtain;
