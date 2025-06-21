// Datos de noticias para la página de prensa
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  attachedImages?: string[];
  publishDate: string;
  author: string;
  category: 'festival' | 'artists' | 'sponsors' | 'general';
  featured: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "DORA Festival 2024: Una nueva experiencia musical llega a Paraná",
    description: "El festival que revolucionará la escena musical de Entre Ríos se prepara para su primera edición con artistas locales y nacionales.",
    content: "El Festival DORA se posiciona como el evento musical más esperado del año en Paraná, Entre Ríos. Con una propuesta que combina música en vivo, gastronomía local y entretenimiento familiar, el festival promete ser una experiencia única para toda la comunidad.\n\nLa primera edición contará con la participación de destacados artistas como Rosario Smowing, La Tercera Fase del Plan y Zacaro y los Puerkos, quienes ofrecerán shows únicos en el escenario principal ubicado en la histórica Vieja Usina.\n\nEl evento se realizará el sábado 26 de julio de 18:00 a 23:00 horas, con entrada libre al predio general y abonos disponibles para acceder al sector VIP techado.",
    coverImage: "/assets/images/news-festival-announcement.jpg",
    publishDate: "2024-01-15",
    author: "Equipo DORA",
    category: "festival",
    featured: true
  },
  {
    id: 2,
    title: "Confirmados los primeros artistas del lineup DORA 2024",
    description: "Rosario Smowing, La Tercera Fase del Plan y Zacaro y los Puerkos encabezarán la grilla musical del festival.",
    content: "La organización del Festival DORA confirma oficialmente los primeros artistas que formarán parte del lineup 2024. La diversidad musical será uno de los pilares del evento, ofreciendo desde swing y ska hasta rock crudo y propuestas teatrales.\n\nRosario Smowing aportará su característico estilo que combina swing, ska, rock y crooner, prometiendo una fiesta musical única. La Tercera Fase del Plan traerá su energía rock cruda y juvenil con influencias surf, mientras que Zacaro y los Puerkos ofrecerán su propuesta teatral y energética de fusión.\n\nLa grilla continuará completándose en las próximas semanas con más sorpresas musicales.",
    publishDate: "2024-02-01",
    author: "Equipo DORA",
    category: "artists",
    featured: true
  },
  {
    id: 3,
    title: "Abierta la convocatoria para sponsors del Festival DORA",
    description: "Las empresas interesadas en formar parte del festival pueden acceder a diferentes planes de patrocinio adaptados a sus necesidades.",
    content: "El Festival DORA abre oficialmente la convocatoria para empresas y marcas que deseen formar parte de esta experiencia cultural única en Paraná. La propuesta incluye diferentes niveles de patrocinio diseñados para adaptarse a las necesidades y presupuestos de cada sponsor.\n\nLos planes disponibles incluyen desde presencia en redes sociales y material gráfico hasta espacios exclusivos en el predio del festival. Cada nivel de patrocinio ofrece beneficios específicos que permiten a las marcas conectar de manera auténtica con la audiencia del festival.\n\nLas empresas interesadas pueden contactar al equipo organizador a través del formulario disponible en el sitio web oficial.",
    publishDate: "2024-02-10",
    author: "Equipo DORA",
    category: "sponsors",
    featured: false
  }
];

// Función para obtener noticias destacadas
export const getFeaturedNews = (): NewsItem[] => {
  return newsData.filter(news => news.featured);
};

// Función para obtener noticias por categoría
export const getNewsByCategory = (category: NewsItem['category']): NewsItem[] => {
  return newsData.filter(news => news.category === category);
};

// Función para obtener una noticia por ID
export const getNewsById = (id: number): NewsItem | undefined => {
  return newsData.find(news => news.id === id);
};