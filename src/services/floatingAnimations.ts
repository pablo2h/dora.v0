export interface FloatingElement {
  id: number;
  type: 'dora' | 'geometric';
  svg: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  animationDuration: number;
  velocityX: number;
  velocityY: number;
}

// Doras sin cabeza y elementos geométricos del directorio SVG
const doraSvgs = [
  '/assets/images/Dora 5-2.svg',
  '/assets/images/Dora 4-2.svg',
  '/assets/images/Dora 3-2.svg',
  '/assets/images/Dora 2-2.svg',
  '/assets/images/Dora 1-2.svg',
];



export class FloatingAnimationService {
  static generateElements(count: number = 15): FloatingElement[] {
    const elements: FloatingElement[] = [];
    
    for (let i = 0; i < count; i++) {
      elements.push({
        id: i,
        type: 'dora',
        svg: doraSvgs[Math.floor(Math.random() * doraSvgs.length)],
        x: Math.random() * 95, // Evitar bordes iniciales
        y: Math.random() * 95,
        opacity: 0.4 + Math.random() * 0.4,
        scale: 2.5 + Math.random() * 0.8, // Escala mayor para flores más grandes
        rotation: Math.random() * 360,
        animationDuration: 0.033, // 30 FPS optimizado
        velocityX: (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.15), // Velocidad más lenta
        velocityY: (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.15)
      });
    }
    
    return elements;
  }

  static animateElements(elements: FloatingElement[]): FloatingElement[] {
    return elements.map(element => {
      // Movimiento vectorial simple tipo DVD
      let newX = element.x + element.velocityX;
      let newY = element.y + element.velocityY;
      let newVelocityX = element.velocityX;
      let newVelocityY = element.velocityY;
      let newSvg = element.svg;
      
      // Rebote en bordes horizontales (izquierda/derecha)
      if (newX <= 0 || newX >= 95) {
        newVelocityX = -newVelocityX; // Invertir dirección X
        newX = newX <= 0 ? 0 : 95; // Corregir posición
        // Cambiar por otra flor al rebotar
        newSvg = doraSvgs[Math.floor(Math.random() * doraSvgs.length)];
      }
      
      // Rebote en bordes verticales (arriba/abajo)
      if (newY <= 0 || newY >= 95) {
        newVelocityY = -newVelocityY; // Invertir dirección Y
        newY = newY <= 0 ? 0 : 95; // Corregir posición
        // Cambiar por otra flor al rebotar
        newSvg = doraSvgs[Math.floor(Math.random() * doraSvgs.length)];
      }
      
      // Rotación simple basada en velocidad (ajustada para 30 FPS)
        const rotationChange = (newVelocityX + newVelocityY) * 1;
      
      return {
        ...element,
        x: newX,
        y: newY,
        svg: newSvg,
        rotation: element.rotation + rotationChange,
        velocityX: newVelocityX,
        velocityY: newVelocityY
      };
    });
  }

  static getBackgroundColors(): string[] {
    return [
      '#2DB092', // Verde
      '#FC95BB', // Rosa
      '#FA8632', // Naranja
      '#F5C92B'  // Amarillo
    ];
  }

  static getNextBackgroundIndex(currentIndex: number, colorsLength: number): number {
    return (currentIndex + 1) % colorsLength;
  }

  static createGradientBackground(colors: string[], currentIndex: number): string {
    const nextIndex = this.getNextBackgroundIndex(currentIndex, colors.length);
    return `linear-gradient(45deg, ${colors[currentIndex]}, ${colors[nextIndex]})`;
  }

  static createSolidBackground(colors: string[], currentIndex: number): string {
    // Convertir color hex a rgba con 10% de opacidad
    const color = colors[currentIndex];
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
}