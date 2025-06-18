import Cookies from 'js-cookie'

export async function getLastSeen(uin: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}user/lastSeen?uin=${uin}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('u')}`
			},
			credentials: 'include'
		}
	)
	if (!res.ok) {
		return {
			lastSeen: 'd: 31.12.2025 t: 23:59:59'
		}
	} else {
		return res.json()
	}
}
