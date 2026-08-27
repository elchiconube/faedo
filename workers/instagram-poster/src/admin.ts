import type { ContentItem, ContentStatus, Env } from './types';
import { listContent, putContent, getContent, deleteContent, findRecycleCandidate } from './kv';

// ---------- Auth ----------

function unauthorized(): Response {
	return new Response('Autenticación requerida', {
		status: 401,
		headers: { 'WWW-Authenticate': 'Basic realm="Faedo Instagram Admin"' },
	});
}

function isAuthorized(request: Request, env: Env): boolean {
	const header = request.headers.get('Authorization');
	if (!header || !header.startsWith('Basic ')) return false;

	const decoded = atob(header.slice('Basic '.length));
	const separatorIndex = decoded.indexOf(':');
	const user = decoded.slice(0, separatorIndex);
	const pass = decoded.slice(separatorIndex + 1);

	return user === env.ADMIN_USERNAME && pass === env.ADMIN_PASSWORD;
}

// ---------- Helpers ----------

function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function escapeHtml(str = ''): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

// Cron real: lunes, miércoles, viernes a las 9:00 UTC (ver wrangler.toml).
const CRON_WEEKDAYS_UTC = [1, 3, 5];
const CRON_HOUR_UTC = 9;

function nextCronDates(count: number, from: Date = new Date()): Date[] {
	const dates: Date[] = [];
	const cursor = new Date(
		Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), CRON_HOUR_UTC, 0, 0)
	);
	if (cursor <= from) cursor.setUTCDate(cursor.getUTCDate() + 1);

	while (dates.length < count) {
		if (CRON_WEEKDAYS_UTC.includes(cursor.getUTCDay())) {
			dates.push(new Date(cursor));
		}
		cursor.setUTCDate(cursor.getUTCDate() + 1);
	}
	return dates;
}

function formatCronDate(date: Date): string {
	return new Intl.DateTimeFormat('es-ES', {
		timeZone: 'Europe/Madrid',
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
}

// ---------- Render: pieza individual ----------

const STATUS_LABEL: Record<ContentStatus, string> = {
	draft: '📝 Borrador',
	approved: '✅ Aprobado (en cola)',
	published: '📤 Publicado',
};

function renderItem(env: Env, item: ContentItem, tab: string, dateLabel?: string): string {
	const mediaUrl = `${env.MEDIA_BASE_URL}/${item.media}`;
	const storyWarning =
		item.destination === 'story'
			? `<p class="warn">ℹ️ Historia: el caption es solo referencia — el texto debe ir "quemado" en la imagen, la API no lo admite.</p>`
			: '';
	const statsLine =
		item.status !== 'draft'
			? `<p class="meta">publicado: ${escapeHtml(item.publishedAt ?? '—')} · reciclado ${item.reuseCount} vez(es) · última vez: ${escapeHtml(item.lastReusedAt ?? '—')}</p>`
			: '';
	const dateBadge = dateLabel ? `<span class="date-badge">🗓️ ${escapeHtml(dateLabel)}</span>` : '';

	return `
	<article class="card">
		<img src="${mediaUrl}" alt="${escapeHtml(item.id)}" loading="lazy" />
		<div class="card-body">
			<h2>${escapeHtml(item.id)} <span class="badge">${STATUS_LABEL[item.status]}</span></h2>
			${dateBadge}
			<p class="meta">tipo: ${escapeHtml(item.type)} · creado: ${escapeHtml(item.createdAt)}</p>
			${statsLine}
			${storyWarning}
			<form method="POST" action="/admin/save">
				<input type="hidden" name="id" value="${escapeHtml(item.id)}" />
				<input type="hidden" name="tab" value="${escapeHtml(tab)}" />
				<label>Destino
					<select name="destination">
						<option value="feed" ${item.destination === 'feed' ? 'selected' : ''}>feed</option>
						<option value="story" ${item.destination === 'story' ? 'selected' : ''}>story</option>
					</select>
				</label>
				<label>Archivo (media)
					<input type="text" name="media" value="${escapeHtml(item.media)}" />
				</label>
				<label>Caption
					<textarea name="caption" rows="8">${escapeHtml(item.caption)}</textarea>
				</label>
				<button type="submit" class="save">Guardar cambios</button>
			</form>
			${
				item.status === 'draft'
					? `<form method="POST" action="/admin/approve" onsubmit="return confirm('¿Aprobar? Entrará en la cola del cron.');">
						<input type="hidden" name="id" value="${escapeHtml(item.id)}" />
						<input type="hidden" name="tab" value="${escapeHtml(tab)}" />
						<button type="submit" class="approve">✅ Aprobar</button>
					</form>`
					: ''
			}
			${
				item.status !== 'published'
					? `<form method="POST" action="/admin/discard" onsubmit="return confirm('¿Descartar? No se puede deshacer.');">
						<input type="hidden" name="id" value="${escapeHtml(item.id)}" />
						<input type="hidden" name="tab" value="${escapeHtml(tab)}" />
						<button type="submit" class="discard">🗑️ Descartar</button>
					</form>`
					: ''
			}
		</div>
	</article>`;
}

// ---------- Render: formulario de nuevo borrador (con subida a R2) ----------

function renderNewForm(): string {
	return `
	<details class="new-form">
		<summary>➕ Crear nuevo borrador</summary>
		<form method="POST" action="/admin/new" enctype="multipart/form-data">
			<input type="hidden" name="tab" value="drafts" />
			<label>Título (genera el id, y el nombre del archivo si subes foto)
				<input type="text" name="title" required placeholder="Ej: Puente de Palos" />
			</label>
			<label>Foto (puedes usar la cámara del móvil)
				<input type="file" name="photo" accept="image/*,video/*" capture="environment" />
			</label>
			<label>…o nombre de archivo ya subido a R2 (si no adjuntas foto)
				<input type="text" name="media" placeholder="puente-de-palos.webp" />
			</label>
			<label>Tipo
				<select name="type">
					<option value="image">image</option>
					<option value="video">video</option>
					<option value="reel">reel</option>
				</select>
			</label>
			<label>Destino
				<select name="destination">
					<option value="feed">feed</option>
					<option value="story">story</option>
				</select>
			</label>
			<label>Caption
				<textarea name="caption" rows="6" placeholder="Texto de la publicación..."></textarea>
			</label>
			<button type="submit" class="save">Crear borrador</button>
		</form>
	</details>`;
}

// ---------- Render: tabs ----------

async function renderDraftsTab(env: Env, items: ContentItem[]): Promise<string> {
	const drafts = items
		.filter((i) => i.status === 'draft')
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

	const cards = drafts.length
		? drafts.map((item) => renderItem(env, item, 'drafts')).join('\n')
		: '<p class="empty">No hay borradores pendientes 🎉</p>';

	return `${renderNewForm()}\n${cards}`;
}

async function renderQueueTab(env: Env, items: ContentItem[]): Promise<string> {
	const feedQueue = items
		.filter((i) => i.status === 'approved' && i.destination === 'feed')
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
	const storyQueue = items
		.filter((i) => i.status === 'approved' && i.destination === 'story')
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

	const datesNeeded = Math.max(feedQueue.length, storyQueue.length + 1, 1);
	const dates = nextCronDates(datesNeeded);

	const feedHtml = feedQueue.length
		? feedQueue.map((item, i) => renderItem(env, item, 'queue', formatCronDate(dates[i]))).join('\n')
		: '<p class="empty">Sin contenido aprobado — el próximo cron no publicará nada nuevo en feed.</p>';

	const storyApprovedHtml = storyQueue
		.map((item, i) => renderItem(env, item, 'queue', formatCronDate(dates[i])))
		.join('\n');

	const recycleCandidate = await findRecycleCandidate(env);
	const recycleHtml = recycleCandidate
		? `<div class="recycle-note">🔁 A partir de aquí, reciclaje automático — la próxima sería <strong>${escapeHtml(recycleCandidate.id)}</strong> el ${escapeHtml(formatCronDate(dates[storyQueue.length]))}</div>`
		: '<p class="empty">Todavía no hay nada publicado para reciclar.</p>';

	return `
		<h2 class="section-title">📤 Cola de Feed</h2>
		${feedHtml}
		<h2 class="section-title">📸 Cola de Historias</h2>
		${storyApprovedHtml}
		${recycleHtml}`;
}

async function renderPublishedTab(env: Env, items: ContentItem[]): Promise<string> {
	const published = items
		.filter((i) => i.status === 'published')
		.sort((a, b) => (b.lastReusedAt ?? b.publishedAt ?? '').localeCompare(a.lastReusedAt ?? a.publishedAt ?? ''));

	const cards = published.length
		? published.map((item) => renderItem(env, item, 'published')).join('\n')
		: '<p class="empty">Nada publicado todavía.</p>';

	return cards;
}

// ---------- Render: página completa ----------

const TABS = [
	{ key: 'drafts', label: '📝 Borradores' },
	{ key: 'queue', label: '🗓️ Cola' },
	{ key: 'published', label: '📤 Publicado' },
] as const;

async function renderPage(env: Env, tab: string, message: string | null): Promise<string> {
	const items = await listContent(env);
	const currentTab = TABS.some((t) => t.key === tab) ? tab : 'drafts';

	const draftCount = items.filter((i) => i.status === 'draft').length;
	const approvedCount = items.filter((i) => i.status === 'approved').length;
	const publishedCount = items.filter((i) => i.status === 'published').length;

	const counts: Record<string, number> = { drafts: draftCount, queue: approvedCount, published: publishedCount };

	const nav = TABS.map(
		(t) =>
			`<a href="/admin?tab=${t.key}" class="tab ${t.key === currentTab ? 'active' : ''}">${t.label} (${counts[t.key]})</a>`
	).join('');

	const banner = message ? `<p class="banner">${escapeHtml(message)}</p>` : '';

	let body: string;
	if (currentTab === 'queue') body = await renderQueueTab(env, items);
	else if (currentTab === 'published') body = await renderPublishedTab(env, items);
	else body = await renderDraftsTab(env, items);

	return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Admin Instagram — Faedo de Ciñera</title>
<style>
	body { font-family: system-ui, sans-serif; max-width: 720px; margin: 1.5rem auto; padding: 0 1rem; background: #faf9f6; color: #222; }
	h1 { font-size: 1.3rem; }
	.tabs { display: flex; gap: 0.4rem; margin: 1rem 0 1.5rem; flex-wrap: wrap; }
	.tab { padding: 0.4rem 0.8rem; border-radius: 999px; background: #eee; color: #333; text-decoration: none; font-size: 0.85rem; }
	.tab.active { background: #1a73e8; color: white; }
	.banner { background: #e6f4ea; border: 1px solid #34a853; padding: 0.75rem 1rem; border-radius: 6px; }
	.section-title { font-size: 1rem; margin-top: 1.5rem; }
	.empty { color: #777; font-size: 0.9rem; }
	.new-form { background: white; border: 1px solid #ddd; border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; }
	.new-form summary { cursor: pointer; font-weight: 600; }
	.card { background: white; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; margin-bottom: 1.5rem; }
	.card img { width: 100%; max-height: 280px; object-fit: cover; display: block; }
	.card-body { padding: 1rem 1.25rem; }
	.badge { font-size: 0.75rem; font-weight: normal; color: #555; }
	.date-badge { display: inline-block; background: #eef4ff; color: #1a73e8; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 999px; margin: 0.3rem 0; }
	.meta { color: #777; font-size: 0.8rem; margin: 0.15rem 0; }
	.warn { background: #fff4e5; border: 1px solid #f0ad4e; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; }
	.recycle-note { background: #f3f0ff; border: 1px solid #b39ddb; padding: 0.6rem 0.9rem; border-radius: 6px; font-size: 0.88rem; margin-top: 0.5rem; }
	label { display: block; margin: 0.6rem 0 0.2rem; font-size: 0.85rem; font-weight: 600; }
	input[type="text"], input[type="file"], select, textarea { width: 100%; padding: 0.5rem; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; border: 1px solid #ccc; border-radius: 6px; }
	textarea { resize: vertical; }
	button { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; font-size: 0.9rem; margin-top: 0.6rem; margin-right: 0.5rem; }
	.save { background: #1a73e8; color: white; }
	.approve { background: #34a853; color: white; }
	.discard { background: #eee; color: #a33; }
</style>
</head>
<body>
	<h1>Admin Instagram — Faedo de Ciñera</h1>
	<nav class="tabs">${nav}</nav>
	${banner}
	${body}
</body>
</html>`;
}

// ---------- Routing ----------

function redirect(tab: string, message?: string): Response {
	const params = new URLSearchParams({ tab });
	if (message) params.set('msg', message);
	return new Response(null, { status: 302, headers: { Location: `/admin?${params.toString()}` } });
}

export async function handleAdminRequest(request: Request, env: Env): Promise<Response> {
	if (!isAuthorized(request, env)) return unauthorized();

	const url = new URL(request.url);

	if (request.method === 'GET' && url.pathname === '/admin') {
		const html = await renderPage(env, url.searchParams.get('tab') ?? 'drafts', url.searchParams.get('msg'));
		return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
	}

	if (request.method === 'POST' && url.pathname === '/admin/new') {
		const formData = await request.formData();
		const title = String(formData.get('title') ?? '');
		const caption = String(formData.get('caption') ?? '');
		const type = (String(formData.get('type') ?? 'image')) as ContentItem['type'];
		const destination = (String(formData.get('destination') ?? 'feed')) as ContentItem['destination'];
		const manualMedia = String(formData.get('media') ?? '').trim();
		const file = formData.get('photo');

		const id = slugify(title);
		if (!id) return redirect('drafts', 'El título no puede estar vacío.');

		const existing = await getContent(env, id);
		if (existing) return redirect('drafts', `Ya existe un contenido con id "${id}"`);

		let media = manualMedia;

		if (file instanceof File && file.size > 0) {
			const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
			media = `${id}.${ext}`;
			await env.MEDIA_BUCKET.put(media, await file.arrayBuffer(), {
				httpMetadata: { contentType: file.type || 'application/octet-stream' },
			});
		}

		if (!media) {
			return redirect('drafts', 'Falta la foto — súbela o indica el nombre de un archivo ya existente en R2.');
		}

		const item: ContentItem = {
			id,
			media,
			type,
			destination,
			caption,
			status: 'draft',
			publishedAt: null,
			reuseCount: 0,
			lastReusedAt: null,
			createdAt: new Date().toISOString(),
		};
		await putContent(env, item);
		return redirect('drafts', `Borrador creado: ${id}`);
	}

	if (request.method === 'POST' && url.pathname === '/admin/save') {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		const tab = String(formData.get('tab') ?? 'drafts');
		const item = await getContent(env, id);
		if (!item) return redirect(tab, `No encontrado: ${id}`);

		item.media = String(formData.get('media') ?? item.media);
		item.destination = (String(formData.get('destination') ?? item.destination)) as ContentItem['destination'];
		item.caption = String(formData.get('caption') ?? item.caption);
		await putContent(env, item);
		return redirect(tab, `Guardado: ${id}`);
	}

	if (request.method === 'POST' && url.pathname === '/admin/approve') {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		const tab = String(formData.get('tab') ?? 'drafts');
		const item = await getContent(env, id);
		if (!item) return redirect(tab, `No encontrado: ${id}`);

		item.status = 'approved';
		await putContent(env, item);
		return redirect('queue', `Aprobado: ${id}`);
	}

	if (request.method === 'POST' && url.pathname === '/admin/discard') {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		const tab = String(formData.get('tab') ?? 'drafts');
		const item = await getContent(env, id);
		if (item?.status === 'published') return redirect(tab, 'No se puede descartar contenido ya publicado.');

		await deleteContent(env, id);
		return redirect(tab, `Descartado: ${id}`);
	}

	return new Response('No encontrado', { status: 404 });
}
