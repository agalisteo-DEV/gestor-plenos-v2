import { computed, effect, Injectable, signal } from '@angular/core';

export type AppLanguage = 'es' | 'ca' | 'gl' | 'eu' | 'val' | 'bal';

export type TranslationKey =
  | 'login.title'
  | 'login.subtitle'
  | 'login.username.label'
  | 'login.username.placeholder'
  | 'login.password.label'
  | 'login.password.placeholder'
  | 'login.password.show'
  | 'login.password.hide'
  | 'login.recover'
  | 'login.submit'
  | 'login.error.invalidCredentialsCheck'
  | 'login.language.es'
  | 'login.language.ca'
  | 'login.language.gl'
  | 'login.language.eu'
  | 'login.language.val'
  | 'login.language.bal'
  | 'private.section.navigation'
  | 'private.section.selectedPleno'
  | 'private.section.configuration'
  | 'private.nav.plenos'
  | 'private.nav.overview'
  | 'private.nav.documents'
  | 'private.nav.agenda'
  | 'private.nav.attendees'
  | 'private.nav.video'
  | 'private.nav.autocues'
  | 'private.nav.transcription'
  | 'private.nav.minutes'
  | 'private.nav.publication'
  | 'private.nav.ayuntamiento'
  | 'private.nav.usuarios'
  | 'private.nav.roles'
  | 'private.nav.corporacion'
  | 'private.nav.partidos'
  | 'private.nav.canales'
  | 'private.nav.media'
  | 'private.nav.manuales'
  | 'private.nav.helpManuals'
  | 'private.selectPlenoToEdit'
  | 'private.panel'
  | 'private.connectedUser'
  | 'private.searchPlaceholder'
  | 'private.logout'
  | 'private.selectedPleno'
  | 'private.noSelectedPleno'
  | 'private.breadcrumb.dashboard'
  | 'private.screen.plenos'
  | 'private.screen.newPleno'
  | 'private.screen.plenoDetail'
  | 'private.screen.configAyuntamiento'
  | 'private.screen.configUsuarios'
  | 'private.screen.configRoles'
  | 'private.screen.configCorporacion'
  | 'private.screen.configPartidos'
  | 'private.screen.configCanales'
  | 'private.screen.configMedia'
  | 'private.screen.configManuales'
  | 'private.screen.default'
  | 'plenos.mainTag'
  | 'plenos.title'
  | 'plenos.subtitle'
  | 'plenos.add'
  | 'plenos.visualization'
  | 'plenos.grid'
  | 'plenos.list'
  | 'plenos.emptyTitle'
  | 'plenos.emptyMessage'
  | 'plenos.addFirst'
  | 'plenos.loadMore'
  | 'plenos.type'
  | 'plenos.typeAbbrev.ordinary'
  | 'plenos.typeAbbrev.extraordinary'
  | 'plenos.typeLabel.ordinary'
  | 'plenos.typeLabel.extraordinary'
  | 'plenos.channel'
  | 'plenos.select'
  | 'plenos.selected'
  | 'plenos.open'
  | 'plenos.documents'
  | 'plenos.date'
  | 'plenos.status'
  | 'plenos.actions'
  | 'plenos.pdf'
  | 'plenos.filter'
  | 'plenos.all'
  | 'plenos.all.female'
  | 'plenos.noFilteredResults'
  | 'plenos.previous'
  | 'plenos.next'
  | 'plenos.page'
  | 'plenos.of'
  | 'plenos.showing'
  | 'plenos.perPage'
  | 'plenos.activeFilters'
  | 'plenos.filter.pleno'
  | 'plenos.filter.date'
  | 'plenos.filter.type'
  | 'plenos.filter.channel'
  | 'plenos.filter.status'
  | 'plenos.active'
  | 'plenos.activePleno'
  | 'plenos.status.draft'
  | 'plenos.status.published'
  | 'plenos.status.closed'
  | 'plenos.doc.convocatoria'
  | 'plenos.doc.acta'
  | 'plenos.doc.transcripcion';

type TranslationCatalog = Partial<Record<TranslationKey, string>>;

interface LanguageOption {
  readonly code: AppLanguage;
  readonly labelKey: TranslationKey;
  readonly flagPath: string;
}

const STORAGE_KEY = 'gpv2_lang';
const ENABLED_LANGUAGES_KEY = 'gpv2_enabled_languages';

const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'es', labelKey: 'login.language.es', flagPath: 'assets/images/Espana.png' },
  { code: 'ca', labelKey: 'login.language.ca', flagPath: 'assets/images/cataluna.png' },
  { code: 'gl', labelKey: 'login.language.gl', flagPath: 'assets/images/galicia.png' },
  { code: 'eu', labelKey: 'login.language.eu', flagPath: 'assets/images/pais%20vasco.png' },
  { code: 'val', labelKey: 'login.language.val', flagPath: 'assets/images/valencia.png' },
  { code: 'bal', labelKey: 'login.language.bal', flagPath: 'assets/images/baleares.png' }
];

const TRANSLATIONS: Record<AppLanguage, TranslationCatalog> = {
  es: {
    'login.title': 'Acceso al dashboard',
    'login.subtitle': 'Inicia sesión para gestionar plenos, actas, transcripciones y documentos.',
    'login.username.label': 'Usuario',
    'login.username.placeholder': 'Introduce tu usuario',
    'login.password.label': 'Contraseña',
    'login.password.placeholder': 'Introduce tu contraseña',
    'login.password.show': 'Mostrar contraseña',
    'login.password.hide': 'Ocultar contraseña',
    'login.recover': 'Recuperar contraseña (próximamente)',
    'login.submit': 'Iniciar sesión',
    'login.error.invalidCredentialsCheck': 'Compruebe el nombre de usuario o la contraseña.',
    'login.language.es': 'Castellano',
    'login.language.ca': 'Català',
    'login.language.gl': 'Galego',
    'login.language.eu': 'Euskara',
    'login.language.val': 'Valencià',
    'login.language.bal': 'Balear',
    'private.section.navigation': 'Navegación',
    'private.section.selectedPleno': 'Pleno seleccionado',
    'private.section.configuration': 'Configuración',
    'private.nav.plenos': 'Plenos',
    'private.nav.overview': 'Vista general',
    'private.nav.documents': 'Documentos',
    'private.nav.agenda': 'Orden del día',
    'private.nav.attendees': 'Asistentes',
    'private.nav.video': 'Vídeo',
    'private.nav.autocues': 'Autocues',
    'private.nav.transcription': 'Transcripción',
    'private.nav.minutes': 'Acta',
    'private.nav.publication': 'Ver publicación',
    'private.nav.ayuntamiento': 'Ayuntamiento',
    'private.nav.usuarios': 'Usuarios',
    'private.nav.roles': 'Roles',
    'private.nav.corporacion': 'Corporación',
    'private.nav.partidos': 'Partidos',
    'private.nav.canales': 'Canales',
    'private.nav.media': 'Media',
    'private.nav.manuales': 'Manuales',
    'private.nav.helpManuals': 'Ayuda y manuales',
    'private.selectPlenoToEdit': 'Selecciona un pleno a editar.',
    'private.panel': 'Panel privado',
    'private.connectedUser': 'Usuario conectado',
    'private.searchPlaceholder': 'Buscar plenos, acuerdos, documentos...',
    'private.logout': 'Cerrar sesión',
    'private.selectedPleno': 'Pleno seleccionado',
    'private.noSelectedPleno': 'Sin pleno activo',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Listado de plenos',
    'private.screen.newPleno': 'Crear pleno',
    'private.screen.plenoDetail': 'Gestión del pleno activo',
    'private.screen.configAyuntamiento': 'Configuración de ayuntamiento',
    'private.screen.configUsuarios': 'Configuración de usuarios',
    'private.screen.configRoles': 'Configuración de roles',
    'private.screen.configCorporacion': 'Configuración de corporación',
    'private.screen.configPartidos': 'Configuración de partidos',
    'private.screen.configCanales': 'Configuración de canales',
    'private.screen.configMedia': 'Configuración de media',
    'private.screen.configManuales': 'Manuales',
    'private.screen.default': 'Dashboard privado',
    'plenos.mainTag': 'Gestión principal',
    'plenos.title': 'Listado de plenos',
    'plenos.subtitle': 'Gestiona sesiones municipales, selecciona el pleno activo y accede a sus módulos operativos.',
    'plenos.add': 'Añadir pleno',
    'plenos.visualization': 'Visualización',
    'plenos.grid': 'GRID',
    'plenos.list': 'LISTA',
    'plenos.emptyTitle': 'Sin plenos disponibles',
    'plenos.emptyMessage': 'En estos momentos no existen plenos, añade uno para empezar.',
    'plenos.addFirst': 'Añadir primer pleno',
    'plenos.loadMore': 'Cargar más',
    'plenos.type': 'Tipo',
    'plenos.typeAbbrev.ordinary': 'ORD.',
    'plenos.typeAbbrev.extraordinary': 'EXT.',
    'plenos.typeLabel.ordinary': 'Ordinario',
    'plenos.typeLabel.extraordinary': 'Extraordinario',
    'plenos.channel': 'Canal',
    'plenos.select': 'Seleccionar',
    'plenos.selected': 'Seleccionado',
    'plenos.open': 'Abrir',
    'plenos.documents': 'Documentos',
    'plenos.date': 'Fecha',
    'plenos.status': 'Estado',
    'plenos.actions': 'Acciones',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Filtrar',
    'plenos.all': 'Todos',
    'plenos.all.female': 'Todas',
    'plenos.noFilteredResults': 'No hay resultados con los filtros seleccionados.',
    'plenos.previous': 'Anterior',
    'plenos.next': 'Siguiente',
    'plenos.page': 'Página',
    'plenos.of': 'de',
    'plenos.showing': 'Mostrando',
    'plenos.perPage': 'Plenos por página',
    'plenos.activeFilters': 'Filtros activos',
    'plenos.filter.pleno': 'Pleno',
    'plenos.filter.date': 'Fecha',
    'plenos.filter.type': 'Tipo',
    'plenos.filter.channel': 'Canal',
    'plenos.filter.status': 'Estado',
    'plenos.active': 'Activo',
    'plenos.activePleno': 'Pleno activo',
    'plenos.status.draft': 'Borrador',
    'plenos.status.published': 'Publicado',
    'plenos.status.closed': 'Cerrado',
    'plenos.doc.convocatoria': 'Convocatoria',
    'plenos.doc.acta': 'Acta',
    'plenos.doc.transcripcion': 'Transcripción'
  },
  ca: {
    'login.title': 'Accés al tauler',
    'login.subtitle': "Inicia sessió per gestionar plens, actes, transcripcions i documents.",
    'login.username.label': 'Usuari',
    'login.username.placeholder': "Introdueix el teu usuari",
    'login.password.label': 'Contrasenya',
    'login.password.placeholder': "Introdueix la teua contrasenya",
    'login.password.show': 'Mostra la contrasenya',
    'login.password.hide': 'Oculta la contrasenya',
    'login.recover': 'Recuperar contrasenya (pròximament)',
    'login.submit': 'Iniciar sessió',
    'login.error.invalidCredentialsCheck': "Comprova el nom d'usuari o la contrasenya.",
    'login.language.es': 'Castellà',
    'login.language.ca': 'Català',
    'login.language.gl': 'Gallec',
    'login.language.eu': 'Basc',
    'login.language.val': 'Valencià',
    'login.language.bal': 'Balear',
    'private.section.navigation': 'Navegació',
    'private.section.selectedPleno': 'Ple seleccionat',
    'private.section.configuration': 'Configuració',
    'private.selectPlenoToEdit': 'Selecciona un ple per editar.',
    'private.panel': 'Panell privat',
    'private.connectedUser': 'Usuari connectat',
    'private.searchPlaceholder': 'Buscar plens, acords, documents...',
    'private.logout': 'Tancar sessió',
    'private.selectedPleno': 'Ple seleccionat',
    'private.noSelectedPleno': 'Sense ple actiu',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Llistat de plens',
    'private.screen.newPleno': 'Crear ple',
    'private.screen.plenoDetail': 'Gestió del ple actiu',
    'private.screen.configAyuntamiento': "Configuració d'ajuntament",
    'private.screen.configUsuarios': "Configuració d'usuaris",
    'private.screen.configRoles': 'Configuració de rols',
    'private.screen.configCorporacion': 'Configuració de corporació',
    'private.screen.configPartidos': 'Configuració de partits',
    'private.screen.configCanales': 'Configuració de canals',
    'private.screen.configMedia': 'Configuració de media',
    'private.screen.configManuales': 'Manuals',
    'private.screen.default': 'Dashboard privat',
    'plenos.mainTag': 'Gestió principal',
    'plenos.title': 'Llistat de plens',
    'plenos.subtitle': 'Gestiona sessions municipals, selecciona el ple actiu i accedeix als mòduls.',
    'plenos.add': 'Afegir ple',
    'plenos.visualization': 'Visualització',
    'plenos.grid': 'GRID',
    'plenos.list': 'LLISTA',
    'plenos.emptyTitle': 'Sense plens disponibles',
    'plenos.emptyMessage': 'En estos moments no hi ha plens, afegeix-ne un per començar.',
    'plenos.addFirst': 'Afegir primer ple',
    'plenos.loadMore': 'Carregar més',
    'plenos.type': 'Tipus',
    'plenos.typeAbbrev.ordinary': 'ORD.',
    'plenos.typeAbbrev.extraordinary': 'EXT.',
    'plenos.typeLabel.ordinary': 'Ordinari',
    'plenos.typeLabel.extraordinary': 'Extraordinari',
    'plenos.channel': 'Canal',
    'plenos.select': 'Seleccionar',
    'plenos.selected': 'Seleccionat',
    'plenos.open': 'Obrir',
    'plenos.documents': 'Documents',
    'plenos.date': 'Data',
    'plenos.status': 'Estat',
    'plenos.actions': 'Accions',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Filtrar',
    'plenos.all': 'Tots',
    'plenos.all.female': 'Totes',
    'plenos.noFilteredResults': 'No hi ha resultats amb els filtres seleccionats.',
    'plenos.previous': 'Anterior',
    'plenos.next': 'Següent',
    'plenos.page': 'Pàgina',
    'plenos.of': 'de',
    'plenos.showing': 'Mostrant',
    'plenos.perPage': 'Plens per pàgina',
    'plenos.activeFilters': 'Filtres actius',
    'plenos.filter.pleno': 'Ple',
    'plenos.filter.date': 'Data',
    'plenos.filter.type': 'Tipus',
    'plenos.filter.channel': 'Canal',
    'plenos.filter.status': 'Estat',
    'plenos.active': 'Actiu',
    'plenos.activePleno': 'Ple actiu',
    'plenos.status.draft': 'Esborrany',
    'plenos.status.published': 'Publicat',
    'plenos.status.closed': 'Tancat',
    'plenos.doc.convocatoria': 'Convocatòria',
    'plenos.doc.acta': 'Acta',
    'plenos.doc.transcripcion': 'Transcripció'
  },
  gl: {
    'login.title': 'Acceso ao panel',
    'login.subtitle': 'Inicia sesión para xestionar plenos, actas, transcricións e documentos.',
    'login.username.label': 'Usuario',
    'login.username.placeholder': 'Introduce o teu usuario',
    'login.password.label': 'Contrasinal',
    'login.password.placeholder': 'Introduce o teu contrasinal',
    'login.password.show': 'Amosar contrasinal',
    'login.password.hide': 'Agochar contrasinal',
    'login.recover': 'Recuperar contrasinal (proximamente)',
    'login.submit': 'Iniciar sesión',
    'login.error.invalidCredentialsCheck': 'Comprobe o nome de usuario ou o contrasinal.',
    'login.language.es': 'Castelán',
    'login.language.ca': 'Catalán',
    'login.language.gl': 'Galego',
    'login.language.eu': 'Éuscaro',
    'login.language.val': 'Valenciano',
    'login.language.bal': 'Balear',
    'private.section.navigation': 'Navegación',
    'private.section.selectedPleno': 'Pleno seleccionado',
    'private.section.configuration': 'Configuración',
    'private.selectPlenoToEdit': 'Selecciona un pleno para editar.',
    'private.panel': 'Panel privado',
    'private.connectedUser': 'Usuario conectado',
    'private.searchPlaceholder': 'Buscar plenos, acordos, documentos...',
    'private.logout': 'Pechar sesión',
    'private.selectedPleno': 'Pleno seleccionado',
    'private.noSelectedPleno': 'Sen pleno activo',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Listado de plenos',
    'private.screen.newPleno': 'Crear pleno',
    'private.screen.plenoDetail': 'Xestión do pleno activo',
    'private.screen.configAyuntamiento': 'Configuración do concello',
    'private.screen.configUsuarios': 'Configuración de usuarios',
    'private.screen.configRoles': 'Configuración de roles',
    'private.screen.configCorporacion': 'Configuración da corporación',
    'private.screen.configPartidos': 'Configuración de partidos',
    'private.screen.configCanales': 'Configuración de canles',
    'private.screen.configMedia': 'Configuración de media',
    'private.screen.configManuales': 'Manuais',
    'private.screen.default': 'Dashboard privado',
    'plenos.mainTag': 'Xestión principal',
    'plenos.title': 'Listado de plenos',
    'plenos.subtitle': 'Xestiona sesións municipais e accede aos módulos do pleno activo.',
    'plenos.add': 'Engadir pleno',
    'plenos.visualization': 'Visualización',
    'plenos.grid': 'GRID',
    'plenos.list': 'LISTA',
    'plenos.emptyTitle': 'Sen plenos dispoñibles',
    'plenos.emptyMessage': 'Nestes momentos non existen plenos, engade un para comezar.',
    'plenos.addFirst': 'Engadir primeiro pleno',
    'plenos.loadMore': 'Cargar máis',
    'plenos.type': 'Tipo',
    'plenos.typeAbbrev.ordinary': 'ORD.',
    'plenos.typeAbbrev.extraordinary': 'EXT.',
    'plenos.typeLabel.ordinary': 'Ordinario',
    'plenos.typeLabel.extraordinary': 'Extraordinario',
    'plenos.channel': 'Canal',
    'plenos.select': 'Seleccionar',
    'plenos.selected': 'Seleccionado',
    'plenos.open': 'Abrir',
    'plenos.documents': 'Documentos',
    'plenos.date': 'Data',
    'plenos.status': 'Estado',
    'plenos.actions': 'Accións',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Filtrar',
    'plenos.all': 'Todos',
    'plenos.all.female': 'Todas',
    'plenos.noFilteredResults': 'Non hai resultados cos filtros seleccionados.',
    'plenos.previous': 'Anterior',
    'plenos.next': 'Seguinte',
    'plenos.page': 'Páxina',
    'plenos.of': 'de',
    'plenos.showing': 'Mostrando',
    'plenos.perPage': 'Plenos por páxina',
    'plenos.activeFilters': 'Filtros activos',
    'plenos.filter.pleno': 'Pleno',
    'plenos.filter.date': 'Data',
    'plenos.filter.type': 'Tipo',
    'plenos.filter.channel': 'Canal',
    'plenos.filter.status': 'Estado',
    'plenos.active': 'Activo',
    'plenos.activePleno': 'Pleno activo',
    'plenos.status.draft': 'Borrador',
    'plenos.status.published': 'Publicado',
    'plenos.status.closed': 'Pechado',
    'plenos.doc.convocatoria': 'Convocatoria',
    'plenos.doc.acta': 'Acta',
    'plenos.doc.transcripcion': 'Transcrición'
  },
  eu: {
    'login.title': 'Panelerako sarbidea',
    'login.subtitle': 'Hasi saioa osoko bilkurak, aktak, transkripzioak eta dokumentuak kudeatzeko.',
    'login.username.label': 'Erabiltzailea',
    'login.username.placeholder': 'Idatzi zure erabiltzailea',
    'login.password.label': 'Pasahitza',
    'login.password.placeholder': 'Idatzi zure pasahitza',
    'login.password.show': 'Pasahitza erakutsi',
    'login.password.hide': 'Pasahitza ezkutatu',
    'login.recover': 'Pasahitza berreskuratu (laster)',
    'login.submit': 'Saioa hasi',
    'login.error.invalidCredentialsCheck': 'Egiaztatu erabiltzaile-izena edo pasahitza.',
    'login.language.es': 'Gaztelania',
    'login.language.ca': 'Katalana',
    'login.language.gl': 'Galiziera',
    'login.language.eu': 'Euskara',
    'login.language.val': 'Valentziera',
    'login.language.bal': 'Balearra',
    'private.section.navigation': 'Nabigazioa',
    'private.section.selectedPleno': 'Hautatutako osoko bilkura',
    'private.section.configuration': 'Konfigurazioa',
    'private.selectPlenoToEdit': 'Editatzeko osoko bilkura bat hautatu.',
    'private.panel': 'Panel pribatua',
    'private.connectedUser': 'Konektatutako erabiltzailea',
    'private.searchPlaceholder': 'Bilatu osoko bilkurak, akordioak, dokumentuak...',
    'private.logout': 'Saioa itxi',
    'private.selectedPleno': 'Hautatutako osoko bilkura',
    'private.noSelectedPleno': 'Osoko bilkura aktiborik ez',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Osoko bilkuren zerrenda',
    'private.screen.newPleno': 'Osoko bilkura sortu',
    'private.screen.plenoDetail': 'Osoko bilkura aktiboaren kudeaketa',
    'private.screen.configAyuntamiento': 'Udalaren konfigurazioa',
    'private.screen.configUsuarios': 'Erabiltzaileen konfigurazioa',
    'private.screen.configRoles': 'Rolen konfigurazioa',
    'private.screen.configCorporacion': 'Korporazioaren konfigurazioa',
    'private.screen.configPartidos': 'Alderdien konfigurazioa',
    'private.screen.configCanales': 'Kanalen konfigurazioa',
    'private.screen.configMedia': 'Media konfigurazioa',
    'private.screen.configManuales': 'Eskuliburuak',
    'private.screen.default': 'Dashboard pribatua',
    'plenos.mainTag': 'Kudeaketa nagusia',
    'plenos.title': 'Osoko bilkuren zerrenda',
    'plenos.subtitle': 'Udal saioak kudeatu eta osoko bilkura aktiboaren moduluetara sartu.',
    'plenos.add': 'Osoko bilkura gehitu',
    'plenos.visualization': 'Bistaratzea',
    'plenos.grid': 'GRID',
    'plenos.list': 'ZERRENDA',
    'plenos.emptyTitle': 'Osoko bilkurarik ez dago',
    'plenos.emptyMessage': 'Une honetan ez dago osoko bilkurarik, gehitu bat hasteko.',
    'plenos.addFirst': 'Lehen osoko bilkura gehitu',
    'plenos.loadMore': 'Gehiago kargatu',
    'plenos.type': 'Mota',
    'plenos.typeAbbrev.ordinary': 'ARR.',
    'plenos.typeAbbrev.extraordinary': 'EZO.',
    'plenos.typeLabel.ordinary': 'Arrunta',
    'plenos.typeLabel.extraordinary': 'Ezohikoa',
    'plenos.channel': 'Kanala',
    'plenos.select': 'Hautatu',
    'plenos.selected': 'Hautatuta',
    'plenos.open': 'Ireki',
    'plenos.documents': 'Dokumentuak',
    'plenos.date': 'Data',
    'plenos.status': 'Egoera',
    'plenos.actions': 'Ekintzak',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Iragazi',
    'plenos.all': 'Guztiak',
    'plenos.all.female': 'Guztiak',
    'plenos.noFilteredResults': 'Ez dago emaitzarik hautatutako iragazkiekin.',
    'plenos.previous': 'Aurrekoa',
    'plenos.next': 'Hurrengoa',
    'plenos.page': 'Orria',
    'plenos.of': 'de',
    'plenos.showing': 'Erakusten',
    'plenos.perPage': 'Osoko bilkurak orrialdeko',
    'plenos.activeFilters': 'Iragazki aktiboak',
    'plenos.filter.pleno': 'Osoko bilkura',
    'plenos.filter.date': 'Data',
    'plenos.filter.type': 'Mota',
    'plenos.filter.channel': 'Kanala',
    'plenos.filter.status': 'Egoera',
    'plenos.active': 'Aktibo',
    'plenos.activePleno': 'Osoko bilkura aktiboa',
    'plenos.status.draft': 'Zirriborroa',
    'plenos.status.published': 'Argitaratua',
    'plenos.status.closed': 'Itxita',
    'plenos.doc.convocatoria': 'Deialdia',
    'plenos.doc.acta': 'Akta',
    'plenos.doc.transcripcion': 'Transkripzioa'
  },
  val: {
    'login.title': 'Accés al tauler',
    'login.subtitle': 'Inicia sessió per a gestionar plens, actes, transcripcions i documents.',
    'login.username.label': 'Usuari',
    'login.username.placeholder': 'Introduïx el teu usuari',
    'login.password.label': 'Contrasenya',
    'login.password.placeholder': 'Introduïx la teua contrasenya',
    'login.password.show': 'Mostrar contrasenya',
    'login.password.hide': 'Ocultar contrasenya',
    'login.recover': 'Recuperar contrasenya (pròximament)',
    'login.submit': 'Iniciar sessió',
    'login.error.invalidCredentialsCheck': "Comprova el nom d'usuari o la contrasenya.",
    'login.language.es': 'Castellà',
    'login.language.ca': 'Català',
    'login.language.gl': 'Gallec',
    'login.language.eu': 'Euskera',
    'login.language.val': 'Valencià',
    'login.language.bal': 'Balear',
    'private.section.navigation': 'Navegació',
    'private.section.selectedPleno': 'Ple seleccionat',
    'private.section.configuration': 'Configuració',
    'private.selectPlenoToEdit': 'Selecciona un ple per editar.',
    'private.panel': 'Panell privat',
    'private.connectedUser': 'Usuari connectat',
    'private.searchPlaceholder': 'Buscar plens, acords, documents...',
    'private.logout': 'Tancar sessió',
    'private.selectedPleno': 'Ple seleccionat',
    'private.noSelectedPleno': 'Sense ple actiu',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Llistat de plens',
    'private.screen.newPleno': 'Crear ple',
    'private.screen.plenoDetail': 'Gestió del ple actiu',
    'private.screen.configAyuntamiento': "Configuració d'ajuntament",
    'private.screen.configUsuarios': "Configuració d'usuaris",
    'private.screen.configRoles': 'Configuració de rols',
    'private.screen.configCorporacion': 'Configuració de corporació',
    'private.screen.configPartidos': 'Configuració de partits',
    'private.screen.configCanales': 'Configuració de canals',
    'private.screen.configMedia': 'Configuració de media',
    'private.screen.configManuales': 'Manuals',
    'private.screen.default': 'Dashboard privat',
    'plenos.mainTag': 'Gestió principal',
    'plenos.title': 'Llistat de plens',
    'plenos.subtitle': 'Gestiona sessions municipals i accedix als mòduls del ple actiu.',
    'plenos.add': 'Afegir ple',
    'plenos.visualization': 'Visualització',
    'plenos.grid': 'GRID',
    'plenos.list': 'LLISTA',
    'plenos.emptyTitle': 'Sense plens disponibles',
    'plenos.emptyMessage': 'En estos moments no existixen plens, afig-ne un per començar.',
    'plenos.addFirst': 'Afegir primer ple',
    'plenos.loadMore': 'Carregar més',
    'plenos.type': 'Tipus',
    'plenos.typeAbbrev.ordinary': 'ORD.',
    'plenos.typeAbbrev.extraordinary': 'EXT.',
    'plenos.typeLabel.ordinary': 'Ordinari',
    'plenos.typeLabel.extraordinary': 'Extraordinari',
    'plenos.channel': 'Canal',
    'plenos.select': 'Seleccionar',
    'plenos.selected': 'Seleccionat',
    'plenos.open': 'Obrir',
    'plenos.documents': 'Documents',
    'plenos.date': 'Data',
    'plenos.status': 'Estat',
    'plenos.actions': 'Accions',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Filtrar',
    'plenos.all': 'Tots',
    'plenos.all.female': 'Totes',
    'plenos.noFilteredResults': 'No hi ha resultats amb els filtres seleccionats.',
    'plenos.previous': 'Anterior',
    'plenos.next': 'Següent',
    'plenos.page': 'Pàgina',
    'plenos.of': 'de',
    'plenos.showing': 'Mostrant',
    'plenos.perPage': 'Plens per pàgina',
    'plenos.activeFilters': 'Filtres actius',
    'plenos.filter.pleno': 'Ple',
    'plenos.filter.date': 'Data',
    'plenos.filter.type': 'Tipus',
    'plenos.filter.channel': 'Canal',
    'plenos.filter.status': 'Estat',
    'plenos.active': 'Actiu',
    'plenos.activePleno': 'Ple actiu',
    'plenos.status.draft': 'Esborrany',
    'plenos.status.published': 'Publicat',
    'plenos.status.closed': 'Tancat',
    'plenos.doc.convocatoria': 'Convocatòria',
    'plenos.doc.acta': 'Acta',
    'plenos.doc.transcripcion': 'Transcripció'
  },
  bal: {
    'login.title': 'Accés al tauler',
    'login.subtitle': 'Inicia sessió per gestionar plens, actes, transcripcions i documents.',
    'login.username.label': 'Usuari',
    'login.username.placeholder': 'Introdueix el teu usuari',
    'login.password.label': 'Contrasenya',
    'login.password.placeholder': 'Introdueix la teua contrasenya',
    'login.password.show': 'Mostrar contrasenya',
    'login.password.hide': 'Ocultar contrasenya',
    'login.recover': 'Recuperar contrasenya (pròximament)',
    'login.submit': 'Iniciar sessió',
    'login.error.invalidCredentialsCheck': "Comprova el nom d'usuari o la contrasenya.",
    'login.language.es': 'Castellà',
    'login.language.ca': 'Català',
    'login.language.gl': 'Gallec',
    'login.language.eu': 'Euskera',
    'login.language.val': 'Valencià',
    'login.language.bal': 'Balear',
    'private.section.navigation': 'Navegació',
    'private.section.selectedPleno': 'Ple seleccionat',
    'private.section.configuration': 'Configuració',
    'private.selectPlenoToEdit': 'Selecciona un ple per editar.',
    'private.panel': 'Panell privat',
    'private.connectedUser': 'Usuari connectat',
    'private.searchPlaceholder': 'Buscar plens, acords, documents...',
    'private.logout': 'Tancar sessió',
    'private.selectedPleno': 'Ple seleccionat',
    'private.noSelectedPleno': 'Sense ple actiu',
    'private.breadcrumb.dashboard': 'Dashboard',
    'private.screen.plenos': 'Llistat de plens',
    'private.screen.newPleno': 'Crear ple',
    'private.screen.plenoDetail': 'Gestió del ple actiu',
    'private.screen.configAyuntamiento': "Configuració d'ajuntament",
    'private.screen.configUsuarios': "Configuració d'usuaris",
    'private.screen.configRoles': 'Configuració de rols',
    'private.screen.configCorporacion': 'Configuració de corporació',
    'private.screen.configPartidos': 'Configuració de partits',
    'private.screen.configCanales': 'Configuració de canals',
    'private.screen.configMedia': 'Configuració de media',
    'private.screen.configManuales': 'Manuals',
    'private.screen.default': 'Dashboard privat',
    'plenos.mainTag': 'Gestió principal',
    'plenos.title': 'Llistat de plens',
    'plenos.subtitle': 'Gestiona sessions municipals i accedix als mòduls del ple actiu.',
    'plenos.add': 'Afegir ple',
    'plenos.visualization': 'Visualització',
    'plenos.grid': 'GRID',
    'plenos.list': 'LLISTA',
    'plenos.emptyTitle': 'Sense plens disponibles',
    'plenos.emptyMessage': 'En estos moments no existixen plens, afig-ne un per començar.',
    'plenos.addFirst': 'Afegir primer ple',
    'plenos.loadMore': 'Carregar més',
    'plenos.type': 'Tipus',
    'plenos.typeAbbrev.ordinary': 'ORD.',
    'plenos.typeAbbrev.extraordinary': 'EXT.',
    'plenos.typeLabel.ordinary': 'Ordinari',
    'plenos.typeLabel.extraordinary': 'Extraordinari',
    'plenos.channel': 'Canal',
    'plenos.select': 'Seleccionar',
    'plenos.selected': 'Seleccionat',
    'plenos.open': 'Obrir',
    'plenos.documents': 'Documents',
    'plenos.date': 'Data',
    'plenos.status': 'Estat',
    'plenos.actions': 'Accions',
    'plenos.pdf': 'PDF',
    'plenos.filter': 'Filtrar',
    'plenos.all': 'Tots',
    'plenos.all.female': 'Totes',
    'plenos.noFilteredResults': 'No hi ha resultats amb els filtres seleccionats.',
    'plenos.previous': 'Anterior',
    'plenos.next': 'Següent',
    'plenos.page': 'Pàgina',
    'plenos.of': 'de',
    'plenos.showing': 'Mostrant',
    'plenos.perPage': 'Plens per pàgina',
    'plenos.activeFilters': 'Filtres actius',
    'plenos.filter.pleno': 'Ple',
    'plenos.filter.date': 'Data',
    'plenos.filter.type': 'Tipus',
    'plenos.filter.channel': 'Canal',
    'plenos.filter.status': 'Estat',
    'plenos.active': 'Actiu',
    'plenos.activePleno': 'Ple actiu',
    'plenos.status.draft': 'Esborrany',
    'plenos.status.published': 'Publicat',
    'plenos.status.closed': 'Tancat',
    'plenos.doc.convocatoria': 'Convocatòria',
    'plenos.doc.acta': 'Acta',
    'plenos.doc.transcripcion': 'Transcripció'
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  // Servicio base de internacionalización con persistencia de idioma.
  private readonly languageSignal = signal<AppLanguage>(this.getInitialLanguage());
  private readonly enabledLanguageCodesSignal = signal<readonly AppLanguage[]>(this.getInitialEnabledLanguages());

  readonly languages = LANGUAGE_OPTIONS;
  readonly currentLanguage = this.languageSignal.asReadonly();
  readonly enabledLanguages = computed(() => {
    const enabledCodes = new Set(this.enabledLanguageCodesSignal());
    return LANGUAGE_OPTIONS.filter((language) => enabledCodes.has(language.code));
  });

  constructor() {
    // Mantiene el idioma activo para toda la sesión y entre reinicios de la app.
    effect(() => {
      const language = this.languageSignal();
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = this.toHtmlLanguage(language);
    });
  }

  setLanguage(language: AppLanguage): void {
    this.languageSignal.set(language);
  }

  setEnabledLanguages(languages: readonly AppLanguage[]): void {
    if (languages.length === 0) {
      const defaults = LANGUAGE_OPTIONS.map((item) => item.code);
      this.enabledLanguageCodesSignal.set(defaults);
      localStorage.removeItem(ENABLED_LANGUAGES_KEY);
      return;
    }

    const validLanguages = languages.filter((language) => this.isSupportedLanguage(language));
    const normalizedLanguages = Array.from(new Set(validLanguages));
    this.enabledLanguageCodesSignal.set(normalizedLanguages);
    localStorage.setItem(ENABLED_LANGUAGES_KEY, JSON.stringify(normalizedLanguages));

    if (!normalizedLanguages.includes(this.currentLanguage())) {
      this.setLanguage(normalizedLanguages[0] ?? 'es');
    }
  }

  t(key: TranslationKey): string {
    const language = this.languageSignal();
    return TRANSLATIONS[language][key] ?? TRANSLATIONS.es[key] ?? key;
  }

  private getInitialLanguage(): AppLanguage {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    if (this.isSupportedLanguage(storedLanguage)) {
      return storedLanguage;
    }
    return 'es';
  }

  private getInitialEnabledLanguages(): readonly AppLanguage[] {
    const raw = localStorage.getItem(ENABLED_LANGUAGES_KEY);
    if (!raw) {
      return LANGUAGE_OPTIONS.map((item) => item.code);
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return LANGUAGE_OPTIONS.map((item) => item.code);
      }

      const validLanguages = parsed.filter((item): item is AppLanguage => this.isSupportedLanguage(item));
      return validLanguages.length > 0 ? validLanguages : LANGUAGE_OPTIONS.map((item) => item.code);
    } catch {
      return LANGUAGE_OPTIONS.map((item) => item.code);
    }
  }

  private isSupportedLanguage(language: string | null): language is AppLanguage {
    return language === 'es' || language === 'ca' || language === 'gl' || language === 'eu' || language === 'val' || language === 'bal';
  }

  private toHtmlLanguage(language: AppLanguage): string {
    if (language === 'val') {
      return 'ca-ES-valencia';
    }
    if (language === 'bal') {
      return 'ca-ES';
    }
    return language;
  }
}
