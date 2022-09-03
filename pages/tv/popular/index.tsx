import { NextPage } from 'next'
import React from 'react'
import List from '../../../components/List'
import Pages from '../../../components/Pagination'
import { getPopular } from '../../../store/actions/media'
import { MovieResult } from '../../../types/movies'

const PopularTV: NextPage<{
	data: {
		result: MovieResult[]
		success: boolean
		page: number
		pages: number
	}
}> = ({ data }) => {
	return (
		<>
			{!data?.success ? (
				<></>
			) : (
				<List data={{ result: data.result, type: 'tv' }} />
			)}

			<Pages page={data.page} pages={data.pages} />
		</>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page
	const genres = context?.query?.genres?.split(',') || []

	const tv = await getPopular({
		page: page ? `?page=${page}` : '',
		media: 'tv',
		genres,
	})

	if (!tv || !tv.success)
		return {
			props: {
				success: false,
			},
		}

	return {
		props: {
			data: {
				result: tv.result,
				success: tv.success,
				page: tv.page,
				pages: Math.min(500, tv.pages === 0 ? 500 : tv.pages),
			},
		},
	}
}

export default PopularTV
