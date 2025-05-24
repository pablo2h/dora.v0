import Mapa from '@/components/Mapa/Mapa';
import Grilla from '@/components/Grilla/Grilla';
import ObjetosPermitidos from '@/components/ObjetosPermitidos/ObjetosPermitidos';
import styles from './info.module.css';
import Flyer from "@/components/Flyer";

export default function Info() {
    return (
        <main className={styles.infoPage}>
            <h1>Información Festival Dora</h1>
            
            <div className={styles.infoGrid}>
                <section className={styles.mapSection}>
                    <Mapa />
                </section>

                <section className={styles.grillaSection}>
                    <Grilla />
                </section>

                <section className={styles.objetosSection}>
                    <ObjetosPermitidos />
                </section>
                <section className={styles.flyerSection}>
                    <Flyer />
                </section>
            </div>
        </main>
    );
}