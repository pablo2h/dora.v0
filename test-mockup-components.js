// Script simple de prueba para verificar los componentes
const fs = require('fs')
const path = require('path')

console.log('🧪 Iniciando pruebas de componentes mockup...')

// Verificar que los archivos de componentes existan
const components = [
  'src/components/MockupComponents/MockupArtistList.tsx',
  'src/components/MockupComponents/MockupHero.tsx',
  'src/components/MockupComponents/MockupArtistCarousel.tsx',
  'src/components/MockupComponents/MockupHeroDecorations.tsx',
  'src/components/MockupComponents/MockupWelcomeComponent.tsx',
  'src/components/MockupComponents/MockupEventPage.tsx',
  'src/data/eventData.ts',
  'src/data/eventDataIndex.ts',
  'src/utils/backupSystem.ts'
]

let allTestsPassed = true

components.forEach(componentPath => {
  const fullPath = path.join(process.cwd(), componentPath)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${componentPath} existe`)
  } else {
    console.log(`❌ ${componentPath} no existe`)
    allTestsPassed = false
  }
})

// Verificar sintaxis básica de los componentes
console.log('\n🔍 Verificando sintaxis de componentes...')

try {
  const mockupIndex = fs.readFileSync('src/components/MockupComponents/index.ts', 'utf8')
  if (mockupIndex.includes('export') && mockupIndex.includes('MockupEventPage')) {
    console.log('✅ Archivo de exportaciones válido')
  } else {
    console.log('❌ Archivo de exportaciones inválido')
    allTestsPassed = false
  }
} catch (error) {
  console.log('❌ Error leyendo archivo de exportaciones:', error.message)
  allTestsPassed = false
}

// Verificar datos de eventos
try {
  const eventData = fs.readFileSync('src/data/eventData.ts', 'utf8')
  if (eventData.includes('playTimeData') && eventData.includes('edicionGrooveData')) {
    console.log('✅ Datos de eventos configurados correctamente')
  } else {
    console.log('❌ Datos de eventos incompletos')
    allTestsPassed = false
  }
} catch (error) {
  console.log('❌ Error leyendo datos de eventos:', error.message)
  allTestsPassed = false
}

// Resumen
console.log('\n📊 Resumen de pruebas:')
if (allTestsPassed) {
  console.log('🎉 ¡Todas las pruebas pasaron!')
  console.log('✅ Sistema de componentes mockup está listo para usar')
  console.log('\n🚀 Próximos pasos:')
  console.log('1. Visita /playtime-test para ver el sistema en acción')
  console.log('2. Actualiza los datos en src/data/eventData.ts')
  console.log('3. Personaliza los componentes según tus necesidades')
  process.exit(0)
} else {
  console.log('❌ Algunas pruebas fallaron')
  process.exit(1)
}