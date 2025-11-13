import React from 'react'
import Image from 'next/image'
import { EventConfig, EventArtist } from '@/events/types'
import ProfileCard from '@/components/ProfileCard'

type Props = {
  config: EventConfig
}

function Hero({ config }: { config: EventConfig }) {
  return (
    <section className="w-full">
      {config.assets.heroImage && (
        <div className="relative w-full h-[60vh]">
          <Image src={config.assets.heroImage} alt={config.name} fill priority className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              {config.copy.heroTitle && <h1 className="text-4xl font-bold">{config.copy.heroTitle}</h1>}
              {config.copy.heroSubtitle && <p className="mt-2 text-lg">{config.copy.heroSubtitle}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Lineup({ lineup, title }: { lineup: EventArtist[]; title?: string }) {
  return (
    <section className="container mx-auto px-4 py-10">
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lineup.map(p => (
          <ProfileCard key={p.id} profile={{ id: p.id, name: p.name, description: p.description, image: p.image }} variant="artist" />
        ))}
      </div>
    </section>
  )
}

function CTA({ text }: { text?: string }) {
  if (!text) return null
  return (
    <section className="container mx-auto px-4 pb-12">
      <a className="inline-block bg-[var(--primary-color)] text-white px-6 py-3 rounded" href="#">
        {text}
      </a>
    </section>
  )
}

export default function EventLayout({ config }: Props) {
  const order = config.layout.sectionsOrder || ['hero', 'lineup', 'gallery', 'cta']
  return (
    <>
      {order.map(section => {
        if (section === 'hero') return <Hero key="hero" config={config} />
        if (section === 'lineup') return <Lineup key="lineup" lineup={config.lineup} title={config.copy.lineupTitle} />
        if (section === 'cta') return <CTA key="cta" text={config.copy.ctaText} />
        if (section === 'gallery') return null
        return null
      })}
    </>
  )
}

