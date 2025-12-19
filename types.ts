
export enum AppState {
  HOME = 'HOME',
  TRANSITION = 'TRANSITION',
  CHAPTER_ONE = 'CHAPTER_ONE'
}

export interface HumorPoint {
  timestamp: number; // in seconds
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
