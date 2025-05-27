import clsx from 'clsx'

export default function Message(props: {
	text: string
	time: string
	from: 'me' | 'other'
}) {
	return (
		<div className="flex w-full">
			<div
				className={clsx(
					'inline-block h-fit max-w-[50%] rounded-lg border-2 p-2 drop-shadow-sm drop-shadow-gray-800',
					{
						'ml-auto border-[#03171d] bg-[#0D313D]': props.from === 'me',
						'border-[#062a35] bg-[#05252f]': props.from === 'other'
					}
				)}
			>
				<p className="overflow-wrap break-word font-semibold break-words whitespace-pre-wrap">
					{props.text}
				</p>
				<p>t: {props.time.split(' ')[1]}</p>
			</div>
		</div>
	)
}
