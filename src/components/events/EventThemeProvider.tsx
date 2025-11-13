import React from 'react'
import { EventPalette } from '@/events/types'

type Props = {
  palette: EventPalette
  children: React.ReactNode
}

export default function EventThemeProvider({ palette, children }: Props) {
  const styleVars = Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [key, value])
  ) as React.CSSProperties

  return (
    <div style={styleVars}>
      {children}
    </div>
  )
}

