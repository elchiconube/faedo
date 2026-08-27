import type { Env } from './types';

function graphUrl(env: Env, path: string): string {
	return `https://graph.instagram.com/${env.INSTAGRAM_API_VERSION}${path}`;
}

async function createContainer(
	env: Env,
	params: Record<string, string>
): Promise<string> {
	const url = graphUrl(env, `/${env.INSTAGRAM_USER_ID}/media`);
	const body = new URLSearchParams({
		...params,
		access_token: env.INSTAGRAM_ACCESS_TOKEN,
	});

	const res = await fetch(url, { method: 'POST', body });
	const data = await res.json<{ id?: string; error?: { message: string } }>();

	if (!res.ok || !data.id) {
		throw new Error(`Error creando contenedor: ${data.error?.message ?? res.statusText}`);
	}

	return data.id;
}

async function publishContainer(env: Env, creationId: string): Promise<string> {
	const url = graphUrl(env, `/${env.INSTAGRAM_USER_ID}/media_publish`);
	const body = new URLSearchParams({
		creation_id: creationId,
		access_token: env.INSTAGRAM_ACCESS_TOKEN,
	});

	const res = await fetch(url, { method: 'POST', body });
	const data = await res.json<{ id?: string; error?: { message: string } }>();

	if (!res.ok || !data.id) {
		throw new Error(`Error publicando contenedor: ${data.error?.message ?? res.statusText}`);
	}

	return data.id;
}

export async function publishImageToFeed(
	env: Env,
	imageUrl: string,
	caption: string
): Promise<string> {
	const containerId = await createContainer(env, { image_url: imageUrl, caption });
	return publishContainer(env, containerId);
}

/** Instagram no admite caption en historias vía API: solo se sube la imagen. */
export async function publishImageToStory(env: Env, imageUrl: string): Promise<string> {
	const containerId = await createContainer(env, {
		image_url: imageUrl,
		media_type: 'STORIES',
	});
	return publishContainer(env, containerId);
}
