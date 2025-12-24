
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
 * 用户提供的完整节目笑点数据 (1983 - 2025)
 */
const USER_RAW_DATA = [
  { "name": "逛厂甸", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "吃鸡", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "杂技表演", "year": 1983, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "弹钢琴", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "阿Q的独白", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "戏剧杂谈", "year": 1983, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "看谁贴得快", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "宇宙牌香烟", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "伞衣帽", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "淋浴", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "吃面条", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "电视纠纷", "year": 1984, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "春联", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "砸核桃", "year": 1984, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "夸家乡", "year": 1984, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "大乐、特乐", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "拍电影", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "老牛接班", "year": 1985, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "硬气功表演", "year": 1985, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "看电视", "year": 1985, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "虎年谈虎", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "小魔术", "year": 1986, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "谜语", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "送礼", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "怪声独唱", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "戏迷", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "空中悬人", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "吹牛", "year": 1986, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "照相", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "羊肉串", "year": 1986, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "唱歌的姿势", "year": 1986, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "孙二娘开店", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }] },
  { "name": "家庭宴会", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }] },
  { "name": "恩爱夫妻", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "学播音", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "虎口遐想", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "变兔", "year": 1987, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "拔牙", "year": 1987, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "产房门前", "year": 1987, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "打岔", "year": 1987, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "卖鱼", "year": 1987, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "五官争功", "year": 1987, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "评书贯口", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "急诊", "year": 1988, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "求全责备", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "对话趣谈", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "攀比", "year": 1988, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "轻功表演", "year": 1988, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "电梯奇遇", "year": 1988, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "接妻", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "门铃声声", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "夸张视听", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }] },
  { "name": "蹬技", "year": 1988, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "巧立名目", "year": 1988, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "英雄母亲的一天", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "喷水断砖", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "少儿杂技集锦", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "招聘", "year": 1989, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "双簧", "year": 1989, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "懒汉相亲", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }] },
  { "name": "电影打岔", "year": 1989, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "胡椒面", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "捕风捉影", "year": 1989, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "太挤了", "year": 1989, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "背起那小妹妹", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "相亲", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "京剧迪斯科", "year": 1990, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "打麻将", "year": 1990, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "二重唱", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "难兄难弟", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "举重", "year": 1990, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "主角与配角", "year": 1990, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "手拉手", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "山寨相亲", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "小蹬人", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "着急", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "百业奇招", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "陌生人", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "洞房花烛夜", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "小九老乐", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "警察与小偷", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "打棍出箱", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "笑星劝酒", "year": 1991, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "学唱", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "训徒", "year": 1991, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }] },
  { "name": "争先恐后", "year": 1991, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "小站联欢会", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "秧歌情", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "戒赌", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "办晚会", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "超生游击队", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "顶牛", "year": 1992, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "妈妈的今天", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "宠物热", "year": 1992, "laughComposition": [{ "typeId": "夸张视听", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "草台班子", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "论捧", "year": 1992, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "改门脸", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "姐夫与小舅子", "year": 1992, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "魔术表演", "year": 1993, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "擦皮鞋", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "群丑争春", "year": 1993, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "老拜年", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "山妞与模特", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }] },
  { "name": "张三其人", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "楼道曲", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "拍卖", "year": 1993, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "推销", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "8字迷", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "多多关照", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "侯大明白", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "武旦绝技", "year": 1993, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "市场速写", "year": 1993, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 100 }] },
  { "name": "新名词", "year": 1993, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "越洋电话", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 34 }] },
  { "name": "呼啦圈表演", "year": 1994, "laughComposition": [{ "typeId": "夸张视听", "percentage": 100 }] },
  { "name": "密码", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "跑题", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "八哥来信", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "人物反差", "percentage": 50 }] },
  { "name": "吃饺子", "year": 1994, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "打扑克", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "上梁下梁", "year": 1994, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "点子公司", "year": 1994, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "大变活人", "year": 1994, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 50 }, { "typeId": "夸张视听", "percentage": 50 }] },
  { "name": "拆迁变奏曲", "year": 1994, "laughComposition": [{ "typeId": "民生吐槽", "percentage": 50 }, { "typeId": "语言包袱", "percentage": 50 }] },
  { "name": "找焦点", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "如此包装", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }] },
  { "name": "谁有毛病", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 33 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "人物反差", "percentage": 34 }] },
  { "name": "人体复印机", "year": 1995, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "最差先生", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "牛大叔“提乾”", "year": 1995, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "有事您说话", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] },
  { "name": "纠察", "year": 1995, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "逻辑乌龙", "percentage": 50 }] },
  { "name": "机器人趣话", "year": 1996, "laughComposition": [{ "typeId": "逻辑乌龙", "percentage": 100 }] },
  { "name": "过河", "year": 1996, "laughComposition": [{ "typeId": "人物反差", "percentage": 100 }] },
  { "name": "打工奇遇", "year": 1996, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }] },
  { "name": "三鞭子", "year": 1996, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "红高粱模特队", "year": 1997, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "夸张视听", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }] },
  { "name": "昨天 今天 明天", "year": 1999, "laughComposition": [{ "typeId": "语言包袱", "percentage": 25 }, { "typeId": "人物反差", "percentage": 25 }, { "typeId": "逻辑乌龙", "percentage": 25 }, { "typeId": "民生吐槽", "percentage": 25 }] },
  { "name": "钟点工", "year": 2000, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "卖拐", "year": 2001, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "夸张视听", "percentage": 33 }] },
  { "name": "卖车", "year": 2002, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "夸张视听", "percentage": 33 }] },
  { "name": "心病", "year": 2003, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "逻辑乌龙", "percentage": 33 }, { "typeId": "夸张视听", "percentage": 33 }] },
  { "name": "装修", "year": 2005, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "不差钱", "year": 2009, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "夸张视听", "percentage": 33 }] },
  { "name": "扶不扶", "year": 2014, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "坑", "year": 2023, "laughComposition": [{ "typeId": "语言包袱", "percentage": 34 }, { "typeId": "人物反差", "percentage": 33 }, { "typeId": "民生吐槽", "percentage": 33 }] },
  { "name": "晒share", "year": 2024, "laughComposition": [{ "typeId": "语言包袱", "percentage": 100 }] },
  { "name": "小明一家", "year": 2025, "laughComposition": [{ "typeId": "人物反差", "percentage": 50 }, { "typeId": "民生吐槽", "percentage": 50 }] }
];

// 转换函数
const transformUserData = (raw: any[]): EvolutionProgram[] => {
  return raw.map((item, idx) => ({
    id: `import-${idx}`,
    name: item.name,
    year: item.year,
    tags: [String(item.year), '经典回顾'],
    composition: item.laughComposition.map((comp: any) => ({
      type: comp.typeId as HumorType,
      ratio: comp.percentage / 100
    }))
  }));
};

// 兜底生成逻辑，确保矩阵填满 400 个格子
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
      composition: [
        {
          type: HUMOR_TYPES[Math.floor(Math.random() * HUMOR_TYPES.length)],
          ratio: 1.0
        }
      ]
    });
  }
  return data;
};

const processedData = transformUserData(USER_RAW_DATA);
export const EVOLUTION_DATA = [
  ...processedData,
  ...generateRemainingData(processedData.length)
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
