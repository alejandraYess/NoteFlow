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

## Sistemas de diseño

- **Gluestack UI:** muy personalizable, estilo parecido a Tailwind, ideal para diseños únicos.
- **React Native Paper:** implementa Material Design, trae componentes listos y se integra bien con Expo.

**Elegí React Native Paper** porque es más directo de configurar, mantiene una interfaz consistente y encaja bien con el desarrollo de la práctica.

La configuración aplicada:

- `PaperProvider` en `app/_layout.tsx`
- tokens visuales en `constants/theme.ts` (colores, espaciados, tipografía)
- soporte de tema claro/oscuro con `useColorScheme` de React Native

## Navegación

NoteFlow usa tres formas de moverse por la app:

- **Tabs:** barra inferior con Notas, Tareas e Ideas (`app/(tabs)/_layout.tsx`).
- **Stack:** en cada pestaña, lista → detalle (`[id].tsx`).
- **Modal:** pantalla `nueva-nota.tsx` que se abre encima para crear contenido.

## Modelado de datos

En `types/index.ts` definimos tres tipos de nota:

- **Note** → texto (`content`)
- **ChecklistNote** → tareas (`items`)
- **IdeaNote** → etiquetas y color (`tags`, `color`)

**AnyNote** agrupa los tres. Para saber cuál es en código usamos type guards: `'items' in note` (checklist), `'tags' in note` (idea), `'content' in note` (nota de texto).

## Gestión de estado

NoteFlow guarda las notas, checklists e ideas en un **estado global** accesible desde cualquier pantalla.

| Opción | Cuándo usarla | Limitación en NoteFlow |
|--------|---------------|------------------------|
| **useState** | Estado local de un componente (ej. un input) | No sirve para compartir datos entre pestañas |
| **Context API** | Datos compartidos en un árbol pequeño | Requiere providers anidados y puede provocar re-renders innecesarios |
| **Zustand** | Estado global de la app | Es la opción elegida: simple, sin providers extra |

El store vive en `store/notesStore.ts`. Cualquier pantalla puede leer datos con `useNotesStore()` y llamar acciones como `addNote`, `deleteNote` o `toggleChecklistItem`.

## Rendimiento en listas

**FlatList** de React Native puede mostrar pantallas en blanco al hacer scroll rápido porque recicla componentes de forma limitada.

**FlashList** de Shopify recicla componentes de forma más agresiva. En versiones anteriores se usaba `estimatedItemSize` para estimar el tamaño de cada tarjeta; en FlashList 2 el tamaño se mide automáticamente.

NoteFlow usa FlashList en las tres pestañas con tarjetas (`NoteCard`, `ChecklistCard`, `IdeaCard`).

## Persistencia

**AsyncStorage** guarda datos en el dispositivo. Limitaciones: sin cifrado, tamaño limitado y solo en ese dispositivo.

Zustand integra persistencia con el middleware `persist` y `createJSONStorage`. Los datos se guardan bajo la clave `noteflow-storage`.

**Rehidratación:** al abrir la app, Zustand lee AsyncStorage y restaura el store. Mientras tanto, `app/_layout.tsx` muestra un `ActivityIndicator` hasta que `useNotesStore.persist.onFinishHydration` confirma que los datos están listos.
