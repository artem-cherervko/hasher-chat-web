'use client'

import { Search, Settings } from 'lucide-react'
import ChatElement from './chat-element'
import { useEffect, useState } from 'react'
import { getChats } from '@/api/chat/getChats'
import { Chat } from '@/api/chat/interfaces'
import clsx from 'clsx'
import { useSidebar } from '@/lib/SidebarContext'
import { Skeleton } from '../skeleton'
import FindUserDialog from './FindUserDialog'

export default function SideBar() {
	const [isLoading, setIsLoading] = useState(true)
	const { shoving, toggleShoving } = useSidebar()
	const [open, setOpen] = useState(false)
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
			setIsLoading(true)
			const res = await getChats()
			if (res) {
				setData(res)
			} else {
				// window.location.reload()
			}
			setIsLoading(false)
		}
		fetchChats()

		async function updateChats() {
			const res = await getChats()
			if (res === data || res === false) {
				return
			} else {
				setIsLoading(true)
				setData(res)
				setIsLoading(false)
			}
		}
		const interval = setInterval(() => {
			updateChats()
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	const name = 'Chats'

	return (
		<div
			className={clsx(
				'relative h-screen w-[20rem] max-w-[20rem] min-w-[20rem] flex-col border-r-2 border-[#F24822] bg-[#052028] font-[family-name:var(--font-inria-serif)]',
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
				<Settings
					onClick={async () => {
						window.location.href = '/settings'
					}}
					className="h-7 w-7 text-[#F24822] transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-white"
				></Settings>
			</div>
			<div className="flex flex-col overflow-y-auto">
				{isLoading ? (
					<div className="mt-2 ml-2 flex items-center space-x-4">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[150px]" />
						</div>
					</div>
				) : data.id === '' ? (
					<div className="mt-5 flex h-full items-center justify-center">
						<p className="text-gray-400">No chats found</p>
					</div>
				) : (
					<>
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
					</>
				)}
			</div>
			<div className="bg-accent absolute right-2 bottom-2 rounded-full border-1 border-[#F24822] p-1">
				<button
					onClick={() => {
						setOpen(true)
					}}
					className="rounded-full p-2 transition-all duration-200 ease-in-out hover:bg-[#F24822]"
				>
					<Search className="h-7 w-7 text-[#F24822] hover:text-white" />
				</button>
			</div>
			<FindUserDialog open={open} setOpen={setOpen} />
		</div>
	)
}
