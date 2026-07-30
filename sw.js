// Service Worker mínimo — só necessário para habilitar instalação PWA
// Não faz cache de nada (evita servir arquivos desatualizados)
const V = "v1";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { self.clients.claim(); });
self.addEventListener("fetch", e => {
  // Passa tudo direto para a rede — sem cache
  e.respondWith(fetch(e.request));
});
