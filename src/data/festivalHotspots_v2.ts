import { schedule } from './schedule';
import { artists } from './artists';
import { kioskProducts } from './kiosk';

/**
 * Festival DORA 2025 - Interactive Map Hotspots Data (Version 2)
 * This version contains only the essential data without coordinates
 */

export interface HotspotInfo {
  description: string;
  schedule: string;
  access: 'free' | 'ticket' | 'vip';
  artists?: string[];
  products?: string[];
}

export interface FestivalHotspot {
  id: string;
  name: string;
  category: 'stage' | 'food' | 'service' | 'vip' | 'merchandise' | 'screen';
  info: HotspotInfo;
  icon: string;
}

export const festivalHotspots_v2: FestivalHotspot[] = [
  {
    id: 'escenario-principal',
    name: 'Escenario Principal',
    category: 'stage',
    info: {
      description: 'Escenario principal del Festival DORA 2025. Aquí se presentarán los artistas principales del evento.',
      schedule: 'Zacaro y los Puerkos (18:00hs), La Tercera Fase del Plan (19:30hs), Rosario Smowing (20:45hs)',
      access: 'ticket',
      artists: ['Rosario Smowing', 'La Tercera Fase del Plan', 'Zacaro y los Puerkos']
    },
    icon: '🎤'
  },
  {
    id: 'zona-vip',
    name: 'Zona VIP',
    category: 'vip',
    info: {
      description: 'Área techada exclusiva para abonados con servicios premium y mejor vista del escenario.',
      schedule: 'Acceso durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '👑'
  },
  {
    id: 'puestos-comida',
    name: 'Puestos de Comida',
    category: 'food',
    info: {
      description: 'Variedad de opciones gastronómicas del festival.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Kansas', 'Moka', 'Don Diego', 'Pochoclos']
    },
    icon: '🍔'
  },
  {
    id: 'puesto-pizza',
    name: 'Puesto de Pizza',
    category: 'food',
    info: {
      description: 'Deliciosas pizzas artesanales recién horneadas.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Pizza Margherita', 'Pizza Pepperoni', 'Pizza Vegetariana', 'Pizza Especial']
    },
    icon: '🍕'
  },
  {
    id: 'kiosco-merchandising',
    name: 'Kiosco y Merchandising',
    category: 'merchandise',
    info: {
      description: 'Kiosco oficial del festival con bebidas, snacks y merchandising exclusivo.',
      schedule: 'Abierto durante todo el evento (17:00hs - 22:45hs)',
      access: 'free',
      products: [
        'Agua Nuestra ($1.499)',
        'Fernet Branca ($6.999)',
        'Gin Herederos ($6.499)',
        'Maní Julicroc ($1.499)',
        'Anillos de Maíz ($1.699)',
        'Papas Fritas ($2.999)'
      ]
    },
    icon: '🛍️'
  },
  {
    id: 'zona-pantallas',
    name: 'Zona de Pantallas Exteriores',
    category: 'screen',
    info: {
      description: 'Área de descanso con transmisión en vivo del escenario principal y presentaciones exteriores.',
      schedule: 'Stand Up Comedy Litoral (19:00hs), Presentación de JOA (20:15hs)',
      access: 'free',
      artists: ['Stand Up Comedy Litoral', 'Joa Atencio']
    },
    icon: '📺'
  },
  {
    id: 'servicios',
    name: 'Servicios',
    category: 'service',
    info: {
      description: 'Servicios generales: baños, primeros auxilios, información y puntos de carga.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🚻'
  }
];

/**
 * Get hotspots by category
 * @param category - The hotspot category to filter by
 * @returns Array of hotspots matching the category
 */
export const getHotspotsByCategory = (category: FestivalHotspot['category']): FestivalHotspot[] => {
  return festivalHotspots_v2.filter(hotspot => hotspot.category === category);
};

/**
 * Get hotspot by ID
 * @param id - The hotspot ID to find
 * @returns The hotspot or undefined if not found
 */
export const getHotspotById = (id: string): FestivalHotspot | undefined => {
  return festivalHotspots_v2.find(hotspot => hotspot.id === id);
};

/**
 * Get access level display name
 * @param access - The access level
 * @returns Human-readable access level
 */
export const getAccessDisplayName = (access: FestivalHotspot['info']['access']): string => {
  switch (access) {
    case 'free':
      return 'Acceso Libre';
    case 'ticket':
      return 'Requiere Entrada';
    case 'vip':
      return 'Solo Abonados';
    default:
      return 'Acceso Libre';
  }
};

/**
 * Get category display name
 * @param category - The hotspot category
 * @returns Human-readable category name
 */
export const getCategoryDisplayName = (category: FestivalHotspot['category']): string => {
  switch (category) {
    case 'stage':
      return 'Escenario';
    case 'food':
      return 'Comida';
    case 'service':
      return 'Servicios';
    case 'vip':
      return 'VIP';
    case 'merchandise':
      return 'Merchandising';
    case 'screen':
      return 'Pantallas';
    default:
      return 'General';
  }
};