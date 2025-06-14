import { GetUserData } from '@/api/chat/getUserData'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import VerifiedBadge from '../badges/verifiedBadge'
import DeveloperBadge from '../badges/developerBadge'
import AdminBadge from '../badges/adminBadge'
import PremiumBadge from '../badges/premiumBadge'
import HelperBadge from '../badges/helperBadge'
import { getLastMessage } from '@/api/chat/getLastMessage'
import { Bell } from 'lucide-react'

export default function ChatElement(props: { uin: string; isOnline: boolean }) {
	const [data, setData] = useState<any | null>(null)
	const [lastMessage, setLastMessage] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const res = await GetUserData(props.uin)
			setData(res)
		}

		const fetchLastMessage = async () => {
			const res = await getLastMessage(props.uin)
			setLastMessage(res)
		}

		fetchData()
		fetchLastMessage()

		const interval = setInterval(() => {
			fetchLastMessage()
		}, 5000)

		return () => clearInterval(interval)
	}, [props.uin])

	return (
		<Link
			href={`/chat/${props.uin}`}
			className="flex items-center gap-4 p-2 transition-all duration-200 hover:bg-[#f248223e] hover:text-white"
			prefetch={true}
		>
			<div className="relative h-12 w-12 flex-shrink-0">
				<Image
					alt="User profile photo"
					src={`/${data?.photo_url === 'd' ? 'd.png' : `${data?.photo_url.split('/')[1]}`}`}
					width={48}
					height={48}
					className="rounded-full object-cover"
				/>
				<div
					className={clsx(
						'absolute right-0 bottom-0 h-3 w-3 rounded-full',
						props.isOnline ? 'bg-[#F24822]' : 'bg-gray-700'
					)}
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden">
				<div className="flex items-center gap-2">
					<h1 className="truncate text-xl font-bold">
						{data?.name.length > 16
							? data?.name.slice(0, 16) + '...'
							: data?.name}
					</h1>
					{data?.role === 'dev' && <DeveloperBadge />}
					{data?.role === 'admin' && <AdminBadge />}
					{data?.role === 'verified' && <VerifiedBadge />}
					{data?.role === 'helper' && <HelperBadge />}
				</div>
				<div className="flex w-full items-center justify-between">
					<p className="text-md max-w-[80%] truncate overflow-hidden text-ellipsis">
						{lastMessage?.content || 'No messages'}
					</p>
					<Bell
						size={25}
						className={clsx('inline-block opacity-50', {
							'animate-bellShake text-[#F24822] opacity-100':
								!lastMessage?.is_read
						})}
					/>
				</div>
			</div>
		</Link>
	)
}
