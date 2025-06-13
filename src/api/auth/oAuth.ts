export async function oAuth(email: string, code: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}auth/checkOAuth?email=${email}&code=${code}`,
		{
			method: 'GET',
			headers: {
				// Authorization: `Bearer ${code}`,
				'Content-Type': 'application/json'
			}
		}
	)

	if (await !res.ok) {
		return res.json()
	}

	return await res.json()
}

export async function getCode(email: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}auth/sendOAuthCode?email=${email}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	const data = await res.json()

	if (!res.ok) {
		throw new Error('Failed to send OAuth code')
	}

	return data
}
