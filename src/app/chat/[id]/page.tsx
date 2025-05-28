'use client'
import { AllMessages } from '@/api/chat/getAllMessages'
import ChatFooter from '@/components/ui/chat/footer'
import ChatHeader from '@/components/ui/chat/header'
import Message from '@/components/ui/chat/message'
import SideBar from '@/components/ui/chat/side-bar'
import { useSidebar } from '@/lib/SidebarContext'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function ChatPage() {
	const bottomRef = useRef<HTMLDivElement | null>(null)
	const params = useParams()
	const { shoving } = useSidebar()
	useEffect(() => {
		async function getMessages() {
			await AllMessages(String(params['id']))
		}
		getMessages()
	}, [params])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])

	return (
		<div
			className={clsx(
				'grid h-screen w-full items-center justify-center bg-[#051A27]',
				{
					'grid-cols-1': !shoving,
					'lg:grid-cols-[20rem_1fr]': shoving
				}
			)}
		>
			<SideBar />
			<div className="chat flex h-screen w-full flex-col font-[family-name:var(--font-fira-mono)]">
				<ChatHeader />
				<div className="messages space-y-3 overflow-y-auto p-2">
					<Message
						text="Hey! How was your summer vacation?"
						time="27.05.25 21:30:00"
						from="other"
					/>
					<Message
						text="It was amazing! I went to several places!"
						time="27.05.25 21:30:15"
						from="me"
					/>
					<Message
						text="I started with two weeks at the beach in California"
						time="27.05.25 21:30:30"
						from="me"
					/>
					<Message
						text="Oh wow! Which beaches did you visit?"
						time="27.05.25 21:30:45"
						from="other"
					/>
					<Message
						text="Santa Monica and Venice Beach mostly"
						time="27.05.25 21:31:00"
						from="me"
					/>
					<Message
						text="I tried surfing for the first time!"
						time="27.05.25 21:31:15"
						from="me"
					/>
					<Message
						text="That's awesome! How did it go?"
						time="27.05.25 21:31:30"
						from="other"
					/>
					<Message
						text="Well, I spent more time falling than standing 😅"
						time="27.05.25 21:31:45"
						from="me"
					/>
					<Message
						text="That's normal for beginners! Did you get any injuries?"
						time="27.05.25 21:32:00"
						from="other"
					/>
					<Message
						text="Just a few bruises, nothing serious"
						time="27.05.25 21:32:15"
						from="me"
					/>
					<Message
						text="What else did you do there?"
						time="27.05.25 21:32:30"
						from="other"
					/>
					<Message
						text="Lots of beach volleyball!"
						time="27.05.25 21:32:45"
						from="me"
					/>
					<Message
						text="The sunsets were absolutely incredible"
						time="27.05.25 21:33:00"
						from="me"
					/>
					<Message
						text="Did you take any photos?"
						time="27.05.25 21:33:15"
						from="other"
					/>
					<Message
						text="Tons! Want to see some?"
						time="27.05.25 21:33:30"
						from="me"
					/>
					<Message
						text="Yes, please share!"
						time="27.05.25 21:33:45"
						from="other"
					/>
					<Message
						text="After California, I went to Yellowstone"
						time="27.05.25 21:34:00"
						from="me"
					/>
					<Message
						text="That must have been quite different!"
						time="27.05.25 21:34:15"
						from="other"
					/>
					<Message
						text="Completely! Saw so many geysers"
						time="27.05.25 21:34:30"
						from="me"
					/>
					<Message
						text="Did you see Old Faithful?"
						time="27.05.25 21:34:45"
						from="other"
					/>
					<Message
						text="Yes! It erupted right on schedule"
						time="27.05.25 21:35:00"
						from="me"
					/>
					<Message
						text="Also saw lots of wildlife"
						time="27.05.25 21:35:15"
						from="me"
					/>
					<Message text="Like what?" time="27.05.25 21:35:30" from="other" />
					<Message
						text="Bears, elk, and buffalo!"
						time="27.05.25 21:35:45"
						from="me"
					/>
					<Message
						text="Weren't you scared of the bears?"
						time="27.05.25 21:36:00"
						from="other"
					/>
					<Message
						text="We kept our distance! Safety first!"
						time="27.05.25 21:36:15"
						from="me"
					/>
					<div ref={bottomRef} />
				</div>
				<ChatFooter />
			</div>
		</div>
	)
}
