import type { Metadata } from 'next'
import './.././globals.css'

export const metadata: Metadata = {
	title: 'Auth - Hasher',
	description: 'Auth panel for Next.js app'
}

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div
			className={`flex h-full w-full flex-col items-center justify-center antialiased`}
		>
			{children}
		</div>
	)
}
