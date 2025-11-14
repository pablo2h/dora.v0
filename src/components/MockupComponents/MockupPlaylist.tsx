'use client'

import React from 'react'

export interface MockupPlaylistProps {
  title?: string
  items?: Array<{ service: 'Spotify' | 'YouTube'; label: string }>
}

const defaultItems = [
  { service: 'Spotify', label: 'Abrir Playlist' },
  { service: 'YouTube', label: 'Abrir Playlist' }
]

export default function MockupPlaylist({ title = 'Playlist', items = defaultItems }: MockupPlaylistProps) {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {items.map((item, idx) => (
          <button key={idx} className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded">
            <span className="inline-block w-5 h-5 bg-gray-400 rounded" />
            {item.service}: {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}

