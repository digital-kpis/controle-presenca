// Service Worker — Controle de Presença
// Estratégia: cache-first para o app shell, com atualização em segundo plano.

const CACHE_VERSION = "v1";
const CACHE_NAME = `presenca-cache-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./app.jsx",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

// Instala e faz o pré-cache do app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).catch(() => {
        // Se algum arquivo do shell falhar (ex.: ícone ainda não existe),
        // não impede a instalação do service worker.
      })
    )
  );
  self.skipWaiting();
});

// Remove caches antigos de versões anteriores
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("presenca-cache-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first para o app shell, network-first (com fallback ao cache) para o resto
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Nunca interceptar chamadas à API do Supabase — sempre precisam ir à rede
  if (request.url.includes("supabase.co")) return;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      // Se já está em cache, serve na hora e atualiza em segundo plano.
      // Caso contrário, espera a rede.
      return cached || networkFetch;
    })
  );
});
