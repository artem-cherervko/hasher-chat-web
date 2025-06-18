'use client'
import SideBar from '@/components/ui/chat/side-bar'
import { SidebarProvider } from '@/lib/SidebarContext'
import { useTokensRefresh } from '@/hooks/useTokensRefresh'

export default function ChatLayout({
	children
}: {
	children: React.ReactNode
}) {
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
