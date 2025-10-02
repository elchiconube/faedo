# 🔍 Guía de Configuración - Google Search Console

## 📋 Índice
1. [Verificar propiedad del sitio](#1-verificar-propiedad-del-sitio)
2. [Enviar sitemap](#2-enviar-sitemap)
3. [Configuración inicial](#3-configuración-inicial)
4. [Monitorización y optimización](#4-monitorización-y-optimización)
5. [Solución de problemas comunes](#5-solución-de-problemas-comunes)

---

## 1. Verificar Propiedad del Sitio

### Paso 1: Acceder a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Añadir propiedad"**

### Paso 2: Elegir tipo de propiedad

Tienes dos opciones:

#### **Opción A: Dominio** (Recomendada)
- **URL**: `faedo.es`
- **Ventaja**: Incluye www, http, https automáticamente
- **Verificación**: DNS (TXT record)

#### **Opción B: Prefijo de URL**
- **URL**: `https://faedo.es`
- **Ventaja**: Más fácil de verificar
- **Verificación**: Múltiples métodos

### Paso 3: Verificar con etiqueta HTML (Más fácil para Astro)

1. Selecciona **"Prefijo de URL"**: `https://faedo.es`
2. Elige método **"Etiqueta HTML"**
3. Google te dará un código como:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
4. Copia el código

### Paso 4: Añadir verificación a tu sitio

**Añade la constante en `src/consts.ts`:**

```typescript
// Google Search Console
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION || '';
```

**Crea el componente `src/components/GoogleSiteVerification.astro`:**

```astro
---
import { GSC_VERIFICATION } from '../consts';
---

{GSC_VERIFICATION && (
  <meta name="google-site-verification" content={GSC_VERIFICATION} />
)}
```

**Añádelo en `Layout.astro` dentro del `<head>`:**

```astro
import GoogleSiteVerification from './GoogleSiteVerification.astro';
// ...
<GoogleSiteVerification />
```

**Añade a `.env`:**
```bash
PUBLIC_GSC_VERIFICATION=ABC123XYZ...
```

5. Haz `npm run build` y despliega
6. Vuelve a Google Search Console y haz clic en **"Verificar"**

✅ **¡Verificado!**

---

## 2. Enviar Sitemap

### Paso 1: Enviar sitemap principal

1. En Google Search Console, ve a **"Sitemaps"** (menú izquierdo)
2. Añade la URL de tu sitemap: `sitemap-index.xml`
3. Haz clic en **"Enviar"**

**URL completa**: `https://faedo.es/sitemap-index.xml`

### Paso 2: Verificar que se procesó correctamente

- Estado debe ser: **"Correcto"**
- Espera 24-48 horas para que Google procese todas las URLs
- Verás el número de páginas descubiertas (debería ser 13)

---

## 3. Configuración Inicial

### A. Configurar URL preferida

1. Ve a **"Configuración"** → **"Configuración del sitio"**
2. Verifica que la URL preferida sea: `https://faedo.es`

### B. Configurar geolocalización

1. Ve a **"Configuración"** → **"Configuración del sitio"**
2. En **"País de destino"**, selecciona: **España**

**Importante**: Esto ayuda a posicionar mejor en búsquedas desde España.

### C. Solicitar indexación de páginas clave

Para acelerar la indexación:

1. Ve a **"Inspección de URLs"** (barra superior)
2. Introduce cada URL importante:
   - `https://faedo.es/`
   - `https://faedo.es/ruta/faedo-de-cinera`
   - `https://faedo.es/blog/mejor-epoca-visitar-faedo-de-cinera`
   - `https://faedo.es/blog/faedo-de-cinera-con-ninos`
   - `https://faedo.es/blog/como-llegar-faedo-de-cinera`
   - `https://faedo.es/faq`

3. Para cada URL, haz clic en **"Solicitar indexación"**

**Límite**: Puedes solicitar ~10 URLs al día.

---

## 4. Monitorización y Optimización

### A. Rendimiento (Performance)

**Qué monitorizar**:

1. **Clics totales**: Cuántas veces hacen clic en tu sitio desde Google
2. **Impresiones**: Cuántas veces aparece tu sitio en resultados
3. **CTR (Click-Through Rate)**: % de clics vs impresiones
4. **Posición media**: Posición promedio en resultados

**Acceso**: **"Rendimiento"** en el menú izquierdo

#### **Métricas objetivo para "Faedo de Ciñera"**:

| Métrica | Objetivo 1 mes | Objetivo 3 meses | Objetivo 6 meses |
|---------|----------------|------------------|------------------|
| Posición media | #10-15 | #3-5 | #1-2 |
| Impresiones/mes | 100-200 | 500-1000 | 2000-3000 |
| Clics/mes | 10-20 | 100-200 | 500-800 |
| CTR | 10-15% | 20-25% | 25-30% |

### B. Cobertura (Coverage)

**Qué verificar**:

1. Ve a **"Cobertura"** o **"Páginas"**
2. Verifica que las **13 páginas** estén indexadas
3. Revisa si hay errores:
   - ❌ Páginas excluidas
   - ❌ Errores 404
   - ❌ Páginas bloqueadas por robots.txt

**Objetivo**: **13/13 páginas indexadas** ✅

### C. Experiencia (Core Web Vitals)

1. Ve a **"Experiencia"** → **"Métricas web principales"**
2. Verifica que todas las páginas estén en **"Buena"**

**Métricas a vigilar**:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Tu sitio Astro debería tener todas en verde** ✅

### D. Usabilidad móvil

1. Ve a **"Experiencia"** → **"Usabilidad móvil"**
2. Verifica que no haya errores:
   - ❌ Texto demasiado pequeño
   - ❌ Elementos táctiles muy juntos
   - ❌ Contenido más ancho que la pantalla

**Tu sitio con Tailwind debería estar perfecto** ✅

### E. Enlaces (Links)

1. Ve a **"Enlaces"**
2. Monitoriza:
   - **Enlaces externos**: Quién enlaza a tu sitio
   - **Enlaces internos**: Qué páginas tienen más links internos

**Objetivo**: Conseguir backlinks de:
- Blogs de senderismo en León
- Turismo de Castilla y León
- Wikiloc
- Directorios de rutas

---

## 5. Optimizaciones Avanzadas

### A. Rich Results (Resultados Enriquecidos)

1. Ve a **"Mejoras"** → **"Resultados enriquecidos"**
2. Verifica que Google detecte tus schemas:
   - ✅ HikingTrail
   - ✅ TouristAttraction
   - ✅ BreadcrumbList
   - ✅ FAQPage
   - ✅ BlogPosting

**Si no aparecen**: Espera 1-2 semanas después de indexar.

### B. Datos estructurados

1. Usa [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Prueba estas URLs:
   - `https://faedo.es/ruta/faedo-de-cinera` (HikingTrail)
   - `https://faedo.es/faq` (FAQPage)
   - `https://faedo.es/blog/mejor-epoca-visitar-faedo-de-cinera` (BlogPosting)

**Objetivo**: ✅ Sin errores en todos los schemas

### C. Breadcrumbs en resultados

1. Espera 2-4 semanas después de indexar
2. Busca en Google: `site:faedo.es`
3. Deberías ver breadcrumbs en los resultados:
   ```
   faedo.es › Ruta › Faedo de Ciñera
   ```

---

## 6. Monitorización Semanal (Primeros 3 meses)

### Checklist semanal:

- [ ] **Lunes**: Revisar posición para "Faedo de Ciñera"
- [ ] **Miércoles**: Revisar nuevas queries en "Rendimiento"
- [ ] **Viernes**: Verificar que no haya errores en "Cobertura"

### Qué buscar en "Rendimiento":

1. **Queries con impresiones pero sin clics**:
   - Significa que apareces pero no hacen clic
   - Solución: Mejorar title y description

2. **Queries con buena posición pero bajo CTR**:
   - Mejorar snippets
   - Añadir emojis a meta descriptions (opcional)

3. **Queries inesperadas**:
   - Descubrir qué busca la gente
   - Crear contenido para esas búsquedas

---

## 7. Solución de Problemas Comunes

### Problema: "Páginas no indexadas"

**Causas posibles**:
- Sitio muy nuevo (espera 1-2 semanas)
- Robots.txt bloqueando
- Sitemap no enviado

**Solución**:
1. Verifica `robots.txt`: debe permitir todo
2. Envía sitemap manualmente
3. Solicita indexación de URLs clave

### Problema: "Posición baja para 'Faedo de Ciñera'"

**Causas posibles**:
- Sitio nuevo (paciencia)
- Falta de backlinks
- Competencia fuerte

**Solución**:
1. Espera 2-3 meses (sitios nuevos tardan)
2. Consigue backlinks de calidad
3. Sigue creando contenido

### Problema: "Errores de datos estructurados"

**Solución**:
1. Usa [Schema Validator](https://validator.schema.org/)
2. Corrige errores en los schemas JSON-LD
3. Vuelve a solicitar indexación

---

## 8. KPIs a Seguir

### Mes 1-2 (Indexación)
- ✅ 13 páginas indexadas
- ✅ Sitemap procesado sin errores
- ✅ Schemas detectados correctamente
- 🎯 Posición #10-20 para "Faedo de Ciñera"

### Mes 3-4 (Crecimiento)
- 🎯 Posición #5-10 para "Faedo de Ciñera"
- 🎯 100-200 clics/mes
- 🎯 500-1000 impresiones/mes
- 🎯 CTR > 15%

### Mes 5-6 (Consolidación)
- 🎯 Posición #1-3 para "Faedo de Ciñera"
- 🎯 500-800 clics/mes
- 🎯 2000-3000 impresiones/mes
- 🎯 CTR > 25%
- 🎯 Featured snippets para algunas FAQs

---

## 9. Checklist de Configuración Inicial

### ✅ Tareas Inmediatas (Hoy)

- [ ] Crear cuenta en Google Search Console
- [ ] Verificar propiedad del sitio (etiqueta HTML)
- [ ] Enviar sitemap: `sitemap-index.xml`
- [ ] Configurar país de destino: España
- [ ] Solicitar indexación de 5 URLs principales

### ✅ Tareas Primera Semana

- [ ] Verificar que sitemap se procesó correctamente
- [ ] Comprobar que no hay errores en "Cobertura"
- [ ] Verificar datos estructurados en Rich Results Test
- [ ] Configurar Google Analytics 4 (si no lo has hecho)
- [ ] Vincular GSC con GA4

### ✅ Tareas Primer Mes

- [ ] Revisar primeras queries en "Rendimiento"
- [ ] Verificar indexación de las 13 páginas
- [ ] Comprobar que aparecen breadcrumbs en resultados
- [ ] Revisar Core Web Vitals
- [ ] Solicitar indexación de nuevos posts si creas más

---

## 10. Comandos Útiles de Google

### Verificar indexación:

```
site:faedo.es
```
Muestra todas las páginas indexadas de tu sitio.

### Buscar keyword específica en tu sitio:

```
site:faedo.es "Faedo de Ciñera"
```

### Ver cómo Google ve una página específica:

```
site:faedo.es/ruta/faedo-de-cinera
```

---

## 11. Integración con Google Analytics

### Vincular GSC con GA4:

1. En Google Analytics 4, ve a **"Administración"**
2. En la columna de **"Propiedad"**, haz clic en **"Vínculos de Search Console"**
3. Haz clic en **"Vincular"**
4. Selecciona tu propiedad de Search Console
5. Confirma el vínculo

**Ventaja**: Ver datos de búsqueda directamente en GA4.

---

## 12. Alertas y Notificaciones

### Configurar alertas por email:

1. En GSC, ve a **"Configuración"** → **"Usuarios y permisos"**
2. Asegúrate de que tu email esté configurado
3. Recibirás alertas de:
   - ⚠️ Errores críticos de indexación
   - ⚠️ Penalizaciones manuales
   - ⚠️ Problemas de seguridad
   - ⚠️ Caídas importantes de tráfico

---

## 13. Optimizaciones Basadas en Datos

### Después de 2-4 semanas, analiza:

#### **En "Rendimiento" → "Consultas"**:

1. **Identifica queries con alta impresión pero bajo CTR**:
   - Ejemplo: "faedo ciñera" aparece 100 veces, 5 clics = CTR 5%
   - Solución: Mejorar title/description para esa keyword

2. **Identifica queries en posición 5-10**:
   - Están cerca de la primera página
   - Pequeñas mejoras pueden subirlas a top 3
   - Solución: Añadir más contenido sobre esa query

3. **Descubre queries inesperadas**:
   - Ejemplo: "hayedo león otoño"
   - Solución: Crear contenido específico para esa búsqueda

#### **En "Páginas"**:

1. **Identifica páginas con más clics**:
   - Potenciar esas páginas con más contenido
   - Añadir más internal links hacia ellas

2. **Identifica páginas con 0 clics**:
   - Revisar si están indexadas
   - Mejorar contenido o promocionarlas

---

## 14. Estrategia de Contenido Basada en GSC

### Mes 1-2: Observación

- Anota qué queries generan impresiones
- Identifica patrones de búsqueda
- Descubre qué busca realmente la gente sobre el Faedo de Ciñera

### Mes 3+: Optimización

**Ejemplo de optimización**:

Si ves que "faedo de ciñera perros" tiene muchas impresiones:
1. Crea un post: "Visitar el Faedo de Ciñera con perros"
2. Expande la FAQ sobre perros
3. Añade sección en la guía para visitantes

---

## 15. Herramientas Complementarias

### A. Google Rich Results Test

**URL**: https://search.google.com/test/rich-results

**Prueba estas páginas**:
- `/ruta/faedo-de-cinera` → HikingTrail + TouristAttraction
- `/faq` → FAQPage
- `/blog/mejor-epoca-visitar-faedo-de-cinera` → BlogPosting + BreadcrumbList

### B. PageSpeed Insights

**URL**: https://pagespeed.web.dev/

**Prueba**: `https://faedo.es`

**Objetivo**: 
- Mobile: 90+ ✅
- Desktop: 95+ ✅

### C. Mobile-Friendly Test

**URL**: https://search.google.com/test/mobile-friendly

**Prueba**: `https://faedo.es`

**Objetivo**: ✅ "La página es compatible con dispositivos móviles"

---

## 16. Errores Comunes a Evitar

### ❌ NO hagas esto:

1. **No solicites indexación masiva**: Máximo 10 URLs al día
2. **No cambies URLs sin redirects**: Usa redirects 301
3. **No uses keyword stuffing**: Densidad natural (2-4%)
4. **No compres backlinks**: Google penaliza
5. **No copies contenido**: Todo debe ser original

### ✅ SÍ haz esto:

1. **Monitoriza semanalmente** los primeros 3 meses
2. **Crea contenido regularmente**: 1-2 posts/mes
3. **Responde a comentarios** si añades sección de comentarios
4. **Actualiza contenido antiguo**: Mantén fechas actualizadas
5. **Consigue backlinks naturales**: Contacta blogs de senderismo

---

## 17. Timeline Esperado

### Semana 1-2: Verificación e indexación inicial
- ✅ Sitio verificado
- ✅ Sitemap enviado
- 🔄 Google empieza a rastrear

### Semana 3-4: Primeras apariciones
- 🔄 Primeras impresiones en búsquedas
- 🔄 Posición #20-50 para "Faedo de Ciñera"
- 🔄 Schemas detectados

### Mes 2-3: Crecimiento
- 📈 Posición #10-20 para "Faedo de Ciñera"
- 📈 100-200 impresiones/mes
- 📈 Primeros clics orgánicos

### Mes 4-6: Consolidación
- 🎯 Posición #3-5 para "Faedo de Ciñera"
- 🎯 500-1000 impresiones/mes
- 🎯 100-200 clics/mes
- 🎯 Featured snippets posibles

### Mes 6+: Dominio
- 🏆 Posición #1-2 para "Faedo de Ciñera"
- 🏆 2000+ impresiones/mes
- 🏆 500+ clics/mes
- 🏆 Autoridad en "senderismo León"

---

## 18. Recursos Adicionales

### Documentación oficial:
- [Guía de inicio de Search Console](https://support.google.com/webmasters/answer/9128668)
- [Cómo funciona la Búsqueda de Google](https://developers.google.com/search/docs/fundamentals/how-search-works)
- [Directrices de calidad](https://developers.google.com/search/docs/essentials)

### Herramientas útiles:
- [Google Search Console](https://search.google.com/search-console/)
- [Google Analytics](https://analytics.google.com/)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 19. Resumen: Pasos Críticos

### 🚀 Hoy (30 minutos):

1. ✅ Crear cuenta en Google Search Console
2. ✅ Verificar propiedad con etiqueta HTML
3. ✅ Enviar sitemap: `sitemap-index.xml`
4. ✅ Configurar país: España
5. ✅ Solicitar indexación de 5 URLs principales

### 📊 Esta semana:

6. ✅ Verificar que sitemap se procesó
7. ✅ Comprobar indexación de páginas
8. ✅ Verificar schemas en Rich Results Test
9. ✅ Configurar Google Analytics 4
10. ✅ Vincular GSC con GA4

### 📈 Este mes:

11. ✅ Monitorizar rendimiento semanalmente
12. ✅ Analizar primeras queries
13. ✅ Optimizar titles/descriptions según datos
14. ✅ Crear 1-2 posts más si ves oportunidades

---

## 20. Contacto y Soporte

Si tienes problemas con Google Search Console:

- [Foro de ayuda de Google](https://support.google.com/webmasters/community)
- [Twitter @googlesearchc](https://twitter.com/googlesearchc)
- [Documentación oficial](https://developers.google.com/search)

---

**¡Buena suerte con el posicionamiento del Faedo de Ciñera!** 🚀📈

Con el contenido que hemos creado y esta configuración, deberías estar en **top 3 para "Faedo de Ciñera" en 3-6 meses**.
