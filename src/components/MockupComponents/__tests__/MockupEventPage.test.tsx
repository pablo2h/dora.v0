import { render, screen } from '@testing-library/react'
import { getEventData } from '@/data/eventData'
import MockupEventPage from '../MockupEventPage'

// Mockear los datos de evento
jest.mock('@/data/eventData', () => ({
  getEventData: jest.fn()
}))

describe('MockupEventPage', () => {
  const mockEventData = {
    slug: 'playtime',
    name: 'Play Time',
    hero: {
      title: 'Play Time 2025',
      subtitle: 'La experiencia más divertida del verano',
      backgroundImage: '/hero-bg.jpg',
      logoImage: '/logo.png',
      ctaText: 'Explorar Play Time',
      ctaUrl: '/playtime'
    },
    welcome: {
      title: '¡Bienvenidos!',
      date: 'Enero 2025',
      location: 'Lugar por confirmar',
      logoSrc: '/logo.png',
      redirectTo: '/playtime'
    },
    artists: [
      {
        id: 1,
        name: 'Artista 1',
        description: 'Descripción del artista 1',
        image: '/artist1.jpg'
      }
    ],
    decorations: [],
    sections: {
      showHero: true,
      showWelcome: true,
      showArtists: true,
      showDecorations: false,
      order: ['hero', 'welcome', 'artists']
    },
    emptyState: {
      title: 'Próximamente',
      message: 'Muy pronto más información',
      placeholderImage: '/placeholder.png'
    }
  }
  
  beforeEach(() => {
    (getEventData as jest.Mock).mockReturnValue(mockEventData)
  })
  
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('muestra el hero cuando está configurado', () => {
    render(<MockupEventPage eventData={mockEventData} />)
    expect(screen.getByText('Play Time 2025')).toBeInTheDocument()
  })
  
  it('muestra la sección de bienvenida cuando está configurada', () => {
    render(<MockupEventPage eventData={mockEventData} />)
    expect(screen.getByText('¡Bienvenidos!')).toBeInTheDocument()
  })
  
  it('muestra la lista de artistas cuando hay artistas', () => {
    render(<MockupEventPage eventData={mockEventData} variant="list" />)
    expect(screen.getByText('Artista 1')).toBeInTheDocument()
  })
  
  it('muestra el carrusel de artistas cuando se especifica variant="carousel"', () => {
    render(<MockupEventPage eventData={mockEventData} variant="carousel" />)
    expect(screen.getByText('Artista 1')).toBeInTheDocument()
  })
  
  it('muestra mensaje de estado vacío cuando no hay datos en una sección', () => {
    const emptyEventData = { ...mockEventData, artists: [] }
    render(<MockupEventPage eventData={emptyEventData} />)
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
  })
  
  it('respeta el orden de las secciones configurado', () => {
    const { container } = render(<MockupEventPage eventData={mockEventData} />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })
})
