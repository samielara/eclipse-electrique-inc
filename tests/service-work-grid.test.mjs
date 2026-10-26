import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';

test('service grids show every offering and valid images in both languages',async()=>{
 const vite=await createServer({configFile:false,appType:'custom',resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,ws:false}});
 try {
 const {serviceWorkExplorerData:data}=await vite.ssrLoadModule('/content/service-work-explorer.ts');
 const {ServiceWorkGrid}=await vite.ssrLoadModule('/components/service-work-grid.tsx');
 for(const id of ['generators','solar','security','maintenance']) for(const locale of ['en','fr']) {
  const html=renderToStaticMarkup(React.createElement(ServiceWorkGrid,{locale,data:data[id]}));
  assert.equal((html.match(/data-testid="service-card"/g)||[]).length,data[id].items.length);
  assert.ok(!html.includes('role="tablist"'));
  for(const item of data[id].items) {
   assert.ok(fs.existsSync('public'+item.image),`${id}: ${item.image}`);
   assert.ok(html.includes(item.image));
  }
 }
 }finally {await vite.close();}
});
