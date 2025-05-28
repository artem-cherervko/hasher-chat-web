'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react'

type SidebarContextType = {
	shoving: boolean
	toggleShoving: () => void
	show: () => void
	hide: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [shoving, setShoving] = useState(true)

	// Определение начального состояния на клиенте
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setShoving(false)
			} else {
				setShoving(true)
			}
		}

		handleResize() // установить при первом монтировании

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const toggleShoving = () => setShoving(prev => !prev)
	const show = () => setShoving(true)
	const hide = () => setShoving(false)

	return (
		<SidebarContext.Provider value={{ shoving, toggleShoving, show, hide }}>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebar = () => {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within SidebarProvider')
	}
	return context
}
