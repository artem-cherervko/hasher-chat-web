import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline'
}

export const Button = ({
	className,
	variant = 'primary',
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
				variant === 'primary' && 'bg-red-500 text-white hover:bg-red-600',
				variant === 'outline' &&
					'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
				className
			)}
			{...props}
		/>
	)
}
