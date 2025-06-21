'use client';
import { useState } from 'react';
import { newsData, NewsItem } from '@/data/news';
import styles from './NewsSection.module.css';

interface NewsSectionProps {
  title?: string;
  showFeaturedOnly?: boolean;
  maxItems?: number;
}

export default function NewsSection({ title = "Noticias del Festival", showFeaturedOnly = false, maxItems }: NewsSectionProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Filtrar noticias según los parámetros
  let displayNews = showFeaturedOnly 
    ? newsData.filter(news => news.featured)
    : newsData;
  
  if (maxItems) {
    displayNews = displayNews.slice(0, maxItems);
  }

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        
        <div className={styles.newsGrid}>
          {displayNews.map((news) => (
            <article 
              key={news.id} 
              className={`${styles.newsCard} ${news.featured ? styles.featured : ''}`}
              onClick={() => handleNewsClick(news)}
            >
              <div className={styles.newsImageContainer}>
                {news.coverImage ? (
                  <img 
                    src={news.coverImage} 
                    alt={news.title}
                    className={styles.newsImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <div className={styles.placeholderIcon}>📰</div>
                  </div>
                )}
                {news.featured && (
                  <span className={styles.featuredBadge}>Destacada</span>
                )}
              </div>
              
              <div className={styles.newsContent}>
                <div className={styles.newsHeader}>
                  <span className={styles.newsCategory}>
                    {news.category === 'festival' && '🎪 Festival'}
                    {news.category === 'artists' && '🎵 Artistas'}
                    {news.category === 'sponsors' && '🤝 Sponsors'}
                    {news.category === 'general' && '📢 General'}
                  </span>
                  <span className={styles.newsDate}>
                    {formatDate(news.publishDate)}
                  </span>
                </div>
                
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsDescription}>{news.description}</p>
                
                <div className={styles.newsFooter}>
                  <span className={styles.newsAuthor}>Por {news.author}</span>
                  <button className={styles.readMoreButton}>
                    Leer más →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {displayNews.length === 0 && (
          <div className={styles.noNews}>
            <p>No hay noticias disponibles en este momento.</p>
          </div>
        )}
      </div>

      {/* Modal para mostrar noticia completa */}
      {selectedNews && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✕
            </button>
            
            <article className={styles.fullNews}>
              {selectedNews.coverImage && (
                <img 
                  src={selectedNews.coverImage} 
                  alt={selectedNews.title}
                  className={styles.fullNewsImage}
                />
              )}
              
              <div className={styles.fullNewsHeader}>
                <span className={styles.fullNewsCategory}>
                  {selectedNews.category === 'festival' && '🎪 Festival'}
                  {selectedNews.category === 'artists' && '🎵 Artistas'}
                  {selectedNews.category === 'sponsors' && '🤝 Sponsors'}
                  {selectedNews.category === 'general' && '📢 General'}
                </span>
                <span className={styles.fullNewsDate}>
                  {formatDate(selectedNews.publishDate)}
                </span>
              </div>
              
              <h1 className={styles.fullNewsTitle}>{selectedNews.title}</h1>
              <p className={styles.fullNewsDescription}>{selectedNews.description}</p>
              
              <div className={styles.fullNewsContent}>
                {selectedNews.content.split('\n').map((paragraph, index) => (
                  <p key={index} className={styles.contentParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {selectedNews.attachedImages && selectedNews.attachedImages.length > 0 && (
                <div className={styles.attachedImages}>
                  {selectedNews.attachedImages.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Imagen adjunta ${index + 1}`}
                      className={styles.attachedImage}
                    />
                  ))}
                </div>
              )}
              
              <div className={styles.fullNewsFooter}>
                <span className={styles.fullNewsAuthor}>Por {selectedNews.author}</span>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}