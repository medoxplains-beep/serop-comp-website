import { NextRequest, NextResponse } from "next/server"
import { isLocale } from "@/lib/i18n/config"

export async function POST(request: NextRequest) {
  const { locale } = await request.json()
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 })
  }
  const response = NextResponse.json({ success: true })
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}
