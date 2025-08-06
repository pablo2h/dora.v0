'use client';

import React, { useState, useCallback } from 'react';
import { festivalHotspots_v2, getHotspotById, FestivalHotspot } from '../../data/festivalHotspots_v2';
import FestivalSvgInteractive from './FestivalSvgInteractive';
import FestivalSvgVertical from './FestivalSvgVertical';
import HotspotModal from './HotspotModal';
import useBreakpoint from '../../hooks/useBreakpoint';
import styles from './interactiveMap.module.css';

/**
 * InteractiveMap component - Refactored to use new ID-based linking system
 * Uses FestivalSvgInteractive component and festivalHotspots_v2 data
 */
export default function InteractiveMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<FestivalHotspot | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const breakpoint = useBreakpoint();

  /**
   * Handle hotspot click from SVG component
   * @param hotspotId - ID of the clicked hotspot
   */
  const handleHotspotClick = useCallback((hotspotId: string) => {
    const hotspot = getHotspotById(hotspotId);
    if (hotspot) {
      setSelectedHotspot(hotspot);
      setActiveHotspot(hotspotId);
    }
  }, []);

  /**
   * Close the hotspot modal and reset state
   */
  const closeModal = useCallback(() => {
    setSelectedHotspot(null);
    setActiveHotspot(null);
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        {breakpoint === 'mobile' ? (
          <FestivalSvgVertical onHotspotClick={handleHotspotClick} />
        ) : (
          <FestivalSvgInteractive onHotspotClick={handleHotspotClick} />
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