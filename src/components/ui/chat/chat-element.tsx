import { GetUserData } from '@/api/chat/getUserData'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ChatElement(props: { uin: string; isOnline: boolean }) {
	const [data, setData] = useState<any | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = await GetUserData(props.uin)
			setData(data)
		}
		fetchData()
	}, [props.uin, setData])

	return (
		<Link
			href={`/chat/${props.uin}`}
			className="flex flex-row items-center justify-start space-x-4 p-2 transition-all duration-200 ease-in-out hover:bg-[#f248223e] hover:text-white"
		>
			<div className="flex flex-row">
				<Image
					alt="User profile photo"
					src={`/${data?.photo_url === 'd' ? 'd.png' : `${data?.photo_url.split('/')[1]}`}`}
					width={50}
					height={50}
				/>
				<div
					className={clsx('right-0 bottom-0 mt-auto h-3 w-3 rounded-2xl', {
						'bg-[#F24822]': props.isOnline === true,
						'bg-gray-700': props.isOnline === false
					})}
				/>
			</div>
			<div className="flex flex-col">
				<h1 className="text-xl font-bold">
					{data?.name.length > 16
						? data?.name.substring(0, 16) + '...'
						: data?.name}
				</h1>
				<p className="text-md">
					{(() => {
						const lastReceived = data?.received_messages?.at(-1)
						const lastSent = data?.sended_messages?.at(-1)

						// собираем во временный массив только те, что есть
						const candidates = [lastReceived, lastSent].filter(Boolean) as {
							content: string
							created_at: string
						}[]

						if (candidates.length === 0) return 'Нет сообщений'

						// сортируем по дате (новейшее первым)
						candidates.sort(
							(a, b) =>
								new Date(b.created_at).getTime() -
								new Date(a.created_at).getTime()
						)

						// берём самый первый (новейший)
						const message = candidates[0].content
						return message.length > 25
							? message.substring(0, 25) + '...'
							: message
					})()}
				</p>
			</div>
		</Link>
	)
}
