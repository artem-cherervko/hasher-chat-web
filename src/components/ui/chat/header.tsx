'use client'

import { useSidebar } from '@/lib/SidebarContext'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getChatUserName } from '@/api/chat/getChatUserName'
import { useParams } from 'next/navigation'

export default function ChatHeader() {
	const { id } = useParams()
	const uin = id as string
	const [userName, setUserName] = useState<string | null>(null)

	useEffect(() => {
		const fetchUserName = async () => {
			const resp = await getChatUserName(uin)
			if (resp.ok) {
				const data = await resp.text()
				setUserName(data)
			} else {
				setUserName('Unknown')
			}
		}
		fetchUserName()
	}, [uin])

	const { toggleShoving, shoving } = useSidebar()

	return (
		<header className="flex h-full w-full flex-row items-center justify-between border-b-2 border-[#F24822] bg-[#052028] p-2 font-[family-name:var(--font-inria-serif)]">
			<div className={clsx('logo', { hidden: shoving })}>
				<p
					className={
						'ml-1 font-[family-name:var(--font-inria-serif)] text-4xl text-[#F24822] hover:cursor-pointer'
					}
					onClick={() => toggleShoving()}
				>
					h
				</p>
				<hr className="w-10 origin-right rotate-90" />
			</div>
			<h2 className="text-xl font-bold">{userName}</h2>
			<Image alt="User profile photo" src={'/d.png'} width={30} height={30} />
		</header>
	)
}
