import { NextPage } from 'next'
import React from 'react'
import FullMediaPage from '../../components/FullMediaPage'
import { getMedia, getRecommendations } from '../../store/actions/media'
import { useAppDispatch } from '../../store/hooks'
import { setSingle } from '../../store/slices/media'
import { SingleMovieResult } from '../../types/movies'

const MoviePage: NextPage<{ data: SingleMovieResult }> = ({ data }) => {
	const dispatch = useAppDispatch()

	dispatch(
		setSingle({ ...data, result: { ...data.result, media_type: 'movie' } })
	)

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
		props: { data: { ...result, recommendations } },
	}
}

export default MoviePage
