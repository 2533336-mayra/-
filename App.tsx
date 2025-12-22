
import React, { useState } from 'react';
import { AppState, SubTab } from './types';
import { VIDEOS } from './constants';
import FilmstripBackground from './components/FilmstripBackground';
import CursorMagnifier from './components/CursorMagnifier';
import StageCurtain from './components/StageCurtain';
import OldTVPlayer from './components/OldTVPlayer';
import HumorEvolutionGrid from './components/HumorEvolutionGrid';
import BigDipperConstellation from './components/BigDipperConstellation';
import InheritanceNetwork from './components/InheritanceNetwork';
import { ArrowDown, Tv, BarChart3, Radio, Sparkles, Network, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [activeTab, setActiveTab] = useState<SubTab>('ORIGINS');

  const handleStart = () => setState(AppState.TRANSITION_TO_CH1);
  const handleToChapterTwo = () => setState(AppState.TRANSITION_TO_CH2);

  const handleCurtainOpened = () => {
    if (state === AppState.TRANSITION_TO_CH1) {
      setState(AppState.CHAPTER_ONE);
      setActiveTab('ORIGINS');
    } else if (state === AppState.TRANSITION_TO_CH2) {
      setState(AppState.CHAPTER_TWO);
      setActiveTab('CONSTELLATION');
    }
  };

  return (
    <div className="relative min-h-screen cursor-none select-none overflow-x-hidden">
      <CursorMagnifier />

      {/* --- HOME VIEW --- */}
      {state === AppState.HOME && (
        <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 bg-[#a00]" onClick={handleStart}>
          <FilmstripBackground />
          <div className="z-10 text-center space-y-8 p-4 py-14 px-20">
            <div className="inline-block px-4 py-1.5 bg-yellow-500 text-red-950 text-[10px] font-black tracking-[0.6em] mb-4 uppercase rounded-full shadow-lg">Spring Festival Gala Humor Tracker</div>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">春晚笑点<br/><span className="text-yellow-400">追综仪</span></h1>
            <p className="text-xl text-yellow-100/90 font-medium tracking-widest max-w-2xl mx-auto italic font-cursive">追踪笑点的诞生、演化与社会回响</p>
            <div className="pt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-200/80 font-bold">点击开启追踪</span>
                <ArrowDown className="text-yellow-400" size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TRANSITION --- */}
      {(state === AppState.TRANSITION_TO_CH1 || state === AppState.TRANSITION_TO_CH2) && (
        <StageCurtain key={state} onOpened={handleCurtainOpened} />
      )}

      {/* --- CHAPTER ONE VIEW --- */}
      {state === AppState.CHAPTER_ONE && (
        <div className="min-h-screen bg-[#800] animate-in fade-in duration-1000">
          <header className="sticky top-0 z-50 bg-[#700]/95 backdrop-blur-2xl border-b border-yellow-500/20 py-5 px-10 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-yellow-500 rounded-xl shadow-lg shadow-yellow-500/20"><Tv className="text-red-950" size={22} /></div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-white">{activeTab === 'ORIGINS' ? '第一篇章：笑点的“内源”' : '第一篇章：笑点的“演变”'}</h2>
                    <p className="text-[10px] text-yellow-400/70 uppercase tracking-[0.3em] font-black">CHAPTER 01: ORIGINS & EVOLUTION</p>
                </div>
            </div>
            <div className="hidden md:flex gap-10 text-[11px] font-black tracking-[0.2em] uppercase">
                <button onClick={() => setActiveTab('ORIGINS')} className={`flex items-center gap-2 pb-1 transition-all ${activeTab === 'ORIGINS' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/40 hover:text-white'}`}><Radio size={14} /> 内源机制</button>
                <button onClick={() => setActiveTab('EVOLUTION')} className={`flex items-center gap-2 pb-1 transition-all ${activeTab === 'EVOLUTION' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/40 hover:text-white'}`}><BarChart3 size={14} /> 笑点演变</button>
            </div>
          </header>

          <main className="container mx-auto py-24 px-6 min-h-screen">
            {activeTab === 'ORIGINS' ? (
              <div className="animate-in fade-in duration-700">
                <div className="max-w-2xl mx-auto mb-24 text-center space-y-8">
                    <p className="text-3xl leading-relaxed text-yellow-50/90 font-cursive">经典的“包袱”背后，都隐藏着精密的幽默工程学。</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto"></div>
                </div>
                <div className="flex flex-col gap-40">{VIDEOS.map((video) => (<OldTVPlayer key={video.id} data={video} />))}</div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-700 relative">
                <HumorEvolutionGrid />
                {/* Switch to Ch2 Button */}
                <div className="mt-40 text-center">
                   <button 
                    onClick={handleToChapterTwo}
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-yellow-500 text-red-950 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 transition-all"
                   >
                     <span>开启第二篇章：笑点的“推手”</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                     <div className="absolute inset-0 border-2 border-white/20 rounded-2xl animate-pulse pointer-events-none"></div>
                   </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* --- CHAPTER TWO VIEW --- */}
      {state === AppState.CHAPTER_TWO && (
        <div className="min-h-screen bg-[#020202] animate-in fade-in duration-1000">
          <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5 py-5 px-10 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-red-700 rounded-xl shadow-lg shadow-red-700/20"><Sparkles className="text-white" size={22} /></div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-white">{activeTab === 'CONSTELLATION' ? '第二篇章：人物篇 · 北斗七星' : '第二篇章：人物篇 · 传承网'}</h2>
                    <p className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-black">CHAPTER 02: SHAPERS OF HUMOR</p>
                </div>
            </div>
            <div className="hidden md:flex gap-10 text-[11px] font-black tracking-[0.2em] uppercase">
                <button onClick={() => setActiveTab('CONSTELLATION')} className={`flex items-center gap-2 pb-1 transition-all ${activeTab === 'CONSTELLATION' ? 'text-red-500 border-b-2 border-red-500' : 'text-white/40 hover:text-white'}`}><Sparkles size={14} /> 北斗七星</button>
                <button onClick={() => setActiveTab('NETWORK')} className={`flex items-center gap-2 pb-1 transition-all ${activeTab === 'NETWORK' ? 'text-red-500 border-b-2 border-red-500' : 'text-white/40 hover:text-white'}`}><Network size={14} /> 传承网脉</button>
            </div>
          </header>

          <main className="container mx-auto py-24 px-6 min-h-screen">
            <div className="max-w-3xl mx-auto mb-20 text-center space-y-6">
                <h2 className="text-5xl font-black text-white italic tracking-tighter">幽默的火炬，在星辰间传递。</h2>
                <p className="text-xl text-white/60 font-medium">寻找那些编织快乐的人，探寻他们如何塑造一个时代的集体记忆。</p>
            </div>
            {activeTab === 'CONSTELLATION' ? <BigDipperConstellation /> : <InheritanceNetwork />}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
