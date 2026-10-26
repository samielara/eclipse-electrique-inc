import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
test('residential catalogue, seasonal completeness and exact bilingual routes', async () => {
  const vite = await createServer({configFile:false,appType:'custom',resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,ws:false}});
  try {
    const c = await vite.ssrLoadModule('/content/residential-services.ts');
    const r = await vite.ssrLoadModule('/lib/routes.ts');
    assert.equal(c.residentialServices.length,11);
    const ids=c.residentialServices.map(s=>s.id).sort();
    for(const season of ['winter','spring','summer','autumn']) assert.deepEqual(c.getOrderedResidentialServices(season).map(s=>s.id).sort(),ids);
    assert.equal(c.getOrderedResidentialServices('winter')[0].id,'heating');
    assert.equal(c.getOrderedResidentialServices('summer')[0].id,'outdoor');
    assert.equal(c.getResidentialSeason(new Date('2026-03-01T00:00:00Z')),'winter');
    assert.equal(c.getResidentialSeason(new Date('2026-03-01T06:00:00Z')),'spring');
    assert.equal(c.getResidentialSeason(new Date(),'summer'),'summer');
    assert.equal(c.getResidentialSeason(new Date('2026-07-01T12:00:00Z'),'constructor'),'summer');
    for(const s of c.residentialServices) for(const locale of ['fr','en']) {
      const path=c.residentialServicePath(locale,s.id);
      assert.equal(r.resolvePage(locale,path.split('/').slice(2)).residentialServiceId,s.id);
      assert.ok(r.allLocalizedPaths().includes(path));
    }
    assert.equal(r.resolvePage('en',['services','residential-electrician','unknown']),null);
    const {ResidentialServicesGrid}=await vite.ssrLoadModule('/components/residential-services-grid.tsx');
    for(const locale of ['fr','en']) {
      const html=renderToStaticMarkup(React.createElement(ResidentialServicesGrid,{locale,season:'summer'}));
      assert.equal((html.match(/data-testid="service-card"/g)||[]).length,11);
      assert.equal((html.match(/<img /g)||[]).length,11);
      assert.ok(html.indexOf(c.residentialServicePath(locale,'outdoor'))<html.indexOf(c.residentialServicePath(locale,'heating')));
      for(const item of c.residentialServices) assert.ok(html.includes(c.residentialServicePath(locale,item.id)));
    }
    const {ResidentialServicePage}=await vite.ssrLoadModule('/components/residential-service-page.tsx');
    for(const s of c.residentialServices) for(const locale of ['fr','en']) {
      const html=renderToStaticMarkup(React.createElement(ResidentialServicePage,{locale,serviceId:s.id}));
      assert.equal((html.match(/<h1\b/g)||[]).length,1);
      assert.ok(html.includes(s.image));
      assert.equal(html.includes('class="residential-related"'), false);
      assert.ok(html.includes(r.quotePath(locale, {residentialServiceId:s.id}).replaceAll("&", "&amp;")));
    }
  } finally {await vite.close();}
});
