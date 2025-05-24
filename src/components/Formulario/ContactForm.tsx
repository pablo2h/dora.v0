'use client';
import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  formType?: 'general' | 'prensa';
}

export default function ContactForm({ formType = 'general' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: formType === 'prensa' ? 'Solicitud de Prensa - Festival Dora' : '',
    message: '',
    mediaOutlet: formType === 'prensa' ? '' : undefined,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Aquí iría la lógica para enviar el formulario
      // Por ejemplo, usando fetch para enviar a una API
      
      // Simulación de envío exitoso
      setTimeout(() => {
        setSubmitResult({
          success: true,
          message: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.'
        });
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitResult({
        success: false,
        message: 'Ha ocurrido un error al enviar el formulario. Por favor, intenta nuevamente.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      {submitResult ? (
        <div className={`${styles.submitResult} ${submitResult.success ? styles.success : styles.error}`}>
          <p>{submitResult.message}</p>
          {submitResult.success && (
            <button 
              onClick={() => {
                setSubmitResult(null);
                setFormData({
                  name: '',
                  email: '',
                  subject: formType === 'prensa' ? 'Solicitud de Prensa - Festival Dora' : '',
                  message: '',
                  mediaOutlet: formType === 'prensa' ? '' : undefined,
                });
              }}
              className={styles.resetButton}
            >
              Enviar otro mensaje
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {formType === 'prensa' && (
            <div className={styles.formRow}>
              <label htmlFor="mediaOutlet">Medio que representas</label>
              <input
                type="text"
                id="mediaOutlet"
                name="mediaOutlet"
                value={formData.mediaOutlet || ''}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className={styles.formRow}>
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      )}
    </div>
  );
}