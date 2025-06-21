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
        webImage: '/assets/Banners/web/instagram_web.png',
        mobileImage: '/assets/Banners/mobile/instagram_mobile.png',
        link: 'https://www.instagram.com/festivaldora',
        alt: 'Instagram de Festival Dora'
    },
    {
        id: 2,
        webImage: '/assets/Banners/web/show_web.png',
        mobileImage: '/assets/Banners/mobile/shows_mobile.png',
        link: 'http://www.dora.com.ar/lineup',
        alt: 'Nuestros shows llenos de groove'
    },
    {
        id: 3,
        webImage: '/assets/Banners/web/ingreoslibre_web.png',
        mobileImage: '/assets/Banners/mobile/ingreso_mobile.png',
        link: 'http://www.dora.com.ar/entradas',
        alt: 'Conoce los tipos de ingreso'
    },
    {
        id: 4,
        webImage: '/assets/Banners/web/preveneta_web.png',
        mobileImage: '/assets/Banners/mobile/preventa_mobile.png',
        link: 'https://www.passline.com/eventos/dora-edicion-del-groove',
        alt: 'Descuento Preventa'
    },
    {
        id: 5,
        webImage: '/assets/Banners/web/streaming_web.png',
        mobileImage: '/assets/Banners/mobile/streaming_mobile.png',
        link: 'http://www.instagram.com/barro_vt',
        alt: 'Streaming del Festival'
    }
];

export default function AdBanner() {
    const [shuffledAds, setShuffledAds] = useState(ads);
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Verificar tamaño inicial
        checkScreenSize();

        // Agregar listener para cambios de tamaño
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className={styles.banner_container}>
            <div className={styles.banner_horizontal}>
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
                                    src={isMobile ? ad.mobileImage : ad.webImage}
                                    alt={ad.alt}
                                    width={isMobile ? 312 : 932}
                                    height={130}
                                    priority
                                    style={{
                                        objectFit: 'contain'
                                    }}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}