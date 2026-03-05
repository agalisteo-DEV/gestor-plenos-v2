export const environment = {
  production: false,
  tenantKey: 'villaseca',
  defaultLocale: 'es-ES',
  sessionIdleMinutes: 35,
  defaults: {
    autocues: { mode: 'MANUAL', status: 'DRAFT' },
    transcription: { provider: 'mvp-segments' }
  },
  firebaseConfig: {
    apiKey: 'villaseca-key', authDomain: 'villaseca.firebaseapp.com', projectId: 'villaseca', storageBucket: 'villaseca.appspot.com', appId: 'villaseca-app'
  }
};
