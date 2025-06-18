'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './ArtistCard.module.css';

interface ArtistCardProps {
    id: number;
    name: string;
    description: string;
    instagram: string;
    image: string;
    spotifyId?: string;
    youtubeId?: string;
    instagramPostId?: string;
}


export default function ArtistCard({ artist }: { artist: ArtistCardProps }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
 // Función para obtener el color basado en el ID del artista
 const getArtistColor = (artistId: number) => {
    const colors = [
        'var(--orange-color)',
        'var(--blue-color)', 
        'var(--green-color)',
        'var(--pink-color)',
        'var(--red-color)',
        'var(--yellow-color)'
    ];
    return colors[(artistId - 1) % colors.length];
};

const artistColor = getArtistColor(artist.id);
   

    // Detectar si esta card debe expandirse basado en el hash de la URL
    useEffect(() => {
        const checkHash = () => {
            const hash = window.location.hash;
            const targetId = `#artist-${artist.id}`;
            
            if (hash === targetId) {
                setIsExpanded(true);
                // Hacer scroll suave a la card después de un pequeño delay
                setTimeout(() => {
                    cardRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 300);
            }
        };

        // Verificar al cargar la página
        checkHash();

        // Escuchar cambios en el hash
        window.addEventListener('hashchange', checkHash);
        
        return () => {
            window.removeEventListener('hashchange', checkHash);
        };
    }, [artist.id]);

    const handleExpand = () => {
        const willExpand = !isExpanded;
        setIsExpanded(willExpand);
        
        if (cardRef.current) {
            setTimeout(() => {
                cardRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: willExpand ? 'start' : 'center',
                    inline: 'nearest'
                });
            }, 100);
        }
    };
    return (
        <div 
            ref={cardRef}
            id={`artist-${artist.id}`}
            className={`${styles.artistCard} ${isExpanded ? styles.expanded : ''}`}
            style={{
                backgroundColor: artistColor,
                ...(isExpanded ? { 
                    '--image-url': `url(${artist.image})`,
                    backgroundImage: `linear-gradient(${artistColor}, rgba(0,0,0,0.8)), url(${artist.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } : {}),
                color: 'white'
            }}
        >
            <button 
                className={styles.artistHeader}
                onClick={handleExpand}
            >
                <h2>{artist.name}</h2>

            </button>
            <div className={styles.artistContent}>
                <p className={styles.description}>{artist.description}</p>
                <div className={styles.artistActions}>
                    {artist.spotifyId ? (
                        <div className={styles.embedContainer}>
                            <iframe
                                src={`https://open.spotify.com/embed/artist/${artist.spotifyId}?utm_source=generator`}
                        width="100%"
                        height="352"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                    ) : artist.youtubeId ? (
                        <div className={styles.embedContainer}>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${artist.youtubeId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                    ) : artist.instagramPostId ? (
                        <div className={styles.embedContainer}>
                            <iframe className={styles.embedIframe}
                                src={`https://www.instagram.com/p/${artist.instagramPostId}/embed`}
                                width="100%"
                                height="450"
                                frameBorder="0"
                                scrolling="no"
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                    ) : null}
                    <Link 
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.instagramLink}
                    >
                        Instagram
                    </Link>
                </div>
            </div>
        </div>
    );
}