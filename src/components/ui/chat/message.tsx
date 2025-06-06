'use client'

import clsx from 'clsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Pencil, Trash } from 'lucide-react'

export default function Message(props: {
	text: string
	time: string
	from: 'me' | 'other'
	onEdit?: () => void
	onDelete?: () => void
}) {
	return (
		<div
			className={clsx('flex w-full', { 'justify-end': props.from === 'me' })}
		>
			<div
				className={'relative inline-block h-fit md:max-w-[80%] lg:max-w-[60%]'}
			>
				<div
					onTouchStart={e => {
						const timer = setTimeout(() => {
							console.log('Message long pressed:', props.text)
						}, 2000)

						const cleanup = () => {
							clearTimeout(timer)
							document.removeEventListener('touchend', cleanup)
						}

						document.addEventListener('touchend', cleanup)
					}}
					className={clsx(
						'rounded-lg border-2 p-2 pr-8 drop-shadow-sm drop-shadow-gray-800 transition-opacity active:opacity-90',
						{
							'ml-auto border-[#03171d] bg-[#0D313D]': props.from === 'me',
							'border-[#062a35] bg-[#05252f]': props.from === 'other'
						}
					)}
				>
					<p
						className={
							'overflow-wrap break-word font-semibold break-words whitespace-pre-wrap md:text-sm md:font-medium lg:text-lg'
						}
					>
						{props.text}
					</p>
					<p className="text-muted-foreground text-xs">
						t: {props.time.split(' ')[1]}
					</p>
				</div>

				{/* Dropdown Menu */}
				<div className="absolute top-1 right-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="text-muted-foreground hover:text-white">
								<MoreVertical size={16} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-32 bg-[#052028] text-white"
						>
							<DropdownMenuItem
								onClick={props.onEdit}
								className={clsx('', { hidden: props.from === 'other' })}
							>
								<Pencil className="mr-2 h-4 w-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={props.onDelete}
								className="text-red-500 focus:text-red-500"
							>
								<Trash className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}
