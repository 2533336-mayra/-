
import React, { useState } from 'react';
import { AppState } from './types';
import { VIDEOS } from './constants';
import FilmstripBackground from './components/FilmstripBackground';
import CursorMagnifier from './components/CursorMagnifier';
import StageCurtain from './components/StageCurtain';
import OldTVPlayer from './components/OldTVPlayer';
import { ArrowDown, Tv, Activity, ShieldCheck, Database } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);

  const handleStart = () => {
    setState(AppState.TRANSITION);
  };

  const handleCurtainOpened = () => {
    setState(AppState.CHAPTER_ONE);
  };

  return (
    <div className="relative min-h-screen cursor-none select-none">
      <CursorMagnifier />

      {/* --- HOME VIEW --- */}
      {state === AppState.HOME && (
        <div 
          className="relative h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 bg-black"
          onClick={handleStart}
        >
          {/* 背景胶片 */}
          <FilmstripBackground />
          
          {/* 追综仪 UI 叠加层 */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
             {/* 模拟扫描边框 */}
             <div className="absolute inset-10 border border-yellow-500/20 rounded-[4rem]"></div>
             <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-10 py-2 bg-yellow-500/10 backdrop-blur-md rounded-b-3xl border-x border-b border-yellow-500/30">
                <div className="flex items-center gap-2 text-[10px] font-black text-yellow-500/80 tracking-widest uppercase">
                   <Activity size={12} className="animate-pulse" /> System Active
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>
                <div className="text-[10px] font-black text-yellow-500/80 tracking-widest uppercase">
                   Humor Node Scanning...
                </div>
             </div>

             {/* 侧边数据流模拟 */}
             <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40">
                {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <div className="w-12 h-1 bg-yellow-500/50"></div>
                      <div className="text-[8px] font-mono text-yellow-500 uppercase">Track_{1083 + i}</div>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="z-30 text-center space-y-10 p-4 relative">
            <div className="inline-flex items-center gap-4 px-6 py-2 bg-red-950/60 border border-yellow-500/30 text-yellow-500 text-[11px] font-black tracking-[0.6em] mb-4 uppercase rounded-full shadow-2xl backdrop-blur-xl">
              <ShieldCheck size={16} /> Spring Festival Gala Humor Tracker
            </div>
            
            <div className="relative">
              <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.9]">
                春晚笑点<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">追综仪</span>
              </h1>
              {/* 装饰性括号 */}
              <div className="absolute -left-12 top-0 bottom-0 w-8 border-y-2 border-l-2 border-yellow-500/30 rounded-l-3xl"></div>
              <div className="absolute -right-12 top-0 bottom-0 w-8 border-y-2 border-r-2 border-yellow-500/30 rounded-r-3xl"></div>
            </div>

            <div className="space-y-4">
              <p className="text-2xl text-yellow-100/80 font-medium tracking-[0.3em] max-w-2xl mx-auto italic font-cursive">
                “ 跨越时空的幽默观测，解构笑声背后的逻辑 ”
              </p>
              <div className="flex justify-center items-center gap-4 text-yellow-500/40 font-mono text-[10px] uppercase tracking-widest">
                <Database size={12} /> Data Sync: 1983 - 2025
              </div>
            </div>

            <div className="pt-16 animate-bounce">
              <div className="flex flex-col items-center gap-3">
                <div className="px-6 py-2 border border-yellow-500/40 rounded-full text-[11px] uppercase tracking-[0.5em] text-yellow-400 font-black bg-yellow-500/5 backdrop-blur-sm">
                  点击开启笑点追踪
                </div>
                <ArrowDown className="text-yellow-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TRANSITION --- */}
      {state === AppState.TRANSITION && (
        <StageCurtain onOpened={handleCurtainOpened} />
      )}

      {/* --- CHAPTER ONE VIEW --- */}
      {state === AppState.CHAPTER_ONE && (
        <div className="min-h-screen bg-[#600] animate-in fade-in duration-1000">
          <header className="sticky top-0 z-50 bg-[#500]/95 backdrop-blur-3xl border-b border-yellow-500/20 py-6 px-10 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl">
                    <Tv className="text-red-950" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-white">第一篇章：笑点的“内源”</h2>
                    <p className="text-[10px] text-yellow-400/70 uppercase tracking-[0.4em] font-black">CHAPTER 01: ENDOGENOUS ORIGINS</p>
                </div>
            </div>
            <div className="hidden md:flex gap-12 text-[12px] font-black tracking-[0.25em] uppercase">
                <span className="text-yellow-400 border-b-4 border-yellow-500 pb-2 cursor-pointer">内源机制</span>
                <span className="text-white/20 cursor-not-allowed">笑点演变</span>
                <span className="text-white/20 cursor-not-allowed">社会回响</span>
            </div>
          </header>

          <main className="container mx-auto py-32 px-6">
            <div className="max-w-3xl mx-auto mb-32 text-center space-y-10 relative">
                {/* 装饰性背景字 */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
                   <span className="text-[20rem] font-black select-none">笑</span>
                </div>
                <p className="text-4xl leading-relaxed text-yellow-50/90 font-cursive px-10">
                   那些让我们捧腹大笑的瞬间，并非由于简单的巧合。
                   <br/><span className="text-yellow-400">在每一个经典的“包袱”背后，都隐藏着精密的幽默工程学。</span>
                </p>
                <div className="flex justify-center gap-2">
                   {[...Array(3)].map((_, i) => <div key={i} className="w-12 h-1 bg-yellow-500/30 rounded-full"></div>)}
                </div>
            </div>

            <div className="flex flex-col gap-56">
              {VIDEOS.map((video) => (
                <OldTVPlayer key={video.id} data={video} />
              ))}
            </div>
            
            <footer className="mt-64 text-center pb-32">
                <div className="inline-block p-10 border-2 border-yellow-500/10 rounded-[3rem]">
                   <p className="text-[12px] tracking-[1em] uppercase text-yellow-200/40 font-black mb-8">更多历史记忆加载中</p>
                   <div className="flex justify-center gap-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                   </div>
                </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
