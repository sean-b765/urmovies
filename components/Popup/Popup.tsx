import { Alert, Button, Fade, IconButton, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { formatLargeText } from '../../lib/format'
import { dismissPopup } from '../../store/slices/notifications'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { MdClose } from 'react-icons/md'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

const Popup = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { popup } = useAppSelector((state) => state.notifications)

	const handleView = () => {
		popup?.href && router.push(popup?.href)
	}

	return (
		<Snackbar
			open={popup ? true : false}
			autoHideDuration={7000}
			message={popup?.title}
			action={<Button onClick={handleView}>View</Button>}
			TransitionComponent={Slide}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={() => dispatch(dismissPopup())}
		></Snackbar>
	)
}

export default Popup
