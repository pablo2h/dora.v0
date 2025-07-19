# 📋 DORA 2025 - Mapa Interactivo: Plan de Desarrollo Unificado

## 🎯 Resumen Ejecutivo

### Enfoque Híbrido Confirmado
- **Prioridad 1**: Hotspots interactivos (base sólida)
- **Prioridad 2**: Optimizaciones ultra-light
- **Prioridad 3**: Sistema QR (sin base de datos inicial)
- **Futuro**: Base de datos y usuarios (se evaluará más adelante)

### Tecnologías Confirmadas
- Framework: Next.js 14 con App Router
- Lenguaje: TypeScript
- Estilos: CSS Modules (ya en uso)
- Estado: Zustand
- Gestor: npm
- QR Scanner: html5-qrcode

## 📊 Información Confirmada del Proyecto

### Compatibilidad de Navegadores
- ✅ Chrome (últimas versiones)
- ✅ Safari (últimas versiones) 
- ✅ Edge (últimas versiones)
- ✅ Accesibilidad: lectores de pantalla + navegación por teclado

### Estimaciones de Uso
- Asistentes totales: ~500 personas
- Usuarios activos del mapa: ~200 personas
- Fecha: Sábado 26 de Julio de 2025 (17:00-23:00)
- Ubicación: Vieja Usina - Paraná, Entre Ríos

### Datos del Festival Disponibles
**Artistas Confirmados:**
- Rosario Smowing - Swing, Ska, Rock
- La Tercera Fase del Plan - Rock, Surf
- Zacaro y los Puerkos - Teatral, Fusión
- Stand Up Comedy Litoral - Comedia
- Joa Atencio - Pop, Rock Acústico
- Delpo DJ - House, DJ Set
- Facu Halle - Host

**Puestos Gastronómicos Específicos:**
- Kansas
- Moka
- Don Diego
- Pochoclos

**Productos del Kiosco:**
- Bebidas: Agua Nuestra ($1.499), Fernet Branca ($6.999), Gin Herederos ($6.499)
- Snacks: Maní Julicroc ($1.499), Anillos de Maíz ($1.699), Papas Fritas ($2.999)

### Zonas del Mapa Confirmadas
**Zonas de Abonados (Acceso Restringido):**
- 🎫 Escenario principal
- 🎫 Zona VIP techada

**Zonas de Acceso Libre:**
- 🆓 Patio exterior
- 🆓 Área de foodtrucks
- 🆓 Zona de pantallas exteriores
- 🆓 Stands y juegos

**Nota:** No se mostrarán áreas de staff en el mapa

## ✅ Plan de Desarrollo por Fases

### 🏗️ FASE 1: Hotspots Base (Semanas 1-2)
**Objetivo:** Mapa interactivo funcional con hotspots clickeables

#### Pre-desarrollo
- [ ] Analizar SVG del mapa existente (`Mapa-Post-_1_.svg`)
- [ ] Mapear coordenadas físicas a coordenadas SVG
- [ ] Definir categorías de hotspots (comida, escenario, servicios, etc.)
- [ ] Crear estructura de datos para hotspots

#### Desarrollo Core
- [ ] **Componente InteractiveMap**
  - Reemplazar iframe de Google Maps con SVG interactivo
  - Implementar hotspots clickeables
  - Estados hover/selected
  - Modal de información responsive

- [ ] **Tipos TypeScript**
  ```typescript
  interface MapHotspot {
    id: string;
    name: string;
    category: 'food' | 'stage' | 'service' | 'sponsor' | 'vip';
    coordinates: { x: number; y: number };
    info: {
      description: string;
      schedule?: string;
      prices?: string[];
      access: 'free' | 'ticket';
    };
  }
  - Datos de Hotspots
  - Integrar con datos existentes (schedule.ts, artists.ts, kiosk.ts)
  - Crear festivalHotspots.ts
  - Validación de datos Testing Fase 1
- Tests unitarios de componentes
- Tests de interacciones click/hover
- Tests responsive
- Tests de accesibilidad Entregables Fase 1
- Componente InteractiveMap funcional
- 6-8 hotspots implementados
- Modal de información
- Documentación técnica
### ⚡ FASE 2: Optimizaciones (Semanas 3-4)
Objetivo: Performance optimizado para dispositivos de gama baja
 Pre-desarrollo
- Audit de performance actual
- Identificar assets pesados
- Definir métricas de dispositivos "low-end" Desarrollo
- Service Worker
  
  - Caché de assets del mapa
  - Funcionalidad offline
  - Estrategias de caché
- Detección de Dispositivos
  
  ```
  const useDeviceCapabilities = () => {
    // Detectar capacidades del dispositivo
    // Retornar configuración adaptativa
  }
  ```
- Componente Adaptativo
  
  - AdaptiveMap que selecciona versión
  - LightweightMap para dispositivos lentos
  - Lazy loading de assets Testing Fase 2
- Lighthouse audit (score > 90)
- Bundle size analysis (< 50KB)
- Tests en dispositivos Android gama baja
- Tests con conexiones 2G/3G
### 🎮 FASE 3: Sistema QR (Semanas 5-6)
Objetivo: Gamificación con QR codes (SIN base de datos inicial)
 Pre-desarrollo
- Definir ubicaciones físicas de QR codes
- Generar códigos únicos por checkpoint
- Planificar sistema de recompensas Desarrollo
- QR Scanner
  
  ```
  npm install html5-qrcode
  ```
  - Componente QRScanner
  - Validación de códigos
  - Manejo de permisos de cámara
- Sistema de Progreso (LocalStorage)
  
  ```
  interface UserProgress {
    scannedLocations: string[];
    points: number;
    achievements: string[];
    visitDate: string;
  }
  ```
- Gamificación
  
  - Hook useGameProgress con Zustand
  - Sistema de puntos y logros
  - Persistencia en localStorage
  - Componente GameProgress Sistema de Recompensas Confirmado
1. Primer descuento: 5% en bebidas
2. Descuento final: 10% en merchandise
3. Mensaje QR: "Verifica tu punto en el Festival DORA" Testing Fase 3
- Tests de QR scanning
- Tests de gamificación
- Tests de persistencia
- Tests de flujo completo
## 🛑 PUNTO DE PAUSA: Base de Datos
ANTES de implementar cualquier funcionalidad de base de datos, PARAR y preguntar:

### Preguntas Críticas sobre BD
1. ¿Realmente necesitamos persistencia en servidor para el MVP?
2. ¿Qué datos específicos queremos trackear?
3. ¿Cómo se relaciona con la tabla de usuarios existente en PostgreSQL?
4. ¿Necesitamos sincronización en tiempo real?
5. ¿Qué estructura de tablas propones?
### Opciones de Implementación
Opción A: Solo LocalStorage (Recomendado para MVP)

- Más simple
- Funciona offline
- No requiere APIs adicionales
- Datos se pierden al limpiar navegador
Opción B: Híbrido LocalStorage + BD

- LocalStorage para funcionalidad inmediata
- Sync opcional a BD para analytics
- Más complejo pero más robusto
Opción C: Solo Base de Datos

- Requiere conexión constante
- Más complejo de implementar
- Mejor para analytics y persistencia
## 📁 Estructura de Archivos Propuesta
```
src/
├── components/
│   ├── Mapa/
│   │   ├── InteractiveMap.tsx
│   │   ├── MapHotspot.tsx
│   │   ├── HotspotModal.tsx
│   │   ├── AdaptiveMap.tsx
│   │   ├── LightweightMap.tsx
│   │   └── Mapa.module.css
│   └── QR/
│       ├── QRScanner.tsx
│       ├── GameProgress.tsx
│       └── QR.module.css
├── data/
│   ├── festivalHotspots.ts
│   └── qrCheckpoints.ts
├── hooks/
│   ├── useDeviceCapabilities.ts
│   ├── useGameProgress.ts
│   └── useMapData.ts
├── types/
│   ├── map.ts
│   └── qr.ts
└── utils/
    ├── mapCoordinates.ts
    └── qrValidation.ts
```
"# PROMPT FASE 1: Mapa Interactivo con Hotspots - Festival DORA 2025

## Contexto del Proyecto
Estás desarrollando un mapa interactivo para el Festival DORA 2025 que reemplazará el iframe actual de Google Maps con un SVG interactivo que contenga hotspots clickeables.

## Archivos Existentes Relevantes
- `src/components/Mapa/Mapa.tsx` - Componente actual con Google Maps
- `src/components/Mapa/Mapa.module.css` - Estilos existentes
- `public/assets/mapa/Mapa-Post-_1_.svg` - SVG del mapa a usar
- `src/data/schedule.ts` - Horarios del festival
- `src/data/artists.ts` - Información de artistas
- `src/data/kiosk.ts` - Productos del kiosco

## Objetivo de la Fase 1
Crear un componente `InteractiveMap` que:
1. Reemplace el iframe de Google Maps con el SVG interactivo
2. Implemente 6-8 hotspots clickeables sobre el SVG
3. Muestre información detallada en un modal al hacer click
4. Sea completamente responsive y accesible

## Hotspots a Implementar (Prioridad)
1. **Escenario Principal** (acceso con entrada)
   - Artistas: Rosario Smowing, La Tercera Fase del Plan, Zacaro y los Puerkos
   - Horarios del schedule.ts
   - Acceso: Requiere entrada

2. **Puestos de Comida** (acceso libre)
   - Kansas, Moka, Don Diego, Pochoclos
   - Horarios de atención
   - Acceso: Libre

3. **Zona VIP** (acceso restringido)
   - Área techada exclusiva
   - Servicios premium
   - Acceso: Solo abonados

4. **Kiosco/Merchandising** (acceso libre)
   - Productos del kiosk.ts
   - Precios actualizados
   - Acceso: Libre

5. **Servicios** (acceso libre)
   - Baños, primeros auxilios, información
   - Puntos de carga de celulares
   - Acceso: Libre

6. **Zona de Pantallas Exteriores** (acceso libre)
   - Transmisión en vivo del escenario
   - Área de descanso
   - Acceso: Libre

## Especificaciones Técnicas

### Tipos TypeScript Requeridos
```typescript
interface MapHotspot {
  id: string;
  name: string;
  category: 'stage' | 'food' | 'service' | 'vip' | 'merchandise' | 'screen';
  coordinates: { x: number; y: number }; // Coordenadas en el SVG
  info: {
    description: string;
    schedule?: string;
    prices?: string[];
    access: 'free' | 'ticket' | 'vip';
    artists?: string[]; // Solo para escenario
    products?: string[]; // Solo para food/merchandise
  };
  icon: string; // Emoji o clase de icono
}

interface MapConfig {
  viewBox: string;
  hotspots: MapHotspot[];
}
```

### Componentes a Crear
1. **InteractiveMap.tsx** - Componente principal
2. **MapHotspot.tsx** - Componente individual de hotspot
3. **HotspotModal.tsx** - Modal de información
4. **festivalHotspots.ts** - Datos de los hotspots

### Requisitos de Diseño
- Usar CSS Modules (ya configurado)
- Responsive design (mobile-first)
- Estados hover/active para hotspots
- Animaciones suaves de transición
- Accesibilidad completa (ARIA labels, navegación por teclado)

### Integración con Datos Existentes
- Importar horarios desde `schedule.ts`
- Importar artistas desde `artists.ts`
- Importar productos desde `kiosk.ts`
- Mantener consistencia con el diseño actual

## Entregables Esperados
1. Componente InteractiveMap funcional
2. 6-8 hotspots implementados y probados
3. Modal responsive con información detallada
4. Estilos CSS modules optimizados
5. Integración completa con datos existentes
6. Tests básicos de funcionamiento

## Criterios de Aceptación
- [ ] El SVG se renderiza correctamente en todos los tamaños de pantalla
- [ ] Los hotspots son clickeables y muestran información relevante
- [ ] El modal se abre/cierra correctamente
- [ ] La navegación por teclado funciona
- [ ] Los datos se integran correctamente desde los archivos existentes
- [ ] El componente es accesible (screen readers)
- [ ] Performance: carga en menos de 2 segundos

¿Estás listo para comenzar con la implementación de la Fase 1?"
"# PROMPT FASE 2: Optimizaciones Ultra-Light - Festival DORA 2025

## Contexto
Tienes un mapa interactivo funcional de la Fase 1. Ahora necesitas optimizarlo para dispositivos de gama baja y conexiones lentas, implementando un Service Worker y detección adaptativa de dispositivos.

## Objetivo de la Fase 2
1. Implementar Service Worker para caché offline
2. Crear sistema de detección de capacidades del dispositivo
3. Desarrollar versión lightweight del mapa
4. Optimizar bundle size a menos de 50KB
5. Lograr Lighthouse score > 90

## Componentes a Desarrollar

### 1. Service Worker
- Caché de assets críticos (SVG, CSS, JS)
- Estrategia de caché: Cache First para assets, Network First para datos
- Funcionalidad offline completa
- Actualización automática de contenido

### 2. Hook useDeviceCapabilities
```typescript
interface DeviceCapabilities {
  isLowEnd: boolean;
  connectionSpeed: 'slow' | 'fast';
  memoryLimit: number;
  supportsWebP: boolean;
}
```

### 3. Componente AdaptiveMap
- Selecciona automáticamente entre InteractiveMap y LightweightMap
- Configuración dinámica de features
- Notificaciones de modo optimizado

### 4. LightweightMap
- Versión simplificada sin animaciones complejas
- Lazy loading de hotspots
- Imágenes optimizadas (WebP)
- Menos efectos visuales

## Métricas Objetivo
- Bundle size: < 50KB
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

## Criterios de Aceptación
- [ ] Service Worker implementado y funcional
- [ ] Detección de dispositivos funciona correctamente
- [ ] Versión lightweight carga en dispositivos lentos
- [ ] Bundle optimizado cumple métricas
- [ ] Funcionalidad offline completa
- [ ] Tests de performance pasando

¿Listo para optimizar el mapa para todos los dispositivos?"
"# PROMPT FASE 3: Sistema QR y Gamificación - Festival DORA 2025

## Contexto
Tienes un mapa interactivo optimizado. Ahora agregarás un sistema de gamificación con códigos QR que permita a los usuarios "coleccionar" ubicaciones del festival y ganar recompensas.

## Objetivo de la Fase 3
1. Implementar scanner de códigos QR
2. Sistema de puntos y logros
3. Persistencia de progreso (LocalStorage)
4. Mecánicas de gamificación
5. Sistema de recompensas

## Sistema de Recompensas Confirmado
- **Primer logro:** 5% descuento en bebidas (escanear 3 QR)
- **Logro completo:** 10% descuento en merchandise (escanear todos los QR)
- **Mensaje QR:** "Verifica tu punto en el Festival DORA"

## Ubicaciones de QR Codes
1. Puestos de comida (Kansas, Moka, Don Diego, Pochoclos)
2. Escenario principal
3. Zona VIP
4. Kiosco/Merchandising
5. Zona de pantallas exteriores
6. Área de servicios

## Componentes a Desarrollar

### 1. QRScanner Component
```typescript
interface QRScanResult {
  locationId: string;
  timestamp: Date;
  isValid: boolean;
}
```

### 2. Hook useGameProgress (Zustand)
```typescript
interface GameState {
  scannedLocations: string[];
  points: number;
  achievements: Achievement[];
  currentStreak: number;
  visitDate: string;
}
```

### 3. GameProgress Component
- Progreso visual del usuario
- Lista de logros desbloqueados
- Puntos acumulados
- Recompensas disponibles

### 4. Achievement System
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}
```

## Logros Definidos
1. **Primer Paso** - Escanear primer QR (Bienvenida)
2. **Foodie** - Escanear todos los puestos de comida (5% descuento bebidas)
3. **Explorador** - Escanear 5 ubicaciones diferentes
4. **Completista** - Escanear todos los QR (10% descuento merchandise)
5. **Madrugador** - Escanear antes de las 18:00
6. **Noctámbulo** - Escanear después de las 22:00

## Dependencias Nuevas
```bash
npm install html5-qrcode zustand
```

## Persistencia de Datos
- LocalStorage para progreso del usuario
- Backup opcional en sessionStorage
- Exportación de progreso como JSON
- No requiere base de datos (por ahora)

## Criterios de Aceptación
- [ ] QR Scanner funciona en diferentes dispositivos
- [ ] Sistema de puntos y logros operativo
- [ ] Persistencia de progreso funcional
- [ ] Recompensas se activan correctamente
- [ ] Manejo de errores robusto
- [ ] UX intuitiva para gamificación
- [ ] Tests de flujo completo

¿Listo para agregar la magia de la gamificación al mapa?"