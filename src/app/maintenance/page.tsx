'use client'

export default function MaintenancePage() {
	return (
		<div className="flex h-screen w-screen justify-center bg-[#051A27]">
			<div className="flex flex-col items-center justify-center">
				<h1 className="border-b-2 border-[#F24822] text-2xl font-bold">
					On maintenance!
				</h1>
				<p>Please wait.. We are working with our systems at time</p>
				<span>Thanks for waiting 🥺❤️</span>
				<span>by. Artem Cherevko (@hasher-dev)</span>
				<button
					type="submit"
					className="mt-2 flex h-9 w-30 items-center justify-center rounded-lg !border !border-[#F24822] !text-white outline-0"
					onClick={() => (window.location.href = '/')}
				>
					Go home
				</button>
			</div>
		</div>
	)
}
