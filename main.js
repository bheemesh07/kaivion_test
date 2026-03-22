/* Neural canvas */
const canvas=document.getElementById('neural-canvas'),ctx=canvas.getContext('2d');let nodes=[];
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
function init(n=70){nodes=Array.from({length:n},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.8,p:Math.random()*Math.PI*2}))}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);const M=160;
  nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;n.p+=.018;if(n.x<0||n.x>canvas.width)n.vx*=-1;if(n.y<0||n.y>canvas.height)n.vy*=-1});
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
    const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<M){ctx.strokeStyle=`rgba(124,58,237,${(1-d/M)*.18})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke()}}
  nodes.forEach(n=>{const p=.6+.4*Math.sin(n.p);ctx.beginPath();ctx.arc(n.x,n.y,n.r*p,0,Math.PI*2);ctx.fillStyle=`rgba(167,139,250,${.45*p})`;ctx.fill()});
  requestAnimationFrame(draw)}
resize();init();draw();
window.addEventListener('resize',()=>{resize();init()});

/* Navbar */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50));

/* Mobile menu */
const ham=document.getElementById('hamburger'),mob=document.getElementById('mob-menu'),cls=document.getElementById('mob-close');
ham.addEventListener('click',()=>mob.classList.add('open'));
cls.addEventListener('click',()=>mob.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>mob.classList.remove('open')));

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

/* Reveal */
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* Counter */
function count(el,target){let c=0;const s=target/55,id=setInterval(()=>{c=Math.min(c+s,target);el.textContent=Math.floor(c)+'+';if(c>=target)clearInterval(id)},22)}
const so=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.hstat-n').forEach(n=>count(n,parseInt(n.dataset.target)));so.unobserve(e.target)}}),{threshold:.6});
const hs=document.querySelector('.hero-stats');if(hs)so.observe(hs);

/* Form */
const cf=document.getElementById('cform'),ok=document.getElementById('cform-ok');
cf.addEventListener('submit',e=>{e.preventDefault();const b=cf.querySelector('.btn-primary');b.textContent='Sending...';b.disabled=true;setTimeout(()=>{b.textContent='Send Message →';b.disabled=false;ok.style.display='block';cf.reset();setTimeout(()=>ok.style.display='none',5000)},1200)});
