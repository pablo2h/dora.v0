export interface UnifiedContractV1_Refined {
  slug: string;
  name: string;
  palette: Record<string, string>;
  layout_sections_order: Array<'hero' | 'welcome' | 'artists' | 'decorations' | 'gallery' | 'cta' | 'lineup'>;
  blocks: {
    hero?: {
      title?: string;
      subtitle?: string;
      backgroundImage?: string;
      logoImage?: string;
      ctaText?: string;
      ctaUrl?: string;
    };
    welcome?: {
      title?: string;
      date?: string;
      location?: string;
      logoSrc?: string;
      redirectTo?: string;
    };
    artists?: Array<{
      id: number | string;
      name: string;
      description?: string;
      image?: string;
      instagram?: string;
      spotifyId?: string;
      youtubeId?: string;
    }>;
    lineup?: Array<{
      id: number | string;
      name: string;
      description?: string;
      image?: string;
      instagram?: string;
      spotifyId?: string;
      youtubeId?: string;
    }>;
    decorations?: Array<{
      src: string;
      alt: string;
      position?: 'top' | 'left' | 'right' | 'bottom';
    }>;
    gallery?: string[];
    cta?: {
      text?: string;
      url?: string;
    };
  };
  emptyState?: {
    title?: string;
    message?: string;
    placeholderImage?: string;
  };
}
