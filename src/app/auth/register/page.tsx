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
	const [userName, setUserName] = useState('')

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		const cleaned = raw.replace(/[^a-zA-Z0-9._]/g, '')

		// Убираем . или _ в начале и в конце
		const trimmed = cleaned.replace(/^[_\.]+|[_\.]+$/g, '')

		setUserName(trimmed)
	}

	return (
		<div className="drop-shadow-accent flex flex-col items-center justify-center rounded-lg border border-[#0A2B44] bg-[#051A27] p-4 text-white drop-shadow-xl">
			<h1 className="mb-4 text-2xl font-bold text-[#F24822]">Register</h1>

			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={async e => {
					e.preventDefault()
					setIsLoading(true)
					const formData = new FormData(e.currentTarget)

					const name = formData.get('name') as string
					const email = formData.get('email') as string
					const password = formData.get('password') as string

					const resp = await addUser(email, name, userName, password)

					if (resp) {
						toast.success('User registered successfully. Please login.')
						router.replace('/auth/login')
					} else {
						toast.error('Failed to register user. Please try again.')
					}
					setIsLoading(false)
				}}
			>
				<div className="flex flex-col items-center">
					<label htmlFor="name" className="mb-1 text-sm text-gray-300">
						Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name..."
						className={clsx(
							'rounded-lg border border-[#F24822] bg-[#0A2B44] p-2 text-white outline-none',
							{ 'pointer-events-none opacity-50': isLoading }
						)}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label htmlFor="email" className="mb-1 text-sm text-gray-300">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@gmail.com"
						className={clsx(
							'rounded-lg border border-[#F24822] bg-[#0A2B44] p-2 text-white outline-none',
							{ 'pointer-events-none opacity-50': isLoading }
						)}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label htmlFor="user_name" className="mb-1 text-sm text-gray-300">
						User name:
					</label>
					<input
						type="text"
						id="user_name"
						name="user_name"
						value={userName}
						onChange={handleUserNameChange}
						placeholder="User name..."
						className={clsx(
							'rounded-lg border border-[#F24822] bg-[#0A2B44] p-2 text-white outline-none',
							{ 'pointer-events-none opacity-50': isLoading }
						)}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label htmlFor="password" className="mb-1 text-sm text-gray-300">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password..."
						className={clsx(
							'rounded-lg border border-[#F24822] bg-[#0A2B44] p-2 text-white outline-none',
							{ 'pointer-events-none opacity-50': isLoading }
						)}
						required
					/>
				</div>

				<button
					type="submit"
					className="flex h-9 w-32 items-center justify-center rounded-lg !border !border-[#F24822] !text-white !transition hover:bg-[#F24822]/10 disabled:opacity-50"
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="animate-spin" size={16} />
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
				className="mt-2 text-sm text-gray-400 hover:text-gray-300"
			>
				Already have an account? Login
			</Link>
		</div>
	)
}
