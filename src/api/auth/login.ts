interface LoginResponse {
	status: number
	accessToken: string
	refreshToken: string
}

export async function login(
	uin: string,
	password: string
): Promise<LoginResponse | false> {
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined')
	}

	const baseUrl = process.env.NEXT_PUBLIC_API_URL.endsWith('/')
		? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
		: process.env.NEXT_PUBLIC_API_URL

	const res = await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ uin, password }),
		credentials: 'include'
	})

	const data = (await res.json()) as LoginResponse

	if (data) {
		return data
	}

	return false
}
