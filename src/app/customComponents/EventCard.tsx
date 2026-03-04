import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '@/app/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'selling-fast':
        return 'bg-orange-500';
      case 'sold-out':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  };

  const getStatusLabel = (status: Event['status']) => {
    switch (status) {
      case 'selling-fast':
        return 'Selling Fast';
      case 'sold-out':
        return 'Sold Out';
      default:
        return 'Available';
    }
  };

  return (
    <Card className={`overflow-hidden group hover:shadow-xl transition-all duration-300 ${featured ? 'border-2 border-[#008751]' : ''}`}>
      <div className="relative overflow-hidden aspect-16/10">
        {/* <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        /> */}
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${getStatusColor(event.status)} text-white`}>
            {getStatusLabel(event.status)}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-linear-to-r from-[#008751] to-[#FF6B00] text-white border-0">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex gap-2 mb-3 flex-wrap">
          {event.genre.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-[#008751] transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="size-4 text-[#008751]" />
            <span>{formattedDate} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="size-4 text-[#FF6B00]" />
            <span>{event.venue}, {event.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="size-4 text-gray-500" />
            <span>{event.capacity.toLocaleString()} capacity</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/events/${event.slug}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full group/btn border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white"
            >
              View Details
              <ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Button 
            className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90"
            disabled={event.status === 'sold-out'}
            onClick={() => {
              if (event.status !== 'sold-out') {
                toast.success('Redirecting to ticket purchase...', {
                  description: `Get your tickets for ${event.title}`
                })
              }
            }}
          >
            {event.status === 'sold-out' ? 'Sold Out' : 'Buy Tickets'}
          </Button>
        </div>

      </div>
    </Card>
  );
}