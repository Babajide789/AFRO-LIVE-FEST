// 'use client'

// import { useCart } from '@/app/context/CartContext'
// import { Card } from '@/components/ui/card'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import PaystackPop from '@paystack/inline-js'

// export default function CheckoutPage() {
//   const { items } = useCart()
//   const router = useRouter()

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )

//   const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

//   const handlePayment = () => {
//     const paystack = new PaystackPop()

//     paystack.newTransaction({
//       key: publicKey,
//       email: 'customer@email.com',
//       amount: subtotal * 100,
//       onSuccess: () => {
//         toast.success('Payment successful!')
//         router.push('/success')
//       },
//       onCancel: () => {
//         toast.error('Payment cancelled')
//       },
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="p-8 w-full max-w-md space-y-6">
//         <h2 className="text-2xl font-bold text-center">
//           Complete Payment
//         </h2>

//         <p className="text-center text-lg font-semibold">
//           ₦{subtotal.toLocaleString()}
//         </p>

//         <button
//           onClick={handlePayment}
//           className="w-full bg-[#008751] text-white py-3 rounded-md"
//         >
//           Pay Now
//         </button>
//       </Card>
//     </div>
//   )
// }
