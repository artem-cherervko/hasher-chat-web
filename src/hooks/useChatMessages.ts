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
import { ChatMessages, Message } from '@/types/chat'

export function useChatMessages(chatId: string) {
	const [messages, setMessages] = useState<ChatMessages[]>([])
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

				const newMessage = {
					id: data.message_id,
					content: data.message,
					created_at: data.time,
					updated_at: data.time,
					sender: data.sender,
					receiver: data.receiver,
					is_read: data.is_read,
					is_edited: data.is_edited
				}

				setMessages(prev => {
					if (prev.length === 0) {
						return [
							{
								chat_id: chatId,
								messages: [newMessage]
							}
						]
					}
					const exists = prev[0].messages.some(m => m.id === newMessage.id)
					if (exists) return prev
					return [
						{
							...prev[0],
							messages: [...prev[0].messages, newMessage]
						}
					]
				})
			})

			const initialData = await AllMessages(chatId)
			if (isMounted && initialData) setMessages(initialData)
			setIsLoading(false)
		}

		init()
		readAllMessages({ chat_with: chatId })

		const intervalId = setInterval(() => {
			// readAllMessages({ chat_with: chatId })
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
		if (data) setMessages(data)
	}

	async function handleDeleteMessage(messageId: string) {
		await DeleteMessage(messageId)
		await deleteMessage({ chat_with_uin: chatId })
		await reloadMessages()
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
		messages,
		uin,
		handleDeleteMessage,
		handleEditMessage,
		sendTyping,
		bottomRef,
		isLoading,
		isTyping
	}
}
