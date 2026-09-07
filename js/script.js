(function(){
const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const langBtn=document.getElementById('langBtn');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('mainNav');
const scrollTop=document.getElementById('scrollTop');
let lang=localStorage.getItem('yukke-lang')||'id';
let theme=localStorage.getItem('yukke-theme')||'light';
function applyTheme(){body.dataset.theme=theme;document.documentElement.dataset.theme=theme;document.documentElement.style.backgroundColor=theme==='dark'?'#07100d':'#f4f1e9';if(themeBtn)themeBtn.innerHTML=theme==='dark'?'<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M12 2.5v2M12 19.5v2M4.76 4.76l1.42 1.42M17.82 17.82l1.42 1.42M2.5 12h2M19.5 12h2M4.76 19.24l1.42-1.42M17.82 6.18l1.42-1.42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"/></svg>':'<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20.5 14.6A8.3 8.3 0 0 1 9.4 3.5 8.7 8.7 0 1 0 20.5 14.6Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>';}
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-id][data-en]').forEach(el=>{el.textContent=lang==='id'?el.dataset.id:el.dataset.en});if(langBtn)langBtn.textContent=lang==='id'?'EN':'ID';localStorage.setItem('yukke-lang',lang)}
applyTheme();applyLang();
themeBtn&&themeBtn.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';localStorage.setItem('yukke-theme',theme);applyTheme()});
langBtn&&langBtn.addEventListener('click',()=>{lang=lang==='id'?'en':'id';applyLang()});
menuBtn&&menuBtn.addEventListener('click',()=>nav&&nav.classList.toggle('open'));
nav&&nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('show');obs.unobserve(e.target)})},{threshold:.14,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',prefersReduced?'0ms':`${Math.min(i%5,4)*90}ms`);obs.observe(el)});
window.addEventListener('scroll',()=>{if(scrollTop)scrollTop.classList.toggle('show',window.scrollY>500)});
scrollTop&&scrollTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const forms=document.querySelectorAll('#bookingForm');
forms.forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);let msg=`Halo Yukke Tembi Homestay, saya ingin menanyakan ketersediaan kamar.%0A%0ANama: ${d.get('name')||'-'}%0ATamu: ${d.get('guests')||'-'}%0ACheck-in: ${d.get('checkin')||'-'}%0ACheck-out: ${d.get('checkout')||'-'}%0APesan: ${d.get('message')||'-'}`;window.open('https://wa.me/6282190059168?text='+msg,'_blank')}));
const progress=document.getElementById('scrollProgress');
function updateProgress(){if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(window.scrollY/max*100):0)+'%'}
updateProgress();
window.addEventListener('scroll',updateProgress,{passive:true});
document.addEventListener('click',e=>{if(nav&&nav.classList.contains('open')&&!e.target.closest('#mainNav')&&!e.target.closest('#menuBtn'))nav.classList.remove('open')});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

// Gallery fullscreen slider
const galleryItems=[...document.querySelectorAll('.gallery-item')];
const lightbox=document.getElementById('galleryLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
const lightboxCounter=document.getElementById('lightboxCounter');
const lightboxClose=document.getElementById('lightboxClose');
const lightboxPrev=document.getElementById('lightboxPrev');
const lightboxNext=document.getElementById('lightboxNext');
let galleryIndex=0;
function openGallery(index){
  if(!lightbox||!galleryItems.length)return;
  galleryIndex=(index+galleryItems.length)%galleryItems.length;
  const img=galleryItems[galleryIndex].querySelector('img');
  lightboxImage.src=img.currentSrc||img.src;
  lightboxImage.alt=img.alt||'';
  lightboxCaption.textContent=img.alt||'';
  lightboxCounter.textContent=`${galleryIndex+1} / ${galleryItems.length}`;
  lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open');
}
function closeGallery(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open');}
function stepGallery(delta){openGallery(galleryIndex+delta)}
galleryItems.forEach((item,index)=>item.addEventListener('click',()=>openGallery(index)));
lightboxClose&&lightboxClose.addEventListener('click',closeGallery);
lightboxPrev&&lightboxPrev.addEventListener('click',()=>stepGallery(-1));
lightboxNext&&lightboxNext.addEventListener('click',()=>stepGallery(1));
lightbox&&lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeGallery()});
document.addEventListener('keydown',e=>{if(!lightbox||!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeGallery();if(e.key==='ArrowLeft')stepGallery(-1);if(e.key==='ArrowRight')stepGallery(1)});

})();
