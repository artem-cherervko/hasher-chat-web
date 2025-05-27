import { io, Socket } from 'socket.io-client'
import { ReceivedMessage, SendMessage } from './interfaces'
import { getUIN } from './getChats'

let socket: Socket | null = null
let uin: string

export async function connectWebSocket() {
	uin = await getUIN()

	socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
		transports: ['websocket'],
		query: {
			uin: uin
		},
		withCredentials: true
	})
}

export function getSocket(): Socket | null {
	return socket
}

export function disconnectSocket() {
	if (socket?.connected) {
		socket.disconnect()
		socket = null
	} else {
		console.warn('WebSocket already disconnected or not initialized.')
	}
}

export function onMessage(callback: (message: ReceivedMessage) => void) {
	if (!socket) {
		throw new Error('WebSocket is not connected. Please connect first.')
	}
	socket.on('message', callback)
}

export function sendMessage(message: SendMessage) {
	if (!socket) {
		throw new Error('WebSocket is not connected. Please connect first.')
	}
	socket.emit('message', message)
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
