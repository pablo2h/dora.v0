'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { svgHotspots, getHotspotById, getHotspotCoordinates, HotspotData } from './svgHotspots';
import HotspotModal from './HotspotModal';
import styles from './festivalMap.module.css';

/**
 * FestivalMap component - Interactive SVG map with clickable hotspots
 * Now supports both horizontal and vertical layouts with responsive design
 */
export default function FestivalMap() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');

  // Detect mobile devices and load appropriate SVG
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load SVG content based on device type
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const svgPath = isMobile 
          ? '/assets/mapa/Mapa_vectorizado_svg_hostpots_vertical.svg'
          : '/assets/mapa/Mapa_vectorizado_svg_hostpots.svg';
        
        const response = await fetch(svgPath);
        const svgText = await response.text();
        
        // Extract only the inner content of the SVG (everything between <svg> tags)
        const svgMatch = svgText.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        if (svgMatch) {
          setSvgContent(svgMatch[1]);
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };
    
    loadSvg();
  }, [isMobile]);

  /**
   * Handle hotspot click - opens modal with hotspot information
   * @param hotspotId - ID of the clicked hotspot
   */
  const handleHotspotClick = useCallback((hotspotId: string) => {
    const hotspot = getHotspotById(hotspotId);
    if (hotspot) {
      setSelectedHotspot(hotspot);
    }
  }, []);

  // Store event handlers to properly remove them later
  const eventHandlersRef = React.useRef<Map<string, {
    click: () => void;
    mouseEnter: () => void;
    mouseLeave: () => void;
  }>>(new Map());

  // Clean up function to remove all event listeners
  const cleanupEventListeners = useCallback(() => {
    eventHandlersRef.current.forEach((handlers, hotspotId) => {
      const hotspot = svgHotspots.find(h => h.id === hotspotId);
      if (hotspot) {
        const element = document.getElementById(hotspot.containerId || hotspot.id);
        if (element) {
          element.removeEventListener('click', handlers.click);
          element.removeEventListener('mouseenter', handlers.mouseEnter);
          element.removeEventListener('mouseleave', handlers.mouseLeave);
          element.style.cursor = '';
          element.style.filter = '';
          element.style.transition = '';
          element.style.pointerEvents = '';
        }
      }
    });
    eventHandlersRef.current.clear();
  }, []);

  // Add interactivity to SVG elements after render
  const addSvgInteractivity = useCallback(() => {
    // First, clean up any existing listeners
    cleanupEventListeners();
    
    // Wait a bit for SVG to be fully rendered
    setTimeout(() => {
      svgHotspots.forEach(hotspot => {
        const element = document.getElementById(hotspot.containerId || hotspot.id);
        if (element) {
          element.style.cursor = 'pointer';
          element.style.transition = 'all 0.3s ease';
          element.style.pointerEvents = 'auto'; // Enable pointer events for hotspots
          
          // Get the correct coordinates for the current device
          const coordinates = getHotspotCoordinates(hotspot.id, isMobile);
          
          // Update the position if coordinates are available
          if (coordinates && element.tagName.toLowerCase() === 'g') {
            element.setAttribute('transform', `translate(${coordinates.x}, ${coordinates.y})`);
          }
          
          // Create event handlers
          const clickHandler = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            handleHotspotClick(hotspot.id);
          };
          const mouseEnterHandler = () => {
            setActiveHotspot(hotspot.id);
            element.style.filter = 'brightness(1.2) drop-shadow(0 0 8px rgba(239, 93, 52, 0.6))';
          };
          const mouseLeaveHandler = () => {
            setActiveHotspot(null);
            element.style.filter = 'none';
          };
          
          // Store handlers for later cleanup
          eventHandlersRef.current.set(hotspot.id, {
            click: clickHandler,
            mouseEnter: mouseEnterHandler,
            mouseLeave: mouseLeaveHandler
          });
          
          // Add event listeners
          element.addEventListener('click', clickHandler);
          element.addEventListener('mouseenter', mouseEnterHandler);
          element.addEventListener('mouseleave', mouseLeaveHandler);
        }
      });
    }, 100);
  }, [handleHotspotClick, cleanupEventListeners, isMobile]);

  // Execute after SVG content is loaded and rendered
  useEffect(() => {
    if (svgContent) {
      const timer = setTimeout(() => {
        // Verify SVG element exists before adding interactivity
        const svgElement = document.getElementById('festival-map');
        if (svgElement) {
          addSvgInteractivity();
        } else {
          // Retry after additional delay if SVG not ready
          setTimeout(() => {
            if (document.getElementById('festival-map')) {
              addSvgInteractivity();
            }
          }, 300);
        }
      }, 200);
      return () => {
        clearTimeout(timer);
        cleanupEventListeners();
      };
    }
  }, [svgContent, addSvgInteractivity, cleanupEventListeners]);

  /**
   * Close the hotspot modal and ensure proper state cleanup
   */
  const closeModal = useCallback(() => {
    setSelectedHotspot(null);
    setActiveHotspot(null);
    
    // Force re-initialization of event listeners to ensure they work properly
    setTimeout(() => {
      addSvgInteractivity();
    }, 100);
  }, [addSvgInteractivity]);

  /**
   * Handle mouse enter on hotspot elements
   * @param hotspotId - ID of the hovered hotspot
   */
  const handleMouseEnter = useCallback((hotspotId: string) => {
    setActiveHotspot(hotspotId);
  }, []);

  /**
   * Handle mouse leave on hotspot elements
   */
  const handleMouseLeave = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  // Get the correct viewBox based on orientation
  const getViewBox = () => {
    if (isMobile) {
      return "0 0 615.81 1070.15"; // Vertical orientation
    }
    return "0 0 1070.15 615.81"; // Horizontal orientation
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        {svgContent ? (
          <svg 
            id="festival-map" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox={getViewBox()}
            className={styles.interactiveSvg}
            role="img"
            aria-label="Mapa interactivo del Festival DORA 2025"
            dangerouslySetInnerHTML={{
               __html: svgContent
             }}
           />
         ) : (
           <div className={styles.loadingContainer}>
             <p>Cargando mapa...</p>
           </div>
         )}
      </div>

      {/* Hotspot Modal */}
      {selectedHotspot && (
        <HotspotModal
          hotspot={selectedHotspot}
          isOpen={!!selectedHotspot}
          onClose={closeModal}
        />
      )}
    </div>
  );
}