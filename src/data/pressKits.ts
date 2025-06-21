// Kits de prensa del Festival DORA 2025
export interface PressKitAsset {
  id: number;
  title: string;
  description: string;
  type: 'press_kit' | 'branding_kit' | 'logo' | 'document' | 'image';
  format: string;
  fileSize: string;
  downloadUrl: string;
  previewImage: string;
  category: 'main' | 'branding' | 'media' | 'documents';
  isActive: boolean;
}

// Kit de Prensa Principal
export const pressKit: PressKitAsset = {
  id: 1,
  title: "Kit de Prensa DORA 2025",
  description: "Kit completo con gacetillas, imágenes de alta resolución, logos y documentos oficiales del festival",
  type: 'press_kit',
  format: 'ZIP',
  fileSize: '~25 MB',
  downloadUrl: '/downloads/Prensa_kit.zip',
  previewImage: '/assets/images/press-kit-preview.jpg',
  category: 'main',
  isActive: true
};

// Kit de Branding
export const brandingKit: PressKitAsset = {
  id: 2,
  title: "Kit de Branding DORA 2025",
  description: "Logos, tipografías, paleta de colores y guías de uso de la marca Festival DORA",
  type: 'branding_kit',
  format: 'ZIP',
  fileSize: '~8 MB',
  downloadUrl: '/downloads/Branding_kit.zip',
  previewImage: '/assets/images/branding-kit-preview.jpg',
  category: 'branding',
  isActive: true
};

// Logos individuales
export const logoAssets: PressKitAsset[] = [
  {
    id: 3,
    title: "Logo DORA Principal",
    description: "Logo principal del Festival DORA en alta resolución",
    type: 'logo',
    format: 'SVG, PNG',
    fileSize: '2 MB',
    downloadUrl: '/assets/images/logo-dora.png',
    previewImage: '/assets/images/logo-dora.png',
    category: 'branding',
    isActive: true
  },
  {
    id: 4,
    title: "Logo DORA vertical",
    description: "Versión vertical",
    type: 'logo',
    format: 'SVG, PNG',
    fileSize: '1.8 MB',
    downloadUrl: '/assets/images/logo-small.png',
    previewImage: '/assets/images/logo-small.png',
    category: 'branding',
    isActive: true
  }
];

// Documentos oficiales
export const documentAssets: PressKitAsset[] = [
  {
    id: 5,
    title: "Gacetilla de Prensa Oficial",
    description: "Comunicado oficial del Festival DORA 2025",
    type: 'document',
    format: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '/downloads/gacetilla-oficial-dora-2025.pdf',
    previewImage: '/assets/images/document-preview.jpg',
    category: 'documents',
    isActive: true
  },
  {
    id: 6,
    title: "Información del Festival",
    description: "Datos técnicos, lineup y detalles del evento",
    type: 'document',
    format: 'PDF',
    fileSize: '3.5 MB',
    downloadUrl: '/downloads/info-festival-dora-2025.pdf',
    previewImage: '/assets/images/info-preview.jpg',
    category: 'documents',
    isActive: true
  }
];

// Array con todos los assets
export const allPressAssets: PressKitAsset[] = [
  pressKit,
  brandingKit,
  ...logoAssets,
  ...documentAssets
];

// Funciones de utilidad
export const getPressKitAssets = (): PressKitAsset[] => {
  return allPressAssets.filter(asset => asset.type === 'press_kit');
};

export const getBrandingKitAssets = (): PressKitAsset[] => {
  return allPressAssets.filter(asset => asset.type === 'branding_kit');
};

export const getLogoAssets = (): PressKitAsset[] => {
  return allPressAssets.filter(asset => asset.type === 'logo');
};

export const getDocumentAssets = (): PressKitAsset[] => {
  return allPressAssets.filter(asset => asset.type === 'document');
};

export const getAssetsByCategory = (category: 'main' | 'branding' | 'media' | 'documents'): PressKitAsset[] => {
  return allPressAssets.filter(asset => asset.category === category && asset.isActive);
};

export const getAssetById = (id: number): PressKitAsset | undefined => {
  return allPressAssets.find(asset => asset.id === id);
};

// Información del festival para el kit de prensa
export const festivalInfo = {
  name: "Festival DORA 2025",
  subtitle: "Edición Groove",
  date: "2025-07-26",
  location: "Vieja Usina - Paraná, Entre Ríos",
  description: "El festival de música del litoral argentino",
  website: "www.dora.com.ar",
  social: {
    instagram: "@festivaldora",
    facebook: "Festival DORA",
    email: "hornodebarroer@gmail.com"
  },
  stats: {
    artists: "+15",
    stages: "1",
    screens: "18m²",
    attendees: "+300",
    duration: "1 día"
  },
  keyPoints: [
    "Acceso libre y gratuito a parte del predio",
    "Zona premium con abonos disponibles",
    "Más de 20 metros cuadrados de pantallas",
    "Streaming en vivo por Barro VT",
    "Patio de comidas calefaccionado",
    "Zona interior techada con gaseosas"
  ]
};

// Contacto de prensa
export const pressContact = {
  email: "hornodebarroer@gmail.com",
  phone: "5493434056621",
  website: "www.festivaldora.com.ar",
  hours: "Lun-Vie 9:00-18:00"
};