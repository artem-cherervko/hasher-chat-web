import Cookies from 'js-cookie'

export async function GetUserData(uin: string) {
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined')
	}

	const baseUrl = process.env.NEXT_PUBLIC_API_URL.endsWith('/')
		? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
		: process.env.NEXT_PUBLIC_API_URL

	const response = await fetch(`${baseUrl}/user/getUser?uin=${uin}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${Cookies.get('u') || ''}`
		},
		credentials: 'include'
	})

	return await response.json().then(data => {
		if (!response.ok) {
			throw new Error(data.message || 'Failed to fetch user data')
		}
		return data as ChatUser
	})
}
