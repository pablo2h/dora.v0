# Análisis Completo y Detallado del Proyecto Festival DORA 2025

## 🏗️ **ARQUITECTURA TECNOLÓGICA GENERAL**

### **Stack Tecnológico Principal**
- **Framework:** Next.js 14.2.15 (App Router)
- **Lenguaje:** TypeScript 5.x con configuración estricta
- **Runtime:** React 18.3.1 con React DOM
- **Estilos:** Tailwind CSS 3.4.1 + CSS Modules + CSS Custom Properties
- **Base de Datos:** Neon PostgreSQL con @neondatabase/serverless
- **ORM:** Prisma 6.8.2 con Prisma Client y Accelerate Extension
- **Animaciones:** Framer Motion 12.4.7
- **Iconografía:** Heroicons/React 2.2.0 + React Icons 5.5.0
- **Carruseles:** Swiper 11.2.4
- **Email:** Nodemailer 7.0.3 + Resend 4.5.1
- **Optimización de Imágenes:** Sharp 0.34.2
- **Analytics:** Vercel Analytics 1.5.0
- **PWA:** Service Worker personalizado

---

## 🎨 **SISTEMA DE DISEÑO Y ESTILOS**

### **Design Tokens Centralizados** (<mcfile name="tokens.css" path="src/styles/tokens.css"></mcfile>)
- **Paleta de Colores DORA:** 9 colores principales del festival
  - `--dora-pink: #FC95BB`
  - `--dora-yellow: #F5C92B`
  - `--dora-orange: #FA8632`
  - `--dora-red: #F05B31`
  - `--dora-blue: #0083CF`
  - `--dora-light-blue: #80C7D9`
  - `--dora-green: #2DB092`
  - `--dora-black: #000000`
  - `--dora-white: #F7F5F6`

### **Sistema Tipográfico**
- **Primaria:** DynaPuff (Google Fonts) - Títulos principales
- **Secundaria:** Baloo 2 (Google Fonts) - Subtítulos
- **Cuerpo:** Poppins (Google Fonts) - Texto general
- **Variables CSS:** `--font-dynapuff`, `--font-baloo2`, `--font-poppins`

### **Tema Dual (Claro/Oscuro)**
- **Hook personalizado:** <mcsymbol name="useTheme" filename="useTheme.ts" path="src/hooks/useTheme.ts" startline="6" type="function"></mcsymbol>
- **Persistencia:** localStorage con clave `dora-theme`
- **Implementación:** CSS Custom Properties con clases `.light-theme` y `.dark-theme`

### **Sistema de Espaciado y Layout**
- **Espaciados:** 8 niveles (xs: 4px → 4xl: 64px)
- **Border Radius:** 7 niveles (sm: 4px → full: 50%)
- **Sombras:** 4 niveles con opacidades variables
- **Z-index:** Sistema jerárquico (dropdown: 1000 → tooltip: 1070)

---

## 🏛️ **ARQUITECTURA DE APLICACIÓN**

### **Estructura Next.js App Router**
```
src/app/
├── layout.tsx          # Layout raíz con fuentes y providers
├── page.tsx           # Página principal
├── api/               # API Routes
│   └── test-db/       # Endpoint de prueba de BD
├── bienvenida/        # Página de bienvenida
├── entradas/          # Página de entradas
├── faq/              # Página de FAQ
├── inicio/           # Página de inicio
├── lineup/           # Página de lineup
├── mapa/             # Sistema de mapas
│   ├── page.tsx      # Mapa Google Maps
│   └── interactivo/  # Mapa interactivo SVG
├── playlist/         # Página de playlist
├── prensa/          # Página de prensa
└── sponsors/        # Página de sponsors
```

### **Sistema de Layout Condicional**
- **Componente:** <mcsymbol name="ConditionalLayout" filename="ConditionalLayout.tsx" path="src/components/ConditionalLayout/ConditionalLayout.tsx" startline="7" type="function"></mcsymbol>
- **Funcionalidad:** Oculta navbar/footer en páginas específicas (ej: `/bienvenida`)
- **Navegación:** <mcfile name="Navbar.tsx" path="src/components/Navbar/Navbar.tsx"></mcfile> con menú hamburguesa responsive

---

## 🗃️ **GESTIÓN DE DATOS**

### **Base de Datos PostgreSQL (Neon)**
- **Esquemas:** `usuarios` (principal) + `public` (compatibilidad)
- **Tablas principales:**
  - `usuariosdb` - Usuarios registrados
  - `mensajes` - Mensajes de contacto
  - `consultas` - Consultas generales
  - `descuentos` - Solicitudes de descuentos
  - `patrocinios` - Solicitudes de patrocinio
  - `emails` - Lista de emails (compatibilidad)

### **Estructura de Datos Tipada**
- **Artistas:** <mcfile name="artists.ts" path="src/data/artists.ts"></mcfile> - 7 artistas con Spotify/YouTube IDs
- **Hotspots del Mapa:** <mcfile name="festivalHotspots.ts" path="src/data/festivalHotspots.ts"></mcfile> - 6 puntos interactivos
- **Tipos TypeScript:** <mcfile name="map.ts" path="src/types/map.ts"></mcfile> - Interfaces para mapas
- **Planes de Patrocinio:** <mcfile name="sponsorshipPlans.ts" path="src/data/sponsorshipPlans.ts"></mcfile>
- **Kits de Prensa:** <mcfile name="pressKits.ts" path="src/data/pressKits.ts"></mcfile>

---

## 🎯 **FUNCIONALIDADES PRINCIPALES**

### **1. Sistema de Mapas Dual**
- **Mapa Estático:** Google Maps iframe en `/mapa`
- **Mapa Interactivo:** SVG con hotspots clickeables en `/mapa/interactivo`
- **Componentes:**
  - <mcfile name="Mapa.tsx" path="src/components/Mapa/Mapa.tsx"></mcfile> - Google Maps
  - <mcfile name="InteractiveMap.tsx" path="src/components/MapaLegacy/InteractiveMap.tsx"></mcfile> - SVG interactivo
  - <mcfile name="MapHotspot.tsx" path="src/components/MapaLegacy/MapHotspot.tsx"></mcfile> - Puntos clickeables
  - <mcfile name="HotspotModal.tsx" path="src/components/MapaLegacy/HotspotModal.tsx"></mcfile> - Modales informativos

### **2. Sistema de Formularios**
- **Arquitectura:** Componente base reutilizable <mcfile name="BaseForm.tsx" path="src/components/Formulario/BaseForm/BaseForm.tsx"></mcfile>
- **Hook personalizado:** `useFormHandler` para validación y envío
- **Tipos específicos:** SponsorsForm, GeneralForm
- **Integración:** Nodemailer + Resend para envío de emails

### **3. Animaciones de Fondo**
- **Servicio:** <mcsymbol name="FloatingAnimationService" filename="floatingAnimations.ts" path="src/services/floatingAnimations.ts" startline="25" type="class"></mcsymbol>
- **Elementos:** SVGs de flores DORA flotantes
- **Física:** Sistema de rebote tipo "DVD screensaver"
- **Optimización:** 30 FPS con requestAnimationFrame

### **4. PWA (Progressive Web App)**
- **Service Worker:** <mcfile name="sw.js" path="public/sw.js"></mcfile>
- **Registro:** <mcfile name="ServiceWorkerRegistration.tsx" path="src/components/ServiceWorkerRegistration.tsx"></mcfile>
- **Manifest:** <mcfile name="site.webmanifest" path="public/site.webmanifest"></mcfile>

### **5. Sistema de Navegación**
- **Navbar responsive:** Menú hamburguesa con overlay completo
- **Enlaces externos:** Spotify y YouTube playlists
- **Scroll detection:** Navbar cambia apariencia al hacer scroll
- **Accesibilidad:** ARIA labels y navegación por teclado

---

## 🔧 **HOOKS Y UTILIDADES PERSONALIZADAS**

### **Hooks Desarrollados**
- **`useTheme`:** Gestión de tema claro/oscuro con persistencia
- **`useFormHandler`:** Validación y envío de formularios
- **`useFilter`:** Filtrado de contenido
- **`useSwipeGesture`:** Gestos táctiles para carruseles

### **Servicios**
- **`FloatingAnimationService`:** Animaciones de fondo
- **API Routes:** Conexión con base de datos Neon

---

## 📱 **RESPONSIVE DESIGN Y ACCESIBILIDAD**

### **Breakpoints Tailwind**
- **sm:** 640px
- **md:** 768px  
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### **Características de Accesibilidad**
- **ARIA labels** en componentes interactivos
- **Navegación por teclado** en mapas y modales
- **Focus management** en modales
- **Contraste** optimizado para ambos temas
- **Semantic HTML** en toda la aplicación

---

## 🚀 **OPTIMIZACIONES Y RENDIMIENTO**

### **Optimizaciones de Imágenes**
- **Next.js Image:** Lazy loading automático
- **Sharp:** Procesamiento de imágenes
- **Formatos:** WebP con fallback

### **Optimizaciones de Código**
- **Code splitting:** Automático con App Router
- **Tree shaking:** Eliminación de código no utilizado
- **CSS Modules:** Estilos con scope local
- **TypeScript estricto:** Detección temprana de errores

### **Optimizaciones de Animaciones**
- **requestAnimationFrame:** 30 FPS para animaciones fluidas
- **CSS transforms:** Hardware acceleration
- **Debouncing:** En eventos de scroll

---

## 🔒 **SEGURIDAD Y CONFIGURACIÓN**

### **Variables de Entorno**
- `NEON_DATABASE_URL` - Conexión a base de datos
- `RESEND_API_KEY` - Servicio de email
- `NODEMAILER_*` - Configuración SMTP

### **Configuración TypeScript**
- **Target:** ES2017
- **Strict mode:** Habilitado
- **Path mapping:** `@/*` para `./src/*`
- **JSX:** preserve (Next.js handling)

---

## 📊 **LIMITACIONES Y CONSIDERACIONES**

### **Limitaciones Técnicas**
1. **Base de datos:** Dependiente de Neon PostgreSQL
2. **Mapas:** SVG estático (no geolocalización real)
3. **Emails:** Dependiente de servicios externos
4. **Animaciones:** Intensivas en CPU en dispositivos antiguos

### **Escalabilidad**
- **Componentes modulares:** Fácil extensión
- **Design tokens:** Sistema de diseño escalable
- **TypeScript:** Mantenibilidad a largo plazo
- **API Routes:** Preparado para microservicios

### **Dependencias Críticas**
- **Next.js 14:** Framework principal
- **Tailwind CSS:** Sistema de estilos
- **Neon:** Base de datos
- **Vercel:** Plataforma de despliegue recomendada

Este proyecto representa una aplicación web moderna y completa para un festival musical, con arquitectura escalable, diseño responsive, y funcionalidades avanzadas como mapas interactivos, formularios dinámicos, y sistema de temas.
        