import { GetUserData } from '@/api/chat/getUserData'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ChatElement(props: { uin: string }) {
	const [data, setData] = useState<ChatUser | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = await GetUserData(props.uin)
			setData(await data)
		}
		fetchData()
	}, [props.uin, setData])

	return (
		<Link
			href={`/chat/${props.uin}`}
			className="flex flex-row items-center justify-start space-x-4 p-2 hover:bg-[#f248223e]"
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
						'bg-[#F24822]': true,
						'bg-gray-700': false
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
					{data?.received_messages[0].content.length > 28
						? data?.received_messages[0].content.substring(0, 28) + '...'
						: data?.received_messages[0].content}
				</p>
			</div>
		</Link>
	)
}
