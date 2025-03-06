import { useEffect, useState } from "react";

interface CredentialResponse {
  credential: string;
}

interface FedCMCredential {
  idToken: string;
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
  return (
    typeof window !== "undefined" &&
    "IdentityCredential" in window &&
    "navigator" in window &&
    "credentials" in navigator
  );
};

const isOneTapSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    !!window.google?.accounts?.id
  );
};

export const useGoogleAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFedCMAvailable, setIsFedCMAvailable] = useState<boolean>(false);
  const [isOneTapAvailable, setIsOneTapAvailable] = useState<boolean>(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      setError(null);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      setIsGoogleScriptLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isGoogleScriptLoaded) return;

    if (isFedCMSupported()) {
      setIsFedCMAvailable(true);
      authenticateWithFedCM();
    }

    if (isOneTapSupported()) {
      setIsOneTapAvailable(true);
      if(!isFedCMAvailable) {
        initializeGoogleOneTap();
      }
    }
  }, [isGoogleScriptLoaded]);

  const authenticateWithFedCM = async () => {
    try {
      const nonce = crypto.randomUUID?.() || Math.random().toString(36).substring(2);

      const credential = await navigator.credentials.get({
        identity: {
          context: "signin",
          providers: [
            {
              configURL: "https://accounts.google.com/gsi/fedcm.json",
              clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
              mode: "active",
              params: { nonce },
            },
          ],
        },
      } as never) as FedCMCredential | null;

      if (credential?.idToken) {
        setToken(credential.idToken);
        setError(null);
      } else {
        setError("Failed to retrieve FedCM credential");
      }
    } catch (err) {
      console.error(err);
      setError("Error during FedCM authentication");
    }
  };

  const initializeGoogleOneTap = () => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      callback: (response: CredentialResponse) => {
        setToken(response.credential);
        setError(null);
      },
      auto_select: true,
      cancel_on_tap_outside: false,
    });

    window.google.accounts.id.prompt();
  };

  const signInWithOAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=token&scope=email profile&prompt=consent`;
  };

  return { token, error, signInWithOAuth, isFedCMAvailable, isOneTapAvailable, isGoogleScriptLoaded };
};
