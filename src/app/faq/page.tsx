import React from 'react';
import styles from './page.module.css';
import AdBanner from '@/components/AdBanner/AdBanner';
import FAQSection from '@/components/FAQSection/FAQSection';
import TermsSection from '@/components/TermsSection/TermsSection';
import ContactSection from '@/components/ContactSection/ContactSection';

const FAQPage = () => {
  return (
    <main className={styles.faqpage}>  
      <AdBanner /> 
      <div className={styles.container}>
        <FAQSection />
        <TermsSection />
        <ContactSection />
      </div>
    </main> 
  );
};

export default FAQPage;