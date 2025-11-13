import WelcomeComponent from '@/components/Welcome/WelcomeComponent'
import HeroDecorations from '@/components/HeroDecorations/HeroDecorations'
import Interlude from '@/components/Interlude'
import Styles from '../bienvenida/page.module.css'

export default function EdicionGroovePage() {
  return (
    <>
      <main>
        <section className={Styles.blurbackground}>
          <div className={Styles.blurbackground}></div>
        </section>
        <section className={Styles.backgroundSection}>
          <HeroDecorations />
          <Interlude />
        </section>
        <section className={Styles.welcomeOverlay}>
          <WelcomeComponent />
        </section>
      </main>
    </>
  )
}

