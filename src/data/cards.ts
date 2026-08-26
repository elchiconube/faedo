// Importar todas las imágenes
import imagenRuta from '../assets/paseo-faedo.webp';
import imageVisitantes from '../assets/visitantes.webp';
import imageBruja from '../assets/bruja.webp';
import imageDesman from '../assets/desman-iberico.webp';
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
  /** Iconify Phosphor id, e.g. `ph:compass` */
  icon: string;
  backgroundImage?: any;
}

export const allCards: Card[] = [
  {
    id: 'ruta',
    href: '/ruta/faedo-de-cinera',
    title: 'La Ruta',
    description: 'Consejos para disfrutar de tu ruta',
    icon: 'ph:compass',
    backgroundImage: imagenRuta.src
  },
  {
    id: 'historia-naturaleza',
    href: '/historia-naturaleza',
    title: 'Historia y Naturaleza',
    description: 'Conoce de primera mano su entorno',
    icon: 'ph:tree',
    backgroundImage: imageDesman.src
  },
  {
    id: 'guia-visitantes',
    href: '/guia-visitantes',
    title: 'Guía para visitantes',
    description: 'Alojamientos, restaurantes y servicios',
    icon: 'ph:books',
    backgroundImage: imageVisitantes.src
  },
  {
    id: 'haeda',
    href: '/haeda',
    title: 'El cuento de Haeda',
    description: 'Relato popular del Faedo para leer con niños',
    icon: 'ph:book-open',
    backgroundImage: imageBruja.src
  },
  {
    id: 'fagus',
    href: '/haya-fagus',
    title: 'El Haya Fagus',
    description: 'Uno de los 100 más singulares de España',
    icon: 'ph:tree',
    backgroundImage: imageFagus.src
  },
  {
    id: 'flora-fauna',
    href: '/flora-fauna',
    title: 'Flora y Fauna',
    description: 'Biodiversidad completa del bosque y sus alrededores',
    icon: 'ph:bird',
    backgroundImage: imageNutria.src
  },
  {
    id: 'geologia',
    href: '/geologia',
    title: 'Geología',
    description: '400 millones de años de historia en las rocas',
    icon: 'ph:bone',
    backgroundImage: imageGeologia.src
  },
  {
    id: 'puente',
    href: '/ruta/faedo-de-cinera#puente-artesanal',
    title: 'Puente de palos',
    description: 'Construcción histórica utilizada por mineros.',
    icon: 'ph:boat',
    backgroundImage: imagePuente.src
  },
  {
    id: 'marmitas',
    href: '/blog/marmitas-de-gigante',
    title: 'Marmitas de gigante',
    description: 'Piscinas naturales en verano',
    icon: 'ph:drop',
    backgroundImage: imageMarmitas.src
  },
  {
    id: 'bocamina',
    href: '/blog/bocamina-menos-cincuenta',
    title: 'Bocamina "Menos 50"',
    description: 'Entrada rehabilitada por los vecinos.',
    icon: 'ph:hard-hat',
    backgroundImage: imageBocamina.src
  },
  {
    id: 'pozo-ibarra',
    href: '/pozo-ibarra',
    title: 'Pozo Ibarra',
    description: 'Castillete BIC de 1930 y patrimonio minero',
    icon: 'ph:hard-hat',
    backgroundImage: imageMineria.src
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

function normalizePath(path: string): string {
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
