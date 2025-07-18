import styles from './page.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
import Playlist from '@/components/Playlist/Playlist';

export default function PlaylistPage() {
    const youtubeUrl = 'https://music.youtube.com/playlist?list=PLl0jPMeDaCcAb76nMv7zcaznrrmIvy5kU';
    const spotifyUrl = 'https://open.spotify.com/playlist/7woBeEM5EU5pcAiVSLOs0m?si=a9ac362af4d44307&nd=1&dlsi=1409873522d64e05';
    
    return (
        <main className={styles.playlistPage}>
            <AdBanner />
            <div className={styles.playlistContainer}>
                <Playlist 
                    youtubeUrl={youtubeUrl}
                    spotifyUrl={spotifyUrl}
                />
            </div>
        </main>
    );
}