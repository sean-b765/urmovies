import React, { MouseEventHandler } from 'react'
import { MdLiveTv, MdLocalMovies } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatPicThumbs, formatRatingClassName } from '../lib/format'
import { getMediaType, getTitle } from '../lib/util'

const Thumb: React.FC<{
	media: MovieResult | TVResult
	className: string
	onClick: Function
}> = ({ media, className, onClick }) => {
	return (
		<section
			className={`thumb ${className}`}
			onClick={(e: any) => {
				try {
					if (!e.target.dataset['noclick']) onClick()
				} catch (err) {}
			}}
		>
			{getMediaType(media) === 'tv' ? <MdLiveTv /> : <MdLocalMovies />}
			<div
				className={`thumb__rating ${formatRatingClassName(media.vote_average)}`}
			>
				{Number(media.vote_average).toFixed(1)}
			</div>
			<header className="thumb__title">
				<h2>
					<Link
						href={
							getMediaType(media) === 'tv'
								? `/tv/${media.id}`
								: `/movie/${media.id}`
						}
					>
						<a data-noclick>{getTitle(media)}</a>
					</Link>
				</h2>
			</header>
			<div className="thumb__image">
				<Image
					src={formatPicThumbs(media?.poster_path as string)}
					layout="fill"
					objectFit="cover"
				></Image>
			</div>
		</section>
	)
}

export default Thumb
