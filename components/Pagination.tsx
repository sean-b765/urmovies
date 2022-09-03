import { Pagination } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const Pages: React.FC<{ page: number; pages: number }> = ({ page, pages }) => {
	const router = useRouter()

	const handleChange = (e: any, value: any) => {
		router.push(`?page=${value}`)
	}

	return (
		<Pagination page={page} count={pages} onChange={handleChange}></Pagination>
	)
}

export default Pages
