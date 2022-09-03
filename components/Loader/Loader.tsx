import { LinearProgress } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../store/hooks'

const Loader = () => {
	const { loading } = useAppSelector((state) => state.misc)

	return loading ? (
		<LinearProgress
			sx={{ position: 'fixed', zIndex: 999999, width: '100vw' }}
		></LinearProgress>
	) : (
		<></>
	)
}

export default Loader
