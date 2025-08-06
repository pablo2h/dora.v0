import React from 'react';

interface FestivalSvgVerticalProps {
  onHotspotClick?: (hotspotId: string) => void;
}

const FestivalSvgVertical: React.FC<FestivalSvgVerticalProps> = ({ onHotspotClick }) => {
  const handleElementClick = (event: React.MouseEvent<SVGElement>) => {
    const target = event.currentTarget;
    const hotspotId = target.id;
    if (hotspotId && onHotspotClick) {
      onHotspotClick(hotspotId);
    }
  };

  return (
    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 615.81 1070.15">
      <g id="Calle_de_acceso">
        <line x1="306.93" y1="1068.32" x2="1.84" y2="932.44" fill="none" stroke="#d7d7d7" strokeMiterlimit="10" strokeWidth="4"/>
        <line x1=".8" y1="785.68" x2="568.44" y2="1034.13" fill="none" stroke="#d7d7d7" strokeMiterlimit="10" strokeWidth="4"/>
      </g>
      <polygon id="decorativo" points="43.23 108.8 .8 86.58 .8 785.68 149.09 849.12 43.23 108.8" fill="#d7d7d7"/>
      <polygon id="Espacio_verde" points="32.34 40.08 276.46 16.13 201.9 86.76 173.86 180.62 150.95 376.33 178.27 862.92 149.13 848.58 32.34 40.08" fill="#1b8b6e"/>
      <path id="Calle_de_transito_peatonal" d="M275.02,16.13l64.9-7.14s.93,25.47-48.56,61.07c-49.49,35.61-64.1,94.08-64.1,94.08,0,0-17.01,124.34-20.58,154.14s-10.17,96.15-1.95,227.02c8.22,130.87,21.34,338.39,21.34,338.39l-57.33-24.19s-4.96-156.58-14.34-274.04c-5.87-73.6-7.66-148.48-8.17-194.14-.32-28.14,1.63-56.24,5.8-84.08,9.69-64.77,11.09-138.16,30.94-191.47,12.32-33.09,38.98-58.89,66.97-80.4l25.07-19.26Z" fill="#d7d7d7"/>
      <path id="sector_exterior_accesolibre" d="M383.25,0l-1.69,139.02-64.3,3.36,44.09,471.17-83.56,8.07,27.82,295.41-88.1-38.16s-6.71-92.59-7.73-110.63c-3.17-56.1-12.04-180.78-14.92-227.77-3.74-61.17-7.55-144.82-.92-205.21,6.63-60.39,17.77-160.26,28.82-189.41,11.05-29.15,18.92-42.52,33.42-57.79s53.59-33.84,67.4-53.36c12.24-17.31,14.73-30.54,14.73-30.54l44.93-4.16Z" fill="#2daf91"/>
      <path id="puestos-comida" d="M321.8,43.87s-9.2,8.68-30.25,22.86c-10.44,7.04-21.74,14.61-28.14,19.87-12.37,10.18-19.54,21.99-26.78,35.53-5.41,10.1-12.61,29.32-15.83,39.74-9.48,30.59-18.98,132.07-18.98,132.07l129.03,8.29-14.17-157.5,27.56-1.57-22.44-99.29Z" fill="#2daf91" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="zona-vip" points="596.51 596.28 614.73 809.73 297.16 839.09 275.03 622.31 596.51 596.28" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="escenario-principal" points="479.37 255.46 511.41 603.17 359.02 615.37 327.27 262.47 479.37 255.46" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      <polygon id="servicios" points="508.63 133.78 519.03 255.32 393.33 260.01 397.5 314.65 332.38 319.22 327.27 262.47 316.68 144.74 508.63 133.78" fill="#fa94b9" stroke="#000" strokeMiterlimit="10" strokeWidth="2" onClick={handleElementClick} style={{cursor: 'pointer'}}/>
      
      {/* Zona pantallas exteriores */}
      <g id="zona-pantallas" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_pantalla_exterior_escenario_exterior">
          <circle id="v-2" cx="310.55" cy="461.1" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="pantalla_exterior_escenario_exterior-2">
          <path d="M315.09,444.79c2,0,3.62,1.62,3.62,3.62v25.37c0,2-1.62,3.62-3.62,3.62h-16.31c-2,0-3.62-1.62-3.62-3.62v-25.37c0-2,1.62-3.62,3.62-3.62h16.31Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M325.96,468.35l-7.25-7.25,7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      {/* Información acreditación */}
      <g id="informacion_acreeditacion" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor._informaciom_acreditacion">
          <g id="pantalla_abonados-3">
            <circle id="v-5" cx="257.76" cy="799.32" r="29.02" fill="#ef5d34"/>
          </g>
        </g>
        <g id="informaciom_acreditacion">
          <path d="M241.45,799.32c0,9.01,7.3,16.31,16.31,16.31s16.31-7.3,16.31-16.31c0-9.01-7.3-16.31-16.31-16.31-9.01,0-16.31,7.3-16.31,16.31" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M257.76,793.88h.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M255.95,799.32h1.81v7.25s1.81,0,1.81,0" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      {/* Puesto pizza */}
      <g id="puesto-pizza" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-6" cx="306.49" cy="116.06" r="25.63" fill="#ef5d34"/>
        <path d="M306.49,101.25c4.87,0,9.53,1.14,13.61,3.17l-13.61,26.44-13.61-26.44c4.23-2.09,8.89-3.18,13.61-3.17Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M317.08,110.27c-3.38-1.72-7.12-2.62-10.91-2.62-3.6,0-7.16.8-10.41,2.37" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M304.88,118.05v.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M308.09,113.26v.02" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Puesto hamburguesas */}
      <g id="puesto_hamburgesas" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-9" cx="246.6" cy="201.14" r="25.63" fill="#ef5d34"/>
        <path d="M253.33,197.64l-5.6,2.4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M248.52,192.83l-5.6,2.4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M247.27,191.44l9.02,9.04c4.26,4.27,6,9.48,1.93,13.87l-.29.3c-1.87,1.87-4.89,1.87-6.76,0,0,0,0,0,0,0l-18.05-18.07c-1.78-1.79-1.87-4.65-.22-6.55l.22-.23c4.36-4.37,9.79-2.73,14.15,1.64Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M258.13,202.44l-5.6,2.4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Kiosco merchandising */}
      <g id="kiosco-merchandising" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-10" cx="247.07" cy="683.33" r="29.02" fill="#ef5d34"/>
        <path d="M244.35,694.21v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M238.91,693.61c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Barra */}
      <g id="barra" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_barra" cx="318.59" cy="538.82" r="29.02" fill="#ef5d34"/>
        <path d="M302.27,533.39v10.87c0,1,.81,1.81,1.81,1.81h6.57c2.53,0,5.03.53,7.3,1.53l1.27.56c2.27,1.01,4.08,1.53,6.62,1.53h7.25c1,0,1.81-.81,1.81-1.81v-18.12c0-1-.81-1.81-1.81-1.81h-7.25c-2.53,0-4.35.53-6.62,1.53l-1.27.56c-2.3,1.01-4.78,1.54-7.3,1.53h-6.57c-1,0-1.81.81-1.81,1.81Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <path d="M325.84,527.95v21.75" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      {/* Flechas de ingreso */}
      <path id="flecha_ingreso_festival" d="M194.12,894.44v-42.26h-17.93c-2.76,0-5-2.37-5-5.28,0-1.4.53-2.74,1.46-3.73l32.94-34.79c1.95-2.06,5.12-2.06,7.07,0l32.94,34.79c1.95,2.06,1.95,5.41,0,7.47-.94.99-2.21,1.55-3.53,1.55h-17.93v42.26c0,2.92-2.24,5.28-5,5.28h-20.01c-2.76,0-5-2.37-5-5.28Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path id="flecha_ingreso_sector_abonados" d="M317.96,587.39l1.31,24.48,10.39-.56c1.6-.09,2.97,1.22,3.06,2.9.04.81-.22,1.61-.73,2.21l-18,21.17c-1.07,1.26-2.9,1.35-4.1.22l-20.16-19.13c-1.2-1.13-1.3-3.07-.23-4.33.51-.6,1.23-.96,2-1.01l10.39-.56-1.31-24.48c-.09-1.69,1.13-3.13,2.73-3.22l11.59-.62c1.6-.09,2.97,1.21,3.06,2.9Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path id="flecha_ingreso_sector_escenario" d="M304.01,381.67l24.51-.47-.2-10.4c-.03-1.6,1.32-2.93,3.01-2.96.81-.02,1.6.28,2.18.81l20.54,18.72c1.22,1.11,1.25,2.95.08,4.1l-19.81,19.48c-1.17,1.16-3.11,1.19-4.33.08-.58-.53-.92-1.26-.94-2.03l-.2-10.4-24.51.47c-1.69.03-3.09-1.24-3.12-2.84l-.22-11.6c-.03-1.6,1.32-2.93,3.01-2.96Z" fill="#ef5d34" stroke="#ef5d34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      
      {/* Otros elementos decorativos y de información */}
      <g id="zona_descanso_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_zona_descanso_abonados" cx="375.47" cy="739.76" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_abonados-2" d="M381.71,732.73l3.12,14.04M369.23,732.73l-3.12,14.04M364.54,732.73h21.85M389.51,740.54h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      <g id="pantalla_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_pantalla_abonados">
          <circle id="v" cx="480.28" cy="640.72" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="pantalla_abonados-2">
          <path d="M463.97,636.19c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v16.31c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-16.31Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          <path d="M487.53,625.31l-7.25,7.25-7.25-7.25" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </g>
      </g>
      
      <g id="baño_sectorexterior" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_baño_sectorexterior">
          <circle id="v-3" cx="413.73" cy="195.93" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="baño_sectorexterior-2">
          <path d="M397.42,186.87c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v18.12c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-18.12Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M403.76,190.5l.91,10.87,3.62-7.25,3.62,7.25.91-10.87" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M422.79,193.22c0-1.5-1.22-2.72-2.72-2.72s-2.72,1.22-2.72,2.72v5.44c0,1.5,1.22,2.72,2.72,2.72s2.72-1.22,2.72-2.72" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
      </g>
      
      <g id="baño_abonados" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <g id="contenedor_baño_abonados">
          <circle id="v-4" cx="385.75" cy="647.97" r="29.02" fill="#ef5d34"/>
        </g>
        <g id="baño_abonados-2">
          <path d="M369.44,638.9c0-2,1.62-3.62,3.62-3.62h25.37c2,0,3.62,1.62,3.62,3.62v18.12c0,2-1.62,3.62-3.62,3.62h-25.37c-2,0-3.62-1.62-3.62-3.62v-18.12Z" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M375.78,642.53l.91,10.87,3.62-7.25,3.62,7.25.91-10.87" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M394.81,645.25c0-1.5-1.22-2.72-2.72-2.72s-2.72,1.22-2.72,2.72v5.44c0,1.5,1.22,2.72,2.72,2.72s2.72-1.22,2.72-2.72" fill="none" stroke="#f8f3ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
      </g>
      
      <g id="zona_descanso_sectore_exterior_1" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_zona_descanso_sectore_exterior_1" cx="236.79" cy="461.1" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_sectore_exterior_1-2" d="M243.03,454.08l3.12,14.04M230.55,454.08l-3.12,14.04M225.87,454.08h21.85M250.83,461.88h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      <g id="zona_descanso_sectore_exterior_2" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor-zona_descanso_sectore_exterior_2" cx="248.44" cy="346.31" r="29.02" fill="#ef5d34"/>
        <path id="zona_descanso_sectore_exterior_2-2" d="M254.68,339.28l3.12,14.04M242.2,339.28l-3.12,14.04M237.52,339.28h21.85M262.48,347.09h-28.09" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
      </g>
      
      <g id="puesto_cafeteria" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-8" cx="261.01" cy="147.81" r="25.63" fill="#ef5d34"/>
        <path d="M246.6,151.01c1.33,1.03,3.33,1.63,5.6,1.6,2.28.03,4.27-.57,5.6-1.6s3.33-1.63,5.6-1.6c2.28-.03,4.27.57,5.6,1.6" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M254.61,133.4c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M261.01,133.4c-1.03.74-1.63,1.94-1.6,3.2-.03,1.27.57,2.46,1.6,3.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M246.6,144.61h22.41v8c0,5.3-4.3,9.61-9.61,9.61h-3.2c-5.3,0-9.61-4.3-9.61-9.61v-8Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M268.61,155.38c2.41,1.11,5.26.05,6.37-2.36s.05-5.26-2.36-6.37c-1.13-.52-2.43-.58-3.6-.16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      {/* Puesto pochoclos */}
      <g id="pueso_pochoclos" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_puesto_gastronomico-3" cx="240.64" cy="256.03" r="25.63" fill="#ef5d34"/>
        <path d="M253.17,268.49c1.66-.06,3.12-1.15,3.78-2.78,1.41-.79,2.3-2.37,2.3-4.11,0-1.37-.57-2.67-1.52-3.54.19-.53.29-1.1.29-1.68,0-1.09-.35-2.12-.98-2.95.42-.73.65-1.58.65-2.46,0-2.25-1.49-4.14-3.47-4.55,0-.12.01-.25.01-.37,0-2.55-1.92-4.63-4.28-4.63-1.66,0-3.11,1.04-3.82,2.54l-21.05,2.48c-.63.07-1.16.55-1.33,1.21-.04.15-.92,3.57-.97,8.3,0,.02,0,.04,0,.06,0,.01,0,.03,0,.04,0,.12,0,.24,0,.37,0,2.93.33,5.73.97,8.32.17.68.71,1.17,1.36,1.23l20.63,2.07c.7,1.51,2.15,2.56,3.82,2.56,1.46,0,2.81-.82,3.6-2.12ZM244.3,247.67c-.12,1.56-.24,3.89-.29,6.68h-1.8c-.97-3.1-2.74-5.34-4.52-5.94l6.61-.74ZM225.95,254.35c.12-2.02.37-3.68.57-4.69l8.8-.99c-1.22.79-1.93,2.6-1.93,5.02,0,.21,0,.43.02.65h-7.45,0ZM226.49,262.76c-.33-1.6-.52-3.3-.59-5.06h8.08c.57,1.94,1.48,3.64,2.57,4.81.62.66,1.26,1.12,1.9,1.36l-11.97-1.12ZM240.05,264.02c.1-.02.2-.05.29-.08,1.6-.53,2.55-2.52,2.55-5.32,0-.3-.01-.61-.03-.92h1.14c.03,2.34.1,4.59.29,6.72l-4.23-.39ZM248.02,267.48c-.22-.68-1.02-3.7-1.02-11.58,0-4.7.28-7.6.55-9.31,0,0,.02-.09.02-.14.05-.3.1-.57.14-.79.34-1.03,1.22-1.76,2.26-1.76,1.33,0,2.41,1.21,2.41,2.7,0,.29-.04.58-.12.86l-.35,1.18,1.11-.06s.08,0,.13,0c1.33,0,2.41,1.21,2.41,2.7,0,.68-.23,1.33-.64,1.83l-.54.65.61.57c.55.51.87,1.27.87,2.07,0,.5-.12.99-.36,1.42l-.41.75.68.44c.75.48,1.22,1.38,1.22,2.34,0,1.09-.58,2.07-1.48,2.49l-.32.15-.11.36c-.33,1.1-1.25,1.83-2.28,1.83-.08,0-.15,0-.23-.01l-.53-.06-.23.54c-.4.94-1.25,1.54-2.18,1.54-.61,0-1.18-.26-1.6-.69Z" fill="#fff"/>
      </g>
      
¬\¬¬¬¬      {/* Puntos interactivos adicionales */}
      <g id="punto_interactivo_1" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-11" cx="420.94" cy="792.75" r="29.02" fill="#ef5d34"/>
        <path d="M418.22,803.63v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M412.78,803.03c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      

      
      <g id="punto_interactivo_3" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="v-13" cx="572.15" cy="706.01" r="29.02" fill="#ef5d34"/>
        <path d="M569.43,716.89v-27.19l12.69,7.25-12.69,7.25" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path d="M563.99,716.29c-1.12.65-1.81,1.49-1.81,2.41,0,1.99,3.26,3.62,7.25,3.62s7.25-1.63,7.25-3.62c0-.91-.69-1.76-1.81-2.41" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </g>
      
      <g id="sector_abonados_salon" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_abonados_1" cx="480.28" cy="722.59" r="33.71" fill="#ef5d34"/>
        <path id="abonados_1" d="M480.28,711.71l7.25,10.87,9.06-7.25-3.62,18.12h-25.37s-3.62-18.12-3.62-18.12l9.06,7.25,7.25-10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
      
      <g id="sector_abonados_escenarios" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="Contenedor_abonados_2" cx="420.78" cy="413.55" r="33.71" fill="#ef5d34"/>
        <path id="abonados_2" d="M420.78,402.67l7.25,10.87,9.06-7.25-3.62,18.12h-25.37s-3.62-18.12-3.62-18.12l9.06,7.25,7.25-10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
      
      <g id="escenario_interior" onClick={handleElementClick} style={{cursor: 'pointer'}}>
        <circle id="contenedor_escenario" cx="431.87" cy="549.7" r="33.71" fill="#ef5d34"/>
        <path d="M417.37,564.2h29" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
        <path d="M446.37,556.95v-18.12c0-2-1.62-3.62-3.62-3.62h-21.75c-2,0-3.62,1.62-3.62,3.62v18.12s7.25-10.87,7.25-10.87c4.83,2.42,9.67,2.42,14.5,0l7.25,10.87Z" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33"/>
      </g>
    </svg>
  );
};

export default FestivalSvgVertical;