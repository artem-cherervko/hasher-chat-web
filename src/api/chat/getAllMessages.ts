import { getUIN } from './getChats'
import Cookies from 'js-cookie'

export async function AllMessages(uin: string) {
	const myUIN = await getUIN()
	const token = Cookies.get('u') || ' '

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/getAllMessages?uin=${uin}&sender=${myUIN}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	)

	if (res.ok) {
		const data = await res.json()
		return data
	} else {
		return null
	}
}
