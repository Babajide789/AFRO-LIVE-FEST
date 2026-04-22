'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { EventCard } from '../customComponents/EventCard'
import { FilterBar } from '../customComponents/FilterBar'
import { EmptyState } from '../customComponents/EmptyState'
import { Event } from '@/app/types'

export function EventsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '')
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') ?? 'all')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') ?? 'all')

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .finally(() => setLoading(false))
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCity = selectedCity === 'all' || event.city === selectedCity
      const matchesGenre = selectedGenre === 'all' || event.genres.includes(selectedGenre)
      return matchesSearch && matchesCity && matchesGenre
    })
  }, [events, searchQuery, selectedCity, selectedGenre])

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') params.set(key, value)
    else params.delete(key)
    router.push(`/events?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedCity('all')
    setSelectedGenre('all')
    router.push('/events')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Events</h1>
          <p className="text-gray-600">Discover concerts and festivals happening across Nigeria</p>
        </div>

        <div className="mb-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={value => { setSearchQuery(value); updateSearchParams('search', value) }}
            selectedCity={selectedCity}
            onCityChange={value => { setSelectedCity(value); updateSearchParams('city', value) }}
            selectedGenre={selectedGenre}
            onGenreChange={value => { setSelectedGenre(value); updateSearchParams('genre', value) }}
            onReset={handleReset}
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {loading
              ? 'Loading events...'
              : <>Showing <span className="font-semibold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}</>
            }
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} featured={event.featured} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={handleReset} />
        )}
      </div>
    </div>
  )
}