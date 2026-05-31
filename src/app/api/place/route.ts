import { NextResponse } from 'next/server'
import { searchPlace } from '@/lib/google-places'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const q = url.searchParams.get('q')
    if (!q) return NextResponse.json({ error: 'Missing query parameter q' }, { status: 400 })

    // return NextResponse.json({demo: 'This endpoint is under development. Search functionality will be implemented soon.'})    

    const place = await searchPlace(q)
    if (!place) return NextResponse.json({ error: 'Place not found' }, { status: 404 })

    return NextResponse.json(place)
  } catch (err: any) {
    console.error('API /api/place error', err)
    const message = err?.message || 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
