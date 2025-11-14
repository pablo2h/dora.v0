import MockupHero from '@/components/MockupComponents/MockupHero'
import MockupWelcomeComponent from '@/components/MockupComponents/MockupWelcomeComponent'
import MockupArtistList from '@/components/MockupComponents/MockupArtistList'
import MockupArtistCarousel from '@/components/MockupComponents/MockupArtistCarousel'
import MockupHeroDecorations from '@/components/MockupComponents/MockupHeroDecorations'
import MockupTickets from '@/components/MockupComponents/MockupTickets'
import MockupPlaylist from '@/components/MockupComponents/MockupPlaylist'
import { getEventData } from '@/data/eventData'

export default function DemoPage() {
  const eventData = getEventData('playtime')
  return (
    <main>
      <MockupHero title={eventData?.hero?.title} subtitle={eventData?.hero?.subtitle} />
      <MockupWelcomeComponent title={eventData?.welcome?.title} date={eventData?.welcome?.date} location={eventData?.welcome?.location} />
      <MockupTickets />
      <MockupPlaylist />
      <MockupArtistCarousel title="Artistas Destacados" artists={eventData?.artists || []} />
      <MockupArtistList title="Tarjetas de Artistas" artists={(eventData?.artists || []).map(a => ({ id: a.id, name: a.name, description: a.description, image: a.image }))} />
      <MockupHeroDecorations decorations={eventData?.decorations} />
    </main>
  )
}

