import { getUIN } from '../chat/getChats'
import Cookies from 'js-cookie'

export async function updateUserData(
	name: string,
	user_name: string,
	photo_url: string
) {
	const uin = await getUIN()
	const token = Cookies.get('u')
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}user/updateUser?uin=${uin}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			credentials: 'include',
			body: JSON.stringify({
				name,
				user_name,
				photo_url: photo_url === '' ? 'd' : photo_url
			})
		}
	).then(async res => await res.json())

	return res
}
