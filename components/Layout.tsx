import Head from 'next/head'
import { useRouter, Router } from 'next/router'
import React, { useEffect } from 'react'
import emitter from '../services/eventEmitter'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setProfile, setToken } from '../store/slices/auth'
import { removePreview } from '../store/slices/media'
import { setLoading } from '../store/slices/misc'
import Loader from './Loader/Loader'
import Navbar from './Navbar/Navbar'

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const dispatch = useAppDispatch()
	const router = useRouter()

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
	}, [])

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
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto+Mono:wght@500&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Loader />
			<Navbar />
			<main>{children}</main>
		</>
	)
}

export default Layout
