# faedo-instagram-poster

Worker de Cloudflare que publica automáticamente en Instagram (@faedodecinera)
lunes, miércoles y viernes: contenido nuevo aprobado en feed/historias, o
reciclaje de lo ya publicado como historia si no hay nada nuevo.

## 1. Instalación

Desde `workers/instagram-poster/`:

    npm install

## 2. Crear el namespace de KV

    npx wrangler kv namespace create CONTENT_KV

Copia el `id` que te devuelve y pégalo en `wrangler.toml`, sustituyendo
`REEMPLAZA_CON_EL_ID_REAL`.

## 3. Configurar los secretos

    npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
    npx wrangler secret put INSTAGRAM_USER_ID

## 4. Insertar contenido en KV

Cada fichero en `instagram-content/queue/` corresponde a una pieza lista.
Insértala así (ejemplo con `marmitas-gigante-01.json`):

    npx wrangler kv key put --binding=CONTENT_KV --remote \
      "content:marmitas-gigante-01" \
      --path="../../instagram-content/queue/marmitas-gigante-01.json"

## 5. Probar en local

    npm run dev

## 6. Desplegar

    npm run deploy

El cron se ejecuta solo lunes/miércoles/viernes a las 9:00 UTC.

## Pendiente / próximos pasos

- Vídeo y reels: el código de momento solo publica imágenes. Publicar
  vídeo/reel requiere sondeo de `status_code` mientras Instagram procesa
  el archivo.
- Historias con texto: la API no admite caption en historias — el texto
  debe ir "quemado" en la propia imagen antes de subirla a R2. Revisa
  `instagram-content/drafts/` para las piezas pendientes de este trabajo.
- Flujo aprobado → KV: por ahora la inserción es manual (paso 4).
