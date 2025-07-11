This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Festival Dora - Sitio Web Oficial

Sitio web oficial del Festival Dora, un evento musical que celebra la diversidad artística y cultural.

## Características

- **Página Principal**: Hero section con información del festival
- **Lineup**: Lista de artistas participantes
- **Entradas**: Información sobre tickets y precios
- **Sponsors**: Sección para patrocinadores y planes de sponsorship
- **Prensa**: Kit de prensa y recursos para medios
- **FAQ**: Preguntas frecuentes
- **Formularios de Contacto**: Múltiples formularios para diferentes propósitos
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop

## Tecnologías

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hook Form**: Manejo de formularios
- **ESLint**: Linting de código

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd dora.v0
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos (si aplica)
DATABASE_URL=your_database_url

# APIs externas (si aplica)
API_KEY=your_api_key
```

## Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── api/            # API routes
│   ├── blog/           # Página de blog
│   ├── entradas/       # Página de entradas
│   ├── faq/            # Página de FAQ
│   ├── info/           # Información del festival
│   ├── lineup/         # Página de lineup
│   ├── prensa/         # Kit de prensa
│   └── sponsors/       # Página de sponsors
├── components/         # Componentes reutilizables
│   ├── Formulario/     # Componentes de formularios
│   ├── Navbar/         # Navegación
│   ├── Footer/         # Pie de página
│   └── ...
├── data/              # Datos estáticos
└── styles/            # Estilos globales
```

## Componentes Principales

- **BaseForm**: Componente base para formularios con tipos genéricos
- **ContactForm**: Formulario de contacto general
- **SponsorsForm**: Formulario para patrocinadores
- **DiscountForm**: Formulario para descuentos
- **ArtistCard**: Tarjeta de artista
- **TicketCard**: Tarjeta de entrada

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/tu-usuario/festival-dora.git
git push -u origin main
```

2. Ve a [Vercel](https://vercel.com) y conecta tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Next.js
4. Configura las variables de entorno si las necesitas
5. Haz clic en "Deploy"

### Opción 2: Vercel CLI

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Inicia sesión en Vercel:
```bash
vercel login
```

3. Despliega el proyecto:
```bash
vercel
```

4. Para despliegues de producción:
```bash
vercel --prod
```

### Variables de Entorno en Vercel

En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:
- `DATABASE_URL` (si usas base de datos)
- `API_KEY` (si usas APIs externas)
- Cualquier otra variable que necesites

## Contacto

- **Email**: consultas@dora.com.ar
- **Website**: [Festival Dora](https://dora.com.ar)

## Licencia

Este proyecto está bajo la Licencia MIT.
