
import React, { useState, useRef } from 'react';
import { EVOLUTION_DATA, HUMOR_COLORS } from '../constants';
import { EvolutionProgram } from '../types';
import { Calendar, Tag, ChevronRight, Info } from 'lucide-react';

const HumorEvolutionGrid: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const hoverTimer = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, program: EvolutionProgram) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // 动态调整 tooltip 位置，防止超出右侧屏幕
    const isRightSide = rect.left > window.innerWidth / 2;
    setTooltipPos({ 
      x: isRightSide ? rect.left - 270 : rect.right + 10, 
      y: Math.min(rect.top, window.innerHeight - 300) 
    });
    
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setHoveredId(program.id);
    }, 50); // 极速响应，适合密集矩阵
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredId(null);
  };

  const hoveredProgram = EVOLUTION_DATA.find(p => p.id === hoveredId);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-20 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
            <Info size={12} className="text-yellow-500" />
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">全量节目追踪数据库</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter">笑点演变矩阵<span className="text-yellow-500 ml-4 font-mono text-2xl">[{EVOLUTION_DATA.length}]</span></h2>
          <p className="text-yellow-400/60 font-medium tracking-widest text-sm uppercase">Mapping Humor DNA across 40 Years of Spring Festival Gala</p>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
          {(Object.entries(HUMOR_COLORS) as [keyof typeof HUMOR_COLORS, string][]).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-[9px] font-black text-white/40 tracking-wider uppercase whitespace-nowrap">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 密集矩阵容器 */}
      <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-20 lg:grid-cols-24 xl:grid-cols-32 gap-[2px] bg-white/5 p-4 rounded-3xl border border-white/5">
        {EVOLUTION_DATA.map((program) => (
          <div
            key={program.id}
            className="aspect-square bg-[#111] relative cursor-none transition-all duration-200 hover:scale-125 hover:z-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            onMouseEnter={(e) => handleMouseEnter(e, program)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 flex flex-col">
              {program.composition.map((comp, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    height: `${comp.ratio * 100}%`,
                    backgroundColor: HUMOR_COLORS[comp.type]
                  }}
                  className="w-full opacity-60 group-hover:opacity-100 transition-opacity"
                ></div>
              ))}
            </div>
            {/* 年份标记 (仅在每行开始或重要节点显示，避免视觉混乱) */}
            {program.year % 5 === 0 && program.id.endsWith('0') && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                 <span className="text-[6px] font-black text-white">{program.year}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hover Tooltip/Card */}
      {hoveredId && hoveredProgram && (
        <div 
          className="fixed z-[100] w-64 bg-white text-black rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t-8 border-yellow-500 animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
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
                <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
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
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-16 flex flex-col md:flex-row gap-12 items-center">
         <div className="flex-1 p-8 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md">
            <p className="text-lg text-white/80 leading-relaxed font-cursive">
              矩阵中的每一个像素都代表着一次欢笑的重构。从1983年的纯粹肢体表演，到2024年的多元化解构，
              色块的流动揭示了中国式幽默的进化：更复杂、更讽刺、也更贴近生活。
            </p>
         </div>
         <div className="flex flex-col items-center gap-2">
            <div className="text-4xl font-black text-yellow-500">40+</div>
            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">Years Tracking</div>
         </div>
      </div>
    </div>
  );
};

export default HumorEvolutionGrid;
