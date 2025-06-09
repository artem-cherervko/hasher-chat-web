import { BadgeCheckIcon } from 'lucide-react'
import { Badge } from '../badge'

export default function VerifiedBadge() {
	return (
		<Badge className="rounded-full bg-blue-600 p-1">
			<BadgeCheckIcon className="!h-3 !w-3 text-white" />
		</Badge>
	)
}
