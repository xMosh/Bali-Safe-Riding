import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {load} from 'cheerio';
const content=JSON.parse(fs.readFileSync('src/data/content.json','utf8'));
const repository=process.env.GITHUB_REPOSITORY?.split('/')[1];
const base=(process.env.BASE_PATH||(repository&&!repository.endsWith('.github.io')?'/'+repository:'/')).replace(/\/$/,'');
const normalize=s=>s.replace(/[\s\u200b]/g,'');
let blocks=0,links=0,assets=0;
for(const [page,source] of Object.entries(content)){
 const filename=page==='home'?'dist/index.html':`dist/${page}/index.html`;
 const $=load(fs.readFileSync(filename,'utf8'));
 const actual=normalize($('main').text().replaceAll('Call ☎',''));
 for(const [i,block] of source.rich.entries()){
  assert(actual.includes(normalize(block.text)),`${page}: missing original content block ${i}: ${block.text.slice(0,70)}`);blocks++;
 }
 assert.equal($('h1').length,1,`${page}: expected one main heading`);
 for(const e of $('a[href]').toArray()){
  const href=$(e).attr('href');if(!href.startsWith('/')||href.startsWith('//'))continue;
  const pathname=href.split('#')[0].split('?')[0];
  assert(pathname.startsWith(base+'/'),`Link outside configured base: ${href}`);
  const relative=pathname.slice(base.length).replace(/^\//,'');
  const target=path.join('dist',relative.endsWith('/')?relative+'index.html':relative);
  assert(fs.existsSync(target),`Missing internal target: ${href}`);links++;
 }
 for(const e of $('img[src],script[src],link[rel="stylesheet"][href],source[src]').toArray()){
  const src=$(e).attr('src')||$(e).attr('href');if(!src.startsWith('/'))continue;
  assert(src.startsWith(base+'/'),`Asset outside configured base: ${src}`);
  assert(fs.existsSync(path.join('dist',src.slice(base.length))),`Missing asset ${src}`);assets++;
 }
 for(const e of $('a[href^="tel:"]').toArray()){
  const number=$(e).attr('href').slice(4);assert(/^\+\d+$/.test(number),`Invalid phone formatting ${number}`);
  const label=$(e).closest('li').text().replace(/\s/g,'');assert(label.includes(number),`Phone link does not match displayed number: ${number}`);
 }
}
const $=load(fs.readFileSync('dist/emergency/index.html','utf8'));
assert.equal($('[role=tab]').length,3);assert.equal($('[role=tabpanel]').length,3);assert.equal($('a[href^="tel:"]').length,14);
assert.equal($('[role=tabpanel]:not([hidden])').length,1);
const tours=load(fs.readFileSync('dist/scootertours/index.html','utf8'));assert.equal(tours('.gallery-item').length,6);assert.equal(tours('[data-slide]').length,2);assert.equal(tours('iframe[src*="youtube"]').length,2);
console.log(`Verified all 5 pages, ${blocks} original text blocks, ${links} internal links, ${assets} local asset references, 14 matching phone links, 3 regional panels, 6 gallery images, 2 review slides and 2 video embeds.`);
