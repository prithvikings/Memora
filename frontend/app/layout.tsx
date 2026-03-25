import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Memora | Turn Your Bookmarks Into an AI-Powered Knowledge Hub",
  description: "Turn Your Bookmarks Into an AI-Powered Knowledge Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        poppins.variable,
        instrument.variable,
        jetbrainsMono.variable,
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="antialiased font-poppins selection:bg-neutral-200 selection:text-black">
        {/* CRITICAL: Ensure NEXT_PUBLIC_GOOGLE_CLIENT_ID is in your frontend .env.local */}
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
