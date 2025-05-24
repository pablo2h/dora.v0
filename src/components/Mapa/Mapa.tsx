import { FaWalking } from 'react-icons/fa';
import styles from './Mapa.module.css';

interface MapProps {
    title?: string;
    address?: string;
}

export default function Map({ title = "Vieja Usina", address = "San Martín 861, Paraná, Entre Ríos" }: MapProps) {
    const googleMapsUrl = "https://maps.app.goo.gl/WoTxrpPCtWqMpbt3A";
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54300.468451174!2d-60.56490317987505!3d-31.721923825063513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b4526f78108c83%3A0xeb21544ed15a99a0!2sCentro%20Cultural%20Y%20De%20Convenciones%20La%20Vieja%20Usina!5e0!3m2!1sen!2sar!4v1740446334596!5m2!1sen!2sarhttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54300.468451174!2d-60.56490317987505!3d-31.721923825063513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b4526f78108c83%3A0xeb21544ed15a99a0!2sCentro%20Cultural%20Y%20De%20Convenciones%20La%20Vieja%20Usina!5e0!3m2!1sen!2sar!4v1740446334596!5m2!1sen!2sar";

    return (
        <div className={styles.mapContainer}>
            <h3>{title}</h3>
            <p className={styles.address}>{address}</p>
            <div className={styles.mapWrapper}>
                <iframe 
                    src={mapEmbedUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <a 
                href={googleMapsUrl}
                className={styles.mapLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                Ir al Festival
                <FaWalking size={20} />
            </a>
        </div>
    );
}