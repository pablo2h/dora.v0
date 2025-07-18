import Interlude from "@/components/Interlude";
import Tickets from "@/components/Tickets";
import { CtaDiscountWithPopUp } from "@/components/Formulario/descuento/CtaDiscount"; 
import IngresoLibre from "@/components/Tickets/IngresoLibre/IngresoLibre";
import AdBanner from "@/components/AdBanner/AdBanner";
import TextBanner from "@/components/AdBanner/TextBanner";
import HeroDecorations from "@/components/HeroDecorations/HeroDecorations";
import styles from "./page.module.css";
import BannerInfo from "@/components/FestivalSummary/Banner_info/banner_info";
import Playlist from "@/components/Playlist";
export default function Home() {
  const youtubeUrl = 'https://music.youtube.com/playlist?list=PLl0jPMeDaCcAb76nMv7zcaznrrmIvy5kU';
  const spotifyUrl = 'https://open.spotify.com/playlist/7woBeEM5EU5pcAiVSLOs0m?si=a9ac362af4d44307&nd=1&dlsi=1409873522d64e05';
  
  return (
    <>
      <main className={styles.mainPage}>
        <HeroDecorations />
        <Interlude />
        <AdBanner />
        <BannerInfo/>
        <IngresoLibre />
        <TextBanner/>
        <Tickets />     
        <AdBanner />
        <div className={styles.playlistSection}>
          <Playlist 
            youtubeUrl={youtubeUrl}
            spotifyUrl={spotifyUrl}
          />
        </div>
        <CtaDiscountWithPopUp />
        <Interlude />
      </main>
    </>
  );
}