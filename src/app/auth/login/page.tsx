'use client'

import { login } from '@/api/auth/login'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { findUserByUIN } from '@/api/user/findUser'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const token = Cookies.get('u')
		if (token) {
			router.replace('/chat/0', { scroll: false })
		}
	}, [])

	return (
		<div className="drop-shadow-accent flex flex-col items-center justify-center rounded-lg border-1 border-b-cyan-950 bg-[#051A27] p-4 drop-shadow-xl">
			<h1 className="flex items-center justify-center text-2xl font-bold">
				Login
			</h1>
			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={async e => {
					e.preventDefault()
					const uin = e.currentTarget.uin.value
					const password = e.currentTarget.password.value
					try {
						setIsLoading(true)
						const res = await findUserByUIN(uin)
						if (res !== null) {
							localStorage.setItem('uin', uin)
							localStorage.setItem('password', password)
							router.replace('/auth/code')
						} else {
							toast.error('User not found, please check UIN')
							setIsLoading(false)
						}
					} catch (error) {
						toast.error('Login failed: ' + (error as Error).message)
					} finally {
						setIsLoading(false)
					}
				}}
			>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="uin" className="mb-2 text-lg">
						UIN:
					</label>
					<input
						type="text"
						id="uin"
						name="uin"
						placeholder="UIN-SAMKFK3123"
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
					<label htmlFor="password" className="mb-2 text-lg">
						Password:
					</label>
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
				>
					{isLoading ? (
						<Loader2
							className="pointer-events-none ml-2 animate-spin"
							size={16}
						/>
					) : (
						<>
							Login
							<ArrowRight className="ml-2" size={16} />
						</>
					)}
				</button>
			</form>
			<Link
				href="/auth/register"
				className="text-sm text-gray-400 hover:text-gray-300"
			>
				Register
			</Link>
		</div>
	)
}
