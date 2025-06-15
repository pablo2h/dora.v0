'use client';
import BaseForm from '../BaseForm/BaseForm';
import { useFormHandler, submitToAPI, SubmitResult } from '../index';
import styles from './DiscountForm.module.css';

interface DiscountFormData {
  name: string;
  email: string;
}

const initialData: DiscountFormData = {
  name: 'Usuario descuento',
  email: ''
};

export default function DiscountForm() {
  const { formData, handleInputChange, submitForm, isSubmitting } = useFormHandler(initialData);

  const handleSubmit = async (data: DiscountFormData): Promise<SubmitResult> => {
    // Para el formulario de descuento, enviamos datos adicionales
    const submitData = {
      ...data,
      subject: 'Solicitud de descuento',
      message: 'Usuario solicitó descuento del 15%'
    };
    
    await submitToAPI(submitData, 'discount');
    return {
      success: true,
      message: '¡El código es BARRO.RGKAIT! Si tienes alguna consulta, puedes escribirnos a consultas@dora.com.ar'
    };
  };

  const onFormSubmit = async (formSubmitData: DiscountFormData) => {
    return await submitForm(() => handleSubmit(formSubmitData));
  };

  return (
    <BaseForm
      title="Solicitar Descuento"
      description="Solicita tu descuento del 15% para el Festival Dora. Solo necesitamos tu email para enviarte el código."
      onSubmit={onFormSubmit}
      submitButtonText="Solicitar Descuento del 15%"
      resetButtonText="Solicitar otro descuento"
      isSubmitting={isSubmitting}
    >
      {({ onSubmit, isSubmitting: formIsSubmitting }) => (
        <div className={styles.formContainer}>
          <form onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(formData);
          }}>
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

            <div className={styles.buttonContainer}>
              <button 
                type="submit" 
                disabled={formIsSubmitting || isSubmitting}
                className={styles.submitButton}
              >
                {(formIsSubmitting || isSubmitting) ? 'Enviando...' : 'Solicitar Descuento del 15%'}
              </button>
            </div>
          </form>
        </div>
      )}
    </BaseForm>
  );
}