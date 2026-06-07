# React Native — Teoría NoteFlow

## React Native vs app nativa

Una app nativa se programa por separado para cada sistema (Android con Kotlin/Java, iOS con Swift). React Native permite escribir la app en TypeScript/JavaScript y traducirla a componentes nativos del móvil.

La diferencia es que React Native no muestra una página web dentro del navegador. Cuando usamos `<View>` o `<Text>`, el sistema operativo dibuja controles nativos reales, con mejor integración y rendimiento que una web.

## Hilos JS y UI

- **Hilo de JavaScript:** aquí corre la lógica de React (estado, funciones, Zustand, etc.).
- **Hilo de UI nativo:** aquí se renderizan los componentes visuales del sistema operativo.

Ambos deben comunicarse constantemente. Si el hilo de JavaScript se bloquea (por ejemplo, con operaciones pesadas), la interfaz se congela y la app deja de responder.

## Metro bundler

Metro es el bundler de React Native. Su función es tomar todos los archivos del proyecto (`.ts`, `.tsx`, dependencias) y empaquetarlos en un formato que el dispositivo puede ejecutar.
Cuando ejecutamos `npx expo start`, Metro prepara ese paquete y lo sirve al simulador, a Expo Go o al development build.

## Expo Go vs Development Build

**Expo Go** es una app instalada en el móvil donde escaneas un QR y pruebas tu proyecto sin compilar nada. Es muy útil al inicio porque acelera el desarrollo.

**Development Build** es una versión compilada de tu propia app, con tus dependencias nativas concretas. En proyectos reales se usa cuando necesitas módulos personalizados (cámara avanzada, notificaciones push, biometría, etc.).

Para NoteFlow en esta fase, Expo Go suele ser suficiente para desarrollo. En producción o con módulos nativos específicos, se recomienda development build.
