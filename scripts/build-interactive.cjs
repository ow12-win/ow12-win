const fs=require('fs');
const path=require('path');
const {icons,details}=require('./toolkit-icons.cjs');
const root=path.resolve(__dirname,'..');
const names=Object.keys(icons);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cards=names.map((name,i)=>`<button class="tool" type="button" data-name="${esc(name)}" aria-pressed="false" aria-label="${esc(name)}: ${esc(details[name][1])}" style="--i:${i}"><span class="tool-icon"><svg viewBox="0 0 48 48" role="img" aria-hidden="true">${icons[name]}</svg></span><span class="tool-name">${esc(name)}</span><span class="tool-type">${esc(details[name][0])}</span><span class="corner" aria-hidden="true">↗</span></button>`).join('\n');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>Oscar Winter · My toolkit</title>
<style>
*{box-sizing:border-box}html{background:#0b100e;color:#dce6d2;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 15% 0,rgba(80,112,53,.17),transparent 48%),radial-gradient(ellipse at 100% 80%,rgba(63,84,44,.13),transparent 42%)}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit}a{color:inherit}main{max-width:1040px;padding:36px 32px 30px;margin:auto}.top{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid #283529;padding-bottom:22px}.brand{font-size:13px;font-weight:650;letter-spacing:.13em;text-transform:uppercase}.brand span{color:#88a077;margin-right:12px}.email{font-size:12px;color:#9aad90;text-decoration:none}.email:hover,.email:focus-visible{color:#e3f2d4}.intro{padding:42px 0 28px;display:flex;justify-content:space-between;gap:24px;align-items:end}.eyebrow{color:#8caa78;font-size:10px;font-weight:650;letter-spacing:.21em;text-transform:uppercase;margin:0 0 10px}h1{font-size:clamp(32px,5vw,48px);font-weight:550;letter-spacing:-.045em;line-height:1.1;margin:0}.intro p:last-child{color:#8fa184;max-width:340px;font-size:13px;line-height:1.65;margin:0 0 2px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.tool{--px:50%;--py:40%;position:relative;isolation:isolate;min-width:0;text-align:left;padding:23px 23px 20px;border:1px solid #30432d;border-radius:16px;background:linear-gradient(145deg,#162219,#101a14);color:#d7e6ca;cursor:pointer;overflow:visible;box-shadow:0 0 12px rgba(105,146,72,.035),inset 0 1px 0 rgba(189,211,168,.035);transition:transform .25s ease,border-color .25s ease,box-shadow .35s ease,background .3s ease;outline-offset:5px}.tool::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at var(--px) var(--py),rgba(157,198,117,.19),transparent 70%);opacity:0;transition:opacity .3s;z-index:-1;pointer-events:none}.tool::after{content:"";position:absolute;left:22px;right:22px;top:-1px;height:1px;background:linear-gradient(90deg,transparent,#9cba7a,transparent);opacity:.35;transition:opacity .3s}.tool:hover,.tool:focus-visible,.tool.selected{transform:translateY(-4px);border-color:#86a56b;box-shadow:0 0 0 1px rgba(154,191,118,.12),0 0 25px rgba(124,168,85,.23),0 15px 38px rgba(0,0,0,.27)}.tool:hover::before,.tool:focus-visible::before,.tool.selected::before{opacity:1}.tool:hover::after,.tool:focus-visible::after,.tool.selected::after{opacity:1}.tool:focus-visible{outline:2px solid #b1d38f}.tool-icon{display:flex;align-items:center;height:53px;margin-bottom:14px}.tool-icon svg{width:45px;height:45px;overflow:visible;filter:drop-shadow(0 0 4px rgba(165,198,137,.08));transition:filter .3s,transform .3s}.tool:hover .tool-icon svg,.tool:focus-visible .tool-icon svg,.tool.selected .tool-icon svg{filter:drop-shadow(0 0 8px rgba(166,203,133,.38));transform:scale(1.055)}.tool-name{display:block;font-size:15px;font-weight:600;line-height:1.3}.tool-type{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#7f9674;margin-top:6px}.corner{position:absolute;right:19px;top:18px;font-size:15px;color:#739061;opacity:.4;transition:opacity .2s,color .2s}.tool:hover .corner,.tool:focus-visible .corner,.tool.selected .corner{opacity:1;color:#bbd59e}.detail{display:flex;align-items:center;gap:18px;margin-top:25px;min-height:85px;padding:18px 22px;border:1px solid #293b28;border-radius:13px;background:rgba(18,30,20,.6)}.detail-mark{flex:0 0 34px;width:34px;height:34px}.detail-mark svg{width:34px;height:34px}.detail-name{font-size:13px;font-weight:600;margin:0 0 4px}.detail-copy{font-size:12px;line-height:1.55;color:#91a486;margin:0}.hint{font-size:10px;color:#6f8264;margin-left:auto;text-align:right;max-width:160px;line-height:1.6}.footer{margin:26px 0 0;text-align:center;color:#6f8862;font-size:9px;letter-spacing:.22em}.top a:focus-visible{outline:2px solid #b1d38f;outline-offset:6px;border-radius:3px}
@media(max-width:700px){main{padding:25px 22px}.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.tool{padding:20px 17px 17px}.intro{display:block;padding:32px 0 24px}.intro p:last-child{margin-top:15px;max-width:390px}.email{font-size:11px}.hint{display:none}}
@media(max-width:440px){main{padding:21px 16px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.top{align-items:start;flex-direction:column;gap:10px}.tool-name{font-size:14px}.tool{padding:19px}.detail{padding:17px;gap:13px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}.tool:hover,.tool:focus-visible,.tool.selected,.tool:hover .tool-icon svg,.tool:focus-visible .tool-icon svg,.tool.selected .tool-icon svg{transform:none}}
</style></head><body><main><header class="top"><div class="brand"><span aria-hidden="true">✦</span>Oscar Winter</div><a class="email" href="mailto:oscarwinter34@gmail.com">oscarwinter34@gmail.com ↗</a></header><section aria-labelledby="title"><div class="intro"><div><p class="eyebrow">Software / Systems / Machine learning</p><h1 id="title">My toolkit.</h1></div><p>A collection of the languages and tools I use and explore.<br>Hover, focus, or select a tool to take a closer look.</p></div><div class="grid">${cards}</div><div class="detail"><div class="detail-mark" aria-hidden="true"></div><div><p class="detail-name">Python</p><p class="detail-copy">My strongest language; used since age 11.</p></div><p class="hint">Click to keep a tool selected.<br>Escape clears the selection.</p></div></section><footer class="footer">ROOTED IN CURIOSITY. ALWAYS GROWING.</footer></main>
<script>
const info=${JSON.stringify(details)},shapes=${JSON.stringify(icons)};
const buttons=[...document.querySelectorAll('.tool')];let selected=null;
function show(name){document.querySelector('.detail-name').textContent=name;document.querySelector('.detail-copy').textContent=info[name][1];document.querySelector('.detail-mark').innerHTML='<svg viewBox="0 0 48 48">'+shapes[name]+'</svg>'}
function restore(){show(selected||'Python')}
buttons.forEach(button=>{
const name=button.dataset.name;
button.addEventListener('pointermove',e=>{const r=button.getBoundingClientRect();button.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');button.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%')});
button.addEventListener('pointerenter',()=>show(name));button.addEventListener('pointerleave',restore);button.addEventListener('focus',()=>show(name));button.addEventListener('blur',restore);
button.addEventListener('click',()=>{selected=selected===name?null:name;buttons.forEach(b=>{const on=b.dataset.name===selected;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on?'true':'false')});show(selected||name)})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){selected=null;buttons.forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});restore()}});show('Python');
</script></body></html>`;
fs.writeFileSync(path.join(root,'interactive-toolkit.html'),html);

const renderer=path.join(root,'scripts','render-glow.cjs');
let s=fs.readFileSync(renderer,'utf8');
if(!s.includes("const {icons:toolIcons}")) s=s.replace("const count = 72;","const count = 72;\nconst {icons:toolIcons}=require('./toolkit-icons.cjs');");
const from=s.indexOf('function toolkit(phase)');
const to=s.indexOf('const sourceAbout=',from);
const code=`function toolkit(phase) {
  let s = '<svg xmlns="http://www.w3.org/2000/svg" width="936" height="408" viewBox="0 0 936 408" role="img" aria-label="Sixteen recognisable tool icons in softly glowing boxes">'+defs+'<rect width="936" height="408" fill="#0D1117"/>';
  tiles.forEach(([mark,label],i)=>{
    const row=Math.floor(i/6), column=i%6;
    const x=18+(row===2?152:0)+column*152,y=16+row*128;
    const breath=(Math.sin(phase-row*0.28-column*0.12)+1)/2;
    s+='<rect x="'+x+'" y="'+y+'" width="140" height="118" rx="14" fill="none" stroke="#9DBE7D" stroke-width="3" opacity="'+(0.24+breath*0.19).toFixed(3)+'" filter="url(#halo)"/>';
    s+='<rect x="'+x+'" y="'+y+'" width="140" height="118" rx="14" fill="url(#tile)" stroke="#85A969" stroke-opacity="'+(0.48+breath*0.23).toFixed(3)+'"/>';
    s+='<path d="M'+(x+16)+' '+(y+1)+'H'+(x+124)+'" stroke="#B5CE99" stroke-opacity="'+(0.25+breath*0.22).toFixed(3)+'" stroke-width="1.5"/>';
    s+='<svg x="'+(x+47)+'" y="'+(y+21)+'" width="46" height="46" viewBox="0 0 48 48">'+toolIcons[label]+'</svg>';
    s+=txt(x+70,y+96,label,13,'#BDD0AF',500,'Inter, Segoe UI, Arial, sans-serif');
  });
  return s+'</svg>';
}
\n`;
if(from<0||to<0)throw Error('Toolkit render section missing');
s=s.slice(0,from)+code+s.slice(to);
fs.writeFileSync(renderer,s);
console.log('Built a self-contained interactive page and revised local icon renderer.');
