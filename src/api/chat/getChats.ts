import Cookies from 'js-cookie'
import { Chat } from './interfaces'

let uin: string
let token: string

export async function getUIN() {
	token = Cookies.get('u') || ''
	if (!token) {
		throw new Error('User UIN is not set in cookies')
	} else {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}auth/getUIN?token=${token}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}
		)
		if (!resp.ok) {
			return false
		} else {
			const data = await resp.text()
			uin = data
			return uin
		}
	}
}

export async function getChats() {
	await getUIN()

	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}chats/getAllChats?uin=${uin}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}` // Include the token in the headers
			},
			credentials: 'include'
		}
	)
	if (!resp.ok) {
		return false
	} else {
		return (await resp.json()) as Chat
	}
}
