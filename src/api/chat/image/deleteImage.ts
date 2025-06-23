export async function DeleteImage(key: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}images/image?key=${key}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)

	if (!res.ok) {
		throw new Error('Message not deleted!')
	} else {
		return await res.json()
	}
}
