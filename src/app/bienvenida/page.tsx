import WelcomeComponent from '@/components/Welcome/WelcomeComponent';
import HeroDecorations from "@/components/HeroDecorations/HeroDecorations";
import Interlude from "@/components/Interlude";
import Styles  from "./page.module.css";

export default function BienvenidaPage() {
  return (
    <>
      <main>

        <section className={Styles.blurbackground}>         
          <div className={Styles.blurbackground}></div> 
        </section>

        {/* Componentes de fondo */}
        <section className={Styles.backgroundSection}>
        <HeroDecorations />
        <Interlude />
        </section>
        
        {/* Welcome component transparente en primer plano */}
        <section className={Styles.welcomeOverlay}>
          <WelcomeComponent />
        </section>
      </main>
    </>
  );
}