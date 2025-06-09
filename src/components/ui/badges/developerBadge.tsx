import { Code } from 'lucide-react'
import { Badge } from '../badge'

export default function DeveloperBadge() {
	return (
		<Badge className="rounded-full bg-gray-600 p-1">
			<Code className="!h-3 !w-3 text-white" />
		</Badge>
	)
}
