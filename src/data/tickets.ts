export interface TicketProps {
  title: string;
  features: string[];
  price: string;
  isSoldOut?: boolean;
  isCombo?: boolean;
  isComingSoon?: boolean;
  type: 'presale1' | 'presale2' |'general' | 'combo1' | 'combo2' | 'vip';
  availability: {
    startDate: string;
    endDate?: string;
    isVisible: boolean;
  };
}

export const ingresoLibre = {
  frases: [
    "Accede al patio de comidas y puestos interactivos",
    "Disfruta de los shows desde las pantallas",
    "Toma tu bebida favorita con amigos o familia",
    "Vive una experiencia única en Dora Edición del Groove"
  ],
  features: [
    "Patio de comidas con carpa y estufas",
    "Foodtrucks",
    "Barra de bebidas",
    "Pantalla exterior",
    "Puesto de hidratación",
    "Baños, Stands y Juegos"
  ],
  abonadoFeatures: [
    "Acceso al escenario",
    "Sector interior techado",
    "Livings chills",
    "Pantalla interior",
    "Sector de juegos interior",
    "Kit de bienvenida",
    "Sorteos exclusivos"
  ]
};
/* descripcionLarga: "Sumate a Dora: Edición Groove y viví una experiencia única en la ciudad. El ingreso libre te permite disfrutar del patio de comidas, puestos interactivos y juegos, mientras ves los shows en pantalla gigante y compartís momentos inolvidables con amigos, familia o pareja. ¡No te lo pierdas!"*/

export const tickets: TicketProps[] = [
    {
      title: "Preventa 1",  
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Precio promocional (45% OFF)"
      ],
      price: "$6.499",
      isSoldOut: false,
      type: 'presale1',
      availability: {
        startDate: "2025-06-10",
        endDate: "2025-06-28",
        isVisible: true
      }
    },
    {
      title: "Preventa 2", 
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Participacion en sorteos",
        "Precio promocional (35% OFF)"
      ],
      price: "$7.999",
      isSoldOut: false,
      type: 'presale2',
      availability: {
        startDate: "2025-06-28",
        endDate: "2025-07-15",
        isVisible: true
      }
    },
    {
      title: "Abono General",
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Participacion en sorteos"
      ],
      price: "$11.999",
      isSoldOut: false,
      type: 'general',
      availability: {
        startDate: "2025-07-15",
        isVisible: true
      }
    }
];
  
export const combos: TicketProps[] = [
    {
      title: "Combo Equipo",
      features: [
        "3 Accesos al escenario",
        "3 Accesos al sector techado vip",
        "3 Kits de bienvenida",
        "Descuento por Combo amigos (15% OFF)"
      ],
      price: "$28.999",
      isCombo: true,
      type: 'combo1',
      isSoldOut: false,
      availability: {
        startDate: "2025-03-01",
        isVisible: true
      }
    },
    {
      title: "Combo De a 2",
      features: [
        "2 Accesos al escenario",
        "2 Accesos al sector techado vip",
        "2 Kits de bienvenida",
        "Descuento por Combo Mano a Mano (20% OFF)"
      ],
      price: "$19.999",
      isCombo: true,
      type: 'combo2',
      isSoldOut: false,
      availability: {
        startDate: "2025-03-01",
        isVisible: true
      }
    }
];

export function updateTicketAvailability(tickets: TicketProps[]): TicketProps[] {
  const currentDate = new Date();

  return tickets.map(ticket => {
    const startDate = new Date(ticket.availability.startDate);
    const endDate = ticket.availability.endDate ? new Date(ticket.availability.endDate) : null;
    
    // Determinar el estado del ticket
    if (currentDate < startDate) {
      // Antes del startDate - mostrar como "próximamente"
      ticket.isComingSoon = true;
      ticket.availability.isVisible = true;
      ticket.isSoldOut = false;
    } else if (endDate && currentDate > endDate) {
      // Después del endDate - marcar como agotado
      ticket.isComingSoon = false;
      ticket.availability.isVisible = true;
      ticket.isSoldOut = true;
    } else {
      // Entre startDate y endDate (o sin endDate) - disponible para compra
      ticket.isComingSoon = false;
      ticket.availability.isVisible = true;
      ticket.isSoldOut = false;
    }
    
    return ticket;
  });
}