export async function sendImage(
	file: File,
	senderUin: string,
	receiverUin: string
) {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('senderUin', senderUin)
	formData.append('receiver', receiverUin)

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}images/image`, {
		method: 'POST',
		body: formData
	})

	if (!res.ok) throw new Error('Upload failed')
	return res.json()
}
