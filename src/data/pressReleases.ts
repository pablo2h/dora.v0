// Gacetillas de prensa del Festival DORA 2025
export interface PressRelease {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  content: string;
  version: 'v1' | 'v2';
  isActive: boolean;
}
var defaultDate = '2025-07-26';


// Gacetilla Versión 1 - Más formal
export const pressReleaseV1: PressRelease = {
  id: 1,
  title: "Festival DORA 2025 - Gacetilla de Prensa",
  subtitle: "Una nueva experiencia musical llega a Paraná, Entre Ríos",
  date: "2025-07-26",
  location: "Vieja Usina - Paraná, Entre Ríos",
  version: 'v1',
  isActive: true,
  content: `¡Atención! El Festival Dora llega el 26 de julio a La Vieja Usina de la Ciudad de Paraná para una tarde épica que no querrás perderte. Vení a disfrutar del festival con acceso libre y gratuito a una parte del predio, o podés vivir la experiencia Dora al máximo comprando tu abono en Passline. Con tu abono, accederás a los escenarios principales, la zona techada con gaseosas y todas las comodidades.

Prepárate para vibrar con la música de Rosario Smowing, Zaccaro y Los Puercos y La Tercera Fase del Plan en nuestro escenario principal. Además, contamos con más de 20 metros cuadrados de pantallas distribuidas en todo el festival para que no te pierdas ningún detalle. Si no podés venir, seguí los shows de las bandas a través de nuestro streaming en Barro VT.

Disfrutá la tarde en nuestro sector exterior, con un patio de comidas calefaccionado y un sector interior techado con gaseosas. ¡La experiencia Dora te espera!

Enterate de todo en nuestras redes @festivaldora y visitá dora.com.ar.`
};

// Gacetilla Versión 2 - Más cercana y amigable
export const pressReleaseV2: PressRelease = {
  id: 2,
  title: "Festival DORA: Edición Groove - Gacetilla de Prensa",
  subtitle: "Una tarde-noche inolvidable en el corazón de Paraná",
  date: "2025-07-26",
  location: "Vieja Usina - Paraná, Entre Ríos",
  version: 'v2',
  isActive: false,
  content: `Este sábado 26 de julio, la Vieja Usina de la Ciudad de Paraná se enciende para recibir al Festival Dora: Edición Groove. ¡Preparate para una tarde-noche inolvidable donde la música, la gastronomía y la diversión se encuentran para que vos y tus amigos vivan una experiencia única!

Queremos que te sumes a esta fiesta. Podés ingresar al predio sin costo y disfrutar del ambiente, el patio de comidas calefaccionado, la zona de foodtrucks y la pantalla exterior. O, si querés vivir la experiencia Dora al máximo, sumarte a los escenarios principales, acceder a los salones interiores y a la zona de juegos, comprá tu abono.

En nuestro escenario principal, vas a vibrar con la increíble música de Rosario Smowing, Zaccaro y Los Puercos y La Tercera Fase del Plan. Además, contaremos con más de 20 metros cuadrados de pantallas para que no te pierdas nada, y si sos de los que prefieren seguirlo desde casa, también lo transmitiremos en vivo por Barro VT.

¡Armá tu plan con amigos! En dora.com.ar vas a encontrar toda la información, y también combos especiales para 2 o 3 personas. Porque el Festival Dora es ese momento que estabas esperando para desconectar, disfrutar de buena compañía y crear recuerdos inolvidables.

¡Te esperamos para compartir una tarde de sábado épica en el corazón de Paraná!

Más información y abonos en dora.com.ar
Seguilos en redes: @festivaldora`
};

// Array con todas las gacetillas
export const pressReleases: PressRelease[] = [
  pressReleaseV1,
  pressReleaseV2
];

// Función para obtener la gacetilla activa
export const getActivePressRelease = (): PressRelease => {
  return pressReleases.find(release => release.isActive) || pressReleaseV1;
};

// Función para obtener gacetilla por ID
export const getPressReleaseById = (id: number): PressRelease | undefined => {
  return pressReleases.find(release => release.id === id);
};

// Función para cambiar la gacetilla activa
export const setActivePressRelease = (id: number): void => {
  pressReleases.forEach(release => {
    release.isActive = release.id === id;
  });
};

// Gacetilla por defecto (mantener compatibilidad)
export const defaultPressRelease = getActivePressRelease();