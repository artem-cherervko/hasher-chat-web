import { Send } from 'lucide-react'

export default function ChatFooter() {
	return (
		<footer className="m-2 flex h-[10rem] max-w-screen flex-row items-center justify-between rounded-lg border-2 border-[#F24822] p-2">
			<input
				type="text"
				placeholder="Type..."
				id=""
				className="placeholder:text-md h-full w-full overflow-y-auto p-2 break-words whitespace-pre-wrap outline-0 placeholder:font-semibold"
			/>
			<button>
				<Send className="text-[#F24822]" />
			</button>
		</footer>
	)
}
