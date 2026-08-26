import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://faedo.es',
  redirects: {
    '/patrimonio-minero': {
      status: 301,
      destination: '/pozo-ibarra',
    },
    '/blog/por-que-se-llama-faedo': {
      status: 301,
      destination: '/blog/origen-nombre-faedo',
    },
    '/blog/bocamina-menos-50': {
      status: 301,
      destination: '/blog/bocamina-menos-cincuenta',
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    icon(),
    sitemap({
      filter: (page) => !page.includes('/blog/tag/'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
        },
      },
      serialize(item) {
        // Prioridades optimizadas para SEO
        if (item.url === 'https://faedo.es/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (item.url.includes('/ruta/faedo-de-cinera')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }
        if (item.url.endsWith('/blog/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        if (item.url.includes('/guia-visitantes') || item.url.includes('/historia-naturaleza') || item.url.includes('/tienda')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.includes('/pozo-ibarra')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.6, changefreq: 'monthly' };
      },
    }),
  ],
});
