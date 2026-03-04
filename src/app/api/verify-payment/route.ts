import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendTicketEmail(to: string, fullName: string, qrCode: string, reference: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: '🎉 Your Afro Live Fest Ticket',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 16px;">
        <h1 style="color: #e11d48; margin-bottom: 4px;">🎟️ Afro Live Fest</h1>
        <p style="color: #aaa;">Your ticket is confirmed!</p>
        
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Your payment was successful. Present the QR code below at the entrance.</p>

        <div style="text-align:center; margin: 24px 0;">
          <img src="${qrCode}" alt="QR Code" style="width:200px; height:200px; border: 4px solid #e11d48; border-radius: 12px;" />
        </div>

        <div style="background:#1a1a1a; border-radius:12px; padding:16px; font-size:14px;">
          <p><span style="color:#aaa;">Reference:</span> <strong style="color:#e11d48;">${reference}</strong></p>
        </div>

        <p style="color:#555; font-size:12px; margin-top:24px;">See you at the event! 🎶</p>
      </div>
    `,
  })
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
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
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

    // 4. Generate QR code
    const qrPayload = JSON.stringify({ orderId: order.id, reference, email: customer.email })
    const qrCode = await QRCode.toDataURL(qrPayload)

    // 5. Save QR to DB
    await prisma.order.update({
      where: { id: order.id },
      data: { qrCode },
    })

    // 6. Send ticket email via Resend (non-blocking)
    try {
      await sendTicketEmail(customer.email, customer.fullName, qrCode, reference)
      await prisma.order.update({ where: { id: order.id }, data: { emailSent: true } })
    } catch (emailErr) {
      console.error('Resend email failed:', emailErr)
    }

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}