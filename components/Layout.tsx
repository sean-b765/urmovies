import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { useRouter, Router } from 'next/router'
import React, { useEffect } from 'react'
import emitter from '../services/eventEmitter'
import { useAppDispatch } from '../store/hooks'
import { setProfile, setToken } from '../store/slices/auth'
import { removePreview } from '../store/slices/media'
import { establishSocketConnection, setLoading } from '../store/slices/misc'
import Loader from './Loader/Loader'
import Navbar from './Navbar/Navbar'
import Popup from './Popup/Popup'

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	// One-off events performed on load
	useEffect(() => {
		// Loading bar/indicator when navigating between pages
		Router.events.on('routeChangeStart', () => {
			dispatch(setLoading(true))
		})

		Router.events.on('routeChangeComplete', () => {
			dispatch(setLoading(false))
		})
		Router.events.on('routeChangeError', () => {
			dispatch(setLoading(false))
		})

		// Loading indicator when performing API requests
		emitter.on('AXIOS_START', () => {
			// console.log('start');
		})

		emitter.on('AXIOS_STOP', () => {
			// console.log('finish')
		})

		dispatch(establishSocketConnection())
	}, [])

	// When route changes
	useEffect(() => {
		dispatch(removePreview())
		dispatch(setToken(localStorage.getItem('authtoken') || ''))
		dispatch(
			setProfile(
				JSON.parse(localStorage.getItem('userprofile') || '{}') || null
			)
		)
	}, [router])

	return (
		<>
			<Popup />
			<Loader />
			<Navbar />
			<main>{children}</main>
		</>
	)
}

export default Layout
