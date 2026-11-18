// Run from the repo root:  node tools/build-manifest.mjs
// Scans assets/work/ and writes archive.json from your REAL files. Nothing is invented.
// Grouping: each subfolder = one project. Loose files group by the name before the first "-", "_" or digit.
// Optional: if `sharp` is installed (npm i sharp), 640px WebP thumbs are written to assets/thumbs/.
import {readdirSync,statSync,writeFileSync,mkdirSync,existsSync} from "node:fs";
import {join,extname,basename} from "node:path";
const ROOT="assets/work",IMG=/\.(jpe?g|png|webp|avif|gif)$/i;
const CATS=[[/funwave|krish|bhoora|funo|quokka|panda|picko|catty|dugo/,"FUNWAVE"],[/character|mascot/,"CHARACTER"],[/pizza|menu|food|waffl|cafe|restaurant/,"FOOD"],[/pack|box|label|pouch/,"PACKAGING"],[/event|aarti|rath|yatra|invit|gujarati|festival/,"EVENT"],[/social|post|story|reel/,"SOCIAL"],[/qr|web|ui|app|digital/,"DIGITAL"],[/brand|logo|identity/,"BRAND"]];
const pretty=s=>s.replace(/[-_]+/g," ").replace(/\b\w/g,c=>c.toUpperCase()).trim();
const walk=d=>readdirSync(d).flatMap(f=>{const p=join(d,f);return statSync(p).isDirectory()?walk(p):IMG.test(f)?[p]:[]});
const files=walk(ROOT).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
const groups=new Map();
for(const f of files){const parts=f.split("/").slice(2);const key=parts.length>1?parts[0]:basename(f,extname(f)).split(/[-_\s]?\d/)[0].split(/[-_]/)[0]||"misc";
  (groups.get(key)||groups.set(key,[]).get(key)).push(f)}
let sharp=null;try{sharp=(await import("sharp")).default}catch{}
if(sharp&&!existsSync("assets/thumbs"))mkdirSync("assets/thumbs",{recursive:true});
const out=[];
for(const [k,imgs] of groups){
  const cat=(CATS.find(([r])=>r.test(k.toLowerCase()+" "+imgs[0].toLowerCase()))||[0,"EXPERIMENTS"])[1];
  let thumb=imgs[0];
  if(sharp){const t=`assets/thumbs/${k.replace(/\W+/g,"-")}.webp`;try{await sharp(imgs[0]).resize(640).webp({quality:72}).toFile(t);thumb=t}catch{}}
  out.push({title:pretty(k),cat,sub:pretty(cat),desc:`${imgs.length} piece${imgs.length>1?"s":""} from the ${pretty(k)} work.`,thumb,images:imgs});
}
writeFileSync("archive.json",JSON.stringify(out,null,1));
console.log(`${files.length} images -> ${out.length} projects -> archive.json`);
console.log(out.map(o=>`${o.cat.padEnd(11)} ${o.title} (${o.images.length})`).join("\n"));
