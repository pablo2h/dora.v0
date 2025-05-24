import React from 'react';
import styles from './TicketCard.module.css';

export const TicketCard = ({ 
    title, 
    price, 
    description, 
    isSoldOut, 
    onButtonClick 
}) => {
    return (
        <div className={`${styles.ticketCard} ${isSoldOut ? styles.soldOut : ''}`}>
            <div className={styles.soldOutBanner}>SOLD OUT</div>
            <h3 className={styles.ticketTitle}>{title}</h3>
            <div className={styles.ticketPrice}>{price}</div>
            <p className={styles.ticketDescription}>{description}</p>
            <button 
                className={styles.ticketButton}
                disabled={isSoldOut}
                onClick={onButtonClick}
            >
                {isSoldOut ? 'Preventas Agotadas' : 'Comprar Ahora'}
            </button>
        </div>
    );
};

export const TicketGrid = ({ tickets }) => {
    return (
        <div className={styles.ticketGrid}>
            {tickets.map((ticket, index) => (
                <TicketCard key={index} {...ticket} />
            ))}
        </div>
    );
};