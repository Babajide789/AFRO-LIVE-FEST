'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { mockEvents } from '@/app/data/mockData'
import { EventCard } from '../customComponents/EventCard'

const featuredEvents = mockEvents.filter(e => e.featured)
const upcomingEvents = mockEvents.slice(0, 3)

const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Calabar', 'Enugu']

export function HomePage() {
  const [index, setIndex] = useState(0)

  const featuredEvent = featuredEvents[index]

  const nextEvent = () => {
    setIndex(prev => (prev + 1) % featuredEvents.length)
  }

  const prevEvent = () => {
    setIndex(prev => (prev === 0 ? featuredEvents.length - 1 : prev - 1))
  }

  /* Auto rotation of the Images */
  useEffect(() => {
    const interval = setInterval(() => {
      nextEvent()
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  /* To Preload next Image */
  useEffect(() => {
    const nextIndex = (index + 1) % featuredEvents.length
    const img = new window.Image()
    img.src = featuredEvents[nextIndex].imageUrl
  }, [index])

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}

      <motion.section
        className="relative h-150 md:h-175 overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -120) nextEvent()
          if (info.offset.x > 120) prevEvent()
        }}
      >
        {/* Background Image */}
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

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-[#FF6B00]" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Featured Event
              </span>
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
                      {new Date(featuredEvent.date).toLocaleDateString(
                        'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-[#008751]" />
                    <span>
                      {featuredEvent.venue}, {featuredEvent.city}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href={`/events/${featuredEvent.slug}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Learn More
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </Link>

                  <Button
                    size="lg"
                    className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90"
                  >
                    Get Tickets
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows R-L */}

        <button
          onClick={prevEvent}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full hover:bg-black/60 transition"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={nextEvent}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full hover:bg-black/60 transition"
        >
          <ChevronRight className="text-white" />
        </button>

        {/* Navigation Dots */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {featuredEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </motion.section>

      {/* CITY FILTER */}

      <section className="bg-linear-to-br from-[#008751] to-[#006b40] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Explore Events by City
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map(city => (
              <Link
                key={city}
                href={`/events?city=${city}`}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg p-4 text-center transition-all duration-300 group"
              >
                <MapPin className="size-6 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-gray-600">
                Don&apos;t miss out on these amazing concerts and festivals
              </p>
            </div>

            <Link href="/events" className="hidden md:block">
              <Button variant="outline">
                View All Events
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events">
              <Button variant="outline" className="w-full">
                View All Events
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}