// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://faedodecinera.example',
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
        },
      },
      serialize(item) {
        // Destacar la ruta principal en el sitemap
        if (item.url.endsWith('/ruta/faedo-de-cinera')) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        return { ...item, changefreq: 'monthly' };
      },
    }),
  ],
});
