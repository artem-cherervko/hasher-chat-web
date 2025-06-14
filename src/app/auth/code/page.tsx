'use client'

import { login } from '@/api/auth/login'
import { getCode, oAuth } from '@/api/auth/oAuth'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/input-otp'
import clsx from 'clsx'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Loader2, SendHorizonalIcon } from 'lucide-react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CodePage() {
	const router = useRouter()
	const [code, setCode] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [uin, setUin] = useState<string | null>(null)
	const [password, setPassword] = useState<string | null>(null)
	const [attempts, setAttempts] = useState<number>(3)

	useEffect(() => {
		const storedUin = localStorage.getItem('uin')
		const storedPassword = localStorage.getItem('password')
		setUin(storedUin)
		setPassword(storedPassword)
	}, [])

	useEffect(() => {
		if (!uin) return

		const fetchCode = async () => {
			setIsLoading(true)
			try {
				const res = await getCode(uin)
				if (res.status === 200) {
					toast.success('Code sent to email')
					setIsLoading(false)
				} else {
					toast.error('Failed to send code')
					setIsLoading(false)
				}
			} catch (e) {
				console.log(e)
				toast.error('Failed to send code')
			}
		}

		fetchCode()
	}, [uin])

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="mb-2 text-center text-lg font-semibold">
				Input OAuth code
			</h1>
			<InputOTP
				maxLength={6}
				pattern={REGEXP_ONLY_DIGITS}
				onChange={value => {
					setCode(value)
				}}
				disabled={isLoading}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<button
				type="submit"
				className="mt-4 rounded-lg !border-1 !border-[#F24822] px-4 py-2 !text-white"
				onClick={async () => {
					if (attempts >= 1) {
						setIsLoading(true)
						const res = await oAuth(
							uin,
							code.slice(0, 3) + '-' + code.slice(3, 6)
						)
						if (res.status === 200) {
							const res2 = await login(uin, password)
							if (res2) {
								Cookies.set('u', res2.accessToken, { path: '/' })
								Cookies.set('r', res2.refreshToken, { path: '/' })
								toast.success('Login successful')
								localStorage.removeItem('uin')
								localStorage.removeItem('password')
								setTimeout(() => {
									router.replace('/chat/0')
								}, 500)
								setIsLoading(false)
							} else {
								toast.error('Login failed: please try again')
								localStorage.removeItem('uin')
								localStorage.removeItem('password')
								router.replace('/auth/login')
								setIsLoading(false)
							}
						} else {
							toast.error('OAuth failed: code not correct!')
							setAttempts(prev => prev - 1)
							setIsLoading(false)
						}
					} else {
						setIsLoading(false)
						toast.error(
							'Login failed: please try again, you expire your attempts!'
						)
						localStorage.removeItem('uin')
						localStorage.removeItem('password')
						router.replace('/auth/login')
					}
				}}
			>
				{isLoading ? (
					<Loader2 className="pointer-events-none animate-spin opacity-50" />
				) : (
					<div className={'flex flex-row items-center'}>
						Submit
						<SendHorizonalIcon size={16} className="ml-4" />
					</div>
				)}
			</button>
		</div>
	)
}
