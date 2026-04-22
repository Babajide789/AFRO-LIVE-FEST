import { notFound } from 'next/navigation'
import { getEventBySlug } from '@/lib/api'
import { EventDetailClient } from '@/app/pagesComponent/EventDetailClient'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>   // ← Promise, not plain object
}) {
  const { slug } = await params        // ← await it first

  const event = await getEventBySlug(slug).catch(() => null)

  if (!event) notFound()

  return <EventDetailClient event={event} />
}