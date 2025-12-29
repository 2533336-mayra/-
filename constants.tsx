
import { VideoData, EvolutionProgram, HumorType, Performer, Relation, MemeTrend } from './types';

export const HUMOR_COLORS: Record<HumorType, string> = {
  '语言包袱': '#fb7185', // 柔红 (Rose)
  '人物反差': '#34d399', // 翠绿 (Emerald)
  '逻辑乌龙': '#38bdf8', // 蔚蓝 (Sky)
  '民生吐槽': '#fbbf24', // 琥珀 (Amber)
  '夸张视听': '#818cf8', // 靛青 (Indigo)
  '无': '#334155',       // 板岩 (Slate)
  '其他': '#475569',     // 灰蓝
};

const HUMOR_TYPES: HumorType[] = ['语言包袱', '人物反差', '逻辑乌龙', '民生吐槽', '夸张视听', '无'];

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
        analysis: '传统评剧艺人与现代说唱艺名的极端冲撞。这种“错位”机制瞬间解构了权威感，将高雅艺术与通俗文化强行对接。' 
      },
      {
        timestamp: 85, 
        content: '探戈就是趟着走', 
        mechanism: '肢体行为误导', 
        analysis: '通过将复杂的西洋舞蹈简化为大白话式的“生活动作”，消解了观众对“高级感”的畏惧，实现艺术生活化。' 
      },
      {
        timestamp: 160, 
        content: '点头像吃面条', 
        mechanism: '急智错误解构', 
        analysis: '通过对表演错误的“合理化”强行解释，将舞台尴尬转化为即兴包袱，利用观众对艺人笨拙感的同情产生意外笑料。' 
      }
    ],
    wordCloud: [
      { text: '身份错位', weight: 10 },
      { text: '社会讽刺', weight: 8 },
      { text: '生活解构', weight: 9 },
      { text: '肢体喜剧', weight: 8 }
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
        analysis: '眼睛的“傲慢”其实是职场分功心态的缩影。将器官人格化，让观众产生智力上的愉悦感。' 
      },
      { 
        timestamp: 110, 
        content: '那是你没长在好地方', 
        mechanism: '空间逻辑讽刺', 
        analysis: '器官位次的尊卑讨论，折射出社会中“排资论辈”的陈旧观念，通过逻辑的荒诞推导实现讽刺。' 
      },
      { 
        timestamp: 215, 
        content: '我是脑袋，我掐谁谁疼', 
        mechanism: '权力结构降维', 
        analysis: '脑袋作为中枢系统的最终裁决力带来的幽默压制，利用等级关系的极端冲突实现剧场解脱。' 
      }
    ],
    wordCloud: [
      { text: '语言节奏', weight: 10 },
      { text: '谐音误会', weight: 7 },
      { text: '三番四抖', weight: 9 }
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
        timestamp: 65, 
        content: '尼格买提牌没对上 (名场面)', 
        mechanism: '非预期性“穿帮”', 
        analysis: '在追求极致精准的专业舞台上，一个极其真实的尴尬瞬间成为了最强的笑点。这种“真实感”往往比设计好的台词更有生命力。' 
      }
    ],
    wordCloud: [
      { text: '认知盲区', weight: 10 },
      { text: '意外反转', weight: 9 },
      { text: '交互设计', weight: 7 }
    ]
  }
];

const RAW_EVOLUTION_JSON = [
  {"name": "逛厂甸", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "吃鸡", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "杂技表演", "year": 1983, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "弹钢琴", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "阿Q的独白", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "戏剧杂谈", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "看谁贴得快", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "宇宙牌香烟", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "伞衣帽", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "淋浴", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "吃面条", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "电视纠纷", "year": 1984, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "春联", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "砸核桃", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "夸家乡", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "大乐、特乐", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "拍电影", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "老牛接班", "year": 1985, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "硬气功表演", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "看电视", "year": 1985, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "虎年谈虎", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "小魔术", "year": 1986, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "谜语", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "送礼", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "怪声独唱", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "戏迷", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "空中悬人", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "吹牛", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "照相", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "羊肉串", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "唱歌的姿势", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "孙二娘开店", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }]},
  {"name": "家庭宴会", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }]},
  {"name": "恩爱夫妻", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "学播音", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "虎口遐想", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "变兔", "year": 1987, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "拔牙", "year": 1987, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "产房门前", "year": 1987, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "打岔", "year": 1987, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "卖鱼", "year": 1987, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "五官争功", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "评书贯口", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "急诊", "year": 1988, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "求全责备", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "对话趣谈", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "攀比", "year": 1988, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "轻功表演", "year": 1988, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "电梯奇遇", "year": 1988, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "接妻", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "门铃声声", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "夸张视听", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }]},
  {"name": "蹬技", "year": 1988, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "巧立名目", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "英雄母亲的一天", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "喷水断砖", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "少儿杂技集锦", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "招聘", "year": 1989, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "双簧", "year": 1989, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "懒汉相亲", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }]},
  {"name": "电影打岔", "year": 1989, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "胡椒面", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "捕风捉影", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "太挤了", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "背起那小妹妹", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "相亲", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "京剧迪斯科", "year": 1990, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "打麻将", "year": 1990, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "二重唱", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "难兄难弟", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "举重", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "主角与配角", "year": 1990, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "手拉手", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "山寨相亲", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "小蹬人", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "着急", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "百业奇招", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "陌生人", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "洞房花烛夜", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "小九老乐", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "警察与小偷", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "打棍出箱", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "笑星劝酒", "year": 1991, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "学唱", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "训徒", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }]},
  {"name": "争先恐后", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "小站联欢会", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "秧歌情", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "戒赌", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "办晚会", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "超生游击队", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "顶牛", "year": 1992, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "妈妈的今天", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "宠物热", "year": 1992, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "草台班子", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "论捧", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "改门脸", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "姐夫与小舅子", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "魔术表演", "year": 1993, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "擦皮鞋", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "群丑争春", "year": 1993, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "老拜年", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "山妞与模特", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }]},
  {"name": "张三其人", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "楼道曲", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "拍卖", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "推销", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "8字迷", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "多多关照", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "侯大明白", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "武旦绝技", "year": 1993, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "市场速写", "year": 1993, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 100 }]},
  {"name": "新名词", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }]},
  {"name": "越洋电话", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 34 }]},
  {"name": "呼啦圈表演", "year": 1994, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }]},
  {"name": "密码", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "跑题", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "八哥来信", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }]},
  {"name": "吃饺子", "year": 1994, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "打扑克", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "上梁下梁", "year": 1994, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "点子公司", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "大变活人", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }]},
  {"name": "拆迁变奏曲", "year": 1994, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }]},
  {"name": "找焦点", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "如此包装", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }]},
  {"name": "谁有毛病", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "人物反差", "percentage": 34 }]},
  {"name": "人体复印机", "year": 1995, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "最差先生", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "牛大叔“提干”", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "有事您说话", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]},
  {"name": "魔术表演", "year": 1995, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "纠察", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "机器人趣话", "year": 1996, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }]},
  {"name": "过河", "year": 1996, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }]},
  {"name": "打工奇遇", "year": 1996, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }]},
  {"name": "三鞭子", "year": 1996, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "红高粱模特队", "year": 1997, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }]},
  {"name": "昨天 今天 明天", "year": 1999, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "逻辑乌龙", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }]},
  {"name": "钟点工", "year": 2000, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "卖拐", "year": 2001, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "夸张视听", "percentage": 33 }]},
  {"name": "和春天一起来", "year": 2002, "laughComposition": [{ "typeId": "无", "percentage": 100 }]},
  {"name": "今天的幸福", "year": 2012, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }]},
  {"name": "扶不扶", "year": 2014, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "车站奇遇", "year": 2015, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }]},
  {"name": "坑", "year": 2023, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }]},
  {"name": "金龟婿", "year": 2025, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }]}
];

// 将原始JSON转换为 EvolutionProgram 格式
export const EVOLUTION_DATA: EvolutionProgram[] = RAW_EVOLUTION_JSON.map((item, idx) => ({
  id: `prog-${idx}`,
  name: item.name,
  year: item.year,
  tags: [String(item.year), item.laughComposition[0].typeId],
  composition: item.laughComposition.map(comp => ({
    type: (HUMOR_TYPES.includes(comp.typeId as HumorType) ? comp.typeId : '其他') as HumorType,
    ratio: comp.percentage / 100
  }))
}));

export const PERFORMERS: Performer[] = [
  { id: 'ZBS', name: '赵本山', firstYear: 1990, totalWorks: 21, bio: '春晚小品的灵魂人物。', quotes: ['要啥自行车'], role: '奠基人' },
  { id: 'FG', name: '冯巩', firstYear: 1986, totalWorks: 33, bio: '我想死你们了。', quotes: ['我想死你们了'], role: '奠基人' },
  { id: 'ST', name: '沈腾', firstYear: 2012, totalWorks: 10, bio: '现代春晚喜剧中坚。', quotes: ['郝建'], role: '中坚' }
];

export const RELATIONS: Relation[] = [
  { source: 'ZBS', target: 'SDD', type: '搭档' },
  { source: 'ST', target: 'ML', type: '搭档' }
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
  },
  {
    id: 'baiyun-heitu',
    hashtag: '#我叫白云我叫黑土',
    period: '2015.01 - 2025.12',
    totalData: 285,
    points: Array.from({length: 60}, (_, i) => ({
      date: `Y${i}`,
      posts: 50 + Math.random() * 30,
      likes: 200 + Math.random() * 100,
      comments: 40 + Math.random() * 20
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1541535650810-10d26f5d2abb?w=800', label: '1999：经典塑造，定义春晚CP' },
      { offset: 50, imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800', label: '2025：文化回响' }
    ]
  },
  {
    id: 'gongting-yuyejiu',
    hashtag: '#宫廷玉液酒',
    period: '2009.01 - 2025.12',
    totalData: 1073,
    points: Array.from({length: 60}, (_, i) => ({
      date: `G${i}`,
      posts: 100 + Math.random() * 50,
      likes: 500 + Math.random() * 200,
      comments: 80 + Math.random() * 40
    })),
    visualHistory: [
      { offset: 0, imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800', label: '1996：笑点诞生，讽刺商业包装' },
      { offset: 40, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800', label: '2019：网络防伪标识' }
    ]
  }
];
