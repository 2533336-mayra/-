
import React, { useState } from 'react';
import { PERFORMERS } from '../constants';
import { Performer } from '../types';
import { Star, Quote, Award, Sparkles, MapPin } from 'lucide-react';

// 北斗七星坐标映射 (百分比布局)
const DIPPER_POINTS = [
  { x: 12, y: 35, name: '摇光' }, 
  { x: 25, y: 55, name: '开阳' }, 
  { x: 40, y: 65, name: '玉衡' }, 
  { x: 55, y: 72, name: '天权' }, 
  { x: 75, y: 62, name: '天玑' }, 
  { x: 82, y: 38, name: '天璇' }, 
  { x: 68, y: 18, name: '天枢' }, 
];

const BigDipperConstellation: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dipperPerformers = PERFORMERS.slice(0, 7);

  const activePerformer = hoveredIndex !== null ? dipperPerformers[hoveredIndex] : null;
  const activePoint = hoveredIndex !== null ? DIPPER_POINTS[hoveredIndex] : null;

  return (
    <div className="relative w-full h-[700px] mt-10 overflow-hidden bg-black/40 rounded-[4rem] border border-white/5 shadow-2xl backdrop-blur-sm">
      {/* Background Deep Space Stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-pulse"
            style={{ 
              width: Math.random() * 2 + 1 + 'px', 
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          ></div>
        ))}
      </div>

      {/* Constellation Lines (Connecting the dots) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <path 
          d={`M ${DIPPER_POINTS.map(p => `${p.x}%,${p.y}%`).join(' L ')}`}
          fill="none"
          stroke="rgba(234, 179, 8, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="10,5"
          filter="url(#glow)"
          className="animate-[dash_30s_linear_infinite]"
        />
        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: -300; }
          }
        `}</style>
      </svg>

      {/* Star Nodes */}
      {dipperPerformers.map((performer, i) => (
        <div 
          key={performer.id}
          className="absolute group z-20"
          style={{ top: `${DIPPER_POINTS[i].y}%`, left: `${DIPPER_POINTS[i].x}%`, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative flex items-center justify-center cursor-none">
             {/* Halo effects */}
             <div className={`w-12 h-12 rounded-full bg-yellow-500/20 blur-md absolute transition-all duration-700 ${hoveredIndex === i ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}></div>
             <div className={`w-8 h-8 rounded-full border border-yellow-500/30 absolute animate-ping transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
             
             {/* Star Core */}
             <div className={`w-5 h-5 rounded-full border-2 border-yellow-400 transition-all duration-500 flex items-center justify-center ${hoveredIndex === i ? 'bg-yellow-400 scale-125 shadow-[0_0_30px_rgba(234,179,8,1)]' : 'bg-black/40'}`}>
                <Star size={10} fill={hoveredIndex === i ? "white" : "rgba(234,179,8,0.5)"} className={`transition-colors ${hoveredIndex === i ? 'text-white' : 'text-yellow-500'}`} />
             </div>

             {/* Star Name Label */}
             <div className={`absolute top-10 left-1/2 -translate-x-1/2 transition-all duration-300 ${hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-2'}`}>
               <span className="text-yellow-500/90 font-black text-[11px] tracking-[0.3em] whitespace-nowrap uppercase italic bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                 {performer.name}
               </span>
             </div>
          </div>
        </div>
      ))}

      {/* Follow-style Character Card */}
      {activePerformer && activePoint && (
        <div 
          className={`absolute z-50 w-[340px] transition-all duration-500 ease-out animate-in fade-in zoom-in-95 pointer-events-none`}
          style={{ 
            top: activePoint.y > 60 ? 'auto' : `${activePoint.y}%`,
            bottom: activePoint.y > 60 ? `${100 - activePoint.y}%` : 'auto',
            left: activePoint.x < 50 ? `${activePoint.x + 4}%` : 'auto',
            right: activePoint.x >= 50 ? `${100 - activePoint.x + 4}%` : 'auto',
            transform: activePoint.y > 60 ? 'translateY(20px)' : 'translateY(-20px)'
          }}
        >
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-t-[12px] border-red-700 overflow-hidden">
            {/* Subtle decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            
            <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-700 rounded-2xl shadow-lg shadow-red-700/30">
                      <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-red-950 tracking-tighter">{activePerformer.name}</h3>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-red-700/60 uppercase tracking-widest mt-1">
                      <MapPin size={10} /> {activePoint.name} · 星位
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">Established</div>
                  <div className="text-xl font-black text-red-900 leading-none">{activePerformer.firstYear}</div>
                </div>
            </div>

            <div className="space-y-6 relative">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">春晚征程</span>
                        <div className="text-2xl font-black text-red-800 tracking-tighter">{activePerformer.totalWorks} <span className="text-xs text-red-800/60">部作品</span></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">江湖地位</span>
                        <div className="text-sm font-black text-red-900 bg-red-100/50 px-2 py-0.5 rounded inline-block w-fit">
                          {activePerformer.role}
                        </div>
                    </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-2 top-0 text-red-100">
                    <Quote size={40} fill="currentColor" />
                  </div>
                  <p className="relative text-sm leading-relaxed text-gray-800 font-bold italic pl-4">
                    {activePerformer.bio}
                  </p>
                </div>

                <div>
                   <div className="flex items-center gap-2 mb-3">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-red-100"></div>
                      <span className="text-[9px] font-black text-red-700 uppercase tracking-[0.3em]">经典回响</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-red-100"></div>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {activePerformer.quotes.map(q => (
                        <div key={q} className="bg-red-50/80 text-red-900 text-[10px] font-black px-3 py-2 rounded-xl border border-red-100/50 shadow-sm">
                          “{q}”
                        </div>
                      ))}
                   </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[8px] text-gray-400 font-mono tracking-tighter italic">
                   <Award size={14} className="text-yellow-600" />
                   <span>MEMORY ARCHIVES VOL. 2</span>
                </div>
                <div className="w-8 h-1 bg-red-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Visual indicator line connecting to star (optional flourish) */}
          <div className={`absolute top-1/2 w-10 h-[1px] bg-red-700/30 ${activePoint.x < 50 ? '-left-10' : '-right-10'}`}></div>
        </div>
      )}

      {/* Bottom Large Background Title */}
      <div className="absolute left-10 bottom-10 select-none pointer-events-none">
         <h4 className="text-white/[0.03] text-[12rem] font-black tracking-tighter leading-none italic uppercase">Master</h4>
      </div>
    </div>
  );
};

export default BigDipperConstellation;
