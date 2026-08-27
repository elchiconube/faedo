// Herramienta local de revisión de contenido de Instagram.
// Sin dependencias externas: solo módulos nativos de Node.
// Uso: node scripts/content-review-server.mjs
// Luego abre http://localhost:5055 en el navegador.

import { createServer } from 'node:http';
import { readFile, readdir, writeFile, unlink, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRAFTS_DIR = path.join(ROOT, 'instagram-content', 'drafts');
const QUEUE_DIR = path.join(ROOT, 'instagram-content', 'queue');
const MEDIA_DIR = path.join(ROOT, 'instagram-content', 'media');
const PORT = 5055;

const MIME_TYPES = {
	'.webp': 'image/webp',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.mp4': 'video/mp4',
	'.mov': 'video/quicktime',
};

async function ensureDirs() {
	for (const dir of [DRAFTS_DIR, QUEUE_DIR, MEDIA_DIR]) {
		if (!existsSync(dir)) await mkdir(dir, { recursive: true });
	}
}

async function listJsonFiles(dir) {
	if (!existsSync(dir)) return [];
	const files = await readdir(dir);
	return files.filter((f) => f.endsWith('.json'));
}

async function loadItems(dir) {
	const files = await listJsonFiles(dir);
	const items = [];
	for (const file of files) {
		const raw = await readFile(path.join(dir, file), 'utf-8');
		items.push({ file, data: JSON.parse(raw) });
	}
	return items;
}

function escapeHtml(str = '') {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderItem(item) {
	const { data } = item;
	const mediaExists = existsSync(path.join(MEDIA_DIR, data.media));
	const warning = !mediaExists
		? `<p class="warn">⚠️ No se encuentra "${escapeHtml(data.media)}" en instagram-content/media/</p>`
		: '';
	const storyWarning =
		data.destination === 'story'
			? `<p class="warn">ℹ️ Historia: recuerda que el texto debe ir "quemado" en la imagen — el caption de aquí es solo referencia, no se envía a Instagram.</p>`
			: '';

	const isStory = data.destination === 'story';
	const previewClass = isStory ? 'media-preview story' : 'media-preview feed';
	const previewLabel = isStory
		? 'Vista historia · 9:16 (como en Instagram)'
		: 'Vista feed · 4:5 (como en Instagram)';
	const secondaryPreview = !isStory
		? `
		<p class="preview-label">También se compartirá como historia · 9:16</p>
		<div class="media-preview story secondary">
			<img src="/media/${encodeURIComponent(data.media)}" alt="${escapeHtml(data.id)} (historia)" />
		</div>`
		: '';

	return `
	<article class="card">
		<p class="preview-label">${previewLabel}</p>
		<div class="${previewClass}">
			<img src="/media/${encodeURIComponent(data.media)}" alt="${escapeHtml(data.id)}" />
		</div>
		${secondaryPreview}
		<div class="card-body">
			<h2>${escapeHtml(data.id)}</h2>
			<p class="meta">tipo: ${escapeHtml(data.type)} · creado: ${escapeHtml(data.createdAt ?? '')}</p>
			${warning}
			${storyWarning}
			<form method="POST" action="/save">
				<input type="hidden" name="file" value="${escapeHtml(item.file)}" />
				<label>Destino
					<select name="destination">
						<option value="feed" ${data.destination === 'feed' ? 'selected' : ''}>feed</option>
						<option value="story" ${data.destination === 'story' ? 'selected' : ''}>story</option>
					</select>
				</label>
				<label>Archivo (media)
					<input type="text" name="media" value="${escapeHtml(data.media)}" />
				</label>
				<label>Caption
					<textarea name="caption" rows="10">${escapeHtml(data.caption)}</textarea>
				</label>
				<div class="actions">
					<button type="submit" class="save">Guardar cambios</button>
				</div>
			</form>
			<form method="POST" action="/approve" onsubmit="return confirm('¿Aprobar y mover a queue/?');">
				<input type="hidden" name="file" value="${escapeHtml(item.file)}" />
				<button type="submit" class="approve">✅ Aprobar → queue/</button>
			</form>
			<form method="POST" action="/discard" onsubmit="return confirm('¿Descartar este borrador? No se puede deshacer.');">
				<input type="hidden" name="file" value="${escapeHtml(item.file)}" />
				<button type="submit" class="discard">🗑️ Descartar</button>
			</form>
		</div>
	</article>`;
}

async function renderPage(message) {
	const drafts = await loadItems(DRAFTS_DIR);
	const queueCount = (await listJsonFiles(QUEUE_DIR)).length;

	const banner = message
		? `<p class="banner">${escapeHtml(message)}</p>`
		: '';

	const cards = drafts.length
		? drafts.map(renderItem).join('\n')
		: '<p>No hay borradores pendientes en instagram-content/drafts/ 🎉</p>';

	return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Revisión de contenido — Faedo de Ciñera</title>
<style>
	body { font-family: system-ui, sans-serif; max-width: 560px; margin: 2rem auto; padding: 0 1rem; background: #faf9f6; color: #222; }
	h1 { font-size: 1.4rem; }
	.status { color: #555; margin-bottom: 1.5rem; }
	.banner { background: #e6f4ea; border: 1px solid #34a853; padding: 0.75rem 1rem; border-radius: 6px; }
	.card { background: white; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; margin-bottom: 2rem; }
	.preview-label { margin: 0.85rem 1.25rem 0.5rem; color: #666; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.01em; }
	.media-preview { margin: 0 auto 0.75rem; background: #111; overflow: hidden; }
	.media-preview.feed { width: min(100%, 468px); aspect-ratio: 4 / 5; }
	.media-preview.story { width: min(100%, 270px); aspect-ratio: 9 / 16; border-radius: 18px; }
	.media-preview.secondary { margin-bottom: 1rem; }
	.media-preview img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
	.card-body { padding: 1rem 1.25rem; }
	.meta { color: #777; font-size: 0.85rem; margin-top: -0.5rem; }
	.warn { background: #fff4e5; border: 1px solid #f0ad4e; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.9rem; }
	label { display: block; margin: 0.75rem 0 0.25rem; font-size: 0.9rem; font-weight: 600; }
	input[type="text"], select, textarea { width: 100%; padding: 0.5rem; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; border: 1px solid #ccc; border-radius: 6px; }
	textarea { resize: vertical; }
	.actions { margin-top: 0.75rem; }
	button { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; font-size: 0.9rem; margin-top: 0.5rem; margin-right: 0.5rem; }
	.save { background: #1a73e8; color: white; }
	.approve { background: #34a853; color: white; }
	.discard { background: #eee; color: #a33; }
</style>
</head>
<body>
	<h1>Revisión de contenido — Faedo de Ciñera</h1>
	<p class="status">${drafts.length} borrador(es) pendiente(s) · ${queueCount} pieza(s) ya en queue/</p>
	${banner}
	${cards}
</body>
</html>`;
}

function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', (chunk) => (body += chunk));
		req.on('end', () => {
			const params = new URLSearchParams(body);
			resolve(Object.fromEntries(params));
		});
		req.on('error', reject);
	});
}

function redirect(res, message) {
	const query = message ? `?msg=${encodeURIComponent(message)}` : '';
	res.writeHead(302, { Location: `/${query}` });
	res.end();
}

const server = createServer(async (req, res) => {
	await ensureDirs();
	const url = new URL(req.url, `http://localhost:${PORT}`);

	try {
		if (req.method === 'GET' && url.pathname === '/') {
			const html = await renderPage(url.searchParams.get('msg'));
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.end(html);
			return;
		}

		if (req.method === 'GET' && url.pathname.startsWith('/media/')) {
			const filename = decodeURIComponent(url.pathname.replace('/media/', ''));
			const filePath = path.join(MEDIA_DIR, filename);
			if (!existsSync(filePath)) {
				res.writeHead(404);
				res.end('No encontrado');
				return;
			}
			const ext = path.extname(filename).toLowerCase();
			const data = await readFile(filePath);
			res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] ?? 'application/octet-stream' });
			res.end(data);
			return;
		}

		if (req.method === 'POST' && url.pathname === '/save') {
			const { file, caption, media, destination } = await parseBody(req);
			const filePath = path.join(DRAFTS_DIR, file);
			const raw = await readFile(filePath, 'utf-8');
			const item = JSON.parse(raw);
			item.caption = caption;
			item.media = media;
			item.destination = destination;
			await writeFile(filePath, JSON.stringify(item, null, 2));
			redirect(res, `Guardado: ${item.id}`);
			return;
		}

		if (req.method === 'POST' && url.pathname === '/approve') {
			const { file } = await parseBody(req);
			const from = path.join(DRAFTS_DIR, file);
			const to = path.join(QUEUE_DIR, file);
			await rename(from, to);
			redirect(res, `Aprobado y movido a queue/: ${file}`);
			return;
		}

		if (req.method === 'POST' && url.pathname === '/discard') {
			const { file } = await parseBody(req);
			await unlink(path.join(DRAFTS_DIR, file));
			redirect(res, `Descartado: ${file}`);
			return;
		}

		res.writeHead(404);
		res.end('No encontrado');
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end(`Error: ${err.message}`);
	}
});

ensureDirs().then(() => {
	server.listen(PORT, () => {
		console.log(`Revisión de contenido disponible en http://localhost:${PORT}`);
	});
});
