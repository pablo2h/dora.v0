import Image from 'next/image'

export default function Blog() {
  return (
    <main className="blog-page">
      <h1>Blog Festival Dora</h1>

      <section className="blog-grid">
        <article className="blog-post">
          <Image 
            src="/assets/blog/post1.jpg" 
            alt="Post title" 
            width={800}
            height={400}
          />
          <h2>Título del Post</h2>
          <p className="post-meta">Fecha | Categoría</p>
          <p className="post-excerpt">Extracto del post...</p>
          <a href="#" className="read-more">Leer más</a>
        </article>
      </section>
    </main>
  )
}