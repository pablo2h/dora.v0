import React from 'react';

interface SvgIconProps {
  type: 'zona_descanso' | 'pantalla' | 'baño' | 'informacion' | 'cafeteria' | 'hamburguesa' | 'punto_interactivo' | 'barra' | 'pochoclos' | 'sector_abonados' | 'escenario';
}

export default function SvgIcon({ type }: SvgIconProps) {
  const renderIcon = () => {
    switch (type) {
      case 'zona_descanso':
        return (
          <g>
            <path d="M6,0l3.12,14.04M-6,0l-3.12,14.04M-10.68,0h21.85M13.75,7.8h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'pantalla':
        return (
          <g>
            <path d="M-16.31,-4.53c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v16.31c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-16.31Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M7.25,-15.41l-7.25,7.25-7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'baño':
        return (
          <g>
            <path d="M-16.31,-9.06c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v18.12c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-18.12Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-9.97,-5.43l.91,10.87,3.62-7.25,3.62,7.25.91-10.87" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M9.06,-2.72c0-1.5-1.22-2.72-2.72-2.72s-2.72,1.22-2.72,2.72v5.44c0,1.5,1.22,2.72,2.72,2.72s2.72-1.22,2.72-2.72" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'informacion':
        return (
          <g>
            <path d="M-16.31,0c0,9.01,7.3,16.31,16.31,16.31s16.31-7.3,16.31-16.31-7.3-16.31-16.31-16.31-16.31,7.3-16.31,16.31" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M0,-5.44h.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M-1.81,0h1.81v7.25h1.81" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'cafeteria':
        return (
          <g>
            <path d="M-14.41,3.2c1.33,1.03,3.33,1.63,5.6,1.6,2.28.03,4.27-.57,5.6-1.6s3.33-1.63,5.6-1.6c2.28-.03,4.27.57,5.6,1.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-6.4,-14.41c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M0,-14.41c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-14.41,-3.2h22.41v8c0,5.3-4.3,9.61-9.61,9.61h-3.2c-5.3,0-9.61-4.3-9.61-9.61v-8Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'hamburguesa':
        return (
          <g>
            <path d="M-3.51,7.69l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-8.31,12.49l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-9.7,13.74l9.04-9.02c4.27-4.26,9.48-6,13.87-1.93l.3.29c1.87,1.87,1.87,4.89,0,6.76l-18.07,18.05c-1.79,1.78-4.65,1.87-6.55.22l-.23-.22c-4.37-4.36-2.73-9.79,1.64-14.15Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M1.3,2.88l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'punto_interactivo':
        return (
          <g>
            <path d="M-2.72,10.88v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M-8.16,10.28c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        );
      case 'barra':
        return (
          <g>
            <path d="M-5.44,16.31h10.87c1,0,1.81-.81,1.81-1.81v-6.57c0-2.53.53-5.03,1.53-7.3l.56-1.27c1.01-2.27,1.53-4.08,1.53-6.62v-7.25c0-1-.81-1.81-1.81-1.81h-18.12c-1,0-1.81.81-1.81,1.81v7.25c0,2.53.53,4.35,1.53,6.62l.56,1.27c1.01,2.3,1.54,4.78,1.53,7.3v6.57c0,1,.81,1.81,1.81,1.81Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M-10.87,-7.25h21.75" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        );
      case 'pochoclos':
        return (
          <g>
            <path d="M12.47,-12.57c-.06-1.66-1.15-3.12-2.78-3.78-.79-1.41-2.37-2.3-4.11-2.3-1.37,0-2.67.57-3.54,1.52-.53-.19-1.1-.29-1.68-.29-1.09,0-2.12.35-2.95.98-.73-.42-1.58-.65-2.46-.65-2.25,0-4.14,1.49-4.55,3.47-.12,0-.25-.01-.37-.01-2.55,0-4.63,1.92-4.63,4.28,0,1.66,1.04,3.11,2.54,3.82l2.48,21.05c.07.63.55,1.16,1.21,1.33.15.04,3.57.92,8.3.97h.1c.12,0,.24,0,.37,0,2.93,0,5.73-.33,8.32-.97.68-.17,1.17-.71,1.23-1.36l2.07-20.63c1.51-.7,2.56-2.15,2.56-3.82,0-1.46-.82-2.81-2.12-3.6Z" fill="#fff" strokeWidth="0.5"/>
          </g>
        );
      case 'sector_abonados':
        return (
          <g>
            <path d="M0,-11.87l7.25,10.87,9.06-7.25-3.62,18.12h-25.37l-3.62-18.12,9.06,7.25,7.25-10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          </g>
        );
      case 'escenario':
        return (
          <g>
            <path d="M-14.5,14.5h29" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path d="M14.5,7.25v-18.12c0-2-1.62-3.62-3.62-3.62h-21.75c-2,0-3.62,1.62-3.62,3.62v18.12l7.25-10.87c4.83,2.42,9.67,2.42,14.5,0l7.25,10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#ef5d34',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
        flexShrink: 0
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="-16 -16 32 32"
        style={{ overflow: 'visible' }}
      >
        {renderIcon()}
      </svg>
    </div>
  );
}