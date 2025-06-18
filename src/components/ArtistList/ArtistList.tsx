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
                    <div key={artist.id} id={`artist-${artist.id}`}>
                        <ArtistCard artist={artist} />
                    </div>
                ))}
            </div>
        </section>
    );
}