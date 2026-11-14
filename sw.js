// Mekanik Departman Panel — uygulama olarak kurulabilmesi için. Hiçbir veri önbelleğe alınmaz (her zaman güncel veri);
// yalnızca internet yokken sayfa açılmaya çalışılırsa kısa bir uyarı gösterilir.
self.addEventListener('install',function(e){self.skipWaiting()});
// gezinme ön-yüklemesi: sayfa isteği, bu çalışan uyanırken beklemeden ağa çıkar (sayfa geçişleri hızlanır)
self.addEventListener('activate',function(e){e.waitUntil(Promise.all([self.clients.claim(),self.registration.navigationPreload?self.registration.navigationPreload.enable().catch(function(){}):0]))});
self.addEventListener('fetch',function(e){
  if(e.request.mode!=='navigate')return;
  e.respondWith(Promise.resolve(e.preloadResponse).then(function(p){return p||fetch(e.request)}).catch(function(){
    return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mekanik Departman Panel</title>'+
      '<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#F6F1E7;font-family:system-ui,Segoe UI,Arial;color:#2B241A;text-align:center">'+
      '<div style="padding:24px"><h2 style="margin:0 0 8px">İnternet bağlantısı yok</h2><p style="margin:0 0 18px;color:#6b6458">Bağlantı gelince tekrar deneyin · No internet connection</p>'+
      '<button onclick="location.reload()" style="font:inherit;font-weight:700;padding:10px 18px;border-radius:12px;border:0;background:#2B241A;color:#fff">Tekrar dene</button></div>',
      {headers:{'Content-Type':'text/html; charset=utf-8'}})}))});
