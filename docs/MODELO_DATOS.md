# Modelo de datos

- `plenos/{plenoId}`: estado DRAFT->PUBLISHED, hash de vídeo, sesiones.
- `plenos/{plenoId}/presence/{uid}`: presencia activa.
- `plenos/{plenoId}/locks/{sectionId}`: lock por sección crítica.
- `plenos/{plenoId}/incidents/{incidentId}`: incidencias de integridad.
- `assets/{assetId}`: visibilidad, linkedCount, metadatos.
- `publicPlenos/{id}` y `publicSearchIndex/{id}`: proyección pública publicada.
