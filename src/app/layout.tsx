import type { Metadata } from 'next'
import { Fira_Mono, Inria_Serif } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'

const firaMono = Fira_Mono({
	variable: '--font-fira-mono',
	weight: ['400', '500', '700'],
	preload: true,
	subsets: ['latin', 'cyrillic']
})

const inriaSerif = Inria_Serif({
	variable: '--font-inria-serif',
	weight: ['400', '700'],
	preload: true,
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Hasher - Chat platform',
	description: 'Security chat platform with end-to-end encryption'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${firaMono.variable} ${inriaSerif.variable} dark`}
		>
			<body className={`h-screen w-screen antialiased`}>
				<SpeedInsights />
				{children}
				<Toaster position="top-center" theme="dark" richColors />
			</body>
		</html>
	)
}
