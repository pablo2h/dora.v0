// Datos de planes de patrocinio del Festival DORA 2025

export interface SponsorshipPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  discountPrice?: string;
  features: string[];
  highlighted?: boolean;
  category: 'individual' | 'festival' | 'physical' | 'digital' | 'additional';
}

export interface AdditionalService {
  title: string;
  price: string;
  discountPrice: string;
  features: string[];
}

export interface SponsorshipCategory {
  id: string;
  name: string;
}

// Datos de planes de patrocinio del Festival DORA 2025

export interface SponsorshipPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  discountPrice?: string;
  features: string[];
  highlighted?: boolean;
  category: 'individual' | 'festival' | 'physical' | 'digital' | 'additional';
}

export interface AdditionalService {
  title: string;
  price: string;
  discountPrice: string;
  features: string[];
}

export interface SponsorshipCategory {
  id: string;
  name: string;
}

// Planes de patrocinio principales
export const sponsorshipPlans: SponsorshipPlan[] = [
  {
    id: 'individual',
    title: 'Sponsor Individual',
    description: 'Visibilidad directa durante el evento',
    price: '$100.000 ARS',
    discountPrice: '$80.000 ARS',
    category: 'individual',
    features: [
      'Logo en pantallas del evento',
      'Segmentación por rubro',
      'Personalización con audio propio',
      'Rotación constante durante el evento'
    ]
  },
  // Servicios adicionales convertidos a planes individuales
  {
    id: 'streaming',
    title: 'Publicidad Streaming',
    description: 'Presencia en transmisión en vivo',
    price: '$10.000 ARS',
    discountPrice: '$8.000 ARS',
    category: 'individual',
    features: [
      'Logo en transmisión en vivo',
      'Audio publicitario',
      'Rotación cada 30 segundos'
    ]
  },
  {
    id: 'website',
    title: 'Publicidad Website',
    description: 'Presencia digital en sitio web',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    category: 'individual',
    features: [
      'Logo en sección sponsors',
      'Banners web',
      'Formatos optimizados'
    ]
  },
  {
    id: 'rrss',
    title: 'Publicidad RRSS',
    description: 'Presencia en redes sociales',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    category: 'individual',
    features: [
      'Publicación exclusiva',
      'Diseño profesional',
      'Alcance orgánico'
    ]
  },
  {
    id: 'video-accion',
    title: 'Video Acción Marca',
    description: 'Contenido audiovisual personalizado',
    price: '$70.000 ARS',
    discountPrice: '$56.000 ARS',
    category: 'individual',
    features: [
      'Desarrollo de acción publicitaria',
      'Grabación profesional',
      'Publicación en RRSS'
    ]
  },
  {
    id: 'oro',
    title: 'Categoría Oro',
    description: 'Acompañamiento integral completo',
    price: '$500.000 ARS',
    discountPrice: '$400.000 ARS',
    category: 'festival',
    highlighted: true,
    features: [
      'Presencia completa (previa, durante y post-evento)',
      'Inclusión en flyer físico',
      'Contenido audiovisual en YouTube',
      'Espacio web dedicado',
      'Acompañamiento en Instagram',
      'Presentación oral en streaming',
      'Visibilidad extendida hasta noviembre 2025'
    ]
  },
  {
    id: 'rio',
    title: 'Categoría Río',
    description: 'Presencia destacada en el festival',
    price: '$250.000 ARS',
    discountPrice: '$200.000 ARS',
    category: 'festival',
    features: [
      'Logos en tandas durante el evento',
      'Locución publicitaria en vivo',
      'Campaña de redes sociales',
      'Logo en la web oficial',
      'Presentación oral en streaming',
      'Visibilidad extendida hasta noviembre 2025'
    ]
  },
  {
    id: 'stands',
    title: 'Stands Exclusivos',
    description: 'Presencia física en la plaza',
    price: '$250.000 ARS',
    discountPrice: '$200.000 ARS',
    category: 'physical',
    features: [
      'Puesto o stand interactivo en la plaza',
      'Logo en la web oficial',
      'Post dedicado en redes sociales',
      'Coordinación directa personalizada',
      'Interacción directa con el público'
    ]
  },
  {
    id: 'shows',
    title: 'Patrocinio de Shows',
    description: 'Asociación directa con artistas',
    price: '$180.000 ARS',
    discountPrice: '$144.000 ARS',
    category: 'physical',
    features: [
      'Presentación exclusiva de show específico',
      'Visibilidad preferencial en pantallas',
      'Co-presentación en post-producción',
      'Asociación de imagen con cultura y música',
      'Videos individuales co-presentados'
    ]
  },
  {
    id: 'digital',
    title: 'Sponsor Digital',
    description: 'Presencia exclusivamente online',
    price: '$150.000 ARS',
    discountPrice: '$120.000 ARS',
    category: 'digital',
    features: [
      'Logo en sección de sponsors web',
      'Banners en secciones clave',
      'Publicación dedicada en RRSS',
      'Publicación colaborativa con Ads',
      'Video acción con la marca',
      'Permanencia digital hasta septiembre'
    ]
  }
];

// Servicios adicionales para sponsors individuales
export const additionalServices: AdditionalService[] = [
  {
    title: 'Publicidad Streaming',
    price: '$10.000 ARS',
    discountPrice: '$8.000 ARS',
    features: ['Logo en transmisión en vivo', 'Audio publicitario', 'Rotación cada 30 segundos']
  },
  {
    title: 'Publicidad Website',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    features: ['Logo en sección sponsors', 'Banners web', 'Formatos optimizados']
  },
  {
    title: 'Publicidad RRSS',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    features: ['Publicación exclusiva', 'Diseño profesional', 'Alcance orgánico']
  },
  {
    title: 'Video Acción Marca',
    price: '$70.000 ARS',
    discountPrice: '$56.000 ARS',
    features: ['Desarrollo de acción publicitaria', 'Grabación profesional', 'Publicación en RRSS']
  }
];

// Categorías de filtrado
export const sponsorshipCategories: SponsorshipCategory[] = [
  { id: 'festival', name: 'Sponsors del Festival' },
  { id: 'individual', name: 'Sponsors Individuales' },
  { id: 'physical', name: 'Presencia Física' },
  { id: 'digital', name: 'Solo Digital' },
  { id: 'all', name: 'Todos los Planes' }
];

// Funciones de utilidad
export const getSponsorshipPlansByCategory = (category: string): SponsorshipPlan[] => {
  if (category === 'all') {
    return sponsorshipPlans;
  }
  return sponsorshipPlans.filter(plan => plan.category === category);
};

export const getSponsorshipPlanById = (id: string): SponsorshipPlan | undefined => {
  return sponsorshipPlans.find(plan => plan.id === id);
};

export const getHighlightedPlans = (): SponsorshipPlan[] => {
  return sponsorshipPlans.filter(plan => plan.highlighted);
};

export const sortPlansByCategory = (plans: SponsorshipPlan[]): SponsorshipPlan[] => {
  return [...plans].sort((a, b) => {
    if (a.category === 'festival' && b.category !== 'festival') return -1;
    if (a.category !== 'festival' && b.category === 'festival') return 1;
    return 0;
  });
};

// Información de modalidades de pago
export const paymentOptions = [
  {
    title: 'Pago Único',
    discount: '15% de descuento',
    methods: 'Transferencia, cripto',
    icon: '💰'
  },
  {
    title: 'Pago en 2 cuotas',
    discount: '10% de descuento',
    methods: 'Transferencia',
    icon: '💳'
  },
  {
    title: 'Pago en 3 cuotas',
    discount: '5% de descuento',
    methods: 'Transferencia',
    icon: '📅'
  },
  {
    title: 'Pago estándar',
    discount: 'Sin descuento',
    methods: 'Todas las modalidades',
    icon: '🏦'
  }
];

// Información de contacto para sponsors
export const sponsorContact = {
  email: 'comercial@dora.com.ar',
  phone: '+54 9 343 405-6621',
  website: 'www.dora.com.ar/sponsors',
  deadline: '26 de Julio 2025'
};