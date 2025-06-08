import { io, Socket } from 'socket.io-client'
import { SendMessage } from './interfaces'
import { getUIN } from './getChats'

let socket: Socket | null = null
let uin: string

export async function connectWebSocket(
	onMessage?: (data: any) => void,
	onEdit?: (data: any) => void,
	onDelete?: (data: any) => void
) {
	if (socket?.connected) return

	uin = await getUIN()

	socket = io(`${process.env.NEXT_PUBLIC_WS_URL}/`, {
		transports: ['websocket'],
		query: { uin },
		withCredentials: true
	})

	socket.on('connect', () => {
		// console.log('WebSocket connected:', socket?.id)
	})

	socket.on('message', data => {
		if (onMessage) onMessage(data)
	})

	socket.on('edit', data => {
		if (onEdit) onEdit(data)
	})

	socket.on('delete', data => {
		if (onDelete) onDelete(data)
	})

	socket.on('disconnect', () => {
		// console.log('WebSocket disconnected')
	})
}

export function disconnectSocket() {
	if (socket) {
		socket.off('message')
		socket.off('edit')
		socket.off('delete')
		socket.disconnect()
		socket = null
	}
}

export function sendMessage(message: SendMessage) {
	if (!socket) {
		throw new Error('WebSocket is not connected. Please connect first.')
	}
	socket.emit('chat', message)
}

export async function editMessage(message: { chat_with_uin: string }) {
	const uin = await getUIN()

	if (!socket) {
		throw new Error('WebSocket is not connected. Please connect first.')
	}
	socket.emit('editMessage', {
		chat_with_uin: message.chat_with_uin,
		uin: uin
	})
}

export async function deleteMessage(message: { chat_with_uin: string }) {
	const uin = await getUIN()

	if (!socket) {
		throw new Error('WebSocket is not connected. Please connect first.')
	}
	socket.emit('deleteMessage', {
		chat_with_uin: message.chat_with_uin,
		uin: uin
	})
}

// {
//     "status": 200,
//     "sender": "UIN-WZPT4YSE0Y57",
//     "message": "I love you 🥺❤️...",
//     "time": "2025-05-27 16:51:59"
// }

// {
//     "receiver_uin": "UIN-5BK8MX2109SZ",
//     "message": "I love you 🥺❤️..."
// }
