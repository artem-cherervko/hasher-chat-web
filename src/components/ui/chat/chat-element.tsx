import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function ChatElement(props: { uin: string }) {
	const data = [
		{
			uin: props.uin,
			name: 'Test',
			photo_url: 'd',
			received_messages: [
				{
					id: '1',
					sended_by_id: 'de8424db-b929-4451-96a1-b1e2f952c834',
					content: 'Hello, world!',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}
			]
		},
		{
			uin: 'UIN-SKDKSCJ433',
			name: 'MAAAAKSIMKA',
			photo_url: 'd',
			received_messages: [
				{
					id: '3',
					sended_by_id: 'de8424db-b929-4451-96a1-b1e2f952c834',
					content: 'Hello, my!',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}
			]
		}
	]

	return data.map(item => (
		<Link
			href={`/chat/${item.uin}`}
			key={item.uin}
			className="flex flex-row items-center justify-start space-x-4 p-2 hover:bg-[#f248223e]"
		>
			<div className="flex flex-row">
				<Image alt="User profile photo" src={'/d.png'} width={50} height={50} />
				<div
					className={clsx('right-0 bottom-0 mt-auto h-3 w-3 rounded-2xl', {
						'bg-[#F24822]': true,
						'bg-gray-700': false
					})}
				/>
			</div>
			<div className="flex flex-col">
				<h1 className="text-xl font-bold">
					{item.name.length > 16
						? item.name.substring(0, 16) + '...'
						: item.name}
				</h1>
				<p className="text-md">
					{item.received_messages[0].content.length > 28
						? item.received_messages[0].content.substring(0, 28) + '...'
						: item.received_messages[0].content}
				</p>
			</div>
		</Link>
	))
}
