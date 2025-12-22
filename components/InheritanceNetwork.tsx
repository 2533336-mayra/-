
import React, { useState, useRef } from 'react';
import { PERFORMERS, RELATIONS } from '../constants';
import { Share2, Users, ArrowUpRight } from 'lucide-react';

// 简化的节点坐标分布 (为了演示效果手动定义，实际可用力导向算法)
const NODE_POSITIONS: Record<string, {x: number, y: number}> = {
  'ZBS': {x: 500, y: 300},
  'SDD': {x: 400, y: 150},
  'XSY': {x: 650, y: 150},
  'FG': {x: 300, y: 500},
  'NQ': {x: 150, y: 450},
  'CM': {x: 700, y: 450},
  'PCJ': {x: 850, y: 500},
  'GDL': {x: 550, y: 550},
  'ST': {x: 800, y: 300},
  'ZLR': {x: 150, y: 200},
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
      className="relative w-full h-[700px] mt-20 bg-[#111] rounded-[3rem] border border-white/5 overflow-hidden group cursor-grab active:cursor-grabbing"
      onWheel={handleScroll}
    >
      {/* HUD Info */}
      <div className="absolute top-8 left-8 z-20 space-y-2 pointer-events-none">
         <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <Share2 className="text-yellow-500" size={16} />
            <span className="text-xs font-black text-white uppercase tracking-widest">幽默基因组 · 传承网脉</span>
         </div>
         <p className="text-[10px] text-white/40 font-bold uppercase ml-4">Scroll to Zoom · Click to Filter Ego-Network</p>
      </div>

      <div 
        className="w-full h-full transition-transform duration-500 ease-out flex items-center justify-center"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg className="w-[1000px] h-[700px] relative">
          {/* Relations (Lines) */}
          {RELATIONS.map((rel, i) => {
            const start = NODE_POSITIONS[rel.source];
            const end = NODE_POSITIONS[rel.target];
            const active = isLinkRelated(rel);
            return (
              <g key={i}>
                <line 
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke={active ? "rgba(234, 179, 8, 0.6)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth={active ? "3" : "1"}
                  className="transition-all duration-500"
                />
                {active && selectedNode && (
                  <circle r="4" fill="#eab308">
                    <animateMotion dur="3s" repeatCount="indefinite" path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodes (Circles) */}
          {PERFORMERS.map((perf) => {
            const pos = NODE_POSITIONS[perf.id];
            const active = isRelated(perf.id);
            if (!pos) return null;
            return (
              <g 
                key={perf.id} 
                className={`cursor-none transition-all duration-500 ${active ? 'opacity-100' : 'opacity-20 grayscale'}`}
                onClick={() => setSelectedNode(selectedNode === perf.id ? null : perf.id)}
              >
                <circle 
                  cx={pos.x} cy={pos.y} r={selectedNode === perf.id ? "35" : "25"} 
                  fill={selectedNode === perf.id ? "#800" : "#222"}
                  stroke={selectedNode === perf.id ? "#eab308" : "rgba(255,255,255,0.1)"}
                  strokeWidth="2"
                  className="transition-all duration-300 hover:fill-[#333]"
                />
                <text 
                  x={pos.x} y={pos.y + 5} 
                  textAnchor="middle" 
                  className={`font-black text-[10px] pointer-events-none fill-white`}
                >
                  {perf.name}
                </text>
                {selectedNode === perf.id && (
                  <circle cx={pos.x} cy={pos.y} r="45" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="4,4" className="animate-spin" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 flex gap-6 bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-[9px] font-black text-white/60 uppercase">血缘协作</span>
         </div>
         <div className="flex items-center gap-2">
            <Users className="text-white/40" size={14} />
            <span className="text-[9px] font-black text-white/60 uppercase">多维度交互图谱</span>
         </div>
      </div>
    </div>
  );
};

export default InheritanceNetwork;
