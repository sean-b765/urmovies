import React from 'react'
import { MdLiveTv, MdLocalMovies } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatPicThumbs } from '../lib/format'
import { getMediaType, getTitle } from '../lib/util'

const Thumb: React.FC<{ media: MovieResult | TVResult; className: string }> = ({
	media,
	className,
}) => {
	return (
		<section className={`thumb ${className}`}>
			{getMediaType(media) === 'tv' ? <MdLiveTv /> : <MdLocalMovies />}
			<header className="thumb__title">
				<h2>
					<Link
						href={
							getMediaType(media) === 'tv'
								? `/tv/${media.id}`
								: `/movie/${media.id}`
						}
					>
						<a>{getTitle(media)}</a>
					</Link>
				</h2>
			</header>
			<div className="thumb__image">
				<Image
					src={formatPicThumbs(media.poster_path)}
					layout="fill"
					objectFit="cover"
				></Image>
			</div>
		</section>
	)
}

export default Thumb
