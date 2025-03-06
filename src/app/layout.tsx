import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google FedCM auth hook(useGoogleAuth)",
  description: "This project provides a React hook (useGoogleAuth) that abstracts Google authentication logic, supporting both FedCM and One Tap sign-in methods. It automatically detects browser compatibility and selects the appropriate method. This project is based on Next.js 15, but you can use it in any version of React or Next.js.",
  authors: { url: "https://github.com/asionesjia", name: "Asiones Jia" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
