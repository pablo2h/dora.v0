import Map from '../../components/Mapa/Mapa';
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
                    <h1>Ubicación del Festival</h1>
                    <p>Encuentra el Centro Cultural La Vieja Usina</p>
                </header>
                
                <Map 
                    title="Festival DORA 2025"
                    address="San Martín 861, Paraná, Entre Ríos"
                />
                
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