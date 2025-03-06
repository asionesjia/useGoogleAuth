import Image from "next/image";
import GoogleAuthButton from "@/components/google-auth-button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-bold">
          <h1 className="text-3xl">
            useGoogleAuth
          </h1>
        </code>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 w-full md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)] text-wrap">
            If your browser supports{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              FedCM (preferred)
            </code>{' '}
            or{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              One Tap (fallback)
            </code>
            , please wait a few seconds. A FedCM login prompt will appear in the upper-right corner of your screen automatically.
          </li>
          <li className="mb-2 w-full md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)] text-wrap">
            <b>If neither FedCM nor One Tap is supported,</b> we will default to using OAuth.
          </li>
          <li className="mb-2 w-full md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)] text-wrap">
            <b>Auto-login is always prioritized,</b> while button clicks default to OAuth.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <GoogleAuthButton/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/asionesjia/useGoogleAuth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          GitHub Repo
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://asiones.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to asiones.com →
        </a>
      </footer>
    </div>
  );
}
