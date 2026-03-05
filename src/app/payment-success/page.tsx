'use client'

export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import PaymentSuccess from './PaymentSuccess'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  )
}