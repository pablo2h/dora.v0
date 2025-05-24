import { FaCamera, FaWater, FaMobileAlt, FaSmoking, FaShoppingBag} from 'react-icons/fa';
import { FaGun } from "react-icons/fa6";
import { MdNoFood } from 'react-icons/md';
import { GiDaggers } from 'react-icons/gi';
import styles from './ObjetosPermitidos.module.css';
import { IconType } from 'react-icons';

interface ItemProps {
    icon: IconType;
    label: string;
}

const objetosPermitidos: ItemProps[] = [
    { icon: FaCamera, label: "Cámaras no profesionales" },
    { icon: FaWater, label: "Agua sellada" },
    { icon: FaMobileAlt, label: "Celulares" },
    { icon: FaSmoking, label: "Cigarrillos" },
    { icon: FaShoppingBag, label: "Bolsos y Morrales" },
];

const objetosProhibidos: ItemProps[] = [
    { icon: MdNoFood, label: "Comida externa" },
    { icon: GiDaggers, label: "Armas punzantes" },
    { icon: FaGun, label: "Armas de fuego" },
];

const ItemIcon = ({ icon: Icon, label, isProhibido }: ItemProps & { isProhibido?: boolean }) => (
    <div className={`${styles.item} ${isProhibido ? styles.prohibido : styles.permitido}`}>
        <Icon size={24} />
        <span>{label}</span>
    </div>
);

export default function ObjetosPermitidos() {
    return (
        <div className={styles.container}>
            <h3>Objetos Permitidos y Prohibidos</h3>
            
            <div className={styles.itemsGrid}>
                <div className={styles.section}>
                    <h4>Permitidos</h4>
                    <div className={styles.itemsList}>
                        {objetosPermitidos.map((item, index) => (
                            <ItemIcon key={index} {...item} />
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h4>Prohibidos</h4>
                    <div className={styles.itemsList}>
                        {objetosProhibidos.map((item, index) => (
                            <ItemIcon key={index} {...item} isProhibido={true} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}