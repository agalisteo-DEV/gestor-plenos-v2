import * as logger from 'firebase-functions/logger';
import { onCall } from 'firebase-functions/v2/https';

export const inviteUser = onCall(async (request) => {
  logger.info('inviteUser called', { email: request.data?.email });
  return { ok: true, message: 'Invitation stub created' };
});

export const publishPlenoProjection = onCall(async (request) => {
  const plenoId = request.data?.plenoId;
  logger.info('publishPlenoProjection', { plenoId });
  return { ok: true, path: `publicPlenos/${plenoId}` };
});

export const generateMinutesPdf = onCall(async () => ({ ok: true, storagePath: 'eu/minutes/demo.pdf' }));
export const generateTranscriptionPdf = onCall(async () => ({ ok: true, storagePath: 'eu/transcriptions/demo.pdf' }));
