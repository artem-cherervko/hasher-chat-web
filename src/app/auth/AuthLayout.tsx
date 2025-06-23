'use client'

import type { Metadata } from 'next'
import './.././globals.css'
import { Toaster } from 'sonner'
import { useEffect } from 'react'

export const metadata: Metadata = {
	title: 'Auth - Hasher',
	description: 'Auth panel for Next.js app'
}

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	useEffect(() => {
		const maintenance = process.env.NEXT_PUBLIC_ON_MAINTENANCE
		if (maintenance === undefined || maintenance === 'true') {
			window.location.href = '/maintenance/'
		}
	})
	return (
		<div
			className={`flex h-full w-full flex-col items-center justify-center antialiased`}
		>
			{children}
		</div>
	)
}
