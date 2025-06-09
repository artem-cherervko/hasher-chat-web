import { Code, ShieldCheck } from 'lucide-react'
import { Badge } from '../badge'

export default function AdminBadge() {
	return (
		<Badge className="rounded-full bg-red-900 p-1">
			<ShieldCheck className="!h-3 !w-3 text-white" />
		</Badge>
	)
}
