
export enum AppState {
  HOME = 'HOME',
  TRANSITION_TO_CH1 = 'TRANSITION_TO_CH1',
  CHAPTER_ONE = 'CHAPTER_ONE',
  TRANSITION_TO_CH2 = 'TRANSITION_TO_CH2',
  CHAPTER_TWO = 'CHAPTER_TWO',
  TRANSITION_TO_CH3 = 'TRANSITION_TO_CH3',
  CHAPTER_THREE = 'CHAPTER_THREE'
}

export type SubTab = 'ORIGINS' | 'EVOLUTION' | 'CONSTELLATION' | 'NETWORK' | 'TRENDS';

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

export interface MemeImagePoint {
  offset: number; // 0-100
  imageUrl: string;
  label: string;
}

export interface TrendDataPoint {
  date: string;
  posts: number;    // 发帖数
  likes: number;    // 点赞数
  comments: number; // 评论量
}

export interface MemeTrend {
  id: string;
  hashtag: string;
  period: string;
  totalData: number;
  points: TrendDataPoint[];
  visualHistory: MemeImagePoint[];
}
