import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { AnimatePresence, motion } from 'framer-motion'
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
	formatLargeNumbers,
	formatPic,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

const MediaPreview = () => {
	const { result } = useAppSelector((state) => state.media.preview)
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
						href={`/${getMediaType(result) === 'movie' ? 'movies' : 'tv'}/${
							result.id
						}`}
					>
						<a className="btn btn--viewmore">View More</a>
					</Link>
					<header className="card__info">
						<div className="top">
							<div className="votes">
								<p className={`${formatRatingClassName(result.vote_average)}`}>
									<AiFillStar />
									{Number(result.vote_average).toFixed(1)}
								</p>
								<span>
									<BsFillPersonFill />
									{formatLargeNumbers(Number(result.vote_count))}
								</span>
							</div>
							<div className="genres">
								{getGenreIds(result)?.map((genre, idx) => {
									return (
										<Link href={`/?genres=${genre}`} key={idx}>
											<a>{getGenreName(String(genre), getMediaType(result))}</a>
										</Link>
									)
								})}
							</div>
							<p>
								{getDate(result)} |{' '}
								{getLanguageFromCode(result.original_language as string)}
							</p>
						</div>
						<div className="bottom">
							<h2>
								<Link
									href={`/${
										getMediaType(result) === 'movie' ? 'movies' : 'tv'
									}/${result.id}`}
								>
									<a>{getTitle(result)}</a>
								</Link>
							</h2>
							<p>
								{result.overview?.substring(0, 250).trim()}
								{Number(result.overview?.length) > 250 ? '...' : ''}
							</p>
						</div>
					</header>
					<div className="card__image">
						{result.backdrop_path && (
							<Image
								src={formatPic(result.backdrop_path as string)}
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						)}
					</div>
				</div>
				<div className="mediapreview__thumb">
					{result.poster_path && (
						<Image
							src={formatPicThumbs(result.poster_path as string)}
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
