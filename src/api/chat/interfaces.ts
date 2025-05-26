interface Message {
	id: string
	sended_by_id: string
	content: string
	created_at: string
	updated_at: string
}

interface ChatUser {
	uin: string
	name: string
	photo_url: string
	received_messages: Message[]
}

// If you need to type the array itself
// type ChatUserList = ChatUser[]
