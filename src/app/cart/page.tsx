'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
  })

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const tax = subtotal * 0.075
  const total = subtotal + tax

  const canCheckout =
    customer.fullName.trim() !== '' &&
    customer.email.trim() !== ''

  // ==============================
  // PAYSTACK CONFIG
  // ==============================

  const verifyPayment = async (reference: string) => {
  try {
    toast.loading('Verifying payment...')

    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        customer,
        cartItems: items,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Verification failed')
    }

    toast.success('Payment verified 🎉')
    clearCart()
  } catch (err) {
    console.error(err)
    toast.error('Payment verification failed')
  }
}

const handlePayment = () => {
  if (!(window as any).PaystackPop) {
    toast.error('Payment system not loaded')
    return
  }

 const handler = (window as any).PaystackPop.setup({
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  email: customer.email,
  amount: Math.round(total * 100),
  ref: new Date().getTime().toString(),

  callback: function (response: any) {
    toast.success('Payment successful 🎉')
    verifyPayment(response.reference)
  },

  onClose: function () {
    toast.error('Payment cancelled')
  },
})

  handler.openIframe()
}

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Your Tickets</h1>

          {items.map((item) => (
            <Card key={`${item.eventId}-${item.tierId}`} className="p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.eventId, item.tierId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.eventId, item.tierId, item.quantity - 1)
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="w-8 text-center">
                  {item.quantity}
                </span>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.eventId, item.tierId, item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </Card>
          ))}

          {/* CUSTOMER INFO */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">
              Ticket Holder Information
            </h3>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={customer.fullName}
                onChange={(e) =>
                  setCustomer({ ...customer, fullName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
            </div>
          </Card>
        </div>

        {/* SUMMARY */}
        <Card className="p-6 h-fit sticky top-20 space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <Separator />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee (7.5%)</span>
            <span>₦{tax.toLocaleString()}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <Button
            disabled={!canCheckout}
            className="w-full bg-[#008751] hover:bg-[#006f42]"
            onClick={handlePayment}

          >
            Pay with Paystack
          </Button>
        </Card>
      </div>
    </div>
  )
}
