import styles from "@/components/FestivalSummary/FestivalSummary.module.css"; 
import { festivalInfo } from "@/data/pressKits";

export default function BannerInfo() {
return(
  <div className={`${styles.overviewContent}`}>  
  <div className={styles.statsGrid}>
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{festivalInfo.stats.artists}</div>
    <div className={styles.statLabel}>Musicos</div>
  </div>
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{festivalInfo.stats.duration}</div>
    <div className={styles.statLabel}>Duración</div>
  </div>
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{festivalInfo.stats.screens}</div>
    <div className={styles.statLabel}>Pantallas</div>
  </div>
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{festivalInfo.stats.attendees}</div>
    <div className={styles.statLabel}>Asistentes</div>
  </div>
  </div>
  </div>
  )
}    
