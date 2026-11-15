/* Original synthetic UI demo. No network requests, cookies, storage, analytics or personal records. */
(() => {
'use strict';
const views = new Set(['explore','culture','folklore','campus','reader','saved','search','settings']);
const entries = [
 {id:'lantern',title:'The Lantern Harbor',kind:'culture',subtitle:'A fictional journey through memory and light.'},
 {id:'garden',title:'The Glass Gardens',kind:'culture',subtitle:'An invented botanical city.'},
 {id:'whisper',title:'The Whispering Grove',kind:'folklore',subtitle:'An original fictional folk story.'},
 {id:'moon',title:'The Moonlit Bell',kind:'folklore',subtitle:'An imagined clocktower legend.'},
];
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
let current='explore', selected='lantern', saved = new Set(), lang='en', step=0;
const names={en:['Explore','Search','Saved','Settings'],zh:['探索','搜索','收藏','设置']};
function drawGlobe(){
 const c=$('#globe');if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;
 const W=c.width,H=c.height,cx=325,cy=308,r=248;
 ctx.clearRect(0,0,W,H);
 function rand(n){const x=Math.sin(n*129.432+78.233)*43875.23;return x-Math.floor(x)}
 // Original conceptual star background, with no real coordinates or NASA imagery.
 for(let i=0;i<170;i++){
  const x=rand(i+2)*W,y=rand(i+700)*H,a=.1+rand(i+18)*.25;
  ctx.fillStyle='rgba(205,227,248,'+a+')';ctx.beginPath();ctx.arc(x,y,rand(i+80)*1.2,0,Math.PI*2);ctx.fill();
 }
 ctx.save();ctx.shadowColor='rgba(92,171,245,.5)';ctx.shadowBlur=50;
 const sea=ctx.createRadialGradient(cx-100,cy-150,0,cx,cy,r+14);
 sea.addColorStop(0,'#325773');sea.addColorStop(.43,'#142d4a');sea.addColorStop(.78,'#0a1d34');sea.addColorStop(1,'#05101f');
 ctx.fillStyle=sea;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
 ctx.restore();
 ctx.save();ctx.beginPath();ctx.arc(cx,cy,r-1,0,Math.PI*2);ctx.clip();
 ctx.strokeStyle='rgba(122,183,229,.13)';ctx.lineWidth=1;
 for(let j=-4;j<=4;j++){
  const yy=cy+j*49; const half=Math.sqrt(Math.max(0,r*r-(yy-cy)**2));
  ctx.beginPath();ctx.ellipse(cx,yy,half,14+Math.abs(j)*2,0,0,Math.PI*2);ctx.stroke();
 }
 for(let j=-3;j<=3;j++){
  const x=cx+j*75;
  ctx.beginPath();ctx.ellipse(x,cy,10+Math.abs(j)*5,r-6,0,0,Math.PI*2);ctx.stroke();
 }
 const islands=[
 [[-190,-90],[-142,-137],[-80,-152],[-33,-121],[20,-131],[94,-92],[128,-22],[67,19],[3,13],[-38,55],[-97,38],[-152,-2]],
 [[-89,95],[-25,81],[31,98],[89,128],[70,194],[18,207],[-20,160],[-80,157]],
 [[133,23],[173,15],[208,46],[197,108],[144,129],[117,78]],
 ];
 for(let k=0;k<islands.length;k++){
  const path=islands[k];ctx.beginPath();
  path.forEach(([dx,dy],i)=>{const x=cx+dx,y=cy+dy;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});
  ctx.closePath();ctx.fillStyle=k===1?'#244f4d':'#234953';ctx.globalAlpha=.68;ctx.fill();
  ctx.globalAlpha=.8;ctx.strokeStyle='#54787d';ctx.stroke();
 }
 // Warm fictional city light clusters spread only inside round globe.
 for(let i=0;i<1500;i++){
  const k=i%7,clx=[-125,-48,65,130,12,-20,185][k],cly=[-60,-105,-20,95,155,55,20][k];
  const dx=clx+(rand(i*7+4)-.5)*105,dy=cly+(rand(i*5+99)-.5)*70;
  const x=cx+dx,y=cy+dy;if((x-cx)**2+(y-cy)**2>(r-10)**2)continue;
  const s=.5+rand(i+288)*1.4,alpha=.12+rand(i+42)*.55;
  ctx.fillStyle='rgba(255,206,114,'+alpha+')';
  ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill();
 }
 // Deep shadow over east, fading into rim light.
 const shade=ctx.createLinearGradient(cx-240,cy-160,cx+280,cy+100);
 shade.addColorStop(0,'rgba(4,10,25,.03)');shade.addColorStop(.56,'rgba(5,12,30,.16)');shade.addColorStop(1,'rgba(2,7,18,.83)');
 ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);
 ctx.restore();
 const halo=ctx.createRadialGradient(cx,cy,r-8,cx,cy,r+31);
 halo.addColorStop(0,'rgba(155,218,255,0)');halo.addColorStop(.32,'rgba(111,193,255,.22)');halo.addColorStop(1,'rgba(88,152,207,0)');
 ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,r+35,0,7);ctx.fill();
 ctx.strokeStyle='#8fb9df70';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,2.8,5.85);ctx.stroke();
}
function setSave(){
 const btn=$('#reader-save'), active=saved.has(selected);
 btn.textContent=active?'★ Saved':'☆ Save';
 btn.setAttribute('aria-pressed',String(active));
}
function updateSaved(){
 const list=$('#saved-list'), arr=entries.filter(x=>saved.has(x.id));
 $('#saved-count').textContent=arr.length+' '+(arr.length===1?'example':'examples')+' saved';
 list.replaceChildren();
 if(arr.length===0){
  const p=document.createElement('p');p.className='lede';
  p.textContent='No examples saved yet. Open any fictional story and use Save.';
  list.append(p);return;
 }
 for(const item of arr){
  const b=document.createElement('button');b.className='entry-card';b.dataset.open=item.id;
  const small=document.createElement('span');small.className='entry-kind';small.textContent='SYNTHETIC EXAMPLE';
  const strong=document.createElement('strong');strong.textContent=item.title;
  const sub=document.createElement('span');sub.className='entry-summary';sub.textContent=item.subtitle;
  b.append(small,strong,sub);list.append(b);
 }
}
function updateSearch(){
 const value=($('#search-input').value||'').toLowerCase().trim();
 const results=$('#search-results');results.replaceChildren();
 const matches=entries.filter(e=>(e.title+' '+e.subtitle).toLowerCase().includes(value));
 const intro=document.createElement('p');intro.className='eyebrow';
 intro.textContent=matches.length+' ORIGINAL FICTIONAL EXAMPLE'+(matches.length===1?'':'S');results.append(intro);
 for(const item of matches){
  const b=document.createElement('button');b.className='entry-card search-result';b.dataset.open=item.id;
  const title=document.createElement('strong');title.textContent=item.title;
  const sub=document.createElement('span');sub.className='entry-summary';sub.textContent=item.subtitle;
  b.append(title,sub);results.append(b);
 }
}
function show(id){
 if(!views.has(id))id='explore';
 current=id;
 $$('.view').forEach(v=>v.hidden=v.dataset.view!==id);
 $$('.bottom-nav button').forEach(b=>{
  b.classList.toggle('active',b.dataset.target===id ||
    (['culture','folklore','campus','reader'].includes(id)&&b.dataset.target==='explore'));
 });
 updateSaved();if(id==='search')updateSearch();
 window.scrollTo({top:0,behavior:'instant'});
 document.body.dataset.currentView=id;
 if(id==='explore')drawGlobe();
}
function openEntry(id){
 const item=entries.find(x=>x.id===id);if(!item)return;
 selected=item.id;
 $('#reader-title').textContent=item.title;
 $('#reader-subtitle').textContent=item.subtitle;
 $('#reader-back-label').textContent=item.kind==='culture'?'Culture':'Folklore';
 $('#reader-kicker').textContent=item.kind==='culture'?'01 / CULTURE / SYNTHETIC':'02 / FOLKLORE / SYNTHETIC';
 setSave();
 location.hash='reader';
}
document.addEventListener('click',ev=>{
 const open=ev.target.closest('[data-open]');
 if(open){ev.preventDefault();openEntry(open.dataset.open);return}
 const button=ev.target.closest('[data-target]');
 if(button){ev.preventDefault();location.hash=button.dataset.target;return}
});
$('#reader-save').addEventListener('click',()=>{
 if(saved.has(selected))saved.delete(selected);else saved.add(selected);
 setSave();updateSaved();
});
$('#reader-back').addEventListener('click',()=>{
 const e=entries.find(e=>e.id===selected);
 location.hash=e?.kind||'culture';
});
$('#search-input').addEventListener('input',updateSearch);
$('#scene-step').addEventListener('click',()=>{
 step=(step+1)%5;
 $('#campus-cursor').style.transform='translate('+(step*21)+'px,'+(-step*19)+'px)';
});
for(const [id,language] of [['demo-lang-en','en'],['demo-lang-zh','zh']]){
 $('#'+id).addEventListener('click',()=>{
  lang=language;document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  $('#demo-lang-en').classList.toggle('is-active',lang==='en');
  $('#demo-lang-zh').classList.toggle('is-active',lang==='zh');
  $('#demo-lang-en').setAttribute('aria-checked',String(lang==='en'));
  $('#demo-lang-zh').setAttribute('aria-checked',String(lang==='zh'));
  $$('.bottom-nav button span:last-child').forEach((el,i)=>el.textContent=names[lang][i]);
 });
}
$('#reduced-motion').addEventListener('change',e=>document.documentElement.style.scrollBehavior=e.target.checked?'auto':'smooth');
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
show(location.hash.slice(1));
})();
