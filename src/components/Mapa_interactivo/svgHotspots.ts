// Hotspots basados únicamente en los contenedores interactivos del SVG actualizado
export interface HotspotData {
  id: string;
  containerId?: string;
  name: string;
  category: 'service' | 'food' | 'info' | 'entertainment';
  description: string;
  icon: string;
  coordinates: { x: number; y: number };
  coordinatesMobile: { x: number; y: number }; // Coordenadas específicas para móvil
  accessType: 'free' | 'vip' | 'ticket';
}

export const svgHotspots: HotspotData[] = [
  {
    id: 'zona-descanso-abonados',
    containerId: 'contenedor_zona_descanso_abonados',
    name: 'Zona de Descanso VIP',
    description: 'Área exclusiva de descanso para portadores de abonos con asientos cómodos y sombra.',
    category: 'service',
    icon: '🛋️',
    coordinates: { x: 741.7, y: 593.04 },
    coordinatesMobile: { x: 22.77, y: 477.1 },
    accessType: 'vip'
  },
  {
    id: 'pantalla-abonados',
    containerId: 'contenedor_pantalla_abonados',
    name: 'Pantalla VIP',
    description: 'Pantalla gigante exclusiva para la zona de abonados con la mejor vista del escenario.',
    category: 'entertainment',
    icon: '📺',
    coordinates: { x: 642.66, y: 488.23 },
    coordinatesMobile: { x: 127.58, y: 428.57 },
    accessType: 'vip'
  },
  {
    id: 'pantalla-exterior',
    containerId: 'contenedor_pantalla_exterior_escenario_exterior',
    name: 'Pantalla Exterior',
    description: 'Pantalla gigante para el público general ubicada en el área exterior del festival.',
    category: 'entertainment',
    icon: '📺',
    coordinates: { x: 463.05, y: 657.96 },
    coordinatesMobile: { x: 342.04, y: 412.19 },
    accessType: 'free'
  },
  {
    id: 'baño-exterior',
    containerId: 'contenedor_baño_sectorexterior',
    name: 'Baños Sector Exterior',
    description: 'Servicios sanitarios de acceso libre ubicados en el sector exterior del festival.',
    category: 'service',
    icon: '🚻',
    coordinates: { x: 197.88, y: 554.78 },
    coordinatesMobile: { x: 60.93, y: 516.27 },
    accessType: 'free'
  },
  {
    id: 'baño-vip',
    containerId: 'contenedor_baño_abonados',
    name: 'Baños VIP',
    description: 'Servicios sanitarios exclusivos para portadores de abonos con mayor comodidad.',
    category: 'service',
    icon: '🚻',
    coordinates: { x: 649.91, y: 582.76 },
    coordinatesMobile: { x: 33.05, y: 465.09 },
    accessType: 'vip'
  },
  {
    id: 'zona-descanso-1',
    containerId: 'contenedor_zona_descanso_sectore_exterior_1',
    name: 'Zona de Descanso 1',
    description: 'Primera área de descanso en el sector exterior con bancos y sombra.',
    category: 'service',
    icon: '🪑',
    coordinates: { x: 448.05, y: 731.72 },
    coordinatesMobile: { x: 338.43, y: 283.28 },
    accessType: 'free'
  },
  {
    id: 'zona-descanso-2',
    containerId: 'contenedor-zona_descanso_sectore_exterior_2',
    name: 'Zona de Descanso 2',
    description: 'Segunda área de descanso en el sector exterior con espacios verdes.',
    category: 'service',
    icon: '🪑',
    coordinates: { x: 333.25, y: 720.07 },
    coordinatesMobile: { x: 350.08, y: 295.74 },
    accessType: 'free'
  },
  {
    id: 'informacion-acreditacion',
    containerId: 'contenedor._informaciom_acreditacion',
    name: 'Información y Acreditación',
    description: 'Punto de información general y acreditación para prensa y personal autorizado.',
    category: 'info',
    icon: 'ℹ️',
    coordinates: { x: 801.26, y: 710.75 },
    coordinatesMobile: { x: 359.4, y: 214.55 },
    accessType: 'free'
  },
  {
    id: 'puesto-cafeteria',
    containerId: 'contenedor_puesto_gastronomico',
    name: 'Cafetería',
    description: 'Puesto de cafetería con bebidas calientes, frías y snacks ligeros.',
    category: 'food',
    icon: '☕',
    coordinates: { x: 149.76, y: 695.5 },
    coordinatesMobile: { x: 374.69, y: 466.05 },
    accessType: 'free'
  },
  {
    id: 'puesto-hamburguesas',
    containerId: 'contenedor_puesto_gastronomico-2',
    name: 'Hamburguesas',
    description: 'Puesto gastronómico especializado en hamburguesas gourmet y papas fritas.',
    category: 'food',
    icon: '🍔',
    coordinates: { x: 203.09, y: 709.91 },
    coordinatesMobile: { x: 360.24, y: 412.72 },
    accessType: 'free'
  },
  {
    id: 'punto-interactivo-1',
    containerId: 'contenedor_puesto_interactivo',
    name: 'Punto Interactivo 1',
    description: 'Estación interactiva con juegos y actividades para toda la familia.',
    category: 'entertainment',
    icon: '🎮',
    coordinates: { x: 685.28, y: 721.44 },
    coordinatesMobile: { x: 348.73, y: 230.72 },
    accessType: 'free'
  },
  {
    id: 'punto-interactivo-2',
    containerId: 'contenedor_puesto_interactivo-2',
    name: 'Punto Interactivo 2',
    description: 'Segunda estación interactiva con experiencias digitales y realidad aumentada.',
    category: 'entertainment',
    icon: '🎮',
    coordinates: { x: 794.7, y: 525.76 },
    coordinatesMobile: { x: 90.05, y: 275.85 },
    accessType: 'free'
  },
  {
    id: 'punto-interactivo-3',
    containerId: 'contenedor_puesto_interactivo-3',
    name: 'Punto Interactivo 3',
    description: 'Tercera estación interactiva con actividades educativas y culturales.',
    category: 'entertainment',
    icon: '🎮',
    coordinates: { x: 707.96, y: 396.37 },
    coordinatesMobile: { x: 219.44, y: 308.04 },
    accessType: 'free'
  },
  {
    id: 'barra-bebidas',
    containerId: 'contenedor_barra',
    name: 'Barra de Bebidas',
    description: 'Barra principal con amplia variedad de bebidas alcohólicas y sin alcohol.',
    category: 'food',
    icon: '🍺',
    coordinates: { x: 540.77, y: 649.93 },
    coordinatesMobile: { x: 265.24, y: 420.22 },
    accessType: 'free'
  },
  {
    id: 'puesto-pochoclos',
    containerId: 'contenedor_puesto_gastronomico-3',
    name: 'Pochoclos',
    description: 'Puesto de pochoclos dulces y salados, ideal para disfrutar durante los shows.',
    category: 'food',
    icon: '🍿',
    coordinates: { x: 257.97, y: 717.06 },
    coordinatesMobile: { x: 352.91, y: 358.03 },
    accessType: 'free'
  },
  {
    id: 'puesto-pizza',
    containerId: 'v-6',
    name: 'Pizza',
    description: 'Puesto de pizzas artesanales con variedad de sabores y ingredientes frescos.',
    category: 'food',
    icon: '🍕',
    coordinates: { x: 116.06, y: 309.32 },
    coordinatesMobile: { x: 506.49, y: 499.75 },
    accessType: 'free'
  },
  {
    id: 'sector-abonados-salon',
    containerId: 'contenedor_abonados_1',
    name: 'Sector Abonados - Salón',
    description: 'Área VIP tipo salón con servicios premium y vista privilegiada.',
    category: 'service',
    icon: '👑',
    coordinates: { x: 724.53, y: 488.23 },
    coordinatesMobile: { x: 127.58, y: 345.47 },
    accessType: 'vip'
  },
  {
    id: 'sector-abonados-escenario',
    containerId: 'Contenedor_abonados_2',
    name: 'Sector Abonados - Escenario',
    description: 'Zona VIP frente al escenario principal con acceso preferencial.',
    category: 'service',
    icon: '👑',
    coordinates: { x: 415.49, y: 547.73 },
    coordinatesMobile: { x: 68.42, y: 454.51 },
    accessType: 'vip'
  },
  {
    id: 'escenario-interior',
    containerId: 'contenedor_escenario',
    name: 'Escenario Interior',
    description: 'Escenario secundario para presentaciones íntimas y actividades especiales.',
    category: 'entertainment',
    icon: '🎤',
    coordinates: { x: 551.65, y: 536.64 },
    coordinatesMobile: { x: 79.01, y: 464.16 },
    accessType: 'ticket'
  }
];

// Funciones utilitarias
export const getHotspotById = (id: string): HotspotData | undefined => {
  return svgHotspots.find(hotspot => hotspot.id === id);
};

export const getHotspotsByCategory = (category: HotspotData['category']): HotspotData[] => {
  return svgHotspots.filter(hotspot => hotspot.category === category);
};

// Función para obtener todas las categorías disponibles
export const getAvailableCategories = (): HotspotData['category'][] => {
  return Array.from(new Set(svgHotspots.map(hotspot => hotspot.category)));
};

// Función para obtener el nombre de categoría en español
export const getCategoryDisplayName = (category: HotspotData['category']): string => {
  switch (category) {
    case 'service':
      return 'Servicio';
    case 'food':
      return 'Gastronomía';
    case 'info':
      return 'Información';
    case 'entertainment':
      return 'Entretenimiento';
    default:
      return category;
  }
};

// Función para obtener las coordenadas correctas según el dispositivo
export const getHotspotCoordinates = (hotspot: HotspotData, isMobile: boolean): { x: number; y: number } => {
  return isMobile ? hotspot.coordinatesMobile : hotspot.coordinates;
};