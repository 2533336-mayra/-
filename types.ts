
export enum AppState {
  HOME = 'HOME',
  TRANSITION_TO_CH1 = 'TRANSITION_TO_CH1',
  CHAPTER_ONE = 'CHAPTER_ONE',
  TRANSITION_TO_CH2 = 'TRANSITION_TO_CH2',
  CHAPTER_TWO = 'CHAPTER_TWO'
}

export type SubTab = 'ORIGINS' | 'EVOLUTION' | 'CONSTELLATION' | 'NETWORK';

export interface HumorPoint {
  timestamp: number;
  content: string;
  mechanism: string;
  analysis: string;
}

export interface VideoData {
  id: string;
  title: string;
  type: '小品' | '相声' | '魔术';
  videoUrl: string;
  poster: string;
  humorPoints: HumorPoint[];
}

export interface EvolutionProgram {
  id: string;
  name: string;
  year: number;
  tags: string[];
  composition: {
    type: HumorType;
    ratio: number;
  }[];
}

// Fix: Corrected '夸张试听' to '夸张视听' to match the term for visual/audio performance and usage in constants.tsx
export type HumorType = '语言包袱' | '人物反差' | '逻辑乌龙' | '民生吐槽' | '夸张视听';

export interface Performer {
  id: string;
  name: string;
  firstYear: number;
  totalWorks: number;
  bio: string;
  quotes: string[];
  role: '奠基人' | '中坚' | '新锐';
}

export interface Relation {
  source: string;
  target: string;
  type: '搭档' | '师徒' | '传承';
}
