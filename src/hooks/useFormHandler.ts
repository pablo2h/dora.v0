import { useState } from 'react';

interface FormData {
  [key: string]: string | undefined;
}

interface SubmitResult {
  success: boolean;
  message: string;
}

interface UseFormHandlerProps {
  initialData: FormData;
  formType?: string;
  onSuccess?: (data: FormData) => void;
  onError?: (error: Error) => void;
}

export function useFormHandler({
  initialData,
  formType = 'general',
  onSuccess,
  onError
}: UseFormHandlerProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
    setSubmitResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardar en la base de datos
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

      // Enviar notificación por email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'consultas@dora.com.ar',
          subject: getEmailSubject(formType, formData),
          text: getEmailText(formType, formData)
        }),
      });

      if (!emailResponse.ok) {
        console.warn('El mensaje se guardó pero hubo un error al enviar el email de notificación');
      }

      const successMessage = getSuccessMessage(formType);
      setSubmitResult({
        success: true,
        message: successMessage
      });
      
      // Limpiar el formulario
      setFormData(initialData);
      
      // Callback de éxito
      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (err) {
      console.error('Error en el formulario:', err);
      const errorMessage = 'Ocurrió un error inesperado. Por favor, intenta más tarde o escríbenos directamente a consultas@dora.com.ar';
      
      setSubmitResult({
        success: false,
        message: errorMessage
      });
      
      // Callback de error
      if (onError && err instanceof Error) {
        onError(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitResult,
    handleInputChange,
    handleSubmit,
    resetForm,
    setSubmitResult
  };
}

// Funciones auxiliares
function getEmailSubject(formType: string, formData: FormData): string {
  switch (formType) {
    case 'sponsors':
      return `Nueva solicitud de patrocinio: ${formData.empresa || formData.name}`;
    case 'discount':
      return `Solicitud de descuento: ${formData.name}`;
    case 'consulta':
      return `Nueva consulta: ${formData.subject || 'Sin asunto'}`;
    default:
      return `Nuevo mensaje de contacto: ${formData.subject || 'Sin asunto'}`;
  }
}

function getEmailText(formType: string, formData: FormData): string {
  const baseInfo = `
Nombre: ${formData.name}
Email: ${formData.email}`;
  
  switch (formType) {
    case 'sponsors':
      return `${baseInfo}
Empresa: ${formData.empresa}
Teléfono: ${formData.telefono || 'No proporcionado'}
Categoría: ${formData.categoria}
Mensaje: ${formData.message || 'Sin mensaje adicional'}`;
    case 'discount':
      return `${baseInfo}
Solicitud de descuento del 15%`;
    default:
      return `${baseInfo}
Asunto: ${formData.subject}
Mensaje: ${formData.message}`;
  }
}

function getSuccessMessage(formType: string): string {
  switch (formType) {
    case 'sponsors':
      return '¡Genial! Ya nos llegó tu solicitud de patrocinio. Te contactaremos pronto para coordinar los detalles. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar';
    case 'discount':
      return '¡el codigo es BARRO.RGKAIT! Si tienes alguna consulta, puedes escribirnos a consultas@dora.com.ar';
    case 'consulta':
      return '¡Gracias por tu consulta! Te responderemos a la brevedad. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar';
    default:
      return '¡Gracias por tu mensaje! Te responderemos pronto. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar';
  }
}