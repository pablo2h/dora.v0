// Datos de elementos de prensa y descargas
export interface PressAsset {
  id: number;
  title: string;
  description: string;
  type: 'image' | 'document' | 'logo' | 'kit';
  downloadUrl: string;
  previewImage: string;
  fileSize?: string;
  format?: string;
}

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

// Imágenes para el carrusel
export const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "/assets/images/dora-logo-main.jpg",
    alt: "Logo principal DORA Festival",
    title: "Logo Principal"
  },
  {
    id: 2,
    src: "/assets/images/dora-festival-banner.jpg",
    alt: "Banner oficial del festival",
    title: "Banner Oficial"
  },
  {
    id: 3,
    src: "/assets/images/dora-artists-collage.jpg",
    alt: "Collage de artistas participantes",
    title: "Artistas 2024"
  },
  {
    id: 4,
    src: "/assets/images/dora-venue-vieja-usina.jpg",
    alt: "Vieja Usina - Venue del festival",
    title: "Venue Oficial"
  },
  {
    id: 5,
    src: "/assets/images/dora-festival-atmosphere.jpg",
    alt: "Ambiente del festival",
    title: "Experiencia DORA"
  }
];

// Elementos de descarga
export const pressAssets: PressAsset[] = [
  {
    id: 1,
    title: "Kit de Prensa Completo",
    description: "Paquete completo con toda la información del festival, logos, imágenes y gacetilla de prensa.",
    type: "kit",
    downloadUrl: "/downloads/dora-press-kit.zip",
    previewImage: "/assets/images/press-kit-preview.jpg",
    fileSize: "15.2 MB",
    format: "ZIP"
  },
  {
    id: 2,
    title: "Dossier del Festival",
    description: "Documento oficial con información detallada sobre el Festival DORA 2024.",
    type: "document",
    downloadUrl: "/downloads/dora-dossier.pdf",
    previewImage: "/assets/images/dossier-preview.jpg",
    fileSize: "3.8 MB",
    format: "PDF"
  },
  {
    id: 3,
    title: "Pack de Logos",
    description: "Colección completa de logos del festival en diferentes formatos y resoluciones.",
    type: "logo",
    downloadUrl: "/downloads/dora-logos.zip",
    previewImage: "/assets/images/logos-preview.jpg",
    fileSize: "8.5 MB",
    format: "ZIP"
  },
  {
    id: 4,
    title: "Flyer Oficial",
    description: "Flyer promocional del festival en alta resolución para medios impresos.",
    type: "image",
    downloadUrl: "/assets/images/dora-flyer-hd.jpg",
    previewImage: "/assets/images/flyer-preview.jpg",
    fileSize: "2.1 MB",
    format: "JPG"
  }
];

// Gacetilla de prensa por defecto
export const defaultPressRelease = {
  title: "Festival DORA 2025 - Gacetilla de Prensa",
  subtitle: "Una nueva experiencia musical llega a Paraná, Entre Ríos",
  date: "2025-07-26",
  location: "Vieja Usina - Paraná, Entre Ríos",
  content: `**FESTIVAL DORA 2025**
**Una nueva experiencia musical llega a Paraná, Entre Ríos**

**FECHA Y HORARIO:**
Sábado 26 de Julio de 2024
De 18:00 a 23:00 horas

**UBICACIÓN:**
Vieja Usina - Paraná, Entre Ríos
Acceso libre al predio general

**SOBRE EL FESTIVAL:**
El Festival DORA se presenta como una propuesta cultural innovadora que combina música en vivo, gastronomía local y entretenimiento familiar en el corazón de Paraná. La primera edición promete ser una experiencia única que conecta a la comunidad a través de la música y la cultura.

**LINEUP CONFIRMADO:**
• Rosario Smowing - Swing, Ska, Rock, Crooner
• La Tercera Fase del Plan - Rock, Surf, Energía Joven
• Zacaro y los Puerkos - Propuesta Teatral y Energética
• Shows sorpresa por confirmar

**SERVICIOS Y COMODIDADES:**
• Patio de comidas techado con estufas
• Foodtrucks con variedad gastronómica
• Barra de bebidas y tragos
• Pantallas LED para mejor visualización
• Zona de juegos y entretenimiento
• Sector VIP techado (con abono)
• Baños y servicios completos
• Estacionamiento disponible

**MODALIDADES DE ACCESO:**
• **Entrada Libre:** Acceso al predio general, patio de comidas, pantallas, foodtrucks, barra, juegos y baños
• **Abonos VIP:** Acceso al escenario principal, sector interior techado, zona de juegos exclusiva, sorteos y promociones especiales

**INFORMACIÓN DE CONTACTO:**
Web: www.dora.com.ar
Email: info@dora.com.ar
Redes Sociales: @DoraFestival

**PARA MEDIOS:**
Material gráfico, entrevistas y acreditaciones disponibles.
Contacto de prensa: prensa@dora.com.ar

---

El Festival DORA es una iniciativa que busca posicionar a Paraná como un referente cultural en la región, ofreciendo una plataforma para artistas locales y nacionales, y generando un espacio de encuentro para toda la comunidad.`
};

// Función para obtener elementos por tipo
export const getAssetsByType = (type: PressAsset['type']): PressAsset[] => {
  return pressAssets.filter(asset => asset.type === type);
};

// Función para obtener un elemento por ID
export const getAssetById = (id: number): PressAsset | undefined => {
  return pressAssets.find(asset => asset.id === id);
};