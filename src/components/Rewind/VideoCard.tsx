import React, { useRef, useEffect } from 'react';
import CardWrapper from './CardWrapper';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  src: string;
  className?: string;
}

/**
 * Video card component for rewind experience
 * Displays full-screen videos with autoplay and loop functionality
 * @param src - Path to the video file
 * @param className - Additional CSS classes
 * @returns JSX element with full-screen video display
 */
const VideoCard: React.FC<VideoCardProps> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays when component mounts
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Video autoplay failed:', error);
      }
    };

    playVideo();

    // Handle visibility change to pause/resume video
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <CardWrapper className={`${styles.videoCard} ${className}`}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          onError={(e) => {
            console.error('Video loading error:', e);
          }}
        >
          <p className={styles.fallbackText}>
            Tu navegador no soporta la reproducción de video.
          </p>
        </video>
        
        {/* Optional overlay for better contrast with action buttons */}
        <div className={styles.overlay} />
      </div>
    </CardWrapper>
  );
};

export default VideoCard;