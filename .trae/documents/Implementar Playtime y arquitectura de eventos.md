## Estado actual
- Framework y routing: Next.js App Router con TailwindCSS y tokens CSS.
- Home: `src/app/page.tsx:4` redirige a `/bienvenida`.
- Contenido principal: `src/app/bienvenida/page.tsx:1-24` renderiza `WelcomeComponent`, `HeroDecorations`, `Interlude`.
- Layout condicional: `src/components/ConditionalLayout/ConditionalLayout.tsx:11` excluye navbar/footer en `/bienvenida` y `/envivo`.
- Lineup y cronograma disponibles: `ArtistList`, `ArtistCard`, `ArtistCarousel`, `Schedule` y página `/lineup`.
- Theming global: tokens en `src/styles/tokens.css`, hook `src/hooks/useTheme.ts`.

## Objetivo
- Introducir `/playtime` como nueva edición en paralelo a `/ediciongroove`, con sistema de componentes reutilizables y theming por evento.
- Preparar rutas dinámicas y gestión de assets por evento para escalar a nuevas ediciones.

## Paso 1: Branch y movimiento de contenido
- Crear rama `feature/playtime`.
- Crear la página `/ediciongroove` que replique el contenido de `/bienvenida` (mismo layout sin navbar/footer) manteniendo funcionalidad.
- Ajustar `ConditionalLayout` para ocultar navbar también en `/ediciongroove` (igual que `/bienvenida`).
- Mantener `/bienvenida` operativa inicialmente; la raíz `/` seguirá redirigiendo a `/bienvenida` o a un evento por flag.

## Paso 2: Arquitectura de eventos (config + layout)
- Crear `src/events/types.ts` con `EventConfig` (slug, nombre, paleta, copy, lineup, assets, opciones de layout).
- Crear `src/events/ediciongroove/config.ts` y `src/events/playtime/config.ts` con sus configuraciones.
- Crear `src/events/index.ts` que exporte un `Record<string, EventConfig>` y helpers (`getEvent`, `listEvents`).
- Crear `src/components/events/EventLayout.tsx` como contenedor base con "slots" (props/children): `HeaderSlot`, `HeroSlot`, `LineupSlot`, `GallerySlot`, `CTASlot`, etc.

## Paso 3: Theming por evento
- Crear `src/components/events/EventThemeProvider.tsx` que:
  - Aplique overrides de CSS variables (inline style o clase) en un wrapper por evento.
  - Mapee `palette` del `EventConfig` a tokens (`--primary-color`, `--background`, `--foreground`, etc.).
- Extender `tokens.css` si es necesario con variables semánticas que los eventos puedan sobreescribir.

## Paso 4: Gestión de assets por evento
- Estructura en `public/assets/events/<slug>/**` (hero, banners desktop/mobile, gallery, press).
- Los `EventConfig` referencian rutas de assets; componentes consumen vía `props` desde config.

## Paso 5: Rutas dinámicas y páginas
- Crear `src/app/[event]/page.tsx` que:
  - Lea el `EventConfig` por `params.event` y renderice `EventLayout` + `EventThemeProvider`.
  - Exponga `generateStaticParams` para prerender `['ediciongroove','playtime']`.
- Mantener páginas dedicadas `/ediciongroove` y `/playtime` que usen el mismo mecanismo (o ser alias hacia `[event]`).

## Paso 6: Feature flags y visibilidad
- Crear `src/config/featureFlags.ts` con:
  - `enablePlaytime` (bool, desde `process.env.NEXT_PUBLIC_FEATURE_PLAYTIME` con default `false`).
  - `defaultEvent` (slug para `/`), con fallback a `bienvenida` o evento.
- Aplicar flags en:
  - `Navbar`: mostrar enlaces a `/playtime` y contenidos específicos de cada edición según flag.
  - `RootPage` (`src/app/page.tsx`): decidir redirección (`/bienvenida` o `/[event]`) según `defaultEvent`.
  - Middleware: no cambiar lógica de `/envivo`; flags afectan solo visibilidad/navegación.

## Paso 7: Composición y reutilización de componentes
- Adaptar `ArtistList`, `ArtistCarousel`, `Schedule` para aceptar `data` via props desde `EventConfig` (sin romper usos actuales).
- Crear componentes de base (hero, banners, CTA, destacados) parametrizables vía props y config.

## Paso 8: Despliegue y pruebas
- Mantener `/ediciongroove` y `/playtime` funcionando simultáneamente; navegación controlada por flags.
- Tests manuales y verificación visual en dev (`next dev`).
- Planificar merge `feature/playtime` → `main` tras QA.

## Paso 9: Escalabilidad y documentación
- Convenciones de naming:
  - Slug de evento en kebab-case (`playtime`, `ediciongroove`).
  - Assets en `public/assets/events/<slug>/...`.
  - Variables de palette en `EventConfig.palette` con nombres semánticos.
- Documentar "Cómo crear una nueva edición" (estructura de config, assets, theming, rutas). Se incluirá un `docs/creacion-ediciones.md` breve.

## Cambios de código previstos (resumen)
- Nuevos: `src/events/types.ts`, `src/events/<slug>/config.ts`, `src/events/index.ts`, `src/components/events/EventLayout.tsx`, `src/components/events/EventThemeProvider.tsx`, `src/app/[event]/page.tsx`, `src/config/featureFlags.ts`.
- Ajustes:
  - `src/app/ediciongroove/page.tsx` (nuevo) clon de `/bienvenida`.
  - `src/app/playtime/page.tsx` (nuevo) implementado con `EventLayout` y config.
  - `src/components/ConditionalLayout/ConditionalLayout.tsx` para ocultar navbar en `/ediciongroove`.
  - `src/app/page.tsx` para usar `defaultEvent` (sin romper `/envivo`).
  - `src/components/Navbar/Navbar.tsx` para enlaces condicionales por flags.

## Entregables iniciales
- Rama `feature/playtime` creada.
- `/ediciongroove` funcional replicando `/bienvenida`.
- `/playtime` funcional con theming y contenido inicial.
- Flags activos y documentación breve de nuevas ediciones.

¿Confirmas este plan para proceder con la implementación en la rama `feature/playtime`?