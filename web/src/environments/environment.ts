export const environment = {
  production: false,
  tenantKey: 'default',
  defaultLocale: 'es-ES',
  sessionIdleMinutes: 30,
  defaults: {
    autocues: { mode: 'MANUAL', status: 'DRAFT' },
    transcription: { provider: 'mvp-segments' }
  },
  firebaseConfig: {
    apiKey: 'demo', authDomain: 'demo.firebaseapp.com', projectId: 'demo', storageBucket: 'demo.appspot.com', appId: 'demo'
  }
};
