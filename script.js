const pages=[...document.querySelectorAll('.page')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current='invite';
function go(id){
 const next=document.getElementById(id); if(!next)return;
 const old=document.getElementById(current);
 if(window.gsap&&!reduceMotion){
   gsap.killTweensOf([old,next]);
   gsap.to(old,{autoAlpha:0,scale:.97,duration:.22,ease:'power1.in',onComplete:()=>{
     old.classList.remove('active');old.style.display='none';
     next.style.display='flex';next.classList.add('active');
     next.scrollTop=0;window.scrollTo(0,0);
     gsap.fromTo(next,{autoAlpha:0,scale:1.025,y:18},{autoAlpha:1,scale:1,y:0,duration:.55,ease:'power3.out'});
     animatePage(id);
   }});
 }else{
   old.classList.remove('active');next.classList.add('active');
   next.scrollTop=0;window.scrollTo(0,0);
   animatePage(id);
 }
 current=id;
}
function animatePage(id){
 const page=document.getElementById(id);
 const bits=page.querySelectorAll('.reveal');
 if(reduceMotion)return;
 const offsets=[{x:-52,y:0},{x:52,y:0},{x:0,y:-42},{x:0,y:42}];
 let photoIndex=0;
 if(bits.length)bits.forEach((bit,index)=>{
   const offset=offsets[index%offsets.length];
   const isPhoto=id==='pretty'&&bit.classList.contains('polaroid');
   const delay=isPhoto?420+photoIndex++*420:160+index*220;
   if(window.gsap){
     gsap.fromTo(bit,{autoAlpha:0,x:offset.x,y:offset.y,scale:.95},{autoAlpha:1,x:0,y:0,scale:1,duration:isPhoto?.82:.68,delay:delay/1000,ease:'power2.out'});
   }else if(typeof bit.animate==='function'){
     bit.animate(
       [{opacity:0,translate:`${offset.x}px ${offset.y}px`,transform:'scale(.95)'},{opacity:1,translate:'0 0',transform:'scale(1)'}],
       {duration:isPhoto?820:680,delay,fill:'both',easing:'cubic-bezier(.22,1,.36,1)'}
     );
   }
 });
 if(window.gsap){
   if(id==='nope'){
     gsap.fromTo('.nope-image',{y:0,rotation:-2},{y:-19,rotation:2,duration:.58,repeat:-1,yoyo:true,ease:'sine.inOut'});
     gsap.to('.float-heart',{rotation:8,duration:1.1,repeat:-1,yoyo:true,stagger:.25,ease:'sine.inOut'});
   }
   if(id==='letter'){
     gsap.fromTo('.letter-cat',{rotation:-2},{rotation:2,duration:.85,repeat:-1,yoyo:true,ease:'sine.inOut'});
     gsap.fromTo('.envelope',{y:0,rotation:-1},{y:-7,rotation:1,duration:.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
   }
 }
}
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
let pin='';
const pinDots=document.getElementById('pinDots'),pinMessage=document.getElementById('pinMessage');
function renderPin(){pinDots.textContent=[0,1,2,3].map(i=>pin[i]?'●':'○').join(' ')}
document.querySelector('.keypad').addEventListener('click',e=>{
 const key=e.target.closest('[data-key]')?.dataset.key;if(!key)return;
 if(key==='clear'){pin=pin.slice(0,-1);pinMessage.textContent='only you know the little secret...';}
 else if(key==='enter'){
   if(pin==='2065'){pinMessage.textContent='the secret is yours ♡';setTimeout(()=>go('letter'),380);}
   else{pin='';pinMessage.textContent='wrong code, try once more ♡';}
 }else if(pin.length<4)pin+=key;
 renderPin();
});
document.getElementById('openEnvelope').addEventListener('click',()=>{
 const flap=document.querySelector('.envelope-flap');
 if(window.gsap&&!reduceMotion)gsap.timeline().to('.envelope',{rotation:-3,y:-8,duration:.12}).to('.envelope',{rotation:3,y:0,duration:.12}).to(flap,{rotationX:180,duration:.35,transformOrigin:'top',ease:'power2.inOut'}).to('.envelope-heart',{scale:1.5,opacity:0,duration:.2},'-=.15');
 setTimeout(()=>go('note'),window.gsap&&!reduceMotion?550:0);
});
document.querySelectorAll('img[data-photo]').forEach(img=>{
 const hidePlaceholder=()=>{if(img.nextElementSibling?.classList.contains('photo-placeholder'))img.nextElementSibling.hidden=true;};
 img.addEventListener('load',hidePlaceholder);
 img.addEventListener('error',()=>{img.style.display='none';});
 if(img.complete&&img.naturalWidth)hidePlaceholder();
});
window.addEventListener('load',()=>{
 const splash=document.getElementById('welcomeSplash');
 if(splash){
   splash.classList.add('is-opening');
   splash.addEventListener('animationend',()=>splash.remove(),{once:true});
   window.setTimeout(()=>splash.remove(),2600);
 }
 if(window.gsap&&!reduceMotion){
  animatePage('invite');
  gsap.to('.camera-area',{rotation:1.5,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.decor',{rotation:8,duration:2.2,repeat:-1,yoyo:true,stagger:.3,ease:'sine.inOut'});
 }else if(!reduceMotion)animatePage('invite');
});
