# Cumple-Bot

Bot diario que publica en X/Twitter nacimientos célebres ocurridos en la fecha actual. Obtiene los datos de Wikipedia y utiliza Gemini para generar una imagen cuando no hay fotografía libre disponible.

## Uso local

```bash
npm install
npm run dry   # muestra el tuit sin publicarlo
npm start     # publica en X
```

## Configuración requerida

### 1. Crear una aplicación en X
1. Visita [developer.twitter.com](https://developer.twitter.com/) y crea un proyecto/aplicación.
2. Habilita acceso de lectura y escritura.
3. Obtén las claves **API Key**, **API Secret**, **Access Token** y **Access Secret**.

### 2. Claves de Gemini
1. Crea un proyecto en [Google AI Studio](https://ai.google.dev/).
2. Genera una API key con cuota para el modelo "Gemini 2.5 Flash Image (Nano Banana)".

### 3. Secrets en GitHub
En el repositorio, añade los siguientes *secrets*:

```
X_API_KEY
X_API_SECRET
X_ACCESS_TOKEN
X_ACCESS_SECRET
GEMINI_API_KEY
```

### 4. Atribución de imágenes
Cuando se utiliza una fotografía de Wikimedia Commons, el tuit incluye la atribución en la forma `Foto: Autor – Licencia, Wikimedia Commons`. Si la imagen no cuenta con licencia libre se genera una ilustración con Gemini.

## GitHub Actions
El workflow `.github/workflows/post.yml` ejecuta el bot cada día (`cron`) y guarda el estado en `data/posted.json` para evitar repeticiones.
