import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EventCard } from '../customComponents/EventCard'
import { getEvents } from '@/lib/api'
import { HeroCarousel } from '../customComponents/HeroCarousel'

const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Calabar', 'Enugu']

export async function HomePage() {
  const allEvents = await getEvents()
  const featuredEvents = allEvents.filter(e => e.featured)
  const upcomingEvents = allEvents.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* HERO — needs client interactivity, so isolated in its own component */}
      <HeroCarousel featuredEvents={featuredEvents} />

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