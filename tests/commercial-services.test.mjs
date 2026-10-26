import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
test('commercial and industrial share one category with eleven bilingual service pages',async()=>{
 const vite=await createServer({configFile:false,appType:'custom',resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,ws:false}});
 try {
  const c=await vite.ssrLoadModule('/content/commercial-services.ts');
  const r=await vite.ssrLoadModule('/lib/routes.ts');
  assert.equal(c.commercialServices.length,11);
  assert.equal(new Set(c.commercialServices.map(s=>s.id)).size,11);
  assert.equal(r.servicePageIds.includes('industrial'),false);
  assert.equal(r.pathFor('industrial','en'),'/en/services/commercial-electrician');
  assert.equal(r.allLocalizedPaths().includes('/en/services/industrial-electrician'),false);
  for(const s of c.commercialServices)for(const locale of ['fr','en']) {
   const path=c.commercialServicePath(locale,s.id);
   assert.equal(r.resolvePage(locale,path.split('/').slice(2)).commercialServiceId,s.id);
   assert.ok(r.allLocalizedPaths().includes(path));
  }
  assert.equal(r.resolvePage('en',['services','commercial-electrician','unknown']),null);
 }finally{await vite.close();}
});
