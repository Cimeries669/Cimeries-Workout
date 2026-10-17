# Cimeries Workout

Aplicación personal de entrenamiento para Android y web.

## Funciones
- Rutina inicial de 5 días: lunes, martes, miércoles, viernes y sábado.
- Enfoque 100 % máquinas, poleas y Smith.
- Registro por serie de peso en libras, repeticiones y RIR.
- Historial de sesiones y mejores cargas.
- Crear, editar, eliminar y cambiar ejercicios de día.
- Enlaces de YouTube editables para cada ejercicio.
- Exportar e importar respaldo JSON.
- Datos guardados localmente en el dispositivo.
- Interfaz negra/grafito con verde neón inspirada en estética de bebidas energéticas.

## Ramas
- main: rama estable.
- feature/monster-green-ui: versión de desarrollo con la interfaz Monster Green.

## Android
El proyecto Android está en /android y carga la app web local dentro de un WebView.

## APK automático
GitHub Actions compila un APK debug al hacer push a main o feature/monster-green-ui. También puede ejecutarse manualmente desde Actions.

El artefacto se publica con el nombre Cimeries-Workout-APK.

## Web
La aplicación PWA está en /web. Puede publicarse en cualquier hosting HTTPS.
