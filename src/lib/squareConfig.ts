// Square settings for the browser. Nothing here is secret: the application id
// and location id are public identifiers. The access token lives only in the
// square-create-payment edge function.
//
// The environment is derived from the application id, not set separately, so
// the SDK that gets loaded can never disagree with the id passed to it.
// Square sandbox application ids start with "sandbox-".

export type SquareEnvironment = 'production' | 'sandbox';

export interface SquareConfig {
  applicationId: string;
  locationId: string | undefined;
  environment: SquareEnvironment;
  sdkUrl: string;
}

const SDK_URLS: Record<SquareEnvironment, string> = {
  production: 'https://web.squarecdn.com/v1/square.js',
  sandbox: 'https://sandbox.web.squarecdn.com/v1/square.js',
};

export function resolveSquareConfig(env: Record<string, unknown>): SquareConfig | null {
  const applicationId = typeof env.VITE_SQUARE_APPLICATION_ID === 'string' ? env.VITE_SQUARE_APPLICATION_ID.trim() : '';
  if (!applicationId) return null;

  const locationId = typeof env.VITE_SQUARE_LOCATION_ID === 'string' ? env.VITE_SQUARE_LOCATION_ID.trim() : '';
  const environment: SquareEnvironment = applicationId.startsWith('sandbox-') ? 'sandbox' : 'production';
  return { applicationId, locationId: locationId || undefined, environment, sdkUrl: SDK_URLS[environment] };
}

/** null when VITE_SQUARE_APPLICATION_ID is not set: checkout is then unavailable. */
export const squareConfig = resolveSquareConfig(import.meta.env);
