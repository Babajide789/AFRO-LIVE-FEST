'use client'

import { useRouter, useParams } from 'next/navigation'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Ticket,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { mockEvents } from '@/app/data/mockData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MapPlaceholder } from '@/app/customComponents/MapPlaceholder'

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  if (!slug) return null

  const event = mockEvents.find((e) => e.slug === slug)


  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Button onClick={() => router.push('/events')}>
            Back to Events
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = format(
    new Date(event.date),
    'EEEE, MMMM dd, yyyy'
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-100 md:h-125 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <div className="flex gap-2 mb-4">
              {event.genre.map((genre) => (
                <Badge
                  key={genre}
                  className="bg-white/20 backdrop-blur-sm text-white border-0"
                >
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Info icon={<Calendar />} label="Date" value={formattedDate} />
                <Info icon={<Clock />} label="Time" value={event.time} />
                <Info
                  icon={<MapPin />}
                  label="Venue"
                  value={`${event.venue}, ${event.city}`}
                />
                <Info
                  icon={<Users />}
                  label="Capacity"
                  value={`${event.capacity.toLocaleString()} people`}
                />
              </div>

              <Separator className="my-6" />

              <h3 className="font-semibold mb-3">About This Event</h3>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </Card>

            {/* Artist Lineup */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Artist Lineup</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="size-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{artist.name}</h3>
                      <p className="text-sm text-gray-600">{artist.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Map */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <MapPlaceholder location={event.location} height="h-80" />
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="1">
                  <AccordionTrigger>
                    What time should I arrive?
                  </AccordionTrigger>
                  <AccordionContent>
                    Arrive at least 1 hour early for security checks.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          {/* Sidebar */}
          <Card className="p-6 sticky top-20">
            <h3 className="text-xl font-bold mb-4">Get Tickets</h3>

            {event.ticketTiers.map((tier) => (
              <div key={tier.id} className="mb-4 border p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">{tier.name}</h4>
                  <span className="font-bold text-[#008751]">
                    ₦{tier.price.toLocaleString()}
                  </span>
                </div>

                <Button
                  className="w-full"
                  disabled={!tier.available}
                  onClick={() =>
                    tier.available &&
                    toast.success(`${tier.name} ticket added`)
                  }
                >
                  {tier.available ? 'Select Ticket' : 'Sold Out'}
                </Button>
              </div>
            ))}

            <Separator className="my-6" />

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => toast.success('Saved')}
              >
                <Heart className="size-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Link copied')
                }}
              >
                <Share2 className="size-4 mr-2" />
                Share
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
