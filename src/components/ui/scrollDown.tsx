import { ArrowDown } from 'lucide-react'

export default function ScrollDown(props: {
	ref: React.RefObject<HTMLDivElement>
}) {
	return (
		<div className="flex justify-center">
			<button
				onClick={() =>
					props.ref.current?.scrollIntoView({ behavior: 'smooth' })
				}
				className="absolute right-4 bottom-20 rounded-full !border-2 !border-[#F24822] p-2 !text-white !shadow-lg"
			>
				<ArrowDown size={20} />
			</button>
		</div>
	)
}
