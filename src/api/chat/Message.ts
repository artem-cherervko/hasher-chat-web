import { getUIN } from './getChats'
import Cookies from 'js-cookie'

export async function DeleteMessage(messageId: string) {
	const token = await Cookies.get('u')

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/deleteMessage?message_id=${messageId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	)

	if (!response.ok) {
		throw new Error('Failed to delete message')
	}

	return response.json()
}

export async function EditMessage(messageId: string, newMessage: string) {
	const token = await Cookies.get('u')

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/updateMessage?message_id=${messageId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ new_text: newMessage })
		}
	)

	if (!response.ok) {
		throw new Error('Failed to edit message')
	}

	return response.json()
}
