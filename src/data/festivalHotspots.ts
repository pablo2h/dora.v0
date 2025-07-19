import { MapHotspot, MapConfig } from '../types/map';
import { schedule } from './schedule';
import { artists } from './artists';
import { kioskProducts } from './kiosk';

/**
 * Festival DORA 2025 - Interactive Map Hotspots
 * Coordinates are based on the SVG viewBox: "0 0 1080.000000 1351.000000"
 */
export const festivalHotspots: MapHotspot[] = [
  {
    id: 'escenario-principal',
    name: 'Escenario Principal',
    category: 'stage',
    coordinates: { x: 540, y: 400 }, // Center-top area of the venue
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
    coordinates: { x: 300, y: 350 }, // Left side of main stage
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
    coordinates: { x: 200, y: 600 }, // Lower left area
    info: {
      description: 'Variedad de opciones gastronómicas del festival.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Kansas', 'Moka', 'Don Diego', 'Pochoclos']
    },
    icon: '🍔'
  },
  {
    id: 'kiosco-merchandising',
    name: 'Kiosco y Merchandising',
    category: 'merchandise',
    coordinates: { x: 800, y: 600 }, // Lower right area
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
    coordinates: { x: 540, y: 800 }, // Bottom center
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
    coordinates: { x: 100, y: 400 }, // Left side
    info: {
      description: 'Servicios generales: baños, primeros auxilios, información y puntos de carga.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🚻'
  }
];

/**
 * Map configuration with SVG viewBox and hotspots
 */
export const mapConfig: MapConfig = {
  viewBox: '0 0 1080 1351',
  hotspots: festivalHotspots
};

/**
 * Get hotspots by category
 * @param category - The hotspot category to filter by
 * @returns Array of hotspots matching the category
 */
export const getHotspotsByCategory = (category: MapHotspot['category']): MapHotspot[] => {
  return festivalHotspots.filter(hotspot => hotspot.category === category);
};

/**
 * Get hotspot by ID
 * @param id - The hotspot ID to find
 * @returns The hotspot or undefined if not found
 */
export const getHotspotById = (id: string): MapHotspot | undefined => {
  return festivalHotspots.find(hotspot => hotspot.id === id);
};

/**
 * Get access level display name
 * @param access - The access level
 * @returns Human-readable access level
 */
export const getAccessDisplayName = (access: MapHotspot['info']['access']): string => {
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
export const getCategoryDisplayName = (category: MapHotspot['category']): string => {
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