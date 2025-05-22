export async function addUser(
	email: string,
	name: string,
	user_name: string,
	password: string,
	role: string = 'user'
) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, user_name, email, password, role }),
		credentials: 'include'
	})

	if (res.status === 200) {
		return res.json()
	} else {
		return false
	}
}
