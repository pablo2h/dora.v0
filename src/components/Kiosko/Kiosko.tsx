'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { kioskProducts } from '@/data/kiosk';
import styles from './Kiosko.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PASSLINE_URL = "https://www.passline.com/eventos/dora-edicion-del-groove";

export default function Kiosko() {
    return (
        <section className={styles.kioscoSection}>
            <h2 className={styles.kioscoTitle}>Kiosco</h2>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={'auto'}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                className={styles.productSwiper}
            >
                {kioskProducts.map((product) => (
                    <SwiperSlide key={product.id} className={styles.productSlide}>
                        <Link href={PASSLINE_URL} className={styles.productCard} target="_blank" rel="noopener noreferrer">
                            <h3>{product.name}</h3>
                            <div className={styles.productImage}>
                                <Image
                                    src="/assets/images/placeholder.png"
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <p className={styles.productDescription}>{product.description}</p>
                                <p className={styles.productDetails}>
                                    {product.details.brand && <span className={styles.brand}>{product.details.brand}</span>}
                                    <span className={styles.size}>{product.details.size}</span>
                                </p>
                                <p className={styles.productPrice}>${product.price}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}