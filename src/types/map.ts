// TypeScript interfaces for the interactive map system

export interface MapHotspot {
  id: string;
  name: string;
  category: 'stage' | 'food' | 'service' | 'vip' | 'merchandise' | 'screen';
  coordinates: { x: number; y: number }; // Coordinates in the SVG
  info: {
    description: string;
    schedule?: string;
    prices?: string[];
    access: 'free' | 'ticket' | 'vip';
    artists?: string[]; // Only for stage
    products?: string[]; // Only for food/merchandise
  };
  icon: string; // Emoji or icon class
}

export interface MapConfig {
  viewBox: string;
  hotspots: MapHotspot[];
}

export interface HotspotModalProps {
  hotspot: MapHotspot | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface MapHotspotProps {
  hotspot: MapHotspot;
  onClick: (hotspot: MapHotspot) => void;
  isActive?: boolean;
}

export interface InteractiveMapProps {
  title?: string;
  address?: string;
  className?: string;
}