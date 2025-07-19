import InteractiveMap from './InteractiveMap';

interface MapProps {
    title?: string;
    address?: string;
}

/**
 * Main Map component that renders the interactive festival map
 * Replaces the previous Google Maps iframe with an interactive SVG map
 * @param title - Map title (default: "Vieja Usina")
 * @param address - Venue address
 */
export default function Map({ title = "Vieja Usina", address = "San Martín 861, Paraná, Entre Ríos" }: MapProps) {
    return (
        <InteractiveMap 
            title={title}
            address={address}
        />
    );
}