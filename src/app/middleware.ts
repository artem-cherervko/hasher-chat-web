import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (
		request.cookies.get('access_token') === undefined ||
		request.cookies.get('access_token') === null
	) {
		if (pathname !== '/auth/login' && pathname !== '/auth/register') {
			return NextResponse.redirect(new URL('/auth/login', request.url))
		}
		return NextResponse.next()
	}
}

export const config = {
	matcher: [
		'/',
		'profile/:path*',
		'/settings/:path*',
		'/chat/:path*',
		'/auth/:path*'
	]
}
