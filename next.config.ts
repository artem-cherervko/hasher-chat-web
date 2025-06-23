import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	crossOrigin: 'use-credentials',
	images: {
		remotePatterns: [new URL('https://cdn.hasher-chat.space/**')]
	}
}

export default nextConfig
