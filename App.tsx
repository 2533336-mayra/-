
import React, { useState } from 'react';
import { AppState } from './types';
import { VIDEOS } from './constants';
import FilmstripBackground from './components/FilmstripBackground';
import CursorMagnifier from './components/CursorMagnifier';
import StageCurtain from './components/StageCurtain';
import OldTVPlayer from './components/OldTVPlayer';
import { ArrowDown, Tv } from 'lucide-react';

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
          className="relative h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 bg-[#a00]"
          onClick={handleStart}
        >
          {/* Background consists of just the filmstrips on a plain red base */}
          <FilmstripBackground />
          
          <div className="z-10 text-center space-y-8 p-4 py-14 px-20">
            <div className="inline-block px-4 py-1.5 bg-yellow-500 text-red-950 text-[10px] font-black tracking-[0.6em] mb-4 uppercase rounded-full shadow-lg">
              Spring Festival Gala Humor Tracker
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
              春晚笑点<br/><span className="text-yellow-400">追综仪</span>
            </h1>
            <p className="text-xl text-yellow-100/90 font-medium tracking-widest max-w-2xl mx-auto italic font-cursive">
              追踪笑点的诞生、演化与社会回响
            </p>
            <div className="pt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-200/80 font-bold">点击任意区域开启追踪</span>
                <ArrowDown className="text-yellow-400" size={20} />
              </div>
            </div>
          </div>
          
          {/* Side accents */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-yellow-500/20"></div>
          <div className="absolute right-6 top-10 bottom-10 w-0.5 bg-yellow-500/20"></div>
        </div>
      )}

      {/* --- TRANSITION --- */}
      {state === AppState.TRANSITION && (
        <StageCurtain onOpened={handleCurtainOpened} />
      )}

      {/* --- CHAPTER ONE VIEW --- */}
      {state === AppState.CHAPTER_ONE && (
        <div className="min-h-screen bg-[#800] animate-in fade-in duration-1000">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-[#700]/95 backdrop-blur-2xl border-b border-yellow-500/20 py-5 px-10 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-yellow-500 rounded-xl shadow-lg shadow-yellow-500/20">
                    <Tv className="text-red-950" size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-white">第一篇章：笑点的“内源”</h2>
                    <p className="text-[10px] text-yellow-400/70 uppercase tracking-[0.3em] font-black">CHAPTER 01: ENDOGENOUS ORIGINS</p>
                </div>
            </div>
            <div className="hidden md:flex gap-10 text-[11px] font-black tracking-[0.2em] uppercase">
                <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1 cursor-pointer">内源机制</span>
                <span className="text-white/30 cursor-not-allowed">笑点演变</span>
            </div>
          </header>

          <main className="container mx-auto py-24 px-6">
            <div className="max-w-2xl mx-auto mb-24 text-center space-y-8">
                <p className="text-3xl leading-relaxed text-yellow-50/90 font-cursive">
                   那些让我们捧腹大笑的瞬间，并非由于简单的巧合。
                   <br/>在每一个经典的“包袱”背后，都隐藏着精密的幽默工程学。
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto shadow-sm"></div>
            </div>

            <div className="flex flex-col gap-40">
              {VIDEOS.map((video) => (
                <OldTVPlayer key={video.id} data={video} />
              ))}
            </div>
            
            <footer className="mt-48 text-center pb-24 opacity-40">
                <p className="text-[10px] tracking-[0.8em] uppercase text-yellow-200/60 font-black">更多历史记忆加载中</p>
                <div className="mt-6 flex justify-center gap-3">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-500/20"></div>)}
                </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
