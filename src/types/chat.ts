export interface Message {
	id: string
	content: string
	sender: string
	receiver: string
	created_at: string
	updated_at: string
	is_read: boolean
	is_edited: boolean
}

export interface ChatMessages {
	chat_id: string
	messages: Message[]
	images: IImage[]
}

export interface IImage {
	key: string
	sender: string
	image_url: string
	sent_at: string
	text: string
}

export type ChatItem =
	| (Message & { type: 'message' })
	| (IImage & { type: 'image'; created_at: string })
