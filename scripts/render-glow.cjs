// Render local SVG user-interface artwork into frames. The banner and study PNGs
// are never modified by this script. Requires sharp: npm install sharp
const fs = require('fs');
const path = require('path');
const sharp = require(process.env.PROFILE_SHARP_MODULE || 'sharp');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
const frames = path.join(root, '.glow-frames');
const count = 72;
fs.mkdirSync(frames, { recursive: true });
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const font = 'ui-monospace, SFMono-Regular, Consolas, monospace';
const txt = (x,y,value,size,color,weight=400,family=font) => `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}">${esc(value)}</text>`;
const defs = '<defs><filter id="halo" x="-45%" y="-65%" width="190%" height="230%"><feGaussianBlur stdDeviation="4.5"/></filter><linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#152219"/><stop offset="1" stop-color="#111D16"/></linearGradient></defs>';
const tiles = [['Py','Python'],['C#','C#'],['Jv','Java'],['JS','JavaScript'],['</>','HTML'],['Sw','Swift'],['$ _','Bash'],['CV','OpenCV'],['Pt','PyTorch'],['SQL','SQLite'],['U','Unity'],['Fi','Figma'],['ASM','x86 Assembly'],['np','NumPy'],['pd','Pandas'],['W3','Web3.js']];

function toolkit(phase) {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="936" height="348" viewBox="0 0 936 348" role="img" aria-label="Sixteen languages and tools in softly glowing boxes">${defs}<rect width="936" height="348" fill="#0D1117"/>`;
  tiles.forEach(([mark,label],i)=>{
    const row = Math.floor(i/6), column = i%6;
    const x = 18 + (row===2?152:0) + column*152, y=16+row*108;
    const breath = (Math.sin(phase-row*0.28-column*0.12)+1)/2;
    const glow = (0.13+breath*0.14).toFixed(3);
    const line = (0.48+breath*0.14).toFixed(3);
    s += `<rect x="${x}" y="${y}" width="140" height="98" rx="12" fill="none" stroke="#8CAD70" stroke-width="3" opacity="${glow}" filter="url(#halo)"/>`;
    s += `<rect x="${x}" y="${y}" width="140" height="98" rx="12" fill="url(#tile)" stroke="#63824E" stroke-opacity="${line}"/>`;
    s += `<path d="M${x+12} ${y+1}H${x+128}" stroke="#9BBE7B" stroke-opacity="${0.26+breath*0.16}" stroke-width="1.5"/>`;
    s += txt(x+70,y+46,mark,mark==='ASM'?24:29,'#BDD2AA',600);
    s += txt(x+70,y+78,label,13,'#A0B495',400,'Inter, Segoe UI, Arial, sans-serif');
  });
  return s+'</svg>';
}

const sourceAbout=fs.readFileSync(path.join(root,'scripts','source-about-oscar.svg'),'utf8');
const sourceButton=fs.readFileSync(path.join(root,'scripts','source-github-link.svg'),'utf8');
function framed(source, kind, phase) {
  const pulse=(Math.sin(phase)+1)/2;
  const about=kind==='about-oscar';
  const w=about?700:268, h=about?540:50, inset=about?12:10;
  const content=source.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  const outerW=w+inset*2, outerH=h+inset*2;
  let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${outerW}" height="${outerH}" viewBox="${-inset} ${-inset} ${outerW} ${outerH}">${defs}<rect x="${-inset}" y="${-inset}" width="${outerW}" height="${outerH}" fill="#0D1117"/>`;
  s+=`<rect x="1" y="1" width="${w-2}" height="${h-2}" rx="${about?16:8}" fill="none" stroke="#8CAD70" stroke-width="3" opacity="${(0.12+pulse*0.13).toFixed(3)}" filter="url(#halo)"/>`;
  s+=content;
  if(about) s+=`<circle cx="31" cy="513" r="3.4" fill="#A1C17F" opacity="${(0.62+pulse*0.23).toFixed(3)}"/>`;
  else s+=`<rect x="1.5" y="1.5" width="265" height="47" rx="7.5" fill="none" stroke="#91B174" stroke-opacity="${(0.12+pulse*0.11).toFixed(3)}"/>`;
  return s+'</svg>';
}

async function main() {
  for(const name of ['toolkit','about-oscar','github-link']) fs.mkdirSync(path.join(frames,name),{recursive:true});
  for(let i=0;i<count;i++) {
    const phase=2*Math.PI*i/count;
    const images={toolkit:toolkit(phase), 'about-oscar':framed(sourceAbout,'about-oscar',phase-0.5),'github-link':framed(sourceButton,'github-link',phase-1)};
    for(const [name,svg] of Object.entries(images)) {
      if(i===0) fs.writeFileSync(path.join(assets,name+'.svg'),svg);
      await sharp(Buffer.from(svg)).png().toFile(path.join(frames,name,`${String(i).padStart(3,'0')}.png`));
    }
  }
  console.log('Rendered 72 frames for each of three gentle 6-second loops.');
}
main().catch(e=>{console.error(e);process.exit(1)});
