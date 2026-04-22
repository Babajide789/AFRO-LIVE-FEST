'use client'

import { useState, useEffect } from 'react'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Event } from '@/app/types'

export function MapPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        // auto-select first event
        if (data.length > 0) setSelectedEvent(data[0])
      })
  }, [])

  const eventsByCity = events.reduce((acc, event) => {
    if (!acc[event.city]) acc[event.city] = []
    acc[event.city].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  const cityPins = [
    { city: 'Lagos', style: 'absolute bottom-[20%] left-[15%]' },
    { city: 'Abuja', style: 'absolute top-[40%] left-[50%]' },
    { city: 'Port Harcourt', style: 'absolute bottom-[25%] right-[20%]' },
    { city: 'Ibadan', style: 'absolute top-[50%] left-[20%]' },
    { city: 'Calabar', style: 'absolute top-[55%] right-[15%]' },
  ]

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold mb-2">Event Map</h1>
          <p className="text-sm text-gray-600">Explore events across Nigeria</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {events.map(event => (
              <Card
                key={event.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedEvent?.id === event.id ? 'ring-2 ring-[#008751]' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex gap-3">
                  {/* Fixed: use a sized wrapper for Image instead of fill */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Calendar className="size-3" />
                      <span>{format(new Date(event.date), 'MMM dd')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="size-3 text-[#FF6B00]" />
                      <span className="line-clamp-1">{event.city}</span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {event.genres.slice(0, 2).map(genre => (
                        <Badge key={genre} variant="outline" className="text-xs py-0">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-gray-400" />
              ))}
            </div>
          </div>

          {/* City Pins */}
          <div className="absolute inset-0">
            {cityPins.map(({ city, style }) => (
              <button
                key={city}
                className={`${style} group`}
                onClick={() => setSelectedEvent(events.find(e => e.city === city) || null)}
              >
                <div className="relative">
                  <MapPin className="size-10 text-[#FF6B00] fill-[#FF6B00]/20 group-hover:scale-125 transition-transform" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">{city}</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#008751] text-white text-xs font-bold size-6 rounded-full flex items-center justify-center">
                    {eventsByCity[city]?.length || 0}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Event Popup */}
          {selectedEvent && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
              <Card className="p-4 shadow-2xl">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={selectedEvent.imageUrl}
                      alt={selectedEvent.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1 line-clamp-1">{selectedEvent.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="size-4" />
                      <span>{format(new Date(selectedEvent.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="size-4 text-[#FF6B00]" />
                      <span className="line-clamp-1">{selectedEvent.venue}, {selectedEvent.city}</span>
                    </div>
                    <Link href={`/events/${selectedEvent.slug}`}>
                      <Button size="sm" className="w-full">
                        View Event <ArrowRight className="size-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-lg">
            Interactive Map (Google Maps / Mapbox Integration)
          </div>
        </div>
      </div>
    </div>
  )
}