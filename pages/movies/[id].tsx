import { NextPage } from 'next'
import React, { useEffect } from 'react'
import FullMediaPage from '../../components/FullMediaPage'
import { fetchCommentsThunk } from '../../store/actions/comments'
import { getMedia, getRecommendations } from '../../store/actions/media'
import { useAppDispatch } from '../../store/hooks'
import { setSingle } from '../../store/slices/media'
import { SingleMovieResult } from '../../types/movies'

const MoviePage: NextPage<{
	data: SingleMovieResult
	commentSectionId: string
}> = ({ data, commentSectionId }) => {
	const dispatch = useAppDispatch()

	dispatch(
		setSingle({ ...data, result: { ...data.result, media_type: 'movie' } })
	)

	useEffect(() => {
		dispatch(fetchCommentsThunk({ commentSectionId }))
	}, [])

	return (
		<>
			<FullMediaPage />
		</>
	)
}

export async function getServerSideProps(context: any) {
	const result = await getMedia({ mediaId: context.query.id, media: 'movie' })

	const recommendations = await getRecommendations({
		mediaId: context.query.id,
		media: 'movie',
	})

	return {
		props: {
			data: { ...result, recommendations },
			commentSectionId: `movie${context.query.id}`,
		},
	}
}

export default MoviePage
