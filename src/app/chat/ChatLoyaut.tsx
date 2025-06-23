'use client'
import SideBar from '@/components/ui/chat/side-bar'
import { SidebarProvider } from '@/lib/SidebarContext'
import { useTokensRefresh } from '@/hooks/useTokensRefresh'
import { useEffect } from 'react'

export default function ChatLayout({
	children
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		const maintenance = process.env.NEXT_PUBLIC_ON_MAINTENANCE
		if (maintenance === undefined || maintenance === 'true') {
			window.location.href = '/maintenance/'
		}
	})
	useTokensRefresh()
	return (
		<SidebarProvider>
			<div className="flex">
				<SideBar />
				<div className="flex-1">{children}</div>
			</div>
		</SidebarProvider>
	)
}
