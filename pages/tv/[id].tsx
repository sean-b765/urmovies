import { NextPage } from 'next'
import React from 'react'
import FullMediaPage from '../../components/FullMediaPage'
import { getMedia, getRecommendations } from '../../services/media'
import { SingleTVResult } from '../../types/tv'

const TVPage: NextPage<{ data: SingleTVResult }> = ({ data }) => {
	return (
		<FullMediaPage
			result={data.result}
			recommendations={
				data.recommendations?.success ? data.recommendations.result : []
			}
		/>
	)
}

export async function getServerSideProps(context: any) {
	const result = await getMedia(context.query.id, 'tv')

	const recommendations = await getRecommendations(context.query.id, 'tv')

	return {
		props: { data: { ...result, recommendations } },
	}
}

export default TVPage
