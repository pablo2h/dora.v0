import React from 'react';
import SvgIcon from './SvgIcon';
import styles from './mapLegend.module.css';

/**
 * Map Legend component that displays all unique hotspot types from the festival map
 * Shows representative examples of each type of location with orange circles and white icons
 */
const MapLegend: React.FC = () => {
  // Define unique legend items based on actual map hotspots
  // Avoiding redundant entries (e.g., showing one "Zona de Descanso" instead of multiple)
  const legendItems = [
    {
      name: 'Zonas de Descanso',
      description: 'Áreas de descanso y relajación',
      iconType: 'zona_descanso' as const
    },
    {
      name: 'Pantallas',
      description: 'Pantallas para visualización del evento',
      iconType: 'pantalla' as const
    },
    {
      name: 'Baños',
      description: 'Servicios sanitarios disponibles',
      iconType: 'baño' as const
    },
    {
      name: 'Información',
      description: 'Punto de información y acreditación',
      iconType: 'informacion' as const
    },
    {
      name: 'Cafetería',
      description: 'Servicio de café y bebidas calientes',
      iconType: 'cafeteria' as const
    },
    {
      name: 'Hamburguesas',
      description: 'Puesto de hamburguesas',
      iconType: 'hamburguesa' as const
    },
    {
      name: 'Pizza',
      description: 'Puesto de pizza',
      iconType: 'pizza' as const
    },
    {
      name: 'Puntos Interactivos',
      description: 'Puntos de interacción digital',
      iconType: 'punto_interactivo' as const
    },
    {
      name: 'Barra de Bebidas',
      description: 'Servicio de bebidas y cócteles',
      iconType: 'barra' as const
    },
    {
      name: 'Pochoclos',
      description: 'Puesto de palomitas de maíz',
      iconType: 'pochoclos' as const
    },
    {
      name: 'Sectores VIP',
      description: 'Áreas exclusivas para abonados',
      iconType: 'sector_abonados' as const
    },
    {
      name: 'Escenario Interior',
      description: 'Escenario principal del evento',
      iconType: 'escenario' as const
    }
  ];

  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendTitle}>Puntos del Mapa</h3>
      <div className={styles.legendGrid}>
        {legendItems.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <SvgIcon type={item.iconType} className={styles.legendIcon} />
            <div className={styles.legendContent}>
              <h4 className={styles.legendCategory}>
                {item.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.legendFooter}>
        <p className={styles.legendNote}>
          💡 <strong>Tip:</strong> Haz clic en cualquier punto naranja del mapa para ver información detallada
        </p>
      </div>
    </div>
  );
};

export default MapLegend;