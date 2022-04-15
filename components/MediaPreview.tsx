import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'
import { removePreview } from '../store/slices/media'
import {
	getDate,
	getGenreIds,
	getGenreName,
	getLanguageFromCode,
	getMediaType,
	getTitle,
} from '../lib/util'
import Image from 'next/image'
import {
	formatDate,
	formatLargeNumbers,
	formatPic,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

const MediaPreview = () => {
	const { preview } = useAppSelector((state) => state.media)
	const dispatch = useAppDispatch()

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.48 }}
			className="preview"
			onClick={(e: any) => {
				if (!e.target.dataset.canclick) return
				dispatch(removePreview())
			}}
			data-canclick
		>
			<div className="mediapreview">
				<div className="card">
					<Link
						href={`/${getMediaType(preview) === 'movie' ? 'movies' : 'tv'}/${
							preview.id
						}`}
					>
						<a className="btn btn--viewmore">View More</a>
					</Link>
					<header className="card__info">
						<div className="top">
							<div className="votes">
								<span
									className={`${formatRatingClassName(preview.vote_average)}`}
								>
									<AiFillStar />
									{Number(preview.vote_average).toFixed(1)}
								</span>
								<span>
									<BsFillPersonFill />
									{formatLargeNumbers(Number(preview.vote_count))}
								</span>
							</div>
							<div className="genres">
								{getGenreIds(preview)?.map((genre, idx) => {
									return (
										<Link href={`/?genres=${genre}`} key={idx}>
											<a>
												{getGenreName(String(genre), getMediaType(preview))}
											</a>
										</Link>
									)
								})}
							</div>
							<p>
								{getDate(preview)} |{' '}
								{getLanguageFromCode(preview.original_language as string)}
							</p>
						</div>
						<div className="bottom">
							<h2>
								<Link
									href={`/${
										getMediaType(preview) === 'movie' ? 'movies' : 'tv'
									}/${preview.id}`}
								>
									<a>{getTitle(preview)}</a>
								</Link>
							</h2>
							<p>
								{preview.overview?.substring(0, 250).trim()}
								{Number(preview.overview?.length) > 250 ? '...' : ''}
							</p>
						</div>
					</header>
					<div className="card__image">
						{preview.backdrop_path && (
							<Image
								src={formatPic(preview.backdrop_path as string)}
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						)}
					</div>
				</div>
				<div className="mediapreview__thumb">
					{preview.poster_path && (
						<Image
							src={formatPicThumbs(preview.poster_path as string)}
							layout="fill"
							objectFit="cover"
						/>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default MediaPreview
