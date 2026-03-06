import { effect, Injectable, signal } from '@angular/core';

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
  | 'login.language.bal';

type TranslationCatalog = Record<TranslationKey, string>;

interface LanguageOption {
  readonly code: AppLanguage;
  readonly labelKey: TranslationKey;
  readonly flagPath: string;
}

const STORAGE_KEY = 'gpv2_lang';

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
    'login.language.bal': 'Balear'
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
    'login.language.bal': 'Balear'
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
    'login.language.bal': 'Balear'
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
    'login.language.bal': 'Balearra'
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
    'login.language.bal': 'Balear'
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
    'login.language.bal': 'Balear'
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  // Servicio base de internacionalización con persistencia de idioma.
  private readonly languageSignal = signal<AppLanguage>(this.getInitialLanguage());

  readonly languages = LANGUAGE_OPTIONS;
  readonly currentLanguage = this.languageSignal.asReadonly();

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

  t(key: TranslationKey): string {
    const language = this.languageSignal();
    return TRANSLATIONS[language][key] ?? TRANSLATIONS.es[key];
  }

  private getInitialLanguage(): AppLanguage {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    if (this.isSupportedLanguage(storedLanguage)) {
      return storedLanguage;
    }
    return 'es';
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
