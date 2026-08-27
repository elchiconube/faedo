# instagram-content

Banco de trabajo para la automatización de Instagram (@faedodecinera).
No se sirve como parte del sitio web — es solo material de origen y de
cola, separado del código en `workers/instagram-poster/`.

- `media/` — imágenes y vídeos de origen, antes de subirlos a Cloudflare R2
  (`media.faedo.es`).
- `queue/` — piezas ya aprobadas y listas para insertar en KV con
  `wrangler kv key put` (ver `workers/instagram-poster/README.md`, paso 4).
- `drafts/` — piezas que aún necesitan trabajo antes de pasar a `queue/`
  (por ejemplo, historias cuyo texto falta "quemar" en la propia imagen,
  ya que la API de Instagram no admite texto en historias).

Flujo: `drafts/` → (edición de imagen si hace falta) → `queue/` →
inserción manual en KV → el Worker la publica en su siguiente ejecución
del cron (lunes/miércoles/viernes) y actualiza su estado.
