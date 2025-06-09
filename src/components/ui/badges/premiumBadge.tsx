import { Star } from 'lucide-react'
import { Badge } from '../badge'

export default function PremiumBadge() {
	return (
		<Badge className="rounded-full bg-yellow-500 p-1">
			<Star className="!h-3 !w-3 text-white" />
		</Badge>
	)
}
