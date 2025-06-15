'use client';
import styles from './ArtistList.module.css';
import ArtistCard from '@/components/ArtistCard/ArtistCard';
import { artists } from '@/data/artists';

export default function ArtistList() {
    return (
        <section className={`${styles.artistListSection} section-block`}>
            <h1>Conoce las propuestas: </h1>  
            <div className={styles.artistList}>
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </section>
    );
}