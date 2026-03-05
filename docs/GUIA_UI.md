# Guía UI

## Paleta base
- Sidebar y topbar: `bg-slate-900` / `bg-slate-800`.
- Acento principal banner: `bg-orange-700`.
- CTA éxito: `bg-emerald-700`.

## Personalización rápida
1. Edita `web/src/app/layout/private-shell/private-shell.component.html` para estructura de menú.
2. Ajusta colores globales en `web/src/styles.scss` y clases Tailwind de cada screen.
3. Cards de plenos en `web/src/app/screens/app/plenos/plenos-grid/plenos-grid.component.html`.

## Responsive
- Sidebar colapsable con `translate-x-*` para móvil.
- Grid de cards con `sm:grid-cols-2 xl:grid-cols-4`.
