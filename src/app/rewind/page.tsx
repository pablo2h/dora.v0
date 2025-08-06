'use client';

import React from 'react';
import { RewindViewer } from '../../components/Rewind';
import { rewindCards } from '../../data/rewind-2025';

/**
 * DORA Rewind 2025 Page
 * Main page component that displays the rewind experience
 * Uses RewindViewer with Swiper.js for vertical navigation
 */
const RewindPage: React.FC = () => {
  // Handle card change events
  const handleCardChange = (currentIndex: number, card: any) => {
    console.log(`Card changed to index ${currentIndex}:`, card);
  };

  // Handle completion of rewind
  const handleComplete = () => {
    console.log('Rewind completed!');
    // You can add logic here to redirect or show completion message
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <RewindViewer
        cards={rewindCards}
        onCardChange={handleCardChange}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default RewindPage;