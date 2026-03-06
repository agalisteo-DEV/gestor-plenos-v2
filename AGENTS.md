# AGENTS.md — Reglas permanentes para Codex en este repositorio

## Objetivo del proyecto
Este proyecto es Gestor Plenos v2.
Tiene dos aplicaciones separadas:
- `web/` → aplicación Angular principal (zona pública + dashboard privado)
- `mobile/` → aplicación Angular/PWA para marcado de autocues

Lee primero `docs/ARQUITECTURA_FUNCIONAL.md` antes de hacer cambios funcionales.

## Reglas técnicas obligatorias
1. Usar Angular moderno con **standalone components only**.
2. **Prohibido** crear o modificar archivos `*.module.ts`.
3. **Prohibido** usar `@NgModule`.
4. No mezclar standalone con módulos clásicos.
5. No regenerar el proyecto completo salvo que se pida expresamente.
6. No tocar `angular.json`, `package.json`, Tailwind o configuración global salvo que sea estrictamente necesario o se pida de forma explícita.
7. Mantener el proyecto **compilable** después de cada cambio.

## Estructura de pantallas
Todas las pantallas deben tener siempre 3 archivos:
- `<nombre>.component.ts`
- `<nombre>.component.html`
- `<nombre>.component.scss`

No usar templates inline largos ni estilos inline.
El HTML debe ir en `.html` y los estilos personalizados en `.scss`.

## Routing
1. La ruta `/` es siempre la **home pública**.
2. La ruta `/plenos/:slug` es el detalle público del pleno.
3. La ruta `/login` es el acceso a la zona privada.
4. La ruta `/app/**` es la zona privada del dashboard.
5. No romper ni renombrar rutas existentes sin pedir confirmación.
6. Antes de proponer cambios en navegación, revisar `app.routes.ts` y asegurar que todos los `routerLink` coinciden.

## Guards y acceso
1. La parte pública no requiere login.
2. La parte privada `/app/**` requiere login.
3. Por ahora, asumir que el rol `ADMIN` puede acceder a todo.
4. Preparar el código para restringir accesos por pantalla más adelante, pero no bloquear pantallas si no se pide.
5. la idea es restringir los accesos de los usuarios a la parte privada mediante roles.

## Estilo de desarrollo
1. Hacer cambios pequeños, seguros y localizados.
2. No reescribir componentes enteros si no hace falta.
3. Reutilizar componentes y servicios existentes antes de crear nuevos.
4. Mantener nombres claros y consistentes.
5. Si hay que elegir entre refactor grande o parche pequeño, preferir el parche pequeño salvo que se pida refactor.

## Tipado y calidad
1. No dejar `any` innecesarios.
2. No dejar observables tipados como `unknown`.
3. Los repositorios y servicios deben ser clases reales con `@Injectable({ providedIn: 'root' })` cuando corresponda.
4. Para `ActivatedRoute`, usar `inject(ActivatedRoute)` o inicializar valores dentro de constructor/streams. No usar propiedades antes de su inicialización.
5. el código se comenta para saber que hace cada parte del código pero sin recargarlo. Un pequeño resumen al inicio del código es suficiente y si hace relación a otro componente lo indicamos

## UI / diseño
1. Usar Angular Material + Tailwind.
2. Mantener una estética profesional, moderna, responsive y mobile-first.
3. La UI privada debe seguir el patrón:
   - sidebar oscuro
   - topbar
   - contenido con cards/tablas/formularios
4. La UI pública debe ser clara, visual y profesional.
5. Si se crea una nueva pantalla, debe tener diseño base agradable, no placeholders vacíos.

## Contexto funcional importante
1. Todo gira alrededor de los **plenos**.
2. La mayoría de módulos privados trabajan sobre un **pleno activo**.
3. No crear lógica suelta que ignore el contexto del pleno seleccionado.
4. Si una pantalla depende de un pleno activo, usar el contexto actual del pleno y no inventar otro mecanismo.

## Qué no hacer
- No crear `SharedModule`.
- No crear `RoutingModule`.
- No mover archivos de sitio sin necesidad.
- No crear una arquitectura nueva distinta a la actual.
- No romper web para arreglar mobile ni al revés.
- No introducir dependencias grandes nuevas sin necesidad.

## Cómo responder a cambios
Cuando hagas una tarea:
1. Primero inspecciona los archivos existentes relacionados.
2. Después modifica solo lo necesario.
3. Si hay varias opciones, elige la más conservadora.
4. Explica brevemente qué archivos cambiaste y por qué.

## Comandos de trabajo
Antes de dar una tarea por finalizada:
- en `web/`, comprobar que compila
- en `mobile/`, comprobar que compila si el cambio le afecta

Utiliza ng serve para comprobar la app y no des una tarea por terminada si rompe la compilación.
