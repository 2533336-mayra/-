
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
          className="relative h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 bg-gradient-to-b from-[#800000] to-[#b22222]"
          onClick={handleStart}
        >
          <FilmstripBackground />
          <div className="z-10 text-center space-y-8 p-4">
            <div className="inline-block px-4 py-1 bg-yellow-500 text-red-900 text-xs font-bold tracking-[0.5em] mb-4 uppercase rounded-sm shadow-lg">
              Spring Festival Gala Humor Tracker
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              春晚笑点<br/><span className="text-yellow-400">追综仪</span>
            </h1>
            <p className="text-xl text-white/80 font-medium tracking-widest max-w-2xl mx-auto italic font-cursive">
              追踪笑点的诞生、演化与社会回响
            </p>
            <div className="pt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-yellow-200/60 font-bold">点击任意区域开启</span>
                <ArrowDown className="text-yellow-400" />
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around py-4 border-r border-yellow-500/20">
            {[...Array(20)].map((_, i) => <div key={i} className="w-4 h-6 bg-red-900 border border-yellow-500/30 mx-auto"></div>)}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-around py-4 border-l border-yellow-500/20">
            {[...Array(20)].map((_, i) => <div key={i} className="w-4 h-6 bg-red-900 border border-yellow-500/30 mx-auto"></div>)}
          </div>
        </div>
      )}

      {/* --- TRANSITION --- */}
      {state === AppState.TRANSITION && (
        <StageCurtain onOpened={handleCurtainOpened} />
      )}

      {/* --- CHAPTER ONE VIEW --- */}
      {state === AppState.CHAPTER_ONE && (
        <div className="min-h-screen bg-[#990000] animate-in fade-in duration-1000">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-[#800000]/90 backdrop-blur-xl border-b border-yellow-500/20 py-6 px-12 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-500 rounded-lg">
                    <Tv className="text-red-900" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-white">第一篇章：笑点的“内源”</h2>
                    <p className="text-xs text-yellow-400/60 uppercase tracking-widest font-bold">CHAPTER 01: ENDOGENOUS ORIGINS</p>
                </div>
            </div>
            {/* Updated navigation with only two buttons */}
            <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
                <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1 cursor-pointer">内源机制</span>
                <span className="text-white/40 cursor-not-allowed">笑点演变</span>
            </div>
          </header>

          <main className="container mx-auto py-20 px-4">
            <div className="max-w-3xl mx-auto mb-20 text-center space-y-6">
                <p className="text-2xl leading-relaxed text-yellow-100 font-cursive">
                   那些让我们捧腹大笑的瞬间，并非由于简单的巧合。
                   <br/>在每一个经典的“包袱”背后，都隐藏着精密的幽默工程学。
                </p>
                <div className="w-32 h-1 bg-yellow-500 mx-auto shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>

            <div className="flex flex-col gap-32">
              {VIDEOS.map((video) => (
                <OldTVPlayer key={video.id} data={video} />
              ))}
            </div>
            
            <footer className="mt-40 text-center pb-20 opacity-40">
                <p className="text-xs tracking-[0.5em] uppercase text-yellow-200">更多历史记忆加载中...</p>
                <div className="mt-4 flex justify-center gap-4">
                    {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-500/30"></div>)}
                </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
