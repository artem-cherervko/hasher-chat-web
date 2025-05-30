export interface Message {
	id: string
	content: string
	sender: string
	receiver: string
	created_at: string
	updated_at: string
}

export interface ChatMessages {
	chat_id: string
	messages: Message[]
}
