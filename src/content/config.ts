import { defineCollection, z } from 'astro:content';

const rutas = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // slug se obtiene de entry.slug
      summary: z.string(),
      distance_km: z.number(),
      elevation_m: z.number(),
      duration_h: z.number(),
      difficulty: z.enum(['fácil', 'moderada', 'exigente']),
      season: z.string(),
      start_coords: z.object({ lat: z.number(), lng: z.number() }),
      gpx_url: z.string().url(),
      access: z.string(),
      parking: z.string(),
      family_friendly: z.boolean(),
      tags: z.array(z.string()).default([]),
      coverImage: image(),
      gallery: z.array(image()).default([]),
    }),
});

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // slug se obtiene de entry.slug
      excerpt: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      coverImage: image().optional(),
    }),
});

export const collections = { rutas, blog };
