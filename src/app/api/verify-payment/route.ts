import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'
import { Resend } from 'resend'
import { put } from '@vercel/blob'

const resend = new Resend(process.env.RESEND_API_KEY)

async function uploadQRToBlob(orderId: string, qrBase64: string): Promise<string> {
  // Strip the data URL prefix and convert to buffer
  const base64Data = qrBase64.replace(/^data:image\/png;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')

  const { url } = await put(`qrcodes/${orderId}.png`, buffer, {
    access: 'public',
    contentType: 'image/png',
  })

  return url
}

async function sendTicketEmail(
  to: string,
  fullName: string,
  qrUrl: string,
  reference: string
) {
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: '🎉 Your Afro Live Fest Ticket',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 16px;">
        
        <h1 style="color: #FF6B00; margin-bottom: 4px;">🎟️ Afro Live Fest</h1>
        <p style="color: #aaa;">Your ticket is confirmed!</p>

        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Your payment was successful. Present the QR code below at the entrance.</p>

        <div style="text-align:center; margin: 24px 0;">
          <img
            src="${qrUrl}"
            width="200"
            height="200"
            style="border: 4px solid #008751; border-radius: 12px;"
          />
        </div>

        <div style="background:#1a1a1a; border-radius:12px; padding:16px; font-size:14px;">
          <p><span style="color:#aaa;">Name:</span> <strong>${fullName}</strong></p>
          <p><span style="color:#aaa;">Reference:</span> <strong style="color:#FF6B00;">${reference}</strong></p>
        </div>

        <p style="color:#888; font-size:12px; margin-top:24px;">
          See you at the event! 🎶
        </p>

      </div>
    `,
  })

  console.log('📧 Resend response:', JSON.stringify(result, null, 2))

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`)
  }

  return result
}

export async function POST(req: NextRequest) {
  try {
    const { reference, customer } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: 'No reference provided' }, { status: 400 })
    }

    // 1. Check if order already exists
    const existing = await prisma.order.findUnique({ where: { reference } })
    if (existing) {
      return NextResponse.json({ success: true, orderId: existing.id })
    }

    // 2. Verify with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    )

    const data = await verifyRes.json()

    if (!data.status || data.data.status !== 'success') {
      return NextResponse.json({ error: 'Payment not verified' }, { status: 400 })
    }

    const amountPaid = data.data.amount

    // 3. Create order
    const order = await prisma.order.create({
      data: {
        email: customer.email,
        fullName: customer.fullName,
        amount: amountPaid,
        reference,
      },
    })

    // 4. Generate QR code as base64
    const qrPayload = JSON.stringify({ orderId: order.id, reference, email: customer.email })
    const qrBase64 = await QRCode.toDataURL(qrPayload)

    // 5. Upload QR to Vercel Blob → get public URL
    const qrUrl = await uploadQRToBlob(order.id, qrBase64)

    // 6. Save both base64 (for success page) and blob URL to DB
    await prisma.order.update({
      where: { id: order.id },
      data: { qrCode: qrBase64, qrUrl },
    })

    // 7. Send ticket email with real public URL
    try {
      console.log('📤 Sending email to:', customer.email)
      await sendTicketEmail(customer.email, customer.fullName, qrUrl, reference)
      await prisma.order.update({ where: { id: order.id }, data: { emailSent: true } })
      console.log('✅ Email sent successfully')
    } catch (emailErr: any) {
      console.error('❌ Resend email failed:', emailErr?.message || emailErr)
    }

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}