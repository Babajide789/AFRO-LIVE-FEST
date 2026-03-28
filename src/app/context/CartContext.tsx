'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
  updateQuantity: (eventId: string, tierId: string, quantity: number) => void
  clearCart: () => void
  totalQuantity: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)
const CART_STORAGE_KEY = 'afrolive_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // ==========================
  // LOAD FROM LOCALSTORAGE
  // ==========================
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  // ==========================
  // SAVE TO LOCALSTORAGE
  // ==========================
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      console.error('Failed to persist cart')
    }
  }, [items, hydrated])

  // ==========================
  // ADD ITEMS
  // ==========================
  const addItems = (newItems: CartItem[]) => {
    setItems(prev => {
      let updated = [...prev]

      newItems.forEach(newItem => {
        const existingIndex = updated.findIndex(
          i => i.eventId === newItem.eventId && i.tierId === newItem.tierId
        )

        if (existingIndex !== -1) {
          // ✅ Same tier exists — add quantities together
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity,
          }
        } else {
          // ✅ Different tier (e.g. Regular vs VIP) — add as new line item
          updated = [...updated, newItem]
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
        item => !(item.eventId === eventId && item.tierId === tierId)
      )
    )
  }

  // ==========================
  // UPDATE QUANTITY
  // ==========================
  const updateQuantity = (eventId: string, tierId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(eventId, tierId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.eventId === eventId && item.tierId === tierId
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
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch {}
  }

  // ==========================
  // COMPUTED VALUES
  // ==========================
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Prevent SSR mismatch — render nothing until hydrated
  if (!hydrated) return null

  return (
    <CartContext.Provider
      value={{ items, addItems, removeItem, updateQuantity, clearCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}