import { getChatUserName } from '@/api/chat/getChatUserName'
import { getLastSeen } from '@/api/user/getLastSeen'
import { useEffect, useState } from 'react'

export function useChatHeader(chatId: string) {
	const [lastSeen, setLastSeen] = useState<string>('')
	const [userName, setUserName] = useState<string>('Unknown')

	useEffect(() => {
		if (chatId !== '0') {
			const fetchLastSeen = async () => {
				const res = await getLastSeen(chatId)
				if (res) {
					setLastSeen(res.lastSeen)
				} else {
					setLastSeen('d: 31.12.2025 t: 23:59:59')
				}
			}

			const fetchUserName = async () => {
				const res = await getChatUserName(chatId)
				if (res.ok) {
					const data = await res.text()
					setUserName(data)
				} else {
					setUserName('Unknown')
				}
			}
			fetchUserName()

			const interval = setInterval(fetchLastSeen, 3000)
			return () => clearInterval(interval)
		} else {
			setLastSeen('d: 31.12.2025 t: 23:59:59')
			setUserName('Unknown')
		}
	}, [chatId])

	return { userName, lastSeen }
}
