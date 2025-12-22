
import { VideoData, EvolutionProgram, HumorType, Performer, Relation, MemeTrend } from './types';

export const HUMOR_COLORS: Record<HumorType, string> = {
  '语言包袱': '#df7a64',
  '人物反差': '#4fb389',
  '逻辑乌龙': '#468fb3',
  '民生吐槽': '#d6a154',
  '夸张视听': '#c75a5a',
};

const HUMOR_TYPES: HumorType[] = ['语言包袱', '人物反差', '逻辑乌龙', '民生吐槽', '夸张视听'];

const generateEvolutionData = () => {
  const data: EvolutionProgram[] = [];
  const startYear = 1983;
  const endYear = 2024;
  const totalItems = 824; 

  for (let i = 0; i < totalItems; i++) {
    const year = startYear + Math.floor((i / totalItems) * (endYear - startYear + 1));
    const typeCount = 1 + Math.floor(Math.random() * 2); 
    const composition = [];
    let remaining = 1;
    for (let j = 0; j < typeCount; j++) {
      const ratio = j === typeCount - 1 ? remaining : Math.random() * remaining;
      composition.push({
        type: HUMOR_TYPES[Math.floor(Math.random() * HUMOR_TYPES.length)],
        ratio: parseFloat(ratio.toFixed(2))
      });
      remaining -= ratio;
    }
    data.push({ id: `prog-${i}`, name: `节目 Archive #${1000 + i}`, year, tags: ['经典回响', '时代标签'].slice(0, 1 + Math.floor(Math.random() * 2)), composition });
  }
  return data;
};

export const EVOLUTION_DATA = generateEvolutionData();

export const VIDEOS: VideoData[] = [
  { id: 'yesterday-today-tomorrow', title: '昨天今天明天', type: '小品', videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', poster: 'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?w=800', humorPoints: [{ timestamp: 5, content: '我叫白云，我叫黑土', mechanism: '人物设定反差', analysis: '经典的农民形象与宏大的晚会舞台形成鲜明对比。' }] },
  { id: 'palace-wine-skit', title: '打工奇遇', type: '小品', videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', poster: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800', humorPoints: [{ timestamp: 10, content: '宫廷玉液酒', mechanism: '逻辑乌龙', analysis: '韵律感极强的台词，后来演变为全网暗号。' }] }
];

export const PERFORMERS: Performer[] = [
  { id: 'ZBS', name: '赵本山', firstYear: 1990, totalWorks: 21, bio: '春晚小品的灵魂人物。', quotes: ['要啥自行车'], role: '奠基人' },
  { id: 'SDD', name: '宋丹丹', firstYear: 1989, totalWorks: 10, bio: '塑造了白云等经典角色。', quotes: ['俺叫魏淑芬'], role: '奠基人' },
  { id: 'ZLR', name: '赵丽蓉', firstYear: 1988, totalWorks: 8, bio: '唐山老太太，经典的表演者。', quotes: ['探戈'], role: '奠基人' },
  { id: 'CM', name: '陈佩斯', firstYear: 1984, totalWorks: 11, bio: '擅长无实物表演。', quotes: ['你这浓眉大眼的'], role: '奠基人' },
  { id: 'ST', name: '沈腾', firstYear: 2012, totalWorks: 10, bio: '现代春晚喜剧中坚。', quotes: ['郝建'], role: '中坚' },
  { id: 'ML', name: '马丽', firstYear: 2013, totalWorks: 9, bio: '沈腾的最佳搭档。', quotes: ['我的妈呀'], role: '中坚' },
  { id: 'FG', name: '冯巩', firstYear: 1986, totalWorks: 33, bio: '我想死你们了。', quotes: ['我想死你们了'], role: '奠基人' },
  { id: 'NQ', name: '牛群', firstYear: 1987, totalWorks: 12, bio: '冯巩的最佳拍档。', quotes: ['点子公司'], role: '奠基人' },
  { id: 'GDL', name: '郭冬临', firstYear: 1993, totalWorks: 21, bio: '春晚“好男人”专业户。', quotes: ['有话好好说'], role: '中坚' },
  { id: 'XSY', name: '小沈阳', firstYear: 2009, totalWorks: 3, bio: '赵本山的弟子。', quotes: ['这个真没有'], role: '新锐' },
];

export const RELATIONS: Relation[] = [
  { source: 'ZBS', target: 'SDD', type: '搭档' },
  { source: 'ST', target: 'ML', type: '搭档' },
  { source: 'NQ', target: 'FG', type: '搭档' },
  { source: 'ZBS', target: 'XSY', type: '师徒' },
  { source: 'CM', target: 'ZBS', type: '传承' },
  { source: 'ZLR', target: 'GDL', type: '传承' },
];

export const TREND_DATA: MemeTrend[] = [
  {
    id: 'nigemaiti-fail',
    hashtag: '#尼格买提魔术失败',
    period: '2024.02 - 2025.12',
    totalData: 1560,
    points: Array.from({length: 40}, (_, i) => ({
      date: `T${i}`,
      posts: i < 5 ? 200 - i*20 : 20 + Math.random()*10,
      likes: i < 5 ? 500 - i*50 : 50 + Math.random()*30,
      comments: i < 5 ? 300 - i*30 : 30 + Math.random()*20
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500', label: '2024：魔术穿帮瞬间' },
      { offset: 40, imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500', label: '2024年中：全网表情包狂欢' },
      { offset: 85, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500', label: '2025：节目组官宣认梗，情怀重现' }
    ]
  },
  {
    id: 'palace-wine',
    hashtag: '#宫廷玉液酒',
    period: '1996 - 2025',
    totalData: 4890,
    points: Array.from({length: 40}, (_, i) => ({
      date: `T${i}`,
      posts: i % 10 === 0 ? 150 : 30 + Math.random()*10,
      likes: i % 10 === 0 ? 400 : 80 + Math.random()*20,
      comments: i % 10 === 0 ? 200 : 40 + Math.random()*15
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=500', label: '1996：赵老师首演经典' },
      { offset: 50, imageUrl: 'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?w=500', label: '2019：微博暗号热搜爆发' },
      { offset: 90, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500', label: '2025：跨越时代的文化烙印' }
    ]
  },
  {
    id: 'shen-teng-lazy',
    hashtag: '#沈腾马丽黄金搭档',
    period: '2012 - 2025',
    totalData: 3240,
    points: Array.from({length: 40}, (_, i) => ({
      date: `T${i}`,
      posts: 40 + Math.sin(i/5) * 20,
      likes: 100 + Math.sin(i/5) * 50,
      comments: 60 + Math.sin(i/5) * 30
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500', label: '2012：郝建初登场' },
      { offset: 45, imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=500', label: '2015：沈马组合确立地位' },
      { offset: 95, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500', label: '2025：年度喜剧神话延续' }
    ]
  }
];
