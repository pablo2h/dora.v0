'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import styles from './prensa.module.css';

export default function PrensaPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    medio: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log('Formulario enviado:', formData);
    // Simulamos una respuesta exitosa
    setTimeout(() => {
      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        medio: '',
        mensaje: ''
      });
    }, 1000);
  }

  return (
    <main className={styles['prensa-page']}>
      <section className={styles['prensa-hero']}>
        <div className={styles.container}>
          <h1>Sala de Prensa</h1>
          <p>Información para medios de comunicación sobre el Festival Dora</p>
        </div>
      </section>
      
      <section className={styles['prensa-info']}>
        <div className={styles.container}>
          <h2>Sobre el Festival</h2>
          <div className={styles['prensa-text']}>
            <p>Festival Dora es un evento musical y gastronómico que se celebra en Paraná, Entre Ríos. La edición Groove tendrá lugar el <strong>26 de Julio</strong> en la Vieja Usina.</p>
            <p>El festival reúne a los mejores artistas de jazz, rock, rap, blues y swing, junto con una propuesta gastronómica de primer nivel, ofreciendo una experiencia única para los amantes de la música y la buena comida.</p>
          </div>
        </div>
      </section>
      
      <section className={styles['prensa-kit']}>
        <div className={styles.container}>
          <h2>Kit de Prensa</h2>
          <div className={styles['downloads-grid']}>
            <div className={styles['download-card']}>
              <h3>Logos e Imágenes</h3>
              <p>Descarga los logos oficiales e imágenes del Festival Dora en alta resolución</p>
              <Link href="/downloads/dora-logos.zip" className={styles['download-button']}>Descargar Logos</Link>
            </div>
            <div className={styles['download-card']}>
              <h3>Kit de Prensa Completo</h3>
              <p>Incluye logos, imágenes, información del festival, artistas y propuesta gastronómica</p>
              <Link href="/downloads/dora-press-kit.zip" className={styles['download-button']}>Descargar Kit Completo</Link>
            </div>
            <div className={styles['download-card']}>
              <h3>Dossier para Medios</h3>
              <p>Información detallada sobre el festival, horarios, artistas y datos de contacto</p>
              <Link href="/downloads/dora-dossier.pdf" className={styles['download-button']}>Descargar Dossier</Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles['prensa-contacto']}>
        <div className={styles.container}>
          <h2>Contacto para Medios</h2>
          <p>Si eres periodista o representas a un medio y deseas cubrir el Festival Dora, completa el siguiente formulario:</p>
          
          {enviado ? (
            <div className={styles.successMessage}>
              <h3>¡Gracias por contactarnos!</h3>
              <p>Hemos recibido tu mensaje. Nuestro equipo de prensa se pondrá en contacto contigo a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="medio">Medio que representas *</label>
                <input
                  type="text"
                  id="medio"
                  name="medio"
                  value={formData.medio}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="mensaje">Mensaje o solicitud específica</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Enviar Solicitud
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}