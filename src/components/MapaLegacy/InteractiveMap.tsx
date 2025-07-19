'use client';

import { useState, useRef, useEffect } from 'react';
import { InteractiveMapProps, MapHotspot } from '../../types/map';
import { mapConfig } from '../../data/festivalHotspots';
import MapHotspotComponent from './MapHotspot';
import HotspotModal from './HotspotModal';
import styles from './Mapa.module.css';

/**
 * Interactive SVG map component that replaces the Google Maps iframe
 * Features clickable hotspots with detailed information modals
 * @param title - Map title (default: "Vieja Usina")
 * @param address - Venue address
 * @param className - Additional CSS classes
 */
export default function InteractiveMap({ 
  title = "Vieja Usina", 
  address = "San Martín 861, Paraná, Entre Ríos",
  className = ""
}: InteractiveMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Handle hotspot click - opens modal with hotspot information
   * @param hotspot - The clicked hotspot
   */
  const handleHotspotClick = (hotspot: MapHotspot) => {
    setSelectedHotspot(hotspot);
    setIsModalOpen(true);
  };

  /**
   * Close the modal and reset selected hotspot
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotspot(null);
  };

  /**
   * Handle keyboard navigation on the SVG
   * @param event - Keyboard event
   */
  const handleSvgKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Escape' && isModalOpen) {
      handleCloseModal();
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (!isModalOpen && svgRef.current) {
      // Return focus to SVG when modal closes
      const focusableElements = svgRef.current.querySelectorAll('[tabindex="0"]');
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isModalOpen]);

  return (
    <div className={`${styles.mapContainer} ${className}`}>
      <h3>{title}</h3>
      <p className={styles.address}>{address}</p>
      
      <div className={styles.interactiveMapWrapper}>
        <svg
          ref={svgRef}
          viewBox={mapConfig.viewBox}
          className={styles.interactiveSvg}
          role="img"
          aria-label="Mapa interactivo del Festival DORA 2025"
          onKeyDown={handleSvgKeyDown}
          tabIndex={0}
        >
          {/* Load the base SVG map */}
          <g className={styles.baseSvg}>
            {/* Base map paths from the original SVG */}
            <g transform="translate(0.000000,1351.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path d="M2800 12495 c-30 -9 -73 -28 -95 -43 -48 -33 -102 -110 -118 -168 l-11 -43 -44 40 c-49 46 -158 101 -247 124 -82 22 -307 31 -387 16 -122 -24 -195 -82 -219 -173 -19 -69 -2 -111 79 -201 l68 -77 1 -150 c0 -138 -1 -150 -18 -155 -30 -10 -78 -54 -96 -88 -20 -40 -20 -124 0 -163 9 -17 48 -65 87 -107 79 -85 113 -101 238 -112 l72 -7 0 -107 c0 -130 19 -173 90 -208 l44 -23 1323 0 c1440 0 1360 -3 1414 56 41 45 49 85 49 237 l0 140 28 -28 c40 -41 89 -58 162 -58 76 0 131 24 177 77 48 54 58 96 57 236 -2 205 -49 420 -129 585 -34 72 -62 110 -131 183 -109 117 -158 144 -269 150 -136 7 -236 -46 -310 -167 l-36 -58 -71 74 c-119 122 -228 158 -453 150 -194 -7 -303 -50 -369 -146 l-29 -41 -21 28 c-59 80 -162 182 -208 207 -95 52 -235 44 -311 -17 l-38 -30 -22 20 c-54 51 -167 71 -257 47z" />
            </g>
          </g>
          
          {/* Render interactive hotspots */}
          {mapConfig.hotspots.map((hotspot) => (
            <MapHotspotComponent
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              isActive={selectedHotspot?.id === hotspot.id}
            />
          ))}
        </svg>
        
        {/* Map legend */}
        <div className={styles.mapLegend}>
          <h4 className={styles.legendTitle}>Puntos de Interés</h4>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>🎤</span>
              <span>Escenario</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>🍔</span>
              <span>Comida</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>🛍️</span>
              <span>Kiosco</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>👑</span>
              <span>VIP</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>📺</span>
              <span>Pantallas</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon}>🚻</span>
              <span>Servicios</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions for users */}
      <div className={styles.mapInstructions}>
        <p>💡 Haz click en los puntos del mapa para ver información detallada</p>
      </div>
      
      {/* Link to Google Maps (keeping original functionality) */}
      <a 
        href="https://maps.app.goo.gl/WoTxrpPCtWqMpbt3A"
        className={styles.mapLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en Google Maps
        <span aria-hidden="true">🗺️</span>
      </a>
      
      {/* Hotspot information modal */}
      <HotspotModal
        hotspot={selectedHotspot}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}