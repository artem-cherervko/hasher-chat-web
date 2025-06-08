import SideBar from '@/components/ui/chat/side-bar'
import { SidebarProvider } from '@/lib/SidebarContext'

export default function ChatLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<div className="flex">
				<SideBar />
				<div className="flex-1">{children}</div>
			</div>
		</SidebarProvider>
	)
}
