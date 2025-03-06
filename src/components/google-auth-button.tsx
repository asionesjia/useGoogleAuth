'use client'

import {useGoogleAuth} from "@/hooks/use-google-auth";
import {cn} from "@/lib/utils";

const GoogleAuthButton = () => {
    const { token, error, signInWithOAuth, isFedCMAvailable, isOneTapAvailable, isGoogleScriptLoaded } = useGoogleAuth();

    return (
      <div className="flex flex-col items-start justify-centers">
        <div className="flex gap-2 md:gap-4 items-center justify-start text-sm pb-8">
          <span className="text-black/[.5] dark:text-white/[.5] font-medium">Current Availability:</span>
          <span className={cn("bg-black/[.05] dark:bg-white/[.06] px-2 py-0.5 rounded font-semibold",
            isFedCMAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            )}>FedCM</span>
          <span className={cn("text-nowrap bg-black/[.05] dark:bg-white/[.06] px-2 py-0.5 rounded font-semibold",
            isFedCMAvailable ? 'text-foreground' : isOneTapAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
            !isGoogleScriptLoaded && 'bg-black/[.05] dark:bg-white/[.06] text-foreground'
          )}>{isGoogleScriptLoaded ? 'One Tap' : 'One Tap is Loading...'}</span>
          <span className={cn("bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold")}>Oauth</span>
        </div>
          <button
            onClick={signInWithOAuth}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
              {error ? `Error: ${error}` : token ? "Logged in" : "Sign in with Google Oauth"}
          </button>
      </div>
    );
};

export default GoogleAuthButton;
