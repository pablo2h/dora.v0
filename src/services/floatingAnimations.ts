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
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0,
        scale: 1.2 + Math.random() * 0.8, // Más grandes: de 1.2 a 2.0
        rotation: Math.random() * 360,
        animationDuration: 3 + Math.random() * 4
      });
    }
    
    return elements;
  }

  static animateElements(elements: FloatingElement[]): FloatingElement[] {
    return elements.map(element => ({
      ...element,
      opacity: Math.random() > 0.3 ? 0.3 + Math.random() * 0.7 : 0,
      x: Math.max(5, Math.min(95, element.x + (Math.random() - 0.5) * 10)),
      y: Math.max(5, Math.min(95, element.y + (Math.random() - 0.5) * 10)),
      rotation: element.rotation + (Math.random() - 0.5) * 30
    }));
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
    return colors[currentIndex];
  }
}