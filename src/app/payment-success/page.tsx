'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    fetch(`/api/orders/${orderId}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [orderId])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg animate-pulse">Loading your ticket...</p>
    </div>
  )

  if (!order) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">Could not load order. Please contact support.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-pink-600">
        <h1 className="text-4xl font-bold mb-2 text-pink-500">🎉 You're In!</h1>
        <p className="text-gray-400 mb-6">Your Afro Live Fest ticket is confirmed.</p>

        {order.qrCode && (
          <div className="mb-6">
            <img
              src={order.qrCode}
              alt="Ticket QR Code"
              className="mx-auto w-48 h-48 rounded-lg border-4 border-pink-500"
            />
            <p className="text-xs text-gray-500 mt-2">Present this QR code at the entrance</p>
          </div>
        )}

        <div className="text-left space-y-2 text-sm bg-gray-800 rounded-xl p-4">
          <p><span className="text-gray-400">Name:</span> <span className="font-semibold">{order.fullName}</span></p>
          <p><span className="text-gray-400">Email:</span> <span className="font-semibold">{order.email}</span></p>
          <p><span className="text-gray-400">Reference:</span> <span className="font-semibold text-pink-400">{order.reference}</span></p>
          <p><span className="text-gray-400">Amount:</span> <span className="font-semibold">₦{(order.amount / 100).toLocaleString()}</span></p>
        </div>

        <p className="text-gray-500 text-xs mt-6">
          📧 A copy of this ticket has been sent to your email.
        </p>
      </div>
    </div>
  )
}