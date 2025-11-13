import MockupEventPage from '@/components/MockupComponents/MockupEventPage'
import { getEventData } from '@/data/eventData'

export default function PlaytimeTestPage() {
  const eventData = getEventData('playtime')
  
  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Evento no encontrado</h1>
          <p className="text-gray-600">Los datos de Play Time no están disponibles</p>
        </div>
      </div>
    )
  }
  
  return (
    <main>
      <MockupEventPage eventData={eventData} variant="carousel" />
    </main>
  )
}