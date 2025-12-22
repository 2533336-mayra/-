
import React, { useState, useRef, useEffect } from 'react';
import { PERFORMERS, RELATIONS } from '../constants';
import { Share2, Users, ArrowUpRight } from 'lucide-react';

// 节点坐标分布 (同步 constants.tsx 中的 ID)
const NODE_POSITIONS: Record<string, {x: number, y: number}> = {
  'ZBS': {x: 500, y: 350},
  'SDD': {x: 350, y: 200},
  'XSY': {x: 650, y: 200},
  'FG': {x: 300, y: 550},
  'NQ': {x: 150, y: 500},
  'CM': {x: 750, y: 500},
  'GDL': {x: 550, y: 600},
  'ST': {x: 850, y: 350},
  'ML': {x: 850, y: 200},
  'ZLR': {x: 150, y: 250},
};

const InheritanceNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY < 0) setZoom(z => Math.min(z + 0.1, 1.5));
    else setZoom(z => Math.max(z - 0.1, 0.4));
  };

  const isRelated = (performerId: string) => {
    if (!selectedNode) return true;
    if (selectedNode === performerId) return true;
    return RELATIONS.some(r => 
      (r.source === selectedNode && r.target === performerId) || 
      (r.target === selectedNode && r.source === performerId)
    );
  };

  const isLinkRelated = (rel: any) => {
    if (!selectedNode) return true;
    return rel.source === selectedNode || rel.target === selectedNode;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[750px] bg-[#0a0a0a] rounded-[3.5rem] border border-white/5 overflow-hidden group cursor-grab active:cursor-grabbing shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
      onWheel={handleScroll}
    >
      {/* HUD Info */}
      <div className="absolute top-8 left-8 z-20 space-y-3 pointer-events-none">
         <div className="flex items-center gap-3 bg-red-950/40 px-5 py-2.5 rounded-full border border-red-900/20 backdrop-blur-xl">
            <Share2 className="text-yellow-500" size={18} />
            <span className="text-xs font-black text-white uppercase tracking-widest">幽默基因组 · 传承网脉</span>
         </div>
         <div className="flex flex-col gap-1 ml-5">
            <p className="text-[10px] text-white/40 font-bold uppercase">Scroll to Zoom · Click Node to Focus</p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
               <span className="text-[9px] text-yellow-500/60 font-black">ACTIVE NODE SCANNING</span>
            </div>
         </div>
      </div>

      <div 
        className="w-full h-full transition-transform duration-700 cubic-bezier(0.2, 0, 0, 1) flex items-center justify-center"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg className="w-[1000px] h-[750px] relative overflow-visible">
          {/* Relations (Lines) */}
          {RELATIONS.map((rel, i) => {
            const start = NODE_POSITIONS[rel.source];
            const end = NODE_POSITIONS[rel.target];
            if (!start || !end) return null; // 防御性检查
            
            const active = isLinkRelated(rel);
            return (
              <g key={`rel-${i}`}>
                <line 
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke={active ? "rgba(234, 179, 8, 0.4)" : "rgba(255, 255, 255, 0.03)"}
                  strokeWidth={active ? "2.5" : "1"}
                  className="transition-all duration-700"
                />
                {active && selectedNode && (
                  <circle r="3" fill="#eab308" className="shadow-[0_0_10px_rgba(234,179,8,1)]">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodes (Circles) */}
          {PERFORMERS.map((perf) => {
            const pos = NODE_POSITIONS[perf.id];
            if (!pos) return null; // 节点必须有定义坐标
            
            const active = isRelated(perf.id);
            const isSelected = selectedNode === perf.id;
            
            return (
              <g 
                key={`node-${perf.id}`} 
                className={`cursor-none transition-all duration-700 ${active ? 'opacity-100' : 'opacity-10 grayscale'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(isSelected ? null : perf.id);
                }}
              >
                {/* Node Outer Glow */}
                {isSelected && (
                  <circle cx={pos.x} cy={pos.y} r="50" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="5,5" className="animate-spin-slow" />
                )}
                
                {/* Main Node */}
                <circle 
                  cx={pos.x} cy={pos.y} r={isSelected ? "38" : "28"} 
                  fill={isSelected ? "#700" : "#1a1a1a"}
                  stroke={isSelected ? "#eab308" : "rgba(255,255,255,0.08)"}
                  strokeWidth="2"
                  className="transition-all duration-300 hover:fill-[#222]"
                />
                
                {/* Text Label */}
                <text 
                  x={pos.x} y={pos.y + 5} 
                  textAnchor="middle" 
                  className={`font-black text-[11px] pointer-events-none ${isSelected ? 'fill-yellow-400' : 'fill-white/80'}`}
                >
                  {perf.name}
                </text>
                
                {/* Relationship Type Badge */}
                {isSelected && (
                   <g transform={`translate(${pos.x - 20}, ${pos.y - 55})`}>
                      <rect width="40" height="14" rx="7" fill="#eab308" />
                      <text x="20" y="10" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">FOCUS</text>
                   </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Stats */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-4">
        <div className="flex gap-6 bg-black/60 p-5 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">师承协作</span>
          </div>
          <div className="flex items-center gap-2">
              <Users className="text-white/40" size={16} />
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">多代际交互</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          transform-origin: center;
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InheritanceNetwork;
