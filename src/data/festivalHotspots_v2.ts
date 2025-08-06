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
    name: 'Puesto Interactuable 1',
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
  },
  {
    id: 'puesto_hamburgesas',
    name: 'Puesto de Hamburguesas',
    category: 'food',
    info: {
      description: 'Deliciosas hamburguesas gourmet con ingredientes frescos y papas fritas.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Hamburguesa Clásica', 'Hamburguesa Doble', 'Hamburguesa Vegetariana', 'Papas Fritas']
    },
    icon: '🍔'
  },
  {
    id: 'informacion_acreeditacion',
    name: 'Puesto de Información',
    category: 'service',
    info: {
      description: 'Punto de información general del festival y acreditación para prensa y personal autorizado.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: 'ℹ️'
  },
  {
    id: 'barra',
    name: 'Barra de Bebidas',
    category: 'food',
    info: {
      description: 'Barra principal con amplia variedad de bebidas alcohólicas y sin alcohol.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Cerveza Artesanal', 'Fernet', 'Gin Tonic', 'Bebidas Sin Alcohol', 'Tragos Especiales']
    },
    icon: '🍺'
  },
  {
    id: 'puesto_cafeteria',
    name: 'Cafetería',
    category: 'food',
    info: {
      description: 'Puesto de cafetería con bebidas calientes, frías y snacks ligeros.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Café Espresso', 'Cappuccino', 'Té', 'Chocolate Caliente', 'Medialunas', 'Cookies']
    },
    icon: '☕'
  },
  {
    id: 'pueso_pochoclos',
    name: 'Puesto de Pochoclos',
    category: 'food',
    info: {
      description: 'Pochoclos dulces y salados, ideal para disfrutar durante los shows.',
      schedule: 'Abierto durante todo el evento (17:00hs - 23:00hs)',
      access: 'free',
      products: ['Pochoclos Dulces', 'Pochoclos Salados', 'Pochoclos Caramelo', 'Pochoclos Queso']
    },
    icon: '🍿'
  },
  {
    id: 'sector_abonados_salon',
    name: 'Sector Abonados - Salón',
    category: 'vip',
    info: {
      description: 'Área VIP tipo salón con servicios premium y vista privilegiada del escenario.',
      schedule: 'Acceso durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '👑'
  },
  {
    id: 'sector_abonados_escenarios',
    name: 'Sector Abonados - Escenario',
    category: 'vip',
    info: {
      description: 'Zona VIP frente al escenario principal con acceso preferencial.',
      schedule: 'Acceso durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '👑'
  },
  {
    id: 'escenario_interior',
    name: 'Escenario Interior',
    category: 'stage',
    info: {
      description: 'Escenario secundario para presentaciones íntimas y actividades especiales.',
      schedule: 'Presentaciones especiales (18:30hs - 22:00hs)',
      access: 'ticket',
      artists: ['Artistas Invitados', 'Presentaciones Acústicas']
    },
    icon: '🎤'
  },
  {
    id: 'baño_sectorexterior',
    name: 'Baños Sector Exterior',
    category: 'service',
    info: {
      description: 'Servicios sanitarios de acceso libre ubicados en el sector exterior del festival.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🚻'
  },
  {
    id: 'baño_abonados',
    name: 'Baños VIP',
    category: 'service',
    info: {
      description: 'Servicios sanitarios exclusivos para portadores de abonos con mayor comodidad.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '🚻'
  },
  {
    id: 'zona_descanso_abonados',
    name: 'Zona de Descanso VIP',
    category: 'service',
    info: {
      description: 'Área exclusiva de descanso para portadores de abonos con asientos cómodos y sombra.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '🛋️'
  },
  {
    id: 'zona_descanso_sectore_exterior_1',
    name: 'Zona de Descanso 1',
    category: 'service',
    info: {
      description: 'Primera área de descanso en el sector exterior con bancos y sombra.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🪑'
  },
  {
    id: 'zona_descanso_sectore_exterior_2',
    name: 'Zona de Descanso 2',
    category: 'service',
    info: {
      description: 'Segunda área de descanso en el sector exterior con espacios verdes.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🪑'
  },
  {
    id: 'pantalla_abonados',
    name: 'Pantalla Interior VIP',
    category: 'screen',
    info: {
      description: 'Pantalla gigante exclusiva para la zona de abonados con la mejor vista del escenario.',
      schedule: 'Transmisión en vivo durante todo el evento (17:00hs - 23:00hs)',
      access: 'vip'
    },
    icon: '📺'
  },
  {
    id: 'punto_interactivo_1',
    name: 'Punto Interactivo 1',
    category: 'service',
    info: {
      description: 'Estación interactiva con juegos y actividades para toda la familia.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🎮'
  },
  {
    id: 'punto_interactivo_2',
    name: 'Punto Interactivo 2',
    category: 'service',
    info: {
      description: 'Segunda estación interactiva con experiencias digitales y realidad aumentada.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🎮'
  },
  {
    id: 'punto_interactivo_3',
    name: 'Punto Interactivo 3',
    category: 'service',
    info: {
      description: 'Tercera estación interactiva con actividades educativas y culturales.',
      schedule: 'Disponible durante todo el evento (17:00hs - 23:00hs)',
      access: 'free'
    },
    icon: '🎮'
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