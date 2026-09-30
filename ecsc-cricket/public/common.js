const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ov=b=>Math.floor(b/6)+'.'+b%6,T=(s,id)=>s.teams.find(t=>t.id==id),uid=()=>Math.random().toString(36).slice(2,8);
const logo=t=>!t?'':t.logo?`<img class=lg src="${t.logo}" alt="">`:`<span class=lg>${esc((t.name||'?')[0])}</span>`;
const pn=(s,tid,pid)=>{const p=(T(s,tid)?.players||[]).find(p=>p.id==pid);return p?p.name:'-'};
const sr=(r,b)=>b?(r*100/b).toFixed(1):'0.0',eco=(r,b)=>b?(r*6/b).toFixed(2):'0.00';
function newInn(bat,bowl){return{bat,bowl,runs:0,wkts:0,balls:0,extras:0,ex:{wd:0,nb:0},bt:{},order:[],striker:null,non:null,bowler:null,bw:{},over:[],prog:[],partner:0}}
function batTable(s,i){const t=T(s,i.bat);return`<div class=card><div class=pad><span class=f>${logo(t)}<b>${esc(t?.name)}</b><span class=lab>Batting</span></span></div><table><tr><th>Batter<th>R<th>B<th>4s<th>6s<th>SR</tr>${i.order.map(id=>{const b=i.bt[id];return`<tr><td>${esc(pn(s,i.bat,id))}${id==i.striker?' *':''}${b.out?` <span class=ex>${b.how||'out'}</span>`:''}<td class=bd>${b.r}<td>${b.b}<td class=bd>${b.f}<td class=bd>${b.s}<td>${sr(b.r,b.b)}</tr>`}).join('')}<tr><td class=ex>Extras<td colspan=5 class=ex>${i.extras} (wd ${i.ex.wd}, nb ${i.ex.nb})</tr><tr><td><b>Total</b><td colspan=5><b>${i.runs}/<span class=wk>${i.wkts}</span> (${ov(i.balls)})</b></tr></table></div>`}
function bowlTable(s,i){const t=T(s,i.bowl);return`<div class=card><div class=pad><span class=f>${logo(t)}<b>${esc(t?.name)}</b><span class=lab>Bowling</span></span></div><table><tr><th>Bowler<th>O<th>M<th>R<th>W<th>ECO<th>WD/NB</tr>${Object.entries(i.bw).map(([id,w])=>`<tr><td>${esc(pn(s,i.bowl,id))}${id==i.bowler?' *':''}<td>${ov(w.b)}<td>${w.m}<td>${w.r}<td class=wk>${w.w}<td>${eco(w.r,w.b)}<td class=ex>${w.wd}/${w.nb}</tr>`).join('')}</table></div>`}
function standings(s,g){const r={};g.teams.forEach(id=>r[id]={id,m:0,w:0,l:0,rs:0,of:0,rc:0,ob:0});
 s.history.filter(h=>h.round==g.round&&r[h.a]&&r[h.b]).forEach(h=>{h.inn.forEach(i=>{const o=i.wkts>=(h.maxW||10)?h.overs*6:i.balls;r[i.bat].rs+=i.runs;r[i.bat].of+=o;r[i.bowl].rc+=i.runs;r[i.bowl].ob+=o});r[h.a].m++;r[h.b].m++;if(h.win){r[h.win].w++;r[h.win==h.a?h.b:h.a].l++}});
 return Object.values(r).map(x=>({...x,nrr:(x.of?x.rs/(x.of/6):0)-(x.ob?x.rc/(x.ob/6):0)})).sort((a,b)=>b.nrr-a.nrr||b.w-a.w)}
const RN={};
function cfg(s){return{name:'ECSC Challenge Trophy 2026',sub:'Electronic and Computer Science, University of Kelaniya',maxTeams:8,gpr:2,tpg:4,overs:10,squad:15,xi:11,rounds:[{id:'r1',name:'Round 1'},{id:'r2',name:'Second Round'},{id:'final',name:'Final'}],...(s.settings||{})}}
function syncRN(s){Object.keys(RN).forEach(k=>delete RN[k]);cfg(s).rounds.forEach(r=>RN[r.id]=r.name)}
