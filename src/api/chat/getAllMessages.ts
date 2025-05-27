import { getUIN } from './getChats'
import Cookies from 'js-cookie'

export async function AllMessages(uin: string) {
	// const uin = await getUIN()
	const token = Cookies.get('u') || ' '

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/getAllMessages?uin=${uin}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	)

	console.log(await res.json())
}
