'use client';

import { MapHotspotProps } from '../../types/map';
import styles from './Mapa.module.css';

/**
 * Individual hotspot component that renders as a clickable point on the SVG map
 * @param hotspot - The hotspot data
 * @param onClick - Function called when hotspot is clicked
 * @param isActive - Whether this hotspot is currently active/selected
 */
export default function MapHotspot({ hotspot, onClick, isActive = false }: MapHotspotProps) {
  const handleClick = () => {
    onClick(hotspot);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(hotspot);
    }
  };

  return (
    <g className={styles.hotspotGroup}>
      {/* Hotspot circle background */}
      <circle
        cx={hotspot.coordinates.x}
        cy={hotspot.coordinates.y}
        r="25"
        className={`${styles.hotspotCircle} ${styles[`hotspot-${hotspot.category}`]} ${
          isActive ? styles.hotspotActive : ''
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Ver información de ${hotspot.name}`}
        aria-describedby={`hotspot-${hotspot.id}-desc`}
      />
      
      {/* Hotspot icon */}
      <text
        x={hotspot.coordinates.x}
        y={hotspot.coordinates.y}
        className={styles.hotspotIcon}
        textAnchor="middle"
        dominantBaseline="central"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        aria-hidden="true"
        pointerEvents="none"
      >
        {hotspot.icon}
      </text>
      
      {/* Hotspot label */}
      <text
        x={hotspot.coordinates.x}
        y={hotspot.coordinates.y + 45}
        className={styles.hotspotLabel}
        textAnchor="middle"
        dominantBaseline="central"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        aria-hidden="true"
        pointerEvents="none"
      >
        {hotspot.name}
      </text>
      
      {/* Screen reader description */}
      <desc id={`hotspot-${hotspot.id}-desc`}>
        {hotspot.info.description}
      </desc>
      
      {/* Pulse animation ring for active state */}
      {isActive && (
        <circle
          cx={hotspot.coordinates.x}
          cy={hotspot.coordinates.y}
          r="35"
          className={styles.hotspotPulse}
          aria-hidden="true"
          pointerEvents="none"
        />
      )}
    </g>
  );
}