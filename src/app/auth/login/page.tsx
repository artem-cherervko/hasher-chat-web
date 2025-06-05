'use client'

import { login } from '@/api/auth/login'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LoginPage() {
	const router = useRouter()

	useEffect(() => {
		if (Cookies.get('u')) {
			router.replace('/chat/0', { scroll: false })
		}
	})

	return (
		<div className="drop-shadow-accent flex flex-col items-center justify-center rounded-lg border-1 border-b-cyan-950 bg-[#051A27] p-4 drop-shadow-xl">
			<h1 className="flex items-center justify-center text-2xl font-bold">
				Login
			</h1>
			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={async e => {
					e.preventDefault()
					try {
						const res = await login(
							e.currentTarget.uin.value,
							e.currentTarget.password.value
						)
						// console.log('Login response:', res) // Debug log
						if (res) {
							// console.log(res.accessToken, res.refreshToken)
							Cookies.set('u', res.accessToken, { path: '/' })
							Cookies.set('r', res.refreshToken, { path: '/' })
							router.replace('/chat/0')
						} else {
							alert('Login failed: Invalid response from server')
						}
					} catch (error) {
						// console.error('Login error:', error)
						alert('Login failed: ' + (error as Error).message)
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
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
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
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
						required
					/>
				</div>
				<button
					type="submit"
					className={
						'flex h-9 w-30 items-center justify-center rounded-lg border-1 border-orange-500 outline-0'
					}
				>
					Login
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
