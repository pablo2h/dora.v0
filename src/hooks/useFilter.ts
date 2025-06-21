import { useState, useMemo } from 'react';

// Interfaz genérica para elementos que pueden ser filtrados
export interface Filterable {
  [key: string]: any;
}

// Interfaz para las opciones de filtro
export interface FilterOption {
  id: string;
  name: string;
  value?: any;
}

// Interfaz para la configuración del hook
export interface UseFilterConfig<T extends Filterable> {
  items: T[];
  filterKey: keyof T;
  defaultFilter?: string;
  sortFunction?: (items: T[]) => T[];
  customFilterFunction?: (items: T[], filterValue: string) => T[];
}

// Hook genérico para filtrado
export function useFilter<T extends Filterable>({
  items,
  filterKey,
  defaultFilter = 'all',
  sortFunction,
  customFilterFunction
}: UseFilterConfig<T>) {
  const [activeFilter, setActiveFilter] = useState<string>(defaultFilter);

  // Filtrar elementos basado en el filtro activo
  const filteredItems = useMemo(() => {
    let filtered: T[];

    if (customFilterFunction) {
      // Usar función de filtrado personalizada si se proporciona
      filtered = customFilterFunction(items, activeFilter);
    } else {
      // Filtrado estándar
      if (activeFilter === 'all') {
        filtered = items;
      } else {
        filtered = items.filter(item => item[filterKey] === activeFilter);
      }
    }

    // Aplicar función de ordenamiento si se proporciona
    if (sortFunction) {
      filtered = sortFunction(filtered);
    }

    return filtered;
  }, [items, activeFilter, filterKey, sortFunction, customFilterFunction]);

  // Obtener valores únicos para generar opciones de filtro automáticamente
  const getUniqueFilterValues = useMemo(() => {
    const uniqueValues = Array.from(new Set(items.map(item => item[filterKey])));
    return uniqueValues.map(value => ({
      id: String(value),
      name: String(value),
      value
    }));
  }, [items, filterKey]);

  // Funciones de utilidad
  const resetFilter = () => setActiveFilter(defaultFilter);
  
  const hasActiveFilter = activeFilter !== defaultFilter;
  
  const getFilteredCount = () => filteredItems.length;
  
  const getTotalCount = () => items.length;

  return {
    // Estado
    activeFilter,
    filteredItems,
    
    // Acciones
    setActiveFilter,
    resetFilter,
    
    // Información
    hasActiveFilter,
    getFilteredCount,
    getTotalCount,
    getUniqueFilterValues,
    
    // Funciones de utilidad para componentes
    isFilterActive: (filterId: string) => activeFilter === filterId,
    getFilterButtonClass: (baseClass: string, activeClass: string, filterId: string) => 
      `${baseClass} ${activeFilter === filterId ? activeClass : ''}`
  };
}

// Hook especializado para filtros con categorías predefinidas
export function useCategoryFilter<T extends Filterable>({
  items,
  categories,
  filterKey,
  defaultFilter = 'all',
  sortFunction,
  customFilterFunction
}: UseFilterConfig<T> & { categories: FilterOption[] }) {
  const filterHook = useFilter({
    items,
    filterKey,
    defaultFilter,
    sortFunction,
    customFilterFunction
  });

  // Validar que el filtro activo existe en las categorías
  const isValidFilter = (filterId: string) => 
    categories.some(category => category.id === filterId);

  // Obtener información de la categoría activa
  const getActiveCategory = () => 
    categories.find(category => category.id === filterHook.activeFilter);

  // Obtener estadísticas por categoría
  const getCategoryStats = () => {
    return categories.map(category => {
      const count = category.id === 'all' 
        ? items.length 
        : items.filter(item => item[filterKey] === category.id).length;
      
      return {
        ...category,
        count,
        percentage: items.length > 0 ? Math.round((count / items.length) * 100) : 0
      };
    });
  };

  return {
    ...filterHook,
    categories,
    isValidFilter,
    getActiveCategory,
    getCategoryStats
  };
}

// Hook específico para filtros de búsqueda de texto
export function useSearchFilter<T extends Filterable>({
  items,
  searchKeys,
  caseSensitive = false
}: {
  items: T[];
  searchKeys: (keyof T)[];
  caseSensitive?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

    return items.filter(item => {
      return searchKeys.some(key => {
        const value = String(item[key] || '');
        const searchValue = caseSensitive ? value : value.toLowerCase();
        return searchValue.includes(term);
      });
    });
  }, [items, searchTerm, searchKeys, caseSensitive]);

  const clearSearch = () => setSearchTerm('');
  
  const hasSearchTerm = searchTerm.trim().length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    clearSearch,
    hasSearchTerm,
    getFilteredCount: () => filteredItems.length,
    getTotalCount: () => items.length
  };
}

// Hook combinado para filtros de categoría y búsqueda
export function useCombinedFilter<T extends Filterable>({
  items,
  categories,
  filterKey,
  searchKeys,
  defaultFilter = 'all',
  caseSensitive = false,
  sortFunction
}: UseFilterConfig<T> & {
  categories: FilterOption[];
  searchKeys: (keyof T)[];
  caseSensitive?: boolean;
}) {
  const categoryFilter = useCategoryFilter({
    items,
    categories,
    filterKey,
    defaultFilter,
    sortFunction
  });

  const searchFilter = useSearchFilter({
    items: categoryFilter.filteredItems,
    searchKeys,
    caseSensitive
  });

  const resetAllFilters = () => {
    categoryFilter.resetFilter();
    searchFilter.clearSearch();
  };

  const hasAnyFilter = categoryFilter.hasActiveFilter || searchFilter.hasSearchTerm;

  return {
    // Filtros de categoría
    activeCategory: categoryFilter.activeFilter,
    setActiveCategory: categoryFilter.setActiveFilter,
    categories: categoryFilter.categories,
    resetCategoryFilter: categoryFilter.resetFilter,
    
    // Filtros de búsqueda
    searchTerm: searchFilter.searchTerm,
    setSearchTerm: searchFilter.setSearchTerm,
    clearSearch: searchFilter.clearSearch,
    
    // Elementos filtrados (resultado final)
    filteredItems: searchFilter.filteredItems,
    
    // Acciones combinadas
    resetAllFilters,
    
    // Estado
    hasAnyFilter,
    hasCategoryFilter: categoryFilter.hasActiveFilter,
    hasSearchFilter: searchFilter.hasSearchTerm,
    
    // Estadísticas
    getFilteredCount: searchFilter.getFilteredCount,
    getTotalCount: categoryFilter.getTotalCount,
    getCategoryStats: categoryFilter.getCategoryStats,
    
    // Utilidades
    isFilterActive: categoryFilter.isFilterActive,
    getFilterButtonClass: categoryFilter.getFilterButtonClass
  };
}