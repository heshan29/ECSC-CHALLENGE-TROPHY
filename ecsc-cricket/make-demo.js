const fs=require('fs'),vm=require('vm');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('public/common.js','utf8').replace(/^const \$=.*\n/,'').replace(/^const ov=/,'var ov=').replace(/const (T|uid|logo|pn|sr|eco|RN)=/g,'var $1=')+';var newInn=newInn',ctx);
const {T,newInn,uid,pn}=ctx;
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const F=['Kasun','Nimal','Ruwan','Sahan','Dilan','Thilina','Chamod','Isuru','Lakshan','Pasindu','Yasas','Hasitha','Dinuka','Sandun','Buddhika','Malith'],L=['Perera','Silva','Fernando','Jayasuriya','Gunawardena','Bandara','Wickramasinghe','Rajapaksa','Dissanayake','Herath','Kumara','Senanayake'];
const R=['Batsman','Batsman','Batsman','Batsman','Wicket-Keeper','All-rounder','All-rounder','Bowler','Bowler','Bowler','Bowler'];
const N=['Byte Blasters','Kernel Kings','Pixel Pacers','Stack Strikers','Logic Lions','Circuit Chargers','Binary Bulls','Script Spinners'];
const S={teams:[],groups:[],fixtures:[],live:null,history:[],settings:{name:'ECSC Challenge Trophy 2026',sub:'Electronic and Computer Science, University of Kelaniya',maxTeams:8,gpr:2,tpg:4,overs:10,squad:15,xi:11,rounds:[{id:'r1',name:'Round 1'},{id:'r2',name:'Second Round'},{id:'final',name:'Final'}]}};const V='ECSC Ground';
N.forEach((n,t)=>S.teams.push({id:'t'+t,name:n,logo:'',players:R.map((r,k)=>({id:`t${t}p${k}`,name:F[(k+t*3)%16]+' '+L[(k*5+t)%12],no:k+1,role:r}))}));
const id=t=>'t'+t;
function ball(i,p,bowlers){ // same rules as admin conf()
 if(i.overDone){i.over=[];i.overDone=false}
 const legal=!p.wd&&!p.nb,bat=p.wd?0:p.runs,ex=(p.wd?1+p.runs:0)+(p.nb?1:0),tot=bat+ex,b=i.bt[i.striker],bid=i.bowler,w=i.bw[bid]||(i.bw[bid]={b:0,r:0,w:0,m:0,wd:0,nb:0,or:0});
 i.runs+=tot;i.extras+=ex;if(p.wd)i.ex.wd+=1+p.runs;if(p.nb)i.ex.nb++;
 if(!p.wd){b.b++;b.r+=bat;if(bat==4)b.f++;if(bat==6)b.s++}
 w.r+=tot;w.or+=tot;if(p.wd)w.wd++;if(p.nb)w.nb++;if(legal){w.b++;i.balls++}
 i.partner+=tot;i.over.push({l:(p.wd?'WD'+(p.runs?'+'+p.runs:''):p.nb?'NB'+(p.runs?'+'+p.runs:''):p.out?'W':p.runs||'•'),w:!!p.out});
 const end=legal&&i.balls%6==0;let sw=bat%2==1;
 if(end){if(w.or==0)w.m++;w.or=0;i.prog.push(i.runs);i.overDone=true;sw=!sw}
 if(p.out){i.wkts++;i.bt[i.striker].out=true;i.bt[i.striker].how='b '+pn(S,i.bowl,bid);w.w++;i.partner=0;
  const nb=i.next++;if(nb>=11){i.striker=null}else{i.striker=id2(i,nb);i.bt[i.striker]={r:0,b:0,f:0,s:0,out:false};i.order.push(i.striker)}if(end)[i.striker,i.non]=[i.non,i.striker]}
 else if(sw)[i.striker,i.non]=[i.non,i.striker];
 if(end)i.bowler=bowlers[(i.balls/6)%bowlers.length]}
const id2=(i,k)=>i.bat+'p'+k;
function sim(a,b,overs,target,stop){const i=newInn(id(a),id(b));i.next=2;const bw=S.teams[b].players.filter(p=>/Bowler|All/.test(p.role)).map(p=>p.id);
 i.striker=id2(i,0);i.non=id2(i,1);[i.striker,i.non].forEach(x=>{i.bt[x]={r:0,b:0,f:0,s:0,out:false};i.order.push(x)});i.bowler=bw[0];
 while(i.balls<(stop??overs*6)&&i.wkts<10&&!(target&&i.runs>=target)){const x=rnd(),p={runs:0,wd:0,nb:0,out:0};
  if(x<.04)p.wd=1;else if(x<.06)p.nb=1;const y=rnd();p.runs=y<.33?0:y<.6?1:y<.72?2:y<.74?3:y<.86?4:y<.93?6:1;
  if(!p.wd&&rnd()<.055){p.out=1;p.runs=0}ball(i,p,bw);if(i.striker==null)break}
 delete i.next;return i}
function match(a,b,round,date,time,group,overs=10){const x=sim(a,b,overs),y=sim(b,a,overs,x.runs+1),n1=S.teams[a].name,n2=S.teams[b].name;let win,res;
 if(y.runs>x.runs){win=id(b);res=`${n2} won by ${10-y.wkts} wickets${overs*6>y.balls?` (with ${overs*6-y.balls} balls remaining)`:''}`}else if(x.runs>y.runs){win=id(a);res=`${n1} won by ${x.runs-y.runs} runs`}else{win=null;res='Match tied'}
 S.history.push({id:uid(),a:id(a),b:id(b),xi:{[id(a)]:S.teams[a].players.map(p=>p.id),[id(b)]:S.teams[b].players.map(p=>p.id)},maxW:10,date,time,venue:V,group,overs,round,cur:1,status:'ended',inn:[x,y],result:res,win,archived:true})}
const gA=uid(),gB=uid();
S.groups.push({id:gA,round:'r1',name:'Group A',teams:[0,1,2,3].map(id)},{id:gB,round:'r1',name:'Group B',teams:[4,5,6,7].map(id)});
[[0,1,'2026-09-28','14:00',gA],[2,3,'2026-09-28','17:30',gA],[0,2,'2026-09-29','14:00',gA],[4,5,'2026-09-29','17:30',gB],[6,7,'2026-09-29','20:30',gB],[4,6,'2026-09-30','10:00',gB]].forEach(([a,b,d,t,g])=>match(a,b,'r1',d,t,g));
const fx=(r,g,a,b,date,time)=>S.fixtures.push({id:uid(),round:r,group:g,a:id(a),b:id(b),date,time,venue:V,label:'',xiA:S.teams[a].players.map(p=>p.id),xiB:S.teams[b].players.map(p=>p.id)});
fx('r1',gA,0,3,'2026-10-01','17:30');fx('r1',gA,1,2,'2026-10-02','14:00');fx('r1',gB,5,7,'2026-10-02','17:30');fx('r1',gB,4,7,'2026-10-03','14:00');fx('r1',gB,5,6,'2026-10-03','17:30');
const g2=uid(),g3=uid();S.groups.push({id:g2,round:'r2',name:'Group A',teams:[0,2,4,6].map(id)},{id:g3,round:'r2',name:'Group B',teams:[1,3,5,7].map(id)});
fx('r2',g2,0,4,'2026-10-05','14:00');fx('r2',g2,2,6,'2026-10-05','17:30');fx('r2',g3,1,5,'2026-10-06','14:00');fx('r2',g3,3,7,'2026-10-06','17:30');fx('final',null,0,1,'2026-10-08','17:00');
// live: Kernel Kings (1) vs Logic Lions (4) in a chase, 6.3 overs in
const x=sim(1,3,10),y=sim(3,1,10,x.runs+1,39);
S.live={id:uid(),fid:null,a:id(1),b:id(3),xi:{t1:S.teams[1].players.map(p=>p.id),t3:S.teams[3].players.map(p=>p.id)},maxW:10,date:'2026-09-30',time:'15:00',venue:V,group:gA,overs:10,round:'r1',cur:1,status:'live',inn:[x,y]};
fs.writeFileSync('data.json',JSON.stringify(S));
// standalone demo page
const img='data:image/jpeg;base64,'+fs.readFileSync('public/hero.jpg').toString('base64');let h=fs.readFileSync('public/index.html','utf8');
h=h.replace('<link rel=stylesheet href=/style.css>','<style>'+fs.readFileSync('public/style.css','utf8').split('url(/hero.jpg)').join('url('+img+')')+'</style>').replace('src=/hero.jpg','src="'+img+'"')
 .replace('<script src=/common.js></script><script src=/app.js></script>','<script>window.__S='+JSON.stringify(S)+'</script><script>'+fs.readFileSync('public/common.js','utf8')+'</script><script>'+fs.readFileSync('public/app.js','utf8').replace('pull();setInterval(pull,2000);','S=window.__S;syncRN(S);draw();')+'</script>');
fs.writeFileSync('ecsc-demo.html',h);
console.log(S.history.map(h=>h.result));
