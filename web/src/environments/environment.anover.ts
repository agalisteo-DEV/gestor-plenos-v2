export const environment = {
  production: false,
  tenantKey: 'anover',
  defaultLocale: 'es-ES',
  sessionIdleMinutes: 25,
  defaults: {
    autocues: { mode: 'MOBILE_LIVE', status: 'DRAFT' },
    transcription: { provider: 'mvp-segments' }
  },
  firebaseConfig: {
    apiKey: 'anover-key', authDomain: 'anover.firebaseapp.com', projectId: 'anover', storageBucket: 'anover.appspot.com', appId: 'anover-app'
  }
};
