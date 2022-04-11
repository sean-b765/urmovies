import { AnimatePresence } from 'framer-motion'
import { NextPage } from 'next'
import React, { useState } from 'react'
import MediaPreview from '../components/MediaPreview'
import Thumb from '../components/Thumb'
import { getDiscover } from '../store/actions/media'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setPreview } from '../store/slices/media'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'

interface Props {
	result: MovieResult[] | TVResult[]
	success: boolean
	page: number
	pages: number
}

const Discover: NextPage<{ data: Props }> = ({ data }) => {
	const dispatch = useAppDispatch()

	const { preview } = useAppSelector((state) => state.media)

	return (
		<div className="discover">
			{!data?.success && <></>}
			{data?.success && (
				<>
					<AnimatePresence exitBeforeEnter>
						{preview.id && <MediaPreview />}
					</AnimatePresence>
					{data.result.map((media: any, key: number) => {
						return (
							<Thumb
								key={key}
								media={media}
								className=""
								onClick={() => {
									console.log(media)

									dispatch(setPreview(media))
								}}
							/>
						)
					})}
				</>
			)}
		</div>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page

	let result = []
	const movies = await getDiscover({
		page: page ? `?page=${page}` : '',
		media: 'movie',
	})
	const tv = await getDiscover({
		page: page ? `?page=${page}` : '',
		media: 'tv',
	})

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
