import{on as e,un as t,z as n}from"./stats-BWwxfo1Y.js";import{a as r,r as i}from"./prefs-BV-GyINr.js";var a=[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],o=1900,s=[`甲`,`乙`,`丙`,`丁`,`戊`,`己`,`庚`,`辛`,`壬`,`癸`],c=[`子`,`丑`,`寅`,`卯`,`辰`,`巳`,`午`,`未`,`申`,`酉`,`戌`,`亥`],l=[`鼠`,`牛`,`虎`,`兔`,`龙`,`蛇`,`马`,`羊`,`猴`,`鸡`,`狗`,`猪`],u=[`正`,`二`,`三`,`四`,`五`,`六`,`七`,`八`,`九`,`十`,`冬`,`腊`],d=`初一.初二.初三.初四.初五.初六.初七.初八.初九.初十.十一.十二.十三.十四.十五.十六.十七.十八.十九.二十.廿一.廿二.廿三.廿四.廿五.廿六.廿七.廿八.廿九.三十`.split(`.`);function f(e){let t=348,n=a[e-o];for(let e=32768;e>8;e>>=1)t+=(n&e)===0?0:1;return t+m(e)}function p(e){return a[e-o]&15}function m(e){return p(e)===0?0:a[e-1900]&65536?30:29}function h(e,t){return a[e-1900]&65536>>t?30:29}function g(e){let t=e.getFullYear();if(t<1900||t>2100)return null;let n=Math.floor((Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())-Date.UTC(1900,0,31))/864e5);if(n<0)return null;let r=o,i=0;for(;r<=2100&&n>0;r++)i=f(r),n-=i;n<0&&(n+=i,r--);let a=p(r),g=!1,_=1,v=0;for(;_<=12&&n>0;_++)a>0&&_===a+1&&!g?(_--,g=!0,v=m(r)):v=h(r,_),g&&_===a+1&&(g=!1),n-=v;n===0&&a>0&&_===a+1&&(g?g=!1:(g=!0,_--)),n<0&&(n+=v,_--);let y=s[(r-4)%10],b=c[(r-4)%12];return{year:r,month:_,day:n+1,isLeap:g,stemBranch:`${y}${b}`,zodiac:l[(r-4)%12],monthName:`${g?`闰`:``}${u[_-1]}月`,dayName:d[n]}}function _(e){let t=g(e);return t?t.day===1?t.isLeap?`闰${t.monthName.slice(0,-1)}`:t.monthName.slice(0,-1):t.dayName:null}function v(e){let t=g(e);return t?`${t.stemBranch}${t.zodiac}年 ${t.monthName}${t.dayName}`:null}var y=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],b=[`一`,`二`,`三`,`四`,`五`,`六`,`日`],x=[`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`,`Su`];function S(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.textContent=n),r}function C(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function w(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}var T=`
.morz-calendar { font-size: 12.5px; user-select: none; padding: 2px 2px 6px; }
.morz-calendar .cal-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 2px 2px 8px; }
.morz-calendar .cal-title { display: flex; align-items: baseline; gap: 4px; font-size: 1.06em; font-weight: 600; letter-spacing: 0.01em; }
.morz-calendar .cal-nav-group { display: flex; align-items: center; gap: 1px; }
.morz-calendar .cal-nav {
  border: 0; background: none; color: var(--ui-muted, #8a8f98); cursor: pointer;
  border-radius: 6px; padding: 3px 6px; font: inherit; line-height: 1.3;
}
.morz-calendar .cal-nav:hover { background: var(--ui-hover, rgba(127,127,127,0.16)); color: var(--ui-text, inherit); }
.morz-calendar .cal-today { font-size: 0.9em; }
.morz-calendar .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); column-gap: 2px; row-gap: 1px; }
.morz-calendar .cal-grid.with-week { grid-template-columns: 1.4em repeat(7, 1fr); }
.morz-calendar .cal-week {
  display: flex; align-items: center; justify-content: flex-end; padding-right: 3px;
  font-size: 0.68em; opacity: 0.35; font-variant-numeric: tabular-nums;
}
.morz-calendar .cal-week-label { justify-content: flex-start; padding: 0 0 0 3px; font-weight: 600; opacity: 0.5; }
.morz-calendar .cal-weekday {
  text-align: center; font-size: 0.72em; font-weight: 600; opacity: 0.5; padding: 2px 0 5px;
}
/* 日期格固定高度，不再随列宽变成大方块，整体更紧凑 */
.morz-calendar .cal-day {
  position: relative; min-height: 38px; padding: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
  border: 0; border-radius: 8px; background: none; color: inherit; font: inherit; cursor: pointer;
}
.morz-calendar .cal-day:hover { background: var(--ui-hover, rgba(127,127,127,0.16)); }
.morz-calendar .cal-day.is-outside { opacity: 0.22; }
.morz-calendar .cal-day-num { font-size: 0.98em; line-height: 1.15; font-variant-numeric: tabular-nums; }
/* 今天：主题色圆点包住数字，农历让位（hover 仍能看到完整日期） */
.morz-calendar .cal-day.is-today { color: var(--ui-accent, #4183c4); font-weight: 700; }
.morz-calendar .cal-day.is-today .cal-day-num {
  display: grid; place-items: center; width: 25px; height: 25px; margin: -2px 0 -1px;
  border-radius: 50%; background: var(--ui-accent, #4183c4);
  /* 固定白字 + 轻阴影：--ui-panel 在部分主题里和 accent 太接近，数字会被吞掉；
     浅色 accent（如 sand）下阴影也能保住可读性。 */
  color: #fff; text-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
}
.morz-calendar .cal-day.is-today .cal-lunar { display: none; }
/* 周末数字用主题色轻强调，和参考日历的红字语义一致。
   注意两点：① 必须排除今天——同优先级的周末规则写在后面，会把今天圆点里的
   白字覆盖掉；② color-mix 前给普通值，Safari 15（macOS 12）不支持 color-mix，
   无效声明会退化成 inherit，颜色直接变成单元格的 accent。 */
.morz-calendar .cal-day.is-weekend:not(.is-today) .cal-day-num {
  color: var(--ui-accent, #4183c4);
  color: color-mix(in srgb, var(--ui-accent, #4183c4) 72%, var(--ui-strong, #333));
}
/* 农历小字：初一是月名，用主题色强调；其余灰色小字 */
.morz-calendar .cal-lunar {
  font-size: 0.58em; line-height: 1.1; font-weight: 400; opacity: 0.5;
  max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.morz-calendar .cal-lunar.is-month { opacity: 0.88; color: var(--ui-accent, #4183c4); }
/* 相邻月份的农历是噪音：只留数字，主月信息更干净 */
.morz-calendar .cal-day.is-outside .cal-lunar { display: none; }
.morz-calendar .cal-day.has-note::after {
  content: ""; position: absolute; bottom: 2px; left: 50%; width: 3.5px; height: 3.5px;
  margin-left: -1.75px; border-radius: 50%; background: var(--ui-accent, #4183c4);
}
/* 今天的圆点已经足够醒目，不再叠笔记圆点 */
.morz-calendar .cal-day.is-today.has-note::after { display: none; }
.morz-calendar .cal-day.is-outside.has-note::after { opacity: 0.5; }
@media (pointer: coarse) {
  .morz-calendar .cal-day { min-height: 42px; }
}
/* 右栏继续收窄时再退让：标题、今天按钮、日期格 */
.morz-calendar { container-type: inline-size; container-name: cal; }
@container cal (max-width: 280px) {
  .morz-calendar .cal-header { margin-bottom: 6px; gap: 4px; }
  .morz-calendar .cal-title { font-size: 0.98em; gap: 3px; }
  .morz-calendar .cal-today { display: none; }
  .morz-calendar .cal-weekday { font-size: 0.68em; padding: 2px 0 4px; }
  .morz-calendar .cal-day { min-height: 33px; border-radius: 7px; }
  .morz-calendar .cal-day-num { font-size: 0.92em; }
  .morz-calendar .cal-day.is-today .cal-day-num { width: 23px; height: 23px; }
}
/* 「回顾」：历史上的今天 / 昨天 / 上周今天的日记入口 */
.morz-calendar .cal-review { margin-top: 10px; border-top: 1px solid var(--ui-border, rgba(127,127,127,0.22)); padding-top: 7px; }
.morz-calendar .cal-review-title { font-size: 0.88em; font-weight: 600; color: var(--ui-muted, #8a8f98); margin: 0 2px 4px; letter-spacing: 0.04em; }
.morz-calendar .cal-review-row {
  display: flex; align-items: baseline; gap: 6px; width: 100%;
  border: 0; background: none; padding: 3px 6px; margin: 0 -2px;
  border-radius: 6px; cursor: pointer; font: inherit; text-align: left;
  color: var(--ui-text, inherit);
}
.morz-calendar .cal-review-row:hover { background: var(--ui-hover, rgba(127,127,127,0.16)); color: var(--ui-strong, inherit); }
.morz-calendar .cal-review-label { flex: none; color: var(--ui-accent, #4183c4); font-size: 0.94em; }
.morz-calendar .cal-review-path {
  min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  color: var(--ui-muted, #8a8f98); font-size: 0.9em;
}
`;function E(a){let o=S(`div`,`morz-calendar`),s=document.createElement(`style`);s.textContent=T,o.append(s);let c=new Date;c=new Date(c.getFullYear(),c.getMonth(),1);let l=0,u=0,d=()=>{try{let t=a.daily.calendarOptions();return{weekStart:t.weekStart??`monday`,showWeekNumbers:t.showWeekNumbers!==!1,showLunar:(t.showLunar??e()===`zh`)&&e()===`zh`}}catch{return{weekStart:`monday`,showWeekNumbers:!0,showLunar:e()===`zh`}}},f=new Map,p=async e=>{let t=f.get(e);if(t&&Date.now()-t.at<6e5)return t.ok;let n=!1;try{n=await a.vault.exists(e)}catch{}return f.set(e,{ok:n,at:Date.now()}),n},m=0,h=!1,g=()=>{if(h)return;h=!0;let e=++m,t=c.getFullYear(),n=c.getMonth(),{weekStart:r}=d(),i=r===`sunday`?0:1,s=(new Date(t,n,1).getDay()-i+7)%7,l=new Date(t,n+1,0).getDate(),u=Math.ceil((s+l)/7),f=new Date(t,n,1-s),g=[];for(let e=0;e<u;e++)for(let t=0;t<7;t++){let n=new Date(f.getFullYear(),f.getMonth(),f.getDate()+e*7+t);try{let e=a.daily.path(n);e&&g.push(e)}catch{}}let _=new Date;for(let e of[1,7,30]){let t=new Date(_.getFullYear(),_.getMonth(),_.getDate()-e);try{let e=a.daily.path(t);e&&g.push(e)}catch{}}for(let e=1;e<=5;e++){let t=new Date(_.getFullYear()-e,_.getMonth(),_.getDate());try{let e=a.daily.path(t);e&&g.push(e)}catch{}}Promise.all(g.map(e=>p(e))).then(()=>{h=!1,e===m&&o.isConnected&&o.getClientRects().length!==0&&k()},()=>{h=!1})},E=(e,t)=>{let n=i();n[e]=t,r(n);let a=window.morzApp;a&&(a.prefs[e]=t,a.savePrefs?.()),k()},D=(r,i)=>{let a=d(),o=e()===`zh`;n([{label:t(`每周起始日`,`Week starts on`),icon:`calendar`,submenu:[{label:t(`周一`,`Monday`),checked:a.weekStart===`monday`,run:()=>E(`calendarWeekStart`,`monday`)},{label:t(`周日`,`Sunday`),checked:a.weekStart===`sunday`,run:()=>E(`calendarWeekStart`,`sunday`)}]},{label:t(`显示周数`,`Show week numbers`),checked:a.showWeekNumbers,run:()=>E(`calendarShowWeekNumbers`,!a.showWeekNumbers)},...o?[{label:t(`显示农历`,`Show lunar dates`),checked:a.showLunar,run:()=>E(`calendarShowLunar`,!a.showLunar)}]:[]],{x:r,y:i},{className:`menu-calendar`,hideShortcuts:!0})},O=async e=>{try{await a.daily.open(e,{confirmCreate:!0})}catch{}j(120)},k=async()=>{let n=performance.now(),r=()=>{let e=performance.now(),t=window;t.__morzCalendarDrawMs=Math.round(e-n),t.__morzCalendarDrawWindows??=[],t.__morzCalendarDrawWindows.push({start:n,end:e}),t.__morzCalendarDrawWindows.length>20&&t.__morzCalendarDrawWindows.shift()},i=++l,s=c.getFullYear(),u=c.getMonth(),{weekStart:p,showWeekNumbers:m,showLunar:h}=d(),T=p===`sunday`?0:1;for(let e of[...o.children])e.tagName!==`STYLE`&&e.remove();let E=S(`div`,`cal-header`),j=S(`span`,`cal-title`);j.append(S(`span`,void 0,e()===`zh`?`${s}年${u+1}月`:`${y[u]} ${s}`));let M=S(`span`,`cal-nav-group`),N=S(`button`,`cal-nav`,`‹`);N.title=t(`上个月`,`Previous month`),N.setAttribute(`aria-label`,N.title),N.addEventListener(`click`,()=>{c=new Date(s,u-1,1),k()});let P=S(`button`,`cal-nav cal-today`,t(`今天`,`Today`));P.addEventListener(`click`,()=>{let e=new Date;c=new Date(e.getFullYear(),e.getMonth(),1),k()});let F=S(`button`,`cal-nav`,`›`);F.title=t(`下个月`,`Next month`),F.setAttribute(`aria-label`,F.title),F.addEventListener(`click`,()=>{c=new Date(s,u+1,1),k()}),M.append(N,P,F),E.append(j,M),E.addEventListener(`contextmenu`,e=>{e.preventDefault(),e.stopPropagation(),D(e.clientX,e.clientY)});let I=S(`div`,`cal-grid`+(m?` with-week`:``));m&&I.append(S(`span`,`cal-week cal-week-label`,`W`));let L=e()===`zh`?b:x,R=p===`sunday`?[L[6],...L.slice(0,6)]:L;for(let e of R)I.append(S(`span`,`cal-weekday`,e));let z=(new Date(s,u,1).getDay()-T+7)%7,B=new Date(s,u+1,0).getDate(),V=Math.ceil((z+B)/7),H=new Date(s,u,1-z),U=new Date,W=[];for(let e=0;e<V;e++){let t=new Date(H.getFullYear(),H.getMonth(),H.getDate()+e*7),n=m?String(w(t)):null;for(let t=0;t<7;t++){let r=new Date(H.getFullYear(),H.getMonth(),H.getDate()+e*7+t),i=``;try{i=a.daily.path(r)}catch{}W.push({date:r,path:i,week:t===0?n:null})}}let G=new Set,K=!1;for(let e of W){if(!e.path)continue;let t=f.get(e.path);t?t.ok&&G.add(e.path):K=!0}if(K&&g(),i!==l)r();else{for(let e of W){e.week&&I.append(S(`span`,`cal-week`,e.week));let{date:t,path:n}=e,r=S(`button`,`cal-day`),i=S(`span`,`cal-day-num`,String(t.getDate()));if(r.append(i),h){let e=_(t);if(e){let t=S(`span`,`cal-lunar`+(/^[正二三四五六七八九十冬腊]$/.test(e)?` is-month`:``),e);r.append(t)}}if(t.getMonth()!==u&&r.classList.add(`is-outside`),(t.getDay()===0||t.getDay()===6)&&r.classList.add(`is-weekend`),C(t,U)&&r.classList.add(`is-today`),n&&(r.dataset.path=n,G.has(n)&&r.classList.add(`has-note`)),h){let e=v(t);e&&(r.title=n?`${n}（${e}）`:e)}else n&&(r.title=n);r.addEventListener(`click`,()=>void O(t)),I.append(r)}o.append(E,I),await A(o,i,a),r()}};async function A(n,r,i){let a=new Date,o=e=>new Date(a.getFullYear(),a.getMonth(),a.getDate()-e),s=[{label:t(`昨天`,`Yesterday`),date:o(1)},{label:t(`上周今天`,`A week ago`),date:o(7)},{label:t(`30 天前`,`30 days ago`),date:o(30)}],c=a.getFullYear();for(let n=1;n<=5;n++){let r=n===1?t(`去年今天`,`Last year`):n===2?t(`前年今天`,`Two years ago`):e()===`zh`?`${c-n}年今天`:`${c-n}`;s.push({label:r,date:new Date(c-n,a.getMonth(),a.getDate())})}let u=[],d=new Set;for(let e of s){let t=``;try{t=i.daily.path(e.date)}catch{}if(t&&!d.has(t)&&await p(t)&&(d.add(t),u.push({...e,path:t}),u.length>=5))break}if(r!==l||!u.length)return;let f=S(`div`,`cal-review`);f.append(S(`div`,`cal-review-title`,t(`回顾`,`On this day`)));for(let e of u){let t=S(`button`,`cal-review-row`);t.append(S(`span`,`cal-review-label`,e.label),S(`span`,`cal-review-path`,e.path)),t.title=e.path,t.addEventListener(`click`,()=>{i.daily.open(e.date,{confirmCreate:!1}).catch(()=>void 0)}),f.append(t)}n.append(f)}function j(e=250){o.isConnected&&(u&&a.timers.clear(u),u=a.timers.setTimeout(()=>{u=0,o.isConnected&&o.getClientRects().length!==0&&k()},e))}for(let e of[`create`,`delete`,`rename`])a.vault.on(e,(t,n)=>{let r=Date.now();n&&f.set(n,{ok:!1,at:r}),e===`delete`?f.set(t,{ok:!1,at:r}):f.set(t,{ok:!0,at:r}),j()});let M=()=>{g(),j(0)};window.addEventListener(`morz:daily-settings-changed`,M),a.onDispose(()=>window.removeEventListener(`morz:daily-settings-changed`,M));let N=()=>{o.isConnected&&o.getClientRects().length!==0&&k()};return window.addEventListener(`morz:calendar-refresh`,N),a.onDispose(()=>window.removeEventListener(`morz:calendar-refresh`,N)),g(),{element:o,refresh:()=>void k()}}var D={manifest:{id:`calendar`,name:t(`日历`,`Calendar`),version:`1.1.0`,description:t(`月历面板：有笔记的日期带圆点，点空白日期先确认再创建`,`Month grid with note dots; asks before creating a daily note`),author:`Morz`,permissions:[`vault:read`,`workspace`]},async activate(e){let n=E(e);e.ui.panel({id:`calendar`,name:t(`日历`,`Calendar`),icon:`<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`,render:()=>(n.refresh(),n.element),order:0,defaultVisible:!0,defaultActive:!0}),e.ui.command({id:`open-today`,name:t(`打开今天的笔记`,`Open today's note`),run:()=>void e.daily.open()})}};export{D as calendarPlugin};