import React, { MouseEventHandler } from 'react'
import { MdLiveTv, MdLocalMovies } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatPicThumbs, formatRatingClassName } from '../lib/format'
import { getMediaType, getTitle } from '../lib/util'
import { blacklisted } from '../lib/blacklisted'
import { CastObjectMovie, CastObjectTV, CrewObjectBase } from '../types/common'

const Thumb: React.FC<{
	media:
		| MovieResult
		| TVResult
		| CastObjectMovie
		| CastObjectTV
		| CrewObjectBase
	className: string
	onClick: Function
	type: string
}> = ({ media, className, onClick, type }) => {
	if (blacklisted.includes(String(media.id))) return <></>

	const mediaType = type || getMediaType(media)

	return (
		<section
			className={`thumb ${className}`}
			onClick={(e: any) => {
				try {
					if (!e.target.dataset['noclick']) onClick()
				} catch (err) {}
			}}
		>
			{mediaType === 'tv' ? <MdLiveTv /> : <MdLocalMovies />}
			<div
				className={`thumb__rating ${formatRatingClassName(media.vote_average)}`}
			>
				{Number(media.vote_average).toFixed(1)}
			</div>
			<header className="thumb__title">
				<h2>
					<Link
						href={
							mediaType === 'tv' ? `/tv/${media.id}` : `/movies/${media.id}`
						}
					>
						<a data-noclick>{getTitle(media)}</a>
					</Link>
				</h2>
				{'character' in media && media?.character && (
					<p>as {media?.character}</p>
				)}
				{'job' in media && <p>{media?.job}</p>}
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
