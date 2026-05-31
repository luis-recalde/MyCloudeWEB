# chrome-bridge-automation

## Propósito

QA visual de fallback usando Chrome DevTools Protocol (CDP) cuando Playwright no está disponible, no está instalado, o falla. Usa el Chrome o Chromium instalado en el sistema directamente, sin dependencias de npm adicionales en la mayoría de los casos. También útil para automatización puntual sin configurar un framework de testing.

---

## Cuándo activarse

- Playwright no está instalado y el usuario no quiere instalarlo.
- El entorno no permite instalar browsers de Playwright (`playwright install` falla).
- Se necesita una screenshot o verificación rápida con mínimo setup.
- El usuario tiene Chrome instalado y quiere usarlo directamente.
- Se necesita acceder al DevTools de Chrome para inspeccionar performance o network.

---

## Instrucciones

### 1. Requisito mínimo

Chrome o Chromium instalado en el sistema. No se necesita configuración adicional.

Rutas comunes de Chrome:
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- Linux: `/usr/bin/google-chrome` o `/usr/bin/chromium-browser`

### 2. Launch de Chrome con debugging port

```bash
# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%TEMP%\chrome-debug" http://localhost:3000

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug \
  http://localhost:3000

# Linux
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug http://localhost:3000
```

Una vez lanzado, el CDP está disponible en `http://localhost:9222`.

### 3. Screenshot via CDP con Node.js puro

Sin dependencias de npm (solo Node.js nativo):

```ts
// scripts/chrome-screenshot.ts
import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as ws from 'ws' // única dependencia si se necesita

async function getTargets(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(JSON.parse(data)))
    }).on('error', reject)
  })
}

async function takeScreenshot(wsUrl: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl)
    let messageId = 1

    socket.on('open', () => {
      // Navegar a la URL
      socket.send(JSON.stringify({
        id: messageId++,
        method: 'Page.navigate',
        params: { url: 'http://localhost:3000' }
      }))
    })

    socket.on('message', (data: string) => {
      const msg = JSON.parse(data)

      // Esperar a que la página cargue, luego screenshot
      if (msg.method === 'Page.loadEventFired') {
        socket.send(JSON.stringify({
          id: messageId++,
          method: 'Page.captureScreenshot',
          params: { format: 'png', captureBeyondViewport: true }
        }))
      }

      // Guardar screenshot
      if (msg.result?.data) {
        const buffer = Buffer.from(msg.result.data, 'base64')
        fs.writeFileSync(outputPath, buffer)
        console.log(`Screenshot guardado: ${outputPath}`)
        socket.close()
        resolve()
      }
    })

    socket.on('error', reject)
  })
}

async function main() {
  const targets = await getTargets()
  const pageTarget = targets.find(t => t.type === 'page')

  if (!pageTarget) {
    throw new Error('No hay páginas abiertas en Chrome. Abrir http://localhost:3000 primero.')
  }

  fs.mkdirSync('screenshots', { recursive: true })
  await takeScreenshot(pageTarget.webSocketDebuggerUrl, 'screenshots/home-chrome.png')
}

main().catch(console.error)
```

### 4. Usando puppeteer como alternativa ligera

Si el usuario tiene Chrome instalado y puede instalar puppeteer:

```bash
npm install --save-dev puppeteer-core
```

`puppeteer-core` no descarga Chrome — usa el Chrome del sistema.

```ts
// scripts/qa-puppeteer.ts
import puppeteer from 'puppeteer-core'
import * as fs from 'fs'

// Detectar Chrome del sistema
function findChrome(): string {
  const paths: Record<string, string[]> = {
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ],
    darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'],
  }

  const platform = process.platform as keyof typeof paths
  const candidates = paths[platform] || []

  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }

  throw new Error('Chrome no encontrado. Instalar Chrome o especificar la ruta manualmente.')
}

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function main() {
  const executablePath = findChrome()
  console.log(`Usando Chrome en: ${executablePath}`)

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  fs.mkdirSync('screenshots', { recursive: true })

  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport(viewport)
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 })

    // Screenshot de página completa
    await page.screenshot({
      path: `screenshots/chrome-${viewport.name}.png`,
      fullPage: true,
    })

    console.log(`✓ Screenshot: chrome-${viewport.name}.png`)
    await page.close()
  }

  await browser.close()
  console.log('\nScreenshots guardados en ./screenshots/')
}

main().catch(console.error)
```

Ejecutar:
```bash
npx ts-node scripts/qa-puppeteer.ts
```

### 5. Verificación de consola (errores JavaScript)

```ts
import puppeteer from 'puppeteer-core'

async function checkConsoleErrors(executablePath: string) {
  const browser = await puppeteer.launch({ executablePath, headless: true })
  const page = await browser.newPage()

  const errors: string[] = []
  const warnings: string[] = []

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
    if (msg.type() === 'warning') warnings.push(msg.text())
  })

  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`))

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })

  await browser.close()

  if (errors.length > 0) {
    console.error('Errores en consola:')
    errors.forEach(e => console.error(`  ✗ ${e}`))
  } else {
    console.log('✓ Sin errores en consola')
  }

  if (warnings.length > 0) {
    console.warn('Advertencias:')
    warnings.forEach(w => console.warn(`  ⚠ ${w}`))
  }

  return errors.length === 0
}
```

### 6. Emulación de dispositivos

```ts
import puppeteer, { KnownDevices } from 'puppeteer-core'

// Dispositivos disponibles: iPhone 14, Pixel 7, iPad, Galaxy S21, etc.
const iPhone = KnownDevices['iPhone 14']

const page = await browser.newPage()
await page.emulate(iPhone)
await page.goto('http://localhost:3000')
await page.screenshot({ path: 'screenshots/iphone14.png', fullPage: true })
```

### 7. Checklist de cuando usar este skill vs playwright-cli

| Situación | Usar |
|---|---|
| Playwright ya está instalado | `playwright-cli` |
| No se puede instalar nada nuevo | `chrome-bridge-automation` (CDP puro) |
| Se puede instalar una dependencia ligera | `chrome-bridge-automation` con `puppeteer-core` |
| Se necesitan tests automatizados con assertions | `playwright-cli` |
| Solo se necesitan screenshots rápidos | Cualquiera de los dos |
| El CI/CD no tiene browsers | `playwright-cli` con `playwright install --with-deps` |

---

## Ejemplos

### Script completo de QA rápido (copia y usa)

```bash
# Instalar solo si no está
npm install --save-dev puppeteer-core

# Tomar screenshots en mobile y desktop
npx ts-node scripts/qa-puppeteer.ts

# Ver resultados
ls screenshots/
```

### Output esperado

```
Usando Chrome en: C:\Program Files\Google\Chrome\Application\chrome.exe
✓ Screenshot: chrome-mobile.png
✓ Screenshot: chrome-desktop.png

Screenshots guardados en ./screenshots/
```
