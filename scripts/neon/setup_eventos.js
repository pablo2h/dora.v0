const { neon } = require('@neondatabase/serverless');

async function run() {
  const connectionString = process.env.NEON_DATABASE_URL;
  if (!connectionString) {
    throw new Error('NEON_DATABASE_URL no está definido en el entorno.');
  }
  const sql = neon(connectionString);

  await sql(`
    CREATE TABLE IF NOT EXISTS "Eventos" (
      "slug" text PRIMARY KEY,
      "name" text NOT NULL,
      "palette" jsonb NOT NULL,
      "layout_sections_order" text[] NOT NULL,
      "blocks" jsonb NOT NULL,
      "emptyState" jsonb
    );
  `);

  const row1 = {
    slug: 'dora-edicion-groove',
    name: 'Edición Groove',
    palette: {
      "--primary-color": "var(--dora-pink)",
      "--background": "var(--background)",
      "--foreground": "var(--foreground)"
    },
    layout_sections_order: ['hero', 'lineup', 'cta'],
    blocks: {
      hero: {
        title: 'Dora: Edición Groove',
        subtitle: 'Vive la experiencia groove',
        ctaText: 'Conseguir Abonos',
        backgroundImage: '/assets/Banners/web/show_web.png'
      },
      artists: [
        { id: 1, name: 'Rosario Smowing', description: '🎷 Swing, Ska, Rock, Crooner, Fiesta 🎉', instagram: 'https://www.instagram.com/rosariosmowing/', spotifyId: '6qCuLVlvJkLRpPJFYRO2mG', image: '/assets/Artistas/rosariosmowing-logo.jpg' },
        { id: 2, name: 'La tercera fase del plan', description: '🎸 Rock, Crudo, Joven, Surf, Arder 🔥', instagram: 'https://www.instagram.com/latercerafasedelplan/', spotifyId: '5ZCuJKdQYpuZ5odGaJBCDQ', image: '/assets/Artistas/latercerafase-logo.png' },
        { id: 3, name: 'Zacaro y los Puerkos', description: '🎭 Teatral, Energetica, Fusion, Festivo 🕺🏼', instagram: 'https://www.instagram.com/zacaroylospuerkos/', spotifyId: '0laV1xchpqQ9rCoooWioos', image: '/assets/Artistas/Zacaroylospuerkos-logo.jpg' },
        { id: 4, name: 'Stand Up Comedy Litoral', description: '🎭 Comedia, Stand Up, Nacho Koornstra y Belisario Ruiz 😂', instagram: 'https://www.instagram.com/litoral_standupcomedy/', youtubeId: 'UCwh2PHOeGNNowBKCzW2zSYQ', image: '/assets/Artistas/Logo_Litoral_Stand_Up_img.png' },
        { id: 5, name: 'Joa Atencio', description: '🎵 Solista Pop, Rock, Acústico, Romántico 💕', instagram: 'https://www.instagram.com/joaquiatencio/', spotifyId: '6HUniIUWSwSqJSRAWJ5UEt', image: '/assets/Artistas/joa_atencio_img.jpg' },
        { id: 6, name: 'Delpo DJ', description: '🎧 House, DJ Set, Dance, Mix 🕺', instagram: 'https://www.instagram.com/delpo_dj/', youtubeId: 'UC0BbWQHrAuJi2VRaECG0Z7w', image: '/assets/Artistas/delpodj_img.jpg' },
        { id: 7, name: 'Facu Halle', description: '🎤 Host Vergoragico Actor 🎭', instagram: 'https://www.instagram.com/facu_halle/', image: '/assets/Artistas/Facundo_host_image.jpg' }
      ],
      lineup: [
        { id: 1, name: 'Rosario Smowing', description: '🎷 Swing, Ska, Rock, Crooner, Fiesta 🎉', instagram: 'https://www.instagram.com/rosariosmowing/', spotifyId: '6qCuLVlvJkLRpPJFYRO2mG', image: '/assets/Artistas/rosariosmowing-logo.jpg' },
        { id: 2, name: 'La tercera fase del plan', description: '🎸 Rock, Crudo, Joven, Surf, Arder 🔥', instagram: 'https://www.instagram.com/latercerafasedelplan/', spotifyId: '5ZCuJKdQYpuZ5odGaJBCDQ', image: '/assets/Artistas/latercerafase-logo.png' },
        { id: 3, name: 'Zacaro y los Puerkos', description: '🎭 Teatral, Energetica, Fusion, Festivo 🕺🏼', instagram: 'https://www.instagram.com/zacaroylospuerkos/', spotifyId: '0laV1xchpqQ9rCoooWioos', image: '/assets/Artistas/Zacaroylospuerkos-logo.jpg' },
        { id: 4, name: 'Stand Up Comedy Litoral', description: '🎭 Comedia, Stand Up, Nacho Koornstra y Belisario Ruiz 😂', instagram: 'https://www.instagram.com/litoral_standupcomedy/', youtubeId: 'UCwh2PHOeGNNowBKCzW2zSYQ', image: '/assets/Artistas/Logo_Litoral_Stand_Up_img.png' },
        { id: 5, name: 'Joa Atencio', description: '🎵 Solista Pop, Rock, Acústico, Romántico 💕', instagram: 'https://www.instagram.com/joaquiatencio/', spotifyId: '6HUniIUWSwSqJSRAWJ5UEt', image: '/assets/Artistas/joa_atencio_img.jpg' },
        { id: 6, name: 'Delpo DJ', description: '🎧 House, DJ Set, Dance, Mix 🕺', instagram: 'https://www.instagram.com/delpo_dj/', youtubeId: 'UC0BbWQHrAuJi2VRaECG0Z7w', image: '/assets/Artistas/delpodj_img.jpg' },
        { id: 7, name: 'Facu Halle', description: '🎤 Host Vergoragico Actor 🎭', instagram: 'https://www.instagram.com/facu_halle/', image: '/assets/Artistas/Facundo_host_image.jpg' }
      ],
      gallery: []
    },
    emptyState: null
  };

  const row2 = {
    slug: 'demo',
    name: 'Evento Demo',
    palette: { primary: '#AAAAAA' },
    layout_sections_order: ['hero', 'artists'],
    blocks: { hero: { title: 'Página de Demo' }, artists: [] },
    emptyState: { title: 'Evento Vacío', message: 'Esto es un placeholder de demo.' }
  };

  const row3 = {
    slug: 'playtime',
    name: 'Playtime 2025',
    palette: { primary: '#0000FF' },
    layout_sections_order: ['hero'],
    blocks: { hero: { title: 'Playtime 2025 Próximamente' } },
    emptyState: null
  };

  for (const r of [row1, row2, row3]) {
    await sql`
      INSERT INTO "Eventos" (slug, name, palette, layout_sections_order, blocks, emptyState)
      VALUES (${r.slug}, ${r.name}, ${sql.json(r.palette)}, ${r.layout_sections_order}, ${sql.json(r.blocks)}, ${sql.json(r.emptyState)})
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        palette = EXCLUDED.palette,
        layout_sections_order = EXCLUDED.layout_sections_order,
        blocks = EXCLUDED.blocks,
        emptyState = EXCLUDED.emptyState;
    `;
  }

  console.log('Tabla Eventos creada y 3 filas insertadas/actualizadas.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

