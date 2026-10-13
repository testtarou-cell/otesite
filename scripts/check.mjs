import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
let failures=[];
const files=fs.readdirSync(dist).filter(f=>f.endsWith('.html'));
for(const file of files){
 const html=fs.readFileSync(path.join(dist,file),'utf8');
 if((html.match(/<h1\b/g)||[]).length!==1)failures.push(`${file}: expected one H1`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|tel:|mailto:|data:)/.test(url))continue;
  const [target,hash]=url.split('#');
  if(target&&!fs.existsSync(path.join(dist,target)))failures.push(`${file}: missing ${target}`);
  if(hash){
   const content=target&&fs.existsSync(path.join(dist,target))?fs.readFileSync(path.join(dist,target),'utf8'):html;
   if(!content.includes(`id="${hash}"`))failures.push(`${file}: missing anchor ${url}`);
  }
 }
 if(/mailto:|<form\b/.test(html))failures.push(`${file}: unexpected mail contact`);
 if(!html.includes('https://line.me/R/ti/p/@jek5088j'))failures.push(`${file}: missing official LINE`);
}
const m=JSON.parse(fs.readFileSync(path.join(root,'src/monthly-schedule.json'),'utf8'));
if(new Set(m.days.map(d=>d.day)).size!==m.days.length)failures.push('Duplicate dates in monthly schedule');
if(m.days.some(d=>d.day<1||d.day>31))failures.push('Invalid monthly schedule date');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} pages: local links, images, anchors, LINE contact and monthly dates are valid.`);
