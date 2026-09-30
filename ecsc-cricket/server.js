const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const PW=process.env.ADMIN_PASSWORD||'ECS2026',PORT=process.env.PORT||3000,DB=path.join(__dirname,'data.json');
let state={teams:[],groups:[],fixtures:[],live:null,history:[]};
try{state=JSON.parse(fs.readFileSync(DB))}catch(e){fs.writeFileSync(DB,JSON.stringify(state))}
const tokens=new Set(),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const send=(r,c,b,t='application/json')=>{r.writeHead(c,{'Content-Type':t,'Cache-Control':'no-store'});r.end(typeof b==='string'||Buffer.isBuffer(b)?b:JSON.stringify(b))};

const server = http.createServer((q,r)=>{
  const u=q.url.split('?')[0];
  if(u==='/api/state'&&q.method==='GET')return send(r,200,state);
  if(q.method==='POST'&&(u==='/api/login'||u==='/api/state')){let b='';q.on('data',d=>{b+=d;if(b.length>2e7)q.destroy()});q.on('end',()=>{try{const j=JSON.parse(b);
  if(u==='/api/login'){if(j.password===PW){const t=crypto.randomBytes(24).toString('hex');tokens.add(t);return send(r,200,{token:t})}return send(r,401,{error:'Wrong password'})}
  if(!tokens.has(q.headers['x-token']))return send(r,401,{error:'Login required'});
  state=j;fs.writeFile(DB,JSON.stringify(state),()=>{});send(r,200,{ok:1})}catch(e){send(r,400,{error:'Bad request'})}})}return}
  const p=u==='/admin'||u==='/admin/'?'/admin/index.html':u==='/'?'/public/index.html':u.startsWith('/admin/')?u:'/public'+u;
  const f=path.join(__dirname,p);
  if(!f.startsWith(path.join(__dirname,'public'))&&!f.startsWith(path.join(__dirname,'admin')))return send(r,403,'Forbidden','text/plain');
  fs.readFile(f,(e,d)=>e?send(r,404,'Not found','text/plain'):send(r,200,d,types[path.extname(f)]||'application/octet-stream'));
});

if(!process.env.VERCEL) {
  server.listen(PORT, ()=>console.log('Public site: http://localhost:'+PORT+'\nAdmin panel: http://localhost:'+PORT+'/admin'));
}

module.exports = server;
