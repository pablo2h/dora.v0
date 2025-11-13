import { render, screen } from '@testing-library/react'
import MockupHero from '../MockupHero'

describe('MockupHero', () => {
  it('muestra el contenido cuando se proporcionan datos', () => {
    render(
      <MockupHero
        title="Evento Test"
        subtitle="Subtítulo de prueba"
        ctaText="Comprar Entradas"
        ctaUrl="/entradas"
      />
    )
    
    expect(screen.getByText('Evento Test')).toBeInTheDocument()
    expect(screen.getByText('Subtítulo de prueba')).toBeInTheDocument()
    expect(screen.getByText('Comprar Entradas')).toBeInTheDocument()
  })

  it('muestra estado vacío cuando no hay contenido', () => {
    render(<MockupHero />)
    
    expect(screen.getByText('Evento Próximamente')).toBeInTheDocument()
    expect(screen.getByText('Muy pronto más información')).toBeInTheDocument()
  })

  it('muestra estado vacío personalizado cuando se proporciona', () => {
    const customEmptyState = {
      title: 'Próximamente',
      message: 'Mantente atento',
      placeholderLogo: '/custom-logo.png'
    }
    
    render(<MockupHero emptyState={customEmptyState} />)
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
    expect(screen.getByText('Mantente atento')).toBeInTheDocument()
  })

  it('muestra imagen de fondo cuando se proporciona', () => {
    const backgroundImage = '/hero-background.jpg'
    const { container } = render(<MockupHero backgroundImage={backgroundImage} />)
    
    const backgroundDiv = container.querySelector('div > div')
    expect(backgroundDiv).toBeInTheDocument()
  })

  it('muestra logo cuando se proporciona', () => {
    const logoImage = '/event-logo.png'
    const { container } = render(<MockupHero logoImage={logoImage} />)
    
    const logoImg = container.querySelector('img[alt="Event logo"]')
    expect(logoImg).toHaveAttribute('src', logoImage)
  })
})