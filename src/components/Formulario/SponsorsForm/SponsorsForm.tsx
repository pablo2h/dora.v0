'use client';
import BaseForm from '../BaseForm/BaseForm';
import { useFormHandler, submitToAPI, SubmitResult } from '../index';
import styles from './SponsorsForm.module.css';

interface SponsorsFormData {
  name: string;
  email: string;
  empresa: string;
  telefono?: string;
  categoria: string;
  message?: string;
}

const initialData: SponsorsFormData = {
  name: '',
  email: '',
  empresa: '',
  telefono: '',
  categoria: '',
  message: ''
};

export default function SponsorsForm() {
  const { formData, handleInputChange, submitForm, isSubmitting } = useFormHandler(initialData);

  const handleSubmit = async (data: SponsorsFormData): Promise<SubmitResult> => {
    await submitToAPI(data, 'sponsors');
    return {
      success: true,
      message: '¡Genial! Ya nos llegó tu solicitud de patrocinio. Te contactaremos pronto para coordinar los detalles. Si tienes alguna consulta adicional, puedes escribirnos a consultas@dora.com.ar'
    };
  };

  const onFormSubmit = async (formSubmitData: SponsorsFormData) => {
    return await submitForm(() => handleSubmit(formSubmitData));
  };

  return (
    <BaseForm
      title="Formulario de Patrocinio"
      description="Únete como patrocinador del Festival Dora. Completa el formulario y nos pondremos en contacto contigo."
      onSubmit={onFormSubmit}
      submitButtonText="Solicitar Información de Patrocinio"
      resetButtonText="Enviar otra solicitud"
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
                Nombre Completo *
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
                Email *
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

          <div className={styles.gridContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="empresa" className={styles.label}>
                Empresa *
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="telefono" className={styles.label}>
                Teléfono (opcional)
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono || ''}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Tu número de teléfono"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="categoria" className={styles.label}>
              Categoría de Patrocinio de Interés *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className={styles.select}
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

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
              Mensaje (opcional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message || ''}
              onChange={handleInputChange}
              rows={6}
              className={styles.textarea}
              placeholder="Cuéntanos más sobre tu interés en patrocinar el festival..."
            />
          </div>

          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              disabled={formIsSubmitting || isSubmitting}
              className={styles.submitButton}
            >
              {(formIsSubmitting || isSubmitting) ? 'Enviando...' : 'Solicitar Información de Patrocinio'}
            </button>
          </div>
        </form>
      )}
    </BaseForm>
  );
}