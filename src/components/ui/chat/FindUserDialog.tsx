'use client'

import { findUser } from '@/api/user/findUser'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type FindUserDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}

export default function FindUserDialog({ open, setOpen }: FindUserDialogProps) {
	const [userName, setUserName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Find User</DialogTitle>
				</DialogHeader>
				<DialogDescription>Find user by user name:</DialogDescription>
				<DialogHeader>
					<input
						type="text"
						placeholder="Enter user name"
						value={userName}
						onChange={e => setUserName(e.target.value)}
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isLoading}
					/>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<button
							className="rounded-lg border-1 border-[#F24822] p-2 outline-0 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={isLoading}
						>
							Cancel
						</button>
					</DialogClose>
					<button
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isLoading}
						onClick={() => {
							setIsLoading(true)
							findUser(userName)
								.then(res => {
									if (res) {
										router.push(`/chat/${res}`)
										toast.success('User found!')
										setOpen(false)
										setUserName('')
									} else {
										toast.error('User not found')
									}
								})
								.catch(err => {
									console.log(err)
									setUserName('')
									setOpen(false)
								})
								.finally(() => {
									setIsLoading(false)
								})
						}}
					>
						{isLoading ? 'Searching...' : 'Search'}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
