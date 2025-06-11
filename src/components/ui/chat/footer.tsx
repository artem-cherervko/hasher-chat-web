'use client'

import { sendMessage } from '@/api/chat/ws'
import clsx from 'clsx'
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { KeyboardEvent, useRef } from 'react'

export default function ChatFooter() {
	const params = useParams()
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const resizeTextarea = () => {
		const textarea = textareaRef.current
		if (!textarea) return

		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}

	const handleSendMessage = () => {
		const textarea = textareaRef.current
		if (!textarea || !textarea.value.trim()) return

		sendMessage({
			receiver_uin: params.id as string,
			message: textarea.value
		})

		textarea.value = ''
		textarea.style.height = 'auto'
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<footer
			className={clsx(
				'm-2 flex max-w-screen items-end rounded-lg border-2 border-[#F24822] p-2 shadow-lg shadow-[#F24822]/20 transition-all duration-300 focus-within:shadow-[#F24822]/80',
				{
					'pointer-events-none opacity-50': params.id === '0'
				}
			)}
		>
			<textarea
				ref={textareaRef}
				placeholder="Type..."
				onKeyDown={handleKeyDown}
				onInput={resizeTextarea}
				rows={1}
				className="placeholder:text-md max-h-48 min-h-[36px] w-full resize-none overflow-x-hidden overflow-y-auto p-2 break-words whitespace-pre-wrap outline-none placeholder:font-semibold"
			/>
			<button
				type="submit"
				onClick={handleSendMessage}
				className={clsx('ml-2 flex h-[36px] items-center', {
					'pointer-events-none opacity-50': params.id === '0'
				})}
			>
				<Send className="text-[#F24822]" />
			</button>
		</footer>
	)
}
