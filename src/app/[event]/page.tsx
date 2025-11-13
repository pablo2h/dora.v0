import { notFound } from 'next/navigation'
import { getEvent, listEvents } from '@/events'
import EventThemeProvider from '@/components/events/EventThemeProvider'
import EventLayout from '@/components/events/EventLayout'

export default function EventPage({ params }: { params: { event: string } }) {
  const config = getEvent(params.event)
  if (!config) return notFound()
  return (
    <EventThemeProvider palette={config.palette}>
      <EventLayout config={config} />
    </EventThemeProvider>
  )
}

export function generateStaticParams() {
  return listEvents().map(e => ({ event: e.slug }))
}

