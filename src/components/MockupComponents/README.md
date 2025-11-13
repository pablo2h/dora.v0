# Componentes Mockup Genéricos - Documentación

## Descripción General

Este sistema de componentes mockup permite crear páginas de eventos de forma modular y reutilizable, con manejo inteligente de estados vacíos y placeholders.

## Componentes Disponibles

### 1. MockupHero
**Props:**
- `title?: string` - Título del evento
- `subtitle?: string` - Subtítulo
- `backgroundImage?: string` - URL de imagen de fondo
- `logoImage?: string` - URL del logo
- `ctaText?: string` - Texto del botón de acción
- `ctaUrl?: string` - URL del botón
- `emptyState?: object` - Configuración del estado vacío

**Estado Vacío:**
- Muestra logo placeholder gris
- Mensaje "Evento Próximamente"
- Botón de entrada funcional

### 2. MockupArtistList
**Props:**
- `title?: string` - Título de la sección
- `artists?: ProfileData[]` - Array de artistas
- `emptyState?: object` - Configuración del estado vacío

**Estado Vacío:**
- Círculo gris con logo placeholder
- Mensaje "Próximamente"
- Texto "El lineup se anunciará muy pronto"

### 3. MockupArtistCarousel
**Props:**
- `title?: string` - Título del carrusel
- `artists?: Artist[]` - Array de artistas
- `autoplay?: boolean` - Auto-reproducción (default: true)
- `emptyState?: object` - Configuración del estado vacío

**Estado Vacío:**
- Similar a MockupArtistList
- Sin funcionalidad de carrusel

### 4. MockupHeroDecorations
**Props:**
- `decorations?: object[]` - Array de decoraciones
- `emptyState?: object` - Configuración del estado vacío

**Estado Vacío:**
- Logo placeholder pequeño
- Mensaje de decoraciones próximas

### 5. MockupWelcomeComponent
**Props:**
- `title?: string` - Título de bienvenida
- `date?: string` - Fecha del evento
- `location?: string` - Ubicación
- `logoSrc?: string` - URL del logo
- `onEnter?: function` - Callback al entrar
- `redirectTo?: string` - URL de redirección
- `emptyState?: object` - Configuración del estado vacío

**Estado Vacío:**
- Logo placeholder grande
- Mensaje de evento próximamente
- Botón de entrada funcional

### 6. MockupEventPage (Componente Principal)
**Props:**
- `eventData: EventDataIndex` - Datos completos del evento
- `variant?: 'list' | 'carousel'` - Formato de artistas

## Sistema de Indexación de Datos

### Estructura EventDataIndex
```typescript
interface EventDataIndex {
  slug: string
  name: string
  hero?: {
    title?: string
    subtitle?: string
    backgroundImage?: string
    logoImage?: string
    ctaText?: string
    ctaUrl?: string
  }
  welcome?: {
    title?: string
    date?: string
    location?: string
    logoSrc?: string
    redirectTo?: string
  }
  artists?: Array<{
    id: number | string
    name: string
    description?: string
    image?: string
    instagram?: string
    spotifyId?: string
    youtubeId?: string
  }>
  decorations?: Array<{
    src: string
    alt: string
    position?: 'top' | 'left' | 'right' | 'bottom'
  }>
  sections?: {
    showHero?: boolean
    showWelcome?: boolean
    showArtists?: boolean
    showDecorations?: boolean
    order?: ('hero' | 'welcome' | 'artists' | 'decorations')[]
  }
  emptyState?: {
    title?: string
    message?: string
    placeholderImage?: string
  }
}
```

## Ejemplos de Uso

### 1. Página de Evento Completa
```tsx
import { MockupEventPage } from '@/components/MockupComponents'
import { getEventData } from '@/data/eventData'

export default function PlaytimePage() {
  const eventData = getEventData('playtime')
  
  return (
    <MockupEventPage 
      eventData={eventData} 
      variant="carousel" 
    />
  )
}
```

### 2. Componente Individual
```tsx
import { MockupHero } from '@/components/MockupComponents'

export default function HeroSection() {
  return (
    <MockupHero
      title="Play Time 2025"
      subtitle="La experiencia más divertida"
      backgroundImage="/hero-bg.jpg"
      logoImage="/logo.png"
      ctaText="Explorar"
      ctaUrl="/playtime"
    />
  )
}
```

### 3. Estado Vacío Personalizado
```tsx
<MockupArtistList
  artists={[]}
  emptyState={{
    title: "Pronto anunciaremos",
    message: "El lineup oficial se revelará en las próximas semanas",
    placeholderImage: "/custom-placeholder.png"
  }}
/>
```

## Sistema de Backup Automático

### Características
- **Backup automático** cada 5 minutos
- **Retención** de los últimos 5 backups
- **Restauración** con un clic
- **Prevención** de pérdida de datos

### Uso
```tsx
import { AutoBackup } from '@/utils'

export default function App() {
  return (
    <>
      <AutoBackup 
        enabled={true}
        interval={300000} // 5 minutos
        onBackup={(backupPath) => console.log('Backup creado:', backupPath)}
      />
      {/* Resto de la aplicación */}
    </>
  )
}
```

## Pruebas Unitarias

Los componentes incluyen pruebas unitarias completas que verifican:
- ✅ Renderizado correcto con datos
- ✅ Manejo de estados vacíos
- ✅ Props personalizadas
- ✅ Funcionalidad de interacción
- ✅ Integración con datos

## Convenciones de Nomenclatura

### Slugs de Eventos
- `kebab-case`: `playtime`, `edicion-groove`
- Descriptivos y cortos
- Sin espacios ni caracteres especiales

### Assets
- `/assets/events/{slug}/` - Assets específicos del evento
- `/assets/images/placeholder.png` - Placeholder genérico
- Nombres descriptivos en minúsculas

### Variables de Entorno
```bash
NEXT_PUBLIC_FEATURE_PLAYTIME=true
NEXT_PUBLIC_DEFAULT_EVENT=playtime
```

## Flujo de Trabajo Recomendado

1. **Desarrollo**
   - Crear datos mock en `src/data/eventData.ts`
   - Usar `/playtime-test` para pruebas
   - Verificar estados vacíos

2. **Validación**
   - Ejecutar pruebas unitarias
   - Verificar responsive design
   - Probar navegación

3. **Migración**
   - Copiar datos reales
   - Actualizar imágenes y textos
   - Desplegar a producción

4. **Mantenimiento**
   - Monitorear backups automáticos
   - Actualizar contenido según necesidad
   - Agregar nuevos eventos

## Solución de Problemas

### Estado Vacío No Aparece
- Verificar que `artists` sea array vacío `[]`
- Asegurar que no sea `undefined`
- Comprobar props `emptyState`

### Imágenes No Cargan
- Verificar rutas de imágenes
- Asegurar que existan en `public/`
- Comprobar formato de rutas (deben empezar con `/`)

### Backup Falla
- Verificar permisos de escritura
- Asegurar espacio en disco
- Comprobar estructura de directorios

## Próximos Pasos

1. **Agregar más componentes mockup** según necesidad
2. **Implementar sistema de caché** para mejorar performance
3. **Crear generador de datos** automático
4. **Agregar animaciones** y transiciones
5. **Implementar sistema de temas** dinámicos