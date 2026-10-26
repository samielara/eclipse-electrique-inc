import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('quote context round trips all service pages and rejects mismatched work', async () => {
 const vite=await createServer({configFile:false,appType:'custom',resolve:{alias:{'@':process.cwd()}},server:{middlewareMode:true,ws:false}});
 try {
  const {quotePath}=await vite.ssrLoadModule('/lib/routes.ts');
  const {readQuotePrefill}=await vite.ssrLoadModule('/lib/assistant/prefill.ts');
  const {getQuoteWorkOptions}=await vite.ssrLoadModule('/lib/quote-context.ts');
  const {buildQuoteIntakeMailtoUrl}=await vite.ssrLoadModule('/lib/quote-intake.ts');
  for(const locale of ['en','fr']) for(const [category,key] of [['residential','residentialServiceId'],['commercialIndustrial','commercialServiceId']]) {
   for(const work of getQuoteWorkOptions(category,locale)) {
    const url=new URL(quotePath(locale,{[key]:work.value}),'http://localhost');
    assert.deepEqual(readQuotePrefill(url.search),{service:category,work:work.value});
   }
  }
  assert.equal(readQuotePrefill('?assistantService=solar&work=heating').work,undefined);
  assert.deepEqual(readQuotePrefill('?assistantService=invalid&work=heating'),{});
  assert.equal(readQuotePrefill('?assistantService=residential&work=not-a-service').work,undefined);
  assert.equal(readQuotePrefill(new URL(quotePath('en',{citySlug:'brossard'}),'http://localhost').search).municipality,'brossard');
  const message=new URL(buildQuoteIntakeMailtoUrl({service:'residential',work:'heating',timeline:'planned',municipality:'brossard',postalCode:'J4W 1A1',fullName:'Test',phone:'5145550123',email:'test@example.com',address:'Test address',description:'Testing context',fileNames:[]},'en'));
  assert.match(message.searchParams.get('body'),/Requested service: Heating & heated floors/);
 } finally {await vite.close();}
});
