'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Tickets.module.css';
import { tickets, combos, updateTicketAvailability } from '@/data/tickets';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
const PASSLINE_URL = "https://www.passline.com/eventos/dora-edicion-del-groove";
const AUTO_PLAY_INTERVAL = 5000; // 5 segundos

interface TicketProps {
  title: string;
  features: string[];
  price: string;
  isSoldOut?: boolean;
  isCombo?: boolean;
  isComingSoon?: boolean;
  type: 'presale1' | 'presale2' | 'general' | 'combo1' | 'combo2' | 'vip';
}

export default function Tickets() {
  const [activeFilter, setActiveFilter] = useState<'individual' | 'grupal'>('individual');
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [currentComboIndex, setCurrentComboIndex] = useState(0);

  // Actualizar disponibilidad de tickets basada en fechas
  const updatedTickets = updateTicketAvailability(tickets);
  const updatedCombos = updateTicketAvailability(combos);
  
  const filteredIndividualTickets = updatedTickets.filter(ticket => ticket.availability.isVisible);
  const filteredComboTickets = updatedCombos.filter(combo => combo.availability.isVisible);

  const nextTicket = useCallback(() => {
    if (activeFilter === 'individual') {
      setCurrentTicketIndex((prevIndex) => 
        prevIndex === filteredIndividualTickets.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentComboIndex((prevIndex) => 
        prevIndex === filteredComboTickets.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [activeFilter, filteredIndividualTickets.length, filteredComboTickets.length]);

  const prevTicket = useCallback(() => {
    if (activeFilter === 'individual') {
      setCurrentTicketIndex((prevIndex) => 
        prevIndex === 0 ? filteredIndividualTickets.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentComboIndex((prevIndex) => 
        prevIndex === 0 ? filteredComboTickets.length - 1 : prevIndex - 1
      );
    }
  }, [activeFilter, filteredIndividualTickets.length, filteredComboTickets.length]);

  // Hooks para gestos de swipe - uno para cada carousel
  const { elementRef: individualSwipeRef } = useSwipeGesture({
    onSwipeLeft: () => {
      if (activeFilter === 'individual') {
        setCurrentTicketIndex((prevIndex) => 
          prevIndex === filteredIndividualTickets.length - 1 ? 0 : prevIndex + 1
        );
      }
    },
    onSwipeRight: () => {
      if (activeFilter === 'individual') {
        setCurrentTicketIndex((prevIndex) => 
          prevIndex === 0 ? filteredIndividualTickets.length - 1 : prevIndex - 1
        );
      }
    },
    minSwipeDistance: 50
  });

  const { elementRef: comboSwipeRef } = useSwipeGesture({
    onSwipeLeft: () => {
      if (activeFilter === 'grupal') {
        setCurrentComboIndex((prevIndex) => 
          prevIndex === filteredComboTickets.length - 1 ? 0 : prevIndex + 1
        );
      }
    },
    onSwipeRight: () => {
      if (activeFilter === 'grupal') {
        setCurrentComboIndex((prevIndex) => 
          prevIndex === 0 ? filteredComboTickets.length - 1 : prevIndex - 1
        );
      }
    },
    minSwipeDistance: 50
  });

  useEffect(() => {
    const timer = setInterval(nextTicket, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextTicket]);

  useEffect(() => {
    setCurrentTicketIndex(0);
    setCurrentComboIndex(0);
  }, [activeFilter]);

  const TicketCard = ({ ticket, isCombo = false, isActive = true }: { ticket: TicketProps, isCombo?: boolean, isActive?: boolean }) => (
    <div 
      className={`
        ${styles.ticketCard} 
        ${isCombo ? styles.comboCard : ''} 
        ${ticket.type === 'combo1' ? styles.comboCard1 : ''}
        ${ticket.type === 'combo2' ? styles.comboCard2 : ''}
        ${ticket.type === 'general' ? styles.generalTicket : ''}
        ${ticket.isSoldOut ? styles.soldOut : ''}
        ${ticket.isComingSoon ? styles.comingSoon : ''}
      `}
    >
      {ticket.isSoldOut && <div className={styles.soldOutBanner}>SOLD OUT</div>}
      {ticket.isComingSoon && <div className={styles.comingSoonBanner}>PRÓXIMAMENTE</div>}
      <h3 className={styles.CardTitle}>{ticket.title}</h3>
      <ul className={styles.ticketFeatures}>
        {ticket.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <p className={styles.price}>{ticket.price}</p>
      <a 
        href={PASSLINE_URL} 
        className={styles.buyButton}
        {...(ticket.isSoldOut || ticket.isComingSoon ? { 
          'aria-disabled': true,
          onClick: (e) => e.preventDefault()
        } : {})}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ticket.isSoldOut ? 'Agotado' : ticket.isComingSoon ? 'Próximamente' : isCombo ? 'Comprar Combo' : 'Comprar'}
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
        <div className={styles.componetContainer}> 
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
            {/* Desktop: Grid layout */}
            <div className={styles.ticketsGridDesktop}>
              {filteredIndividualTickets.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </div>
            
            {/* Mobile: Carousel layout */}
            <div className={styles.ticketsCarouselContainer}>
              <div className={styles.ticketAndIndicatorsContainer}>
                <div 
                  className={styles.ticketsCarousel}
                  ref={individualSwipeRef}
                >
                  <TicketCard 
                    ticket={filteredIndividualTickets[currentTicketIndex]} 
                    isActive={true}
                  />
                </div>
                <div className={styles.carouselIndicators}>
                  {filteredIndividualTickets.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentTicketIndex ? styles.active : ''}`}
                      onClick={() => setCurrentTicketIndex(index)}
                      aria-label={`Ir a ticket ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeFilter === 'grupal' && (
          <>
            {/* Desktop: Grid layout */}
            <div className={styles.combosGridDesktop}>
              {filteredComboTickets.map((combo, index) => (
                <TicketCard key={index} ticket={combo} isCombo={true} />
              ))}
            </div>
            
            {/* Mobile: Carousel layout */}
            <div className={styles.ticketsCarouselContainer}>
              <div className={styles.ticketAndIndicatorsContainer}>
                <div 
                  className={styles.ticketsCarousel}
                  ref={comboSwipeRef}
                >
                  <TicketCard 
                    ticket={filteredComboTickets[currentComboIndex]} 
                    isCombo={true}
                  />
                </div>
                <div className={styles.carouselIndicators}>
                  {filteredComboTickets.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentComboIndex ? styles.active : ''}`}
                      onClick={() => setCurrentComboIndex(index)}
                      aria-label={`Ir a combo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
      </div>
    </section>
  );
}