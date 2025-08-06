/**
 * Team members data for Festival DORA
 * Contains information about all team members excluding artists
 */

/**
 * Interface defining the structure for team member data
 */
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  bio: string;
  imageUrl: string;
  email: string;
}

/**
 * Array containing all team members data
 * Organized by categories: Dirección, Diseño y Redes, Desarrollo Web, and Staff
 */
export const teamMembers: TeamMember[] = [
  // Dirección
  {
    id: 1,
    name: "Pablo Rabaglia",
    role: "Director General",
    category: "Dirección",
    bio: "Director General del Festival Dora, coordinando todas las áreas del evento.",
    imageUrl: "/assets/images/placeholder.png",
    email: "pablo@festivaldora.com"
  },
  
  // Diseño y Redes
  {
    id: 2,
    name: "Daiana (Day) Roldan",
    role: "Diseño de identidad",
    category: "Diseño y Redes",
    bio: "Especialista en diseño de identidad visual y branding del festival.",
    imageUrl: "/assets/images/placeholder.png",
    email: "day@festivaldora.com"
  },
  {
    id: 3,
    name: "Nicolas (Titi) Copello",
    role: "Diseño Gráfico #2",
    category: "Diseño y Redes",
    bio: "Diseñador gráfico encargado de materiales promocionales y visuales.",
    imageUrl: "/assets/images/placeholder.png",
    email: "titi@festivaldora.com"
  },
  {
    id: 4,
    name: "Che Redes",
    role: "Community Manager",
    category: "Diseño y Redes",
    bio: "Responsable de la gestión de redes sociales y comunicación digital.",
    imageUrl: "/assets/images/placeholder.png",
    email: "che@festivaldora.com"
  },
  {
    id: 5,
    name: "Rodrigo Ronconi",
    role: "Fotografía",
    category: "Diseño y Redes",
    bio: "Fotógrafo oficial del festival, capturando los mejores momentos del evento.",
    imageUrl: "/assets/images/placeholder.png",
    email: "rodrigo@festivaldora.com"
  },
  
  // Desarrollo Web
  {
    id: 6,
    name: "Pablo Rabaglia",
    role: "No-Code Developer",
    category: "Desarrollo Web",
    bio: "Desarrollador especializado en soluciones no-code para la plataforma web del festival.",
    imageUrl: "/assets/images/placeholder.png",
    email: "pablo.dev@festivaldora.com"
  },
  
  // Staff
  {
    id: 7,
    name: "Azul Ruiz",
    role: "Staff #1",
    category: "Staff",
    bio: "Miembro del equipo de staff encargado de operaciones generales.",
    imageUrl: "/assets/images/placeholder.png",
    email: "azul@festivaldora.com"
  },
  {
    id: 8,
    name: "Aquiles Grassi (AKYLES)",
    role: "Staff #2",
    category: "Staff",
    bio: "Miembro del equipo de staff especializado en coordinación de actividades.",
    imageUrl: "/assets/images/placeholder.png",
    email: "akyles@festivaldora.com"
  },
  {
    id: 9,
    name: "Nicolas Cook",
    role: "Staff #3",
    category: "Staff",
    bio: "Miembro del equipo de staff encargado de soporte técnico y logístico.",
    imageUrl: "/assets/images/placeholder.png",
    email: "nicolas@festivaldora.com"
  },
  {
    id: 10,
    name: "Franco Alavarez",
    role: "Logística",
    category: "Staff",
    bio: "Responsable de la coordinación logística y montaje del festival.",
    imageUrl: "/assets/images/placeholder.png",
    email: "franco@festivaldora.com"
  },
  {
    id: 11,
    name: "Adriel Aranguren",
    role: "Barra #1",
    category: "Staff",
    bio: "Encargado de la gestión y operación de la barra principal del evento.",
    imageUrl: "/assets/images/placeholder.png",
    email: "adriel1@festivaldora.com"
  },
  {
    id: 12,
    name: "Adriel Aranguren",
    role: "Barra #2",
    category: "Staff",
    bio: "Encargado de la gestión y operación de la barra secundaria del evento.",
    imageUrl: "/assets/images/placeholder.png",
    email: "adriel2@festivaldora.com"
  }
];

/**
 * Helper function to get team members by category
 * @param category - The category to filter by
 * @returns Array of team members in the specified category
 */
export const getTeamMembersByCategory = (category: string): TeamMember[] => {
  return teamMembers.filter(member => member.category === category);
};

/**
 * Helper function to get all unique categories
 * @returns Array of unique category names
 */
export const getTeamCategories = (): string[] => {
  return [...new Set(teamMembers.map(member => member.category))];
};

/**
 * Helper function to get team member by ID
 * @param id - The ID of the team member
 * @returns Team member object or undefined if not found
 */
export const getTeamMemberById = (id: number): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};