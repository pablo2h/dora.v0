This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Festival Dora - Sitio Web Oficial

Sitio web oficial del Festival Dora, un evento musical que celebra la diversidad artística y cultural.

## Características

### 🎵 **Sitio Web Público**
- **Página Principal**: Hero section con información del festival
- **Lineup**: Lista de artistas participantes
- **Entradas**: Información sobre tickets y precios
- **Sponsors**: Sección para patrocinadores y planes de sponsorship
- **Prensa**: Kit de prensa y recursos para medios
- **FAQ**: Preguntas frecuentes
- **Formularios de Contacto**: Múltiples formularios para diferentes propósitos
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop

### 🔐 **Módulo Administrativo**
- **Panel de Control**: Dashboard con métricas en tiempo real
- **Gestión de Mensajes**: CRUD completo de mensajes de contacto
- **Sistema de Autenticación**: Login seguro con JWT
- **Middleware de Seguridad**: Doble capa de protección
- **Asignación de Tareas**: Gestión de administradores y asignaciones
- **Filtros Avanzados**: Búsqueda y filtrado de mensajes
- **Reportes**: Análisis de rendimiento y métricas

## Tecnologías

### 🌐 **Frontend**
- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hook Form**: Manejo de formularios
- **ESLint**: Linting de código

### 🔧 **Backend & Base de Datos**
- **Next.js API Routes**: APIs RESTful integradas
- **Prisma ORM**: Object-Relational Mapping
- **Neon PostgreSQL**: Base de datos en la nube
- **bcrypt**: Hashing de contraseñas

### 🔐 **Seguridad & Autenticación**
- **JWT (jsonwebtoken)**: Tokens de autenticación para APIs
- **jose**: Verificación JWT optimizada para Edge Runtime
- **Middleware multicapa**: Protección de páginas y APIs

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

## Uso

### 🌐 **Sitio Web Público**
1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

### 🔐 **Módulo Administrativo**
1. Accede al panel administrativo:
   ```
   http://localhost:3000/admin/dashboard
   ```

2. Credenciales de prueba:
   ```
   Email: admin@festivaldora.com
   Password: admin123
   ```

### 🧪 **Testing**
1. Ejecutar tests individuales:
   ```bash
   node tests/testPhase1.js  # Test de base de datos
   node tests/testPhase2.js  # Test de APIs
   node tests/testPhase3.js  # Test de frontend
   ```

2. Ejecutar todos los tests:
   ```bash
   node tests/runAllTests.js
   ```

### 🚀 **Producción**
1. Para construir para producción:
   ```bash
   npm run build
   npm start
   ```

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
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── admin/          # 🔐 Módulo administrativo
│   │   │   ├── dashboard/  # Panel de control
│   │   │   ├── messages/   # Gestión de mensajes
│   │   │   └── layout.tsx  # Layout del admin
│   │   ├── api/            # API routes
│   │   │   └── admin/      # APIs administrativas
│   │   ├── entradas/       # Página de entradas
│   │   ├── faq/            # Página de FAQ
│   │   ├── lineup/         # Página de lineup
│   │   ├── prensa/         # Kit de prensa
│   │   └── sponsors/       # Página de sponsors
│   ├── components/         # Componentes reutilizables
│   │   ├── Formulario/     # Componentes de formularios
│   │   ├── Navbar/         # Navegación
│   │   ├── Footer/         # Pie de página
│   │   └── ...
│   ├── lib/               # Utilidades y configuración
│   │   └── auth/          # Middleware de autenticación
│   ├── data/              # Datos estáticos
│   └── styles/            # Estilos globales
├── tests/                 # 🧪 Scripts de testing
│   ├── testPhase1.js      # Test de base de datos
│   ├── testPhase2.js      # Test de APIs
│   ├── testPhase3.js      # Test de frontend
│   ├── runAllTests.js     # Ejecutor de todos los tests
│   └── README.md          # Documentación de tests
├── docs/                  # 📚 Documentación técnica
│   ├── README_FASE1.md    # Documentación Fase 1
│   ├── README_FASE2.md    # Documentación Fase 2
│   ├── DORA_ADMIN_INTEGRATION_SUMMARY.md  # Resumen completo
│   └── README.md          # Índice de documentación
├── database/              # 🗄️ Scripts de base de datos
├── scripts/               # 🔧 Scripts de utilidad
├── middleware.js          # 🛡️ Middleware global de seguridad
└── package.json           # Dependencias del proyecto
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

## 📚 Documentación

La documentación técnica completa se encuentra en la carpeta `docs/`:

- **[docs/README.md](docs/README.md)**: Índice general de documentación
- **[docs/README_FASE1.md](docs/README_FASE1.md)**: Documentación de la base de datos
- **[docs/README_FASE2.md](docs/README_FASE2.md)**: Documentación de APIs
- **[docs/DORA_ADMIN_INTEGRATION_SUMMARY.md](docs/DORA_ADMIN_INTEGRATION_SUMMARY.md)**: Resumen completo del módulo administrativo
- **[tests/README.md](tests/README.md)**: Guía de testing

## 🔧 Desarrollo

### Arquitectura del Sistema
- **Frontend**: Next.js 15 con TypeScript y Tailwind CSS
- **Backend**: Next.js API Routes con Prisma ORM
- **Base de Datos**: Neon PostgreSQL
- **Autenticación**: JWT con doble middleware (jose + jsonwebtoken)
- **Testing**: Scripts automatizados para validación completa

### Flujo de Desarrollo
1. **Desarrollo local**: `npm run dev`
2. **Testing**: `node tests/runAllTests.js`
3. **Build**: `npm run build`
4. **Deploy**: `npm start`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

- **Documentación técnica**: Consulta la carpeta `docs/`
- **Tests**: Ejecuta `node tests/runAllTests.js` para validar el sistema
- **Issues**: Reporta problemas en el repositorio

## Contacto

- **Email**: consultas@dora.com.ar
- **Website**: [Festival Dora](https://dora.com.ar)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Festival Dora** - Celebrando la diversidad artística y cultural 🎵
