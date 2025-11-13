'use client'

type BackupEntry = {
  id: string
  timestamp: number
  data: unknown
}

const STORAGE_KEY = 'dora-backups'
const MAX_BACKUPS = 5

function readBackups(): BackupEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeBackups(entries: BackupEntry[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}

export function createBackup(data: unknown): string {
  const entries = readBackups()
  const id = `client-${Date.now()}`
  const entry: BackupEntry = { id, timestamp: Date.now(), data }
  const next = [entry, ...entries].slice(0, MAX_BACKUPS)
  writeBackups(next)
  return id
}

export function listBackups(): BackupEntry[] {
  return readBackups()
}

export function restoreBackup(id: string): unknown | null {
  const entries = readBackups()
  const found = entries.find(e => e.id === id)
  return found ? found.data : null
}

