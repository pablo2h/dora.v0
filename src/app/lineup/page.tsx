'use client';
import styles from './lineup.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
import MainSponsors from '@/components/MainSponsors/MainSponsors';
import ArtistCard from '@/components/ArtistCard/ArtistCard';
import { artists } from '@/data/artists';

export default function LineUpPage() {
    return (
        <main className={styles.lineupPage}>
            <AdBanner />
            <h1>Line Up</h1>  
            <div className={styles.artistList}>
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
            <MainSponsors />
        </main>
        
    );
}