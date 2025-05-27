import Image from 'next/image'

export default function ChatHeader() {
	return (
		<header className="flex w-full flex-row items-center justify-between border-b-2 border-[#F24822] bg-[#052028] p-2 font-[family-name:var(--font-inria-serif)]">
			<div className="logo">
				<p
					className={
						'ml-1 font-[family-name:var(--font-inria-serif)] text-4xl text-[#F24822]'
					}
				>
					h
				</p>
				<hr className="w-10 origin-right rotate-90" />
			</div>
			<h2 className="text-xl font-bold">Chat</h2>
			<Image alt="User profile photo" src={'/d.png'} width={30} height={30} />
		</header>
	)
}
