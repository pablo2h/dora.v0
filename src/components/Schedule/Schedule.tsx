'use client';

import React, { useState, useEffect } from 'react';
import { schedule, ScheduleItem, getLocationDisplayName, FESTIVAL_DATE } from '@/data/schedule';
import { useFilter } from '@/hooks/useFilter';
import styles from './Schedule.module.css';

interface ScheduleProps {
  className?: string;
}

/**
 * Schedule component that displays festival timeline with filtering and live event highlighting
 * @param className - Optional CSS class for styling
 * @returns JSX element containing the schedule timeline
 */
const Schedule: React.FC<ScheduleProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  // Get unique locations for filter buttons
  const locations = Array.from(new Set(schedule.map(item => item.location)));
  
  // Filter schedule items based on selected location
  const { filteredItems, activeFilter, setActiveFilter } = useFilter({
    items: schedule,
    filterKey: 'location',
    defaultFilter: 'all'
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  /**
   * Check if an event is currently happening
   * @param timeString - Time string in format "HH:MMhs"
   * @returns Boolean indicating if event is live
   */
  const isEventLive = (timeString: string): boolean => {
    const now = new Date();
    const festivalDate = new Date(FESTIVAL_DATE);
    
    // Only check if it's the festival date
    if (now.toDateString() !== festivalDate.toDateString()) {
      return false;
    }

    // Parse time string (remove 'hs' and convert to 24h format)
    const timeOnly = timeString.replace('hs', '');
    const [hours, minutes] = timeOnly.split(':').map(Number);
    
    const eventTime = new Date(festivalDate);
    eventTime.setHours(hours, minutes || 0, 0, 0);
    
    // Find next event to determine end time
    const currentIndex = schedule.findIndex(item => item.time === timeString);
    const nextEvent = schedule[currentIndex + 1];
    
    let eventEndTime: Date;
    if (nextEvent) {
      const nextTimeOnly = nextEvent.time.replace('hs', '');
      const [nextHours, nextMinutes] = nextTimeOnly.split(':').map(Number);
      eventEndTime = new Date(festivalDate);
      eventEndTime.setHours(nextHours, nextMinutes || 0, 0, 0);
    } else {
      // Last event, assume 1 hour duration
      eventEndTime = new Date(eventTime.getTime() + 60 * 60 * 1000);
    }
    
    return now >= eventTime && now < eventEndTime;
  };

  /**
   * Get CSS classes for schedule item based on its state
   * @param item - Schedule item
   * @returns String of CSS classes
   */
  const getItemClasses = (item: ScheduleItem): string => {
    const baseClasses = `${styles.scheduleItem} ${styles[`${item.location}Location`]}`;
    const liveClass = isEventLive(item.time) ? styles.liveEvent : '';
    return `${baseClasses} ${liveClass}`.trim();
  };

  /**
   * Handle location filter change
   * @param location - Selected location or 'all'
   */
  const handleLocationFilter = (location: ScheduleItem['location'] | 'all') => {
    setActiveFilter(location);
  };

  return (
    <div className={`${styles.scheduleContainer} ${className}`}>
      {/* Header */}
      <div className={styles.scheduleHeader}>
        <h2 className={styles.scheduleTitle}>Cronograma del Festival</h2>
        <p className={styles.scheduleSubtitle}>Festival DORA 2025 - Sábado 26 de Julio</p>
      </div>

      {/* Location Filters */}
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => handleLocationFilter('all')}
        >
          Todos los Escenarios
        </button>
        {locations.map((location) => (
          <button
            key={location}
            className={`${styles.filterButton} ${activeFilter === location ? styles.active : ''}`}
            onClick={() => handleLocationFilter(location)}
          >
            {getLocationDisplayName(location)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <div className={styles.timelineLine}></div>
        
        {filteredItems.map((item, index) => (
          <div key={`${item.time}-${index}`} className={getItemClasses(item)}>
            {/* Timeline Dot */}
            <div className={styles.timelineDot}>
              {isEventLive(item.time) && (
                <div className={styles.livePulse}></div>
              )}
            </div>
            
            {/* Event Content */}
            <div className={styles.eventContent}>
              <div className={styles.eventTime}>{item.time}</div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>
                  {item.artist || item.activity}
                  {isEventLive(item.time) && (
                    <span className={styles.liveIndicator}>EN VIVO</span>
                  )}
                </h3>
                {item.artist && item.activity !== item.artist && (
                  <p className={styles.eventActivity}>{item.activity}</p>
                )}
                <div className={styles.eventLocation}>
                  <span className={styles.locationIcon}>📍</span>
                  {getLocationDisplayName(item.location)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Status Footer */}
      <div className={styles.liveStatus}>
        <div className={styles.currentTime}>
          Hora actual: {currentTime.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'America/Argentina/Buenos_Aires'
          })}
        </div>
        {schedule.some(item => isEventLive(item.time)) && (
          <div className={styles.liveNotification}>
            <span className={styles.liveDot}></span>
            Evento en vivo ahora
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;