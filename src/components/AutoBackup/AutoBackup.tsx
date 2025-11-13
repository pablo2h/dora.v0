'use client'

import { useEffect } from 'react'
import { createBackup } from '@/utils/backup/backupSystem.client'
import { enableClientBackup } from '@/config/featureFlags'

interface AutoBackupProps {
  enabled?: boolean
  interval?: number // en milisegundos
  onBackup?: (backupPath: string | null) => void
}

export default function AutoBackup({ 
  enabled = true, 
  interval = 300000, // 5 minutos
  onBackup 
}: AutoBackupProps) {
  useEffect(() => {
    if (!enabled || !enableClientBackup) return
    
    const backupInterval = setInterval(() => {
      const id = createBackup({ timestamp: Date.now() })
      if (onBackup) onBackup(id)
    }, interval)
    
    // Hacer backup inicial
    const initialId = createBackup({ timestamp: Date.now(), initial: true })
    if (onBackup) onBackup(initialId)
    
    return () => clearInterval(backupInterval)
  }, [enabled, interval, onBackup])
  
  return null
}
