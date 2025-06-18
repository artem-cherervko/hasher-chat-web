'use client'

import { useSidebar } from '@/lib/SidebarContext'
import clsx from 'clsx'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useChatHeader } from '@/hooks/useChatHeader'

export default function ChatHeader() {
	const { id } = useParams()
	const { toggleShoving, shoving } = useSidebar()
	const { userName, lastSeen } = useChatHeader(id as string)

	return (
		<header
			className={clsx(
				'flex h-full w-full flex-row items-center justify-between border-b-2 border-[#F24822] bg-[#052028] p-2 font-[family-name:var(--font-inria-serif)]',
				{
					'xl:pl-[35rem]': shoving
				}
			)}
		>
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
			<div
				className={clsx('flex flex-col items-center justify-center', {
					'self-center': !shoving
				})}
			>
				<h2 className="text-xl font-bold">{userName}</h2>
				<span>{lastSeen}</span>
			</div>
			<Image alt="D" src={'/d.png'} width={30} height={30} />
		</header>
	)
}
