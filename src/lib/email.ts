import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendTicketEmail({
  email,
  fullName,
  reference,
  qrCode,
}: {
  email: string
  fullName: string
  reference: string
  qrCode: string
}) {
  await resend.emails.send({
    from: 'tickets@afrolivefest.com',
    to: email,
    subject: '🎟 Your AFROLIVE FEST Ticket',
    html: `
      <h2>Hi ${fullName},</h2>
      <p>Your payment was successful.</p>
      <p><strong>Reference:</strong> ${reference}</p>
      <p>Present this QR code at the event entrance:</p>
      <img src="${qrCode}" />
      <p>See you at AFROLIVE FEST 🎶🔥</p>
    `,
  })
}