
import React, { useState, useMemo } from 'react';
import { EVOLUTION_DATA, HUMOR_COLORS } from '../constants';
import { EvolutionProgram, HumorType } from '../types';
import { Info, MousePointer2, ListFilter, TrendingUp } from 'lucide-react';

const HumorEvolutionGrid: React.FC = () => {
  const [selectedType, setSelectedType] = useState<HumorType | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<EvolutionProgram | null>(null);

  // Calculate occurrences for the sidebar
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    EVOLUTION_DATA.forEach(prog => {
      prog.composition.forEach(comp => {
        counts[comp.type] = (counts[comp.type] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const handleToggleFilter = (type: HumorType) => {
    setSelectedType(prev => prev === type ? null : type);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 bg-[#0a0a0a] p-8 rounded-[3rem] border border-white/5 min-h-[800px]">
      {/* Left: High-Density Matrix Area */}
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500 rounded-lg"><TrendingUp size={20} className="text-red-950" /></div>
              <h3 className="text-2xl font-black text-white tracking-tighter">历年节目笑点构成矩阵</h3>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
              <MousePointer2 size={12} /> Hover for details · Click sidebar to filter
           </div>
        </div>

        {/* The Grid Matrix */}
        <div className="grid grid-cols-12 md:grid-cols-20 lg:grid-cols-24 gap-1.5 auto-rows-[40px]">
          {EVOLUTION_DATA.map((prog) => {
            const isHighlighted = !selectedType || prog.composition.some(c => c.type === selectedType);
            
            return (
              <div 
                key={prog.id}
                onMouseEnter={() => setHoveredProgram(prog)}
                onMouseLeave={() => setHoveredProgram(null)}
                className={`relative group cursor-none transition-all duration-500 rounded-sm overflow-hidden border border-white/5 ${isHighlighted ? 'opacity-100 scale-100' : 'opacity-10 scale-[0.85] grayscale'}`}
              >
                {/* Segments representing humor composition */}
                <div className="flex h-full w-full">
                  {prog.composition.map((comp, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        width: `${comp.ratio * 100}%`,
                        backgroundColor: HUMOR_COLORS[comp.type]
                      }}
                      className="h-full relative"
                    >
                      {/* Highlight internal segment if selected */}
                      {selectedType === comp.type && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Interactive Sidebar (Subjects) */}
      <div className="w-full lg:w-80 flex flex-col gap-8">
        <div className="space-y-6 sticky top-8">
          <div className="flex items-center gap-3 text-white/40 uppercase tracking-[0.4em] text-[10px] font-black mb-2">
            <ListFilter size={14} /> Subjects / 分类追踪
          </div>

          <div className="space-y-3">
            {stats.map(([type, count]) => (
              <button
                key={type}
                onClick={() => handleToggleFilter(type as HumorType)}
                className={`w-full group relative flex flex-col transition-all duration-300 rounded-xl p-4 border text-left ${selectedType === type ? 'bg-white/5 border-white/20 shadow-xl' : 'bg-transparent border-transparent hover:bg-white/5'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-black transition-colors ${selectedType === type ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {type}
                  </span>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">Occurrences</span>
                </div>
                
                <div className="flex items-baseline justify-between gap-4">
                   <div 
                      className="h-2 rounded-full flex-1 overflow-hidden bg-white/5"
                   >
                     <div 
                        className="h-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(count / EVOLUTION_DATA.length) * 100}%`,
                          backgroundColor: HUMOR_COLORS[type as HumorType] 
                        }}
                     ></div>
                   </div>
                   <span className="text-xl font-black text-white leading-none">
                     {count.toLocaleString()}
                   </span>
                </div>

                {/* Left Indicator bar */}
                <div 
                  className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-full transition-all duration-300 ${selectedType === type ? 'scale-y-100' : 'scale-y-0 opacity-0'}`}
                  style={{ backgroundColor: HUMOR_COLORS[type as HumorType] }}
                ></div>
              </button>
            ))}
          </div>

          {/* Details Card (Shows when hovered on matrix) */}
          <div className={`mt-12 transition-all duration-500 ${hoveredProgram ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Selected Node</span>
                   <span className="text-xs font-mono text-white/40">{hoveredProgram?.year} Archive</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4 leading-tight">{hoveredProgram?.name}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                   {hoveredProgram?.tags.map(tag => (
                     <span key={tag} className="px-2 py-0.5 bg-white/10 text-[9px] font-black text-white/60 rounded uppercase tracking-tighter">{tag}</span>
                   ))}
                </div>
                <div className="space-y-3">
                   {hoveredProgram?.composition.map((comp, idx) => (
                     <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: HUMOR_COLORS[comp.type] }}></div>
                        <span className="text-[10px] font-bold text-white/60 flex-1">{comp.type}</span>
                        <span className="text-[10px] font-mono text-white/40">{(comp.ratio * 100).toFixed(0)}%</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .grid-cols-20 { grid-template-columns: repeat(20, minmax(0, 1fr)); }
        .grid-cols-24 { grid-template-columns: repeat(24, minmax(0, 1fr)); }
      `}</style>
    </div>
  );
};

export default HumorEvolutionGrid;
