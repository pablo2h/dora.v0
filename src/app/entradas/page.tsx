import Tickets from "@/components/Tickets";
import IngresoLibre from '@/components/Tickets/IngresoLibre/IngresoLibre';
import styles from './page.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
import TextBanner from "@/components/AdBanner/TextBanner";
/* import MainSponsors from '@/components/MainSponsors/MainSponsors';
import Kiosko from '@/components/Kiosko/Kiosko'; */

export default function Entradas() {
    return (
        <main className={styles.ticketsPage}>
            <TextBanner />
            <IngresoLibre />
            <AdBanner /> 
            <Tickets />
       {/*  <MainSponsors />
            <Kiosko /> */}
        </main>
    );
}