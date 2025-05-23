'use client'

export default function LoginPage() {
	return (
		<div className="flex flex-col bg-[#051A27]">
			<h1 className="flex items-center justify-center text-2xl font-bold">
				Login
			</h1>
			<form
				className="flex flex-col items-center justify-center space-y-3 p-4"
				onSubmit={e => {
					e.preventDefault()
					console.log('test')
				}}
			>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="username" className="mb-2 text-lg">
						UIN:
					</label>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="UIN-SAMKFK3123"
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
						required
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="password" className="mb-2 text-lg">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password..."
						className="rounded-lg border-1 border-[#F24822] p-2 outline-0"
						required
					/>
				</div>
				<button
					type="submit"
					className={
						'flex h-9 w-30 items-center justify-center rounded-lg border-1 border-orange-500 outline-0'
					}
				>
					Login
				</button>
			</form>
		</div>
	)
}
