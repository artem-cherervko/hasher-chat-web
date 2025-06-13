import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	content: {
		files: [
			'./app/**/*.{ts,tsx,js,jsx}',
			'./components/**/*.{ts,tsx,js,jsx}',
			'./pages/**/*.{ts,tsx,js,jsx}'
		]
	},
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				border: 'var(--border)',
				primary: 'var(--primary)',
				'primary-foreground': 'var(--primary-foreground)',
				secondary: 'var(--secondary)',
				'secondary-foreground': 'var(--secondary-foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				accent: 'var(--accent)',
				'accent-foreground': 'var(--accent-foreground)',
				destructive: 'var(--destructive)',
				card: 'var(--card)',
				'card-foreground': 'var(--card-foreground)',
				popover: 'var(--popover)',
				'popover-foreground': 'var(--popover-foreground)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'calc(var(--radius) + 4px)'
			}
		}
	},
	plugins: []
}

export default config
