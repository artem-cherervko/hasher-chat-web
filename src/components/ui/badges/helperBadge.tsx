import { HelpCircle } from 'lucide-react'
import { Badge } from '../badge'

export default function HelperBadge() {
	return (
		<Badge className="rounded-full bg-[#F24822] p-1">
			<HelpCircle className="!h-3 !w-3 text-white" />
		</Badge>
	)
}
