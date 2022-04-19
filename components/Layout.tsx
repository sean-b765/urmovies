import Head from 'next/head'
import { useRouter, Router } from 'next/router'
import React, { useEffect } from 'react'
import { getGeolocationThunk } from '../store/actions/geoloc'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setProfile, setToken } from '../store/slices/auth'
import { removePreview } from '../store/slices/media'
import { setLoading } from '../store/slices/misc'
import Navbar from './Navbar/Navbar'

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { loading } = useAppSelector((state) => state.misc)

	dispatch(getGeolocationThunk())

	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			dispatch(setLoading(true))
		})

		Router.events.on('routeChangeComplete', () => {
			dispatch(setLoading(false))
		})
		Router.events.on('routeChangeError', () => {
			dispatch(setLoading(false))
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

	function randomAnimation(min: number, max: number) {
		// min and max included
		const rnd = Math.floor(Math.random() * (max - min + 1) + min)

		return `${`loader${rnd}`} 3s cubic-bezier(0.075, 0.82, 0.165, 1) both`
	}

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
			<div className="loader">
				<div
					className={
						loading
							? 'loader__progress loader__progress--loading'
							: 'loader__progress'
					}
					style={{
						animation: loading ? randomAnimation(1, 2) : 'none',
					}}
				></div>
			</div>
			<Navbar />
			<main>{children}</main>
		</>
	)
}

export default Layout
