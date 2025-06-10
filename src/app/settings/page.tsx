'use client'

import { useState, useMemo } from 'react'
import usePremium from '@/hooks/usePremium'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Logout } from '@/api/auth/logout'

export default function SettingsPage() {
	const { premium, expire, addPremium, removePremium } = usePremium()

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [airplaneMode, setAirplaneMode] = useState(false)

	// Для отображения статуса премиума красиво
	const premiumStatusText = useMemo(() => {
		if (premium === 'true') return 'Active'
		return 'Inactive'
	}, [premium])

	const premiumExpireText = useMemo(() => {
		if (expire === 'true') return 'Valid'
		return 'Expired or not active'
	}, [expire])

	const handleSaveProfile = () => {
		// Заглушка, тут нужно подключить API
		toast.success('Profile saved successfully!')
	}

	const handleBuyPremium = async () => {
		try {
			// await addPremium()
			toast.success('Premium activated!')
		} catch {
			toast.error('Failed to activate premium.')
		}
	}

	const handleRemovePremium = async () => {
		try {
			// await removePremium()
			toast.success('Premium removed')
		} catch {
			toast.error('Failed to remove premium')
		}
	}

	const handleLogout = async () => {
		await Logout()
		toast.success('Logged out successfully!')
		// Можно добавить редирект после логаута
	}

	return (
		<div className="border-accent fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg border-2 bg-[#051A27] p-8 text-white shadow-[0_8px_24px_rgba(242,72,34,0.4)] transition-all duration-300">
			<h1 className="text-center text-3xl font-bold text-[#F24822]">
				Settings
			</h1>

			{/* Email */}
			<div className="flex flex-col gap-1">
				<Label htmlFor="email">Email</Label>
				<input
					id="email"
					type="email"
					placeholder="your.email@example.com"
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="rounded-md border border-[#0E1A23] bg-[#0E1A23] px-3 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#F24822] focus:outline-none"
				/>
			</div>

			{/* Name */}
			<div className="flex flex-col gap-1">
				<Label htmlFor="name">Name</Label>
				<input
					id="name"
					type="text"
					placeholder="Your name"
					value={name}
					onChange={e => setName(e.target.value)}
					className="rounded-md border border-[#0E1A23] bg-[#0E1A23] px-3 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#F24822] focus:outline-none"
				/>
			</div>

			{/* Username */}
			<div className="flex flex-col gap-1">
				<Label htmlFor="username">Username</Label>
				<input
					id="username"
					type="text"
					placeholder="your_username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					className="rounded-md border border-[#0E1A23] bg-[#0E1A23] px-3 py-2 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#F24822] focus:outline-none"
				/>
			</div>

			<button
				onClick={handleSaveProfile}
				className="w-full rounded bg-[#F24822] py-2 font-semibold transition hover:bg-[#d0361c]"
			>
				Save Profile
			</button>

			{/* Premium Info */}
			<div className="flex flex-col gap-2 rounded border border-[#0E1A23] bg-[#0E1A23] p-4">
				<p>
					Premium Status:{' '}
					<span className="font-semibold">{premiumStatusText}</span>
				</p>
				<p>
					Expires: <span className="font-semibold">{premiumExpireText}</span>
				</p>

				{!premium || premium === 'none' ? (
					<button
						onClick={handleBuyPremium}
						className="w-full rounded bg-[#F24822] py-2 font-semibold transition hover:bg-[#d0361c]"
					>
						Buy Premium
					</button>
				) : (
					<button
						onClick={handleRemovePremium}
						className="w-full rounded bg-red-600 py-2 font-semibold transition hover:bg-red-700"
					>
						Remove Premium
					</button>
				)}
			</div>

			{/* Logout */}
			<button
				onClick={handleLogout}
				className="w-full rounded border border-[#F24822] py-2 font-semibold text-[#F24822] transition hover:bg-[#F24822] hover:text-[#051A27]"
			>
				Logout
			</button>
		</div>
	)
}
