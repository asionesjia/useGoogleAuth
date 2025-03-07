import {useEffect, useState} from 'react';

interface CredentialResponse {
  credential: string;
}

interface FedCMCredential {
  token: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const isFedCMSupported = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      'IdentityCredential' in window &&
      'navigator' in window &&
      'credentials' in navigator &&
      !!navigator.credentials.get
    );
  } catch {
    return false;
  }
};

const isOneTapSupported = (): boolean => {
  return typeof window !== 'undefined' && !!window.google?.accounts?.id;
};

export const useGoogleAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFedCMAvailable, setIsFedCMAvailable] = useState<boolean>(false);
  const [isOneTapAvailable, setIsOneTapAvailable] = useState<boolean>(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] =
    useState<boolean>(false);
  const [isFedCMAuthenticating, setIsFedCMAuthenticating] =
    useState<boolean>(false);
  const [hasAttemptedAutoLogin, setHasAttemptedAutoLogin] =
    useState<boolean>(false); // New flag

  // Load Google script and check for access token from OAuth redirect
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
      setError(null);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      setIsGoogleScriptLoaded(true);
    };
    script.onerror = () => {
      setError('Failed to load Google script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle authentication logic (only attempt once)
  useEffect(() => {
    if (
      !isGoogleScriptLoaded ||
      isFedCMAuthenticating ||
      token ||
      hasAttemptedAutoLogin // Prevent retry after first attempt
    ) {
      return;
    }

    const fedCMSupported = isFedCMSupported();
    const oneTapSupported = isOneTapSupported();

    setIsFedCMAvailable(fedCMSupported);
    setIsOneTapAvailable(oneTapSupported);

    if (fedCMSupported) {
      authenticateWithFedCM();
    } else if (oneTapSupported) {
      initializeGoogleOneTap();
    } else {
      setError('FedCM and One Tap unavailable, please use OAuth');
      setHasAttemptedAutoLogin(true); // Mark attempt as done even if no methods are available
    }
  }, [
    isGoogleScriptLoaded,
    isFedCMAuthenticating,
    token,
    hasAttemptedAutoLogin,
  ]);

  const authenticateWithFedCM = async () => {
    if (isFedCMAuthenticating) {
      return;
    }
    setIsFedCMAuthenticating(true);

    try {
      const nonce =
        crypto.randomUUID?.() || Math.random().toString(36).substring(2);
      const credential = (await navigator.credentials.get({
        identity: {
          context: 'signin',
          providers: [
            {
              configURL: 'https://accounts.google.com/gsi/fedcm.json',
              clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
              mode: 'passive',
              params: {nonce},
            },
          ],
        },
      } as never)) as FedCMCredential | null;

      if (credential?.token) {
        setToken(credential.token);
        setError(null);
      } else {
        setError(
          'Failed to retrieve FedCM credential - possibly disabled in browser'
        );
        setIsFedCMAvailable(false); // Trigger fallback
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === 'NotAllowedError') {
        setError(
          'FedCM was disabled in browser Site Settings or multiple requests detected'
        );
        setIsFedCMAvailable(false); // Trigger fallback to One Tap
      } else {
        setError(`FedCM authentication error: ${error.message}`);
      }
    } finally {
      setIsFedCMAuthenticating(false);
      setHasAttemptedAutoLogin(true); // Mark attempt as done
    }
  };

  const initializeGoogleOneTap = () => {
    if (!window.google?.accounts?.id || isFedCMAuthenticating) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      callback: (response: CredentialResponse) => {
        setToken(response.credential);
        setError(null);
      },
      auto_select: true,
      cancel_on_tap_outside: false,
    });

    window.google.accounts.id.prompt();
    setHasAttemptedAutoLogin(true); // Mark attempt as done after prompting
  };

  const signInWithOAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=token&scope=email profile&prompt=consent`;
  };

  return {
    token,
    error,
    signInWithOAuth,
    isFedCMAvailable,
    isOneTapAvailable,
    isGoogleScriptLoaded,
    isFedCMAuthenticating,
    hasAttemptedAutoLogin, // Expose for debugging if needed
  };
};
