
import { VideoData, EvolutionProgram, HumorType, Performer, Relation } from './types';

export const HUMOR_COLORS: Record<HumorType, string> = {
  '语言包袱': '#df7a64',
  '人物反差': '#4fb389',
  '逻辑乌龙': '#468fb3',
  '民生吐槽': '#d6a154',
  '夸张视听': '#c75a5a',
};

export const VIDEOS: VideoData[] = [
  {
    id: 'yesterday-today-tomorrow',
    title: '昨天，今天，明天',
    type: '小品',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    poster: 'assets/poster1.jpg',
    humorPoints: [
      {
        timestamp: 4,
        content: '白云：俺们隔壁那吴老二，瞅我一眼就浑身发抖。黑土：吴老二脑血栓，看谁都哆嗦。',
        mechanism: '“拆台”机制与预期违背',
        analysis: '白云基于虚荣心对现象进行浪漫化美化，黑土则提供冰冷的“客观事实”进行拆台。'
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
        analysis: '香烟本是咳嗽的诱因，却被宣传为治疗手段。'
      }
    ]
  }
];

export const EVOLUTION_DATA: EvolutionProgram[] = [
  { id: '1', name: '吃面条', year: 1984, tags: ['滑稽无声', '肢体夸张'], composition: [{type: '夸张视听', ratio: 0.7}, {type: '人物反差', ratio: 0.3}] },
  { id: '2', name: '拍电影', year: 1985, tags: ['职场吐槽', '逻辑错位'], composition: [{type: '民生吐槽', ratio: 0.4}, {type: '逻辑乌龙', ratio: 0.6}] },
  { id: '3', name: '胡椒面', year: 1989, tags: ['生活细节', '无声喜剧'], composition: [{type: '夸张视听', ratio: 0.8}, {type: '语言包袱', ratio: 0.2}] },
  { id: '4', name: '相亲', year: 1990, tags: ['方言幽默', '错位身份'], composition: [{type: '语言包袱', ratio: 0.5}, {type: '人物反差', ratio: 0.5}] },
  { id: '5', name: '主角与配角', year: 1990, tags: ['权力倒置', '经典解构'], composition: [{type: '人物反差', ratio: 0.9}, {type: '语言包袱', ratio: 0.1}] },
  { id: '6', name: '打扑克', year: 1994, tags: ['社会讽刺', '职业隐喻'], composition: [{type: '民生吐槽', ratio: 0.7}, {type: '逻辑乌龙', ratio: 0.3}] },
  { id: '7', name: '如此包装', year: 1995, tags: ['代际冲突', '新旧对抗'], composition: [{type: '人物反差', ratio: 0.6}, {type: '语言包袱', ratio: 0.4}] },
  { id: '8', name: '机器人趣话', year: 1996, tags: ['科幻狂想', '刻板印象'], composition: [{type: '逻辑乌龙', ratio: 0.5}, {type: '人物反差', ratio: 0.5}] },
  { id: '9', name: '打工奇遇', year: 1996, tags: ['物价讽刺', '说唱结合'], composition: [{type: '民生吐槽', ratio: 0.6}, {type: '语言包袱', ratio: 0.4}] },
  { id: '10', name: '鞋儿口', year: 1997, tags: ['模仿秀', '舞台调度'], composition: [{type: '夸张视听', ratio: 0.7}, {type: '人物反差', ratio: 0.3}] },
  { id: '11', name: '昨天今天明天', year: 1999, tags: ['乡土本色', '虚荣解构'], composition: [{type: '语言包袱', ratio: 0.7}, {type: '人物反差', ratio: 0.3}] },
  { id: '12', name: '钟点工', year: 2000, tags: ['孤独解构', '经典金句'], composition: [{type: '语言包袱', ratio: 0.8}, {type: '民生吐槽', ratio: 0.2}] },
  { id: '13', name: '卖拐', year: 2001, tags: ['忽悠逻辑', '心理误导'], composition: [{type: '逻辑乌龙', ratio: 0.8}, {type: '人物反差', ratio: 0.2}] },
  { id: '14', name: '卖车', year: 2002, tags: ['逻辑陷阱', '智商优越'], composition: [{type: '逻辑乌龙', ratio: 0.7}, {type: '语言包袱', ratio: 0.3}] },
  { id: '15', name: '心病', year: 2003, tags: ['心理咨询', '金钱观'], composition: [{type: '语言包袱', ratio: 0.6}, {type: '人物反差', ratio: 0.4}] },
  { id: '16', name: '装修', year: 2005, tags: ['邻里冲突', '一人多角'], composition: [{type: '夸张视听', ratio: 0.5}, {type: '人物反差', ratio: 0.5}] },
  { id: '17', name: '不差钱', year: 2009, tags: ['身份焦虑', '反向潜规则'], composition: [{type: '人物反差', ratio: 0.7}, {type: '语言包袱', ratio: 0.3}] },
  { id: '18', name: '一句话的事儿', year: 2010, tags: ['人际谎言', '夫妻相处'], composition: [{type: '民生吐槽', ratio: 0.8}, {type: '语言包袱', ratio: 0.2}] },
  { id: '19', name: '今天的幸福', year: 2012, tags: ['穿越设定', '郝建语录'], composition: [{type: '逻辑乌龙', ratio: 0.6}, {type: '人物反差', ratio: 0.4}] },
  { id: '20', name: '扶不扶', year: 2014, tags: ['碰瓷社会学', '正能量讽刺'], composition: [{type: '民生吐槽', ratio: 0.9}, {type: '语言包袱', ratio: 0.1}] },
  { id: '21', name: '投其所好', year: 2015, tags: ['反腐题材', '马屁经'], composition: [{type: '人物反差', ratio: 0.5}, {type: '民生吐槽', ratio: 0.5}] },
  { id: '22', name: '真假老师', year: 2018, tags: ['教育焦虑', '错位认亲'], composition: [{type: '逻辑乌龙', ratio: 0.7}, {type: '语言包袱', ratio: 0.3}] },
  { id: '23', name: '占座', year: 2019, tags: ['校园霸凌', '阶级对比'], composition: [{type: '人物反差', ratio: 0.8}, {type: '民生吐槽', ratio: 0.2}] },
  { id: '24', name: '婆婆妈妈', year: 2020, tags: ['家庭主旋律', '误会升级'], composition: [{type: '逻辑乌龙', ratio: 0.6}, {type: '夸张视听', ratio: 0.4}] },
  { id: '25', name: '开往春天的幸福', year: 2021, tags: ['高铁文化', '恋爱烦恼'], composition: [{type: '民生吐槽', ratio: 0.7}, {type: '语言包袱', ratio: 0.3}] },
  { id: '26', name: '父与子', year: 2022, tags: ['元宇宙嘲讽', '代沟'], composition: [{type: '逻辑乌龙', ratio: 0.5}, {type: '民生吐槽', ratio: 0.5}] },
  { id: '27', name: '坑', year: 2023, tags: ['躺平干部', '官僚主义'], composition: [{type: '民生吐槽', ratio: 0.9}, {type: '人物反差', ratio: 0.1}] },
  { id: '28', name: '那能一样吗', year: 2024, tags: ['双标母亲', 'Z世代对抗'], composition: [{type: '人物反差', ratio: 0.6}, {type: '语言包袱', ratio: 0.4}] },
  { id: '29', name: '不理解', year: 2024, tags: ['职场黑话', '社畜共鸣'], composition: [{type: '语言包袱', ratio: 0.8}, {type: '逻辑乌龙', ratio: 0.2}] },
  { id: '30', name: '团团圆圆', year: 2024, tags: ['大合唱结尾', '情感共振'], composition: [{type: '夸张视听', ratio: 0.9}, {type: '人物反差', ratio: 0.1}] }
];

export const PERFORMERS: Performer[] = [
  { id: 'ZBS', name: '赵本山', firstYear: 1990, totalWorks: 21, bio: '被誉为“小品王”，以充满黑土地气息的幽默风格统治春晚舞台二十余载。', quotes: ['秋波就是秋天的菠菜', '没事走两步', '这个可以有'], role: '奠基人' },
  { id: 'FG', name: '冯巩', firstYear: 1986, totalWorks: 33, bio: '“我想死你们了！”这句开场白见证了相声小品化到泛幽默化的完整历程。', quotes: ['我想死你们了', '您呐，就别拿我开心了'], role: '奠基人' },
  { id: 'CM', name: '蔡明', firstYear: 1991, totalWorks: 28, bio: '从活泼少女到“毒舌女王”，她是春晚舞台上的百变笑匠。', quotes: ['颜值越高，责任越大', '都是千年的狐狸，玩什么聊斋啊'], role: '奠基人' },
  { id: 'PCJ', name: '潘长江', firstYear: 1992, totalWorks: 20, bio: '娇小身材蕴含巨大能量，他的作品常聚焦小人物的坚韧与幽默。', quotes: ['浓缩的都是精华', '哪怕只有五厘米的尊严'], role: '奠基人' },
  { id: 'GDL', name: '郭冬临', firstYear: 1993, totalWorks: 22, bio: '以其标志性的光头和“好男人”形象，通过日常生活细节触动笑点。', quotes: ['一句话能成事，一句话能坏事'], role: '奠基人' },
  { id: 'SDD', name: '宋丹丹', firstYear: 1989, totalWorks: 10, bio: '不仅是“白云”，更是无数经典角色的塑造者，表演极具感染力。', quotes: ['我叫魏淑芬，女，29岁，至今未婚'], role: '奠基人' },
  { id: 'ZLR', name: '赵丽蓉', firstYear: 1988, totalWorks: 8, bio: '春晚舞台永远的老艺术家，在唱跳与幽默中展现平凡人的智慧。', quotes: ['探戈儿就是蹚啊蹚着走', '宫廷玉液酒，一百八一杯'], role: '奠基人' },
  { id: 'ST', name: '沈腾', firstYear: 2012, totalWorks: 11, bio: '“郝建”之后，他开启了春晚小品的新喜剧时代，风格荒诞而深刻。', quotes: ['打败你的不是天真，是无鞋'], role: '中坚' },
  { id: 'XSY', name: '小沈阳', firstYear: 2009, totalWorks: 3, bio: '凭借《不差钱》一夜成名，展现了东北地方艺术在春晚的爆发力。', quotes: ['人这一生可短暂了，眼睛一闭一睁，一天过去了'], role: '新锐' },
  { id: 'NQ', name: '牛群', firstYear: 1988, totalWorks: 12, bio: '与冯巩组成的黄金搭档，是无数人心目中相声辉煌时代的代表。', quotes: ['领导，冒号！'], role: '奠基人' }
];

export const RELATIONS: Relation[] = [
  { source: 'ZBS', target: 'SDD', type: '搭档' },
  { source: 'ZBS', target: 'XSY', type: '师徒' },
  { source: 'FG', target: 'NQ', type: '搭档' },
  { source: 'CM', target: 'PCJ', type: '搭档' },
  { source: 'ZBS', target: 'GDL', type: '搭档' },
  { source: 'ST', target: 'CM', type: '传承' }
];
