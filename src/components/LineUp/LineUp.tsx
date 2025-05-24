import { artists } from '@/data/artists';
import styles from './LineUp.module.css';

export default function LineUp() {
    return (
        <div className={styles.lineup}>
            {artists.map(artist => (
                <p key={artist.id}>{artist.name}</p>
            ))}
        </div>
    );
}