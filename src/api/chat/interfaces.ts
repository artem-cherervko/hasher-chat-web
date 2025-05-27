interface Message {
	id: string
	sended_by_id: string
	content: string
	created_at: string
	updated_at: string
}

export interface ChatUser {
	uin: string
	name: string
	photo_url: string
	received_messages: Message[]
}

export interface Chat {
	id: string
	chat_user_one_id: string
	chat_user_two_id: string
	chat_user_one: {
		uin: string
		name: string
		user_name: string
		isOnline: boolean
		last_seen: string
	}
	chat_user_two: {
		uin: string
		name: string
		user_name: string
		isOnline: boolean
		last_seen: string
	}
}

export interface ReceivedMessage {
	status: string
	sender: string
	message: string
	time: string
}

export interface SendMessage {
	receiver_uin: string
	message: string
}

// If you need to type the array itself
// type ChatUserList = ChatUser[]
