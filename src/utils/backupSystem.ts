import fs from 'fs'
import path from 'path'

export interface BackupConfig {
  sourceDir: string
  backupDir: string
  maxBackups: number
  includePatterns: string[]
  excludePatterns: string[]
}

const defaultConfig: BackupConfig = {
  sourceDir: 'src/data',
  backupDir: 'backups/data',
  maxBackups: 5,
  includePatterns: ['*.ts', '*.tsx', '*.json'],
  excludePatterns: ['node_modules', '.next', 'dist']
}

export class DataBackupSystem {
  private config: BackupConfig
  
  constructor(config: Partial<BackupConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }
  
  createBackup(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = path.join(this.config.backupDir, `backup-${timestamp}`)
    
    try {
      // Crear directorio de backup
      if (!fs.existsSync(this.config.backupDir)) {
        fs.mkdirSync(this.config.backupDir, { recursive: true })
      }
      
      // Copiar archivos
      this.copyDirectory(this.config.sourceDir, backupPath)
      
      // Limpiar backups antiguos
      this.cleanupOldBackups()
      
      return backupPath
    } catch (error) {
      console.error('Error creating backup:', error)
      throw error
    }
  }
  
  private copyDirectory(src: string, dest: string): void {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true })
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      
      // Verificar patrones de exclusión
      if (this.shouldExclude(srcPath)) {
        continue
      }
      
      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath)
      } else if (entry.isFile() && this.shouldInclude(srcPath)) {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
  
  private shouldInclude(filePath: string): boolean {
    return this.config.includePatterns.some(pattern => 
      filePath.endsWith(pattern.replace('*', ''))
    )
  }
  
  private shouldExclude(filePath: string): boolean {
    return this.config.excludePatterns.some(pattern => 
      filePath.includes(pattern)
    )
  }
  
  private cleanupOldBackups(): void {
    try {
      const backups = fs.readdirSync(this.config.backupDir)
        .filter(dir => dir.startsWith('backup-'))
        .map(dir => ({
          name: dir,
          path: path.join(this.config.backupDir, dir),
          mtime: fs.statSync(path.join(this.config.backupDir, dir)).mtime
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
      
      // Eliminar backups antiguos
      const toDelete = backups.slice(this.config.maxBackups)
      for (const backup of toDelete) {
        fs.rmSync(backup.path, { recursive: true, force: true })
      }
    } catch (error) {
      console.error('Error cleaning up old backups:', error)
    }
  }
  
  restoreBackup(backupPath: string): void {
    try {
      // Verificar que el backup existe
      if (!fs.existsSync(backupPath)) {
        throw new Error(`Backup not found: ${backupPath}`)
      }
      
      // Crear backup del estado actual antes de restaurar
      const currentBackup = this.createBackup()
      console.log(`Created current state backup: ${currentBackup}`)
      
      // Restaurar desde el backup especificado
      this.copyDirectory(backupPath, this.config.sourceDir)
      
      console.log(`Restored from backup: ${backupPath}`)
    } catch (error) {
      console.error('Error restoring backup:', error)
      throw error
    }
  }
  
  listBackups(): string[] {
    try {
      if (!fs.existsSync(this.config.backupDir)) {
        return []
      }
      
      return fs.readdirSync(this.config.backupDir)
        .filter(dir => dir.startsWith('backup-'))
        .map(dir => path.join(this.config.backupDir, dir))
        .sort()
        .reverse()
    } catch (error) {
      console.error('Error listing backups:', error)
      return []
    }
  }
}

// Instancia global
export const dataBackupSystem = new DataBackupSystem()

// Función auxiliar para backup automático
export function autoBackup(): string | null {
  try {
    const backupPath = dataBackupSystem.createBackup()
    console.log(`Auto backup created: ${backupPath}`)
    return backupPath
  } catch (error) {
    console.error('Auto backup failed:', error)
    return null
  }
}