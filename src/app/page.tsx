'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Home() {
	const [status, setStatus] = useState(false)
	const router = useRouter()

	useEffect(() => {
		async function getServerStatus() {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}status`)
			if (res.status === 200) {
				setStatus(true)
			} else {
				setStatus(false)
			}
		}

		getServerStatus()
		if (!status) {
			return
		} else {
			const u = Cookies.get('u')
			if (u) {
				router.push('/chat/0')
			} else {
				router.push('/auth/login')
			}
		}
	}, [router, status])

	return (
		<div>
			<h1>Server status: {status ? 'Online' : 'Offline'}</h1>
		</div>
	)
}
