import { useEffect, useState } from 'react'
import {
	getPremium,
	getExpire,
	addPremium,
	removePremium
} from '@/api/premium/premium'
import { getUIN } from '@/api/chat/getChats'
import { toast } from 'sonner'

interface PremiumResponse {
	premium: boolean
}

interface ExpireResponse {
	expire: boolean
}

export default function usePremium() {
	const [premium, setPremium] = useState<string>('none') // 'true' | 'none'
	const [expire, setExpire] = useState<string>('none') // 'true' | 'none'

	useEffect(() => {
		const fetchData = async () => {
			try {
				const uin = await getUIN()
				if (uin === 'none') return

				const premiumData = (await getPremium(uin)) as PremiumResponse
				const expireData = (await getExpire(uin)) as ExpireResponse
				console.log('premiumData', premiumData, 'expireData', expireData)

				setPremium(premiumData.premium ? 'true' : 'none')
				setExpire(expireData.expire ? 'true' : 'none')
			} catch (error) {
				toast.error(
					'Error fetching premium status!\nTry again later or contact support.'
				)
			}
		}
		fetchData()
	}, [])

	return { premium, expire, addPremium, removePremium }
}
