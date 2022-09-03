import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setPreview } from '../store/slices/media'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import MediaPreview from './MediaPreview'
import Thumb from './Thumb'

const List: React.FC<{
	data: {
		result: MovieResult[] | TVResult[]
		type?: 'movie' | 'tv'
	}
}> = ({ data }) => {
	const dispatch = useAppDispatch()
	const { showPreview } = useAppSelector((state) => state.media)

	return (
		<div className="list">
			<>
				<AnimatePresence exitBeforeEnter>
					{showPreview && <MediaPreview />}
				</AnimatePresence>
				{data.result.map((media: MovieResult | TVResult, key: number) => {
					return (
						<Thumb
							key={key}
							media={media}
							className=""
							type={data.type ? data.type : ''}
							onClick={() => {
								dispatch(
									setPreview(data.type ? { ...media, type: data.type } : media)
								)
							}}
						/>
					)
				})}
			</>
		</div>
	)
}

export default List
