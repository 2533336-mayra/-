
import { VideoData, EvolutionProgram, HumorType, Performer, Relation, MemeTrend } from './types';

export const HUMOR_COLORS: Record<HumorType, string> = {
  '语言包袱': '#df7a64',
  '人物反差': '#4fb389',
  '逻辑乌龙': '#468fb3',
  '民生吐槽': '#d6a154',
  '夸张视听': '#c75a5a',
};

const HUMOR_TYPES: HumorType[] = ['语言包袱', '人物反差', '逻辑乌龙', '民生吐槽', '夸张视听'];

export const VIDEOS: VideoData[] = [
  { 
    id: 'skit-zlr', 
    title: '如此包装 (赵丽蓉/巩汉林)', 
    type: '小品', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
    poster: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800', 
    humorPoints: [
      { 
        timestamp: 15, 
        content: '我叫：麻辣鸡丝', 
        mechanism: '身份/语境错位', 
        analysis: '传统评剧艺人与现代说唱艺名的极端冲撞。这种“错位”机制瞬间解构了权威感，将高雅艺术与通俗文化强行对接，产生了第一波强烈的爆笑感。' 
      },
      {
        timestamp: 85,
        content: '探戈就是趟着走',
        mechanism: '肢体行为误导',
        analysis: '通过将复杂的西洋舞蹈简化为大白话式的“生活动作”，消解了观众对“高级感”的畏惧，利用这种降维打击式的理解产生幽默。'
      },
      {
        timestamp: 160,
        content: '这包装我不干了！',
        mechanism: '价值观冲突爆发',
        analysis: '笑点在这一刻升华为对过度商业化的辛辣讽刺，观众在欢笑中完成了对社会现象的共同审判。'
      }
    ] 
  },
  { 
    id: 'crosstalk-mj', 
    title: '五官争功 (马季/冯巩等)', 
    type: '相声', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    poster: 'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?w=800', 
    humorPoints: [
      { 
        timestamp: 22, 
        content: '没有我你能看清吗？', 
        mechanism: '拟人化视角偏差', 
        analysis: '眼睛的“傲慢”其实是职场分功心态的缩影。将器官人格化，让观众通过“五官”的争论看到自己生活中的影子，引发共鸣式幽默。' 
      },
      {
        timestamp: 95,
        content: '鼻子：我是中流砥柱',
        mechanism: '逻辑诡辩幽默',
        analysis: '利用荒谬的前提进行一本正经的推理。相声的“包袱”往往藏在严密的逻辑陷阱中，当陷阱被揭开时，观众会产生智力上的愉悦感。'
      },
      {
        timestamp: 185,
        content: '谁也离不开谁',
        mechanism: '荒诞结局收场',
        analysis: '这种笑点带有明显的寓言色彩，笑点在最后的一团乱麻中爆发，体现了语言艺术对复杂人际关系的解构。'
      }
    ] 
  },
  { 
    id: 'magic-lq', 
    title: '守岁共此时 (刘谦/尼格买提)', 
    type: '魔术', 
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
    poster: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', 
    humorPoints: [
      { 
        timestamp: 12, 
        content: '跟着刘谦动手指', 
        mechanism: '交互仪式感期待', 
        analysis: '通过全国观众的同步参与，建立了一个“期待场”。这种仪式感的建立是为了后续“惊喜”或“意外”的爆点做心理铺垫。' 
      },
      {
        timestamp: 65,
        content: '尼格买提牌没对上 (名场面)', 
        mechanism: '非预期性“翻车”', 
        analysis: '在追求极致精准的专业舞台上，一个极其真实的、无法掩饰的“尴尬瞬间”反而成为了最强的笑弹。这是从视觉奇观向即兴喜剧的瞬间转化。' 
      },
      {
        timestamp: 140,
        content: '小尼：牌收不回来了',
        mechanism: '后续社交解构',
        analysis: '笑点不仅停留在舞台。这一刻标志着该事件正式从“表演”演变为“梗”，社交媒体的二次创作赋予了它长久的生命力。'
      }
    ] 
  }
];

const USER_RAW_DATA = [
  { "name": "如此包装", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 70 }, { "typeId": "语言包袱", "percentage": 30 }] },
  { "name": "五官争功", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "守岁共此时", "year": 2024, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 80 }, { "typeId": "夸张视听", "percentage": 20 }] }
];

const transformUserData = (raw: any[]): EvolutionProgram[] => {
  return raw.map((item, idx) => ({
    id: `import-${idx}`,
    name: item.name,
    year: item.year,
    tags: [String(item.year), '核心案例'],
    composition: item.laughComposition.map((comp: any) => ({
      type: comp.typeId as HumorType,
      ratio: comp.percentage / 100
    }))
  }));
};

const generateRemainingData = (existingCount: number) => {
  const data: EvolutionProgram[] = [];
  const startYear = 1983;
  const endYear = 2025;
  const totalNeeded = 400;
  for (let i = existingCount; i < totalNeeded; i++) {
    const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
    data.push({ 
      id: `gen-${i}`, 
      name: `补充 Archive #${1000 + i}`, 
      year, 
      tags: ['归档数据'], 
      composition: [{ type: HUMOR_TYPES[Math.floor(Math.random() * HUMOR_TYPES.length)], ratio: 1.0 }]
    });
  }
  return data;
};

const processedData = transformUserData(USER_RAW_DATA);
export const EVOLUTION_DATA = [...processedData, ...generateRemainingData(processedData.length)];

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
    points: Array.from({length: 60}, (_, i) => ({
      date: `T${i}`,
      posts: i < 8 ? 600 - i * 60 : 100 + Math.random() * 20,
      likes: i < 8 ? 1500 - i * 150 : 250 + Math.random() * 50,
      comments: i < 8 ? 800 - i * 80 : 150 + Math.random() * 30
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', label: '2024.02：舞台穿帮，笑点元年' },
      { offset: 35, imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', label: '2024.06：全网二创，表情包霸屏' }
    ]
  }
];
