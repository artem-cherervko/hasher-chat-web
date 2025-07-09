'use client'

import { useTokensRefresh } from '@/hooks/useTokensRefresh'
import { motion } from 'framer-motion'

const features = [
	{
		title: 'Private Messaging',
		description: 'End-to-end encrypted chats with your friends and colleagues.'
	},
	{
		title: 'Minimalist Design',
		description: 'Clean and distraction-free interface optimized for focus.'
	},
	{
		title: 'Real-Time Sync',
		description: 'Instant message updates across all your devices.'
	}
]

export default function LandingPage() {
	return (
		<main
			style={{ backgroundColor: '#051A27' }}
			className="flex min-h-screen flex-col items-center justify-between px-6 py-12 text-white"
		>
			<div className="flex flex-col items-center">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="mb-8 text-3xl font-extrabold select-none md:text-4xl"
					style={{ color: '#F24822' }}
				>
					Welcome to Hasher-chat 🧡
				</motion.h1>

				{/* Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
					className="mb-12 flex gap-6"
				>
					<a
						href="/auth/login"
						className="rounded-2xl px-8 py-4 font-semibold text-white shadow-lg"
						style={{ backgroundColor: '#F24822' }}
					>
						Sign In
					</a>
					<a
						href="/auth/register"
						className="rounded-2xl px-8 py-4 font-semibold shadow-lg"
						style={{
							backgroundColor: '#0A2B44',
							color: '#F24822',
							border: '2px solid #F24822'
						}}
					>
						Register
					</a>
				</motion.div>

				<motion.section
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ staggerChildren: 0.3 }}
					className="grid w-full max-w-4xl gap-6"
				>
					{features.map((feature, i) => (
						<motion.div
							key={i}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 }
							}}
							transition={{ duration: 0.6, ease: 'easeOut' }}
							className="rounded-3xl p-6 shadow-lg"
							style={{ backgroundColor: '#0A2B44' }}
						>
							<h2
								className="mb-1 text-xl font-semibold"
								style={{ color: '#F24822' }}
							>
								{feature.title}
							</h2>
							<p className="text-sm text-gray-300">{feature.description}</p>
						</motion.div>
					))}
				</motion.section>
			</div>

			{/* Footer */}
			<footer className="mt-16 text-center text-sm text-gray-500">
				Hasher-chat by{' '}
				<a
					href="https://hasher-chat.space"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-400 hover:underline"
				>
					@hasher.dev
				</a>{' '}
				(Artem Cherevko)
				<br />
				<a
					href="https://github.com/artem-cherervko/hasher-chat-web"
					className="text-gray-400 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
			</footer>
		</main>
	)
}
