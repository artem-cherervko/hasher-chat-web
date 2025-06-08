'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useEffect, useRef, useState } from 'react'

type EditMessageDialogProps = {
	open: boolean
	initialValue: string
	onSave: (newText: string) => void
	onClose: () => void
}

export default function EditMessageDialog({
	open,
	initialValue,
	onSave,
	onClose
}: EditMessageDialogProps) {
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit message</DialogTitle>
					<DialogDescription>
						Change the message text and save.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<input
						ref={inputRef}
						value={value}
						onChange={e => setValue(e.target.value)}
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
					/>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<button className="rounded-lg border-1 border-[#F24822] p-2 outline-0">
							Cancel
						</button>
					</DialogClose>
					<button
						onClick={() => {
							if (value.trim()) {
								onSave(value.trim())
							}
						}}
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
					>
						Save changes
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
