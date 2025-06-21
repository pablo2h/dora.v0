// Datos de documentos PDF para sponsors

export interface PDFDocument {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: 'info' | 'pricing' | 'types';
  icon?: string;
  size?: string;
  pages?: number;
}

export const pdfDocuments: PDFDocument[] = [
  {
    id: 'que-es-dora',
    title: '¿Qué es DORA?',
    description: 'Conoce todo sobre el Festival DORA, su historia, misión y visión.',
    filename: 'Que es FestivalDora.pdf',
    category: 'info'
  },
  {
    id: 'tipos-sponsor',
    title: 'Tipos de Sponsor',
    description: 'Descubre los diferentes niveles de patrocinio disponibles.',
    filename: 'Tipos de sponsor Dora 2025.pdf',
    category: 'types'
  },
  {
    id: 'planilla-precios',
    title: 'Planilla de Precios',
    description: 'Información detallada sobre precios y paquetes de patrocinio.',
    filename: 'Planilla Precios Dora 2025.pdf',
    category: 'pricing'
  },

];

// Función para obtener documentos por categoría
export const getDocumentsByCategory = (category: string): PDFDocument[] => {
  return pdfDocuments.filter(doc => doc.category === category);
};

// Función para obtener un documento específico
export const getDocumentById = (id: string): PDFDocument | undefined => {
  return pdfDocuments.find(doc => doc.id === id);
};

// Función para obtener todas las categorías disponibles
export const getAvailableCategories = (): string[] => {
  return Array.from(new Set(pdfDocuments.map(doc => doc.category)));
};

// Configuración de categorías con metadatos
export const categoryConfig = {
  info: {
    name: 'Información del Festival',
    description: 'Conoce más sobre el Festival Dora',
    icon: '📋',
    color: '#667eea'
  },
  pricing: {
    name: 'Planilla de Precios',
    description: 'Precios y modalidades de patrocinio',
    icon: '💰',
    color: '#48bb78'
  },
  types: {
    name: 'Tipos de Sponsor',
    description: 'Categorías y beneficios disponibles',
    icon: '🎯',
    color: '#ed8936'
  }
};

// Función para obtener estadísticas de documentos
export const getDocumentStats = () => {
  const totalDocuments = pdfDocuments.length;
  const totalPages = pdfDocuments.reduce((sum, doc) => sum + (doc.pages || 0), 0);
  const categoriesCount = getAvailableCategories().length;
  
  return {
    totalDocuments,
    totalPages,
    categoriesCount,
    averagePagesPerDocument: Math.round(totalPages / totalDocuments)
  };
};

// Función para validar si un archivo PDF existe
export const validatePDFFile = (filename: string): boolean => {
  return pdfDocuments.some(doc => doc.filename === filename);
};

// Función para generar URL de descarga
export const generateDownloadURL = (filename: string): string => {
  return `/downloads/${filename}`;
};

// Función para generar URL de vista previa
export const generatePreviewURL = (filename: string): string => {
  return `/downloads/${filename}#toolbar=0&navpanes=0&scrollbar=0`;
};

export default pdfDocuments;