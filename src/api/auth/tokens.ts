if (!process.env.NEXT_PUBLIC_API_URL) {
	throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined')
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL.endsWith('/')
	? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
	: process.env.NEXT_PUBLIC_API_URL

export async function checkAccessToken(token: string) {
	try {
		const res = await fetch(`${baseUrl}/auth/check-access?token=${token}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})

		return res.status === 200
	} catch (err) {
		console.error('checkAccessToken error:', err)
		return false
	}
}

export async function checkRefreshToken(token: string) {
	try {
		const res = await fetch(`${baseUrl}/auth/check-refresh/?token=${token}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		console.log(res.status)

		if (res.status === 200) {
			return res.json()
		} else {
			return false
		}
	} catch (err) {
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
