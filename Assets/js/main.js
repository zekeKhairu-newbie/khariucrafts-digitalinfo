// Small standalone replacements for the original theme's plugin-dependent controls.
const menuButton=document.querySelector('.menu-toggle');
const themeButton=document.querySelector('.theme-toggle');
const menu=document.querySelector('.menu');
const backdrop=document.querySelector('.backdrop');
let priorFocus;
function toggleMenu(open){
 if(open)priorFocus=document.activeElement;
 document.body.classList.toggle('menu-open',open);menu.inert=!open;backdrop.hidden=!open;
 menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
 if(open)menu.querySelector('a').focus();else priorFocus?.focus();
}
menuButton.addEventListener('click',()=>toggleMenu(!document.body.classList.contains('menu-open')));
backdrop.addEventListener('click',()=>toggleMenu(false));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{
 if(!document.body.classList.contains('menu-open'))return;
 if(e.key==='Escape')toggleMenu(false);
 if(e.key==='Tab'){
 const controls=[menuButton,...Array.from(menu.querySelectorAll('a,summary')).filter(e=>e.getClientRects().length)];
 const i=controls.indexOf(document.activeElement);
 if(e.shiftKey&&i<=0){e.preventDefault();controls.at(-1).focus();}
 else if(!e.shiftKey&&i===controls.length-1){e.preventDefault();menuButton.focus();}
 }
});
function setTheme(dark){document.body.classList.toggle('dark',dark);themeButton.setAttribute('aria-pressed',String(dark));themeButton.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}
try{setTheme(localStorage.getItem('luique-theme')==='dark');}catch{}
themeButton.addEventListener('click',()=>{const dark=!document.body.classList.contains('dark');setTheme(dark);try{localStorage.setItem('luique-theme',dark?'dark':'light');}catch{}});
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
 const cursor=document.querySelector('.cursor');
 document.addEventListener('pointermove',e=>{cursor.style.opacity='1';cursor.style.transform=`translate(${e.clientX-40}px,${e.clientY-40}px)`;});
 document.addEventListener('pointerleave',()=>cursor.style.opacity='0');
}
