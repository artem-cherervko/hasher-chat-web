'use client'

import { motion } from 'framer-motion'
import { LogOut, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { Logout } from '@/api/auth/logout'
import { updateUserData } from '@/api/user/updateUserData'

export default function SettingsPage() {
	const [userName, setUserName] = useState('')
	const router = useRouter()

	const [form, setForm] = useState({
		name: '',
		username: '',
		photoUrl: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await updateUserData(form.name, userName, form.photoUrl)
		if (res.status === 200) {
			router.replace('/settings')
			toast.success('Changes saved!')
		} else {
			toast.error('Failed to save changes')
		}
	}

	const handleLogout = async () => {
		toast('Logged out')
		await Logout()
		router.replace('/auth/login')
	}

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		const cleaned = raw.replace(/[^a-zA-Z0-9._]/g, '')
		const trimmed = cleaned.replace(/^[_\.]+|[_\.]+$/g, '')
		setUserName(trimmed)
	}

	return (
		<motion.main
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="flex min-h-screen items-center justify-center bg-[#051A27] px-4 py-10 text-white outline-0"
		>
			<div className="w-full max-w-md space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.push('/chat/0')}
							className="text-zinc-400 transition hover:text-white"
							title="Back to chat"
						>
							<ArrowLeft size={20} className="!text-white" />
						</button>
						<h1 className="text-3xl font-semibold tracking-wide">Settings</h1>
					</div>
					<button
						onClick={handleLogout}
						className="!text-[#F24822] transition hover:!text-white"
						title="Logout"
					>
						<LogOut size={22} />
					</button>
				</div>

				{form.photoUrl && (
					<div className="flex justify-center">
						<Image
							src={form.photoUrl}
							alt="Avatar"
							width={96}
							height={96}
							className="h-24 w-24 rounded-full border border-zinc-800 object-cover shadow-lg"
						/>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm text-zinc-400">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm text-zinc-400">Username</label>
						<input
							type="text"
							name="username"
							value={userName}
							onChange={handleUserNameChange}
							className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
							placeholder="hasherUser"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm text-zinc-400">
							Photo URL
						</label>
						<input
							type="text"
							name="photoUrl"
							value={form.photoUrl}
							onChange={handleChange}
							className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
							placeholder="https://your-image.com/avatar.png"
						/>
					</div>

					<motion.button
						whileTap={{ scale: 0.96 }}
						type="submit"
						className="w-full !rounded-lg !border-2 !border-[#F24822] !py-2 text-sm font-semibold !text-white transition hover:!border-red-700"
					>
						Save Changes
					</motion.button>
				</form>
			</div>
		</motion.main>
	)
}
