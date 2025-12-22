
import React, { useRef, useState, useEffect } from 'react';
import { VideoData, HumorPoint } from '../types';
import { Info, Play, Pause, RotateCcw, Zap, ChevronRight, Tv, Settings2 } from 'lucide-react';

interface OldTVPlayerProps {
  data: VideoData;
}

const OldTVPlayer: React.FC<OldTVPlayerProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<HumorPoint | null>(null);
  const [isLaughterGap, setIsLaughterGap] = useState(false);
  const [seenPoints, setSeenPoints] = useState<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      if (currentTime < lastTimeRef.current - 0.5) {
        setSeenPoints(new Set());
      }
      lastTimeRef.current = currentTime;

      const point = data.humorPoints.find(p => 
        Math.abs(currentTime - p.timestamp) < 0.3 && !seenPoints.has(p.timestamp)
      );

      if (point && !activeAnalysis && !isLaughterGap) {
        setSeenPoints(prev => new Set(prev).add(point.timestamp));
        setIsLaughterGap(true);
        
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            setIsLaughterGap(false);
            setActiveAnalysis(point);
          }
        }, 1200); 
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [data.humorPoints, activeAnalysis, isLaughterGap, seenPoints]);

  const togglePlay = () => {
    if (activeAnalysis) {
      setActiveAnalysis(null);
      videoRef.current?.play();
      setIsPlaying(true);
    } else if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      lastTimeRef.current = 0;
      setSeenPoints(new Set());
      setActiveAnalysis(null);
      setIsLaughterGap(false);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-40 p-1 md:p-2 bg-[#2a1810] rounded-[3rem] shadow-[0_60px_100px_rgba(0,0,0,0.7)] border-t-[16px] border-[#3e2723] group/tv">
      
      {/* Wood Texture & Side Details */}
      <div className="absolute inset-0 rounded-[2.8rem] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 pointer-events-none"></div>
      
      {/* Retro Antennas */}
      <div className="absolute -top-32 left-[15%] w-1.5 h-48 bg-gradient-to-t from-[#4e342e] to-transparent origin-bottom rotate-[-25deg] rounded-full border-r border-white/5"></div>
      <div className="absolute -top-32 left-[15%] w-6 h-6 bg-[#2a1810] rounded-full -bottom-3 translate-y-[180px]"></div>
      
      <div className="relative flex flex-col lg:flex-row gap-0 p-8 md:p-12">
        
        {/* Main TV Screen Frame */}
        <div className="flex-1 relative aspect-video bg-[#050505] rounded-[3.5rem] p-4 border-[14px] border-[#1a1a1a] shadow-[inset_0_0_100px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.5)] crt-screen overflow-hidden group/screen">
          
          <div className="absolute inset-0 crt-glow pointer-events-none z-10"></div>
          
          <video 
            ref={videoRef}
            src={data.videoUrl}
            poster={data.poster}
            className={`w-full h-full object-cover rounded-[2.5rem] transition-all duration-700 animate-[tv-flicker_0.15s_infinite] ${isLaughterGap ? 'brightness-150 saturate-200 scale-105 blur-[0.5px]' : 'opacity-90 contrast-125'}`}
            onEnded={() => { setIsPlaying(false); lastTimeRef.current = 0; }}
          />

          {/* Dynamic Distortion & Static Noise Layer (On pause/gap) */}
          {(isLaughterGap || !isPlaying) && (
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUicKgE2YToat/giphy.gif')] opacity-[0.03] pointer-events-none mix-blend-screen z-20"></div>
          )}

          {isLaughterGap && (
            <div className="absolute inset-0 bg-yellow-500/10 animate-pulse pointer-events-none z-30"></div>
          )}

          {/* Floating Laughter Alert */}
          {isLaughterGap && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-yellow-500 text-red-950 px-10 py-5 rounded-full font-black text-2xl animate-bounce shadow-[0_0_50px_rgba(234,179,8,0.8)] z-50">
              <Zap size={32} fill="currentColor" /> 触发全民笑点
            </div>
          )}

          {/* Analysis Card Overlay - Should look like a digital UI breaking through the CRT */}
          {activeAnalysis && (
            <div className="absolute inset-0 flex items-center justify-center p-8 z-[60]">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500"></div>
              
              <div className="relative bg-white text-black w-full max-w-xl rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9)] border-l-[10px] border-red-700 transform -rotate-1 animate-in slide-in-from-top-12 duration-500 flex flex-col p-8 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-700 rounded-2xl flex items-center justify-center text-white rotate-3">
                        <Info size={22} />
                    </div>
                    <span className="font-black text-lg tracking-tight text-red-900 uppercase">幽默逻辑解构</span>
                  </div>
                </div>
                
                <div className="mb-6">
                   <h3 className="text-xl md:text-2xl font-black italic border-l-4 border-yellow-500 pl-6 py-4 bg-yellow-50 rounded-r-2xl text-red-950 leading-tight">
                    “{activeAnalysis.content}”
                   </h3>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block mb-2">● 触发机制</span>
                    <p className="text-base font-bold text-gray-900">{activeAnalysis.mechanism}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 block mb-2">● 科普深度剖析</span>
                    <p className="text-sm leading-relaxed text-gray-700 font-medium italic">
                      {activeAnalysis.analysis}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={togglePlay}
                  className="w-full py-5 bg-red-700 text-white rounded-2xl font-black text-lg hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl group/btn"
                >
                  继续追踪演变 <ChevronRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Retro Side Control Panel */}
        <div className="w-full lg:w-48 bg-[#1a1a1a] rounded-r-[3.5rem] lg:rounded-l-none lg:rounded-r-[3.5rem] border-l-4 border-black flex flex-col items-center py-12 px-8 gap-10 shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)]">
          
          {/* Channel Knobs */}
          <div className="flex flex-col gap-8 items-center">
            <div className="relative group/knob">
               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#333] to-[#111] border-4 border-[#222] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-none transition-transform duration-500 group-hover/knob:rotate-45" onClick={togglePlay}>
                  <div className="w-1.5 h-8 bg-white/20 rounded-full"></div>
               </div>
               <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/30 tracking-widest uppercase">Power/Play</span>
            </div>

            <div className="relative group/knob2">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#333] to-[#111] border-4 border-[#222] shadow-[0_8px_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-none transition-transform duration-300 hover:rotate-90" onClick={handleReset}>
                  <RotateCcw className="text-white/20" size={20} />
               </div>
               <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/30 tracking-widest uppercase">Reset</span>
            </div>
          </div>

          {/* Volume/Progress Slider Slit */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="w-2.5 h-32 bg-black rounded-full p-0.5 border border-white/5 relative overflow-hidden">
               <div 
                 className="absolute bottom-0 left-0 right-0 bg-yellow-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.7)]" 
                 style={{ height: `${videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%` }}
               ></div>
            </div>
            <div className="flex flex-col items-center">
               <Settings2 size={16} className="text-white/10 mb-2" />
               <span className="text-[9px] text-yellow-600/60 font-black uppercase tracking-tighter">Syncing...</span>
            </div>
          </div>

          {/* Speaker Grille */}
          <div className="flex flex-col gap-1 w-full mt-4">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="h-1 bg-black rounded-full border-t border-white/5 opacity-50"></div>
             ))}
          </div>
        </div>
      </div>

      {/* Retro Badge & Decorative Plate */}
      <div className="absolute -bottom-10 left-20 px-12 py-5 bg-[#b71c1c] text-white font-black text-2xl rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center gap-4 z-50 transform -rotate-1">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Tv size={20} className="text-yellow-400" />
        </div>
        《{data.title}》
        <div className="ml-4 px-2 py-0.5 bg-black/20 text-[10px] rounded uppercase tracking-widest text-white/60">Retro Edition</div>
      </div>
      
      {/* Ventilation Holes */}
      <div className="absolute top-10 right-20 grid grid-cols-5 gap-2 opacity-20">
        {[...Array(15)].map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-black border border-white/10 shadow-inner"></div>)}
      </div>
    </div>
  );
};

export default OldTVPlayer;
