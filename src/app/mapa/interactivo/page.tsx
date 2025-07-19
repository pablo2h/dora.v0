import { MapaInteractivo } from '../../../components/MapaLegacy';
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
                </header>
                
                <MapaInteractivo 
                    title="Festival DORA 2025 - Mapa Interactivo"
                    address="San Martín 861, Paraná, Entre Ríos"
                />
                
                <div className={styles.info}>
                    <h2>Cómo usar el mapa</h2>
                    <div className={styles.instructions}>
                        <div className={styles.instructionCard}>
                            <h3>🎯 Hotspots</h3>
                            <p>Haz click en los puntos del mapa para ver información detallada de cada ubicación</p>
                        </div>
                        <div className={styles.instructionCard}>
                            <h3>🎵 Escenarios</h3>
                            <p>Encuentra información sobre artistas y horarios de presentaciones</p>
                        </div>
                        <div className={styles.instructionCard}>
                            <h3>🍔 Gastronomía</h3>
                            <p>Descubre todos los puestos de comida y sus especialidades</p>
                        </div>
                        <div className={styles.instructionCard}>
                            <h3>👑 Zonas VIP</h3>
                            <p>Ubicaciones exclusivas para abonados del festival</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}