'use client'

import React from 'react'

export default function MockupIngresoLibre() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-gray-100 border border-gray-300 rounded p-6">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  )
}

