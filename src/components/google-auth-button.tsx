'use client'

import {useGoogleAuth} from "@/hooks/use-google-auth";

const GoogleAuthButton = () => {
    const { token, error, signInWithOAuth, isFedCMAvailable } = useGoogleAuth();

    return (
      <div className="flex flex-col items-center gap-4">
          <button
            onClick={signInWithOAuth}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
              {error ? `Error: ${error}` : token ? "Logged in" : isFedCMAvailable ? "Sign in with Google FedCM" : "Sign in with Google Oauth"}
          </button>
      </div>
    );
};

export default GoogleAuthButton;
