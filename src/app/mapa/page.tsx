import Map from '../../components/Mapa/Mapa';
import InteractiveMap from '../../components/MapaLegacy/InteractiveMap';
import MapLegend from '../../components/MapaLegacy/legend/MapLegend';
import styles from './page.module.css';

/**
 * Map page component that displays the venue location
 * Shows Google Maps iframe with festival location information
 */
export default function MapaPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1>Mapa del Festival</h1>
                    <p>Explora el mapa interactivo y encuentra la ubicación del festival</p>
                </header>
                
                {/* Interactive Festival Map Section */}
                <section className={styles.interactiveSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Mapa Interactivo del Festival</h2>
                        <p>Haz clic en los puntos naranjas para ver información detallada</p>
                    </div>
                    <InteractiveMap />
                    <MapLegend />
                </section>
                
                {/* Festival Location Section */}
                <section className={styles.locationSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Ubicación del Festival</h2>
                        <p>Centro Cultural La Vieja Usina</p>
                    </div>
                    <Map 
                        title="Festival DORA 2025"
                        address="San Martín 861, Paraná, Entre Ríos"
                    />
                </section>
                
                <div className={styles.info}>
                    <h2>Información Adicional</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3>🚗 Estacionamiento</h3>
                            <p>Disponible en las calles aledañas al centro cultural</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>🚌 Transporte Público</h3>
                            <p>Líneas de colectivo que pasan cerca del venue</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>♿ Accesibilidad</h3>
                            <p>El venue cuenta con acceso para personas con movilidad reducida</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}