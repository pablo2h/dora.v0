'use client';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  empresa?: string;
  telefono?: string;
  categoria?: string;
}

interface ContactFormProps {
  formType?: 'general' | 'consulta' | 'sponsors' | 'discount';
}

export default function ContactForm({ formType = 'general' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    empresa: '',
    telefono: '',
    categoria: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Primero guardamos en la base de datos
      const dbResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: formType
        }),
      });

      if (!dbResponse.ok) {
        throw new Error('Error al guardar el mensaje');
      }

      // Enviamos una notificación por email (esto requiere configuración adicional)
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'consultas@dora.com.ar', // Reemplaza con tu email
          subject: formType === 'sponsors' 
            ? `Nueva solicitud de patrocinio: ${formData.empresa || formData.name}` 
            : `Nuevo mensaje de contacto: ${formData.subject}`,
          text: formType === 'sponsors' 
            ? `
Nombre: ${formData.name}
Empresa: ${formData.empresa}
Email: ${formData.email}
Teléfono: ${formData.telefono || 'No proporcionado'}
Categoría de Interés: ${formData.categoria}
Mensaje: ${formData.message || 'Sin mensaje adicional'}
`
            : `
Nombre: ${formData.name}
Email: ${formData.email}
Asunto: ${formData.subject}
Mensaje: ${formData.message}
`
        }),
      });

      if (!emailResponse.ok) {
        console.warn('El mensaje se guardó pero hubo un error al enviar el email de notificación');
      }

      setSubmitResult({
        success: true,
        message: formType === 'sponsors' 
          ? '¡Genial! Ya nos llegó tu solicitud de patrocinio. Te contactaremos pronto para coordinar los detalles. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar'
          : formType === 'discount'
          ? '¡el codigo es BARRO.RGKAIT! Si tienes alguna consulta, puedes escribirnos a consultas@dora.com.ar'
          : '¡el codigo es BARRO.RGKAIT! Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar'
      });
      
      // Limpiamos el formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        empresa: '',
        telefono: '',
        categoria: ''
      });
    } catch (err) {
      console.error('Error en el formulario de contacto:', err);
      setSubmitResult({
        success: false,
        message: 'Ocurrió un error inesperado. Por favor, intenta más tarde o escríbenos directamente a consultas@dora.com.ar'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    switch (formType) {
      case 'consulta':
        return 'Formulario de Consulta';
      case 'sponsors':
        return 'Formulario de Patrocinio';
      case 'discount':
        return 'Solicitar Descuento';
      default:
        return 'Formulario de Contacto';
    }
  };

  const getFormDescription = () => {
    switch (formType) {
      case 'consulta':
        return 'Envíanos tu consulta y te responderemos a la brevedad.';
      case 'sponsors':
        return 'Únete como patrocinador del Festival Dora. Completa el formulario y nos pondremos en contacto contigo.';
      case 'discount':
        return 'Solicita tu descuento del 15% para el Festival Dora. Solo necesitamos tu email para enviarte el código.';
      default:
        return 'Nos encantaría saber de ti. Envíanos un mensaje y te responderemos pronto.';
    }
  };

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {getFormTitle()}
            </h2>
            <p className="text-xl text-gray-600">
              {getFormDescription()}
            </p>
          </div>

          {submitResult ? (
            <div className={`max-w-md mx-auto text-center p-8 rounded-xl ${
              submitResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`text-6xl mb-4 ${
                submitResult.success ? 'text-green-500' : 'text-red-500'
              }`}>
                {submitResult.success ? '✅' : '❌'}
              </div>
              <p className={`text-lg font-semibold mb-4 ${
                submitResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitResult.message}
              </p>
              <button 
                onClick={() => setSubmitResult(null)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {formType === 'sponsors' 
                  ? 'Enviar otra solicitud' 
                  : formType === 'discount'
                  ? 'Solicitar otro descuento'
                  : 'Enviar otro mensaje'
                }
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {formType === 'sponsors' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa *
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa || ''}
                        onChange={handleInputChange}
                        required={formType === 'sponsors'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                  </div>
                )}

                {formType === 'sponsors' ? (
                  <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría de Patrocinio de Interés *
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={formData.categoria || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="individual">Sponsor Individual ($80.000 ARS)</option>
                      <option value="oro">Categoría Oro ($40.000 ARS)</option>
                      <option value="rio">Categoría Río ($200.000 ARS)</option>
                      <option value="stands">Stands Exclusivos ($200.000 ARS)</option>
                      <option value="shows">Patrocinio de Shows ($144.000 ARS)</option>
                      <option value="digital">Sponsor Digital ($120.000 ARS)</option>
                      <option value="multiple">Múltiples categorías</option>
                      <option value="consulta">Necesito asesoramiento</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="¿De qué se trata tu mensaje?"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {formType === 'sponsors' ? 'Mensaje (opcional)' : 'Mensaje *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required={formType !== 'sponsors'}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder={formType === 'sponsors' ? 'Cuéntanos más sobre tu interés en patrocinar el festival...' : 'Escribe tu mensaje aquí...'}
                  />
                </div>

                <div className="text-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting 
                      ? 'Enviando...' 
                      : formType === 'sponsors' 
                        ? 'Solicitar Información de Patrocinio'
                        : formType === 'discount'
                        ? 'Solicitar Descuento del 15%'
                        : 'Enviar Mensaje'
                    }
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}