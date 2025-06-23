'use client'

import { IImage } from '@/types/chat'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash } from 'lucide-react'

export default function ImageElement(
	props: IImage & { uin: string; onDelete?: () => void }
) {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const from = props.sender === props.uin ? 'me' : 'other'

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpened(false)
		}
		if (isOpened) {
			window.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpened])

	return (
		<div
			className={clsx('flex w-full', {
				'justify-end': from === 'me',
				'justify-start': from === 'other'
			})}
		>
			<div
				className={clsx(
					'relative h-fit w-fit rounded-lg border border-cyan-950 bg-[#052028] p-2',
					{
						'ml-auto': from === 'me'
					}
				)}
			>
				{from === 'me' && (
					<div className="absolute top-2 right-1 z-10">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="rounded-md bg-[#0d313d] p-1 !text-white hover:bg-[#16414f]">
									<MoreVertical size={18} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-32 bg-[#052028] text-white"
							>
								<DropdownMenuItem
									onClick={props.onDelete}
									className="flex items-center text-red-500 focus:text-red-500"
								>
									<Trash className="mr-2 h-4 w-4" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}

				<Image
					src={props.image_url}
					alt="Image"
					width={400}
					height={350}
					onClick={() => setIsOpened(true)}
					loading="lazy"
					className="h-auto w-[300px] cursor-pointer rounded-md object-cover transition hover:opacity-80 sm:w-[200px] md:w-[300px] lg:w-[400px]"
				/>

				{props.text && (
					<p className="mt-1 font-semibold text-white md:text-sm">
						{props.text}
					</p>
				)}
			</div>

			{isOpened && (
				<div
					className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/80"
					onClick={() => setIsOpened(false)}
				>
					<Image
						src={props.image_url}
						alt="Full Image"
						width={1280}
						height={720}
						className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
					/>
				</div>
			)}
		</div>
	)
}
