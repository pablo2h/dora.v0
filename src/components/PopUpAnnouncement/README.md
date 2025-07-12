# Componente PopUpAnnouncement

Este componente permite crear anuncios emergentes (popups) que se muestran cuando el usuario hace scroll hasta un elemento específico en la página. Es completamente reutilizable y funciona tanto en dispositivos móviles como en web.

## Características

- **Activación por scroll**: Se muestra automáticamente cuando el usuario hace scroll hasta un elemento específico.
- **Personalizable**: Permite personalizar el contenido, estilos y comportamiento.
- **Responsive**: Diseñado para verse bien en dispositivos móviles y web.
- **Animaciones**: Incluye animaciones suaves de entrada y salida.
- **Cierre fácil**: Se puede cerrar haciendo clic en el botón de cierre o fuera del popup.
- **Cierre automático**: Opción para cerrar automáticamente después de un tiempo determinado.

## Componentes disponibles

### 1. PopUpAnnouncement

Componente base que maneja la lógica de mostrar/ocultar el popup basado en el scroll.

```tsx
import { PopUpAnnouncement } from '@/components/PopUpAnnouncement';

<PopUpAnnouncement
  targetElementId="miElemento"
  showImmediately={false}
  delayMs={500}
  onClose={() => console.log('Popup cerrado')}
  autoClose={false}
  closeTimeoutMs={5000}
>
  <div>Contenido del popup</div>
</PopUpAnnouncement>
```

### 2. PopUpAnnouncementExample

Ejemplo predefinido con título, mensaje y botón de acción.

```tsx
import { PopUpAnnouncementExample } from '@/components/PopUpAnnouncement';

<PopUpAnnouncementExample
  title="¡Oferta especial!"
  message="Aprovecha nuestro descuento exclusivo."
  actionUrl="/descuentos"
  actionText="Ver oferta"
  targetElementId="miElemento"
  showImmediately={false}
/>
```

### 3. PopUpDiscountForm

Componente especializado para formularios de descuento que permite a los usuarios ingresar su email directamente en el popup.

```tsx
import { PopUpDiscountForm } from '@/components/PopUpAnnouncement';

<PopUpDiscountForm
  title="¡Descuento especial!"
  message="¡Obtén un 15% de descuento en tus entradas! Ingresa tu email y recibe tu código promocional."
  showImmediately={true}
/>
```

### 4. GenericPopUp

Componente genérico que permite insertar cualquier contenido en el popup.

```tsx
import { GenericPopUp } from '@/components/PopUpAnnouncement';

<GenericPopUp
  title="Título personalizado"
  targetElementId="miElemento"
  showImmediately={false}
  delayMs={500}
  autoClose={false}
  closeTimeoutMs={5000}
>
  <div>Cualquier contenido personalizado aquí</div>
</GenericPopUp>
```

## Propiedades

### PopUpAnnouncement

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| children | ReactNode | Contenido del popup | (requerido) |
| targetElementId | string | ID del elemento que activará el popup | undefined |
| className | string | Clase CSS personalizada | '' |
| showImmediately | boolean | Si es true, el popup se muestra inmediatamente | false |
| delayMs | number | Tiempo en ms antes de mostrar el popup | 500 |
| onClose | function | Callback al cerrar el popup | undefined |
| autoClose | boolean | Si es true, se cierra automáticamente | false |
| closeTimeoutMs | number | Tiempo en ms antes de cerrar automáticamente | 5000 |

## Ejemplos de uso

### Ejemplo 1: Popup de descuento

```tsx
import { CtaDiscountWithPopUp } from '@/components/Formulario/descuento/CtaDiscount';

// En tu componente o página
<CtaDiscountWithPopUp />
```

### Ejemplo 2: Popup personalizado con formulario

```tsx
import { GenericPopUp } from '@/components/PopUpAnnouncement';
import MiFormulario from '@/components/MiFormulario';

// En tu componente o página
<div id="seccionFormulario">
  {/* Contenido de la sección */}
</div>

<GenericPopUp
  title="Completa nuestro formulario"
  targetElementId="seccionFormulario"
>
  <MiFormulario />
</GenericPopUp>
```

### Ejemplo 3: Popup inmediato al cargar la página

```tsx
import { PopUpAnnouncementExample } from '@/components/PopUpAnnouncement';

// En tu componente o página
<PopUpAnnouncementExample
  title="¡Bienvenido a nuestro sitio!"
  message="Descubre todas nuestras novedades."
  actionUrl="/novedades"
  actionText="Ver novedades"
  showImmediately={true}
/>
```

## Notas de implementación

- Asegúrate de que el elemento con el ID especificado en `targetElementId` exista en el DOM.
- Para usar el popup en múltiples lugares, puedes crear componentes envoltorio como `CtaDiscountWithPopUp`.
- El popup se mostrará solo una vez por sesión (hasta que se recargue la página).