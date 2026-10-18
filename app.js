const papers=[...document.querySelectorAll('.publication')];
const viewButtons=[...document.querySelectorAll('[data-view]')];
const search=document.querySelector('#paper-search');
const list=document.querySelector('#publication-list');
const message=document.querySelector('#filter-message');
let mode='selected';
function updatePapers(){
 const query=search.value.trim().toLowerCase();
 let visible=0;
 const showAll=mode==='all'||query.length>0;
 papers.forEach(p=>{const show=(showAll||p.dataset.selected==='true')&&p.textContent.toLowerCase().includes(query);p.hidden=!show;if(show)visible++;});
 list.classList.toggle('all-mode',showAll);
 viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===(showAll?'all':'selected'))));
 document.querySelector('#show-all').hidden=showAll;
 document.querySelector('#empty-message').hidden=visible!==0;
 message.textContent=query?`${visible} ${visible===1?'publication':'publications'} matching “${search.value.trim()}”`:showAll?`${visible} publications · 2023–2026`:'Selected work on understanding, reasoning, and generation';
}
viewButtons.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.view;search.value='';updatePapers();}));
search.addEventListener('input',updatePapers);
document.querySelector('#show-all').addEventListener('click',()=>{mode='all';updatePapers();document.querySelector('[data-view="all"]').focus({preventScroll:true});});
document.querySelector('#copy-email').addEventListener('click',async()=>{
 const status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText('fr0zencrane@163.com');status.textContent='Email copied.';}
 catch{status.textContent='fr0zencrane@163.com — select to copy';}
});
document.querySelector('#print-page').addEventListener('click',()=>window.print());
const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>{const active=a.hash===`#${e.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});
 document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
}
updatePapers();
