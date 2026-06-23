"use client"

import { useState } from "react"

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlPtT64oW3Wh8TcRy6LR9lFtHvg0BqBNbIYZGFYYokms6RVsbUTIF8K4RnWQ7KzV-p/exec"

export default function LeadPage() {
  const [name, setName]   = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    const body = new URLSearchParams({
      name, phone,
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
        #lead-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: max(18px, env(safe-area-inset-top)) 14px max(18px, env(safe-area-inset-bottom));
          background: linear-gradient(135deg, #071c33 0%, #0a3060 45%, #064a38 100%);
          font-family: Arial, Tahoma, sans-serif;
          overflow-y: auto;
          direction: rtl;
        }
        .lc {
          width: min(100%, 430px);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 22px;
          background: rgba(255,255,255,0.97);
          box-shadow: 0 24px 60px rgba(5,18,35,0.5);
        }
        .lc-head {
          padding: 26px 20px 18px;
          background: linear-gradient(135deg, #08529e, #06735a);
          color: #fff;
          text-align: center;
        }
        .lc-eye {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }
        .lc-h1 {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 10px;
        }
        .lc-sub {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.88);
          max-width: 310px;
          margin: 0 auto;
        }
        .lc-body { padding: 20px 18px; }
        .lc-note {
          background: #eff6ff;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 13.5px;
          line-height: 1.7;
          color: #1e3a5f;
          margin-bottom: 18px;
        }
        .lc-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin: 14px 0 6px;
        }
        .lc-input {
          width: 100%;
          min-height: 50px;
          border: 1.5px solid #c5d4e0;
          border-radius: 12px;
          background: #f8fafc;
          padding: 12px 14px;
          font-size: 17px;
          font-family: inherit;
          color: #111827;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .lc-input:focus {
          border-color: #075985;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(14,116,144,.16);
        }
        .lc-tel { direction: ltr; text-align: left; }
        .lc-btn {
          width: 100%;
          min-height: 52px;
          margin-top: 20px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #075985, #065f46);
          color: #fff;
          font-size: 17px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: opacity .15s;
        }
        .lc-btn:disabled { opacity: .65; cursor: wait; }
        .lc-ok  { margin-top:16px; padding:13px 14px; border-radius:12px; background:#d1fae5; color:#065f46; font-size:15px; line-height:1.6; }
        .lc-err { margin-top:16px; padding:13px 14px; border-radius:12px; background:#fee2e2; color:#991b1b; font-size:15px; line-height:1.6; }
        @media (max-width:520px) {
          #lead-overlay { align-items: flex-end; }
          .lc { border-radius: 22px 22px 14px 14px; }
        }
      `}</style>

      <div id="lead-overlay">
        <main className="lc">
          <header className="lc-head">
            <p className="lc-eye">Official Contact Form</p>
            <h1 className="lc-h1">Welcome to SeropComp</h1>
            <p className="lc-sub">برجاء تسجيل بياناتك وسيقوم فريقنا بالتواصل معك في أقرب وقت.</p>
          </header>

          <div className="lc-body">
            <p className="lc-note">هذه الصفحة خاصة بفريق SeropComp لتسجيل طلبات التواصل بشكل آمن وسريع.</p>

            {status !== "success" ? (
              <form onSubmit={handleSubmit}>
                <label className="lc-label" htmlFor="ld-name">الاسم</label>
                <input
                  id="ld-name" className="lc-input" type="text"
                  autoComplete="name" placeholder="اكتب اسمك" required
                  value={name} onChange={(e) => setName(e.target.value)}
                />

                <label className="lc-label" htmlFor="ld-phone">رقم الهاتف</label>
                <input
                  id="ld-phone" className="lc-input lc-tel" type="tel"
                  inputMode="tel" autoComplete="tel" placeholder="01001234567" required
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                />

                <button className="lc-btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "جاري الإرسال…" : "إرسال البيانات"}
                </button>

                {status === "error" && (
                  <p className="lc-err">حدث خطأ، حاول مرة أخرى.</p>
                )}
              </form>
            ) : (
              <p className="lc-ok">✓ تم إرسال بياناتك بنجاح، شكراً لك.</p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
