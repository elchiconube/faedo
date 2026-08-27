export type ContentType = 'image' | 'video' | 'reel';
export type ContentDestination = 'feed' | 'story';
export type ContentStatus = 'draft' | 'approved' | 'published';

export interface ContentItem {
	id: string;
	media: string; // nombre del archivo en el bucket R2, servido en media.faedo.es
	type: ContentType;
	destination: ContentDestination;
	/**
	 * Caption para publicar en feed. Para 'story' este campo NO se envía a
	 * la API (Instagram no admite texto/caption en historias vía API) —
	 * se guarda solo como referencia de lo que debería llevar "quemado"
	 * en la propia imagen antes de subirla.
	 */
	caption: string;
	/**
	 * 'draft': generado (por ti o por IA), pendiente de tu revisión — el
	 *          cron lo ignora por completo.
	 * 'approved': revisado y listo — el cron lo publicará en su próxima
	 *          ejecución.
	 * 'published': ya se ha publicado al menos una vez.
	 */
	status: ContentStatus;
	publishedAt: string | null;
	reuseCount: number;
	lastReusedAt: string | null;
	createdAt: string;
}

export interface Env {
	CONTENT_KV: KVNamespace;
	MEDIA_BUCKET: R2Bucket;
	INSTAGRAM_ACCESS_TOKEN: string;
	INSTAGRAM_USER_ID: string;
	MEDIA_BASE_URL: string;
	INSTAGRAM_API_VERSION: string;
	ADMIN_USERNAME: string;
	ADMIN_PASSWORD: string;
}
