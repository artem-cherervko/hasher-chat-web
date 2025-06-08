import { getChatUserName } from '@/api/chat/getChatUserName'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useChatHeader(chatId: string) {
	const [userName, setUserName] = useState<string>('Unknown')

	useEffect(() => {
		if (chatId !== '0') {
			const fetchUserName = async () => {
				const resp = await getChatUserName(chatId)
				if (resp.ok) {
					const data = await resp.text()
					setUserName(data)
				} else {
					setUserName('Unknown')
				}
			}
			fetchUserName()
		} else {
			setUserName('Unknown')
		}
	}, [chatId])

	return { userName }
}
