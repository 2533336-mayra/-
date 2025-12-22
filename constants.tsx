
import { VideoData } from './types';

export const VIDEOS: VideoData[] = [
  {
    id: 'yesterday-today-tomorrow',
    title: '昨天，今天，明天',
    type: '小品',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    poster: 'assets/poster1.jpg', // 这里指向你本地的图片
    humorPoints: [
      {
        timestamp: 4,
        content: '白云：俺们隔壁那吴老二，瞅我一眼就浑身发抖。黑土：吴老二脑血栓，看谁都哆嗦。',
        mechanism: '“拆台”机制与预期违背',
        analysis: '白云基于虚荣心对现象进行浪漫化美化，黑土则提供冰冷的“客观事实”进行拆台。笑点在于观众从浪漫期待瞬间跌落到生理疾病的现实。'
      }
    ]
  },
  {
    id: 'cosmos-cigarettes',
    title: '宇宙牌香烟',
    type: '相声',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'assets/poster2.jpg',
    humorPoints: [
      {
        timestamp: 5,
        content: '“宇宙牌香烟，不仅能抽，还能治咳嗽！”',
        mechanism: '因果谬误与荒诞夸张',
        analysis: '香烟本是咳嗽的诱因，却被宣传为治疗手段。这种极致的逻辑倒置模拟了虚假广告的荒谬感。'
      }
    ]
  }
];
