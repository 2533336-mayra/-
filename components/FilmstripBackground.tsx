
import React from 'react';

/**
 * 这里已将路径改为本地 assets 文件夹。
 * 请确保你在根目录下创建了 assets 文件夹，并将图片命名为对应的文件名（如 shot1.jpg）。
 * 支持 jpg, png, webp 等格式。
 */
const CHUNWAN_IMAGES = [
  'assets/shot1.jpg',  // 1. 赵丽蓉 & 巩汉林 - 《功夫令》 (“愣没截住我”)
  'assets/shot2.jpg',  // 2. 赵本山 & 宋丹丹 - 《昨天，今天，明天》
  'assets/shot3.jpg',  // 3. 2025 刘谦 - 魔术《守岁共此时》 (杯子互换)
  'assets/shot4.jpg',  // 4. 2025 沈腾 & 马丽 - 小品 (趴地经典笑点)
  'assets/shot5.jpg',  // 5. 2025 春晚 - 杂技/街舞动感舞台
  'assets/shot6.jpg',  // 6. 2013 冯巩 - 小品《我就这么个人》
  'assets/shot7.jpg',  // 7. 2013 郭德纲 & 于谦 - 相声《败家子》
  'assets/shot8.jpg',  // 8. 2013 春晚 - 经典群戏瞬间
  'assets/shot9.jpg',  // 9. 经典老胶片感 - 早期舞台表演
  'assets/shot10.jpg', // 10. 赵丽蓉经典瞬间 - 《打工奇遇》
  'assets/shot11.jpg', // 11. 赵本山经典瞬间 - 《卖拐/卖车》
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
      className={`flex bg-[#050505]/95 py-3.5 border-y-[10px] border-[#111] shadow-[0_30px_70px_rgba(0,0,0,0.8)] transition-all duration-700 hover:bg-black group/strip ${direction === 'right' ? 'animate-[scroll-film_linear_infinite]' : 'animate-[scroll-film_linear_infinite_reverse]'}`}
      style={{ animationDuration: speed }}
    >
      {[...Array(22)].map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-4 py-4">
          <div className="relative group/frame">
            <div 
              className="relative w-64 h-40 bg-black border-x border-white/10 mx-4 flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.75] hover:z-[100] hover:rotate-0 hover:shadow-[0_60px_120px_rgba(0,0,0,1),0_0_50px_rgba(234,179,8,0.6)] hover:border-yellow-500 cursor-none"
              style={{ transform: `rotate(${(i % 2 === 0 ? 0.7 : -0.7)}deg)` }}
            >
              {i % 7 === 0 ? (
                <div className="text-4xl font-mono font-black text-yellow-500/10 flex flex-col items-center justify-center border-2 border-yellow-500/5 rounded-full w-28 h-28 transition-all group-hover/frame:text-yellow-400 group-hover/frame:border-yellow-400 group-hover/frame:scale-105 group-hover/frame:bg-yellow-500/5">
                   <span className="text-[10px] tracking-[0.4em] opacity-30 uppercase mb-1">CCTV-SCAN</span>
                   {1983 + i}
                </div>
              ) : (
                <img 
                  src={CHUNWAN_IMAGES[i % CHUNWAN_IMAGES.length]} 
                  className="w-full h-full object-cover brightness-[0.4] contrast-[1.6] sepia-[0.7] grayscale-[0.3] transition-all duration-500 group-hover/frame:brightness-110 group-hover/frame:sepia-0 group-hover/frame:grayscale-0 group-hover/frame:scale-110"
                  alt={`Chunwan Moment ${i}`}
                  onError={(e) => {
                    // 如果图片加载失败（比如你还没放进去），显示一个占位背景
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=400';
                  }}
                />
              )}
              
              <div className="absolute top-2 left-0 right-0 flex justify-around px-4 z-10 opacity-30 group-hover/frame:opacity-100 transition-opacity">
                {[...Array(11)].map((_, idx) => <div key={idx} className="w-2.5 h-4.5 bg-black rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4 z-10 opacity-30 group-hover/frame:opacity-100 transition-opacity">
                {[...Array(11)].map((_, idx) => <div key={idx} className="w-2.5 h-4.5 bg-black rounded-[1px] shadow-inner border border-white/5"></div>)}
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover/frame:opacity-0"></div>
              <div className="absolute inset-0 bg-yellow-500/0 group-hover/frame:bg-yellow-500/5 transition-colors pointer-events-none"></div>
            </div>
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/frame:opacity-100 transition-all duration-300 translate-y-12 z-[110]">
               <div className="flex items-center gap-3 bg-red-950/95 border-2 border-yellow-500/80 backdrop-blur-2xl px-6 py-2.5 rounded-full shadow-[0_20px_60px_rgba(0,0,0,1)]">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping absolute"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 relative border-2 border-white/20"></div>
                  <span className="text-yellow-500 text-[13px] font-black uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-md">
                    HUMOR SIGNAL CAPTURED
                  </span>
               </div>
            </div>
          </div>
          
          <div className="w-8 h-full flex flex-col justify-around py-12 opacity-5 group-hover/strip:opacity-40 transition-opacity">
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full mx-auto shadow-[0_0_15px_rgba(234,179,8,0.8)] border border-yellow-500/20"></div>
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full mx-auto shadow-[0_0_15px_rgba(234,179,8,0.8)] border border-yellow-500/20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FilmstripBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#400]">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/90 pointer-events-none z-0"></div>
      
      <WindingStrip top="-10%" rotation={-7} direction="right" speed="95s" opacity={0.5} />
      <WindingStrip top="20%" rotation={2} direction="left" speed="150s" opacity={1} />
      <WindingStrip top="50%" rotation={-3} direction="right" speed="85s" opacity={1} />
      <WindingStrip top="80%" rotation={5} direction="left" speed="130s" opacity={0.5} />

      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-20 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/95 pointer-events-none z-15"></div>
      <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none z-25"></div>
    </div>
  );
};

export default FilmstripBackground;
