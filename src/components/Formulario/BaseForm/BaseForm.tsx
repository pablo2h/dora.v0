'use client';
import { useState } from 'react';
import styles from './BaseForm.module.css';

export interface BaseFormData {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

export interface ExtendedFormData extends BaseFormData {
  empresa?: string;
  telefono?: string;
  categoria?: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

export interface BaseFormProps<T = BaseFormData> {
  title: string;
  description: string;
  onSubmit: (data: T) => Promise<SubmitResult>;
  children: (props: { onSubmit: (data: T) => Promise<void>; isSubmitting: boolean }) => React.ReactNode;
  submitButtonText: string;
  resetButtonText: string;
  isSubmitting?: boolean;
}

export default function BaseForm<T = BaseFormData>({
  title,
  description,
  onSubmit,
  children,
  resetButtonText,
  isSubmitting = false
}: BaseFormProps<T>) {
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleFormSubmit = async (formData: T) => {
    try {
      const result = await onSubmit(formData);
      setSubmitResult(result);
    } catch (error) {
      console.error('Error en el formulario:', error);
      setSubmitResult({
        success: false,
        message: 'Ocurrió un error inesperado. Por favor, intenta más tarde o escríbenos directamente a consultas@dora.com.ar'
      });
    }
  };

  return (
    <section id="contacto" className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {title}
            </h2>
            <p className={styles.description}>
              {description}
            </p>
          </div>

          {submitResult ? (
            <div className={`${styles.resultContainer} ${
              submitResult.success 
                ? styles.successResult
                : styles.errorResult
            }`}>
              <div className={`${styles.resultIcon} ${
                submitResult.success ? styles.successIcon : styles.errorIcon
              }`}>
                {submitResult.success ? '✅' : '❌'}
              </div>
              <p className={`${styles.resultMessage} ${
                submitResult.success ? styles.successMessage : styles.errorMessage
              }`}>
                {submitResult.message}
              </p>
              <button 
                onClick={() => setSubmitResult(null)}
                className={styles.resetButton}
              >
                {resetButtonText}
              </button>
            </div>
          ) : (
            <div className={styles.formContent}>
              {children({ onSubmit: handleFormSubmit, isSubmitting })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Hook personalizado para manejar formularios
export function useFormHandler<T extends BaseFormData>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  const submitForm = async (onSubmit: (data: T) => Promise<SubmitResult>) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        resetForm();
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleInputChange,
    resetForm,
    submitForm
  };
}

// Función utilitaria para enviar datos al API
export async function submitToAPI(data: ExtendedFormData, formType: string): Promise<SubmitResult> {
  try {
    // Guardamos en la base de datos
    const dbResponse = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        formType: formType
      }),
    });

    if (!dbResponse.ok) {
      throw new Error('Error al guardar el mensaje');
    }

    // Enviamos notificación por email
    const emailResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'consultas@dora.com.ar',
        subject: formType === 'sponsors' 
          ? `Nueva solicitud de patrocinio: ${data.empresa || data.name}` 
          : `Nuevo mensaje de contacto: ${data.subject}`,
        text: formType === 'sponsors' 
          ? `
Nombre: ${data.name}
Empresa: ${data.empresa}
Email: ${data.email}
Teléfono: ${data.telefono || 'No proporcionado'}
Categoría de Interés: ${data.categoria}
Mensaje: ${data.message || 'Sin mensaje adicional'}
`
          : `
Nombre: ${data.name}
Email: ${data.email}
Asunto: ${data.subject}
Mensaje: ${data.message}
`
      }),
    });

    if (!emailResponse.ok) {
      console.warn('El mensaje se guardó pero hubo un error al enviar el email de notificación');
    }

    return { success: true, message: '' };
  } catch (error) {
    console.error('Error en submitToAPI:', error);
    throw error;
  }
}