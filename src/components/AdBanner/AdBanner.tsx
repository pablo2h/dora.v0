'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './AdBanner.module.css';
import 'swiper/css';

const ads = [
    {
        id: 1,
        image: '/assets/images/placeholder.png',
        link: 'https://sponsor1.com',
        alt: 'Sponsor 1'
    },
    {
        id: 2,
        image: '/assets/images/placeholder.png',
        link: 'https://sponsor2.com',
        alt: 'Sponsor 2'
    },
    {
        id: 3,
        image: '/assets/images/placeholder.png',
        link: 'https://sponsor3.com',
        alt: 'Sponsor 3'
    },
    {
        id: 4,
        image: '/assets/images/placeholder.png',
        link: 'https://sponsor4.com',
        alt: 'Sponsor 4'
    }
];

export default function AdBanner() {
    const [shuffledAds, setShuffledAds] = useState(ads);

    useEffect(() => {
        const shuffleArray = (array: typeof ads) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setShuffledAds(shuffleArray(ads));
    }, []);

    return (
        <div className={styles.adBanner}>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {shuffledAds.map((ad) => (
                    <SwiperSlide key={ad.id}>
                        <Link href={ad.link} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={ad.image}
                                alt={ad.alt}
                                width={728}
                                height={90}
                                className={styles.adImage}
                                priority
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}