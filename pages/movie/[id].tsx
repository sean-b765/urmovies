import { NextPage } from 'next'
import React from 'react'
import FullMediaPage from '../../components/FullMediaPage'
import { getMedia, getRecommendations } from '../../services/media'
import { SingleMovieResult } from '../../types/movies'

const MoviePage: NextPage<{ data: SingleMovieResult }> = ({ data }) => {
	return (
		<FullMediaPage
			result={data.result}
			recommendations={
				data.recommendations?.success ? data.recommendations.result : []
			}
			providers={data.providers}
			images={data.images}
			reviews={data.reviews}
		/>
	)
}

export async function getServerSideProps(context: any) {
	const result = await getMedia(context.query.id, 'movie')

	const recommendations = await getRecommendations(context.query.id, 'movie')

	return {
		props: { data: { ...result, recommendations } },
	}
}

export default MoviePage
