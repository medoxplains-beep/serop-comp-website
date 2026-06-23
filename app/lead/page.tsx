"use client"

import { useState } from "react"
import type { Metadata } from "next"

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlPtT64oW3Wh8TcRy6LR9lFtHvg0BqBNbIYZGFYYokms6RVsbUTIF8K4RnWQ7KzV-p/exec"

export default function LeadPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    const body = new URLSearchParams({
      name,
      phone,
      source: "seropcomp-lead",
      userAgent: navigator.userAgent,
    })

    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        #lead-root {
          min-height: 100vh;
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: max(18px, env(safe-area-inset-top)) 14px max(18px, env(safe-area-inset-bottom));
          background:
            linear-gradient(90deg, rgba(7,28,51,0.72), rgba(7,28,51,0.34)),
            url('/images/designs/engineering-design-01.webp') center / cover no-repeat fixed;
          font-family: Arial, Tahoma, sans-serif;
          color: #102033;
        }
        .lead-card {
          width: min(100%, 430px);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.48);
          border-radius: 22px;
          background: rgba(255,255,255,0.94);
          box-shadow: 0 22px 55px rgba(5,18,35,0.34);
          backdrop-filter: blur(10px);
        }
        .lead-brand {
          padding: 22px 20px 16px;
          background: linear-gradient(135deg, rgba(8,79,142,0.94), rgba(6,95,70,0.92));
          color: #fff;
          text-align: center;
        }
        .lead-eyebrow {
          color: rgba(255,255,255,0.84);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .lead-h1 {
          font-size: 25px;
          line-height: 1.25;
          color: #fff;
          font-weight: bold;
        }
        .lead-subtitle {
          margin: 10px auto 0;
          max-width: 320px;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          line-height: 1.7;
        }
        .lead-content { padding: 18px; }
        .lead-trust {
          margin-bottom: 16px;
          border-radius: 14px;
          background: #eff6ff;
          padding: 12px 13px;
          color: #1e3a5f;
          font-size: 14px;
          line-height: 1.7;
        }
        .lead-label {
          display: block;
          margin: 13px 0 7px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 700;
        }
        .lead-input {
          width: 100%;
          min-height: 50px;
          border: 1px solid #b9c8d8;
          border-radius: 12px;
          background: #f8fafc;
          padding: 12px 14px;
          color: #111827;
          font-size: 18px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s, outline 0.15s;
        }
        .lead-input:focus {
          border-color: #075985;
          background: #fff;
          outline: 3px solid rgba(14,116,144,0.18);
        }
        .lead-input-tel { direction: ltr; text-align: left; }
        .lead-btn {
          width: 100%;
          min-height: 52px;
          margin-top: 18px;
          border: 0;
          border-radius: 12px;
          background: #075985;
          color: #fff;
          cursor: pointer;
          font-size: 17px;
          font-weight: 700;
          font-family: inherit;
          transition: opacity 0.15s;
        }
        .lead-btn:disabled { cursor: wait; opacity: 0.72; }
        .lead-msg {
          margin-top: 16px;
          padding: 13px 14px;
          border-radius: 12px;
          font-size: 15px;
          line-height: 1.6;
        }
        .lead-success { background: #d1fae5; color: #065f46; }
        .lead-error   { background: #fee2e2; color: #991b1b; }
        @media (max-width: 520px) {
          #lead-root { align-items: end; background-position: center top; }
          .lead-card { border-radius: 22px 22px 14px 14px; }
          .lead-h1   { font-size: 23px; }
        }
      `}</style>

      <div id="lead-root" dir="rtl">
        <main className="lead-card">
          <section className="lead-brand" aria-label="SeropComp">
            <p className="lead-eyebrow">Official Contact Form</p>
            <h1 className="lead-h1">Welcome to SeropComp</h1>
            <p className="lead-subtitle">
              برجاء تسجيل بياناتك وسيقوم فريقنا بالتواصل معك في اقرب وقت.
            </p>
          </section>

          <section className="lead-content">
            <p className="lead-trust">
              هذه الصفحة خاصة بفريق SeropComp لتسجيل طلبات التواصل بشكل آمن وسريع.
            </p>

            {status !== "success" ? (
              <form onSubmit={handleSubmit}>
                <label className="lead-label" htmlFor="name">الاسم</label>
                <input
                  id="name"
                  className="lead-input"
                  type="text"
                  autoComplete="name"
                  placeholder="اكتب اسمك"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="lead-label" htmlFor="phone">رقم الهاتف</label>
                <input
                  id="phone"
                  className="lead-input lead-input-tel"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01001234567"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button className="lead-btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "جاري الإرسال..." : "إرسال البيانات"}
                </button>

                {status === "error" && (
                  <p className="lead-msg lead-error">حدث خطأ. حاول مرة اخرى.</p>
                )}
              </form>
            ) : (
              <p className="lead-msg lead-success">تم إرسال بياناتك بنجاح، شكرا لك.</p>
            )}
          </section>
        </main>
      </div>
    </>
  )
}
