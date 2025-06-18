'use client';
import { artists } from '@/data/artists';
import styles from './LineUp.module.css';
import Link from 'next/link';

export default function LineUp() {
    const handleArtistClick = (artistId: number) => {
        // Redirigir a la página del lineup con el ID del artista como hash
        window.location.href = `/lineup#artist-${artistId}`;
    };

    return (
        <div className={styles.lineup}>
            {artists.map(artist => (
                <p 
                    key={artist.id} 
                    className={styles.artistName}
                    onClick={() => handleArtistClick(artist.id)}
                >
                    {artist.name}
                </p>
            ))}
        </div>
    );
}