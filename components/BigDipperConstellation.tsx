
import React, { useState } from 'react';
import { PERFORMERS } from '../constants';
import { Performer } from '../types';
import { Star, Quote, Award, Sparkles } from 'lucide-react';

// 北斗七星坐标映射 (自定义比例)
const DIPPER_POINTS = [
  { x: 15, y: 20 }, // 摇光
  { x: 30, y: 35 }, // 开阳
  { x: 45, y: 45 }, // 玉衡
  { x: 60, y: 55 }, // 天权
  { x: 80, y: 50 }, // 天玑
  { x: 85, y: 30 }, // 天璇
  { x: 70, y: 15 }, // 天枢
];

const BigDipperConstellation: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dipperPerformers = PERFORMERS.slice(0, 7);

  const activePerformer = dipperPerformers.find(p => p.id === hoveredId);

  return (
    <div className="relative w-full h-[600px] mt-20 overflow-hidden bg-black/20 rounded-[3rem] border border-white/5 shadow-2xl">
      {/* Background Stars */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-pulse"
            style={{ 
              width: Math.random() * 2 + 'px', 
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's'
            }}
          ></div>
        ))}
      </div>

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path 
          d={`M ${DIPPER_POINTS.map(p => `${p.x}%,${p.y}%`).join(' L ')}`}
          fill="none"
          stroke="rgba(234, 179, 8, 0.2)"
          strokeWidth="2"
          strokeDasharray="8,4"
          className="animate-[dash_20s_linear_infinite]"
        />
        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: -200; }
          }
        `}</style>
      </svg>

      {/* Stars/Nodes */}
      {dipperPerformers.map((performer, i) => (
        <div 
          key={performer.id}
          className="absolute group z-10"
          style={{ top: `${DIPPER_POINTS[i].y}%`, left: `${DIPPER_POINTS[i].x}%`, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredId(performer.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative flex items-center justify-center">
             <div className={`w-6 h-6 rounded-full bg-yellow-500 blur-sm absolute transition-all duration-500 ${hoveredId === performer.id ? 'scale-[3] opacity-60' : 'scale-1 opacity-0'}`}></div>
             <div className={`w-4 h-4 rounded-full border-2 border-yellow-500 transition-all duration-300 flex items-center justify-center ${hoveredId === performer.id ? 'bg-yellow-500 scale-125 shadow-[0_0_20px_rgba(234,179,8,0.8)]' : 'bg-transparent'}`}>
                <Star size={8} fill={hoveredId === performer.id ? "white" : "transparent"} className="text-white" />
             </div>
             <span className="absolute top-8 left-1/2 -translate-x-1/2 text-yellow-500/80 font-black text-[10px] tracking-widest whitespace-nowrap uppercase opacity-40 group-hover:opacity-100 transition-opacity">
               {performer.name}
             </span>
          </div>
        </div>
      ))}

      {/* Detail Card Overlay */}
      {activePerformer && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] border-l-[10px] border-red-700 animate-in fade-in slide-in-from-right-10 duration-500 pointer-events-none z-50">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-2xl">
                    <Sparkles className="text-red-700" size={24} />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-red-900">{activePerformer.name}</h3>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master of Humor</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex gap-8">
                    <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">首秀年份</span>
                        <div className="text-lg font-black text-red-800">{activePerformer.firstYear}</div>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">作品总计</span>
                        <div className="text-lg font-black text-red-800">{activePerformer.totalWorks} 部</div>
                    </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-700 font-medium italic">
                  “{activePerformer.bio}”
                </p>

                <div>
                   <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-3 flex items-center gap-2">
                     <Quote size={10} /> 传世热梗
                   </span>
                   <div className="flex flex-wrap gap-2">
                      {activePerformer.quotes.map(q => (
                        <span key={q} className="bg-red-50 text-red-800 text-[10px] font-bold px-2 py-1.5 rounded-lg border border-red-100">
                          {q}
                        </span>
                      ))}
                   </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-[8px] text-gray-400 font-mono tracking-tighter italic">
                <span>Memory Archives Vol. 2</span>
                <Award size={14} className="text-yellow-600" />
            </div>
        </div>
      )}

      {/* Background Title */}
      <div className="absolute left-10 bottom-10">
         <h4 className="text-white/10 text-6xl font-black tracking-tighter pointer-events-none select-none">CONSTELLATION</h4>
      </div>
    </div>
  );
};

export default BigDipperConstellation;
