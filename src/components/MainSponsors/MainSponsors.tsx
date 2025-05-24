import Image from 'next/image';
import Link from 'next/link';
import styles from './MainSponsors.module.css';

const mainSponsors = [
    {
        id: 1,
        name: 'Sponsor 1',
        logo: '/assets/images/placeholder.png',
        link: 'https://sponsor1.com'
    },
    {
        id: 2,
        name: 'Sponsor 2',
        logo: '/assets/images/placeholder.png',
        link: 'https://sponsor2.com'
    },
    {
        id: 3,
        name: 'Sponsor 3',
        logo: '/assets/images/placeholder.png',
        link: 'https://sponsor3.com'
    }
];

export default function MainSponsors() {
    return (
        <section className={styles.sponsorsSection}>
            <div className={styles.sponsorsContainer}>
                <h2 className={styles.sponsorsTitle}>
                    Sposoreados por:
                </h2>
                <div className={styles.sponsorsGrid}>
                    {mainSponsors.map((sponsor) => (
                        <Link 
                            key={sponsor.id} 
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.sponsorLink}
                        >
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={200}
                                height={100}
                                className={styles.sponsorLogo}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}