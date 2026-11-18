const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];

// Loader
const loader=$('#loader'),loaderNum=$('#loaderNum'),loaderBar=$('#loaderBar');let progress=0;const loadTimer=setInterval(()=>{progress+=Math.floor(Math.random()*10)+7;if(progress>=100){progress=100;clearInterval(loadTimer);setTimeout(()=>loader.remove(),380)}loaderNum.textContent=String(progress).padStart(2,'0');loaderBar.style.width=progress+'%'},75);

// Cursor
const cursor=$('#cursor');document.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});$$('a,button,.featured,.archive-card,.orb').forEach(el=>{el.addEventListener('mouseenter',()=>{if(cursor){cursor.style.width='58px';cursor.style.height='58px'}});el.addEventListener('mouseleave',()=>{if(cursor){cursor.style.width='22px';cursor.style.height='22px'}})});

// Mobile menu
const menuBtn=$('#menuBtn'),mobileMenu=$('#mobileMenu');menuBtn.addEventListener('click',()=>{mobileMenu.classList.toggle('open');menuBtn.innerHTML=mobileMenu.classList.contains('open')?'CLOSE ×':'MENU <b>+</b>'});$$('a',mobileMenu).forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuBtn.innerHTML='MENU <b>+</b>'}));

// Scroll reveal
const reveal=$$('.studio-layout,.numbers,.featured,.archive-card,.statement h2,.statement-grid,.about-grid,.contact h2,.email,.terminal');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(45px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});observer.unobserve(entry.target)}}),{threshold:.1});reveal.forEach(el=>{el.style.opacity=0;observer.observe(el)});

// Counters
const counters=$$('[data-count]');const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.count;let start=0;const step=()=>{start=Math.min(target,start+Math.ceil(target/25));el.textContent=start;if(start<target)requestAnimationFrame(step)};step();countObserver.unobserve(el)}}),{threshold:.8});counters.forEach(c=>countObserver.observe(c));

// Archive filters
$$('#filters button').forEach(btn=>btn.addEventListener('click',()=>{ $$('#filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;$$('.archive-card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter)) }));

const projects={
 nova:{title:'NOVA',kicker:'01 / LIVE PROJECT',desc:'A selected digital identity project. Open the live build to explore the interactive experience.',url:'https://nova-gilt-psi.vercel.app/',images:[]},
 casa:{title:'CASA MIRA',kicker:'02 / LIVE PROJECT',desc:'Hospitality-led identity and digital experience.',url:'https://casa-mira-inky.vercel.app/',images:[]},
 noire:{title:'NOIRÉ',kicker:'03 / LIVE PROJECT',desc:'Luxury visual direction and digital presentation.',url:'https://noire-five-blond.vercel.app/',images:[]},
 forma:{title:'FORMA',kicker:'04 / LIVE PROJECT',desc:'A clean identity and digital system built around form and structure.',url:'https://forma-ochre-nine.vercel.app/',images:[]},
 savoro:{title:'SAVORO',kicker:'05 / LIVE PROJECT',desc:'Food-led brand and menu experience.',url:'https://savoro-puce.vercel.app/#menu',images:[]},
 eventbudget:{title:'EVENTBUDGET',kicker:'06 / LIVE PROJECT',desc:'A product-style digital experience for event planning and budgeting.',url:'https://eventbudget-sooty.vercel.app/',images:[]},
 radhe:{title:'RADHE ARENA',kicker:'07 / LIVE PROJECT',desc:'Sports booking and digital experience.',url:'https://radhearena.vercel.app/',images:[]},
 wafflora:{title:'WAFFLORA',kicker:'ARCHIVE / FOOD BRAND',desc:'Food branding artwork from the supplied design archive.',url:'',images:[1]},
 mexican:{title:'MEXICAN PIZZA PARLOUR',kicker:'ARCHIVE / MENU SYSTEM',desc:'Restaurant menu, food direction, QR menu and promotional design series.',url:'',images:[2,3,4,5,6,7,8,36,37,38,39,40,41,42,43,44,45,47,48]},
 funwave:{title:'FUNWAVE',kicker:'ARCHIVE / BRAND SYSTEM',desc:'A broad visual system spanning campaign creatives, packaging, character development, expressions, turnarounds and applications.',url:'',images:[9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]},
 ks:{title:'KS ENTERPRISE',kicker:'ARCHIVE / CORPORATE FESTIVE',desc:'Corporate Rath Yatra communication with a premium dark-gold visual language.',url:'',images:[46]},
 invites:{title:'EVENT & INVITATION DESIGN',kicker:'ARCHIVE / EVENT CREATIVE',desc:'Gujarati invitation and devotional event communication.',url:'',images:[50,51]}
};

// Modal
const modal=$('#modal'),modalTitle=$('#modalTitle'),modalKicker=$('#modalKicker'),modalDesc=$('#modalDesc'),modalLive=$('#modalLive'),gallery=$('#modalGallery');
function openProject(key){const p=projects[key];if(!p)return;modalTitle.textContent=p.title;modalKicker.textContent=p.kicker;modalDesc.textContent=p.desc;gallery.innerHTML='';if(p.images.length){p.images.forEach((n,i)=>{const img=document.createElement('img');img.src=`assets/work/page-${String(n).padStart(2,'0')}.jpg`;img.alt=`${p.title} archive image ${i+1}`;img.loading='lazy';img.addEventListener('click',()=>img.classList.toggle('zoom'));gallery.appendChild(img)});modalLive.classList.add('disabled');modalLive.removeAttribute('href')}else{modalLive.classList.remove('disabled');modalLive.href=p.url}modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.scrollTop=0}
$$('[data-project]').forEach(card=>card.addEventListener('click',()=>openProject(card.dataset.project)));
$('#modalClose').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';$$('.zoom',gallery).forEach(i=>i.classList.remove('zoom'))}

// Copy email
$('#copyEmail').addEventListener('click',async()=>{const btn=$('#copyEmail');try{await navigator.clipboard.writeText('aivisionstudio2821@gmail.com');btn.textContent='COPIED ✓';setTimeout(()=>btn.textContent='COPY EMAIL ↗',1500)}catch{btn.textContent='aivisionstudio2821@gmail.com'}});

// Smooth anchor fallback
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=$(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));
