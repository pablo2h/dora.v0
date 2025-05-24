import React, { ReactNode } from 'react';
import Image from 'next/image';
import styles from './ContentGrid.module.css';

interface ContentGridProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  imageOnRight?: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  imageSrc,
  imageAlt,
  children,
  imageOnRight = false,
}) => {
  const gridClassName = imageOnRight
    ? `${styles.contentGrid} ${styles.contentGridRight}`
    : `${styles.contentGrid} ${styles.contentGridLeft}`;

  return (
    <div className={gridClassName}>
      <div className={styles.imageArea}>
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={imageSrc}
          alt={imageAlt}
          className={styles.placeholderImage}
        />
      </div>
      <div className={styles.contentArea}>{children}</div>
    </div>
  );
};

export default ContentGrid;