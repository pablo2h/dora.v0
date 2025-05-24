import styles from './Grilla.module.css';

const schedule = [
    { time: "18:00hs", activity: "Apertura de puertas" },
    { time: "18:15hs", activity: "DJ" },
    { time: "19:30hs", activity: "Saccreblue" },
    { time: "20:15hs", activity: "Sacaro y los puercos" },
    { time: "21:00hs", activity: "Jam de Jazz" },
    { time: "22:15hs", activity: "Rosario Smowing" },
    { time: "23:30hs", activity: "Cierre del evento" }
];

export default function Schedule() {
    return (
        <div className={styles.scheduleContainer}>
            <h3>Horarios del Evento</h3>
            <div className={styles.scheduleGrid}>
                <div className={styles.headers}>
                    <span>Hora</span>
                    <span>Actividad</span>
                </div>
                {schedule.map((item, index) => (
                    <div key={index} className={styles.scheduleRow}>
                        <span className={styles.time}>{item.time}</span>
                        <span className={styles.activity}>{item.activity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}