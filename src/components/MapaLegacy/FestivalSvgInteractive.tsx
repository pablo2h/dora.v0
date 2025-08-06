import React from 'react';

interface FestivalSvgInteractiveProps {
  onHotspotClick?: (hotspotId: string) => void;
}

const FestivalSvgInteractive: React.FC<FestivalSvgInteractiveProps> = ({ onHotspotClick }) => {
  const handleElementClick = (event: React.MouseEvent<SVGElement>) => {
    const target = event.currentTarget;
    const hotspotId = target.id;
    if (hotspotId && onHotspotClick) {
      onHotspotClick(hotspotId);
    }
  };

  return (
    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1070.15 615.81">
      <g id="Calle_de_acceso">
        <line x1="1068.32" y1="308.88" x2="932.44" y2="613.97" fill="none" stroke="#d7d7d7" strokeMiterlimit="10" strokeWidth="4"/>
        <line x1="785.68" y1="615.01" x2="1034.13" y2="47.37" fill="none" stroke="#d7d7d7" strokeMiterlimit="10" strokeWidth="4"/>
      </g>
      <polygon id="decorativo" points="108.8 572.58 86.58 615.01 785.68 615.01 849.12 466.72 108.8 572.58" fill="#d7d7d7"/>
      <polygon id="Espacio_verde" points="40.08 583.47 16.13 339.35 86.76 413.91 180.62 441.95 376.33 464.86 862.92 437.54 848.58 466.68 40.08 583.47" fill="#1b8b6e"/>
      <path id="Calle_de_transito_peatonal" d="M16.13,340.79l-7.14-64.9s25.47-.93,61.07,48.56c35.61,49.49,94.08,64.1,94.08,64.1,0,0,124.34,17.01,154.14,20.58,29.8,3.57,96.15,10.17,227.02,1.95,130.87-8.22,338.39-21.34,338.39-21.34l-24.19,57.33s-156.58,4.96-274.04,14.34c-73.6,5.87-148.48,7.66-194.14,8.17-28.14.32-56.24-1.63-84.08-5.8-64.77-9.69-138.16-11.09-191.47-30.94-33.09-12.32-58.89-38.98-80.4-66.97l-19.26-25.07Z" fill="#d7d7d7"/>
      <path id="sector_exterior_accesolibre" d="M0,232.56l139.02,1.69,3.36,64.3,471.17-44.09,8.07,83.56,295.41-27.82-38.16,88.1s-92.59,6.71-110.63,7.73c-56.1,3.17-180.78,12.04-227.77,14.92-61.17,3.74-144.82,7.55-205.21.92-60.39-6.63-160.26-17.77-189.41-28.82-29.15-11.05-42.52-18.92-57.79-33.42-15.27-14.5-33.84-53.59-53.36-67.4-17.31-12.24-30.54-14.73-30.54-14.73L0,232.56Z" fill="#2daf91"/>
      <path id="puestos-comida" d="M43.87,294.01s8.68,9.2,22.86,30.25c7.04,10.44,14.61,21.74,19.87,28.14,10.18,12.37,21.99,19.54,35.53,26.78,10.1,5.41,29.32,12.61,39.74,15.83,30.59,9.48,132.07,18.98,132.07,18.98l8.29-129.03-157.5,14.17-1.57-27.56-99.29,22.44Z" fill="#2daf91" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="zona-vip" points="596.28 19.3 809.73 1.08 839.09 318.65 622.31 340.78 596.28 19.3" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="escenario-principal" points="255.46 136.44 603.17 104.4 615.37 256.79 262.47 288.54 255.46 136.44" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="servicios" points="133.78 107.18 255.32 96.77 260.01 222.47 314.65 218.3 319.22 283.43 262.47 288.54 144.74 299.13 133.78 107.18" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      
      {/* Zona de descanso abonados */}
      <g id="zona_descanso_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_zona_descanso_abonados" cx="739.76" cy="240.34" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_abonados-2" d="M746,233.32l3.12,14.04M733.51,233.32l-3.12,14.04M728.83,233.32h21.85M753.8,241.12h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      {/* Pantalla abonados */}
      <g id="pantalla_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_pantalla_abonados">
          <circle id="v" cx="640.72" cy="135.53" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="pantalla_abonados-2">
          <path d="M624.41,131c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v16.31c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-16.31Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M647.97,120.12l-7.25,7.25-7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      {/* Zona pantallas exteriores */}
      <g id="zona-pantallas" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_pantalla_exterior_escenario_exterior">
          <circle id="v-2" cx="461.1" cy="305.25" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="pantalla_exterior_escenario_exterior-2">
          <path d="M444.79,300.72c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v16.31c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-16.31Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M468.35,289.85l-7.25,7.25-7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      {/* Baño sector exterior */}
      <g id="baño_sectorexterior" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_baño_sectorexterior">
          <circle id="v-3" cx="195.93" cy="202.08" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="baño_sectorexterior-2">
          <path d="M179.62,193.02c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v18.12c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-18.12Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M185.97,196.64l.91,10.87,3.62-7.25,3.62,7.25.91-10.87" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M205,199.36c0-1.5-1.22-2.72-2.72-2.72s-2.72,1.22-2.72,2.72v5.44c0,1.5,1.22,2.72,2.72,2.72s2.72-1.22,2.72-2.72" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
      </g>
      
      {/* Baño abonados */}
      <g id="baño_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_baño_abonados">
          <circle id="v-4" cx="647.97" cy="230.06" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="baño_abonados-2">
          <path d="M631.65,221c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v18.12c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-18.12Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M638,224.62l.91,10.87,3.62-7.25,3.62,7.25.91-10.87" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M657.03,227.34c0-1.5-1.22-2.72-2.72-2.72s-2.72,1.22-2.72,2.72v5.44c0,1.5,1.22,2.72,2.72,2.72s2.72-1.22,2.72-2.72" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
      </g>
      
      {/* Zonas de descanso sector exterior */}
      <g id="zona_descanso_sectore_exterior_1" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_zona_descanso_sectore_exterior_1" cx="461.1" cy="379.02" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_sectore_exterior_1-2" d="M467.34,372l3.12,14.04M454.86,372l-3.12,14.04M450.18,372h21.85M475.14,379.8h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      <g id="zona_descanso_sectore_exterior_2" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor-zona_descanso_sectore_exterior_2" cx="346.31" cy="367.37" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_sectore_exterior_2-2" d="M352.55,360.35l3.12,14.04M340.06,360.35l-3.12,14.04M335.38,360.35h21.85M360.35,368.15h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      {/* Información acreditación */}
      <g id="informacion_acreeditacion" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor._informaciom_acreditacion">
          <g id="pantalla_abonados-3">
            <circle id="v-5" cx="799.32" cy="358.05" r="29.02" fill="#ef5d34"/>
          </g>
        </g>
        <g id="informaciom_acreditacion">
          <path d="M783.01,358.05c0,9.01,7.3,16.31,16.31,16.31s16.31-7.3,16.31-16.31-7.3-16.31-16.31-16.31-16.31,7.3-16.31,16.31" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M799.32,352.61h.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M797.51,358.05h1.81v7.25h1.81" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      {/* Flechas de ingreso */}
      <path id="flecha_ingreso_festival" d="M894.44,421.68h-42.26v17.93c0,2.76-2.37,5-5.28,5-1.4,0-2.74-.53-3.73-1.46l-34.79-32.94c-2.06-1.95-2.06-5.12,0-7.07l34.79-32.94c2.06-1.95,5.41-1.95,7.47,0,.99.94,1.55,2.21,1.55,3.53v17.93h42.26c2.92,0,5.28,2.24,5.28,5v20.01c0,2.76-2.37,5-5.28,5Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path id="flecha_ingreso_sector_abonados" d="M587.39,297.84l24.48-1.31-.56-10.39c-.09-1.6,1.22-2.97,2.9-3.06.81-.04,1.61.22,2.21.73l21.17,18c1.26,1.07,1.35,2.9.22,4.1l-19.13,20.16c-1.13,1.2-3.07,1.3-4.33.23-.6-.51-.96-1.23-1.01-2l-.56-10.39-24.48,1.31c-1.69.09-3.13-1.13-3.22-2.73l-.62-11.59c-.09-1.6,1.21-2.97,2.9-3.06Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path id="flecha_ingreso_sector_escenario" d="M381.67,311.8l-.47-24.51-10.4.2c-1.6.03-2.93-1.32-2.96-3.01-.02-.81.28-1.6.81-2.18l18.72-20.54c1.11-1.22,2.95-1.25,4.1-.08l19.48,19.81c1.16,1.17,1.19,3.11.08,4.33-.53.58-1.26.92-2.03.94l-10.4.2.47,24.51c.03,1.69-1.24,3.09-2.84,3.12l-11.6.22c-1.6.03-2.93-1.32-2.96-3.01Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      
      {/* Puesto pizza */}
      <g id="puesto-pizza" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-6" cx="116.06" cy="309.32" r="25.63" fill="#ef5d34"/>
        <path d="M105.59,298.85c3.44-3.44,7.55-5.93,11.87-7.38l9.08,28.32-28.32-9.08c1.51-4.47,4.03-8.53,7.38-11.87Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M119.46,297.74c-3.61,1.17-6.89,3.18-9.56,5.86-2.55,2.54-4.5,5.63-5.69,9.03" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M116.33,311.86h.01" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M115.21,306.21h.01" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Puesto cafetería */}
      <g id="puesto_cafeteria" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-8" cx="147.81" cy="354.8" r="25.63" fill="#ef5d34"/>
        <path d="M133.41,358c1.33,1.03,3.33,1.63,5.6,1.6,2.28.03,4.27-.57,5.6-1.6s3.33-1.63,5.6-1.6c2.28-.03,4.27.57,5.6,1.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M141.41,340.39c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M147.81,340.39c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M133.41,351.6h22.41v8c0,5.3-4.3,9.61-9.61,9.61h-3.2c-5.3,0-9.61-4.3-9.61-9.61v-8Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M155.41,362.36c2.41,1.11,5.26.05,6.37-2.36s.05-5.26-2.36-6.37c-1.13-.52-2.43-.58-3.6-.16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Puesto hamburguesas */}
      <g id="puesto_hamburgesas" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-9" cx="201.14" cy="369.21" r="25.63" fill="#ef5d34"/>
        <path d="M197.64,362.48l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M192.83,367.29l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M191.44,368.54l9.04-9.02c4.27-4.26,9.48-6,13.87-1.93l.3.29c1.87,1.87,1.87,4.89,0,6.76,0,0,0,0,0,0l-18.07,18.05c-1.79,1.78-4.65,1.87-6.55.22l-.23-.22c-4.37-4.36-2.73-9.79,1.64-14.15Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M202.44,357.68l2.4,5.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Kiosco merchandising */}
      <g id="kiosco-merchandising" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-10" cx="683.33" cy="368.74" r="29.02" fill="#ef5d34"/>
        <path d="M680.61,379.62v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M675.18,379.02c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Puntos interactivos adicionales */}
      <g id="punto_interactivo_2" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-11" cx="792.75" cy="173.06" r="29.02" fill="#ef5d34"/>
        <path d="M790.03,183.93v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M784.6,183.34c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      <g id="punto_interactivo_3" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-12" cx="706.01" cy="43.66" r="29.02" fill="#ef5d34"/>
        <path d="M703.29,54.54v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M697.85,53.94c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Barra */}
      <g id="barra" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_barra" cx="538.82" cy="297.22" r="29.02" fill="#ef5d34"/>
        <path d="M533.39,313.54h10.87c1,0,1.81-.81,1.81-1.81v-6.57c0-2.53.53-5.03,1.53-7.3l.56-1.27c1.01-2.27,1.53-4.08,1.53-6.62v-7.25c0-1-.81-1.81-1.81-1.81h-18.12c-1,0-1.81.81-1.81,1.81v7.25c0,2.53.53,4.35,1.53,6.62l.56,1.27c1.01,2.3,1.54,4.78,1.53,7.3v6.57c0,1,.81,1.81,1.81,1.81Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <path d="M527.95,289.97h21.75" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      {/* Puesto pochoclos */}
      <g id="pueso_pochoclos" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_puesto_gastronomico-3" cx="256.03" cy="376.36" r="25.63" fill="#ef5d34"/>
        <path d="M268.49,363.79c-.06-1.66-1.15-3.12-2.78-3.78-.79-1.41-2.37-2.3-4.11-2.3-1.37,0-2.67.57-3.54,1.52-.53-.19-1.1-.29-1.68-.29-1.09,0-2.12.35-2.95.98-.73-.42-1.58-.65-2.46-.65-2.25,0-4.14,1.49-4.55,3.47-.12,0-.25-.01-.37-.01-2.55,0-4.63,1.92-4.63,4.28,0,1.66,1.04,3.11,2.54,3.82l2.48,21.05c.07.63.55,1.16,1.21,1.33.15.04,3.57.92,8.3.97.02,0,.04,0,.06,0,.01,0,.03,0,.04,0,.12,0,.24,0,.37,0,2.93,0,5.73-.33,8.32-.97.68-.17,1.17-.71,1.23-1.36l2.07-20.63c1.51-.7,2.56-2.15,2.56-3.82,0-1.46-.82-2.81-2.12-3.6ZM247.67,372.66c1.56.12,3.89.24,6.68.29v1.8c-3.1.97-5.34,2.74-5.94,4.52l-.74-6.61ZM254.35,391.01c-2.02-.12-3.68-.37-4.69-.57l-.99-8.8c.79,1.22,2.6,1.93,5.02,1.93.21,0,.43,0,.65-.02v7.45h0ZM262.76,390.47c-1.6.33-3.3.52-5.06.59v-8.08c1.94-.57,3.64-1.48,4.81-2.57.66-.62,1.12-1.26,1.36-1.9l-1.12,11.97ZM264.02,376.91c-.02-.1-.05-.2-.08-.29-.53-1.6-2.52-2.55-5.32-2.55-.3,0-.61.01-.92.03v-1.14c2.34-.03,4.59-.1,6.72-.29l-.39,4.23ZM267.48,368.94c-.68.22-3.7,1.02-11.58,1.02-4.7,0-7.6-.28-9.31-.55,0,0-.09-.02-.14-.02-.3-.05-.57-.1-.79-.14-1.03-.34-1.76-1.22-1.76-2.26,0-1.33,1.21-2.41,2.7-2.41.29,0,.58.04.86.12l1.18.35-.06-1.11s0-.08,0-.13c0-1.33,1.21-2.41,2.7-2.41.68,0,1.33.23,1.83.64l.65.54.57-.61c.51-.55,1.27-.87,2.07-.87.5,0,.99.12,1.42.36l.75.41.44-.68c.48-.75,1.38-1.22,2.34-1.22,1.09,0,2.07.58,2.49,1.48l.15.32.36.11c1.1.33,1.83,1.25,1.83,2.28,0,.08,0,.15-.01.23l-.06.53.54.23c.94.4,1.54,1.25,1.54,2.18,0,.61-.26,1.18-.69,1.6Z" fill="#fff"/>
      </g>
      
      {/* Flecha ingreso sector baño */}
      <path id="flecha_ingreso_sector_baño_sectore_exterior" d="M284.21,291.67l-.69-13.59-5.77.29c-.89.04-1.65-.68-1.69-1.62-.02-.45.12-.89.41-1.22l10.02-11.72c.59-.69,1.61-.75,2.27-.11l11.15,10.65c.66.63.72,1.71.12,2.4-.29.33-.69.53-1.11.55l-5.77.29.69,13.59c.05.94-.63,1.73-1.52,1.78l-6.43.32c-.89.04-1.65-.68-1.69-1.62Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      
      {/* Sectores de abonados */}
      <g id="sector_abonados_salon" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_abonados_1" cx="722.59" cy="135.53" r="33.71" fill="#ef5d34"/>
        <path id="abonados_1" d="M722.59,124.65l7.25,10.87,9.06-7.25-3.62,18.12h-25.37l-3.62-18.12,9.06,7.25,7.25-10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
      
      <g id="sector_abonados_escenarios" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="Contenedor_abonados_2" cx="413.55" cy="195.03" r="33.71" fill="#ef5d34"/>
        <path id="abonados_2" d="M413.55,184.16l7.25,10.87,9.06-7.25-3.62,18.12h-25.37l-3.62-18.12,9.06,7.25,7.25-10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
      
      <g id="escenario_interior" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_escenario" cx="549.7" cy="183.93" r="33.71" fill="#ef5d34"/>
        <path d="M535.2,198.43h29" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
        <path d="M564.2,191.18v-18.12c0-2-1.62-3.62-3.62-3.62h-21.75c-2,0-3.62,1.62-3.62,3.62v18.12l7.25-10.87c4.83,2.42,9.67,2.42,14.5,0l7.25,10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
    </svg>
  );
};

export default FestivalSvgInteractive;