import { checkAccessToken, checkRefreshToken } from '@/api/auth/tokens'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('u')
	const refreshToken = request.cookies.get('r')

	if (!accessToken && !refreshToken) {
		console.log('No tokens found')
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	if (refreshToken) {
		const res = await checkRefreshToken()
		if (res?.ok) {
			const data = await res.json()
			if (data.accessToken && data.refreshToken) {
				const response = NextResponse.next()
				response.cookies.set('u', data.uin)
				response.cookies.set('r', data.refreshToken)
				return response
			}
		}
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	if (accessToken) {
		const res = await checkAccessToken()
		if (res) return NextResponse.next()

		const refreshRes = await checkRefreshToken()
		if (refreshRes?.ok) {
			const data = await refreshRes.json()
			if (data.accessToken && data.refreshToken) {
				const response = NextResponse.next()
				response.cookies.set('u', data.uin)
				response.cookies.set('r', data.refreshToken)
				return response
			}
		}
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}
}

export const config = {
	matcher: ['/chat/:path*', '/profile/:path*', '/settings/:path*']
}
