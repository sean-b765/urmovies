import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { formatPicThumbs, formatRatingClassName } from '../../lib/format'
import { usePromiseEffect } from '../../lib/hooks'
import { getTitle } from '../../lib/util'
import { getMediaPreview } from '../../store/actions/media'
import { Rating } from '../../types/common'
import { MovieResult } from '../../types/movies'
import { TVResult } from '../../types/tv'

const RatingCard: React.FC<{ rating: Rating }> = ({ rating }) => {
	const media = usePromiseEffect<MovieResult | TVResult>(async () => {
		const result = await getMediaPreview({
			media: rating.media_type,
			mediaId: rating.api_id,
		})

		return result.result
	}, [])

	return (
		<div className="ratingcard">
			<div className="ratingcard__backdrop">
				<Image
					layout="fill"
					src={formatPicThumbs(media.backdrop_path as string)}
					objectFit="cover"
				/>
			</div>
			<span className="ratingcard__title">
				<p className="time">{moment(rating.updated_at).fromNow()}</p>
				<Link
					href={`/${rating.media_type === 'movie' ? 'movies' : 'tv'}/${
						rating.api_id
					}`}
				>
					<a className="title">{getTitle(media)}</a>
				</Link>
			</span>
			<p
				className={'ratingcard__rating ' + formatRatingClassName(rating.rating)}
			>
				<AiFillStar />
				{rating.rating}
			</p>
		</div>
	)
}

export default RatingCard
