'use client'

import ChatFooter from '@/components/ui/chat/footer'
import ChatHeader from '@/components/ui/chat/header'
import Message from '@/components/ui/chat/message'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useChatMessages } from '@/hooks/useChatMessages'
import ExampleMessages from '@/components/ui/chat/exampleMessages'
import { useState } from 'react'
import EditMessageDialog from '@/components/ui/chat/EditMessageDialog'

export default function ChatPage() {
	const params = useParams()
	const chatId = String(params.id)
	const {
		messages,
		uin,
		handleDeleteMessage,
		handleEditMessage,
		bottomRef,
		isLoading
	} = useChatMessages(chatId)

	const [editingMessage, setEditingMessage] = useState<null | {
		id: string
		content: string
	}>(null)

	const openEditDialog = (id: string, content: string) => {
		setEditingMessage({ id, content })
	}

	const closeEditDialog = () => {
		setEditingMessage(null)
	}

	const confirmEdit = (newText: string) => {
		if (editingMessage) {
			handleEditMessage(editingMessage.id, newText)
			closeEditDialog()
		}
	}

	return (
		<div
			className={clsx(
				'grid h-screen w-full grid-cols-1 items-center justify-center bg-[#051A27]'
			)}
		>
			<div
				className={clsx(
					'chat flex h-screen w-full flex-col font-[family-name:var(--font-fira-mono)]'
				)}
			>
				<div className="mt-auto h-[3.6875rem]">
					<ChatHeader />
				</div>
				<div className="messages flex-1 space-y-3 overflow-y-auto p-2">
					{isLoading && params.id !== '0' ? (
						<div className="flex h-full w-full items-center justify-center">
							<p className="text-white">Loading...</p>
						</div>
					) : messages.length > 0 && messages[0]?.messages?.length > 0 ? (
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
									onEdit={() => openEditDialog(message.id, message.content)}
								/>
							))
					) : params.id === '0' ? (
						<ExampleMessages />
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

			<EditMessageDialog
				open={!!editingMessage}
				initialValue={editingMessage?.content || ''}
				onSave={confirmEdit}
				onClose={closeEditDialog}
			/>
		</div>
	)
}
