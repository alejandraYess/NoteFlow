# Configuración de herramientas de IA

## Herramienta usada
**Cursor** : herramienta de IA que uso en este proyecto.

## Qué configuré
Archivo **`.cursorrules`** en la raíz del repositorio.

## Por qué
Cursor lee ese archivo al generar o editar código. Así la IA conoce:
- que el proyecto es NoteFlow (Expo + React Native + TypeScript);
- el stack obligatorio de la práctica (Expo Router, Zustand, FlashList, Zod, etc.);
- la estructura de carpetas y convenciones de nombres;
- qué no debe hacer (librerías extra, features opcionales no pedidas, componentes web).

## Cómo lo uso
Antes de pedir ayuda para una tarea, reviso que la petición encaje con las reglas. Si la IA sugiere otra librería o estructura, corrijo o ajusto el `.cursorrules`.
