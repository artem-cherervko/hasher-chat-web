'use client'

import { addUser } from '@/api/auth/register'
import clsx from 'clsx'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RegisterPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	return (
		<div className="drop-shadow-accent flex flex-col items-center justify-center rounded-lg border-1 border-b-cyan-950 bg-[#051A27] p-4 drop-shadow-xl">
			<h1 className="flex items-center justify-center text-2xl font-bold">
				Register
			</h1>
			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={async e => {
					e.preventDefault()
					setIsLoading(true)
					const formData = new FormData(e.currentTarget)
					const name = formData.get('name') as string
					const email = formData.get('email') as string
					const user_name = formData.get('user_name') as string
					const password = formData.get('password') as string

					const resp = await addUser(email, name, user_name, password)
					if (resp) {
						toast.success('User registered successfully. Please login.')
						router.replace('/auth/login')
					} else {
						toast.error('Failed to register user. Please try again.')
					}
					setIsLoading(false)
				}}
			>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name..."
						className={clsx(
							'rounded-lg border-1 border-[#F24822] p-2 outline-0',
							{
								'pointer-events-none opacity-50': isLoading
							}
						)}
						required
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@gmail.com"
						className={clsx(
							'rounded-lg border-1 border-[#F24822] p-2 outline-0',
							{
								'pointer-events-none opacity-50': isLoading
							}
						)}
						required
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="user_name">User name:</label>
					<input
						type="text"
						id="user_name"
						name="user_name"
						placeholder="User name..."
						className={clsx(
							'rounded-lg border-1 border-[#F24822] p-2 outline-0',
							{
								'pointer-events-none opacity-50': isLoading
							}
						)}
						required
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password..."
						className={clsx(
							'rounded-lg border-1 border-[#F24822] p-2 outline-0',
							{
								'pointer-events-none opacity-50': isLoading
							}
						)}
						required
					/>
				</div>
				<button
					type="submit"
					className="flex h-9 w-30 items-center justify-center rounded-lg !border !border-[#F24822] !text-white outline-0"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="ml-2 animate-spin" size={16} />
					) : (
						<>
							Register
							<ArrowRight className="ml-2" size={16} />
						</>
					)}
				</button>
			</form>
			<Link
				href="/auth/login"
				className="text-sm text-gray-400 hover:text-gray-300"
			>
				Login
			</Link>
		</div>
	)
}
