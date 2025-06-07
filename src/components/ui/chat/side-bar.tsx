'use client'

import { LogOut } from 'lucide-react'
import ChatElement from './chat-element'
import { Suspense, useEffect, useState } from 'react'
import { getChats } from '@/api/chat/getChats'
import { Logout } from '@/api/auth/logout'
import { Chat } from '@/api/chat/interfaces'
import clsx from 'clsx'
import { useSidebar } from '@/lib/SidebarContext'

export default function SideBar() {
	const { shoving, toggleShoving } = useSidebar()

	const [data, setData] = useState<Chat>({
		id: '',
		chat_user_one_id: '',
		chat_user_two_id: '',
		chat_user_one: {
			uin: '',
			name: '',
			user_name: '',
			isOnline: false,
			last_seen: ''
		},
		chat_user_two: {
			uin: '',
			name: '',
			user_name: '',
			isOnline: false,
			last_seen: ''
		}
	})

	useEffect(() => {
		async function fetchChats() {
			const res = await getChats()
			if (res) {
				setData(res)
			} else {
				window.location.reload()
			}
		}
		fetchChats()
		const interval = setInterval(() => {
			fetchChats()
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	const name = 'Chats'

	return (
		<div
			className={clsx(
				'h-screen w-[20rem] max-w-[20rem] min-w-[20rem] flex-col border-r-2 border-[#F24822] bg-[#052028] font-[family-name:var(--font-inria-serif)]',
				{
					hidden: !shoving,
					'lg:flex': shoving
				}
			)}
		>
			<div className="nav-elements flex flex-row items-center justify-between border-b-2 border-[#F24822] p-2">
				<div className="logo">
					<p
						className={'ml-1 text-4xl text-[#F24822] hover:cursor-pointer'}
						onClick={() => toggleShoving()}
					>
						h
					</p>
					<hr className="w-10 origin-right rotate-90" />
				</div>
				<h2 className="text-xl font-bold">
					{name.length > 16 ? name.substring(0, 13) + '...' : name}
				</h2>
				<LogOut
					onClick={async () => {
						await Logout()
						window.location.href = '/auth/login'
					}}
					className="h-7 w-7 text-[#F24822] transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-white"
				></LogOut>
			</div>
			<Suspense
				fallback={
					<div className="flex h-full w-full items-center justify-center text-white">
						Loading chats...
					</div>
				}
			>
				<div className="flex flex-col overflow-y-auto">
					{Array.isArray(data) &&
						[
							...new Map(
								data.map(chat => [chat.chat_user_one.uin, chat]) // ключ — uin первого пользователя
							).values()
						].map(chat => (
							<ChatElement
								key={chat.id}
								isOnline={chat.chat_user_one.isOnline}
								uin={chat.chat_user_one.uin}
							/>
						))}
				</div>
			</Suspense>
		</div>
	)
}
