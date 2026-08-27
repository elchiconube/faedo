import type { Env, ContentItem } from './types';
import { findNextApproved, findRecycleCandidate, putContent } from './kv';
import { publishImageToFeed, publishImageToStory } from './instagram-api';
import { handleAdminRequest } from './admin';

function mediaUrl(env: Env, item: ContentItem): string {
	return `${env.MEDIA_BASE_URL}/${item.media}`;
}

async function publishFeedItem(env: Env, item: ContentItem): Promise<void> {
	if (item.type !== 'image') {
		console.log(`Saltando "${item.id}": publicación de vídeo/reel aún no implementada.`);
		return;
	}

	await publishImageToFeed(env, mediaUrl(env, item), item.caption);

	item.status = 'published';
	item.publishedAt = new Date().toISOString();
	await putContent(env, item);

	console.log(`Publicado en feed: ${item.id}`);
}

async function publishNewStoryItem(env: Env, item: ContentItem): Promise<void> {
	if (item.type !== 'image') {
		console.log(`Saltando "${item.id}": publicación de vídeo/reel aún no implementada.`);
		return;
	}

	await publishImageToStory(env, mediaUrl(env, item));

	item.status = 'published';
	item.publishedAt = new Date().toISOString();
	await putContent(env, item);

	console.log(`Publicada historia nueva: ${item.id}`);
}

async function recycleAsStory(env: Env, item: ContentItem): Promise<void> {
	if (item.type !== 'image') {
		console.log(`Saltando reciclaje de "${item.id}": vídeo/reel aún no implementado.`);
		return;
	}

	await publishImageToStory(env, mediaUrl(env, item));

	item.reuseCount += 1;
	item.lastReusedAt = new Date().toISOString();
	await putContent(env, item);

	console.log(`Reciclada en historia: ${item.id} (uso #${item.reuseCount})`);
}

async function run(env: Env): Promise<void> {
	// 1. Feed: solo contenido nuevo aprobado, nunca se recicla.
	const nextFeed = await findNextApproved(env, 'feed');
	if (nextFeed) {
		await publishFeedItem(env, nextFeed);
	} else {
		console.log('Sin contenido nuevo aprobado para feed hoy.');
	}

	// 2. Historia: prioriza contenido nuevo aprobado; si no hay, recicla lo ya publicado.
	const nextStory = await findNextApproved(env, 'story');
	if (nextStory) {
		await publishNewStoryItem(env, nextStory);
		return;
	}

	const recycleCandidate = await findRecycleCandidate(env);
	if (recycleCandidate) {
		await recycleAsStory(env, recycleCandidate);
	} else {
		console.log('No hay nada disponible ni para publicar ni para reciclar en historias.');
	}
}

export default {
	async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		ctx.waitUntil(run(env));
	},
	// Único punto de entrada por HTTP: el panel de administración, protegido
	// con contraseña. Cualquier otra ruta devuelve 404 — nada aquí puede
	// disparar una publicación real (eso solo lo hace `scheduled`).
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname.startsWith('/admin')) {
			return handleAdminRequest(request, env);
		}
		return new Response('No encontrado', { status: 404 });
	},
};
