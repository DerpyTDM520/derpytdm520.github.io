/* V10 progressive presentation. Content, full-frame media and links remain usable without JS. */
(() => {
 'use strict';
 const body=document.body;
 if(!body.classList.contains('v10'))return;
 const zh=document.documentElement.lang.startsWith('zh');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const cinema=document.getElementById('v10-cinema');
 const player=cinema?.querySelector('video');
 let lastTrigger=null;
 document.querySelectorAll('[data-video]').forEach(trigger=>{
  trigger.addEventListener('click',event=>{
   const path=trigger.dataset.video;
   if(!path || !/^assets\/media\/[a-zA-Z0-9_./-]+\.mp4$/.test(path))return;
   if(!cinema?.showModal || !player)return;
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   event.preventDefault();
   lastTrigger=trigger;
   document.getElementById('v10-cinema-title').textContent=trigger.dataset.videoTitle||(zh?'项目录屏':'Project recording');
   document.querySelectorAll('video').forEach(v=>v.pause());
   player.src=path;player.muted=false;
   cinema.showModal();
   document.documentElement.classList.add('v10-modal-open');
   player.play().catch(()=>{ /* Visible native controls permit explicit retry. */ });
  });
 });
 cinema?.querySelector('[data-cinema-close]')?.addEventListener('click',()=>cinema.close());
 cinema?.addEventListener('click',event=>{if(event.target===cinema){const r=cinema.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)cinema.close();}});
 cinema?.addEventListener('close',()=>{
  player?.pause();if(player){player.removeAttribute('src');player.load();}
  document.documentElement.classList.remove('v10-modal-open');
  lastTrigger?.focus({preventScroll:true});
 });
 // A view filter is content navigation, not an excuse to remove projects.
 const filters=[...document.querySelectorAll('[data-work-filter]')];
 const sections=[...document.querySelectorAll('[data-work-group]')];
 const valid=new Set(['all','software','ai','games','visual']);
 let current='all';
 function setFilter(value,writeURL=false){
  current=valid.has(value)?value:'all';
  filters.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.workFilter===current)));
  sections.forEach(sec=>{sec.hidden=current!=='all'&&sec.dataset.workGroup!==current;});
  const visible=sections.filter(s=>!s.hidden).length;
  const counter=document.querySelector('[data-filter-count]');
  if(counter)counter.textContent=zh?visible+' 个展示区':visible+' sections';
  if(writeURL){const url=new URL(location.href);if(current==='all')url.searchParams.delete('field');else url.searchParams.set('field',current);url.hash='';history.replaceState(null,'',url);}
  document.querySelectorAll('[data-language]').forEach(link=>{const u=new URL(link.href);if(current==='all')u.searchParams.delete('field');else u.searchParams.set('field',current);link.href=u.href;});
 }
 function revealHash(){
  let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  if(!id)return;
  const el=document.getElementById(id);const section=el?.closest('[data-work-group]');
  if(section?.hidden){setFilter(section.dataset.workGroup);requestAnimationFrame(()=>el.scrollIntoView({block:'start',behavior:'instant'}));}
 }
 if(filters.length){
  const requested=new URL(location.href).searchParams.get('field');setFilter(requested||'all');revealHash();
  filters.forEach(btn=>btn.addEventListener('click',()=>setFilter(btn.dataset.workFilter,true)));
  window.addEventListener('hashchange',revealHash);
  window.addEventListener('popstate',()=>{setFilter(new URL(location.href).searchParams.get('field')||'all');revealHash();});
 }
 // Pause recordings when tabs are hidden. No background loops or autoplay swarm.
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
 document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));
 // A small, one-time entrance cue; reduced-motion users see everything immediately.
 if(!reduce.matches && 'IntersectionObserver' in window){
  const targets=document.querySelectorAll('.page-home .project,.page-home .capability,.proof-case,.research-card');
  const observer=new IntersectionObserver(items=>items.forEach(item=>{
   if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target);}
  }),{rootMargin:'0px 0px 35px 0px',threshold:.03});
  targets.forEach(el=>{el.classList.add('v10-reveal-ready');observer.observe(el);});
  const release=()=>{targets.forEach(el=>el.classList.add('is-visible'));observer.disconnect();};
  reduce.addEventListener?.('change',e=>{if(e.matches)release();});
  window.addEventListener('beforeprint',release);
 }
})();
