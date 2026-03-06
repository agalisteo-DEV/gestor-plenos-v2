# Arquitectura Funcional — Gestor Plenos v2

## Objetivo del sistema

Gestor Plenos es una aplicación SaaS destinada a ayuntamientos para gestionar de forma integral los plenos municipales.

El sistema permite:

- gestionar plenos
- gestionar el orden del día
- gestionar asistentes
- gestionar documentos
- subir y verificar vídeo del pleno
- generar autocues (marcas de tiempo)
- redactar transcripción
- redactar acta
- publicar el pleno en una zona pública

El sistema tiene dos aplicaciones:

- Web (gestión + portal público)
- Mobile (marcado de autocues en directo)

---

# Estructura general del sistema

El sistema se divide en dos grandes zonas:

## Zona pública

Accesible sin autenticación.

Permite a cualquier ciudadano:

- ver listado de plenos publicados
- filtrar plenos por canal (año)
- ver el vídeo del pleno
- navegar por autocues (marcas de tiempo)
- consultar documentos públicos
- consultar transcripción si está publicada
- consultar acta si está publicada

Rutas principales:

/
 /plenos
 /plenos/:slug

---

## Zona privada (dashboard)

Accesible únicamente mediante autenticación.

Permite a los usuarios del ayuntamiento gestionar todo el contenido.

Ruta base:

/app

El dashboard tiene dos niveles de navegación:

1. Gestión de plenos  
2. Configuración del sistema

---

# Entidad central: EL PLENO

Todo el sistema gira alrededor de la entidad **Pleno**.

Un pleno representa una sesión municipal celebrada en una fecha concreta.

Ejemplo:

PLENO 26 DE FEBRERO 2026

## Campos principales del pleno

- id
- título
- slug público
- fecha
- lugar
- tipo (ordinario / extraordinario)
- canal (normalmente el año)
- imagen de portada
- estado
- fecha de creación
- fecha de modificación

---

# Estados del pleno

Un pleno pasa por diferentes estados durante su ciclo de vida.

Estados posibles:

BORRADOR  
EN_SESION  
EN_EDICION  
CERRADO  
PUBLICADO

### BORRADOR

El pleno ha sido creado pero aún no se ha trabajado sobre él.

### EN_SESION

El pleno está celebrándose o se está preparando el marcado de autocues.

### EN_EDICION

Se están editando contenidos:

- documentos
- transcripción
- acta
- autocues

### CERRADO

El pleno se considera finalizado y bloqueado para modificaciones.

Antes de cerrarlo se valida:

- integridad del vídeo
- documentación necesaria

### PUBLICADO

El pleno pasa a la zona pública.

Solo se publica cuando:

- el secretario lo autoriza
- el pleno está cerrado

---

# Pleno activo

Dentro del dashboard siempre existe el concepto de:

PLENO ACTIVO

El pleno activo es el pleno seleccionado sobre el que se está trabajando.

Todos los módulos dependen del pleno activo.

Ejemplo:

- Documentos del pleno activo  
- Asistentes del pleno activo  
- Orden del día del pleno activo  
- Autocues del pleno activo  
- Transcripción del pleno activo  
- Acta del pleno activo  

El pleno activo se guarda en:

- memoria
- localStorage

y se gestiona mediante el servicio:

PlenoContextService

---

# Módulos dependientes del pleno

Una vez seleccionado un pleno se habilitan los módulos de trabajo.

## Vista general

Resumen del pleno con información básica.

---

## Orden del día

Contiene los puntos del pleno.

Cada punto tiene:

- id
- título
- orden
- tipo
- descripción

Tipos posibles:

- informativo
- debate
- votación

Los puntos pueden generar:

- intervenciones
- autocues
- contenido de acta
- contenido de transcripción

---

## Asistentes

Listado de concejales asistentes al pleno.

Los asistentes provienen de la **corporación municipal activa**.

Cada registro contiene:

- miembro de la corporación
- presente / ausente
- cargo
- partido político

---

## Documentos

Repositorio de documentos asociados al pleno.

Ejemplos:

- convocatoria
- anexos
- documentos técnicos
- informes

Los documentos se almacenan como assets.

---

## Vídeo

Cada pleno tiene un vídeo oficial.

Proceso:

1. subir vídeo  
2. calcular hash  
3. guardar hash original  

Antes de cerrar el pleno:

- se recalcula el hash
- se compara con el original

Si el hash no coincide se bloquea la publicación.

---

## Autocues

Los autocues son **marcas de tiempo dentro del vídeo**.

Permiten navegar por el vídeo por secciones.

Se generan a partir de:

- puntos del orden del día
- intervenciones de concejales

Un autocue contiene:

- id
- label
- startSeconds
- tipo (ITEM / INTERVENTION)
- estado (DRAFT / CONFIRMED)

---

## Transcripción

Documento que recoge lo que se ha dicho durante el pleno.

Puede incluir:

- introducción del punto
- intervenciones de concejales

La transcripción puede exportarse a PDF.

---

## Acta

Documento oficial del pleno.

Recoge:

- acuerdos
- votaciones
- decisiones adoptadas

El acta se redacta por punto del orden del día.

También puede exportarse a PDF.

---

# Publicación del pleno

Cuando un pleno está en estado:

CERRADO

puede publicarse.

La publicación genera una versión pública del pleno.

Se publica en:

/plenos/:slug

El contenido público puede incluir:

- vídeo
- autocues
- documentos públicos
- transcripción
- acta

---

# Configuración del sistema

El sistema incluye varios módulos de configuración.

## Ayuntamiento

Datos del ayuntamiento:

- nombre
- logotipo
- colores
- identidad visual

---

## Usuarios

Gestión de usuarios del sistema.

Campos principales:

- nombre
- email
- rol
- estado

Roles principales:

- ADMIN
- SECRETARIA
- AUXILIAR
- CONCEJAL
- LECTOR

---

## Corporación municipal

Listado de miembros de la corporación.

Cada miembro tiene:

- nombre
- partido político
- cargo
- estado

---

## Partidos políticos

Listado de partidos presentes en la corporación.

Campos:

- nombre
- siglas
- color

---

## Canales

Los canales permiten filtrar plenos.

Normalmente los canales representan:

años

Ejemplo:

- 2025
- 2026
- 2027

---

## Media

Repositorio global de assets.

Contiene:

- imágenes
- vídeos
- documentos
- PDFs

---

# Aplicación móvil

Existe una aplicación móvil destinada exclusivamente al marcado de autocues en directo.

Funciones:

- login
- selección de pleno
- listado de puntos
- botón marcar autocue

La aplicación crea marcas en estado:

DRAFT

Luego se revisan en el dashboard.

---

# Principios arquitectónicos

El sistema debe respetar los siguientes principios:

1. Todo gira alrededor del pleno  
2. Los módulos dependen del pleno activo  
3. No crear lógica aislada sin relación con el pleno  
4. Separar zona pública y privada  
5. Mantener el sistema extensible para múltiples ayuntamientos  
6. Evitar cambios grandes que rompan funcionalidades existentes  

---

# Convenciones técnicas

- Angular standalone components
- no usar NgModules
- pantallas con ts/html/scss
- routing centralizado
- tipado estricto
- código mantenible

---

# Regla fundamental para agentes de código

Antes de implementar una funcionalidad:

1. identificar si depende de un pleno  
2. identificar el módulo correcto  
3. respetar el estado del pleno  
4. no romper la arquitectura existente