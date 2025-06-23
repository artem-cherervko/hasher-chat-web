'use client'

import { checkAccessToken, checkRefreshToken } from '@/api/auth/tokens'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function useTokensRefresh() {
	const u = Cookies.get('u')
	const r = Cookies.get('r')

	useEffect(() => {
		async function refreshTokens() {
			if (u && r) {
				const accessToken = await checkAccessToken(u)
				if (accessToken) {
					return
				} else {
					const refreshRes = await checkRefreshToken(r)
					if (refreshRes && refreshRes.accessToken && refreshRes.refreshToken) {
						Cookies.set('u', refreshRes.accessToken)
						Cookies.set('r', refreshRes.refreshToken)
					} else {
						toast.error('Tokens expired or invalid')
						window.location.href = '/auth/login'
					}
				}
			}
		}
		refreshTokens()

		const interval = setInterval(
			() => {
				refreshTokens()
			},
			1000 * 60 * 15
		)
		return () => {
			clearInterval(interval)
		}
	}, [])
}
