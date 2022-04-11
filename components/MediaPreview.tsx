import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'
import { removePreview } from '../store/slices/media'
import { getMediaType, getTitle } from '../lib/util'
import Image from 'next/image'
import {
	formatPic,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import Link from 'next/link'

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
				if (e.target.dataset.noclick) return
				dispatch(removePreview())
			}}
		>
			{preview.id && (
				<div className="mediapreview" data-noclick>
					<div className="card" data-noclick>
						<Link href={`/${getMediaType(preview)}/${preview.id}`}>
							<a className="btn btn--viewmore" data-noclick>
								View More
							</a>
						</Link>
						<header className="card__info" data-noclick>
							<div className="top">
								<span
									className={`${formatRatingClassName(preview.vote_average)}`}
								>
									{preview.vote_average}
								</span>
							</div>
							<div className="bottom">
								<h2 data-noclick>
									<Link href={`/${getMediaType(preview)}/${preview.id}`}>
										<a data-noclick>{getTitle(preview)}</a>
									</Link>
								</h2>
								<p data-noclick>
									{preview.overview?.substring(0, 300).trim()}
									{Number(preview.overview?.length) > 300 ? '...' : ''}
								</p>
							</div>
						</header>
						<div className="card__image" data-noclick>
							{preview.backdrop_path && (
								<Image
									src={formatPic(preview.backdrop_path as string)}
									layout="fill"
									objectFit="cover"
								/>
							)}
						</div>
					</div>
					<div className="mediapreview__thumb" data-noclick>
						{preview.poster_path && (
							<Image
								src={formatPicThumbs(preview.poster_path as string)}
								layout="fill"
								objectFit="cover"
							/>
						)}
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default MediaPreview
