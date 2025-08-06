// Schedule data for Festival DORA 2025
export interface ScheduleItem {
  time: string;
  activity: string;
  location: 'escenario' | 'exterior' | 'general';
  artist?: string;
}

/**
 * Festival DORA 2025 - Complete Schedule
 * Updated with new times from 17:00 to 23:00
 */
export const schedule: ScheduleItem[] = [
  { time: "17:00hs", activity: "Apertura", location: "general" },
  { time: "17:00hs", activity: "Delpo DJ Set", location: "general" },
  { time: "18:00hs", activity: "Zacaro y los Puerkos", location: "escenario", artist: "Zacaro y los Puerkos" },
  { time: "19:00hs", activity: "Stand Up Comedy Litoral", location: "exterior", artist: "Stand Up Comedy Litoral" },
  { time: "19:30hs", activity: "La Tercera Fase del Plan", location: "escenario", artist: "La Tercera Fase del Plan" },
  { time: "20:15hs", activity: "Presentación solista de JOA", location: "exterior", artist: "Joa Atencio" },
  { time: "20:45hs", activity: "Rosario Smowing", location: "escenario", artist: "Rosario Smowing" },
  { time: "21:30hs", activity: "DJ Set final", location: "general" },
  { time: "22:45hs", activity: "Cierre de cajas", location: "general" },
  { time: "23:00hs", activity: "CIERRE DEL EVENTO", location: "general" }
];

/**
 * Get location CSS class for styling
 * @param location - The venue location type
 * @returns CSS class name for location styling
 */
export const getLocationClass = (location: ScheduleItem['location']): string => {
  switch (location) {
    case 'escenario':
      return 'escenarioLocation';
    case 'exterior':
      return 'exteriorLocation';
    case 'general':
      return 'generalLocation';
    default:
      return 'generalLocation';
  }
};

/**
 * Get location CSS class with styles prefix for CSS modules
 * @param location - The venue location type
 * @param styles - CSS modules styles object
 * @returns CSS class with styles prefix
 */
export const getLocationClassWithStyles = (location: ScheduleItem['location'], styles: any): string => {
  switch (location) {
    case 'escenario':
      return styles.escenarioLocation;
    case 'exterior':
      return styles.exteriorLocation;
    case 'general':
      return styles.generalLocation;
    default:
      return styles.generalLocation || '';
  }
};

/**
 * Get location identifier for CSS class names
 * @param location - The venue location type
 * @returns Location identifier string
 */
export const getLocationId = (location: ScheduleItem['location']): string => {
  return location;
};

/**
 * Get location display name
 * @param location - The venue location type
 * @returns Human-readable location name
 */
export const getLocationDisplayName = (location: ScheduleItem['location']): string => {
  switch (location) {
    case 'escenario':
      return 'Escenario Principal (Interior)';
    case 'exterior':
      return 'Sector Exterior';
    case 'general':
      return 'General';
    default:
      return 'General';
  }
};

// Festival timing constants
export const FESTIVAL_START_TIME = "17:00";
export const FESTIVAL_END_TIME = "23:00";
export const FESTIVAL_DATE = "2025-07-26";
export const FESTIVAL_LOCATION = "Vieja Usina - Paraná, Entre Ríos";