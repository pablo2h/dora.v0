'use client';
import BaseForm from '../BaseForm/BaseForm';
import { useFormHandler, submitToAPI, SubmitResult } from '../index';
import styles from './GeneralForm.module.css';

interface GeneralFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialData: GeneralFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

interface GeneralFormProps {
  formType?: 'general' | 'consulta';
}

export default function GeneralForm({ formType = 'general' }: GeneralFormProps) {
  const { formData, handleInputChange, submitForm, isSubmitting } = useFormHandler(initialData);

  const handleSubmit = async (data: GeneralFormData): Promise<SubmitResult> => {
    await submitToAPI(data, formType);
    return {
      success: true,
      message: '¡Mensaje enviado correctamente! Te responderemos a la brevedad. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar'
    };
  };

  const onFormSubmit = async (formSubmitData: GeneralFormData) => {
    return await submitForm(() => handleSubmit(formSubmitData));
  };

  const getTitle = () => {
    return formType === 'consulta' ? 'Formulario de Consulta' : 'Formulario de Contacto';
  };

  const getDescription = () => {
    return formType === 'consulta' 
      ? 'Envíanos tu consulta y te responderemos a la brevedad.'
      : 'Nos encantaría saber de ti. Envíanos un mensaje y te responderemos pronto.';
  };

  return (
    <BaseForm
      title={getTitle()}
      description={getDescription()}
      onSubmit={onFormSubmit}
      submitButtonText="Enviar Mensaje"
      resetButtonText="Enviar otro mensaje"
      isSubmitting={isSubmitting}
    >
      {({ onSubmit, isSubmitting: formIsSubmitting }) => (
        <form onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit(formData);
        }} className={styles.form}>
          <div className={styles.gridContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                ¿Como te llamas? *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                ¿Cual es tu email? *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject" className={styles.label}>
              Asunto *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={styles.input}
              placeholder="¿Que motivo?"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className={styles.textarea}
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              disabled={formIsSubmitting || isSubmitting}
              className={styles.submitButton}
            >
              {(formIsSubmitting || isSubmitting) ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>
        </form>
      )}
    </BaseForm>
  );
}