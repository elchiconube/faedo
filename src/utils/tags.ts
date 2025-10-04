/**
 * Convierte un tag en formato slug (sin espacios, minúsculas, guiones)
 * Ejemplo: "senderismo en León" -> "senderismo-en-leon"
 */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .normalize('NFD') // Descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-'); // Múltiples guiones a uno solo
}

/**
 * Obtiene todos los tags únicos de una colección de posts
 */
export function getAllTags(posts: any[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.data.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Filtra posts por tag (comparando slugs)
 */
export function filterPostsByTag(posts: any[], targetTag: string): any[] {
  const targetSlug = slugifyTag(targetTag);
  return posts.filter(post => 
    post.data.tags?.some((tag: string) => slugifyTag(tag) === targetSlug)
  );
}
