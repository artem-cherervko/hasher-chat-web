import Cookies from 'js-cookie'
import { getUIN } from './getChats'

export async function readAllMessages(props: { chat_with: string }) {
	const token = Cookies.get('u')

	if (!token) {
		throw new Error('No token found')
	}
	const uin = await getUIN()

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/readAllMessages?chat_with_uin=${props.chat_with}&uin=${uin}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			credentials: 'include'
		}
	).then(res => res.json())

	if (!res.success) {
		return false
	}

	return res.message
}
