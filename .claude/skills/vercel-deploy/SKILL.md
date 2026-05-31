# vercel-deploy

## Propósito

Guiar el deploy de un proyecto Next.js a Vercel desde cero, paso a paso, sin asumir que el usuario tiene cuenta de Vercel, CLI instalado o experiencia previa con deploys. Cubre el flujo completo: GitHub → Vercel → dominio personalizado.

---

## Cuándo activarse

- El usuario quiere poner su sitio en línea.
- El `npm run build` local pasó sin errores y el sitio está listo.
- El usuario pregunta sobre Vercel, dominios, o cómo compartir el sitio.
- El proyecto está en la Fase 6 del flujo de MyCloudeWEB.

---

## Instrucciones

### Paso 0: Verificar que el build local está limpio

Antes de hacer cualquier cosa con Vercel, confirmar que el build local funciona:

```bash
npm run build
```

Debe terminar sin errores. Si hay errores de TypeScript o ESLint, corregirlos primero. Vercel usa exactamente el mismo build command — si falla local, falla en Vercel.

### Paso 1: Crear el repositorio en GitHub

El usuario necesita una cuenta de GitHub. Si no tiene, crear en https://github.com.

```bash
# Dentro de la carpeta del proyecto generado (ej: mi-negocio/)
git init
git add .
git commit -m "first commit"
```

Crear el repositorio en GitHub:
1. Ir a https://github.com/new
2. Nombre del repositorio: usar el slug del negocio (ej: `paleta-studio`)
3. Visibility: Public (requerido para el plan gratuito de Vercel con deploys automáticos)
4. NO inicializar con README (el proyecto ya tiene archivos)
5. Copiar los comandos que GitHub muestra y ejecutarlos:

```bash
git remote add origin https://github.com/[usuario]/[nombre-repo].git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ir a https://vercel.com
2. Hacer clic en "Sign Up" → "Continue with GitHub"
3. Autorizar Vercel para acceder a los repositorios de GitHub
4. En el dashboard de Vercel: "Add New Project"
5. Buscar el repositorio recién creado y hacer clic en "Import"

### Paso 3: Configurar el proyecto en Vercel

Vercel detecta automáticamente que es Next.js. Verificar la configuración:

- **Framework Preset:** Next.js (detectado automáticamente)
- **Root Directory:** dejar vacío si el proyecto está en la raíz del repo, o escribir la subcarpeta si corresponde
- **Build Command:** `npm run build` (default, no cambiar)
- **Output Directory:** `.next` (default, no cambiar)
- **Install Command:** `npm install` (default, no cambiar)

**Variables de entorno:** Si el proyecto usa `.env.local`, agregar cada variable aquí antes de hacer el primer deploy. Las variables con `NEXT_PUBLIC_` prefijo van a ser expuestas al cliente.

### Paso 4: Primer deploy

Hacer clic en "Deploy". Vercel va a:
1. Clonar el repositorio
2. Instalar dependencias
3. Ejecutar `npm run build`
4. Publicar en una URL del tipo `[nombre-proyecto].vercel.app`

El proceso tarda entre 1 y 3 minutos. Si falla, el log de error aparece en la misma pantalla.

**URL resultante:** `https://[slug-del-proyecto].vercel.app`

### Paso 5: Deploys automáticos (habilitados por defecto)

Una vez conectado, cada `git push` a `main` dispara un nuevo deploy automáticamente. No hay que hacer nada más en Vercel.

```bash
# Para actualizar el sitio después de cambios:
git add .
git commit -m "descripción del cambio"
git push
```

Vercel notifica por email cuando el deploy termina.

### Paso 6: Dominio personalizado (opcional)

Si el usuario tiene un dominio propio (ej: `miempresa.com`):

1. En el proyecto de Vercel: "Settings" → "Domains"
2. Escribir el dominio: `miempresa.com`
3. Vercel muestra dos opciones de configuración DNS. La más simple:
   - Agregar un registro `A` apuntando a `76.76.21.21`
   - O un registro `CNAME` de `www` apuntando a `cname.vercel-dns.com`
4. Ir al panel de control del registrador del dominio (GoDaddy, Namecheap, NIC.ar, etc.) y agregar ese registro DNS
5. Esperar entre 10 minutos y 48 horas para que propague
6. Vercel detecta automáticamente y activa el SSL/HTTPS

**Si el usuario no tiene dominio:** las opciones más baratas en LATAM son:
- Namecheap: desde $8 USD/año para `.com`
- NIC.ar: dominios `.com.ar` gratuitos para argentinos con DNI
- Registro.br: dominios `.com.br` desde R$40/año

### Paso 7: Verificar el deploy

Checklist post-deploy:
- [ ] La URL abre sin errores
- [ ] Las fuentes cargaron correctamente
- [ ] Las imágenes se ven (verificar que los dominios de imágenes externas estén en `next.config.ts`)
- [ ] El formulario de contacto funciona
- [ ] El sitio se ve bien en mobile (abrir desde el celular)
- [ ] HTTPS está activo (candado en el browser)

### Resolución de errores comunes

**Error: "Command not found: next"**
```bash
# Solución: asegurarse de que package.json tiene next como dependencia
npm install next react react-dom
git add . && git commit -m "fix: add missing dependencies" && git push
```

**Error: "Type error" en build**
El build de Vercel usa TypeScript strict. Corregir los errores de tipos localmente con `npm run build` y volver a hacer push.

**Error: "Environment variable not found"**
Agregar la variable faltante en Vercel: Settings → Environment Variables → Add.

**Error: imágenes de dominios externos no cargan**
Agregar el hostname en `next.config.ts`:
```ts
images: {
  remotePatterns: [{ hostname: 'images.unsplash.com' }]
}
```

---

## Ejemplos

### Flujo completo resumido para el usuario

```
1. npm run build                          → verificar que funciona local
2. git init && git add . && git commit    → inicializar repo
3. Crear repo en github.com/new           → crear repositorio vacío
4. git remote add origin [url] && push    → subir código
5. vercel.com → Import Project            → conectar con GitHub
6. Deploy → esperar 2 minutos            → sitio en línea
7. Compartir URL [proyecto].vercel.app    → listo
```

### Script de push rápido para actualizaciones

```bash
# Guardar como update.sh en la raíz del proyecto
#!/bin/bash
git add .
git commit -m "update: $(date '+%Y-%m-%d %H:%M')"
git push
echo "Deploy en progreso en Vercel..."
```
