// Export all interactive map-related components for easy importing
export { default as MapaInteractivo } from './MapaInteractivo';
export { default as InteractiveMap } from './InteractiveMap';
export { default as MapHotspot } from './MapHotspot';
export { default as HotspotModal } from './HotspotModal';

// Export types
export type { MapHotspot as MapHotspotType, MapConfig, HotspotModalProps, MapHotspotProps, InteractiveMapProps } from '../../types/map';

// Export data utilities
export { festivalHotspots, mapConfig, getHotspotsByCategory, getHotspotById, getAccessDisplayName, getCategoryDisplayName } from '../../data/festivalHotspots';