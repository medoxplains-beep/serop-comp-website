import type { Metadata, Viewport } from "next"
import { Cairo, Montserrat, Poppins } from "next/font/google"
import { cookies } from "next/headers"
import Script from "next/script"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { I18nProvider } from "@/components/i18n-provider"
import { Mascot } from "@/components/mascot"
import { ThemeProvider } from "@/components/theme-provider"
import { getDirection, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "SEROP COMP - Certified Air Tanks & Pressure Vessels",
    template: "%s | SEROP COMP",
  },
  description:
    "Egyptian manufacturer of compressed air tanks and pressure vessels, established in 2009 and certified to ISO 9001, ISO 16528, and CE/PED requirements.",
  openGraph: {
    title: "SEROP COMP - Certified Air Tanks & Pressure Vessels",
    description:
      "Compressed air tanks and pressure vessels manufactured in Egypt for local industry and export markets.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("locale")?.value
  const locale: Locale = localeCookie === "ar" ? "ar" : "en"
  const dict = getDictionary(locale)
  const dir = getDirection(locale)

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${poppins.variable} ${cairo.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <I18nProvider locale={locale} dict={dict}>
            <Header />
            <main className="relative">{children}</main>
            <Footer />
            <Mascot />
          </I18nProvider>
        </ThemeProvider>

        {/* Botpress Webchat */}
        <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" strategy="afterInteractive" />
        <Script src="https://files.bpcontent.cloud/2026/05/18/13/20260518135749-I4PEKFNU.js" strategy="afterInteractive" defer />
      </body>
    </html>
  )
}
