import InteractiveMap from './InteractiveMap';

interface MapaInteractivoProps {
    title?: string;
    address?: string;
}

/**
 * Interactive Map component that renders the festival map with hotspots
 * This is the new interactive version with SVG map and clickable hotspots
 * @param title - Map title (default: "Vieja Usina")
 * @param address - Venue address
 */
export default function MapaInteractivo({ title = "Vieja Usina", address = "San Martín 861, Paraná, Entre Ríos" }: MapaInteractivoProps) {
    return (
        <InteractiveMap 
            title={title}
            address={address}
        />
    );
}