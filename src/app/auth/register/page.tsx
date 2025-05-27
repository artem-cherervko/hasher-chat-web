'use client'

import { addUser } from '@/api/auth/register'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	const router = useRouter()
	return (
		<div className="flex flex-col bg-[#051A27]">
			<h1 className="flex items-center justify-center text-2xl font-bold">
				Register
			</h1>
			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={async e => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const name = formData.get('name') as string
					const email = formData.get('email') as string
					const user_name = formData.get('user_name') as string
					const password = formData.get('password') as string

					const resp = await addUser(email, name, user_name, password)
					console.log(resp)
					if (resp) {
						e.currentTarget.reset()
						router.push('/chat/0')
					} else {
						alert('Failed to register user. Please try again.')
					}
				}}
			>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name..."
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
						required
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="example@gmail.com"
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
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
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
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
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}
