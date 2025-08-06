# DORA Rewind 2025 Components

Conjunto de componentes modulares de React para crear experiencias de rewind estilo Instagram Stories para el Festival DORA 2025.

## Componentes Disponibles

### 1. CardWrapper
Componente base que proporciona el contenedor de pantalla completa con botones de acción consistentes.

```tsx
import { CardWrapper } from '@/components/Rewind';

<CardWrapper>
  {/* Contenido de la tarjeta */}
</CardWrapper>
```

### 2. ImageCard
Muestra imágenes en formato de pantalla completa con manejo automático de aspecto.

```tsx
import { ImageCard } from '@/components/Rewind';

<ImageCard 
  src="/rewind/publico-01.jpg" 
  alt="Público del festival" 
/>
```

### 3. VideoCard
Reproducción automática de videos con controles optimizados para móvil.

```tsx
import { VideoCard } from '@/components/Rewind';

<VideoCard src="/rewind/banda-01.mp4" />
```

### 4. DataCard
Tarjetas de contenido textual con tipografía del festival y fondos animados.

```tsx
import { DataCard } from '@/components/Rewind';

<DataCard 
  data={{
    title: "DORA 2025",
    subtitle: "Edición Groove"
  }}
  variant="festival"
/>
```

### 5. RewindViewer
Visor principal que maneja la navegación secuencial entre tarjetas.

```tsx
import { RewindViewer } from '@/components/Rewind';
import { rewindCards } from '@/data/rewind-2025';

<RewindViewer 
  cards={rewindCards}
  autoAdvance={true}
  autoAdvanceDelay={5000}
  onCardChange={(index, card) => console.log('Card changed:', index)}
  onComplete={() => console.log('Rewind completed')}
/>
```

## Características

- **Formato Vertical**: Optimizado para aspecto 9:16 (como Instagram Stories)
- **Responsive**: Adaptado para móvil y desktop
- **Navegación**: Teclado, touch y click
- **Accesibilidad**: ARIA labels y soporte para lectores de pantalla
- **Tipografía**: Usa DynaPuff para títulos y Poppins para texto
- **Colores**: Integrado con tokens de diseño DORA
- **Animaciones**: Transiciones suaves y efectos visuales

## Controles de Navegación

- **Flecha Derecha / Espacio**: Siguiente tarjeta
- **Flecha Izquierda**: Tarjeta anterior
- **P**: Pausar/Reproducir auto-avance
- **Click/Touch**: Zonas de navegación (izquierda/derecha/centro)

## Estructura de Archivos

```
src/components/Rewind/
├── CardWrapper.tsx          # Componente base
├── CardWrapper.module.css   # Estilos del wrapper
├── ImageCard.tsx           # Tarjetas de imagen
├── ImageCard.module.css    # Estilos de imagen
├── VideoCard.tsx           # Tarjetas de video
├── VideoCard.module.css    # Estilos de video
├── DataCard.tsx            # Tarjetas de datos
├── DataCard.module.css     # Estilos de datos
├── RewindViewer.tsx        # Visor principal
├── RewindViewer.module.css # Estilos del visor
├── index.ts                # Exportaciones
└── README.md               # Documentación
```

## Uso Completo

```tsx
import React from 'react';
import { RewindViewer } from '@/components/Rewind';
import { rewindCards } from '@/data/rewind-2025';

const RewindPage: React.FC = () => {
  const handleCardChange = (index: number, card: any) => {
    // Analytics o tracking
    console.log(`Viewing card ${index + 1}: ${card.id}`);
  };

  const handleComplete = () => {
    // Redirigir o mostrar call-to-action
    console.log('Rewind experience completed');
  };

  return (
    <div className="min-h-screen">
      <RewindViewer 
        cards={rewindCards}
        autoAdvance={true}
        autoAdvanceDelay={5000}
        onCardChange={handleCardChange}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default RewindPage;
```

## Personalización

Todos los componentes aceptan `className` para personalización adicional y están diseñados para trabajar con los tokens de diseño definidos en `src/styles/tokens.css`.