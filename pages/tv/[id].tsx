import { NextPage } from 'next'
import React from 'react'
import FullMediaPage from '../../components/FullMediaPage'
import { getMedia, getRecommendations } from '../../store/actions/media'
import { useAppDispatch } from '../../store/hooks'
import { setSingle } from '../../store/slices/media'
import { SingleTVResult } from '../../types/tv'

const TVPage: NextPage<{ data: SingleTVResult }> = ({ data }) => {
	const dispatch = useAppDispatch()
	dispatch(setSingle({ ...data, result: { ...data.result, media_type: 'tv' } }))

	return <FullMediaPage />
}

export async function getServerSideProps(context: any) {
	const result = await getMedia({ mediaId: context.query.id, media: 'tv' })

	const recommendations = await getRecommendations({
		mediaId: context.query.id,
		media: 'tv',
	})

	return {
		props: { data: { ...result, recommendations } },
	}
}

export default TVPage
