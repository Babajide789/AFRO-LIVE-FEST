'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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
  removeItem: (eventId: string, tierId: string) => void
  updateQuantity: (
    eventId: string,
    tierId: string,
    quantity: number
  ) => void
  clearCart: () => void
  totalQuantity: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // ==========================
  // ADD ITEMS
  // ==========================
  const addItems = (newItems: CartItem[]) => {
    setItems(prev => {
      const updated = [...prev]

      newItems.forEach(item => {
        const existing = updated.find(
          i =>
            i.eventId === item.eventId &&
            i.tierId === item.tierId
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

  // ==========================
  // REMOVE ITEM
  // ==========================
  const removeItem = (eventId: string, tierId: string) => {
    setItems(prev =>
      prev.filter(
        item =>
          !(
            item.eventId === eventId &&
            item.tierId === tierId
          )
      )
    )
  }

  // ==========================
  // UPDATE QUANTITY
  // ==========================
  const updateQuantity = (
    eventId: string,
    tierId: string,
    quantity: number
  ) => {
    if (quantity < 1) return

    setItems(prev =>
      prev.map(item =>
        item.eventId === eventId &&
        item.tierId === tierId
          ? { ...item, quantity }
          : item
      )
    )
  }

  // ==========================
  // CLEAR CART
  // ==========================
  const clearCart = () => {
    setItems([])
  }

  // ==========================
  // COMPUTED VALUES
  // ==========================
  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItems,
        removeItem,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx)
    throw new Error('useCart must be used within CartProvider')
  return ctx
}
