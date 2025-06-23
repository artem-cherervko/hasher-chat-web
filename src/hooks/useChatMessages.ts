import { useEffect, useRef, useState } from 'react'
import { AllMessages } from '@/api/chat/getAllMessages'
import {
	connectWebSocket,
	disconnectSocket,
	editMessage,
	deleteMessage,
	sendTyping
} from '@/api/chat/ws'
import { getUIN } from '@/api/chat/getChats'
import { DeleteMessage, EditMessage } from '@/api/chat/Message'
import { readAllMessages } from '@/api/chat/readAllMessages'
import { ChatMessages, Message, ChatItem } from '@/types/chat'
import { DeleteImage } from '@/api/chat/image/deleteImage'

export function useChatMessages(chatId: string) {
	const [chatItems, setChatItems] = useState<ChatItem[]>([])
	const [uin, setUin] = useState('')
	const bottomRef = useRef<HTMLDivElement | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isTyping, setIsTyping] = useState<boolean>(false)

	useEffect(() => {
		if (chatId === '0') return
		let isMounted = true

		async function init() {
			setIsLoading(true)
			const currentUin = await getUIN()
			if (!isMounted) return
			setUin(currentUin.toString())

			connectWebSocket(data => {
				if (!isMounted) return

				if (data.type === 'delete' || data.type === 'edit' || data.message) {
					reloadMessages()
					readAllMessages({ chat_with: chatId })
					return
				} else if (data.type === 'typing') {
					setIsTyping(true)
				}
			})

			await reloadMessages()
			setIsLoading(false)
		}

		init()
		readAllMessages({ chat_with: chatId })

		const intervalId = setInterval(() => {
			reloadMessages()
		}, 3000)

		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

		return () => {
			isMounted = false
			disconnectSocket()
			clearInterval(intervalId)
		}
	}, [chatId])

	async function reloadMessages() {
		const data = await AllMessages(chatId)
		if (!data || data.length === 0) return

		const msgs = data[0].messages.map(msg => ({
			type: 'message' as const,
			...msg,
			created_at: msg.created_at
		}))

		const imgs = data[0].images.map(img => ({
			type: 'image' as const,
			...img,
			created_at: img.sent_at
		}))

		const combined = [...msgs, ...imgs].sort(
			(a, b) =>
				new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		)

		setChatItems(combined)
	}

	async function handleDeleteMessage(messageId: string) {
		await DeleteMessage(messageId)
		await deleteMessage({ chat_with_uin: chatId })
		await reloadMessages()
	}

	async function handleDeleteImage(key: string) {
		await DeleteImage(key)
		await reloadMessages()
		await deleteMessage({ chat_with_uin: chatId })
	}

	async function handleEditMessage(messageId: string, newMessage: string) {
		await EditMessage(messageId, newMessage)
		await editMessage({ chat_with_uin: chatId })
		await reloadMessages()
	}

	async function handleTyping(chat_with_uin: string) {
		await sendTyping({ chat_with_uin })
	}

	return {
		chatItems,
		uin,
		handleDeleteMessage,
		handleEditMessage,
		handleDeleteImage,
		sendTyping,
		bottomRef,
		isLoading,
		isTyping
	}
}
