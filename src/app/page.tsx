'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Home() {
	const router = useRouter()

	useEffect(() => {
		const u = Cookies.get('u')
		if (u) {
			router.push('/chat/0')
		} else {
			router.push('/auth/login')
		}
	}, [])

	return <div></div>
}
