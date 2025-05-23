export default function RegisterPage() {
	return (
		<div>
			<h1>Register</h1>
			<form>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name..."
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="example@gmail.com"
						required
					/>
				</div>
				<div>
					<label htmlFor="user_name">User name:</label>
					<input
						type="text"
						id="user_name"
						name="user_name"
						placeholder="User name..."
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password..."
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}
