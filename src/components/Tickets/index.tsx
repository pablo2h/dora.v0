'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Tickets.module.css';
import { tickets, combos } from '@/data/tickets';
const PASSLINE_URL = "https://www.passline.com/eventos/dora-edicion-del-groove";
const AUTO_PLAY_INTERVAL = 5000; // 5 segundos

interface TicketProps {
  title: string;
  features: string[];
  price: string;
  isSoldOut?: boolean;
  isCombo?: boolean;
  type: 'presale' | 'general' | 'combo1' | 'combo2' | 'vip';
}

export default function Tickets() {
  const [activeFilter, setActiveFilter] = useState<'individual' | 'grupal'>('individual');
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [currentComboIndex, setCurrentComboIndex] = useState(0);

  const visibleTickets = tickets.filter(ticket => ticket.availability.isVisible);
  const visibleCombos = combos.filter(combo => combo.availability.isVisible);

  const nextTicket = useCallback(() => {
    if (activeFilter === 'individual') {
      setCurrentTicketIndex((prevIndex) => 
        prevIndex === visibleTickets.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentComboIndex((prevIndex) => 
        prevIndex === visibleCombos.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [activeFilter, visibleTickets.length, visibleCombos.length]);

  useEffect(() => {
    const timer = setInterval(nextTicket, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextTicket]);

  useEffect(() => {
    setCurrentTicketIndex(0);
    setCurrentComboIndex(0);
  }, [activeFilter]);

  const TicketCard = ({ ticket, isCombo = false }: { ticket: TicketProps, isCombo?: boolean }) => (
    <div 
      className={`
        ${styles.ticketCard} 
        ${isCombo ? styles.comboCard : ''} 
        ${ticket.type === 'combo1' ? styles.comboCard1 : ''}
        ${ticket.type === 'combo2' ? styles.comboCard2 : ''}
        ${ticket.type === 'general' ? styles.generalTicket : ''}
        ${ticket.isSoldOut ? styles.soldOut : ''}
      `}
    >
      {ticket.isSoldOut && <div className={styles.soldOutBanner}>SOLD OUT</div>}
      <h3 className={styles.CardTitle}>{ticket.title}</h3>
      <ul className={styles.ticketFeatures}>
        {ticket.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      <p className={styles.price}>{ticket.price}</p>
      </ul>
      <a 
        href={PASSLINE_URL} 
        className={styles.buyButton}
        {...(ticket.isSoldOut ? { 
          'aria-disabled': true,
          onClick: (e) => e.preventDefault()
        } : {})}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ticket.isSoldOut ? 'Agotado' : isCombo ? 'Comprar Combo' : 'Comprar'}
      </a>
    </div>
  );

  return (
    <section className={styles.ticketsSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.imageContainer}>
            <Image 
              src="/assets/images/Dora 4.svg" 
              alt="Tickets Dora" 
              width={300} 
              height={300} 
              className={styles.decorativeImage}
            />
          </div>
        </div>
        <div> 
        <h1 className="section-title">
            <span>Abonos y Combos</span>
          </h1>
          <div>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'individual' ? styles.active : ''}`}
            onClick={() => setActiveFilter('individual')}
          >
            Individuales
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'grupal' ? styles.active : ''}`}
            onClick={() => setActiveFilter('grupal')}
          >
            Grupales
          </button>
        </div>

        {activeFilter === 'individual' && (
          <>
            <div className={styles.ticketsCarouselContainer}>
              {/* Removed left carousel button */}
              {/* New container for ticket card and indicators */}
              <div className={styles.ticketAndIndicatorsContainer}>
                <div className={styles.ticketsCarousel}>
                  <TicketCard ticket={visibleTickets[currentTicketIndex]} />
                </div>
                <div className={styles.carouselIndicators}>
                  {visibleTickets.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentTicketIndex ? styles.active : ''}`}
                      onClick={() => setCurrentTicketIndex(index)}
                      aria-label={`Ir a ticket ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              {/* Removed right carousel button */}
            </div>
          </>
        )}

        {activeFilter === 'grupal' && (
          <>
            <div className={styles.ticketsCarouselContainer}>
              {/* Removed left carousel button */}
              <div className={styles.ticketsCarousel}>
                <TicketCard ticket={visibleCombos[currentComboIndex]} isCombo={true} />
              </div>
              {/* Removed right carousel button */}
            </div>
            <div className={styles.carouselIndicators}>
              {visibleCombos.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentComboIndex ? styles.active : ''}`}
                  onClick={() => setCurrentComboIndex(index)}
                  aria-label={`Ir a combo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      </div>
      </div>
    </section>
  );
}