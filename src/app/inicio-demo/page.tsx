import MockupHeroDecorations from '@/components/MockupComponents/MockupHeroDecorations'
import MockupInterlude from '@/components/MockupComponents/MockupInterlude'
import MockupAdBanner from '@/components/MockupComponents/MockupAdBanner'
import MockupBannerInfo from '@/components/MockupComponents/MockupBannerInfo'
import MockupIngresoLibre from '@/components/MockupComponents/MockupIngresoLibre'
import MockupTextBanner from '@/components/MockupComponents/MockupTextBanner'
import MockupPlaylist from '@/components/MockupComponents/MockupPlaylist'
import MockupCtaDiscount from '@/components/MockupComponents/MockupCtaDiscount'
import { MockupTickets } from '@/components/MockupComponents'

export default function InicioDemoPage() {
  return (
    <main>
      <MockupHeroDecorations />
      <MockupInterlude />
      <MockupAdBanner />
      <MockupBannerInfo />
      <MockupIngresoLibre />
      <MockupTextBanner />
      <MockupTickets /> 
      <MockupAdBanner />
      <div>
        <MockupPlaylist />
      </div>
      <MockupCtaDiscount />
      <MockupInterlude />
    </main>
  )
}
