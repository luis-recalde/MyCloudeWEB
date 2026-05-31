# playwright-cli

## Propósito

QA visual automatizado usando Playwright desde la línea de comandos. Tomar screenshots de cada sección del sitio, verificar que los elementos críticos están presentes, y detectar problemas visuales antes del deploy. Sin necesidad de escribir tests completos — enfocado en inspección rápida y evidencia visual.

---

## Cuándo activarse

- El sitio está corriendo en `localhost:3000` y se necesita verificar cómo se ve.
- Se hicieron cambios de diseño y se quiere comparar antes/después.
- El usuario pide "verificar que el sitio se ve bien" o "tomar un screenshot".
- Se sospecha que algo se rompió en mobile o en un viewport específico.
- Antes de hacer el deploy a Vercel como parte del QA final.

---

## Instrucciones

### 1. Setup de Playwright

```bash
# Instalar Playwright (solo la primera vez)
npm init playwright@latest
# Seleccionar: TypeScript, tests/ folder, no GitHub Actions, instalar browsers

# O instalar solo el runner sin el setup completo
npm install --save-dev @playwright/test
npx playwright install chromium
```

Para QA rápido sin setup de proyecto completo, usar el script directo:

```bash
# Instalar solo el módulo de Node
npm install --save-dev playwright
npx playwright install chromium --with-deps
```

### 2. Screenshot rápido de toda la página

Crear `scripts/screenshot.ts`:

```ts
import { chromium } from 'playwright'
import path from 'path'

const BASE_URL = 'http://localhost:3000'
const SCREENSHOTS_DIR = './screenshots'

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function main() {
  const browser = await chromium.launch()

  for (const viewport of viewports) {
    const page = await browser.newPage()
    await page.setViewportSize(viewport)
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })

    // Screenshot de página completa
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `home-${viewport.name}.png`),
      fullPage: true,
    })

    console.log(`Screenshot guardado: home-${viewport.name}.png`)
    await page.close()
  }

  await browser.close()
}

main()
```

Ejecutar:
```bash
mkdir -p screenshots
npx ts-node scripts/screenshot.ts
```

### 3. QA de secciones específicas

Para revisar secciones específicas con scroll:

```ts
import { chromium } from 'playwright'

async function captureSection(selector: string, filename: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

  const element = page.locator(selector)
  await element.scrollIntoViewIfNeeded()
  await element.screenshot({ path: `screenshots/${filename}.png` })

  await browser.close()
}

// Usar con los IDs de las secciones del sitio
captureSection('#hero', 'section-hero')
captureSection('#servicios', 'section-services')
captureSection('#contacto', 'section-contact')
```

### 4. Verificación de elementos críticos

Script que falla si algún elemento crítico no está presente:

```ts
import { chromium } from 'playwright'

const CRITICAL_ELEMENTS = [
  { selector: 'h1', description: 'Título principal (H1)' },
  { selector: 'nav', description: 'Navegación' },
  { selector: 'a[href*="contacto"], a[href*="contact"]', description: 'Link de contacto' },
  { selector: 'footer', description: 'Footer' },
]

async function runQA() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

  let passed = 0
  let failed = 0

  for (const check of CRITICAL_ELEMENTS) {
    const count = await page.locator(check.selector).count()
    if (count > 0) {
      console.log(`✓ ${check.description}`)
      passed++
    } else {
      console.error(`✗ FALTA: ${check.description} (${check.selector})`)
      failed++
    }
  }

  // Verificar que no hay texto de placeholder
  const loremCount = await page.locator('text=Lorem ipsum').count()
  if (loremCount > 0) {
    console.error(`✗ FALTA: Hay ${loremCount} instancia(s) de "Lorem ipsum" — reemplazar con contenido real`)
    failed++
  }

  // Verificar imágenes rotas
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'))
    return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)
  })
  if (brokenImages.length > 0) {
    console.error(`✗ Imágenes rotas: ${brokenImages.join(', ')}`)
    failed++
  } else {
    console.log(`✓ Todas las imágenes cargan correctamente`)
    passed++
  }

  await browser.close()

  console.log(`\nResultado: ${passed} OK, ${failed} errores`)
  if (failed > 0) process.exit(1)
}

runQA()
```

### 5. Comparación visual mobile vs desktop

```bash
# Ejecutar QA completo y abrir screenshots
npx ts-node scripts/screenshot.ts && start screenshots/home-desktop.png
```

En sistemas Unix:
```bash
npx ts-node scripts/screenshot.ts && open screenshots/home-desktop.png
```

### 6. Test de performance básico

```ts
import { chromium } from 'playwright'

async function checkPerformance() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const startTime = Date.now()
  await page.goto('http://localhost:3000', { waitUntil: 'load' })
  const loadTime = Date.now() - startTime

  console.log(`Tiempo de carga: ${loadTime}ms`)
  if (loadTime > 3000) {
    console.warn('ADVERTENCIA: El sitio tarda más de 3 segundos en cargar')
  }

  // Obtener métricas de Lighthouse via página
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    return {
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.startTime),
      loadComplete: Math.round(navigation.loadEventEnd - navigation.startTime),
      firstByte: Math.round(navigation.responseStart - navigation.startTime),
    }
  })

  console.log('Métricas de carga:', metrics)
  await browser.close()
}

checkPerformance()
```

### 7. Flujo de QA completo pre-deploy

```bash
# 1. Asegurarse de que el servidor está corriendo
npm run dev &
sleep 3

# 2. Tomar screenshots en todos los viewports
npx ts-node scripts/screenshot.ts

# 3. Verificar elementos críticos
npx ts-node scripts/qa-check.ts

# 4. Revisar screenshots manualmente
# Abrir la carpeta screenshots/ y revisar cada imagen

# 5. Si todo está OK, hacer el build de producción
npm run build
```

---

## Ejemplos

### Output esperado del script de QA

```
✓ Título principal (H1)
✓ Navegación
✓ Link de contacto
✓ Footer
✓ Todas las imágenes cargan correctamente
✗ FALTA: Hay 2 instancia(s) de "Lorem ipsum" — reemplazar con contenido real

Resultado: 5 OK, 1 error
```

### Estructura de carpeta de screenshots

```
screenshots/
├── home-mobile.png       (390×844 — full page)
├── home-tablet.png       (768×1024 — full page)
├── home-desktop.png      (1440×900 — full page)
├── section-hero.png      (screenshot del hero exacto)
├── section-services.png
└── section-contact.png
```
