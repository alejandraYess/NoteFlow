# Configuración de herramientas de IA

## Herramienta usada
**Cursor** — es la única herramienta de IA que uso en este proyecto.

No uso instrucciones persistentes en Gemini ni Claude.

## Qué configuré
Archivo **`.cursorrules`** en la raíz del repositorio.

## Por qué
Cursor lee ese archivo al generar o editar código. Así la IA conoce:
- que el proyecto es NoteFlow (Expo + React Native + TypeScript);
- el stack obligatorio de la práctica (Expo Router, Zustand, FlashList, Zod, etc.);
- la estructura de carpetas y convenciones de nombres;
- qué no debe hacer (librerías extra, features opcionales no pedidas, componentes web).

Con esto se reduce el riesgo de que proponga código que no encaja con el enunciado de la fase 6.

## Cómo lo uso
Antes de pedir ayuda para una tarea, reviso que la petición encaje con las reglas. Si la IA sugiere otra librería o estructura, corrijo o ajusto el `.cursorrules`.
