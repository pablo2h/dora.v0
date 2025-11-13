import { render, screen } from '@testing-library/react'
import MockupArtistList from '../MockupArtistList'
import { ProfileData } from '@/components/ProfileCard/ProfileCard'

describe('MockupArtistList', () => {
  const mockArtists: ProfileData[] = [
    {
      id: 1,
      name: 'Artista Test 1',
      description: 'Descripción del artista 1',
      image: '/test-image-1.jpg'
    },
    {
      id: 2,
      name: 'Artista Test 2',
      description: 'Descripción del artista 2',
      image: '/test-image-2.jpg'
    }
  ]

  it('muestra el título cuando se proporciona', () => {
    render(<MockupArtistList title="Artistas Destacados" artists={mockArtists} />)
    expect(screen.getByText('Artistas Destacados')).toBeInTheDocument()
  })

  it('muestra la lista de artistas cuando hay datos', () => {
    render(<MockupArtistList artists={mockArtists} />)
    expect(screen.getByText('Artista Test 1')).toBeInTheDocument()
    expect(screen.getByText('Artista Test 2')).toBeInTheDocument()
  })

  it('muestra estado vacío cuando no hay artistas', () => {
    render(<MockupArtistList artists={[]} />)
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
    expect(screen.getByText('El lineup se anunciará muy pronto')).toBeInTheDocument()
  })

  it('muestra estado vacío personalizado cuando se proporciona', () => {
    const customEmptyState = {
      title: 'No hay artistas disponibles',
      message: 'Vuelve más tarde',
      placeholderImage: '/custom-placeholder.png'
    }
    
    render(<MockupArtistList artists={[]} emptyState={customEmptyState} />)
    expect(screen.getByText('No hay artistas disponibles')).toBeInTheDocument()
    expect(screen.getByText('Vuelve más tarde')).toBeInTheDocument()
  })

  it('muestra el placeholder de imagen por defecto', () => {
    render(<MockupArtistList artists={[]} />)
    const placeholder = screen.getByAltText('Logo placeholder')
    expect(placeholder).toHaveAttribute('src', '/assets/images/placeholder.png')
  })
})