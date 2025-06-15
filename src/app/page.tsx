import Interlude from "@/components/Interlude";
import Tickets from "@/components/Tickets";
import CtaDiscount from "@/components/Formulario/descuento/CtaDiscount"; 
import IngresoLibre from "@/components/Tickets/IngresoLibre/IngresoLibre";
import AdBanner from "@/components/AdBanner/AdBanner";
import TextBanner from "@/components/AdBanner/TextBanner";
import HeroDecorations from "@/components/HeroDecorations/HeroDecorations";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.mainPage}>
        <HeroDecorations />
        <Interlude />
        <AdBanner />
        <IngresoLibre />
        <TextBanner/>
        <Tickets />     
        <AdBanner />
        <CtaDiscount />
        <Interlude />
      </main>
    </>
  );
}
