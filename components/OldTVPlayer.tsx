
import React, { useRef, useState, useEffect } from 'react';
import { VideoData, HumorPoint } from '../types';
import { Info, Play, Pause, RotateCcw, Zap, ChevronRight, Tv } from 'lucide-react';

interface OldTVPlayerProps {
  data: VideoData;
}

const OldTVPlayer: React.FC<OldTVPlayerProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<HumorPoint | null>(null);
  const [isLaughterGap, setIsLaughterGap] = useState(false);
  const [seenPoints, setSeenPoints] = useState<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const point = data.humorPoints.find(p => 
        Math.abs(video.currentTime - p.timestamp) < 0.3 && !seenPoints.has(p.timestamp)
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
      setSeenPoints(new Set());
      setActiveAnalysis(null);
      setIsLaughterGap(false);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-32 p-10 bg-[#3a0d0d] rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-8 border-[#4d1414]">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 -right-4 h-32 w-2 flex flex-col gap-1 opacity-10">
        {[...Array(10)].map((_, i) => <div key={i} className="w-full h-1 bg-yellow-500"></div>)}
      </div>

      {/* Retro Antennas */}
      <div className="absolute -top-16 left-1/4 w-1 h-24 bg-gradient-to-t from-yellow-700/50 to-transparent origin-bottom rotate-[-15deg]"></div>
      <div className="absolute -top-16 right-1/4 w-1 h-24 bg-gradient-to-t from-yellow-700/50 to-transparent origin-bottom rotate-[15deg]"></div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main TV Screen */}
        <div className="flex-1 relative aspect-video bg-black rounded-3xl overflow-hidden border-4 border-[#1a1a1a] shadow-[inset_0_0_50px_rgba(0,0,0,1)] group">
          <video 
            ref={videoRef}
            src={data.videoUrl}
            poster={data.poster}
            className={`w-full h-full object-cover transition-all duration-700 ${isLaughterGap ? 'brightness-125 saturate-150 scale-[1.03]' : 'opacity-80 contrast-125'}`}
            onEnded={() => setIsPlaying(false)}
          />
          
          {isLaughterGap && (
            <div className="absolute inset-0 bg-yellow-500/10 animate-pulse pointer-events-none"></div>
          )}

          {isLaughterGap && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-yellow-500 text-red-900 px-4 py-2 rounded-full font-black text-sm animate-bounce shadow-[0_0_20px_rgba(234,179,8,0.5)]">
              <Zap size={18} fill="currentColor" /> 观众爆笑中...
            </div>
          )}

          {/* Analysis Card */}
          {activeAnalysis && (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 z-30">
              <div className="absolute inset-0 bg-red-950/80 backdrop-blur-md animate-in fade-in duration-500"></div>
              <div className="relative bg-white text-black p-6 md:p-10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t-[16px] border-yellow-500 max-w-xl transform rotate-1 animate-in slide-in-from-bottom-12 zoom-in-95 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white">
                        <Info size={24} />
                    </div>
                    <span className="font-black text-lg tracking-tight text-red-900">笑点追综卡片</span>
                  </div>
                  <div className="bg-yellow-100 px-3 py-1 rounded text-[10px] font-mono font-bold text-yellow-700 uppercase">
                    Captured Moment
                  </div>
                </div>
                
                <div className="mb-6">
                   <h3 className="text-xl font-bold italic border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg text-red-900">
                    “{activeAnalysis.content}”
                   </h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div> 幽默机制
                    </span>
                    <p className="text-base font-bold text-gray-900 leading-snug">{activeAnalysis.mechanism}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> 深度社会/心理学剖析
                    </span>
                    <p className="text-sm leading-relaxed text-gray-700 font-medium">
                      {activeAnalysis.analysis}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={togglePlay}
                  className="mt-10 w-full py-5 bg-red-700 text-white rounded-2xl font-black text-lg hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
                  探索下一个笑点 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side Controls Section */}
        <div className="w-full md:w-32 flex flex-row md:flex-col items-center justify-between py-2 md:py-8 px-4 md:px-0">
          <div className="flex flex-row md:flex-col gap-6">
            <button 
              className={`w-16 h-16 rounded-full border-4 shadow-xl flex items-center justify-center transition-all active:scale-90 relative overflow-hidden group ${isPlaying ? 'bg-red-900 border-red-700' : 'bg-[#1a0a0a] border-[#4d1414] hover:border-yellow-500'}`} 
              onClick={togglePlay}
              disabled={isLaughterGap}
            >
              {isPlaying ? <Pause className="text-white" fill="currentColor" /> : <Play className="text-yellow-500 translate-x-0.5" fill="currentColor" />}
              {isLaughterGap && <div className="absolute inset-0 bg-yellow-500/20 animate-pulse"></div>}
            </button>
            <button 
              className="w-16 h-16 rounded-full bg-[#1a0a0a] border-4 border-[#4d1414] shadow-xl flex items-center justify-center hover:border-gray-300 transition-all active:scale-90" 
              onClick={handleReset}
            >
               <RotateCcw className="text-yellow-700" />
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="hidden md:block w-8 h-24 bg-black/60 rounded-full border-2 border-yellow-900/50 p-1.5 shadow-inner">
               <div 
                 className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" 
                 style={{ height: `${videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%` }}
               ></div>
            </div>
            <div className="text-[10px] text-yellow-600/60 font-mono uppercase tracking-widest text-center leading-tight">
              PROG.<br/><span className="text-yellow-500 font-black text-xs">{data.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Labels */}
      <div className="absolute -bottom-6 left-12 px-8 py-3 bg-yellow-500 text-red-900 font-black text-lg rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] skew-x-[-12deg] border-2 border-white/20 flex items-center gap-3">
        <Tv size={20} className="animate-pulse" /> 《{data.title}》
      </div>
      <div className="absolute bottom-4 right-12 flex gap-2">
        {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-yellow-600/20 border border-yellow-500/10"></div>)}
      </div>
    </div>
  );
};

export default OldTVPlayer;
