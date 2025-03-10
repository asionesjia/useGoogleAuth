import GoogleAuthButton from '@/components/google-auth-button';
import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between justify-items-center p-8 font-[family-name:var(--font-geist-sans)] sm:p-20 md:grid md:grid-rows-[20px_1fr_20px] md:justify-center md:gap-16">
      <main className="row-start-2 flex flex-col items-start gap-8">
        <code className="rounded bg-black/[.05] px-1 py-0.5 font-bold dark:bg-white/[.06]">
          <h1 className="text-3xl">useGoogleAuth</h1>
        </code>
        <ol className="list-inside list-decimal text-left font-[family-name:var(--font-geist-mono)] text-sm">
          <li
            className="mb-2 w-full text-wrap md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)]">
            If your browser supports{' '}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              FedCM (preferred)
            </code>{' '}
            or{' '}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              One Tap (fallback)
            </code>
            , please wait a few seconds. A FedCM login prompt will appear in the
            upper-right corner of your screen automatically.
          </li>
          <li
            className="mb-2 w-full text-wrap md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)]">
            <b>If neither FedCM nor One Tap is supported,</b> we will default to
            using OAuth.
          </li>
          <li
            className="mb-2 w-full text-wrap md:w-[calc(80vw)] lg:w-[calc(70vw)] xl:w-[calc(60vw)] 2xl:w-[calc(50vw)]">
            <b>Auto-login is always prioritized,</b> while button clicks default
            to OAuth.
          </li>
          <li>
            You can check this page on different devices and browsers. For
            example:
            <ul className="flex items-start gap-2 pt-2.5 pl-4">
              <li className="block md:hidden">
                On <strong>IOS Chrome</strong>:
                <ul className="list-inside list-disc pt-2">
                  <li>
                    <span>FedCM is not supported.(Red)</span>
                  </li>
                  <li>
                    <span>One Tap is supported and enabled.(Green)</span>
                  </li>
                  <li>
                    <span>
                      OAuth is supported and enabled by default.(Green)
                    </span>
                  </li>
                </ul>
              </li>
              <li className="hidden md:block">
                On <strong>PC/Mac Chrome</strong>:
                <ul className="list-inside list-disc pt-2">
                  <li>
                    <span>FedCM is supported.(Green)</span>
                  </li>
                  <li>
                    <span>One Tap is supported but not enabled.(Gray)</span>
                  </li>
                  <li>
                    <span>
                      OAuth is supported and enabled by default.(Green)
                    </span>
                  </li>
                </ul>
              </li>
              <li className="hidden md:block">
                On <strong>Mac Safari</strong>:
                <ul className="list-inside list-disc pt-2">
                  <li>
                    <span>FedCM is not supported.(Red)</span>
                  </li>
                  <li>
                    <span>One Tap is supported and enabled.(Green)</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <GoogleAuthButton/>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
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
