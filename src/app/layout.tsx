import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const sora = Sora({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#312E81",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nexadhi.com"),
  title: {
    default: "NexaDhi | AI Talent Assessment & Engineering Learning Platform",
    template: "%s | NexaDhi",
  },
  description:
    "Transform technical hiring and career growth with NexaDhi. Features adaptive AI coding assessments, in-browser sandboxes, anti-cheat proctoring, and verified credentials.",
  keywords: [
    "AI talent assessment",
    "technical interview preparation",
    "coding assessment platform",
    "in-browser coding sandbox",
    "AI proctoring software",
    "campus placement platform",
    "skill-based hiring",
    "developer certification",
    "NexaDhi",
    "Neuronexa",
  ],
  authors: [{ name: "Neuronexa Labs", url: "https://neuronexa.com" }],
  creator: "Neuronexa Labs",
  publisher: "Neuronexa Labs",
  alternates: {
    canonical: "https://nexadhi.com",
  },
  openGraph: {
    title: "NexaDhi | AI Talent Assessment & Engineering Learning Platform",
    description:
      "Transform technical hiring and career growth with NexaDhi. Features adaptive AI coding assessments, in-browser sandboxes, anti-cheat proctoring, and verified credentials.",
    url: "https://nexadhi.com",
    siteName: "NexaDhi",
    images: [
      {
        url: "/assets/nexadhi_light_ui_mockup.webp",
        width: 1200,
        height: 675,
        alt: "NexaDhi Platform Interface Mockup",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaDhi | AI Talent Assessment & Engineering Learning Platform",
    description:
      "Adaptive coding assessments, in-browser coding environments, AI proctoring, and verified skill credentials.",
    images: ["/assets/nexadhi_light_ui_mockup.webp"],
    creator: "@neuronexalabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NexaDhi",
  "operatingSystem": "Web",
  "applicationCategory": "EducationalApplication, BusinessApplication",
  "description":
    "AI-powered talent assessment and engineering learning platform featuring adaptive coding tests, in-browser compilers, and verified credentials.",
  "url": "https://nexadhi.com",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Neuronexa Labs",
    "url": "https://neuronexa.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] text-[#334155] font-sans antialiased selection:bg-[#7C3AED]/20 selection:text-[#312E81] flex flex-col overflow-x-hidden"
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
