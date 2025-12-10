import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
] as const;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid payload. Please check your inputs." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const missing = requiredEnvVars.filter((key) => !process.env[key]);
    if (missing.length) {
      console.error("Missing contact env vars:", missing.join(", "));
      return NextResponse.json(
        { error: "Email is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: fromAddress,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: trimmedEmail,
      subject: `New portfolio message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="background: #0b1224; padding: 32px 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e5ecff;">
          <div style="max-width: 640px; margin: 0 auto; background: linear-gradient(135deg, rgba(18,53,102,0.9), rgba(13,27,58,0.95)); border: 1px solid rgba(99, 179, 237, 0.2); border-radius: 18px; overflow: hidden; box-shadow: 0 25px 80px rgba(16, 36, 94, 0.55);">
            <div style="padding: 24px 28px 10px; background: radial-gradient(circle at 20% 20%, rgba(99,179,237,0.2), transparent 35%), radial-gradient(circle at 80% 0%, rgba(101,255,198,0.18), transparent 32%), rgba(10,18,36,0.85); border-bottom: 1px solid rgba(99,179,237,0.15);">
              <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.22em; color: #7cd0ff; font-weight: 600;">Portfolio Contact</div>
              <div style="margin-top: 6px; font-size: 22px; font-weight: 700; color: #f5f8ff;">New message from ${safeName}</div>
              <div style="margin-top: 4px; font-size: 14px; color: #b8c7e8;">Sent via your portfolio contact form.</div>
            </div>

            <div style="padding: 24px 28px 6px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.7; color: #dfe7ff;">
                <tbody>
                  <tr>
                    <td style="padding: 12px 0; width: 120px; color: #8fb5ff; font-weight: 600;">Name</td>
                    <td style="padding: 12px 0; font-weight: 600; color: #f5f8ff;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; width: 120px; color: #8fb5ff; font-weight: 600;">Email</td>
                    <td style="padding: 12px 0;">
                      <a href="mailto:${safeEmail}" style="color: #7cd0ff; text-decoration: none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0 8px; vertical-align: top; width: 120px; color: #8fb5ff; font-weight: 600;">Message</td>
                    <td style="padding: 16px 0 8px;">
                      <div style="padding: 14px 16px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(99,179,237,0.15); border-radius: 12px; color: #e5ecff; line-height: 1.7;">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 18px; padding: 14px 16px; background: linear-gradient(135deg, rgba(99,179,237,0.18), rgba(101,255,198,0.15)); border: 1px solid rgba(99,179,237,0.25); border-radius: 12px; color: #cfe5ff; font-size: 13px;">
                Tip: hit “Reply” in your email client and you’ll reply directly to ${safeName}.
              </div>
            </div>

            <div style="padding: 14px 28px 18px; background: rgba(6,12,26,0.9); border-top: 1px solid rgba(99,179,237,0.12); display: flex; align-items: center; justify-content: space-between; color: #9bb1d9; font-size: 12px;">
              <div>Message routed from your portfolio contact form.</div>
              <div style="color: #7cd0ff; font-weight: 600;">Sandeep MS</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500 }
    );
  }
}
