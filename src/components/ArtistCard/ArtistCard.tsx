'use client';
import { useState, useRef } from 'react';
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
            className={`${styles.artistCard} ${isExpanded ? styles.expanded : ''}`}
            style={{
                ...(!isExpanded ? {} : { '--image-url': `url(${artist.image})` } as React.CSSProperties),
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