# Faedo de Ciñera - Sitio Web Informativo

Sitio web informativo sobre la ruta de senderismo del **Faedo de Ciñera** en León, España. Construido con Astro para máximo rendimiento y SEO.

🌐 **URL**: [https://faedo.es](https://faedo.es)

## 📋 Descripción

Guía completa de senderismo del Faedo de Ciñera que incluye:

- 🗺️ Mapa interactivo con datos GPS reales (Leaflet + PNOA)
- 📍 Puntos de interés georreferenciados
- 📥 Descarga de track GPX
- 📖 Información sobre historia, naturaleza y patrimonio
- 🥾 Guía práctica para visitantes
- ❓ FAQ con preguntas frecuentes
- 📝 Blog de senderismo en León

## ✨ Características Técnicas

- ✅ **Rendimiento**: Astro con generación estática (SSG)
- ✅ **SEO optimizado**: Schema.org (HikingTrail + TouristAttraction + BreadcrumbList), meta tags completos
- ✅ **Analytics**: Google Analytics 4 integrado (configurable)
- ✅ **Accesibilidad**: ARIA labels, navegación semántica, skip links
- ✅ **Responsive**: TailwindCSS con diseño mobile-first
- ✅ **Mapas interactivos**: Leaflet (npm) con ortofoto PNOA del IGN
- ✅ **Content Collections**: Tipado estricto con Zod
- ✅ **Sitemap**: Generación automática con prioridades
- ✅ **PWA Ready**: Meta theme-color, manifest.webmanifest

## 🚀 Estructura del Proyecto

```text
├── public/
│   ├── gpx/              # Archivos GPX descargables
│   ├── images/           # Imágenes estáticas
│   ├── fonts/            # Fuentes web
│   ├── robots.txt
│   └── manifest.webmanifest
├── src/
│   ├── assets/           # Imágenes optimizadas por Astro
│   ├── components/       # Componentes reutilizables
│   │   ├── Cards/        # Tarjetas (POI, Posts)
│   │   ├── Breadcrumbs.astro
│   │   ├── FAQ.astro
│   │   ├── GoogleAnalytics.astro
│   │   ├── Hero.astro
│   │   ├── Layout.astro
│   │   ├── MapLeaflet.astro
│   │   └── Seo.astro
│   ├── content/          # Content Collections
│   │   ├── blog/         # Artículos del blog
│   │   ├── rutas/        # Información de rutas
│   │   └── config.ts     # Schemas de validación
│   ├── layouts/          # Layouts base
│   ├── pages/            # Páginas del sitio
│   │   ├── index.astro
│   │   ├── ruta/faedo-de-cinera.astro
│   │   ├── historia-naturaleza.astro
│   │   ├── guia-visitantes.astro
│   │   ├── faq.astro
│   │   ├── haeda.astro
│   │   └── blog/
│   ├── styles/           # Estilos globales
│   └── consts.ts         # Constantes del sitio
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── .env.example          # Variables de entorno (Analytics)
```

## 🛠️ Stack Tecnológico

- **Framework**: [Astro](https://astro.build) v5.13.4
- **Estilos**: [TailwindCSS](https://tailwindcss.com) v6.0.2
- **Mapas**: [Leaflet](https://leafletjs.com) v1.9.4
- **Contenido**: Astro Content Collections + MDX
- **Optimización de imágenes**: Sharp
- **Analytics**: Google Analytics 4
- **TypeScript**: Configuración estricta

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Instala las dependencias                            |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321`   |
| `npm run build`           | Genera el sitio estático en `./dist/`               |
| `npm run preview`         | Previsualiza el build localmente                    |
| `npm run astro ...`       | Ejecuta comandos CLI de Astro                       |

## 📦 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/elchiconube/faedo.git
cd faedo

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env
# Edita .env y añade tu Google Analytics ID

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

> 📖 **Guía completa de configuración**: Ver [SETUP.md](./SETUP.md) para instrucciones detalladas sobre Analytics, mapas, contenido y más.

## 🗺️ Mapa Interactivo

El mapa utiliza:
- **Capa base**: PNOA Máxima Actualidad (ortofoto del IGN)
- **Capa superpuesta**: IGN Base Orto (nombres y etiquetas)
- **Track GPS**: 108 puntos reales del GPX de la ruta circular
- **Puntos de interés**: Entrada al Faedo, Corazón del Faedo, Mirador del Beso, Pozo Ibarra

## 📄 Licencia

Proyecto informativo sin ánimo de lucro sobre el Faedo de Ciñera.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios importantes.

---

**Desarrollado con ❤️ para los amantes del senderismo en León**
