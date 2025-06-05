export async function getChatUserName(uin: string) {
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}chats/getChatUserName?uin=${uin}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}
		)
		if (!resp.ok && (await resp.text()) === null) {
			return null
		}
		return resp
	} catch (error) {
		console.error(error)
		return null
	}
}
