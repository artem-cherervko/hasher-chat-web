import { SidebarProvider } from '@/lib/SidebarContext'

export default function ChatLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center antialiased">
			<SidebarProvider>{children}</SidebarProvider>
		</div>
	)
}
