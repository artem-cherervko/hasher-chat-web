'use client'

import {
	connectWebSocket,
	disconnectSocket,
	getSocket,
	onMessage
} from '@/api/chat/ws'
import { useEffect } from 'react'

export default function ChatLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	useEffect(() => {
		async function connectWS() {
			try {
				await connectWebSocket()

				// ✅ Один раз підписуємось
				onMessage(message => {
					console.log('Received message:', message)
				})
			} catch (error) {
				console.error('Error connecting to WebSocket:', error)
			}
		}

		connectWS()

		return () => {
			console.log('🔌 Unmounting socket effect')

			if (getSocket()?.connected) {
				disconnectSocket()
			}
		}
	}, [])

	return (
		<div className="flex h-full w-full flex-col items-center justify-center antialiased">
			{children}
		</div>
	)
}
