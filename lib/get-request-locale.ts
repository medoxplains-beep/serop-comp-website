import { cookies } from "next/headers"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get("locale")?.value
  return value && isLocale(value) ? value : defaultLocale
}
