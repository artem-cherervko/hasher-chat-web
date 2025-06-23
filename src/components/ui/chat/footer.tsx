'use client'

import { getUIN } from '@/api/chat/getChats'
import { sendImage } from '@/api/chat/image/sendImage'
import { sendMessage } from '@/api/chat/ws'
import clsx from 'clsx'
import { Image, ImageIcon, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { KeyboardEvent, useRef } from 'react'

export default function ChatFooter() {
	const params = useParams()
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

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

	const isMobileOrTablet = () => {
		const ua = navigator.userAgent
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			ua
		)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (isMobileOrTablet()) return

		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const handleImageClick = () => fileInputRef.current?.click()

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		try {
			await sendImage(file, await getUIN(), params.id as string)
		} catch (err) {
			console.error(err)
		} finally {
			e.target.value = ''
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
			<input
				type="file"
				accept="image/*"
				name="send_image"
				id="send_image"
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>

			<ImageIcon
				className="mb-1.5 cursor-pointer self-auto text-[#F24822]"
				onClick={handleImageClick}
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
