
import React, { useState, useMemo, useEffect } from 'react';
import { Share2, User, Trophy, Calendar, Users, X, Info, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ActorStats, NetworkNode, NetworkLink } from '../types';

// 导入全量数据 (基于用户提供的41年春晚节目单)
const RAW_DATA = `
1983、《逛厂甸》、斯琴高娃、严顺开
1983、《弹钢琴》、严顺开
1983、《阿Q的独白》、严顺开
1984、《淋浴》、游本昌
1984、《吃面条》、陈佩斯、朱时茂
1984、《电视纠纷》、王景愚、李辉
1985、《拍电影》、陈佩斯、朱时茂
1986、《送礼》、李婉芬、周国治
1986、《羊肉串》、陈佩斯、朱时茂
1987、《家庭宴会》、王明玉、李扬
1987、《恩爱夫妻》、王馥荔、陈裕德
1987、《拔牙》、赵连甲、王刚
1987、《产房门前》、郭达、杨蕾、高兰村、邹小茜
1988、《急诊》、游本昌、赵丽蓉、王丽云、薛培培
1988、《清官难断家务事》、牛得草、朱世慧、郭达、杨蕾、石富宽、崔喜跃
1988、《狗娃与黑妞》、陈佩斯、小香玉
1988、《接妻》、沈伐、岳红
1988、《门铃声声》、李文启、熊小田
1989、《英雄母亲的一天》、赵丽蓉、侯耀文
1989、《招聘》、笑林、师胜杰、黄宏、方青卓
1989、《懒汉相亲》、雷恪生、赵连甲、宋丹丹
1989、《胡椒面》、陈佩斯、朱时茂
1990、《相亲》、赵本山、黄晓娟
1990、《打麻将》、岳红、巩汉林
1990、《难兄难弟》、严顺开、黄宏
1990、《主角与配角》、陈佩斯、朱时茂
1991、《手拉手》、黄宏、宋丹丹
1991、《陌生人》、巩汉林、蔡明
1991、《小九老乐》、赵本山、杨蕾
1991、《警察与小偷》、陈佩斯、朱时茂
1992、《秧歌情》、黄宏、宋丹丹
1992、《我想有个家》、赵本山、黄晓娟
1992、《妈妈的今天》、赵丽蓉、巩汉林、李文启
1992、《姐夫与小舅子》、陈佩斯、朱时茂
1993、《擦皮鞋》、黄宏、魏积安
1993、《老拜年》、赵本山、王中青、苏杰、阎淑萍
1993、《桥》、潘长江、黄晓娟
1993、《推销》、张国立、刘亚津、张敬
1993、《黄土坡》、郭达、蔡明
1994、《越洋电话》、郭达、蔡明
1994、《密码》、高秀敏、赵世林
1994、《打扑克》、黄宏、侯耀文
1994、《大变活人》、陈佩斯、朱时茂
1995、《如此包装》、赵丽蓉、巩汉林、孟薇
1995、《父亲》、郭达、蔡明、赵保乐、于海伦
1995、《牛大叔“提干”》、赵本山、范伟、张玉屏
1995、《有事您说话》、郭冬临、李文启、买红妹
1995、《纠察》、孙涛、郭月
1996、《机器人趣话》、蔡明、郭达
1996、《过河》、潘长江、阎淑萍
1996、《打工奇遇》、赵丽蓉、巩汉林、金珠
1996、《今晚直播》、黄宏、徐帆
1996、《路口》、郭冬临、魏积安、赵亮
1996、《三鞭子》、赵本山、范伟、李海
1997、《过年》、郭达、蔡明、郭冬临
1997、《三姐妹当兵》、孙涛、景风凌、王景、郭月
1997、《鞋钉》、黄宏、巩汉林
1997、《红高粱模特队》、赵本山、范伟
1998、《回家》、黄宏、宋丹丹
1998、《拜年》、赵本山、高秀敏、范伟
1998、《一张邮票》、潘长江、黑妹、大山
1998、《王爷与邮差》、陈佩斯、朱时茂
1999、《昨天今天明天》、赵本山、宋丹丹、崔永元
1999、《球迷》、郭达、蔡明、郭冬临
2000、《同桌的她》、潘长江、巩汉林、王思懿
2000、《钟点工》、赵本山、宋丹丹
2001、《卖拐》、赵本山、高秀敏、范伟
2002、《卖车》、赵本山、高秀敏、范伟
2003、《心病》、赵本山、高秀敏、范伟
2004、《送水工》、赵本山、范伟、高秀敏
2005、《功夫》、赵本山、范伟、蔡维利、王小虎
2006、《说事儿》、赵本山、宋丹丹、崔永元
2007、《策划》、赵本山、宋丹丹、牛群
2008、《火炬手》、赵本山、宋丹丹、刘流
2009、《不差钱》、赵本山、毕福剑、小沈阳、丫蛋
2012、《今天的幸福》、沈腾、黄杨、艾伦
2013、《今天的幸福2》、沈腾、马丽、杜晓宇、王琦
2014、《扶不扶》、沈腾、马丽、杜晓宇
2015、《投其所好》、沈腾、马丽、杜晓宇
2017、《一个女婿半个儿》、沈腾、艾伦、魏翔、吴江、杨沅翰
2019、《占位子》、沈腾、马丽、艾伦、常远、魏翔
2020、《走过场》、沈腾、马丽、黄才伦、陶亮、刘坤、魏玮
2022、《还不还》、沈腾、马丽、常远、艾伦、王成思、许文赫
2023、《坑》、沈腾、马丽、艾伦、常远、宋阳、于健
2024、《寒舍不寒》、沈腾、马丽、艾伦
2025、《金龟婿》、沈腾、马丽、孙千、宋阳
1987、《五官争功》、马季、赵炎、王金宝、冯巩、刘伟
1988、《求全责备》、刘伟、冯巩、牛振华、李艺、戴志诚、郑健、赵保乐
1989、《生日祝辞》、冯巩、牛群
1991、《亚运之最》、牛群、冯巩
1994、《点子公司》、冯巩、牛群
2000、《旧曲新歌》、冯巩、郭冬临
2005、《笑谈人生》、冯巩、朱军、蔡明
2008、《公交协奏曲》、冯巩、闫学晶、王宝强、潘斌龙
2010、《不能让他走》、冯巩、刘金山、邵峰、闫学晶、韩雪
2015、《我忍不了》、岳云鹏、孙越
2019、《妙言趣语》、岳云鹏、孙越
2021、《年三十的歌》、岳云鹏、孙越
2024、《我要不一样》、岳云鹏、孙越
2025、《我们一起说相声》、岳云鹏、孙越
`;

const InheritanceNetwork: React.FC = () => {
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);
  const [hoveredActorId, setHoveredActorId] = useState<string | null>(null);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 1. 数据解析逻辑
  const { nodes, links, actorMap } = useMemo(() => {
    const actors = new Map<string, ActorStats>();
    const cooperations = new Map<string, number>();
    const lines = RAW_DATA.trim().split('\n');

    lines.forEach(line => {
      const parts = line.split('、');
      if (parts.length < 3) return;
      const year = parseInt(parts[0]);
      const work = parts[1];
      const cast = parts.slice(2).filter(n => n && n !== '-');

      cast.forEach(name => {
        if (!actors.has(name)) {
          actors.set(name, { id: name, name, count: 0, partners: new Map(), years: [], works: [] });
        }
        const stats = actors.get(name)!;
        stats.count++;
        stats.years.push(year);
        stats.works.push(work);

        cast.forEach(partner => {
          if (partner !== name) {
            stats.partners.set(partner, (stats.partners.get(partner) || 0) + 1);
            const pair = [name, partner].sort().join('::');
            cooperations.set(pair, (cooperations.get(pair) || 0) + 1);
          }
        });
      });
    });

    const networkNodes: NetworkNode[] = Array.from(actors.values()).map(stats => ({
      id: stats.id,
      name: stats.name,
      count: stats.count,
      stats: stats,
    }));

    const networkLinks: NetworkLink[] = Array.from(cooperations.entries()).map(([pair, weight]) => {
      const [source, target] = pair.split('::');
      return { source, target, weight };
    });

    return { nodes: networkNodes, links: networkLinks, actorMap: actors };
  }, []);

  // 2. 视觉映射系统
  const getVisuals = (count: number) => {
    // 颜色分级 (出场次数越多，颜色越鲜明)
    let color = '#8b8b8b'; // 1次
    let r = 18;
    let fontSize = 9;

    if (count >= 20) { color = '#ff1100'; r = 45; fontSize = 16; }
    else if (count >= 15) { color = '#ff4d00'; r = 38; fontSize = 14; }
    else if (count >= 10) { color = '#ff8c00'; r = 32; fontSize = 12; }
    else if (count >= 5) { color = '#ffb300'; r = 26; fontSize = 11; }
    else if (count >= 2) { color = '#d4af37'; r = 21; fontSize = 10; }

    return { r, color, fontSize };
  };

  // 3. 改进的力导向星系布局
  const [simulationNodes, setSimulationNodes] = useState<NetworkNode[]>([]);
  
  useEffect(() => {
    const VIEW_W = 1200;
    const VIEW_H = 900;
    const centerX = VIEW_W / 2;
    const centerY = VIEW_H / 2;

    // 按参演次数排序，多的放中间
    const sortedNodes = [...nodes].sort((a, b) => b.count - a.count);
    
    // 使用螺旋星系布局
    const arranged = sortedNodes.map((node, index) => {
      // 大佬聚集在核心，由于大佬少，给更小的半径
      // 边缘节点多，均匀分布在旋臂或圆环上
      let radius: number;
      let angle: number;

      if (node.count >= 10) {
        // 核心圈 (赵本山、冯巩等)
        radius = (1 - (node.count / 40)) * 120 + 30; 
        angle = (index / 10) * Math.PI * 2;
      } else {
        // 扩散圈
        const ringIndex = index % 8; // 分成8个方位发散
        const distRatio = index / sortedNodes.length;
        radius = 200 + distRatio * 350; // 最大半径限制在550以内，避免超出
        angle = (index * 137.5 * Math.PI) / 180; // 黄金角度分布
      }

      return {
        ...node,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });

    setSimulationNodes(arranged);
  }, [nodes]);

  const activeActor = selectedActorId ? actorMap.get(selectedActorId) : null;

  // 交互判断逻辑
  const isNodeHighlighted = (id: string) => {
    if (!hoveredActorId && !selectedActorId && !selectedLinkId) return true;
    if (selectedLinkId) {
      const [s, t] = selectedLinkId.split('::');
      return id === s || id === t;
    }
    const focusId = hoveredActorId || selectedActorId;
    if (id === focusId) return true;
    return actorMap.get(focusId!)?.partners.has(id);
  };

  const isLinkHighlighted = (link: NetworkLink) => {
    const sId = typeof link.source === 'string' ? link.source : link.source.id;
    const tId = typeof link.target === 'string' ? link.target : link.target.id;
    const linkKey = [sId, tId].sort().join('::');
    
    if (selectedLinkId) return linkKey === selectedLinkId;
    if (!hoveredActorId && !selectedActorId) return true;
    const focusId = hoveredActorId || selectedActorId;
    return sId === focusId || tId === focusId;
  };

  return (
    <div className="relative w-full h-[850px] bg-[#050505] rounded-[4rem] border border-white/5 overflow-hidden shadow-[inset_0_0_150px_rgba(0,0,0,1)] flex items-center justify-center cursor-default">
      
      {/* 顶部HUD */}
      <div className="absolute top-10 left-10 z-30 space-y-4 pointer-events-none">
         <div className="flex items-center gap-4 bg-red-950/40 px-6 py-3 rounded-2xl border border-red-800/30 backdrop-blur-2xl">
            <Share2 className="text-yellow-500 animate-pulse" size={24} />
            <div>
               <h3 className="text-xl font-black text-white tracking-tighter uppercase">春晚幽默传承网脉</h3>
               <p className="text-[10px] text-yellow-500/60 font-bold tracking-[0.2em]">CCTV GALA COOPERATION NETWORK (1983-2025)</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
               <div className="flex -space-x-1">
                  {[20, 15, 10, 5, 2, 1].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: getVisuals(c).color }}></div>
                  ))}
               </div>
               <span className="text-[9px] text-white/40 font-black tracking-widest uppercase">Performance Frequency</span>
            </div>
         </div>
      </div>

      {/* SVG 画布 */}
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{ transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)` }}
        onClick={() => { setSelectedActorId(null); setSelectedLinkId(null); }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 900" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 连线层 */}
          <g>
            {links.map((link, i) => {
              const sNode = simulationNodes.find(n => n.id === (typeof link.source === 'string' ? link.source : link.source.id));
              const tNode = simulationNodes.find(n => n.id === (typeof link.target === 'string' ? link.target : link.target.id));
              if (!sNode || !tNode) return null;

              const highlighted = isLinkHighlighted(link);
              const linkKey = [sNode.id, tNode.id].sort().join('::');
              const isSelected = selectedLinkId === linkKey;

              return (
                <line
                  key={`link-${i}`}
                  x1={sNode.x} y1={sNode.y} x2={tNode.x} y2={tNode.y}
                  stroke={isSelected ? "#fff" : (highlighted ? "#d4af37" : "rgba(255, 255, 255, 0.03)")}
                  strokeWidth={link.weight * (highlighted ? 1.5 : 0.6)}
                  strokeOpacity={highlighted ? (isSelected ? 1 : 0.6) : 0.1}
                  className="transition-all duration-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLinkId(linkKey);
                    setSelectedActorId(null);
                  }}
                />
              );
            })}
          </g>

          {/* 节点层 */}
          <g>
            {simulationNodes.map((node) => {
              const { r, color, fontSize } = getVisuals(node.count);
              const highlighted = isNodeHighlighted(node.id);
              const isSelected = selectedActorId === node.id;
              const isHovered = hoveredActorId === node.id;

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  className={`cursor-pointer transition-all duration-500 ${highlighted ? 'opacity-100' : 'opacity-10 grayscale'}`}
                  onMouseEnter={() => setHoveredActorId(node.id)}
                  onMouseLeave={() => setHoveredActorId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActorId(node.id);
                    setSelectedLinkId(null);
                  }}
                >
                  {/* 发光底层 */}
                  {(isSelected || isHovered) && (
                    <circle r={r + 8} fill={color} opacity="0.2" filter="url(#glow)" className="animate-pulse" />
                  )}
                  
                  {/* 主圆形背景 */}
                  <circle 
                    r={isSelected ? r * 1.2 : r} 
                    fill={isSelected ? '#fff' : color} 
                    stroke={isSelected ? '#eab308' : 'rgba(255,255,255,0.1)'} 
                    strokeWidth={isSelected ? 3 : 1}
                    className="transition-all duration-300"
                  />
                  
                  {/* 名字文本 (自适应大小) */}
                  <text 
                    dy=".35em" 
                    textAnchor="middle" 
                    fill={isSelected ? '#000' : (node.count >= 2 ? '#fff' : 'rgba(255,255,255,0.6)')}
                    className="font-black pointer-events-none tracking-tighter select-none"
                    style={{ fontSize: isSelected ? fontSize * 1.2 : fontSize }}
                  >
                    {node.name}
                  </text>

                  {/* 次数小角标 */}
                  {highlighted && node.count > 1 && !isSelected && (
                    <g transform={`translate(${r * 0.7}, ${-r * 0.7})`}>
                       <circle r="7" fill="#000" stroke={color} strokeWidth="1" />
                       <text textAnchor="middle" dy=".35em" fontSize="6.5" fill="#fff" fontWeight="900">{node.count}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 侧边信息卡片 */}
      {activeActor && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[380px] z-50 animate-in slide-in-from-right-20 duration-500">
           <div className="bg-[#151515]/95 backdrop-blur-3xl rounded-[3rem] p-10 border-l-[12px] border-yellow-500 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 text-[10rem] font-black text-white/[0.03] italic pointer-events-none select-none">
                 {activeActor.count}
              </div>
              <button onClick={() => setSelectedActorId(null)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-20 h-20 rounded-3xl bg-yellow-500 flex items-center justify-center shadow-2xl rotate-3"><User size={40} className="text-red-950" /></div>
                 <div>
                    <h4 className="text-3xl font-black text-white tracking-tighter">{activeActor.name}</h4>
                    <span className="text-[10px] font-black text-yellow-500/60 uppercase tracking-widest block mt-1">Veteran Actor Profile</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2"><Trophy size={14} className="text-yellow-500" /><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">参演总数</span></div>
                    <div className="text-2xl font-black text-white">{activeActor.count} <span className="text-xs opacity-30">场</span></div>
                 </div>
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2"><Users size={14} className="text-blue-500" /><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">合作伙伴</span></div>
                    <div className="text-2xl font-black text-white">{activeActor.partners.size} <span className="text-xs opacity-30">位</span></div>
                 </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <span className="text-[9px] font-black text-yellow-500/40 uppercase tracking-[0.2em] block mb-3">核心合作者 / Top Partners</span>
                    <div className="flex flex-wrap gap-2">
                       {Array.from(activeActor.partners.entries()).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([name, count])=>(
                         <div key={name} className="px-4 py-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-xs text-yellow-500 font-black">{name} <span className="opacity-40 text-[9px] ml-1">{count}次</span></div>
                       ))}
                    </div>
                 </div>
                 <div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-3">出演剧目 / Archives</span>
                    <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                        {Array.from(new Set(activeActor.works)).slice(0, 15).map((work, i)=>(
                          <div key={i} className="flex items-center gap-3 group text-xs text-white/60"><div className="w-1 h-1 rounded-full bg-white/20"></div>{work}</div>
                        ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 底部控制栏 */}
      <div className="absolute bottom-10 left-10 flex items-center gap-6 bg-black/60 px-6 py-4 rounded-3xl border border-white/5 backdrop-blur-xl">
         <div className="flex items-center gap-4">
            <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.3))} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><ZoomOut size={16} /></button>
            <span className="text-[10px] font-mono font-black text-yellow-500 w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 0.1, 2.5))} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><ZoomIn size={16} /></button>
         </div>
         <div className="h-4 w-[1px] bg-white/10"></div>
         <button onClick={() => { setZoom(0.8); setOffset({x:0, y:0}); }} className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
            <Maximize2 size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Fit View</span>
         </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default InheritanceNetwork;
