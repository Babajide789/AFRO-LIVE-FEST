'use client'

import { createContext, useContext, useState } from 'react'

export type CartItem = {
  eventId: string
  tierId: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItems: (items: CartItem[]) => void
  totalQuantity: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItems = (newItems: CartItem[]) => {
    setItems(prev => {
      const updated = [...prev]

      newItems.forEach(item => {
        const existing = updated.find(
          i => i.eventId === item.eventId && i.tierId === item.tierId
        )

        if (existing) {
          existing.quantity += item.quantity
        } else {
          updated.push(item)
        }
      })

      return updated
    })
  }

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <CartContext.Provider value={{ items, addItems, totalQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
