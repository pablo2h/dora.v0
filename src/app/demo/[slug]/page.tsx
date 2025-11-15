import { neon } from '@neondatabase/serverless'
import { MockupHero, MockupWelcomeComponent, MockupArtistList, MockupHeroDecorations, MockupCtaDiscount } from '@/components/MockupComponents'

type EventoRow = {
  slug: string
  name: string
  palette: Record<string, string>
  layout_sections_order: string[]
  blocks: any
  emptyState?: any
}

async function fetchEvento(slug: string): Promise<EventoRow | null> {
  const conn = process.env.NEON_DATABASE_URL as string | undefined
  if (!conn) return null
  const sql = neon(conn)
  const rows = await sql<EventoRow[]>`SELECT slug, name, palette, layout_sections_order, blocks, "emptyState" FROM "Eventos" WHERE slug = ${slug} LIMIT 1`
  return rows[0] || null
}

export default async function Page({ params }: { params: { slug: string } }) {
  const evento = await fetchEvento(params.slug)
  const isDemo = params.slug === 'demo'
  const layout = evento?.layout_sections_order || (isDemo ? ['hero', 'artists'] : ['hero'])
  const blocks = evento?.blocks || (isDemo ? { hero: { title: 'Página de Demo' }, artists: [] } : {})
  const emptyState = evento?.emptyState

  return (
    <main>
      {layout.map((section) => {
        if (section === 'hero') {
          return <MockupHero key={section} {...(blocks.hero || {})} emptyState={emptyState} />
        }
        if (section === 'welcome') {
          return <MockupWelcomeComponent key={section} {...(blocks.welcome || {})} emptyState={emptyState} />
        }
        if (section === 'artists') {
          return <MockupArtistList key={section} title={blocks.artists?.title} artists={blocks.artists || []} emptyState={emptyState} />
        }
        if (section === 'lineup') {
          return <MockupArtistList key={section} title={blocks.lineup?.title || 'Lineup'} artists={blocks.lineup || []} emptyState={emptyState} />
        }
        if (section === 'decorations') {
          return <MockupHeroDecorations key={section} decorations={blocks.decorations || []} />
        }
        if (section === 'cta') {
          return <MockupCtaDiscount key={section} />
        }
        return null
      })}
    </main>
  )
}
