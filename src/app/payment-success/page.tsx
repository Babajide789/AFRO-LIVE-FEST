'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!orderId) return
    fetch(`/api/orders/${orderId}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [orderId])

  // ✅ Countdown then redirect to home
  useEffect(() => {
    if (!order) return
    if (countdown === 0) {
      router.push('/')
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [order, countdown, router])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <p className="text-white text-lg animate-pulse">Loading your ticket...</p>
    </div>
  )

  if (!order) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <p className="text-red-500">Could not load order. Please contact support.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-pink-600">
        <h1 className="text-4xl font-bold mb-2 text-pink-500">🎉 You&apos;re In!</h1>
        <p className="text-gray-400 mb-6">Your Afro Live Fest ticket is confirmed.</p>

       {order.qrCode && (
  <div className="mb-6 flex flex-col items-center">
    <Image
      src={order.qrCode}
      alt="Ticket QR Code"
      width={192}
      height={192}
      className="rounded-lg border-4 border-pink-500"
      priority
    />
    <p className="text-xs text-gray-500 mt-2">
      Present this QR code at the entrance
    </p>
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

        {/* ✅ Countdown banner */}
        <div className="mt-6 bg-pink-950 border border-pink-700 rounded-xl px-4 py-3">
          <p className="text-pink-300 text-sm">
            Redirecting you to the homepage in{' '}
            <span className="font-bold text-white">{countdown}s</span>
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-2 text-xs text-pink-400 underline hover:text-white"
          >
            Go now →
          </button>
        </div>
      </div>
    </div>
  )
}