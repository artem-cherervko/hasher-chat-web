'use client'
import SideBar from '@/components/ui/chat/side-bar'
import { useParams } from 'next/navigation'

export default function ChatPage() {
	const params = useParams()

	return (
		<div className="grid h-screen w-full grid-cols-[20rem_1fr] items-center justify-center bg-[#051A27]">
			<SideBar></SideBar>
			<div className="chat flex h-screen w-full flex-col items-center justify-center">
				<h1 className="text-2xl font-bold text-white">Chat Page {params.id}</h1>
				<p className="text-white">This is a placeholder for the chat page.</p>
			</div>
		</div>
	)
}
