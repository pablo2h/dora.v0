import { DataBackupSystem } from '../backupSystem'
import fs from 'fs'
import path from 'path'

// Mockear fs
jest.mock('fs')

describe('DataBackupSystem', () => {
  let backupSystem: DataBackupSystem
  const mockFs = fs as jest.Mocked<typeof fs>
  
  beforeEach(() => {
    backupSystem = new DataBackupSystem({
      sourceDir: 'test/src',
      backupDir: 'test/backups',
      maxBackups: 2
    })
    
    // Resetear mocks
    jest.clearAllMocks()
  })
  
  it('crea un backup exitosamente', () => {
    mockFs.existsSync.mockReturnValue(false)
    mockFs.mkdirSync.mockImplementation(() => undefined)
    mockFs.readdirSync.mockReturnValue([])
    mockFs.statSync.mockReturnValue({ mtime: new Date() } as fs.Stats)
    mockFs.copyFileSync.mockImplementation(() => undefined)
    
    const backupPath = backupSystem.createBackup()
    
    expect(backupPath).toContain('test/backups/backup-')
    expect(mockFs.mkdirSync).toHaveBeenCalledWith('test/backups', { recursive: true })
  })
  
  it('lista backups correctamente', () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([
      'backup-2024-01-01T10-00-00-000Z',
      'backup-2024-01-02T10-00-00-000Z'
    ])
    mockFs.statSync.mockReturnValue({ mtime: new Date() } as fs.Stats)
    
    const backups = backupSystem.listBackups()
    
    expect(backups).toHaveLength(2)
    expect(backups[0]).toContain('backup-2024-01-02')
    expect(backups[1]).toContain('backup-2024-01-01')
  })
  
  it('limpia backups antiguos correctamente', () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([
      'backup-2024-01-01T10-00-00-000Z',
      'backup-2024-01-02T10-00-00-000Z',
      'backup-2024-01-03T10-00-00-000Z'
    ])
    mockFs.statSync.mockReturnValue({ mtime: new Date() } as fs.Stats)
    mockFs.rmSync.mockImplementation(() => undefined)
    
    // Forzar la limpieza llamando a createBackup
    mockFs.existsSync.mockReturnValueOnce(false)
    mockFs.mkdirSync.mockImplementation(() => undefined)
    mockFs.readdirSync.mockReturnValueOnce([])
    
    backupSystem.createBackup()
    
    expect(mockFs.rmSync).toHaveBeenCalled()
  })
  
  it('maneja errores de forma adecuada', () => {
    mockFs.existsSync.mockImplementation(() => {
      throw new Error('File system error')
    })
    
    expect(() => backupSystem.createBackup()).toThrow('File system error')
  })
})