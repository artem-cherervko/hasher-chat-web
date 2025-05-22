export async function login(uin: string, password: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ uin, password }),
		credentials: 'include'
	})

	if (res.status === 200) {
		return res.json()
	} else {
		return false
	}
}
