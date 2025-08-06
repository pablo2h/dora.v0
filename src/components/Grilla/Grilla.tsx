import styles from './Grilla.module.css';
import { schedule, getLocationClassWithStyles, getLocationDisplayName } from '../../data/schedule';

// Functions are now imported from schedule.ts

export default function Schedule() {
    return (
        <div className={styles.scheduleContainer}>
            <h3>Horarios del Evento</h3>
            
            {/* Legend for locations */}
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.escenarioColor}`}></span>
                    <span>Escenario Principal (Interior)</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.exteriorColor}`}></span>
                    <span>Sector Exterior</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.generalColor}`}></span>
                    <span>General</span>
                </div>
            </div>

            <div className={styles.scheduleGrid}>
                <div className={styles.headers}>
                    <span>Hora</span>
                    <span>Actividad</span>
                    <span>Ubicación</span>
                </div>
                {schedule.map((item, index) => (
                    <div key={index} className={`${styles.scheduleRow} ${getLocationClassWithStyles(item.location, styles)}`}>
                        <span className={styles.time}>{item.time}</span>
                        <span className={styles.activity}>
                            {item.activity}
                            {item.artist && <span className={styles.artistName}> - {item.artist}</span>}
                        </span>
                        <span className={styles.location}>{getLocationDisplayName(item.location)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}