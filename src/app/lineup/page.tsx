import styles from './page.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
/* import MainSponsors from '@/components/MainSponsors/MainSponsors'; */
import ArtistList from '@/components/ArtistList/ArtistList';

export default function LineUpPage() {
    return (
        <main className={styles.lineupPage}>
            <AdBanner />
            <ArtistList />
        {/* <MainSponsors /> */}
        </main>
        
    );
}