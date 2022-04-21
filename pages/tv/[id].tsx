import { NextPage } from 'next'
import React from 'react'
import CommentSection from '../../components/Comments/CommentSection'
import FullMediaPage from '../../components/FullMediaPage'
import { getMedia, getRecommendations } from '../../store/actions/media'
import { useAppDispatch } from '../../store/hooks'
import { setSingle } from '../../store/slices/media'
import { SingleTVResult } from '../../types/tv'

const TVPage: NextPage<{ data: SingleTVResult; commentSectionId: string }> = ({
	data,
	commentSectionId,
}) => {
	const dispatch = useAppDispatch()

	dispatch(setSingle({ ...data, result: { ...data.result, media_type: 'tv' } }))

	return (
		<>
			<FullMediaPage />
			<CommentSection commentSectionId={commentSectionId} />
		</>
	)
}

export async function getServerSideProps(context: any) {
	const result = await getMedia({ mediaId: context.query.id, media: 'tv' })

	const recommendations = await getRecommendations({
		mediaId: context.query.id,
		media: 'tv',
	})

	return {
		props: {
			data: { ...result, recommendations },
			commentSectionId: `tv${context.query.id}`,
		},
	}
}

export default TVPage
