import Head from 'next/head'
import React, { useEffect } from 'react'
import emitter from '../services/eventEmitter'
import { getGeolocation } from '../store/actions/geoloc'
import { useAppDispatch } from '../store/hooks'

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const dispatch = useAppDispatch()

	dispatch(getGeolocation())

	useEffect(() => {
		emitter.on('AXIOS_START', () => {
			console.log('start')
		})
		emitter.on('AXIOS_FINISH', () => {
			console.log('fin')
		})
	}, [])

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
			<main>{children}</main>
		</>
	)
}

export default Layout
