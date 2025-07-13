'use client';

import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

interface DashboardData {
  overview: {
    total_messages: number;
    pending_messages: number;
    read_messages: number;
    replied_messages: number;
    archived_messages: number;
    urgent_messages: number;
    high_priority_messages: number;
    unassigned_messages: number;
  };
  alerts: {
    total_urgent_unassigned: number;
    total_high_priority_unassigned: number;
    messages_older_than_24h: number;
  };
  performance: {
    avg_response_time_hours: number;
    messages_per_admin: Array<{
      admin_id: string;
      admin_name: string;
      total_assigned: number;
      total_replied: number;
    }>;
  };
  trends: {
    current_period: {
      total: number;
      pending: number;
      replied: number;
    };
    previous_period: {
      total: number;
      pending: number;
      replied: number;
    };
    growth_rate: number;
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Error al cargar datos');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.dashboardContainer}>
      {/* Título */}
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <p className={styles.dashboardSubtitle}>Resumen general del sistema de mensajes</p>
      </div>

      {/* Alertas */}
      {(data.alerts.total_urgent_unassigned > 0 || data.alerts.messages_older_than_24h > 0) && (
        <div className={styles.alertsContainer}>
          <h3 className={styles.alertsTitle}>🚨 Alertas</h3>
          <div className={styles.alertsList}>
            {data.alerts.total_urgent_unassigned > 0 && (
              <p>• {data.alerts.total_urgent_unassigned} mensajes urgentes sin asignar</p>
            )}
            {data.alerts.total_high_priority_unassigned > 0 && (
              <p>• {data.alerts.total_high_priority_unassigned} mensajes de alta prioridad sin asignar</p>
            )}
            {data.alerts.messages_older_than_24h > 0 && (
              <p>• {data.alerts.messages_older_than_24h} mensajes pendientes por más de 24 horas</p>
            )}
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total de Mensajes"
          value={data.overview.total_messages}
          icon="📧"
          color="blue"
        />
        <StatCard
          title="Pendientes"
          value={data.overview.pending_messages}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Respondidos"
          value={data.overview.replied_messages}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Sin Asignar"
          value={data.overview.unassigned_messages}
          icon="👤"
          color="red"
        />
      </div>

      {/* Prioridades */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mensajes por Prioridad</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{data.overview.urgent_messages}</div>
            <div className="text-sm text-gray-600">Urgente</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{data.overview.high_priority_messages}</div>
            <div className="text-sm text-gray-600">Alta</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data.overview.total_messages - data.overview.urgent_messages - data.overview.high_priority_messages}
            </div>
            <div className="text-sm text-gray-600">Normal/Baja</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{data.overview.archived_messages}</div>
            <div className="text-sm text-gray-600">Archivados</div>
          </div>
        </div>
      </div>

      {/* Rendimiento */}
      <div className={styles.contentGrid}>
        {/* Tiempo de respuesta */}
        <div className={styles.contentCard}>
          <h3 className={styles.contentTitle}>Rendimiento</h3>
          <div className={styles.trendsContainer}>
            <div>
              <div className={styles.trendLabel}>Tiempo promedio de respuesta</div>
              <div className={styles.performanceValue}>
                {data.performance?.avg_response_time_hours?.toFixed(1) || '0.0'} horas
              </div>
            </div>
          </div>
        </div>

        {/* Tendencias */}
        <div className={styles.contentCard}>
          <h3 className={styles.contentTitle}>Tendencias (últimos 7 días)</h3>
          <div className={styles.trendsContainer}>
            <div className={styles.trendItem}>
              <span className={styles.trendLabel}>Mensajes totales</span>
              <div className={styles.trendValueContainer}>
                <span className={styles.trendValue}>{data.trends?.current_period?.total || 0}</span>
                <TrendIndicator value={data.trends?.growth_rate || 0} />
              </div>
            </div>
            <div className={styles.trendItem}>
              <span className={styles.trendLabel}>Pendientes</span>
              <span className={`${styles.trendValue} ${styles.trendYellow}`}>{data.trends?.current_period?.pending || 0}</span>
            </div>
            <div className={styles.trendItem}>
              <span className={styles.trendLabel}>Respondidos</span>
              <span className={`${styles.trendValue} ${styles.trendGreen}`}>{data.trends?.current_period?.replied || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rendimiento por administrador */}
      {data.performance?.messages_per_admin?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rendimiento por Administrador</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Administrador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asignados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respondidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasa de Respuesta
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.performance?.messages_per_admin?.map((admin) => {
                  const responseRate = admin.total_assigned > 0 
                    ? (admin.total_replied / admin.total_assigned * 100).toFixed(1)
                    : '0';
                  
                  return (
                    <tr key={admin.admin_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {admin.admin_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.total_assigned}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.total_replied}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          parseFloat(responseRate) >= 80 
                            ? 'bg-green-100 text-green-800'
                            : parseFloat(responseRate) >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {responseRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para tarjetas de estadísticas
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'yellow' | 'green' | 'red';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardContent}>
        <div className={`${styles.statCardIcon} ${styles[`statCard${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
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

// Componente para indicador de tendencia
function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return (
      <span className="ml-2 flex items-center text-sm text-green-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        +{value.toFixed(1)}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="ml-2 flex items-center text-sm text-red-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {value.toFixed(1)}%
      </span>
    );
  } else {
    return (
      <span className="ml-2 text-sm text-gray-500">
        0%
      </span>
    );
  }
}