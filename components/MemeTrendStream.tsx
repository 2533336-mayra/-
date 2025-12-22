
import React, { useState, useRef, useMemo } from 'react';
import { MemeTrend } from '../types';
import { TrendingUp, MessageSquare, Repeat, Share2, MousePointer2, Plus } from 'lucide-react';

interface MemeTrendStreamProps {
  data: MemeTrend;
}

const MemeTrendStream: React.FC<MemeTrendStreamProps> = ({ data }) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setMouseX(Math.max(0, Math.min(100, x)));
  };

  const currentVisual = useMemo(() => {
    if (mouseX === null) return null;
    // Find the closest visual history point
    let closest = data.visualHistory[0];
    for (const point of data.visualHistory) {
      if (mouseX >= point.offset) {
        closest = point;
      }
    }
    return closest;
  }, [mouseX, data.visualHistory]);

  const generatePath = (key: 'posts' | 'likes' | 'comments', maxValue: number) => {
    const points = data.points.map((p, i) => {
      const x = (i / (data.points.length - 1)) * 100;
      const y = 100 - (p[key] / maxValue) * 100;
      return `${x},${y}`;
    }).join(' L ');
    return `M 0,100 L ${points} L 100,100 Z`;
  };

  const maxLikes = 600;

  return (
    <div className="relative mb-32 last:mb-0">
      {/* Index-style Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 mb-10 group/header cursor-none">
        <div className="flex items-baseline gap-6">
          <span className="text-[10px] font-black text-white/30 tracking-tighter w-8 uppercase">Project</span>
          <h3 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter transition-colors group-hover/header:text-red-500">
            {data.hashtag}
          </h3>
        </div>
        <div className="flex gap-12 mt-4 md:mt-0">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Lifecycle</span>
             <span className="text-sm font-bold text-white/60">{data.period}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Volume</span>
             <span className="text-sm font-bold text-red-500">{data.totalData} Units</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        {/* Main Graph Area */}
        <div 
          ref={containerRef}
          className="relative h-[300px] bg-white/[0.02] border border-white/5 rounded-3xl overflow-visible cursor-none group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMouseX(null)}
        >
          {/* Legend Overlays */}
          <div className="absolute top-6 left-8 flex gap-8 z-10 pointer-events-none">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">点赞数 (Likes)</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">评论量 (Comments)</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">发帖数 (Posts)</span>
             </div>
          </div>

          <svg className="absolute inset-0 w-full h-full p-8 overflow-visible" preserveAspectRatio="none">
            {/* Likes Curve (Dominant) */}
            <path d={generatePath('likes', maxLikes)} fill="rgba(239, 68, 68, 0.05)" className="transition-all duration-300" />
            <path d={generatePath('likes', maxLikes).replace(' Z', '')} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

            {/* Comments Curve */}
            <path d={generatePath('comments', maxLikes).replace(' Z', '')} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4,2" className="opacity-60" />

            {/* Posts Curve */}
            <path d={generatePath('posts', maxLikes).replace(' Z', '')} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
          </svg>

          {/* Mouse Tracker Line */}
          {mouseX !== null && (
            <div 
              className="absolute top-0 bottom-0 w-[1px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
              style={{ left: `${mouseX}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
            </div>
          )}

          {/* Floating Crosshair Indicator */}
          {mouseX !== null && (
            <div 
              className="absolute top-4 pointer-events-none z-30"
              style={{ left: `${mouseX}%` }}
            >
               <Plus className="text-red-500 -translate-x-1/2" size={20} />
            </div>
          )}
        </div>

        {/* Dynamic Image / Evolution Stage Preview */}
        <div className="relative">
          <div className="sticky top-32 group/preview">
            <div className="relative w-full aspect-[4/3] bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover/preview:border-red-500/50">
              {currentVisual ? (
                <div className="absolute inset-0 animate-in fade-in zoom-in-95 duration-500">
                  <img src={currentVisual.imageUrl} className="w-full h-full object-cover grayscale group-hover/preview:grayscale-0 transition-all duration-700" alt="Evolution Stage" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] mb-2 block">Evolution Phase</span>
                     <h4 className="text-xl font-bold text-white leading-tight">{currentVisual.label}</h4>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 opacity-30">
                  <MousePointer2 className="mb-4 text-white" size={32} />
                  <p className="text-xs font-black uppercase tracking-widest text-white leading-relaxed">移动鼠标追踪<br/>笑点的演变视觉史</p>
                </div>
              )}
            </div>

            {/* Background Decorative "Index" element */}
            <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/[0.02] pointer-events-none select-none italic leading-none">
              EVOL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeTrendStream;
