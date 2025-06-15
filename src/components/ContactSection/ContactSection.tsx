'use client';

import React from 'react';
import styles from './ContactSection.module.css';
import { contactInfo } from '@/data/faq';

const ContactSection = () => {
  return (
    <div className={`${styles.contactContainer} section-block`}>
      <h2>{contactInfo.title}</h2>
      <p>{contactInfo.description}</p>
      <div className={styles.emailList}>
        {contactInfo.emails.map((contact, index) => (
          <div key={index} className={styles.contactEmail}>
            <span className={styles.emailType}>{contact.type}: </span>
            <a href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;