export async function checkAccessToken() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/checkAccess`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
	)

	if (res.status === 200) {
		return true
	} else {
		return false
	}
}

export async function checkRefreshToken() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/checkRefresh`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
	)

	if (res.status === 200) {
		return res.json()
	} else {
		return false
	}
}

export async function generateTokens(uin: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/tokens`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ uin })
	})

	if (res.status === 200) {
		return res.json()
	} else {
		return false
	}
}
