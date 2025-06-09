import { findUser } from '@/api/user/findUser'
import { useEffect, useState } from 'react'

export function useFindUser(user_name: string) {
	const [uin, setUin] = useState('')

	useEffect(() => {
		async function FindUser() {
			const user = await findUser(user_name)
			if (user) {
				setUin(user)
			}
		}
		FindUser()
	}, [user_name])

	return uin
}
