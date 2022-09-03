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
	formatLargeText,
	formatPic,
	formatPicThumbs,
	formatRatingClassName,
} from '../lib/format'
import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { Alert, Box, Fade, Grid, Modal, Typography } from '@mui/material'

const MediaPreview = () => {
	const { result } = useAppSelector((state) => state.media.preview)
	const { showPreview } = useAppSelector((state) => state.media)
	const dispatch = useAppDispatch()

	const handleClose = () => dispatch(removePreview())

	return (
		<Modal open={showPreview} onClose={handleClose}>
			<Box>
				{/* Mobiles */}
				<Grid
					container
					sx={{
						display: { xs: 'flex', sm: 'none' },
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						left: '50%',
						top: '50%',
						width: 'auto',
						flexDirection: 'column',
					}}
				>
					<Grid
						item
						sx={{
							position: 'relative',
							height: 'clamp(300px, 20vw, 400px)',
							width: '90vw',
							py: 4,
							px: 3,
						}}
					>
						<Typography variant="h4">{getTitle(result)}</Typography>

						<Typography variant="body1">
							{formatLargeText(result?.overview as string, 200)}
						</Typography>
						<div className="backdrop">
							<Image
								src={formatPic(result.backdrop_path as string)}
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						</div>
					</Grid>
				</Grid>
				{/* Desktops/Tablets */}
				<Grid
					container
					sx={{
						display: { xs: 'none', sm: 'flex' },
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						left: '50%',
						top: '50%',
						width: 'auto',
						flexWrap: 'nowrap',
					}}
				>
					<Grid
						item
						position="relative"
						height="clamp(300px, 20vw, 400px)"
						width="clamp(200px, 20vw, 300px)"
					>
						<Image
							src={formatPic(result.poster_path as string)}
							layout="fill"
							objectFit="cover"
							priority={true}
						/>
					</Grid>
					<Grid
						item
						sx={{
							position: 'relative',
							height: 'clamp(300px, 20vw, 400px)',
							width: 'clamp(200px, 50vw, 500px)',
							py: 2,
							px: 3,
						}}
					>
						<Typography variant="h4">{getTitle(result)}</Typography>

						<Typography variant="body1">
							{formatLargeText(result?.overview as string, 200)}
						</Typography>
						<div className="backdrop">
							<Image
								src={formatPic(result.backdrop_path as string)}
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						</div>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	)

	return (
		<motion.div
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
							<p>{formatLargeText(result?.overview as string, 250)}</p>
						</div>
					</header>
					<div className="card__image"></div>
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
