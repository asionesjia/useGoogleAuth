'use client';

import {useGoogleAuth} from '@/hooks/use-google-auth';
import {cn} from '@/lib/utils';

const GoogleAuthButton = () => {
  const {
    token,
    error,
    signInWithOAuth,
    isFedCMAvailable,
    isOneTapAvailable,
    isGoogleScriptLoaded,
    isFedCMAuthenticating,
  } = useGoogleAuth();

  return (
    <div className="justify-centers flex flex-col items-start">
      <div className="flex items-center justify-start gap-2 pb-8 text-sm md:gap-4">
        <span className="font-medium text-black/[.5] dark:text-white/[.5]">
          Current Availability:
        </span>
        {isGoogleScriptLoaded ? (
          <>
            <span
              className={cn(
                'rounded bg-black/[.05] px-2 py-0.5 font-semibold dark:bg-white/[.06]',
                isFedCMAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              )}
            >
              FedCM
            </span>
            <span
              className={cn(
                'text-nowrap rounded bg-black/[.05] px-2 py-0.5 font-semibold dark:bg-white/[.06]',
                (() => {
                  if (isFedCMAvailable) {
                    return 'text-foreground';
                  }
                  if (isOneTapAvailable) {
                    return 'bg-green-100 text-green-700';
                  }
                  return 'bg-red-100 text-red-700';
                })()
              )}
            >
              One Tap
            </span>
            <span
              className={cn(
                'rounded bg-green-100 px-2 py-0.5 font-semibold text-green-700'
              )}
            >
              Oauth
            </span>
          </>
        ) : (
          <span>Google Script is Loading now...</span>
        )}
      </div>
      <button
        type="button"
        onClick={signInWithOAuth}
        className="flex h-10 items-center justify-start gap-2 rounded-full border border-transparent border-solid bg-foreground px-4 text-background text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
      >
        {token ? 'Logged in' : 'Sign in with Google Oauth'}
      </button>
      {isFedCMAuthenticating && (
        <p className="pt-2.5 font-medium font-sm text-black/[.5] dark:text-white/[.5]">
          The FedCM is authenticating...
        </p>
      )}
      {error && (
        <p className="pt-2.5 font-medium font-sm text-red-700">{error}</p>
      )}
    </div>
  );
};

export default GoogleAuthButton;
