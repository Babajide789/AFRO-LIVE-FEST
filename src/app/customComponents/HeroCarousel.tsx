'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Event } from '@/app/types'

export function HeroCarousel({ featuredEvents }: { featuredEvents: Event[] }) {
  const [index, setIndex] = useState(0)

  const featuredEvent = featuredEvents[index]

  const nextEvent = useCallback(() => {
    setIndex(prev => (prev + 1) % featuredEvents.length)
    }, [featuredEvents.length])

    const prevEvent = useCallback(() => {
    setIndex(prev => (prev === 0 ? featuredEvents.length - 1 : prev - 1))
    }, [featuredEvents.length])

  useEffect(() => {
  const interval = setInterval(() => {
    nextEvent()
  }, 7000)

  return () => clearInterval(interval)
}, [nextEvent])

  useEffect(() => {
  const nextIndex = (index + 1) % featuredEvents.length

  if (featuredEvents[nextIndex]) {
    const img = new window.Image()
    img.src = featuredEvents[nextIndex].imageUrl
  }
}, [index, featuredEvents])

  if (!featuredEvent) return null

  return (
    <motion.section
      className="relative h-150 md:h-175 overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -120) nextEvent()
        if (info.offset.x > 120) prevEvent()
      }}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredEvent.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={featuredEvent.imageUrl}
              alt={featuredEvent.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-[#FF6B00]" />
            <span className="text-sm font-medium uppercase tracking-wider">Featured Event</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={featuredEvent.id + 'content'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {featuredEvent.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-xl">
                {featuredEvent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-[#FF6B00]" />
                  <span>
                    {new Date(featuredEvent.date).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#008751]" />
                  <span>{featuredEvent.venue}, {featuredEvent.city}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href={`/events/${featuredEvent.slug}`}>
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-black">
                    Learn More <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90">
                  Get Tickets
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button onClick={prevEvent} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full hover:bg-black/60 transition">
        <ChevronLeft className="text-white" />
      </button>
      <button onClick={nextEvent} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full hover:bg-black/60 transition">
        <ChevronRight className="text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {featuredEvents.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </motion.section>
  )
}