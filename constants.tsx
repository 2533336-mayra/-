
import { VideoData, EvolutionProgram, HumorType, Performer, Relation, MemeTrend } from './types';

export const HUMOR_COLORS: Record<HumorType, string> = {
  '语言包袱': '#df7a64',
  '人物反差': '#4fb389',
  '逻辑乌龙': '#468fb3',
  '民生吐槽': '#d6a154',
  '夸张视听': '#c75a5a',
};

const HUMOR_TYPES: HumorType[] = ['语言包袱', '人物反差', '逻辑乌龙', '民生吐槽', '夸张视听'];

/**
 * 导入用户提供的 1983 年节目数据
 */
const USER_RAW_DATA = [
  {
    "name": "逛厂甸",
    "year": 1983,
    "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]
  },
  {
    "name": "吃鸡",
    "year": 1983,
    "laughComposition": [
      { "typeId": "语言包袱", "percentage": 50 },
      { "typeId": "夸张视听", "percentage": 50 }
    ]
  },
  {
    "name": "杂技表演",
    "year": 1983,
    "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]
  },
  {
    "name": "弹钢琴",
    "year": 1983,
    "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 },
      { "typeId": "夸张视听", "percentage": 50 }]
  },
  {
    "name": "阿Q的独白",
    "year": 1983,
    "laughComposition": [
      { "typeId": "语言包袱", "percentage": 50 },
      { "typeId": "人物反差", "percentage": 50 }
    ]
  },
  {
    "name": "戏剧杂谈",
    "year": 1983,
    "laughComposition": [
      { "typeId": "语言包袱", "percentage": 100 }
    ]
  }
];

// 自动转换函数：将用户格式转换为系统内部格式，并过滤掉无效数据
const transformUserData = (raw: any[]): EvolutionProgram[] => {
  return raw
    .filter(item => item.laughComposition && item.laughComposition.length > 0)
    .map((item, idx) => ({
      id: `user-import-${idx}`,
      name: item.name,
      year: item.year,
      tags: item.tags || ['1983开元', '经典复刻'],
      composition: item.laughComposition.map((comp: any) => ({
        type: comp.typeId as HumorType,
        ratio: comp.percentage / 100
      }))
    }));
};

const generateEvolutionData = () => {
  const data: EvolutionProgram[] = [];
  const startYear = 1984; // 从1984年开始生成，避免与用户1983数据重叠
  const endYear = 2024;
  const totalItems = 390; 

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
    data.push({ 
      id: `prog-${i}`, 
      name: `节目 Archive #${1000 + i}`, 
      year, 
      tags: ['经典回响', '时代标签'].slice(0, 1 + Math.floor(Math.random() * 2)), 
      composition 
    });
  }
  return data;
};

// 合并用户导入数据与系统现有数据
export const EVOLUTION_DATA = [
  ...transformUserData(USER_RAW_DATA),
  ...generateEvolutionData()
];

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
  { id: 'PCJ', name: '潘长江', firstYear: 1992, totalWorks: 20, bio: '以其独特的表演风格深受喜爱。', quotes: ['浓缩的都是精华'], role: '奠基人' },
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
    totalData: 15620,
    points: Array.from({length: 60}, (_, i) => {
      const base = Math.sin(i / 10) * 50 + 100;
      return {
        date: `T${i}`,
        posts: i < 8 ? 600 - i * 60 : base + Math.random() * 20,
        likes: i < 8 ? 1500 - i * 150 : base * 2.5 + Math.random() * 50,
        comments: i < 8 ? 800 - i * 80 : base * 1.5 + Math.random() * 30
      };
    }),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', label: '2024.02：舞台穿帮，笑点元年' },
      { offset: 35, imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', label: '2024.06：全网二创，表情包霸屏' },
      { offset: 80, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800', label: '2025.01：官宣联动，情怀重构' }
    ]
  },
  {
    id: 'palace-wine',
    hashtag: '#宫廷玉液酒',
    period: '1996 - 2025',
    totalData: 48900,
    points: Array.from({length: 60}, (_, i) => {
      const spike = i % 15 === 0 ? 300 : 0;
      return {
        date: `T${i}`,
        posts: 50 + spike + Math.random() * 20,
        likes: 120 + spike * 3 + Math.random() * 50,
        comments: 70 + spike * 2 + Math.random() * 30
      };
    }),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800', label: '1996：赵老师首演，金句诞生' },
      { offset: 45, imageUrl: 'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?w=800', label: '2019：微博暗号，身份认同热搜' },
      { offset: 90, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800', label: '2025：跨世纪传承，经典永存' }
    ]
  },
  {
    id: 'shen-teng-lazy',
    hashtag: '#沈腾马丽组合',
    period: '2012 - 2025',
    totalData: 32450,
    points: Array.from({length: 60}, (_, i) => ({
      date: `T${i}`,
      posts: 100 + Math.sin(i / 5) * 40 + Math.random() * 10,
      likes: 250 + Math.sin(i / 5) * 100 + Math.random() * 30,
      comments: 150 + Math.sin(i / 5) * 60 + Math.random() * 20
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800', label: '2012：郝建登台，开启沈马时代' },
      { offset: 50, imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800', label: '2015：默契爆发，喜剧巅峰对决' },
      { offset: 95, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800', label: '2025：年度聚首，欢笑长尾延续' }
    ]
  }
];
