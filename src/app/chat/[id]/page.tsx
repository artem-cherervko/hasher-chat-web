'use client'
import { AllMessages } from '@/api/chat/getAllMessages'
import {
	connectWebSocket,
	disconnectSocket,
	editMessage,
	deleteMessage
} from '@/api/chat/ws'
import { getUIN } from '@/api/chat/getChats'
import ChatFooter from '@/components/ui/chat/footer'
import ChatHeader from '@/components/ui/chat/header'
import Message from '@/components/ui/chat/message'
import SideBar from '@/components/ui/chat/side-bar'
import { useSidebar } from '@/lib/SidebarContext'
import { ChatMessages } from '@/types/chat'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DeleteMessage, EditMessage } from '@/api/chat/Message'
import { readAllMessages } from '@/api/chat/readAllMessages'

export default function ChatPage() {
	const [messages, setMessages] = useState<ChatMessages[]>([])
	const [uin, setUin] = useState<string>('')
	const bottomRef = useRef<HTMLDivElement | null>(null)
	const params = useParams()
	const { shoving } = useSidebar()

	async function reloadMessages() {
		const data = await AllMessages(String(params['id']))
		if (data) {
			setMessages(data)
			setTimeout(() => {
				bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 0)
		}
	}

	async function handleDeleteMessage(messageId: string) {
		try {
			await DeleteMessage(messageId)
			await deleteMessage({ chat_with_uin: String(params.id) })
			await reloadMessages()
		} catch (err) {
			console.error(err)
		}
	}

	async function handleEditMessage(messageId: string, newMessage: string) {
		try {
			await EditMessage(messageId, newMessage)
			await editMessage({ chat_with_uin: String(params.id) })
			await reloadMessages()
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		let isMounted = true

		async function initAndListen() {
			const currentUin = await getUIN()
			if (!isMounted) return
			setUin(String(currentUin))

			connectWebSocket(async data => {
				console.log(data)
				if (!isMounted) return

				if (data.type === 'delete' || data.type === 'edit') {
					reloadMessages()
					return
				}

				setMessages(prev => {
					return prev.map(chat => {
						const fixedData = {
							id: data.message_id,
							content: data.message,
							created_at: data.time,
							updated_at: data.time,
							sender: data.sender,
							receiver: data.receiver,
							is_read: data.is_read,
							is_edited: data.is_edited
						}

						const isAlreadyAdded = chat.messages.some(
							m => m.id === fixedData.id
						)
						if (isAlreadyAdded) return chat

						return {
							...chat,
							messages: [...chat.messages, fixedData]
						}
					})
				})
				setTimeout(() => {
					reloadMessages()
					bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
				}, 5)
			})

			const data = await AllMessages(String(params['id']))
			if (data && isMounted) {
				setMessages(data)
				setTimeout(() => {
					bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
				}, 5)
			}
		}

		initAndListen()

		readAllMessages({ chat_with: String(params['id']) })

		const intervalId = setInterval(() => {
			readAllMessages({ chat_with: String(params['id']) })
			reloadMessages()
		}, 3000)

		setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 0)

		return () => {
			isMounted = false
			disconnectSocket()
			clearInterval(intervalId)
		}
	}, [params])

	return (
		<div
			className={clsx(
				'grid h-screen w-full items-center justify-center bg-[#051A27]',
				{
					'grid-cols-1': !shoving,
					'md:grid-cols-1 lg:grid-cols-[20rem_1fr]': shoving
				}
			)}
		>
			<SideBar />
			<div
				className={clsx(
					'chat flex h-screen w-full flex-col font-[family-name:var(--font-fira-mono)]'
				)}
			>
				<div className="mt-auto h-[3.6875rem]">
					<ChatHeader />
				</div>
				<div className="messages flex-1 space-y-3 overflow-y-auto p-2">
					{messages.length > 0 && messages[0]?.messages?.length > 0 ? (
						[...messages[0].messages]
							.sort(
								(a, b) =>
									new Date(a.created_at).getTime() -
									new Date(b.created_at).getTime()
							)
							.map(message => (
								<Message
									key={message.id}
									text={message.content}
									time={message.created_at}
									from={message.sender === uin ? 'me' : 'other'}
									read={message.is_read}
									edited={message.is_edited}
									onDelete={() => handleDeleteMessage(message.id)}
									onEdit={() => {
										const newText = prompt(
											'Введите новое сообщение',
											message.content
										)
										if (newText && newText.trim() !== '') {
											handleEditMessage(message.id, newText.trim())
										}
									}}
								/>
							))
					) : params.id === '0' ? (
						<>
							<Message
								text="Hey! How was your summer vacation?"
								time="27.05.25 21:30:00"
								from="other"
							/>
							<Message
								text="It was amazing! I went to several places!"
								time="27.05.25 21:30:15"
								from="me"
							/>
							<Message
								text="I started with two weeks at the beach in California"
								time="27.05.25 21:30:30"
								from="me"
							/>
							<Message
								text="Oh wow! Which beaches did you visit?"
								time="27.05.25 21:30:45"
								from="other"
							/>
							<Message
								text="Santa Monica and Venice Beach mostly"
								time="27.05.25 21:31:00"
								from="me"
							/>
							<Message
								text="I tried surfing for the first time!"
								time="27.05.25 21:31:15"
								from="me"
							/>
							<Message
								text="That's awesome! How did it go?"
								time="27.05.25 21:31:30"
								from="other"
							/>
							<Message
								text="Well, I spent more time falling than standing 😅"
								time="27.05.25 21:31:45"
								from="me"
							/>
							<Message
								text="That's normal for beginners! Did you get any injuries?"
								time="27.05.25 21:32:00"
								from="other"
							/>
							<Message
								text="Just a few bruises, nothing serious"
								time="27.05.25 21:32:15"
								from="me"
							/>
							<Message
								text="What else did you do there?"
								time="27.05.25 21:32:30"
								from="other"
							/>
							<Message
								text="Lots of beach volleyball!"
								time="27.05.25 21:32:45"
								from="me"
							/>
							<Message
								text="The sunsets were absolutely incredible"
								time="27.05.25 21:33:00"
								from="me"
							/>
							<Message
								text="Did you take any photos?"
								time="27.05.25 21:33:15"
								from="other"
							/>
							<Message
								text="Tons! Want to see some?"
								time="27.05.25 21:33:30"
								from="me"
							/>
							<Message
								text="Yes, please share!"
								time="27.05.25 21:33:45"
								from="other"
							/>
							<Message
								text="After California, I went to Yellowstone"
								time="27.05.25 21:34:00"
								from="me"
							/>
							<Message
								text="That must have been quite different!"
								time="27.05.25 21:34:15"
								from="other"
							/>
							<Message
								text="Completely! Saw so many geysers"
								time="27.05.25 21:34:30"
								from="me"
							/>
							<Message
								text="Did you see Old Faithful?"
								time="27.05.25 21:34:45"
								from="other"
							/>
							<Message
								text="Yes! It erupted right on schedule"
								time="27.05.25 21:35:00"
								from="me"
							/>
							<Message
								text="Also saw lots of wildlife"
								time="27.05.25 21:35:15"
								from="me"
							/>
							<Message
								text="Like what?"
								time="27.05.25 21:35:30"
								from="other"
							/>
							<Message
								text="Bears, elk, and buffalo!"
								time="27.05.25 21:35:45"
								from="me"
							/>
							<Message
								text="Weren't you scared of the bears?"
								time="27.05.25 21:36:00"
								from="other"
							/>
							<Message
								text="We kept our distance! Safety first!"
								time="27.05.25 21:36:15"
								from="me"
								edited={true}
								read={true}
							/>
						</>
					) : (
						<div className="flex h-full w-full items-center justify-center">
							<p className="text-white">No messages yet</p>
						</div>
					)}

					<div ref={bottomRef} className="h-1" />
				</div>
				<div className="mt-auto">
					<ChatFooter />
				</div>
			</div>
		</div>
	)
}
