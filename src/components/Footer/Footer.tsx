import styles from './Footer.module.css';
import Image from 'next/image';
import GeneralForm from '../Formulario/GeneralForm/GeneralForm';
export default function Footer() {
    return (
        <footer id='footer' className={styles.footer}>
            <div className={styles.communityBanner}>
                <h2>Disfruta de nuestra comunidad</h2>
            </div>

            <div className={styles.socialButtons}>
                <a href="#instagram" className={`${styles.socialButton} ${styles.instagram}`}>
                    <Image src="./assets/social/instagram.svg" width={24} height={24} alt="Instagram" className={styles.socialIcon}/>
                </a>
                <a href="#tiktok" className={`${styles.socialButton} ${styles.tiktok}`}>
                    <Image src="./assets/social/tiktok.svg" width={24} height={24} alt="TikTok" className={styles.socialIcon} />
                </a>
                <a href="#youtube" className={`${styles.socialButton} ${styles.youtube}`}>
                    <Image src="./assets/social/youtube.svg" width={24} height={24} alt="YouTube" className={styles.socialIcon} />
                </a>
                <a href="#kick" className={`${styles.socialButton} ${styles.kick}`}>
                    <Image src="./assets/social/kick.svg" width={24} height={24} alt="Kick" className={styles.socialIcon} />
                </a>
            </div>

            <div className={styles.contactSection}>
                <GeneralForm formType="consulta" />
            </div>
        </footer>
    );
}