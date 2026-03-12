import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const TO_EMAIL = process.env.CONTACT_EMAIL || 'massivemedias@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, phone, company, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'JPrunier Contact <noreply@jprunier.com>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nouveau message de ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7456f1; border-bottom: 2px solid #7456f1; padding-bottom: 10px;">
            Nouveau message — jprunier.com
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 120px;">Nom</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr style="background: #f8f8f8;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Téléphone</td>
              <td style="padding: 8px 12px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>` : ''}
            ${company ? `
            <tr style="background: #f8f8f8;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Compagnie</td>
              <td style="padding: 8px 12px;">${company}</td>
            </tr>` : ''}
          </table>
          <div style="background: #f4f4f8; border-left: 4px solid #7456f1; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Ce message a été envoyé via le formulaire de contact de jprunier.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
