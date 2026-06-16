import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" }),
          name:      body.name     ?? "",
          company:   body.company  ?? "",
          phone:     body.phone    ?? "",
          email:     body.email    ?? "",
          capacity:  body.capacity ?? "",
          quantity:  body.quantity ?? "",
          message:   body.message  ?? "",
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
