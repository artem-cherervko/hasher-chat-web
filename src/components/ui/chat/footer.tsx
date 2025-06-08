'use client'

import { sendMessage } from '@/api/chat/ws'
import clsx from 'clsx'
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { KeyboardEvent } from 'react'

export default function ChatFooter() {
	const params = useParams()

	const handleSendMessage = async () => {
		const input = document.getElementById('message') as HTMLInputElement
		if (!input.value.trim()) return

		sendMessage({
			receiver_uin: params.id as string,
			message: input.value
		})

		input.value = ''
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<footer
			className={clsx(
				'm-2 flex h-[fit-content] max-w-screen flex-row items-center justify-between rounded-lg border-2 border-[#F24822] p-2',
				{
					'pointer-events-none opacity-50': params.id === '0'
				}
			)}
		>
			<input
				type="text"
				placeholder="Type..."
				id="message"
				onKeyDown={handleKeyPress}
				className="placeholder:text-md h-full w-full overflow-y-auto p-2 break-words whitespace-pre-wrap outline-0 placeholder:font-semibold"
			/>
			<button
				type="submit"
				onClick={handleSendMessage}
				className={clsx({
					'pointer-events-none opacity-50': params.id === '0'
				})}
			>
				<Send className="text-[#F24822]" />
			</button>
		</footer>
	)
}
