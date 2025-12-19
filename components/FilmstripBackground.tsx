
import React from 'react';

// 本地图片映射表
const LOCAL_ASSETS = [
  'assets/shot1.jpg', 'assets/shot2.jpg', 'assets/shot3.jpg', 
  'assets/shot4.jpg', 'assets/shot5.jpg', 'assets/shot6.jpg', 
  'assets/shot7.jpg', 'assets/shot8.jpg', 'assets/shot9.jpg', 
  'assets/shot10.jpg', 'assets/shot11.jpg'
];

// 云端备选图（春晚/舞台/喜剧相关），确保在本地 assets 缺失时依然有精美封面
const CLOUD_FALLBACKS = [
  'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?q=80&w=800', // 舞台
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800', // 表演
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800', // 魔术质感
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800', // 剧院
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800', // 欢庆
  'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=800', // 复古
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800', // 聚光灯
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800', // 盛会
];

interface WindingStripProps {
  top: string;
  rotation: number;
  direction: 'left' | 'right';
  speed: string;
  opacity: number;
}

const WindingStrip: React.FC<WindingStripProps> = ({ top, rotation, direction, speed, opacity }) => (
  <div 
    className="absolute left-[-20%] w-[140%] h-48 select-none z-10"
    style={{ 
      top, 
      transform: `rotate(${rotation}deg)`,
      opacity,
      animation: 'drift 45s ease-in-out infinite alternate',
      '--base-rotation': `${rotation}deg`
    } as React.CSSProperties}
  >
    <div 
      className={`flex bg-[#050505]/95 py-3.5 border-y-[10px] border-[#222] shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-700 hover:bg-black group/strip ${direction === 'right' ? 'animate-[scroll-film_linear_infinite]' : 'animate-[scroll-film_linear_infinite_reverse]'}`}
      style={{ animationDuration: speed }}
    >
      {[...Array(24)].map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-4 py-4">
          <div className="relative group/frame">
            <div 
              className="relative w-64 h-40 bg-[#111] border-x border-white/5 mx-4 flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.8] hover:z-[100] hover:rotate-0 hover:shadow-[0_60px_120px_rgba(0,0,0,1),0_0_60px_rgba(234,179,8,0.7)] hover:border-yellow-500 cursor-none"
              style={{ transform: `rotate(${(i % 2 === 0 ? 0.8 : -0.8)}deg)` }}
            >
              {i % 8 === 0 ? (
                <div className="text-4xl font-mono font-black text-yellow-500/10 flex flex-col items-center justify-center border-2 border-yellow-500/5 rounded-2xl w-32 h-32 transition-all group-hover/frame:text-yellow-400 group-hover/frame:border-yellow-400 group-hover/frame:scale-110">
                   <span className="text-[9px] tracking-[0.5em] opacity-30 uppercase mb-2">NODE-SYS</span>
                   {1983 + i}
                </div>
              ) : (
                <img 
                  src={LOCAL_ASSETS[i % LOCAL_ASSETS.length]} 
                  className="w-full h-full object-cover brightness-[0.35] contrast-[1.6] sepia-[0.6] grayscale-[0.2] transition-all duration-700 group-hover/frame:brightness-110 group-hover/frame:sepia-0 group-hover/frame:grayscale-0 group-hover/frame:scale-115"
                  alt={`Moment ${i}`}
                  onError={(e) => {
                    // 核心修复：如果本地 assets 没准备好，自动回退到云端图
                    (e.target as HTMLImageElement).src = CLOUD_FALLBACKS[i % CLOUD_FALLBACKS.length];
                  }}
                />
              )}
              
              {/* 胶片装饰细节 */}
              <div className="absolute top-2 left-0 right-0 flex justify-around px-4 z-10 opacity-20 group-hover/frame:opacity-100">
                {[...Array(10)].map((_, idx) => <div key={idx} className="w-2.5 h-4 bg-black rounded-sm border border-white/5"></div>)}
              </div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4 z-10 opacity-20 group-hover/frame:opacity-100">
                {[...Array(10)].map((_, idx) => <div key={idx} className="w-2.5 h-4 bg-black rounded-sm border border-white/5"></div>)}
              </div>

              {/* 实时追踪扫描线 */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent h-1/4 w-full -translate-y-full group-hover/frame:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
            </div>
            
            {/* 追踪信号标签 */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/frame:opacity-100 transition-all duration-300 translate-y-12 z-[110]">
               <div className="flex items-center gap-3 bg-black/90 border border-yellow-500/50 backdrop-blur-xl px-5 py-2 rounded-full shadow-2xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                  <span className="text-yellow-500 text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                    SIGNAL DETECTED
                  </span>
               </div>
            </div>
          </div>
          
          <div className="w-10 h-full flex flex-col justify-around py-12 opacity-5 group-hover/strip:opacity-30 transition-opacity">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mx-auto"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FilmstripBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#200]">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black pointer-events-none z-0 opacity-80"></div>
      
      {/* 多层级胶片带 */}
      <WindingStrip top="-5%" rotation={-6} direction="right" speed="110s" opacity={0.4} />
      <WindingStrip top="22%" rotation={2} direction="left" speed="160s" opacity={0.9} />
      <WindingStrip top="52%" rotation={-2} direction="right" speed="100s" opacity={0.9} />
      <WindingStrip top="82%" rotation={4} direction="left" speed="140s" opacity={0.4} />

      {/* 噪点与模拟屏幕效果 */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* 暗角 */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black pointer-events-none z-15"></div>
    </div>
  );
};

export default FilmstripBackground;
