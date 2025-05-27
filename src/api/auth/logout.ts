import Cookies from 'js-cookie'
import { disconnectSocket } from '../chat/ws'

export async function Logout() {
	Cookies.remove('u', { path: '/' })
	Cookies.remove('r', { path: '/' })
	disconnectSocket()

	return 'Logout successful'
}
