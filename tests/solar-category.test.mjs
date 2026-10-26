import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';
test('solar replaces the infrared offering in routes, content, quotes and assistant',async()=>{
 const vite=await createServer({configFile:false,appType:'custom',resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,ws:false}});
 try{
  const r=await vite.ssrLoadModule('/lib/routes.ts');
  const {content}=await vite.ssrLoadModule('/content/site-content.ts');
  const q=await vite.ssrLoadModule('/lib/quote-intake.ts');
  const k=await vite.ssrLoadModule('/lib/knowledge-base.ts');
  assert.equal(r.pathFor('solar','en'),'/en/services/solar-energy');
  assert.equal(r.pathFor('solar','fr'),'/fr/services/energie-solaire');
  assert.ok(r.servicePageIds.includes('solar'));
  assert.equal(r.servicePageIds.includes('thermography'),false);
  assert.ok(q.quoteServiceValues.includes('solar'));
  assert.equal(q.quoteServiceValues.includes('thermography'),false);
  assert.match(content.en.pages.solar.title,/solar/i);
  assert.match(content.fr.pages.solar.title,/solaire/i);
  assert.equal(k.getAssistantReply('solar panels','en').intent,'solar');
  assert.equal(k.getAssistantReply('panneaux solaires','fr').intent,'solar');
 }finally{await vite.close();}
});
