'use client'

import { Settings } from 'lucide-react'
import ChatElement from './chat-element'

export default function SideBar() {
	const name = 'Artem Artemovich'

	return (
		<div className="flex h-screen w-80 flex-col border-r-2 border-[#F24822] bg-[#052028] font-[family-name:var(--font-inria-serif)]">
			<div className="nav-elements flex flex-row items-center justify-between border-b-2 border-[#F24822] p-2">
				<div className="logo">
					<h1 className={'ml-1 text-4xl text-[#F24822]'}>h</h1>
					<hr className="w-10 origin-right rotate-90" />
				</div>
				<h2 className="text-xl font-bold">{name}</h2>
				<Settings className="h-7 w-7 text-[#F24822]"></Settings>
			</div>
			<ChatElement uin="UIN-WZPT4YSE0Y57" />
		</div>
	)
}
