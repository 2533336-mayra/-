
import { VideoData } from './types';

export const FILMSTRIP_IMAGES = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
];

export const VIDEOS: VideoData[] = [
  {
    id: 'yesterday-today-tomorrow',
    title: '昨天，今天，明天',
    type: '小品',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    poster: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800',
    humorPoints: [
      {
        timestamp: 4,
        content: '白云：俺们隔壁那吴老二，瞅我一眼就浑身发抖。黑土：吴老二脑血栓，看谁都哆嗦。',
        mechanism: '“拆台”机制与预期违背',
        analysis: '白云基于虚荣心对现象进行浪漫化美化，黑土则提供冰冷的“客观事实”进行拆台。笑点在于观众从浪漫期待瞬间跌落到生理疾病的现实，产生了强烈的认知失调。'
      },
      {
        timestamp: 12,
        content: '黑土：我这辈子的奋斗目标就是让白云大妈过上幸福生活。白云：那你实现了吗？黑土：快了，她已经开始幻想了。',
        mechanism: '语义解构与逻辑反转',
        analysis: '“过上幸福生活”通常指物质改善，而黑土将其定义为“产生幻想”。这种对幸福概念的滑稽解构，既讽刺了虚假承诺，又利用了“逻辑跳跃”触发幽默。'
      },
      {
        timestamp: 22,
        content: '白云：我这辈子最后悔的事，就是跟了你。黑土：我也后悔，当初我怎么没看清你是这样的人？白云：我看清了，但我当时瞎了。',
        mechanism: '自嘲式悖论',
        analysis: '“看清了”与“瞎了”在逻辑上是矛盾的。角色通过承认自己的“非理性”来消解尴尬，这种诚实且荒谬的自责让观众产生优越感并发出笑声。'
      }
    ]
  },
  {
    id: 'cosmos-cigarettes',
    title: '宇宙牌香烟',
    type: '相声',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?auto=format&fit=crop&q=80&w=800',
    humorPoints: [
      {
        timestamp: 5,
        content: '“宇宙牌香烟，不仅能抽，还能治咳嗽！”',
        mechanism: '因果谬误与荒诞夸张',
        analysis: '香烟本是咳嗽的诱因，却被宣传为治疗手段。这种极致的逻辑倒置模拟了虚假广告的猖獗，通过将负面属性包装成正面卖点的荒谬感引爆笑点。'
      },
      {
        timestamp: 15,
        content: '“我们这香烟里头有金片，抽着抽着就发财了。”',
        mechanism: '社会焦虑的戏谑化',
        analysis: '捕捉了当时社会全民渴望致富的心理。将消费行为包装成投资获利，讽刺了盲目发财梦，让观众在被戳中社会痛点后通过笑声释放压力。'
      },
      {
        timestamp: 25,
        content: '“你要是买十箱，我赠你个打火机，没油的。”',
        mechanism: '期待递减与落差幽默',
        analysis: '观众期待一个大的“慷慨赠礼”，结果却是一个“无用的瑕疵品”。这种从“高大上”到“小市民狡黠”的极速坠落是相声经典的包袱结构。'
      }
    ]
  },
  {
    id: 'staying-up',
    title: '守岁共此时',
    type: '魔术',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800',
    humorPoints: [
      {
        timestamp: 6,
        content: '魔术师邀请台下嘉宾“死死盯着”他的手，结果东西还是变没了。',
        mechanism: '认知与现实的断裂',
        analysis: '魔术的幽默不在于桥段本身，而在于“努力观察却被耍”的挫败感。观众在极度专注与完全不可解的结果之间产生的心理失衡，通常会转化为放松的笑声。'
      },
      {
        timestamp: 18,
        content: '魔术师：这不是托儿，这是真观众。观众：对，我是魔术师雇来的真观众。',
        mechanism: '自设身份的消解（元幽默）',
        analysis: '通过主动承认“托儿”的可能性并将其作为调侃对象，打破了表演的第四面墙。这种自我解构消除了观众的敌意和质疑，将其转化为共谋的快感。'
      },
      {
        timestamp: 28,
        content: '魔术失败后的“尴尬假动作”，紧接着是一个更大的翻盘。',
        mechanism: '情感过山车与补偿机制',
        analysis: '通过制造“表演失误”的假象引发观众同情或嘲笑，随后瞬间逆转。这种心理紧张后的突然释放，是高级幽默与惊喜结合的极致体现。'
      }
    ]
  }
];
