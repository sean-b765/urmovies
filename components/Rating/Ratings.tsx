import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { formatLargeNumbers, formatRatingClassName } from '../../lib/format'
import { getMediaType } from '../../lib/util'
import { setRating } from '../../store/actions/media'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { pushRatings, setRatings } from '../../store/slices/media'
import AddRating from './AddRating'

const Ratings: React.FC<{ className: string }> = ({ className }) => {
	const [showRatingBox, setShowRatingBox] = useState(false)
	const dispatch = useAppDispatch()

	const { result, ratings } = useAppSelector((state) => state.media.single)
	const _id = useAppSelector((state) => state.auth.profile?._id)

	const userRating =
		ratings?.filter((rating) => String(rating.user) === String(_id))[0] || null

	async function submitRating(rating: number) {
		const newRating = await setRating(
			getMediaType(result),
			String(result.id),
			rating
		)

		if (!newRating.success) return

		if (userRating) {
			// Alter the ratings array
			const newRatingsArray = ratings?.map((obj) => {
				if (obj.user === _id) {
					return newRating.result
				} else return obj
			})

			dispatch(setRatings(newRatingsArray))
		} else {
			// Add new rating to the existing array
			dispatch(pushRatings(newRating.result))
		}
	}

	return (
		<div className={`${className}`}>
			<button
				className={`btn ${className}__average ${formatRatingClassName(
					result.vote_average
				)}`}
				onClick={() => setShowRatingBox(!showRatingBox)}
			>
				<AiFillStar />
				{result.vote_average}
			</button>
			<p className={`${className}__count`}>
				<BsFillPersonFill />
				{formatLargeNumbers(Number(result.vote_count))}
			</p>
			<AnimatePresence>
				{showRatingBox && _id && (
					<AddRating
						onRate={(rating: number) => {
							submitRating(rating)
						}}
						rating={userRating?.rating || 0}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Ratings
