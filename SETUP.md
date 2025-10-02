# 🛠️ Guía de Configuración - Faedo de Ciñera

## 📦 Instalación Inicial

```bash
# Clonar el repositorio
git clone https://github.com/elchiconube/faedo.git
cd faedo

# Instalar dependencias
npm install
```

## 🔧 Configuración de Variables de Entorno

### Google Analytics 4

1. **Obtén tu ID de Google Analytics:**
   - Ve a [Google Analytics](https://analytics.google.com/)
   - Crea una propiedad GA4 si no la tienes
   - Copia tu ID de medición (formato: `G-XXXXXXXXXX`)

2. **Configura las variables de entorno:**

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env y añade tu ID
PUBLIC_GA_MEASUREMENT_ID=G-TU-ID-AQUI
```

3. **Verificación:**
   - El analytics solo se carga si el ID está configurado y es válido
   - En desarrollo, puedes dejarlo vacío para evitar tracking
   - En producción, asegúrate de configurar la variable de entorno en tu plataforma de hosting

### Variables de Entorno en Producción

#### Vercel
```bash
vercel env add PUBLIC_GA_MEASUREMENT_ID
```

#### Netlify
```bash
# En el dashboard: Site settings > Build & deploy > Environment > Environment variables
```

#### Cloudflare Pages
```bash
# En el dashboard: Settings > Environment variables
```

## 🗺️ Configuración del Mapa

El mapa usa Leaflet instalado como dependencia npm. La configuración está en:
- **Componente**: `src/components/MapLeaflet.astro`
- **Capas**: PNOA (ortofoto) + IGN Base (etiquetas)
- **Track GPS**: 108 puntos reales del GPX

### Personalizar el Mapa

```javascript
// En MapLeaflet.astro, línea ~168
const map = L.map("mapa-leaflet").setView(centroRuta, 14);
//                                                      ^^
//                                                      Zoom inicial
```

## 🎨 Personalización de Estilos

### Colores Principales

Los colores están definidos en `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    500: '#349981',  // Color principal (verde bosque)
    600: '#287a68',  // Hover states
    700: '#225f54',  // Enlaces
  }
}
```

### Theme Color (Barra del navegador móvil)

Configurado en `src/components/Layout.astro`:

```html
<meta name="theme-color" content="#349981" />
```

## 📝 Gestión de Contenido

### Añadir una Nueva Ruta

1. Crea un archivo en `src/content/rutas/`:

```markdown
---
title: "Nombre de la Ruta"
summary: "Descripción breve para SEO"
distance_km: 5.2
elevation_m: 200
duration_h: 2
difficulty: "moderada"
season: "Todo el año"
start_coords:
  lat: 42.8205
  lng: -5.6335
gpx_url: "https://faedo.es/gpx/tu-ruta.gpx"
access: "Cómo llegar en coche/bus/tren"
parking: "Información sobre aparcamiento"
family_friendly: true
tags: ["senderismo", "León"]
coverImage: ../../assets/tu-imagen.jpg
gallery:
  - ../../assets/foto1.jpg
  - ../../assets/foto2.jpg
---

## Descripción

Tu contenido aquí...
```

2. Crea la página en `src/pages/ruta/`:

```astro
---
import { getEntry } from 'astro:content';
const entry = await getEntry('rutas', 'tu-slug');
---
```

### Añadir un Post al Blog

1. Crea un archivo en `src/content/blog/`:

```markdown
---
title: "Título del Post"
excerpt: "Resumen breve"
date: 2025-10-02
tags: ["senderismo", "consejos"]
coverImage: ../../assets/portada.jpg
---

Tu contenido en Markdown...
```

## 🚀 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev
# → http://localhost:4321

# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar tipos TypeScript
npm run astro check
```

## 🔍 SEO y Schema.org

### Schemas Implementados

1. **WebSite** (global en Layout.astro)
2. **HikingTrail** (en páginas de rutas)
3. **TouristAttraction** (en páginas de rutas)
4. **BreadcrumbList** (en todas las páginas con breadcrumbs)

### Verificar Schemas

Usa estas herramientas:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## 📊 Analytics y Tracking

### Eventos Personalizados (Opcional)

Puedes añadir eventos personalizados en cualquier componente:

```javascript
// Ejemplo: tracking de descarga de GPX
<a 
  href="/gpx/faedo.gpx" 
  onclick="gtag('event', 'download', { 'file_name': 'faedo.gpx' })"
>
  Descargar GPX
</a>
```

## 🐛 Troubleshooting

### El mapa no se muestra

1. Verifica que Leaflet esté instalado: `npm list leaflet`
2. Comprueba la consola del navegador
3. Asegúrate de que las coordenadas son válidas

### Analytics no funciona

1. Verifica que `PUBLIC_GA_MEASUREMENT_ID` esté configurado
2. Comprueba que empiece por `G-`
3. Revisa la consola del navegador (Network tab)

### Build falla

```bash
# Limpia la caché y reinstala
rm -rf node_modules .astro dist
npm install
npm run build
```

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [Schema.org](https://schema.org/)
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.
