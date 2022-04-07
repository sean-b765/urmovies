import { NextPage } from 'next'
import React from 'react'
import Thumb from '../components/Thumb'
import { getDiscover } from '../services/media'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'

interface Props {
	result: MovieResult[] | TVResult[]
	success: boolean
	page: number
	pages: number
}

const Discover: NextPage<{ data: Props }> = ({ data }) => {
	return (
		<div className="discover">
			{!data?.success && <></>}
			{data?.success && (
				<>
					{data.result.map((media: any, key: number) => {
						return <Thumb key={key} media={media} className="" />
					})}
				</>
			)}
		</div>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page

	let result = []
	const movies = await getDiscover(page ? `?page=${page}` : '', 'movie')
	const tv = await getDiscover(page ? `?page=${page}` : '', 'tv')

	if (!movies.success || !tv.success)
		return {
			props: {
				success: false,
			},
		}

	if (movies.page !== tv.page)
		return {
			props: {
				success: false,
			},
		}

	result = [
		...movies.result.map((movie: any) => {
			return { ...movie, type: 'movie' }
		}),
		...tv.result.map((tv: any) => {
			return { ...tv, type: 'tv' }
		}),
	].sort((ob1, ob2) => ob2.popularity - ob1.popularity)

	const success = movies.success && tv.success

	return {
		props: {
			data: {
				result,
				success,
				page: movies.page,
				pages: Math.min(500, tv.pages, movies.pages),
			},
		},
	}
}

export default Discover
