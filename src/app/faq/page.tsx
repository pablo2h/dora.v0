'use client';
import React, { useState } from 'react';
import styles from './faq.module.css';
import { faqData } from '@/data/faq';
import AdBanner from '@/components/AdBanner/AdBanner';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>  
    <AdBanner /> 
    <div className={styles.container}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
            </button>
            <div className={`${styles.answer} ${openIndex === index ? styles.active : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.termsContainer}>
        <h2>Términos y Condiciones</h2>
        <p>Términos y Condiciones de Uso y Política de Privacidad de Datos
Al utilizar este sitio web y completar cualquiera de nuestros formularios, usted acepta los siguientes Términos y Condiciones y nuestra Política de Privacidad de Datos. Le rogamos que lea atentamente esta información.

1. Recopilación y Tratamiento de Datos Personales
Horno de Barro recopila datos personales a través de los formularios de este sitio web con el fin de ofrecerle contenido de su interés. Estos datos incluyen, pero no se limitan a, nombre, apellido, correo electrónico y cualquier otra información que usted decida proporcionarnos.

2. Finalidad del Tratamiento de Datos
Los datos recopilados serán tratados con las siguientes finalidades:

Distribución de comunicaciones comerciales: Envío de publicidad, información sobre descuentos, participación en sorteos exclusivos y promociones relacionadas con nuestros productos y servicios, así como con los de terceros con los que colaboremos.
Uso personal y para futuras ocasiones: Sus datos serán utilizados para personalizar su experiencia, realizar análisis internos de mercado y mejorar nuestras ofertas. Nos reservamos el derecho de utilizar esta información para futuras campañas de marketing y comunicación.
Colaboración con terceros: Compartiremos sus datos con terceros colaboradores estratégicos, siempre con el propósito de ofrecerle beneficios y promociones que consideramos relevantes para usted. Nos aseguraremos de que estos terceros se adhieran a estándares de privacidad y seguridad de datos similares a los nuestros.
3. Compromiso de Horno de Barro
Horno de Barro se compromete a administrar sus datos personales de forma segura y confidencial. Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, alteraciones, divulgaciones o destrucciones.

4. Consentimiento
Al aceptar estos Términos y Condiciones, usted otorga su consentimiento expreso para la recopilación, almacenamiento y tratamiento de sus datos personales de acuerdo con las finalidades aquí descritas.

5. Sus Derechos
Usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de hornodebarroer@gmail.com.

6. Modificaciones
Horno de Barro se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será publicado en esta página y entrará en vigor de forma inmediata. Le recomendamos revisar periódicamente esta sección para estar informado sobre cómo protegemos su información..</p>
      </div>
    </div>
    </main> 
  );

};

export default FAQPage;
