import { getUIN } from '@/api/chat/getChats'
import Cookies from 'js-cookie'

export async function getLastMessage(chat_with_uin: string) {
	const uin = await getUIN()

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/getLastMessage`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('u')}`
			},
			body: JSON.stringify({
				uin,
				chat_with_uin
			})
		}
	)

	if (!res.ok) {
		return null
	} else {
		return await res.json()
	}
}
