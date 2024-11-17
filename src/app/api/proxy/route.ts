import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const url = searchParams.get('url')

        if (!url) {
            return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
        }

        const ipv4Url = url.replace('localhost', '127.0.0.1');
        const response = await fetch(ipv4Url, {
            headers: {
                'Accept': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch from target URL' },
            { status: 500 }
        )
    }
}