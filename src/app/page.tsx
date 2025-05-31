'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()

	useEffect(() => {
		router.push('/chat/0')
	}, [])

	return <div></div>
}
