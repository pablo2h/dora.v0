'use client';
import Image from 'next/image';
import Tickets from "@/components/Tickets";
import IngresoLibre from '@/components/Tickets/IngresoLibre/IngresoLibre';
import styles from './page.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
import MainSponsors from '@/components/MainSponsors/MainSponsors';
import Kiosko from '@/components/Kiosko/Kiosko';

export default function Entradas() {
    return (
        <main className={styles.ticketsPage}>
            <IngresoLibre />
            <AdBanner /> 
            <div className={styles.floatingImages}>
                <div className={styles.floatingImage}>
                    <Image
                        src="/assets/images/placeholder.png"
                        alt="Floating decoration 1"
                        width={150}
                        height={150}
                        className={styles.floatImg}
                    />
                </div>
                <div className={styles.floatingImage}>
                    <Image
                        src="/assets/images/placeholder.png"
                        alt="Floating decoration 2"
                        width={150}
                        height={150}
                        className={styles.floatImg}
                    />
                </div>
            </div>
            <Tickets />
            <MainSponsors />
            <Kiosko />
        </main>
    );
}