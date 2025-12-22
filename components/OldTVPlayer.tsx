
import React, { useRef, useState, useEffect } from 'react';
import { VideoData, HumorPoint } from '../types';
import { Info, Play, Pause, RotateCcw, Zap, ChevronRight, Tv } from 'lucide-react';

interface OldTVPlayerProps {
  data: VideoData;
}

const OldTVPlayer: React.FC<OldTVPlayerProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0); // 记录上一次的时间点，用于检测回拖
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<HumorPoint | null>(null);
  const [isLaughterGap, setIsLaughterGap] = useState(false);
  const [seenPoints, setSeenPoints] = useState<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // 检测用户是否回拖了进度条，如果是，则重置已看过的笑点
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
        
        // 1.5秒的“笑声延迟”，模拟现实中观众反应时间
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            setIsLaughterGap(false);
            setActiveAnalysis(point);
          }
        }, 1500); 
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

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setSeenPoints(new Set()); // 视频播放结束，重置笑点以便下次播放
    lastTimeRef.current = 0;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-32 p-6 md:p-12 bg-[#3a0d0d] rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-[12px] border-[#4d1414]">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 -right-6 h-48 w-3 flex flex-col gap-2 opacity-20">
        {[...Array(15)].map((_, i) => <div key={i} className="w-full h-1 bg-yellow-500"></div>)}
      </div>

      {/* Retro Antennas */}
      <div className="absolute -top-24 left-1/4 w-1.5 h-32 bg-gradient-to-t from-yellow-700/60 to-transparent origin-bottom rotate-[-20deg]"></div>
      <div className="absolute -top-24 right-1/4 w-1.5 h-32 bg-gradient-to-t from-yellow-700/60 to-transparent origin-bottom rotate-[20deg]"></div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main TV Screen Container */}
        <div className="flex-1 relative aspect-video bg-black rounded-[2rem] overflow-hidden border-[6px] border-[#1a1a1a] shadow-[inset_0_0_80px_rgba(0,0,0,1)] group">
          <video 
            ref={videoRef}
            src={data.videoUrl}
            poster={data.poster}
            className={`w-full h-full object-cover transition-all duration-700 ${isLaughterGap ? 'brightness-125 saturate-150 scale-[1.05]' : 'opacity-90 contrast-125'}`}
            onEnded={handleVideoEnded}
          />
          
          {/* Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

          {isLaughterGap && (
            <div className="absolute inset-0 bg-yellow-500/15 animate-pulse pointer-events-none z-20"></div>
          )}

          {isLaughterGap && (
            <div className="absolute top-6 right-6 flex items-center gap-3 bg-yellow-500 text-red-900 px-6 py-3 rounded-full font-black text-base animate-bounce shadow-[0_0_30px_rgba(234,179,8,0.6)] z-30">
              <Zap size={22} fill="currentColor" /> 观众爆笑中...
            </div>
          )}

          {/* Analysis Card */}
          {activeAnalysis && (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 z-40 overflow-hidden">
              <div className="absolute inset-0 bg-red-950/85 backdrop-blur-md animate-in fade-in duration-500"></div>
              
              <div className="relative bg-white text-black w-full max-w-2xl max-h-full overflow-y-auto rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-t-[12px] border-yellow-500 transform rotate-1 animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 flex flex-col custom-scrollbar">
                <style dangerouslySetInnerHTML={{ __html: `
                  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                  .custom-scrollbar::-webkit-scrollbar-thumb { background: #eab308; border-radius: 10px; }
                `}} />
                
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-red-700 rounded-full flex items-center justify-center text-white">
                          <Info size={20} />
                      </div>
                      <span className="font-black text-base tracking-tight text-red-900 uppercase">笑点追综卡片</span>
                    </div>
                    <div className="bg-yellow-100 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-yellow-700 uppercase">
                      Captured Moment
                    </div>
                  </div>
                  
                  <div className="mb-5 flex-shrink-0">
                     <h3 className="text-lg md:text-xl font-bold italic border-l-4 border-yellow-500 pl-4 py-3 bg-yellow-50 rounded-r-lg text-red-900 leading-snug">
                      “{activeAnalysis.content}”
                     </h3>
                  </div>
                  
                  <div className="space-y-5 mb-6 overflow-y-visible">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 mb-1.5">
                         <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div> 幽默机制
                      </span>
                      <p className="text-sm md:text-base font-bold text-gray-900 leading-tight">{activeAnalysis.mechanism}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-1.5">
                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> 深度社会/心理学剖析
                      </span>
                      <p className="text-xs md:text-sm leading-relaxed text-gray-700 font-medium italic">
                        {activeAnalysis.analysis}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={togglePlay}
                    className="mt-auto w-full py-4 bg-red-700 text-white rounded-xl font-black text-base hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl group overflow-hidden relative flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
                    探索下一个笑点 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Controls Section */}
        <div className="w-full lg:w-40 flex flex-row lg:flex-col items-center justify-between py-2 lg:py-10 px-6 lg:px-0">
          <div className="flex flex-row lg:flex-col gap-8">
            <button 
              className={`w-20 h-20 rounded-full border-4 shadow-2xl flex items-center justify-center transition-all active:scale-90 relative overflow-hidden group ${isPlaying ? 'bg-red-900 border-red-700' : 'bg-[#1a0a0a] border-[#4d1414] hover:border-yellow-500'}`} 
              onClick={togglePlay}
              disabled={isLaughterGap}
            >
              {isPlaying ? <Pause className="text-white" size={28} fill="currentColor" /> : <Play className="text-yellow-500 translate-x-1" size={28} fill="currentColor" />}
              {isLaughterGap && <div className="absolute inset-0 bg-yellow-500/20 animate-pulse"></div>}
            </button>
            <button 
              className="w-20 h-20 rounded-full bg-[#1a0a0a] border-4 border-[#4d1414] shadow-2xl flex items-center justify-center hover:border-gray-300 transition-all active:scale-90" 
              onClick={handleReset}
            >
               <RotateCcw className="text-yellow-700" size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="hidden lg:block w-10 h-32 bg-black/60 rounded-full border-2 border-yellow-900/50 p-2 shadow-inner">
               <div 
                 className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.5)]" 
                 style={{ height: `${videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%` }}
               ></div>
            </div>
            <div className="text-[11px] text-yellow-600/70 font-mono uppercase tracking-widest text-center leading-tight font-black">
              TRACKING<br/><span className="text-yellow-500 text-sm">{data.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Labels */}
      <div className="absolute -bottom-8 left-16 px-10 py-4 bg-yellow-500 text-red-900 font-black text-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] skew-x-[-10deg] border-2 border-white/20 flex items-center gap-4 z-50">
        <Tv size={24} className="animate-pulse" /> 《{data.title}》
      </div>
      <div className="absolute bottom-6 right-16 flex gap-3">
        {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-yellow-600/30 border border-yellow-500/20 shadow-inner"></div>)}
      </div>
    </div>
  );
};

export default OldTVPlayer;
