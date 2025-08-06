import InteractiveMap from '../../../components/MapaLegacy/InteractiveMap';
import MapLegend from '../../../components/MapaLegacy/legend/MapLegend';
import styles from './page.module.css';

/**
 * Interactive Map page component that displays the festival map with hotspots
 * Shows SVG map with clickable hotspots and detailed information modals
 */
export default function MapaInteractivoPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1>Mapa Interactivo del Festival</h1>
                    <p>Explora todas las ubicaciones del Festival DORA 2025</p>
                    <p className={styles.mapInstructions}>Haz click en los puntos del mapa para ver información detallada de cada ubicación</p>
                </header>
                
                <InteractiveMap />
                
                <MapLegend />
            </div>
        </div>
    );
}