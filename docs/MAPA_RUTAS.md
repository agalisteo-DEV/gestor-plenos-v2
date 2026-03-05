# Mapa de rutas Gestor Plenos v2

## Web pública
- `/` Home pública.
- `/plenos/:slug` Detalle público del pleno.
- `/login` Acceso al panel privado.

## Web privada (`AuthGuard`)
- `/app` Inicio dashboard.
- `/app/plenos` Grid de plenos.
- `/app/plenos/new` Alta de pleno.
- `/app/plenos/:id` Vista general.
- `/app/plenos/:id/documentos`
- `/app/plenos/:id/agenda`
- `/app/plenos/:id/asistentes`
- `/app/plenos/:id/video`
- `/app/plenos/:id/autocues`
- `/app/plenos/:id/transcripcion`
- `/app/plenos/:id/acta`
- `/app/config/ayuntamiento`
- `/app/config/usuarios`
- `/app/config/corporacion`
- `/app/config/partidos`
- `/app/config/canales`
- `/app/config/media`
- `/app/config/manuales`

## Mobile PWA
- `/marcar` Pantalla principal para marcar.
