'use client';

import Link from 'next/link';
import RewindViewer from '@/components/Rewind/RewindViewer';
import { galleryPhotos } from '@/data/rewind-gallery';
import { RewindCard } from '@/data/rewind-2025';

export default function RewindGalleryPage() {
  /**
   * Handle card change event
   * @param currentIndex - Current card index
   * @param card - Current card object
   */
  const handleCardChange = (currentIndex: number, card: RewindCard) => {
    console.log(`Gallery photo ${currentIndex + 1}/${galleryPhotos.length}: ${card.id}`);
  };

  /**
   * Handle gallery completion event
   */
  const handleGalleryComplete = () => {
    console.log('Gallery viewing completed!');
  };

  return (
    <div className="relative">
      {/* Back button overlay */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/rewind" 
          className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-black/70 transition-all duration-300"
        >
          ← Volver al Rewind
        </Link>
      </div>
      
      {/* Gallery viewer using RewindViewer */}
      <RewindViewer
        cards={galleryPhotos}
        onCardChange={handleCardChange}
        onComplete={handleGalleryComplete}
      />
    </div>
  );
}