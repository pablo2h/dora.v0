'use client';

import { useState, useEffect } from 'react';
import styles from '../components.module.css';

interface Subscriber {
  id: string;
  email: string;
  user_id?: string;
  username?: string;
  full_name?: string;
  source: string;
  subscription_type: string;
  frequency?: string; // Hacer opcional
  status: string; // Cambiar de boolean a string
  unsubscribe_token?: string;
  preferences?: any;
  created_at: string;
  updated_at: string;
}

interface SubscriberStats {
  bySource: Array<{
    source: string;
    count: number;
    active_count: number;
  }>;
  byFrequency: Array<{
    frequency: string;
    count: number;
  }>;
  totalActive: number;
  totalSubscribers: number;
}

interface SubscribersData {
  subscribers: Subscriber[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  stats: SubscriberStats;
}

export default function NewsletterPage() {
  const [data, setData] = useState<SubscribersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtros
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSubscribers();
  }, [sourceFilter, statusFilter, frequencyFilter, searchTerm, currentPage]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });

      if (sourceFilter !== 'all') params.append('source', sourceFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (frequencyFilter !== 'all') params.append('frequency', frequencyFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/newsletter-subscribers?${params}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Error al cargar suscriptores');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriberStatus = async (subscriberId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/newsletter-subscribers', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: subscriberId,
          status: newStatus, // Enviar string en lugar de boolean
        })
      });

      const result = await response.json();

      if (result.success) {
        // Actualizar el estado local
        setData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            subscribers: prev.subscribers.map(sub => 
              sub.id === subscriberId ? { ...sub, status: newStatus } : sub
            )
          };
        });
      } else {
        setError(result.error || 'Error al actualizar suscriptor');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'newsletter': return 'bg-blue-100 text-blue-800';
      case 'discounts': return 'bg-green-100 text-green-800';
      case 'events': return 'bg-purple-100 text-purple-800';
      case 'sponsors': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-red-100 text-red-800';
      case 'weekly': return 'bg-yellow-100 text-yellow-800';
      case 'monthly': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Título */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Suscriptores de Newsletter</h1>
        <p className={styles.pageSubtitle}>Gestiona los suscriptores del newsletter y sus preferencias</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setError('')}
            className="mt-2 text-red-600 hover:text-red-800"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Estadísticas */}
      {data && (
        <div className={styles.statsGrid}>
          <StatCard
            title="Total Suscriptores"
            value={data.stats.totalSubscribers}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Activos"
            value={data.stats.totalActive}
            icon="✅"
            color="green"
          />
          <StatCard
            title="Inactivos"
            value={data.stats.totalSubscribers - data.stats.totalActive}
            icon="⏸️"
            color="yellow"
          />
          <StatCard
            title="Fuentes"
            value={data.stats.bySource.length}
            icon="📊"
            color="purple"
          />
        </div>
      )}

      {/* Estadísticas por fuente */}
      {data && data.stats.bySource.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Suscriptores por Fuente</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.bySource.map((stat) => (
              <div key={stat.source} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                <div className="text-sm text-gray-600 capitalize">{stat.source}</div>
                <div className="text-xs text-green-600">{stat.active_count} activos</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <h3 className={styles.sectionTitle}>Filtros</h3>
        <div className={styles.filtersGrid}>
          {/* Búsqueda */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Buscar por email
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="email@ejemplo.com"
              className={styles.filterInput}
            />
          </div>

          {/* Fuente */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Fuente
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.filterSelect}
            >
              <option value="all">Todas</option>
              <option value="newsletter">Newsletter</option>
              <option value="discounts">Descuentos</option>
              <option value="events">Eventos</option>
              <option value="sponsors">Sponsors</option>
            </select>
          </div>

          {/* Estado */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.filterSelect}
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          {/* Frecuencia */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Frecuencia
            </label>
            <select
              value={frequencyFilter}
              onChange={(e) => {
                setFrequencyFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.filterSelect}
            >
              <option value="all">Todas</option>
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de suscriptores */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Suscriptores {data && `(${data.pagination.total})`}
          </h3>
        </div>
        
        {data && data.subscribers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No se encontraron suscriptores con los filtros aplicados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fuente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frecuencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Suscripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscriber.full_name || subscriber.username || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(subscriber.source)}`}>
                        {subscriber.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFrequencyColor(subscriber.frequency || 'weekly')}`}>
                        {subscriber.frequency || 'weekly'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.status === 'active'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => updateSubscriberStatus(subscriber.id, subscriber.status === 'active' ? 'inactive' : 'active')}
                        className={`mr-2 px-3 py-1 rounded text-xs font-medium ${
                          subscriber.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {subscriber.status === 'active' ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {data && data.pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!data.pagination.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!data.pagination.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando{' '}
                  <span className="font-medium">
                    {(data.pagination.page - 1) * data.pagination.limit + 1}
                  </span>{' '}
                  a{' '}
                  <span className="font-medium">
                    {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)}
                  </span>{' '}
                  de{' '}
                  <span className="font-medium">{data.pagination.total}</span>{' '}
                  resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={!data.pagination.hasPrev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Números de página */}
                  {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(
                      data.pagination.totalPages - 4,
                      Math.max(1, data.pagination.page - 2)
                    )) + i;
                    
                    if (pageNum <= data.pagination.totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNum === data.pagination.page
                              ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!data.pagination.hasNext}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para tarjetas de estadísticas
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'yellow' | 'green' | 'red' | 'purple';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: styles.statCardBlue,
    yellow: styles.statCardYellow,
    green: styles.statCardGreen,
    red: styles.statCardRed,
    purple: styles.statCardPurple,
  };

  return (
    <div className={styles.statCard}>
      <div className={styles.statCardContent}>
        <div className={`${styles.statCardIcon} ${colorClasses[color]}`}>
          <span>{icon}</span>
        </div>
        <div className={styles.statCardText}>
          <p className={styles.statCardTitle}>{title}</p>
          <p className={styles.statCardValue}>{value}</p>
        </div>
      </div>
    </div>
  );
}