/* Small enhancements to the existing design; no background requests or WebGL. */
(() => {
 'use strict';
 const body=document.body;if(!body.classList.contains('v11'))return;
 const zh=document.documentElement.lang.startsWith('zh');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const top=document.createElement('button');top.type='button';top.className='v11-back-top';
 top.setAttribute('aria-label',zh?'返回页面顶部':'Back to top');top.hidden=true;
 top.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 body.append(top);
 top.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduce.matches?'instant':'smooth'});document.querySelector('h1')?.setAttribute('tabindex','-1');document.querySelector('h1')?.focus({preventScroll:true});});
 let frame=0;
 function update(){frame=0;const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--v11-progress',max>0?Math.min(1,Math.max(0,scrollY/max)):0);top.hidden=scrollY<900;}
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
 const visibility=()=>body.classList.toggle('is-page-hidden',document.hidden);document.addEventListener('visibilitychange',visibility);visibility();
 const nav=document.querySelector('.section-nav');
 function markCurrent(){if(!nav)return;let id='';try{id=decodeURIComponent(location.hash.slice(1))}catch{};nav.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.hash.slice(1)===id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
 addEventListener('hashchange',markCurrent);markCurrent();
 document.querySelectorAll('[data-work-filter]').forEach(b=>b.addEventListener('click',()=>requestAnimationFrame(()=>{markCurrent();update();})));
})();
