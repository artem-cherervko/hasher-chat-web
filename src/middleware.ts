import { NextRequest, NextResponse } from 'next/server'
import { checkAccessToken, checkRefreshToken } from './api/auth/tokens'

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('u')?.value
	const refreshToken = request.cookies.get('r')?.value

	if (!accessToken && !refreshToken) {
		const response = NextResponse.redirect(new URL('/auth/login', request.url))
		response.cookies.delete('u')
		response.cookies.delete('r')

		return response
	}

	if (accessToken) {
		const isAccessValid = await checkAccessToken(accessToken)
		if (isAccessValid) {
			return NextResponse.next()
		}
	}

	if (refreshToken) {
		const refreshRes = await checkRefreshToken(refreshToken)
		if (refreshRes && refreshRes.accessToken && refreshRes.refreshToken) {
			const response = NextResponse.next()
			response.cookies.set({
				name: 'u',
				value: refreshRes.accessToken,
				path: '/'
			})
			response.cookies.set({
				name: 'r',
				value: refreshRes.refreshToken,
				path: '/'
			})
			return response
		}
	}

	const response = NextResponse.rewrite(new URL('/auth/login', request.url))
	response.cookies.delete('u')
	response.cookies.delete('r')

	return response
}

export const config = {
	matcher: ['/chat/:path*', '/profile/:path*', '/settings/:path*']
}
