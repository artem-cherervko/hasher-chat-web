import Cookies from 'js-cookie'

export async function findUser(user_name: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}user/findUser?user_name=${user_name}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('u')}`
			}
		}
	)
	if (res.status === 200) {
		return res.text()
	}
	return null
}
