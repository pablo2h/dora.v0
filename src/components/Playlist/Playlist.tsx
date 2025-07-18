'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Playlist.module.css';

interface PlaylistProps {
  youtubeUrl: string;
  spotifyUrl: string;
  title?: string;
}

export default function Playlist({ youtubeUrl, spotifyUrl, title = "Playlist: vibes de dora" }: PlaylistProps) {
  const [activeService, setActiveService] = useState<'youtube' | 'spotify'>('spotify');
  const subtitle = "Lleva las vibes de dora en tus oídos";
  
  // Extraer IDs de las URLs
  const youtubePlaylistId = youtubeUrl.includes('list=') 
    ? youtubeUrl.split('list=')[1].split('&')[0] 
    : '';
    
  const spotifyPlaylistId = spotifyUrl.includes('playlist/') 
    ? spotifyUrl.split('playlist/')[1].split('?')[0] 
    : '';

  return (
    <div className={styles.playlistComponent}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      
      <div className={styles.selectorButtons}>
        <button 
          className={`${styles.selectorButton} ${activeService === 'spotify' ? `${styles.active} ${styles.spotify}` : ''}`}
          onClick={() => setActiveService('spotify')}
        >
          <span className={styles.buttonIcon}>
            <Image src="/assets/social/spotify.svg" alt="Spotify" width={20} height={20} />
          </span>
          Spotify
        </button>
        <button 
          className={`${styles.selectorButton} ${activeService === 'youtube' ? `${styles.active} ${styles.youtube}` : ''}`}
          onClick={() => setActiveService('youtube')}
        >
          <span className={styles.buttonIcon}>
            <Image src="/assets/social/youtube.svg" alt="YouTube" width={20} height={20} />
          </span>
          YouTube Music
        </button>
      </div>
      
      <div className={styles.embedContainer}>
        {activeService === 'youtube' && youtubePlaylistId && (
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}`}
            title="YouTube playlist player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ borderRadius: '12px' }}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        )}
        
        {activeService === 'spotify' && spotifyPlaylistId && (
          <iframe 
            src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
            title="Spotify playlist player"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px' }}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        )}
      </div>
      
      <Link 
        href={activeService === 'youtube' ? youtubeUrl : spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.externalLink}
      >
        <span className={styles.buttonIcon}>
          <Image 
            src={activeService === 'youtube' ? '/assets/social/youtube.svg' : '/assets/social/spotify.svg'} 
            alt={activeService === 'youtube' ? 'YouTube' : 'Spotify'} 
            width={20} 
            height={20} 
          />
        </span>
        Abrir en {activeService === 'youtube' ? 'YouTube Music' : 'Spotify'}
      </Link>
    </div>
  );
}