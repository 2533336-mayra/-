
import React, { useState, useRef } from 'react';
import { EVOLUTION_DATA, HUMOR_COLORS } from '../constants';
import { EvolutionProgram } from '../types';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

const HumorEvolutionGrid: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const hoverTimer = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, program: EvolutionProgram) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.right + 10, y: rect.top });
    
    hoverTimer.current = window.setTimeout(() => {
      setHoveredId(program.id);
    }, 800); // 稍微缩短一点点1秒的体感，增强反馈
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setHoveredId(null);
  };

  const hoveredProgram = EVOLUTION_DATA.find(p => p.id === hoveredId);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-black text-white mb-4">笑点演变矩阵</h2>
          <p className="text-yellow-400/60 font-medium tracking-widest text-sm uppercase">Evolution of Humor Mechanisms (1983-2024)</p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
          {(Object.entries(HUMOR_COLORS) as [keyof typeof HUMOR_COLORS, string][]).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
              <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {EVOLUTION_DATA.map((program) => (
          <div
            key={program.id}
            className="aspect-[3/4] bg-[#111] border border-white/5 relative cursor-none group transition-all duration-300 hover:scale-105 hover:z-20 hover:border-white/20"
            onMouseEnter={(e) => handleMouseEnter(e, program)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 flex">
              {program.composition.map((comp, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    width: `${comp.ratio * 100}%`,
                    backgroundColor: HUMOR_COLORS[comp.type]
                  }}
                  className="h-full transition-opacity duration-300 group-hover:brightness-125"
                ></div>
              ))}
            </div>
            {/* Year Badge */}
            <div className="absolute bottom-1 right-1 px-1 bg-black/60 text-[8px] font-mono text-white/40 group-hover:text-white transition-colors">
              '{program.year.toString().slice(-2)}
            </div>
          </div>
        ))}
      </div>

      {/* Hover Tooltip/Card */}
      {hoveredId && hoveredProgram && (
        <div 
          className="fixed z-[100] w-64 bg-white text-black rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t-8 border-yellow-500 animate-in fade-in zoom-in-95 duration-300 pointer-events-none"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black text-red-900 leading-tight">《{hoveredProgram.name}》</h3>
              <div className="flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded text-[10px] font-black text-red-700">
                <Calendar size={10} /> {hoveredProgram.year}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">笑点构成分析</span>
                <div className="flex h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  {hoveredProgram.composition.map((comp, i) => (
                    <div 
                      key={i} 
                      style={{ width: `${comp.ratio * 100}%`, backgroundColor: HUMOR_COLORS[comp.type] }}
                      className="h-full"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {hoveredProgram.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                    <Tag size={8} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
               <div className="text-[8px] font-mono text-gray-400 uppercase tracking-tighter italic">Source: CMG Archives</div>
               <ChevronRight size={14} className="text-yellow-600" />
            </div>
          </div>
        </div>
      )}

      {/* Info Panel Below */}
      <div className="mt-20 p-8 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md">
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-1 bg-yellow-500"></div>
            <span className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">演变洞察</span>
         </div>
         <p className="text-lg text-white/80 leading-relaxed font-cursive">
           从早期的“肢体夸张”逐渐向“语言重构”与“社会吐槽”演变。
           色块的密集度反映了幽默机制的复合化——现代包袱往往是多种机制叠加的产物。
         </p>
      </div>
    </div>
  );
};

export default HumorEvolutionGrid;
