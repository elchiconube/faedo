import type { ContentItem, ContentDestination, Env } from './types';

const KEY_PREFIX = 'content:';

export function keyFor(id: string): string {
	return `${KEY_PREFIX}${id}`;
}

export async function listContent(env: Env): Promise<ContentItem[]> {
	const items: ContentItem[] = [];
	let cursor: string | undefined;

	do {
		const page = await env.CONTENT_KV.list({ prefix: KEY_PREFIX, cursor });
		for (const key of page.keys) {
			const raw = await env.CONTENT_KV.get(key.name);
			if (raw) items.push(JSON.parse(raw));
		}
		cursor = page.list_complete ? undefined : page.cursor;
	} while (cursor);

	return items;
}

export async function putContent(env: Env, item: ContentItem): Promise<void> {
	await env.CONTENT_KV.put(keyFor(item.id), JSON.stringify(item));
}

export async function getContent(env: Env, id: string): Promise<ContentItem | null> {
	const raw = await env.CONTENT_KV.get(keyFor(id));
	return raw ? JSON.parse(raw) : null;
}

export async function deleteContent(env: Env, id: string): Promise<void> {
	await env.CONTENT_KV.delete(keyFor(id));
}

/** Siguiente pieza aprobada para un destino, la más antigua primero (orden de llegada). */
export async function findNextApproved(
	env: Env,
	destination: ContentDestination
): Promise<ContentItem | null> {
	const items = await listContent(env);
	const candidates = items
		.filter((i) => i.status === 'approved' && i.destination === destination)
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

	return candidates[0] ?? null;
}

/** Pieza ya publicada con más tiempo sin reciclarse en historias (nunca reciclada, primero). */
export async function findRecycleCandidate(env: Env): Promise<ContentItem | null> {
	const items = await listContent(env);
	const candidates = items
		.filter((i) => i.status === 'published')
		.sort((a, b) => {
			const aDate = a.lastReusedAt ?? a.publishedAt ?? '';
			const bDate = b.lastReusedAt ?? b.publishedAt ?? '';
			return aDate.localeCompare(bDate);
		});

	return candidates[0] ?? null;
}
