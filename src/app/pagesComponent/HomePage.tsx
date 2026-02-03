'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockEvents } from '@/app/data/mockData'
import { EventCard } from '../customComponents/EventCard'

const featuredEvent = mockEvents.find(e => e.featured) || mockEvents[0]
const upcomingEvents = mockEvents.slice(0, 3)
const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Calabar', 'Enugu']

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-150 md:h-175 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredEvent.imageUrl}
            alt={featuredEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-[#FF6B00]" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Featured Event
              </span>
            </div>

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
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
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
          </div>
        </div>
      </section>

      {/* City Filter */}
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

      {/* Upcoming Events */}
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
