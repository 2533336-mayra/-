
import React, { useState, useMemo } from 'react';
import { EVOLUTION_DATA, HUMOR_COLORS } from '../constants';
import { EvolutionProgram, HumorType } from '../types';
import { MousePointer2, ListFilter, TrendingUp, Sparkles } from 'lucide-react';

const HumorEvolutionGrid: React.FC = () => {
  // 只展示有 composition 数据的节目
  const [data] = useState<EvolutionProgram[]>(
    EVOLUTION_DATA.filter(p => p.composition && p.composition.length > 0)
  );
  const [selectedType, setSelectedType] = useState<HumorType | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<EvolutionProgram | null>(null);

  // Calculate occurrences for the sidebar
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(prog => {
      prog.composition.forEach(comp => {
        counts[comp.type] = (counts[comp.type] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const handleToggleFilter = (type: HumorType) => {
    setSelectedType(prev => prev === type ? null : type);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 bg-[#0a0a0a] p-8 rounded-[3rem] border border-white/5 min-h-[800px] shadow-2xl">
      {/* Left: High-Density Matrix Area */}
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)]"><TrendingUp size={20} className="text-white" /></div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tighter">历年节目笑点构成矩阵 (26xN)</h3>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Total Tracked: {data.length} items</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                  <MousePointer2 size={12} className="text-red-500" /> Hover for details
              </div>
           </div>
        </div>

        {/* The Grid Matrix - Now 26 columns */}
        <div className="grid grid-cols-26 gap-1 auto-rows-[42px] max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {data.map((prog) => {
            const isHighlighted = !selectedType || prog.composition.some(c => c.type === selectedType);
            
            return (
              <div 
                key={prog.id}
                onMouseEnter={() => setHoveredProgram(prog)}
                onMouseLeave={() => setHoveredProgram(null)}
                className={`relative group cursor-none transition-all duration-500 rounded-[2px] overflow-hidden border border-white/5 ${isHighlighted ? 'opacity-100 scale-100' : 'opacity-10 scale-[0.85] grayscale'}`}
              >
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
                      {selectedType === comp.type && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Visual feedback on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 border-white/0 group-hover:border-white/20 border transition-all pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Interactive Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-8">
        <div className="space-y-6 sticky top-8">
          <div className="flex items-center gap-3 text-white/40 uppercase tracking-[0.4em] text-[10px] font-black mb-2">
            <ListFilter size={14} /> Mechanisms / 分类权重
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
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">Frequency</span>
                </div>
                
                <div className="flex items-baseline justify-between gap-4">
                   <div className="h-2 rounded-full flex-1 overflow-hidden bg-white/5">
                     <div 
                        className="h-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(count / data.length) * 100}%`,
                          backgroundColor: HUMOR_COLORS[type as HumorType] 
                        }}
                     ></div>
                   </div>
                   <span className="text-xl font-black text-white leading-none">
                     {count}
                   </span>
                </div>

                <div 
                  className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-full transition-all duration-300 ${selectedType === type ? 'scale-y-100' : 'scale-y-0 opacity-0'}`}
                  style={{ backgroundColor: HUMOR_COLORS[type as HumorType] }}
                ></div>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className={`mt-12 transition-all duration-500 ${hoveredProgram ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <div className="bg-gradient-to-br from-white/[0.08] to-transparent rounded-[2rem] p-6 border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                     <Sparkles size={12} className="text-yellow-500" />
                     <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Gala Highlight</span>
                   </div>
                   <span className="text-xs font-mono text-white/40">{hoveredProgram?.year}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4 leading-tight tracking-tight">{hoveredProgram?.name}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                   {hoveredProgram?.tags?.map(tag => (
                     <span key={tag} className="px-2 py-0.5 bg-white/10 text-[9px] font-black text-white/60 rounded uppercase tracking-tighter">{tag}</span>
                   ))}
                </div>
                <div className="space-y-3 pt-4 border-t border-white/5">
                   {hoveredProgram?.composition?.map((comp, idx) => (
                     <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: HUMOR_COLORS[comp.type] }}></div>
                        <span className="text-[10px] font-bold text-white/60 flex-1">{comp.type}</span>
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full" style={{ width: `${comp.ratio * 100}%`, backgroundColor: HUMOR_COLORS[comp.type] }}></div>
                           </div>
                           <span className="text-[10px] font-mono text-white/40">{(comp.ratio * 100).toFixed(0)}%</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .grid-cols-26 { grid-template-columns: repeat(26, minmax(0, 1fr)); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default HumorEvolutionGrid;
