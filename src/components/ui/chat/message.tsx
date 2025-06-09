'use client'

import clsx from 'clsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function Message(props: {
	text: string
	time: string
	from: 'me' | 'other'
	onEdit?: () => void
	onDelete?: () => void
	read?: boolean
	edited?: boolean
}) {
	const { id } = useParams()
	return (
		<div
			className={clsx('flex w-full', { 'justify-end': props.from === 'me' })}
		>
			<div
				className={'relative inline-block h-fit md:max-w-[80%] lg:max-w-[60%]'}
			>
				<div
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
					<div className="flex items-center">
						<p
							className={clsx('text-xs', {
								'text-orange-500': props.read,
								'text-muted-foreground': !props.read,
								'!text-muted-foreground': props.from === 'other'
							})}
						>
							t: {props.time.split(' ')[1]}{' '}
						</p>
						<span
							className={clsx('text-muted-foreground text-xs', {
								hidden: !props.edited
							})}
						>
							<Pencil className="ml-2 h-3 w-3" />
						</span>
					</div>
				</div>

				{/* Dropdown Menu */}
				<div
					className={clsx('absolute top-1 right-1', {
						hidden: props.from === 'other' || id === '0'
					})}
				>
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
