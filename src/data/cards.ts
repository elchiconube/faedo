// Importar todas las imágenes
import imagenRuta from '../assets/paseo-faedo.webp';
import imagenPremio from '../assets/faedo-5.webp';
import imageVisitantes from '../assets/visitantes.webp';
import imageBruja from '../assets/bruja.webp';
import imageDesman from '../assets/desman-iberico.webp';
import imageBlog from '../assets/blog.webp';
import imageGeologia from '../assets/geologia.webp';
import imageMineria from '../assets/pozo-ibarra.webp'
import imageMarmitas from '../assets/marmitas.webp'
import imageBocamina from '../assets/bocamina.webp'
import imagePuente from '../assets/puente-palos.webp'
import imageFagus from '../assets/fagus.webp'
import imageNutria from '../assets/nutria.webp'

export interface Card {
  id: string;
  href: string;
  title: string;
  description?: string;
  icon: string;
  backgroundImage?: any;
  titleTag?: 'h2' | 'h3' | 'h4';
}

export const allCards: Card[] = [
  {
    id: 'premio',
    href: '/premio-2007',
    title: 'Premio 2007',
    description: 'Bosque mejor cuidado de España',
    icon: 'M126,136a6,6,0,0,1-6,6H72a6,6,0,0,1,0-12h48A6,6,0,0,1,126,136Zm-6-38H72a6,6,0,0,0,0,12h48a6,6,0,0,0,0-12Zm110,62.62V224a6,6,0,0,1-9,5.21l-25-14.3-25,14.3a6,6,0,0,1-9-5.21V198H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216a14,14,0,0,1,14,14V87.38a49.91,49.91,0,0,1,0,73.24ZM196,86a38,38,0,1,0,38,38A38,38,0,0,0,196,86ZM162,186V160.62a50,50,0,0,1,56-81.51V56a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V184a2,2,0,0,0,2,2Zm56-17.11a49.91,49.91,0,0,1-44,0v44.77l19-10.87a6,6,0,0,1,6,0l19,10.87Z',
    backgroundImage: imagenPremio.src
  },
  {
    id: 'ruta',
    href: '/ruta/faedo-de-cinera',
    title: 'La Ruta',
    description: 'Consejos para disfrutar de tu ruta',
    icon: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z',
    backgroundImage: imagenRuta.src
  },
  {
    id: 'historia-naturaleza',
    href: '/historia-naturaleza',
    title: 'Historia y Naturaleza',
    description: 'Conoce de primera mano su entorno',
    icon: 'M198.1,62.59a76,76,0,0,0-140.2,0A71.71,71.71,0,0,0,16,127.8C15.9,166,48,199,86.14,200A72.09,72.09,0,0,0,120,192.47V232a8,8,0,0,0,16,0V192.47A72.17,72.17,0,0,0,168,200l1.82,0C208,199,240.11,166,240,127.8A71.71,71.71,0,0,0,198.1,62.59ZM169.45,184a56.08,56.08,0,0,1-33.45-10v-41l43.58-21.78a8,8,0,1,0-7.16-14.32L136,115.06V88a8,8,0,0,0-16,0v51.06L83.58,120.84a8,8,0,1,0-7.16,14.32L120,156.94v17a56,56,0,0,1-33.45,10C56.9,183.23,31.92,157.52,32,127.84A55.77,55.77,0,0,1,67.11,76a8,8,0,0,0,4.53-4.67,60,60,0,0,1,112.72,0A8,8,0,0,0,188.89,76,55.79,55.79,0,0,1,224,127.84C224.08,157.52,199.1,183.23,169.45,184Z',
    backgroundImage: imageDesman.src
  },
  {
    id: 'guia-visitantes',
    href: '/guia-visitantes',
    title: 'Guía para visitantes',
    description: 'Alojamientos, restaurantes y servicios',
    icon: 'M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z',
    backgroundImage: imageVisitantes.src
  },
  {
    id: 'haeda',
    href: '/haeda',
    title: 'El cuento de Haeda',
    description: 'Relato popular del Faedo para leer con niños',
    icon: 'M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z',
    backgroundImage: imageBruja.src
  },
  {
    id: 'fagus',
    href: '/haya-fagus',
    title: 'El Haya Fagus',
    description: 'Uno de los 100 más singulares de España',
    icon: 'M198.1,62.59a76,76,0,0,0-140.2,0A71.71,71.71,0,0,0,16,127.8C15.9,166,48,199,86.14,200A72.09,72.09,0,0,0,120,192.47V232a8,8,0,0,0,16,0V192.47A72.17,72.17,0,0,0,168,200l1.82,0C208,199,240.11,166,240,127.8A71.71,71.71,0,0,0,198.1,62.59ZM169.45,184a56.08,56.08,0,0,1-33.45-10v-41l43.58-21.78a8,8,0,1,0-7.16-14.32L136,115.06V88a8,8,0,0,0-16,0v51.06L83.58,120.84a8,8,0,1,0-7.16,14.32L120,156.94v17a56,56,0,0,1-33.45,10C56.9,183.23,31.92,157.52,32,127.84A55.77,55.77,0,0,1,67.11,76a8,8,0,0,0,4.53-4.67,60,60,0,0,1,112.72,0A8,8,0,0,0,188.89,76,55.79,55.79,0,0,1,224,127.84C224.08,157.52,199.1,183.23,169.45,184Z',
    backgroundImage: imageFagus.src
  },
  {
    id: 'flora-fauna',
    href: '/flora-fauna',
    title: 'Flora y Fauna',
    description: 'Biodiversidad completa del bosque y sus alrededores',
    icon: 'M176,68a12,12,0,1,1-12-12A12,12,0,0,1,176,68Zm64,12a8,8,0,0,1-3.56,6.66L216,100.28V120A104.11,104.11,0,0,1,112,224H24a16,16,0,0,1-12.49-26l.1-.12L96,96.63V76.89C96,43.47,122.79,16.16,155.71,16H156a60,60,0,0,1,57.21,41.86l23.23,15.48A8,8,0,0,1,240,80Zm-22.42,0L201.9,69.54a8,8,0,0,1-3.31-4.64A44,44,0,0,0,156,32h-.22C131.64,32.12,112,52.25,112,76.89V99.52a8,8,0,0,1-1.85,5.13L24,208h26.9l70.94-85.12a8,8,0,1,1,12.29,10.24L71.75,208H112a88.1,88.1,0,0,0,88-88V96a8,8,0,0,1,3.56-6.66Z',
    backgroundImage: imageNutria.src
  },
  {
    id: 'geologia',
    href: '/geologia',
    title: 'Geología',
    description: '400 millones de años de historia en las rocas',
    icon: 'M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM74.58,112l30.13,75.33L34.41,112Zm89.6,0L128,202.46,91.82,112ZM96,96l32-42.67L160,96Zm85.42,16h40.17l-70.3,75.33ZM75.63,48H112L76,96H33.63Z',
    backgroundImage: imageGeologia.src
  },
  {
    id: 'puente',
    href: '/blog/puente-de-palos',
    title: 'Puente de palos',
    description: 'Construcción histórica utilizada por mineros.',
    icon: 'M212,136a12,12,0,1,1-12-12A12,12,0,0,1,212,136Zm36,0c0,40.37-21.08,72-48,72H56c-26.92,0-48-31.63-48-72S29.08,64,56,64H92.69l37.65-37.66A8,8,0,0,1,136,24h32a8,8,0,0,1,0,16H139.31l-24,24H200C226.92,64,248,95.63,248,136ZM56,192H169.51a73.46,73.46,0,0,1-12.67-24H80a8,8,0,0,1,0-16h73.16A110.63,110.63,0,0,1,152,136c0-22.86,6.76-42.9,17.51-56H56c-12.47,0-23.55,13.26-28.8,32H104a8,8,0,0,1,0,16H24.35q-.34,3.93-.35,8C24,166.36,38.65,192,56,192Zm176-56c0-30.36-14.65-56-32-56s-32,25.64-32,56,14.65,56,32,56S232,166.36,232,136Z',
    backgroundImage: imagePuente.src
  },
  {
    id: 'marmitas',
    href: '/blog/marmitas-de-gigante',
    title: 'Marmitas de gigante',
    description: 'Piscinas naturales en verano',
    icon: "M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z",
    backgroundImage: imageMarmitas.src
  },
  {
    id: 'bocamina',
    href: '/blog/bocamina-menos-cincuenta',
    title: 'Bocamina "Menos 50"',
    description: 'Entrada rehabilitada por los vecinos.',
    icon: 'M224,152V136a96.37,96.37,0,0,0-64-90.51V40a16,16,0,0,0-16-16H112A16,16,0,0,0,96,40v5.49A96.37,96.37,0,0,0,32,136v16a16,16,0,0,0-16,16v24a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V168A16,16,0,0,0,224,152Zm-16-16v16H160V62.67A80.36,80.36,0,0,1,208,136ZM144,40V152H112V40ZM48,136A80.36,80.36,0,0,1,96,62.67V152H48Zm176,56H32V168H224v24Z',
    backgroundImage: imageBocamina.src
  },
  {
    id: 'pozo-ibarra',
    href: '/pozo-ibarra',
    title: 'Pozo Ibarra',
    description: 'Castillete BIC de 1930 y patrimonio minero',
    icon: 'M224,152V136a96.37,96.37,0,0,0-64-90.51V40a16,16,0,0,0-16-16H112A16,16,0,0,0,96,40v5.49A96.37,96.37,0,0,0,32,136v16a16,16,0,0,0-16,16v24a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V168A16,16,0,0,0,224,152Zm-16-16v16H160V62.67A80.36,80.36,0,0,1,208,136ZM144,40V152H112V40ZM48,136A80.36,80.36,0,0,1,96,62.67V152H48Zm176,56H32V168H224v24Z',
    backgroundImage: imageMineria.src
  },
  {
    id: 'blog',
    href: '/blog',
    title: 'Blog',
    description: 'Artículos y últimas novedades relacionadas con el Faedo de Ciñera',
    icon: 'M216,40H40A16,16,0,0,0,24,56V216a8,8,0,0,0,11.58,7.15L64,208.94l28.42,14.21a8,8,0,0,0,7.16,0L128,208.94l28.42,14.21a8,8,0,0,0,7.16,0L192,208.94l28.42,14.21A8,8,0,0,0,232,216V56A16,16,0,0,0,216,40Zm0,163.06-20.42-10.22a8,8,0,0,0-7.16,0L160,207.06l-28.42-14.22a8,8,0,0,0-7.16,0L96,207.06,67.58,192.84a8,8,0,0,0-7.16,0L40,203.06V56H216ZM136,112a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,112Zm0,32a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,144ZM64,168h48a8,8,0,0,0,8-8V96a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v64A8,8,0,0,0,64,168Zm8-64h32v48H72Z',
    backgroundImage: imageBlog.src
  },


];

/** Cards del módulo «Explora más» (páginas principales del site) */
export const EXPLORE_CARD_IDS = [
  "fagus",
  "geologia",
  "pozo-ibarra",
  "flora-fauna",
  "historia-naturaleza",
  "haeda",
  "ruta",
  "guia-visitantes",
] as const;

/** Cards del módulo «Planifica tu visita» */
export const PLANIFICA_CARD_IDS = [
  "ruta",
  "pozo-ibarra",
  "guia-visitantes",
  "historia-naturaleza",
  "haeda",
] as const;

/** Puntos de interés (página de la ruta) */
export const RUTA_INTERES_CARD_IDS = [
  "bocamina",
  "fagus",
  "pozo-ibarra",
  "marmitas",
  "puente",
] as const;

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

/** Obtiene cards por IDs excluyendo la URL actual y limitando el número */
export function getCardsForPath(
  pathname: string,
  ids: readonly string[],
  limit = 4,
): Card[] {
  const current = normalizePath(pathname);
  return getCardsByIds([...ids])
    .filter((card) => normalizePath(card.href) !== current)
    .slice(0, limit);
}

// Función helper para obtener cards por sus IDs
export function getCardsByIds(ids: string[]): Card[] {
  return ids
    .map((id) => allCards.find((card) => card.id === id))
    .filter((card): card is Card => card !== undefined);
}

// Función helper para obtener una card por su ID
export function getCardById(id: string): Card | undefined {
  return allCards.find((card) => card.id === id);
}