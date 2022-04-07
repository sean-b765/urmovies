import React from 'react'
import { getGeolocation } from '../store/actions/geoloc'
import { useAppDispatch } from '../store/hooks'

const Layout: React.FC<{ children: any }> = ({ children }) => {
	const dispatch = useAppDispatch()

	dispatch(getGeolocation())

	return (
		<>
			<main>{children}</main>
		</>
	)
}

export default Layout
