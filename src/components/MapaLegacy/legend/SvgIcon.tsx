import React from 'react';

interface SvgIconProps {
  type: 'zona_descanso' | 'pantalla' | 'baño' | 'informacion' | 'cafeteria' | 'hamburguesa' | 'punto_interactivo' | 'barra' | 'pochoclos' | 'sector_abonados' | 'escenario' | 'pizza';
  size?: number;
  className?: string;
}

/**
 * SvgIcon component that renders the exact SVG icons from the festival map
 * with orange background and white icons matching the interactive map hotspots
 */
const SvgIcon: React.FC<SvgIconProps> = ({ type, size = 32, className }) => {
  const renderIcon = () => {
    const scale = 0.8; // Fixed scale for consistent sizing
    
    switch (type) {
      case 'zona_descanso':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M6,0l3.12,14.04M-6,0l-3.12,14.04M-10.68,0h21.85M13.75,7.8h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'pantalla':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-12.69,-4.53c0-2,1.62-3.62,3.62-3.62h18.13c2,0,3.62,1.62,3.62,3.62v12.69c0,2-1.62,3.62-3.62,3.62h-18.13c-2,0-3.62-1.62-3.62-3.62v-12.69Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M7.25,-12l-7.25,7.25-7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'baño':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-12.69,-9.06c0-2,1.62-3.62,3.62-3.62h18.13c2,0,3.62,1.62,3.62,3.62v14.5c0,2-1.62,3.62-3.62,3.62h-18.13c-2,0-3.62-1.62-3.62-3.62v-14.5Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-7.25,-5.43l.91,8.7,3.62-5.8,3.62,5.8.91-8.7" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M7.25,-2.72c0-1.2-1-2.17-2.17-2.17s-2.17,1-2.17,2.17v4.35c0,1.2,1,2.17,2.17,2.17s2.17-1,2.17-2.17" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'informacion':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-13,0c0,7.18,5.82,13,13,13s13-5.82,13-13-5.82-13-13-13-13,5.82-13,13" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M0,-4.35h.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M-1.45,0h1.45v5.8h1.45" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'cafeteria':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-11.53,2.56c1.06.82,2.66,1.3,4.48,1.28,1.82.02,3.42-.46,4.48-1.28s2.66-1.3,4.48-1.28c1.82-.02,3.42.46,4.48,1.28" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-5.12,-11.53c-.82.59-1.3,1.55-1.28,2.56-.02,1.02.46,1.97,1.28,2.56" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M0,-11.53c-.82.59-1.3,1.55-1.28,2.56-.02,1.02.46,1.97,1.28,2.56" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-11.53,-2.56h17.93v6.4c0,4.24-3.44,7.69-7.69,7.69h-2.56c-4.24,0-7.69-3.44-7.69-7.69v-6.4Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'hamburguesa':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-2.81,6.15l1.92,4.48" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-6.65,9.99l1.92,4.48" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-7.76,10.99l7.23-7.22c3.42-3.41,7.58-4.8,11.1-1.54l.24.23c1.5,1.5,1.5,3.91,0,5.41l-14.46,14.44c-1.43,1.42-3.72,1.5-5.24.18l-.18-.18c-3.5-3.49-2.18-7.83,1.31-11.32Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M1.04,2.3l1.92,4.48" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'punto_interactivo':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-2.18,8.7v-21.75l10.15,5.8-10.15,5.8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-6.53,8.22c-.9.52-1.45,1.19-1.45,1.93,0,1.59,2.61,2.9,5.8,2.9s5.8-1.3,5.8-2.9c0-.73-.55-1.41-1.45-1.93" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'barra':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-4.35,13.05h8.7c.8,0,1.45-.65,1.45-1.45v-5.25c0-2.02.42-4.02,1.22-5.84l.45-1.02c.81-1.82,1.22-3.26,1.22-5.3v-5.8c0-.8-.65-1.45-1.45-1.45h-14.5c-.8,0-1.45.65-1.45,1.45v5.8c0,2.02.42,3.48,1.22,5.3l.45,1.02c.81,1.84,1.23,3.82,1.22,5.84v5.25c0,.8.65,1.45,1.45,1.45Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M-8.7,-5.8h17.4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'pochoclos':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M9.98,-10.06c-.05-1.33-.92-2.5-2.22-3.02-.63-1.13-1.9-1.84-3.29-1.84-1.1,0-2.14.46-2.83,1.22-.42-.15-.88-.23-1.34-.23-.87,0-1.7.28-2.36.78-.58-.34-1.26-.52-1.97-.52-1.8,0-3.31,1.19-3.64,2.78-.1,0-.2-.01-.3-.01-2.04,0-3.7,1.54-3.7,3.42,0,1.33.83,2.49,2.03,3.06l1.98,16.84c.06.5.44.93.97,1.06.12.03,2.86.74,6.64.78h.08c.1,0,.19,0,.3,0,2.34,0,4.58-.26,6.66-.78.54-.14.94-.57.98-1.09l1.66-16.5c1.21-.56,2.05-1.72,2.05-3.06,0-1.17-.66-2.25-1.7-2.88Z" fill="#fff" strokeWidth="0.4"/>
          </g>
        );
      case 'sector_abonados':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M0,-9.5l5.8,8.7,7.25-5.8-2.9,14.5h-20.3l-2.9-14.5,7.25,5.8,5.8-8.7Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          </g>
        );
      case 'escenario':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M-11.6,11.6h23.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path d="M11.6,5.8v-14.5c0-1.6-1.3-2.9-2.9-2.9h-17.4c-1.6,0-2.9,1.3-2.9,2.9v14.5l5.8-8.7c3.86,1.94,7.74,1.94,11.6,0l5.8,8.7Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          </g>
        );
      case 'pizza':
        return (
          <g transform={`scale(${scale})`}>
            <path d="M0,-12L10,8H-10L0,-12Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <circle cx="-2" cy="2" r="1.5" fill="#ef5d34"/>
            <circle cx="4" cy="0" r="1" fill="#4CAF50"/>
            <circle cx="0" cy="4" r="1" fill="#FFC107"/>
            <circle cx="6" cy="4" r="1.5" fill="#ef5d34"/>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: '#ef5d34', // Orange color from SVG
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        flexShrink: 0
      }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="-20 -20 40 40"
        style={{ display: 'block' }}
      >
        {renderIcon()}
      </svg>
    </div>
  );
};

export default SvgIcon;