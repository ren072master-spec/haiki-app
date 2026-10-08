const CACHE='haiki-v10-hourly-analysis-20261008';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('haiki-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put('./index.html',r.clone()));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
