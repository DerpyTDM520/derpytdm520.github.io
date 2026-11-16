/* Decorative light paths only. Project media and user controls remain native HTML. */
(() => {
 'use strict';
 const canvas=document.querySelector('.cinema-dust');if(!canvas)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let width=0,height=0,dots=[],raf=0,visible=true,last=0;
 function random(seed){const n=Math.sin(seed*127.1+311.7)*43758.5453;return n-Math.floor(n)}
 function measure(){
  const box=canvas.getBoundingClientRect();width=box.width;height=box.height;
  const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  dots=[];const count=width<650?300:850;
  for(let i=0;i<count;i++){
   const t=random(i*7+2),trail=i%3,x=t*width;
   const core=trail===0?height*(.86-Math.sin(t*Math.PI)*.36):trail===1?height*(.87-.39*t+.06*Math.sin(t*8)):height*(.38+.20*Math.sin(t*4));
   const spread=(random(i*13+9)-.5)*(trail===2?50:27);
   dots.push({x,y:core+spread,size:.45+random(i*4+3)*1.1,alpha:.12+random(i*6+4)*.55,warm:trail===1,seed:i});
  }
  for(let i=0;i<(width<650?50:140);i++)dots.push({x:random(i+4001)*width,y:random(i+6210)*height*.62,size:.3+random(i+7201)*.65,alpha:.2+random(i+8123)*.3,warm:i%3===0,seed:i+count});
  draw(0);
 }
 function draw(time){
  ctx.clearRect(0,0,width,height);
  for(const p of dots){const pulse=motion.matches?1:.8+.2*Math.sin(time*.0005+p.seed*.77);ctx.fillStyle=p.warm?'rgba(246,208,150,'+(p.alpha*pulse)+')':'rgba(105,215,237,'+(p.alpha*pulse)+')';ctx.beginPath();ctx.arc(p.x,p.y+(motion.matches?0:Math.sin(time*.00015+p.seed)*1.4),p.size,0,Math.PI*2);ctx.fill();}
 }
 function tick(time){raf=0;if(document.hidden||!visible||motion.matches)return;if(time-last>45){draw(time);last=time;}raf=requestAnimationFrame(tick)}
 function sync(){if(raf)cancelAnimationFrame(raf);raf=0;if(!document.hidden&&visible&&!motion.matches)raf=requestAnimationFrame(tick);else draw(0)}
 measure();sync();
 let resize=0;addEventListener('resize',()=>{clearTimeout(resize);resize=setTimeout(()=>{measure();sync()},100)},{passive:true});
 document.addEventListener('visibilitychange',sync);motion.addEventListener?.('change',sync);
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;sync()},{threshold:0}).observe(canvas)}
 addEventListener('pagehide',()=>{if(raf)cancelAnimationFrame(raf)},{once:true});
})();
