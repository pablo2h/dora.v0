'use client';

import { useState, useEffect } from 'react';
import styles from '../components.module.css';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'read' | 'replied' | 'archived';
  assigned_to?: string;
  assigned_admin_name?: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
  response?: string;
}

interface Admin {
  id: string;
  username: string;
  name: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  
  // Filtros
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assignedFilter, setAssignedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
    fetchAdmins();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (result.success) {
        // Mapear los datos de la API al formato esperado por el frontend
        const mappedMessages = result.data.messages.map((msg: any) => ({
          id: msg.id,
          name: msg.user_name,
          email: msg.user_email,
          subject: msg.subject,
          message: msg.message_content,
          priority: msg.priority,
          status: msg.status,
          assigned_to: msg.assigned_to,
          assigned_admin_name: msg.assigned_admin_name,
          created_at: msg.created_at,
          updated_at: msg.updated_at,
          admin_notes: msg.admin_notes,
          response: msg.response
        }));
        setMessages(mappedMessages);
      } else {
        setError(result.error || 'Error al cargar mensajes');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/admins', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (result.success) {
        setAdmins(result.data);
      }
    } catch (error) {
      console.error('Error al cargar administradores:', error);
    }
  };

  const updateMessage = async (messageId: string, updates: Partial<Message>) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (result.success) {
        setMessages((Array.isArray(messages) ? messages : []).map(msg => 
          msg.id === messageId ? { ...msg, ...updates } : msg
        ));
        return true;
      } else {
        setError(result.error || 'Error al actualizar mensaje');
        return false;
      }
    } catch (error) {
      setError('Error de conexión');
      return false;
    }
  };

  const handleAssignMessage = async (messageId: string, adminId: string) => {
    const success = await updateMessage(messageId, { 
      assigned_to: adminId,
      status: 'read'
    });
    
    if (success) {
      fetchMessages(); // Refrescar para obtener el nombre del admin
    }
  };

  const handleStatusChange = async (messageId: string, status: Message['status']) => {
    await updateMessage(messageId, { status });
  };

  const handlePriorityChange = async (messageId: string, priority: Message['priority']) => {
    await updateMessage(messageId, { priority });
  };

  const handleOpenModal = (message: Message) => {
    setSelectedMessage(message);
    setResponse(message.response || '');
    setAdminNotes(message.admin_notes || '');
    setShowModal(true);
  };

  const handleSaveResponse = async () => {
    if (!selectedMessage) return;

    const success = await updateMessage(selectedMessage.id, {
      response,
      admin_notes: adminNotes,
      status: response.trim() ? 'replied' : selectedMessage.status
    });

    if (success) {
      setShowModal(false);
      setSelectedMessage(null);
      setResponse('');
      setAdminNotes('');
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setMessages((Array.isArray(messages) ? messages : []).filter(msg => msg.id !== messageId));
      } else {
        setError(result.error || 'Error al eliminar mensaje');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  // Filtrar mensajes
  const filteredMessages = (Array.isArray(messages) ? messages : []).filter(message => {
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    const matchesAssigned = assignedFilter === 'all' || 
      (assignedFilter === 'unassigned' && !message.assigned_to) ||
      (assignedFilter !== 'unassigned' && message.assigned_to === assignedFilter);
    const matchesSearch = searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesAssigned && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
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
        <h1 className={styles.pageTitle}>Gestión de Mensajes</h1>
        <p className={styles.pageSubtitle}>Administra y responde los mensajes de contacto</p>
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

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <h3 className={styles.filtersTitle}>Filtros</h3>
        <div className={styles.filtersGrid}>
          {/* Búsqueda */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre, email, asunto..."
              className={styles.filterInput}
            />
          </div>

          {/* Estado */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="read">Leído</option>
              <option value="replied">Respondido</option>
              <option value="archived">Archivado</option>
            </select>
          </div>

          {/* Prioridad */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Prioridad
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todas</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="normal">Normal</option>
              <option value="low">Baja</option>
            </select>
          </div>

          {/* Asignado a */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Asignado a
            </label>
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todos</option>
              <option value="unassigned">Sin asignar</option>
              {admins.map(admin => (
                <option key={admin.id} value={admin.id}>{admin.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>
            Mensajes ({filteredMessages.length})
          </h3>
        </div>
        
        {filteredMessages.length === 0 ? (
          <div className={styles.emptyState}>
            No se encontraron mensajes con los filtros aplicados.
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeaderCell}>
                    Remitente
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Asunto
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Prioridad
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Estado
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Asignado a
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Fecha
                  </th>
                  <th className={styles.tableHeaderCell}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{message.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={message.priority}
                        onChange={(e) => handlePriorityChange(message.id, e.target.value as Message['priority'])}
                        className={`text-xs px-2 py-1 rounded-full border-0 ${getPriorityColor(message.priority)}`}
                      >
                        <option value="low">Baja</option>
                        <option value="normal">Normal</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={message.status}
                        onChange={(e) => handleStatusChange(message.id, e.target.value as Message['status'])}
                        className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(message.status)}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="read">Leído</option>
                        <option value="replied">Respondido</option>
                        <option value="archived">Archivado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={message.assigned_to || ''}
                        onChange={(e) => handleAssignMessage(message.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Sin asignar</option>
                        {admins.map(admin => (
                          <option key={admin.id} value={admin.id}>{admin.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleOpenModal(message)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalle del mensaje */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detalle del Mensaje</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Información del remitente */}
                <div>
                  <h4 className="font-medium text-gray-900">Información del Remitente</h4>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Nombre:</strong> {selectedMessage.name}</p>
                    <p><strong>Email:</strong> {selectedMessage.email}</p>
                    <p><strong>Fecha:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <h4 className="font-medium text-gray-900">Asunto</h4>
                  <p className="mt-2 text-sm text-gray-600">{selectedMessage.subject}</p>
                </div>

                {/* Mensaje */}
                <div>
                  <h4 className="font-medium text-gray-900">Mensaje</h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Notas del administrador */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas del Administrador
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Notas internas sobre este mensaje..."
                  />
                </div>

                {/* Respuesta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Respuesta
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Escribe tu respuesta aquí..."
                  />
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveResponse}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}