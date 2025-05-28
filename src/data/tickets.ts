export interface TicketProps {
  title: string;
  price: string;
  features: string[];
  isSoldOut?: boolean;
  isCombo?: boolean;
  type: 'presale' | 'general' | 'combo1' | 'combo2' | 'vip';
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
 /* descripcionLarga: "Sumate a Dora: Edición Groove y viví una experiencia única en la ciudad. El ingreso libre te permite disfrutar del patio de comidas, puestos interactivos y juegos, mientras ves los shows en pantalla gigante y compartís momentos inolvidables con amigos, familia o pareja. ¡No te lo pierdas!"*/
};

export const tickets: TicketProps[] = [
    {
      title: "Preventa 1", 
      price: "$6.599",
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Precio promocional (45% OFF)"
      ],
      isSoldOut: false,
      type: 'presale',
      availability: {
        startDate: "2024-03-01",
        endDate: "2024-04-20",
        isVisible: true
      }
    },
    {
      title: "Preventa 2", 
      price: "$7.999",
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Participacion en sorteos",
        "Precio promocional (35% OFF)"
      ],
      isSoldOut: false,
      type: 'presale',
      availability: {
        startDate: "2024-04-20",
        endDate: "2024-05-20",
        isVisible: false
      }
    },
    {
      title: "Entrada General",
      price: "$11.999",
      features: [
        "Acceso al escenario",
        "Acceso al sector techado vip",
        "Pack de stickers",
        "Pasaporte Dora",
        "Participacion en sorteos",
      ],
      isSoldOut: false,
      type: 'general',
      availability: {
        startDate: "2024-05-20",
        isVisible: false
      }
    },
];
  
export const combos: TicketProps[] = [
    {
      title: "Combo Grupo",
      price: "$28.999",
      features: [
        "3 Accesos al escenario",
        "3 Accesos al sector techado vip",
        "3 Kits de bienvenida",
        "15% de descuento por Combo amigos"
      ],
      isCombo: true,
      type: 'combo1',
      isSoldOut: false,
      availability: {
        startDate: "2024-03-01",
        isVisible: true
      }
    },
    {
      title: "Combo Mano a Mano",
      price: "$19.999",
      features: [
        "2 Accesos al escenario",
        "2 Accesos al sector techado vip",
        "2 Kits de bienvenida",
        "20% de descuento por Combo Mano a Mano"
      ],
      isCombo: true,
      type: 'combo2',
      isSoldOut: false,
      availability: {
        startDate: "2024-03-01",
        isVisible: true
      }
    }
];

export function updateTicketAvailability(tickets: TicketProps[]): TicketProps[] {
  const currentDate = new Date();

  return tickets.map(ticket => {
    const startDate = new Date(ticket.availability.startDate);
    const endDate = ticket.availability.endDate ? new Date(ticket.availability.endDate) : null;
    
    // Actualizar visibilidad basada en las fechas
    ticket.availability.isVisible = currentDate >= startDate;
    
    // Actualizar soldOut si ha pasado la fecha final
    if (endDate && currentDate > endDate) {
      ticket.isSoldOut = true;
    }
    
    return ticket;
  });
}