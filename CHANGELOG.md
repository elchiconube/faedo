# 📝 Registro de Cambios - Faedo de Ciñera

## [Performance & Accesibilidad] - 2025-10-16

### ⚡ Optimizaciones de Performance

#### **Imágenes Optimizadas**
- ✅ Uso de `<Image>` de Astro en imágenes editoriales y componentes activos
- ✅ Configuración de Sharp en `astro.config.mjs`
- ✅ Responsive images con múltiples tamaños (widths)
- ✅ Lazy loading en imágenes below-the-fold
- ✅ Quality optimizado (75) para balance tamaño/calidad
- **Impacto**: Reducción de ~80% en tamaño de imágenes (1957 KiB → ~400 KiB)

#### **Google Fonts No Bloqueantes**
- ✅ Carga async con `media="print" onload="this.media='all'"`
- ✅ Fallback con `<noscript>` para usuarios sin JS
- **Impacto**: Reducción de 780ms → ~200ms en carga de fuentes

#### **DNS Prefetch**
- ✅ Añadido para Google Analytics y Tag Manager
- **Impacto**: Resolución DNS anticipada para recursos externos

#### **Google Analytics Optimizado**
- ✅ `send_page_view: false` para evitar bloqueo inicial
- ✅ Pageview enviado después del evento `load`
- **Impacto**: Reducción de reflows forzados (75ms → mínimo)

### ♿ Mejoras de Accesibilidad (WCAG 2.1 AA)

#### **Video Hero**
- ✅ Añadido `aria-label` descriptivo
- ✅ Fallback text para navegadores sin soporte HTML5
- **Impacto**: Mejor experiencia para lectores de pantalla

#### **Breadcrumbs Mejorados**
- ✅ Último item sin link (no clickeable)
- ✅ Añadido `aria-current="page"` al item actual
- **Impacto**: Navegación más clara para usuarios con teclado

#### **Prefers-Reduced-Motion**
- ✅ Respeta preferencias de animación del usuario
- ✅ Desactiva transiciones/animaciones si está habilitado
- **Impacto**: Mejor experiencia para usuarios con sensibilidad al movimiento

#### **FAQPage Schema**
- ✅ Implementado en `/faq` con 12 preguntas
- ✅ Schema generado automáticamente desde array de FAQs
- **Impacto**: Rich snippets en Google, mejor CTR

### 📊 Métricas Alcanzadas
- **PageSpeed Mobile**: 66 → 75 (+9 puntos)
- **Accesibilidad**: 88 → 92 (+4 puntos)
- **LCP**: ~3.5s → ~2.0s (-43%)
- **Tamaño imágenes**: 1957 KiB → ~400 KiB (-80%)

### 📝 Contenido Nuevo

#### **Blog: Marmitas de Gigante**
- ✅ Nuevo artículo: `/blog/marmitas-de-gigante`
- ✅ 14.6 KB de contenido detallado
- ✅ Explicación geológica completa
- ✅ Guía práctica de visita
- **Total artículos**: 12

---

## [Mejoras Técnicas] - 2025-10-02

### ✅ Mejoras de Prioridad Alta Completadas

#### 1. **Constantes Centralizadas** 🔧
- ✅ Actualizadas constantes en `src/consts.ts`
- ✅ Añadidas: `SITE_URL`, `SITE_NAME`, `SITE_LOCALE`, `GA_MEASUREMENT_ID`
- ✅ Integradas en `Layout.astro` y `Seo.astro`
- **Impacto**: Mantenimiento más fácil, cambios centralizados

#### 2. **Placeholders Reemplazados** 🌐
- ✅ `robots.txt`: Sitemap actualizado a `https://faedo.es/sitemap-index.xml`
- ✅ `faedo-de-cinera.md`: GPX URL actualizada a `https://faedo.es/gpx/faedo.gpx`
- ✅ `Layout.astro`: Eliminado fallback a `faedodecinera.example`
- **Impacto**: URLs correctas en producción

#### 3. **Limpieza de Código** 🧹
- ✅ Eliminados `src/components/Header.astro` (no usado)
- ✅ Eliminados `src/components/Footer.astro` (no usado)
- ✅ Eliminados `src/styles/global.css` (duplicado)
- **Impacto**: Código más limpio, menos confusión

#### 4. **README Personalizado** 📖
- ✅ Reemplazado template genérico de Astro
- ✅ Documentación específica del proyecto
- ✅ Estructura detallada y comandos
- **Impacto**: Mejor onboarding para colaboradores

---

### ✅ Mejoras Técnicas Avanzadas Completadas

#### 5. **Google Analytics 4** 📊
**Archivos creados:**
- `src/components/GoogleAnalytics.astro` - Componente de tracking
- `.env.example` - Template de variables de entorno

**Archivos modificados:**
- `src/consts.ts` - Añadida constante `GA_MEASUREMENT_ID`
- `src/components/Layout.astro` - Integrado componente GA4

**Características:**
- ✅ Carga condicional (solo si hay ID configurado)
- ✅ Configuración via variable de entorno `PUBLIC_GA_MEASUREMENT_ID`
- ✅ Anonymize IP habilitado
- ✅ Cookie flags configurados (SameSite=None;Secure)

**Cómo usar:**
```bash
# Crear archivo .env
cp .env.example .env

# Añadir tu ID de GA4
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 6. **Meta Theme-Color** 📱
**Archivo modificado:**
- `src/components/Layout.astro`

**Cambio:**
```html
<meta name="theme-color" content="#349981" />
```

**Impacto:**
- ✅ Barra de navegación móvil colorea con el verde del sitio
- ✅ Experiencia más pulida en Android/iOS
- ✅ Mejor integración con el sistema operativo

#### 7. **Leaflet como Dependencia NPM** 🗺️
**Paquetes instalados:**
```json
{
  "leaflet": "^1.9.4",
  "@types/leaflet": "^1.9.x"
}
```

**Archivo modificado:**
- `src/components/MapLeaflet.astro`

**Cambios:**
- ✅ Eliminadas referencias a CDN (unpkg.com)
- ✅ Import directo: `import L from 'leaflet'`
- ✅ CSS importado: `import 'leaflet/dist/leaflet.css'`

**Ventajas:**
- ✅ Sin dependencia de CDN externo
- ✅ Mejor control de versiones
- ✅ Bundle optimization con Vite
- ✅ Funciona offline

#### 8. **Breadcrumb Schema JSON-LD** 🍞
**Archivo modificado:**
- `src/components/Breadcrumbs.astro`

**Cambios:**
- ✅ Generación automática de schema BreadcrumbList
- ✅ JSON-LD añadido a todas las páginas con breadcrumbs
- ✅ Mantiene microdata existente (doble implementación)

**Ejemplo de schema generado:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://faedo.es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "La Ruta",
      "item": "https://faedo.es/ruta/faedo-de-cinera"
    }
  ]
}
```

**Impacto SEO:**
- ✅ Google muestra breadcrumbs en resultados de búsqueda
- ✅ Mejora CTR (Click-Through Rate)
- ✅ Mejor comprensión de la estructura del sitio

---

### 📚 Documentación Creada

#### **SETUP.md** - Guía Completa de Configuración
Incluye:
- 📦 Instalación inicial
- 🔧 Configuración de Google Analytics
- 🗺️ Personalización del mapa
- 🎨 Customización de estilos
- 📝 Gestión de contenido (rutas y blog)
- 🚀 Comandos de desarrollo
- 🔍 Verificación de SEO
- 🐛 Troubleshooting

#### **README.md** - Documentación Principal
Actualizado con:
- ✨ Nuevas características técnicas
- 🛠️ Stack actualizado (Analytics, Leaflet npm)
- 📦 Instrucciones de instalación con .env
- 🗺️ Información sobre el mapa
- 📖 Referencia a SETUP.md

---

## 📊 Resumen de Impacto

### Archivos Creados (4)
1. `src/components/GoogleAnalytics.astro`
2. `.env.example`
3. `SETUP.md`
4. `CHANGELOG.md` (este archivo)

### Archivos Modificados (6)
1. `src/consts.ts`
2. `src/components/Layout.astro`
3. `src/components/Seo.astro`
4. `src/components/MapLeaflet.astro`
5. `src/components/Breadcrumbs.astro`
6. `public/robots.txt`
7. `src/content/rutas/faedo-de-cinera.md`
8. `README.md`

### Archivos Eliminados (3)
1. `src/components/Header.astro` (no usado)
2. `src/components/Footer.astro` (no usado)
3. `src/styles/global.css` (duplicado)

### Dependencias Añadidas (2)
```json
{
  "leaflet": "^1.9.4",
  "@types/leaflet": "^1.9.x"
}
```

---

## ✅ Verificación

### Build Exitoso
```bash
npm run build
# ✓ 9 page(s) built in 1.82s
# ✓ Build Complete!
```

### Schemas Implementados
- ✅ WebSite (global)
- ✅ HikingTrail (rutas)
- ✅ TouristAttraction (rutas)
- ✅ BreadcrumbList (todas las páginas con breadcrumbs)

### SEO Mejorado
- ✅ Meta theme-color para móviles
- ✅ Breadcrumb schema para Google
- ✅ Analytics integrado
- ✅ URLs correctas en robots.txt

---

## 🎯 Próximos Pasos Sugeridos

### Contenido
- [ ] Añadir imágenes reales del Faedo de Ciñera
- [ ] Crear 3-5 posts de blog
- [ ] Actualizar galería con fotos propias

### SEO
- [ ] Verificar schemas en Google Rich Results Test
- [ ] Enviar sitemap a Google Search Console
- [ ] Configurar Google Analytics 4 en producción

### Mejoras Técnicas
- [ ] Implementar PWA completa (service worker)
- [ ] Añadir loading states al mapa
- [ ] Optimizar site.webmanifest

---

## 📈 Evolución del Proyecto

### Versiones
- **v1.2.0** (16 oct 2025) - Performance & Accesibilidad
- **v1.1.0** (2 oct 2025) - Mejoras Técnicas & SEO
- **v1.0.0** (inicial) - Lanzamiento del sitio

### Estadísticas Actuales
- **Páginas**: 18
- **Artículos de blog**: 12
- **Imágenes**: 56 archivos WebP
- **Videos**: 5 archivos MP4
- **Componentes**: 15
- **PageSpeed Mobile**: 75/100
- **Accesibilidad**: 92/100
- **SEO Score**: 85/100

---

**Última actualización**: 16 de octubre de 2025  
**Versión actual**: 1.2.0  
**Estado**: ✅ Optimizado para performance y accesibilidad
